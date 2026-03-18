import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="w-full min-h-112.5 mx-auto mt-10 bg-linear-to-r from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-between px-14 py-17 overflow-hidden">

      {/* ------- Left Side ------- */}
      <div className="w-1/2 text-white">

        <p className="mt-2 text-5xl font-semibold leading-tight">
          Book Appointment <br /> With Trusted Doctors
        </p>

        <div className="flex items-center gap-4 mt-6">
          <img src={assets.group_profiles} alt="" className="w-20" />
          
          <p className="text-sm opacity-90">
            Simply browse through our extensive list of trusted doctors,
            <br className='hidden sm:block'/> schedule your appointment hassle-free.
          </p>
        </div>

        <a
          href="#speciality"
          className="inline-flex items-center gap-2 mt-8 bg-white text-gray-700 px-6 py-3 rounded-full text-sm font-medium hover:scale-105 transition"
        >
          Book appointment
          <img src={assets.arrow_icon} alt="" className="w-4" />
        </a>

      </div>

      {/* ------- Right Side ------- */}
      <div className="w-1/2 flex justify-end">
        <img src={assets.header_img} alt="" className="w-105" />
      </div>

    </div>
  );
};

export default Header;