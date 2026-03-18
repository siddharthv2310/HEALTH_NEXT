import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate=useNavigate();
  return (
    <div className='flex bg-linear-to-r from-indigo-500 to-blue-500 rounded-2xl px-6 sm:px-10 md:px-14 my-20 md:mx-10 overflow-visible'>

  {/* Left */}
  <div className='flex-1 py-25 text-white'>
    <p className='text-4xl font-semibold'>Book Appointment</p>
    <p className='text-4xl font-semibold mt-4'>With 100+ Trusted Doctors</p>

    <button onClick={()=>{ navigate('/login'); scrollTo(0,0)}}  className='mt-8 cursor-pointer active:scale-90 bg-white text-gray-700 px-8 py-3 hover:bg-indigo-100 rounded-full'>
      Create account
    </button>
  </div>

  {/* Right */}
  <div className='hidden md:flex md:w-1/2 lg:w-85.5 relative items-end'>
    <img
      className='relative -top-8 w-full max-w-md object-contain'
      src={assets.appointment_img}
      alt=""
    />
  </div>

</div>
  )
}

export default Banner