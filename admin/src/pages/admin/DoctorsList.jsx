import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {

  const { doctors, aToken, getAllDoctors, changeAvailibility } = useContext(AdminContext)

  useEffect(() => {

    if (aToken) {
      getAllDoctors()
    }

  }, [aToken])

  return (

    <div className='w-full min-h-screen bg-[#F8F9FD] p-6'>

      {/* Heading */}
      <div className='mb-8'>

        <h1 className='text-3xl font-bold text-gray-800'>
          All Doctors
        </h1>

        <p className='text-gray-500 mt-1'>
          Manage all registered doctors
        </p>

      </div>

      {/* Doctors Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>

        {
          Array.isArray(doctors) && doctors.map((item, index) => (

            <div
              key={index}
              className='bg-white rounded-2xl border border-[#DCE3FF] overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300'
            >

              {/* Image Container */}
              <div className='bg-[#EEF3FF] h-35 flex items-end justify-center'>

                <img
                  className='h-35 object-contain'
                  src={item.image}
                  alt=""
                />

              </div>

              {/* Doctor Info */}
              <div className='p-5'>

                <h2 className='text-xl font-semibold text-gray-800 truncate'>
                  {item.name}
                </h2>

                <p className='text-gray-500 text-sm mt-1'>
                  {item.speciality}
                </p>

                {/* Availability */}
                <div className='mt-3 flex items-center gap-2 text-sm'>

                  <input
                    type="checkbox"
                    checked={item.available}
                    onChange={(e) => {
                      e.preventDefault()
                      changeAvailibility(item._id)
                    }}
                    className={`w-4 h-4 cursor-pointer ${item.available
                      ? 'accent-green-500'
                      : 'accent-red-500'
                      }`}
                  />

                  <p
                    className={`font-medium ${item.available
                      ? 'text-green-600'
                      : 'text-red-500'
                      }`}
                  >
                    {
                      item.available
                        ? 'Available'
                        : 'Not Available'
                    }
                  </p>

                </div>

                {/* Experience & Fees */}
                <div className='mt-4 space-y-1'>

                  <p className='text-sm text-gray-600'>
                    <span className='font-semibold'>
                      Experience:
                    </span>{' '}
                    {item.experience}
                  </p>

                  <p className='text-sm text-gray-600'>
                    <span className='font-semibold'>
                      Fees:
                    </span>{' '}
                    ₹{item.fees}
                  </p>

                </div>

                {/* Button */}
                {/* <button
                                    className='w-full mt-5 bg-linear-to-r from-blue-600 to-indigo-600 text-white py-2.5 rounded-xl font-medium hover:scale-[1.02] transition-all duration-300'
                                >
                                    View Profile
                                </button> */}

              </div>

            </div>

          ))
        }

      </div>

    </div>

  )
}

export default DoctorsList