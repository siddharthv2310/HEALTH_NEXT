import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl px-6 sm:px-10 md:px-14 my-16 md:my-20 overflow-hidden">

      {/* Left */}
      <div className="flex-1 py-12 md:py-20 text-white text-center md:text-left">

        <p className="text-3xl sm:text-4xl lg:text-5xl font-semibold">
          Book Appointment
        </p>

        <p className="text-3xl sm:text-4xl lg:text-5xl font-semibold mt-3 md:mt-4">
          With 100+ Trusted Doctors
        </p>

        <button
          onClick={() => {
            navigate('/login')
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="mt-8 cursor-pointer bg-white text-gray-700 px-8 py-3 rounded-full hover:bg-indigo-100 hover:shadow-lg active:scale-95 transition-all duration-300"
        >
          Create Account
        </button>

      </div>

      {/* Right */}
      <div className="hidden md:flex md:w-1/2 justify-center items-end">

        <img
          className="w-full max-w-[420px] lg:max-w-[500px] object-contain"
          src={assets.appointment_img}
          alt="Doctor Appointment"
        />

      </div>

    </div>
  )
}

export default Banner