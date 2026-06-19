import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="bg-white">

      {/* ---------- CONTAINER ---------- */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-12 py-16">

        {/* ---------- TITLE ---------- */}
        <h1 className="text-center text-2xl tracking-wide text-gray-600 mb-14">
          ABOUT <span className="text-gray-900 font-semibold">US</span>
        </h1>

        {/* ---------- TOP SECTION ---------- */}
        <div className="flex flex-col md:flex-row gap-12 items-start">

          {/* IMAGE */}
          <img
            src={assets.about_image}
            alt="Doctors Image"
            className="w-full md:w-105 rounded-md object-cover"
          />

          {/* TEXT */}
          <div className="flex-1 text-gray-600 text-[14px] leading-7 space-y-5">

            <p>
              Welcome to HealthNest, your trusted partner in managing your healthcare
              needs conveniently and efficiently. At HealthNest, we understand the
              challenges individuals face when it comes to scheduling doctor
              appointments and managing their health records.
            </p>

            <p>
              HealthNest is committed to excellence in healthcare technology. We
              continuously strive to enhance our platform, integrating the latest
              advancements to improve user experience and deliver superior service.
              Whether you're booking your first appointment or managing ongoing care,
              HealthNest is here to support you every step of the way.
            </p>

            <h3 className="text-gray-900 font-semibold mt-6">
              Our Vision
            </h3>

            <p>
              Our vision at HealthNest is to create a seamless healthcare experience
              for every user. We aim to bridge the gap between patients and healthcare
              providers, making it easier for you to access the care you need, when
              you need it.
            </p>

          </div>
        </div>

        {/* ---------- WHY CHOOSE ---------- */}
        <div className="mt-20">

          <h2 className="text-gray-700 text-lg mb-6">
            WHY <span className="font-semibold text-gray-900">CHOOSE US</span>
          </h2>

          {/* BOX CONTAINER */}
          <div className="grid grid-cols-1 md:grid-cols-3 border border-gray-300 rounded-2xl">

            {/* BOX 1 */}
            <div className="p-10 border-r border-gray-300 hover:bg-blue-100 ">
              <h3 className="text-gray-900 font-semibold mb-4 text-sm tracking-wide">
                EFFICIENCY:
              </h3>
              <p className="text-gray-600 text-sm leading-6">
                Streamlined appointment scheduling that fits into your busy lifestyle.
              </p>
            </div>

            {/* BOX 2 */}
            <div className="p-10 border-r border-gray-300 hover:bg-blue-100  ">
              <h3 className="text-gray-900 font-semibold mb-4 text-sm tracking-wide">
                CONVENIENCE:
              </h3>
              <p className="text-gray-600 text-sm leading-6">
                Access to a network of trusted healthcare professionals in your area.
              </p>
            </div>

            {/* BOX 3 */}
            <div className="p-10 hover:bg-blue-100 ">
              <h3 className="text-gray-900 font-semibold mb-4 text-sm tracking-wide">
                PERSONALIZATION:
              </h3>
              <p className="text-gray-600 text-sm leading-6">
                Tailored recommendations and reminders to help you stay on top of your health.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default About;