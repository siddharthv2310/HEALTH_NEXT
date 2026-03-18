import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='w-[97%] md:mx-10'>

      {/* Main Footer */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-10 my-16 mt-40 text-sm '>

        {/* -------- Left Section (1/2 width) -------- */}
        <div className='md:col-span-2 pl-5 pr-20'>
          <img className='mb-5 w-40' src={assets.logo} alt="logo" />
          <p className='text-gray-600 leading-6'>
            Prescripto connects patients with experienced and verified healthcare professionals. 
            From booking appointments to managing your medical journey, we aim to provide a smooth and reliable digital healthcare experience. 
            Trusted by thousands, we are committed to improving lives through better access to care.
          </p>
        </div>

        {/* -------- Center Section (1/4 width) -------- */}
        <div>
          <p className='text-lg font-semibold mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-3 text-gray-600'>
            <li className='hover:text-black cursor-pointer'>Home</li>
            <li className='hover:text-black cursor-pointer'>About Us</li>
            <li className='hover:text-black cursor-pointer'>Contact Us</li>
            <li className='hover:text-black cursor-pointer'>Privacy Policy</li>
          </ul>
        </div>

        {/* -------- Right Section (1/4 width) -------- */}
        <div className='pr-5'>
          <p className='text-lg font-semibold mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-3 text-gray-600'>
            <li>+91 98765 43210</li>
            <li>support@prescripto.com</li>
            <li>123 Health Street, New Delhi, India</li>
          </ul>
        </div>

      </div>

      {/* Divider */}
      <hr className='border-gray-300' />

      {/* Bottom */}
      <p className='py-5 text-sm text-center text-gray-500'>
        Copyright © 2024 Prescripto - All Rights Reserved.
      </p>

    </div>
  )
}

export default Footer