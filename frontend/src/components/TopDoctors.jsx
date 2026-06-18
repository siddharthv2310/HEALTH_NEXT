import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {
  const { doctors } = useContext(AppContext)
  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center gap-4 my-12 md:my-16 px-4 md:px-10 text-gray-900'>

      {/* Heading */}
      <h1 className='text-2xl sm:text-3xl font-semibold text-center'>
        Top Doctors to Book
      </h1>

      {/* Description */}
      <p className='w-full sm:w-2/3 md:w-1/3 text-center text-xs sm:text-sm text-gray-500'>
        Simply browse through our extensive list of trusted doctors.
      </p>

      {/* Grid */}
      <div className='w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-5'>

        {doctors.slice(0, 10).map((item, index) => (
          <div
            onClick={() => {navigate(`/appointment/${item._id}`) ; window.scrollTo(0,0)}}
            key={index}
            className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 hover:shadow-lg transition-all duration-300 bg-white'
          >
            {/* Image */}
            <img
              className='bg-blue-50 w-full h-40 sm:h-44 md:h-48 object-contain '
              src={item.image}
              alt=""
            />

            {/* Content */}
            <div className='p-3 sm:p-4'>

              {/* Availability */}
              {
                  item.available ?
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-green-600">
                      <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                      <p>Available</p>
                    </div>
                    :
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-red-500">
                      <p className="w-2 h-2 bg-red-500 rounded-full"></p>
                      <p>Not Available</p>
                    </div>
                }
              {/* Name */}
              <p className='text-gray-900 text-sm sm:text-base md:text-lg font-medium mt-1'>
                {item.name}
              </p>

              {/* Speciality */}
              <p className='text-gray-600 text-xs sm:text-sm'>
                {item.speciality}c
              </p>

            </div>
          </div>
        ))}

      </div>

      {/* Button */}
      <button
        onClick={() => { navigate('/doctors'); window.scrollTo(0, 0) }}
        className='cursor-pointer bg-blue-100 text-gray-700 px-8 sm:px-12 py-2.5 sm:py-3 rounded-full mt-6 hover:bg-blue-200 active:scale-95 transition'
      >
        More
      </button>

    </div>
  )
}

export default TopDoctors 