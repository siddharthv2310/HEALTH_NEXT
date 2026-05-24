import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div
      className="flex flex-col items-center gap-4 py-16 text-gray-800"
      id="speciality"
    >
      {/* Heading */}
      <h1 className="text-3xl font-semibold">
        Find by Speciality
      </h1>

      {/* Description */}
      <p className="sm:w-1/3 text-center text-sm text-gray-500">
        Simply browse through our extensive list of trusted doctors,
        schedule your appointment hassle-free.
      </p>

      {/* Scrollable Specialities */}
      <div className="flex sm:justify-center gap-6 pt-6 w-full overflow-x-auto">
        {specialityData.map((item, index) => (
          <Link
            onClick={()=>scrollTo(0,0)}
            key={index}
            to={`/doctors/${item.speciality}`}
            className="flex flex-col items-center text-xs cursor-pointer shrink-0 hover:-translate-y-2 transition-all duration-300"
          >
            {/* Image */}
            <div className="w-24 h-24 pointer-cursor bg-blue-100 rounded-full flex items-center justify-center">
              <img
                src={item.image}
                alt=""
                className="w-20 h-20 object-contain"
              />
            </div>

            {/* Text */}
            <p className="mt-2 pointer-cursor text-sm font-medium">
              {item.speciality}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SpecialityMenu