import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='w-full'>

      {/* Main Footer */}
     <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 my-16 mt-20 md:mt-32 lg:mt-40 text-sm'>

        {/* -------- Left Section (1/2 width) -------- */}
        <div className='md:col-span-2 px-2 md:pr-12 lg:pr-20'>
          <img className='mb-5 w-32 sm:w-36 md:w-40' src={assets.logo} alt="logo" />
          <p className='text-gray-600 leading-6 max-w-xl'>
            HealthNest connects patients with experienced and verified healthcare professionals. 
            From booking appointments to managing your medical journey, we aim to provide a smooth and reliable digital healthcare experience. 
            Trusted by thousands, we are committed to improving lives through better access to care.
          </p>
        </div>

        {/* -------- Center Section (1/4 width) -------- */}
        <div className='mt-2 md:mt-0'>
          <p className='text-lg font-semibold mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-3 text-gray-600'>
            <li className='hover:text-black cursor-pointer transition-colors'>Home</li>
            <li className='hover:text-black cursor-pointer transition-colors'>About Us</li>
            <li className='hover:text-black cursor-pointer transition-colors'>Contact Us</li>
            <li className='hover:text-black cursor-pointer transition-colors'>Privacy Policy</li>
          </ul>
        </div>

        {/* -------- Right Section (1/4 width) -------- */}
        <div className='mt-2 md:mt-0'>
          <p className='text-lg font-semibold mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-3 text-gray-600'>
            <li>+91 98765 43210</li>
            <li>support@HealthNest.com</li>
            <li>123 Health Street, New Delhi, India</li>
          </ul>
        </div>

      </div>

      {/* Divider */}
      <hr className='border-gray-300' />

      {/* Bottom */}
      <p className='py-5 px-4 text-xs sm:text-sm text-center text-gray-500'>
        Copyright © 2024 HealthNest - All Rights Reserved.
      </p>

    </div>
  )
}

export default Footer