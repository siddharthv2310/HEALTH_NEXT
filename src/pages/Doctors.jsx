import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Doctors = () => {

  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])

  const navigate = useNavigate()

  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((e)=> e.speciality === speciality))

    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors,speciality])

  return (
    <div className='px-2 md:px-4 lg:px-6 py-10'>

      <p className='text-gray-600 text-md mb-6'>
        Browse through the doctors specialist.
      </p>

      <div className='flex flex-col md:flex-row gap-8'>

        {/* LEFT FILTER */}
        <div className='flex flex-col gap-3 w-1/5 md:w-1/5'>

          <p
            onClick={() => navigate('/doctors/General physician')}
            className={`px-4 py-2 border rounded-lg cursor-pointer transition 
            ${speciality === "General physician"
                ? "bg-blue-100 border-blue-400"
                : "hover:bg-gray-200"}`}
          >
            General physician
          </p>

          <p
            onClick={() => navigate('/doctors/Gynecologist')}
            className={`px-4 py-2 border rounded-lg cursor-pointer transition 
            ${speciality === "Gynecologist"
                ? "bg-blue-100 border-blue-400"
                : "hover:bg-gray-100"}`}
          >
            Gynecologist
          </p>

          <p
            onClick={() => navigate('/doctors/Dermatologist')}
            className={`px-4 py-2 border rounded-lg cursor-pointer transition 
            ${speciality === "Dermatologist"
                ? "bg-blue-100 border-blue-400"
                : "hover:bg-gray-100"}`}
          >
            Dermatologist
          </p>

          <p
            onClick={() => navigate('/doctors/Pediatricians')}
            className={`px-4 py-2 border rounded-lg cursor-pointer transition 
            ${speciality === "Pediatricians"
                ? "bg-blue-100 border-blue-400"
                : "hover:bg-gray-100"}`}
          >
            Pediatricians
          </p>

          <p
            onClick={() => navigate('/doctors/Neurologist')}
            className={`px-4 py-2 border rounded-lg cursor-pointer transition 
            ${speciality === "Neurologist"
                ? "bg-blue-100 border-blue-400"
                : "hover:bg-gray-100"}`}
          >
            Neurologist
          </p>

          <p
            onClick={() => navigate('/doctors/Gastroenterologist')}
            className={`px-4 py-2 border rounded-lg cursor-pointer transition 
            ${speciality === "Gastroenterologist"
                ? "bg-blue-100 border-blue-400"
                : "hover:bg-gray-100"}`}
          >
            Gastroenterologist
          </p>

        </div>

        {/* RIGHT SIDE */}
        <div className='w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>

          {
            filterDoc.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(`/appointment/${item._id}`)}
                className='border rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition'
              >

                <img
                  className='bg-blue-50 w-full h-52 object-cover'
                  src={item.image}
                  alt=""
                />

                <div className='p-4'>

                  {/* Available */}
                  <div className='flex items-center gap-2 text-sm text-green-600'>
                    <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                    <p>Available</p>
                  </div>

                  {/* Name */}
                  <p className='text-gray-900 text-lg font-medium mt-2'>
                    {item.name}
                  </p>

                  {/* Speciality */}
                  <p className='text-gray-600 text-sm'>
                    {item.speciality}
                  </p>

                </div>

              </div>
            ))
          }

        </div>

      </div>

    </div>
  )
}

export default Doctors