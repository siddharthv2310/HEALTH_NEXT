import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctor from '../components/RelatedDoctor'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointment = () => {

  const { docId } = useParams()

  const {
    doctors,
    currencySymbol,
    backendUrl,
    token,
    getDoctorsData
  } = useContext(AppContext)

  const navigate = useNavigate()

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  // ================= FETCH DOCTOR =================

  const fetchDocInfo = async () => {

    const info = doctors.find(
      (doc) => doc._id.toString() === docId
    )

    if (info) {
      setDocInfo(info)
    }
  }

  // ================= GENERATE AVAILABLE SLOTS =================

  const getAvailableSlots = async () => {

    if (!docInfo) return

    setDocSlots([])

    let today = new Date()

    let allSlots = []

    // next 7 days
    for (let i = 0; i < 7; i++) {

      let currentDate = new Date(today)

      currentDate.setDate(today.getDate() + i)

      let endTime = new Date(today)

      endTime.setDate(today.getDate() + i)

      endTime.setHours(21, 0, 0, 0)

      // today timings
      if (i === 0) {

        currentDate.setHours(
          currentDate.getHours() > 10
            ? currentDate.getHours() + 1
            : 10
        )

        currentDate.setMinutes(
          currentDate.getMinutes() > 30
            ? 30
            : 0
        )

      } else {

        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []

      while (currentDate < endTime) {

        // FIXED TIME FORMAT
        let formattedTime = currentDate.toLocaleTimeString(
          'en-GB',
          {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          }
        )

        let day = currentDate.getDate()

        let month = currentDate.getMonth() + 1

        let year = currentDate.getFullYear()

        const slotDate = day + " " + month + " " + year

        const isSlotAvailable =
          !docInfo?.slots_booked?.[slotDate]?.includes(formattedTime)

        if (isSlotAvailable) {

          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          })
        }

        currentDate.setMinutes(
          currentDate.getMinutes() + 30
        )
      }

      allSlots.push(timeSlots)
    }

    setDocSlots(allSlots)
  }

  // ================= BOOK APPOINTMENT =================

  const bookAppointment = async () => {

    try {

      if (!token) {

        toast.warn('Login to book appointment')

        return navigate('/login')
      }

      if (!slotTime) {

        return toast.error('Please select a slot')
      }

      const selectedSlot = docSlots[slotIndex]?.find(
        item => item.time === slotTime
      )

      if (!selectedSlot) {

        return toast.error('Invalid slot selected')
      }

      const date = selectedSlot.datetime

      let day = date.getDate()

      let month = date.getMonth() + 1

      let year = date.getFullYear()

      const slotDate = day + " " + month + " " + year

      const { data } = await axios.post(
        backendUrl + '/api/user/book-appointment',
        {
          docId,
          slotDate,
          slotTime
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (data.success) {

        toast.success(data.message)

        // refresh doctors data
        await getDoctorsData()

        // refresh current doctor
        const updatedDoctor = doctors.find(
          (doc) => doc._id.toString() === docId
        )

        if (updatedDoctor) {
          setDocInfo(updatedDoctor)
        }

        // regenerate slots
        await getAvailableSlots()

        setSlotTime('')

        navigate('/my-appointments')

      } else {

        toast.error(data.message)
      }

    }
    catch (err) {

      console.log(err)

      toast.error(err.message)
    }
  }

  // ================= EFFECTS =================

  useEffect(() => {

    fetchDocInfo()

  }, [doctors, docId])

  useEffect(() => {

    if (docInfo) {

      getAvailableSlots()
    }

  }, [docInfo])

  // ================= UI =================

  return docInfo && (

    <div className='p-6'>

      {/* DOCTOR DETAILS */}

      <div className='flex flex-col sm:flex-row gap-6'>

        <div>

          <img
            className='bg-blue-500 w-full sm:max-w-72 rounded-lg'
            src={docInfo.image}
            alt=""
          />

        </div>

        <div className='flex-1 border border-gray-300 rounded-lg p-6 bg-white'>

          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>

            {docInfo.name}

            <img
              className='w-5'
              src={assets.verified_icon}
              alt=""
            />

          </p>

          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>

            <p>
              {docInfo.degree} - {docInfo.speciality}
            </p>

            <button className='py-0.5 px-2 border text-xs rounded-full'>

              {docInfo.experience}

            </button>

          </div>

          <div className='mt-3'>

            <p className='flex items-center gap-1 text-sm font-medium text-gray-900'>

              About

              <img src={assets.info_icon} alt="" />

            </p>

            <p className='text-sm text-gray-500 mt-1'>

              {docInfo.about}

            </p>

          </div>

          <p className='text-gray-500 font-medium mt-4'>

            Appointment fee:

            <span className='text-gray-800'>
              {currencySymbol}{docInfo.fees}
            </span>

          </p>

        </div>

      </div>

      {/* BOOKING SECTION */}

      <div className='sm:ml-72 sm:pl-4 mt-10 font-medium text-gray-700'>

        <p className='text-lg'>
          Booking slots
        </p>

        {/* DAYS */}

        <div className='flex gap-4 items-center w-full overflow-x-auto mt-4'>

          {
            docSlots.map((item, index) => {

              const date = new Date()

              date.setDate(date.getDate() + index)

              return (

                <div
                  key={index}
                  onClick={() => setSlotIndex(index)}
                  className={`
                    text-center py-6 min-w-16 rounded-full cursor-pointer transition-all duration-300
                    ${slotIndex === index
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'border border-gray-300 text-gray-600 hover:bg-gray-200'}
                  `}
                >

                  <p className='text-sm font-medium'>

                    {daysOfWeek[date.getDay()]}

                  </p>

                  <p className='text-lg font-semibold'>

                    {date.getDate()}

                  </p>

                </div>
              )
            })
          }

        </div>

        {/* TIME SLOTS */}

        <div className='flex items-center gap-3 w-full overflow-x-auto mt-6'>

          {
            docSlots[slotIndex]?.map((item, index) => (

              <p
                key={index}
                onClick={() => setSlotTime(item.time)}
                className={`
                  text-sm font-light shrink-0 px-5 py-2 rounded-full cursor-pointer transition-all duration-300
                  ${item.time === slotTime
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'border border-gray-300 text-gray-600'}
                `}
              >

                {item.time}

              </p>
            ))
          }

        </div>

        {/* BUTTON */}

        <button
          onClick={bookAppointment}
          className='bg-indigo-600 cursor-pointer text-white text-sm font-light px-14 py-3 rounded-full mt-8 shadow-lg active:scale-90 transition'
        >

          Book an appointment

        </button>

      </div>

      <RelatedDoctor
        docId={docId}
        speciality={docInfo.speciality}
      />

    </div>
  )
}

export default Appointment