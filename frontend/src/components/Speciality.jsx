import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-gray-800" id="speciality">

      <h1 className="text-3xl md:text-4xl font-semibold text-center">
        Find by Speciality
      </h1>

      <p className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 text-center text-sm md:text-base text-gray-500">
        Simply browse through our extensive list of trusted doctors,
        schedule your appointment hassle-free.
      </p>

      <div className="flex sm:justify-center gap-5 md:gap-6 pt-6 w-full overflow-x-auto scrollbar-hide pb-2">

        {specialityData.map((item, index) => (
          <Link
            key={index}
            to={`/doctors/${item.speciality}`}
            onClick={() => window.scrollTo(0, 0)}
            className="flex flex-col items-center text-xs cursor-pointer shrink-0 hover:-translate-y-2 transition-all duration-300"
          >

            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-blue-100 rounded-full flex items-center justify-center shadow-sm">

              <img
                src={item.image}
                alt={item.speciality}
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
              />

            </div>

            <p className="mt-3 text-sm md:text-base font-medium text-center">
              {item.speciality}
            </p>

          </Link>
        ))}

      </div>

    </div>
  )
}

export default SpecialityMenu