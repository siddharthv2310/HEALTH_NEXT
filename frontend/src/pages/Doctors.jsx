import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Doctors = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [filter, setFilter] = useState(false)

  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((e) => e.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div className="px-4 md:px-6 lg:px-10 py-10">

      {/* Heading */}
      <p className="text-gray-600 text-sm sm:text-base mb-6 text-center lg:text-left">
        Browse through the doctors specialist.
      </p>

      {/* Mobile Filter Button */}
      <button
        onClick={() => setFilter((prev) => !prev)}
        className="md:hidden mb-6 bg-blue-500 text-white px-5 py-2 rounded-full text-sm active:scale-95 transition"
      >
        Filter
      </button>

      <div className="flex flex-col lg:flex-row gap-6">

        {/* -------- LEFT FILTER -------- */}
        <div
          className={`${filter ? 'flex' : 'hidden'} lg:flex flex-col gap-3 w-full lg:w-1/5 bg-white lg:bg-transparent p-4 lg:p-0 rounded-xl lg:rounded-none shadow lg:shadow-none`}
        >

          {[
            "General physician",
            "Gynecologist",
            "Dermatologist",
            "Pediatricians",
            "Neurologist",
            "Gastroenterologist"
          ].map((item, index) => (
            <p
              key={index}
              onClick={() => {
                navigate(`/doctors/${item}`)
                setFilter(false)
              }}
              className={`px-4 py-2 border rounded-lg cursor-pointer transition text-sm
              ${speciality === item
                  ? "bg-blue-100 border-blue-400"
                  : "hover:bg-gray-100"}`}
            >
              {item}
            </p>
          ))}

        </div>

        {/* -------- RIGHT SIDE -------- */}
       <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">

          {filterDoc.map((item, index) => (
            <div
              key={item._id}
             onClick={() => { navigate(`/appointment/${item._id}`)
              window.scrollTo(0, 0)
             }}
              className="border rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition"
            >

              {/* Image */}
              <img
                className="bg-blue-50 w-full h-36 sm:h-44 md:h-52 object-cover object-top"
                src={item.image}
                alt={item.name}
              />

              {/* Content */}
              <div className="p-3 sm:p-4">

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
                <p className="text-gray-900 text-sm sm:text-base md:text-lg font-medium mt-1">
                  {item.name}
                </p>

                {/* Speciality */}
                <p className="text-gray-600 text-xs sm:text-sm">
                  {item.speciality}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  )
}

export default Doctors