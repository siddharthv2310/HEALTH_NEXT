import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {
    const {doctors}=useContext(AppContext)
    const navigate=useNavigate();
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>

      {/* Heading */}
      <h1 className='text-3xl font-semibold'>
        Top Doctors to Book
      </h1>

      {/* Description */}
      <p className='sm:w-1/3 text-center text-sm text-gray-500'>
        Simply browse through our extensive list of trusted doctors.
      </p>

      {/* Grid */}
      <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-5 px-3 sm:px-0'>

        {doctors.slice(0, 10).map((item, index) => (
          <div
            onClick={()=>navigate(`/appointment/${item._id}`)}
            key={index}
            className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2.5 hover:-translate-x-0.5 transition-all duration-300 bg-white'
          >
            {/* Image */}
            <img
              className='bg-blue-50 w-full h-48 object-cover'
              src={item.image}
              alt=""
            />

            {/* Content */}
            <div className='p-4'>

              {/* Availability */}
              <div className='flex items-center gap-2 text-sm text-green-500'>
                <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                <p>Available</p>
              </div>

              {/* Name */}
              <p className='text-gray-900 text-lg font-medium mt-1'>
                {item.name}
              </p>

              {/* Speciality */}
              <p className='text-gray-600 text-sm'>
                {item.speciality}
              </p>

            </div>
          </div>
        ))}

      </div>

      {/* Button */}
      <button onClick={()=>{ navigate('/doctors') ; scrollTo(0,0)}} className='cursor-pointer bg-blue-100 text-gray-700 px-12 py-3  rounded-full mt-6 hover:bg-blue-200 active:scale-95 transition'>
        more
      </button>

    </div>
  )
}

export default TopDoctors