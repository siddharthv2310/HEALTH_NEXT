import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="w-full max-w-7xl mx-auto mt-6 md:mt-10 bg-linear-to-r from-indigo-500 to-blue-500 rounded-2xl flex flex-col md:flex-row items-center justify-between px-5 sm:px-8 md:px-14 py-10 md:py-16 overflow-hidden">

      {/* ------- Left Side ------- */}
      <div className="w-full md:w-1/2 text-white text-center md:text-left">

        <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
          Book Appointment <br /> With Trusted Doctors
        </p>

        <div className="flex items-center justify-center md:justify-start gap-4 mt-6">
          <img src={assets.group_profiles} alt="Patients and doctors" className="w-14 sm:w-16 md:w-20" />
          
          <p className="text-xs sm:text-sm opacity-90">
            Simply browse through our extensive list of trusted doctors,
            <br className='hidden sm:block'/> schedule your appointment hassle-free.
          </p>
        </div>

        <a
          href="#speciality"
          className="inline-flex items-center gap-2 mt-8 bg-white text-gray-700 px-5 py-2.5 md:px-6 md:py-3 rounded-full text-sm font-medium hover:scale-105 hover:shadow-lg transition-all duration-300"
        >
          Book appointment
          <img src={assets.arrow_icon} alt="" className="w-4" />
        </a>

      </div>

      {/* ------- Right Side ------- */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-8 md:mt-0">
        <img 
          src={assets.header_img} 
          alt="Doctors illustration"
          className="w-60 sm:w-72 md:w-96 lg:w-full max-w-[420px]"
        />
      </div>

    </div>
  );
};

export default Header;