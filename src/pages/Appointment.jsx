import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctor from '../components/RelatedDoctor'

const Appointment = () => {

  const { docId } = useParams()
  const { doctors } = useContext(AppContext)

  const [docInfo, setdocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  // ---------- Fetch Doctor ----------
  const fetchDocInfo = () => {
    const info = doctors.find((e) => e._id.toString() === docId)
    setdocInfo(info)
  }

  // ---------- Generate Slots ----------
  const getAvailableslots = () => {

    let today = new Date()
    let allSlots = []

    for (let i = 0; i < 7; i++) {

      let currentdate = new Date(today)
      currentdate.setDate(today.getDate() + i)

      let endTime = new Date(today)
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      if (i === 0) {
        currentdate.setHours(
          currentdate.getHours() > 10 ? currentdate.getHours() + 1 : 10
        )
        currentdate.setMinutes(currentdate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentdate.setHours(10)
        currentdate.setMinutes(0)
      }

      let timeslots = []

      while (currentdate < endTime) {
        let formattedTime = currentdate.toLocaleString([], {
          hour: '2-digit',
          minute: '2-digit',
        })

        timeslots.push({
          datetime: new Date(currentdate),
          time: formattedTime,
        })

        currentdate.setMinutes(currentdate.getMinutes() + 30)
      }

      allSlots.push(timeslots)
    }

    setDocSlots(allSlots)
  }

  // ---------- Effects ----------
  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    setDocSlots([])
    getAvailableslots()
  }, [docId])

  // ---------- UI ----------
  return docInfo && (
    <div className='p-6'>

      {/* ---------- Doctor Section ---------- */}
      <div className='flex flex-col sm:flex-row gap-6'>

        {/* Image */}
        <div>
          <img
            className='bg-blue-500 w-full sm:max-w-72 rounded-lg'
            src={docInfo.image}
            alt=""
          />
        </div>

        {/* Info */}
        <div className='flex-1 border border-gray-300 rounded-lg p-6 bg-white'>

          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {docInfo.name}
            <img className='w-5' src={assets.verified_icon} alt="" />
          </p>

          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>
              {docInfo.experience}
            </button>
          </div>

          <div className='mt-3'>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900'>
              About <img src={assets.info_icon} alt="" />
            </p>
            <p className='text-sm text-gray-500 mt-1'>
              {docInfo.about}
            </p>
          </div>

          <p className='text-gray-500 font-medium mt-4'>
            Appointment fee:
            <span className='text-gray-800'> ${docInfo.fees}</span>
          </p>

        </div>
      </div>

      {/* ---------- Booking Section ---------- */}
      <div className='sm:ml-72 sm:pl-4 mt-10 font-medium text-gray-700'>

        <p className='text-lg'>Booking slots</p>

        {/* Days */}
        <div className='flex gap-4 items-center w-full overflow-x-auto mt-4 '>
          {
            docSlots.length && docSlots.map((item, index) => (
              <div
                key={index}
                onClick={() => setSlotIndex(index)}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer transition-all duration-300
                ${slotIndex === index
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'border border-gray-300 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                <p className='text-sm font-medium'>
                  {item[0] && daysOfWeek[item[0].datetime.getDay()]}
                </p>
                <p className='text-lg font-semibold'>
                  {item[0] && item[0].datetime.getDate()}
                </p>
              </div>
            ))
          }
        </div>

        {/* Time Slots */}
        <div className='flex items-center gap-3 w-full overflow-x-auto mt-6'>
          {
            docSlots.length && docSlots[slotIndex]?.map((item, index) => (
              <p
                key={index}
                onClick={() => setSlotTime(item.time)}
                className={`text-sm font-light shrink-0 px-5 py-2 rounded-full cursor-pointer transition-all duration-300
                ${item.time === slotTime
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'border border-gray-300 text-gray-600'
                  }`}
              >
                {item.time.toLowerCase()}
              </p>
            ))
          }
        </div>

        {/* Button */}
        <button className='bg-indigo-600 cursor-pointer text-white text-sm font-light px-14 py-3 rounded-full mt-8 shadow-lg active:scale-90 transition'>
          Book an appointment
        </button>

      </div>

      <RelatedDoctor docId={docId} speciality={docInfo.speciality}/>

    </div>
  )
}

export default Appointment