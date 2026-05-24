import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="bg-white">

      {/* ---------- CONTAINER ---------- */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-12 py-16">

        {/* ---------- TITLE ---------- */}
        <h1 className="text-center text-2xl tracking-wide text-gray-600 mb-14">
          CONTACT <span className="text-gray-900 font-semibold">US</span>
        </h1>

        {/* ---------- MAIN SECTION ---------- */}
        <div className="flex flex-col md:flex-row gap-12 items-start">

          {/* IMAGE */}
          <img
            src={assets.contact_image}
            alt=""
            className="w-full md:w-105 rounded-md object-cover"
          />

          {/* RIGHT SIDE CONTENT */}
          <div className="flex-1 text-gray-600 text-[14px] leading-7 space-y-8">

            {/* OFFICE */}
            <div>
              <h2 className="text-gray-900 font-semibold text-lg mb-3">
                OUR OFFICE
              </h2>
              <p>54709 Willms Station</p>
              <p>Suite 350, Washington, USA</p>

              <p className="mt-4">Tel: (415) 555-0132</p>
              <p>Email: greatstackdev@gmail.com</p>
            </div>

            {/* CAREERS */}
            <div>
              <h2 className="text-gray-900 font-semibold text-lg mb-3">
                CAREERS AT PRESCRIPTO
              </h2>
              <p className="mb-5">
                Learn more about our teams and job openings.
              </p>

              {/* BUTTON WITH HOVER TRANSITION */}
              <button className="
                border border-gray-400 px-6 py-3 text-sm text-gray-700
                hover:bg-indigo-600 hover:text-white hover:border-indigo-600
                hover:shadow-lg hover:-translate-y-0.5
                transition-all duration-800 ease-in-out
                cursor-pointer
              ">
                Explore Jobs
              </button>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;