import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { useEffect } from 'react'

const Navbar = () => {
  const navigate = useNavigate()

  const [showMenu, setShowMenu] = useState(false)
  const { token, userData ,  logoutUser } = useContext(AppContext)
  const [showDropdown, setShowDropdown] = useState(false)

  const logout = () => {
    setShowDropdown(false);
    logoutUser();
    navigate("/");
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowMenu(false);
        setShowDropdown(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex items-center justify-between text-sm py-4 px-4 md:px-0 mb-5 border-b border-gray-400">

      {/* -------- Logo -------- */}
      <img
        onClick={() => {
          navigate('/')
          scrollTo(0, 0)
        }}
        className="cursor-pointer w-32 sm:w-40 md:w-44 h-auto hover:scale-105 transition-all duration-300"
        src={assets.logo}
        alt="logo"
      />

      {/* -------- Desktop Menu -------- */}
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1 hover:text-blue-600 transition-colors">HOME</li>
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1 hover:text-blue-600 transition-colors">ALL DOCTORS</li>
        </NavLink>
        <NavLink to="/about">
          <li className="py-1 hover:text-blue-600 transition-colors">ABOUT</li>
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1 hover:text-blue-600 transition-colors">CONTACT</li>
        </NavLink>
      </ul>

      {/* -------- Right Section -------- */}
      <div className="flex items-center gap-4">

        {/* -------- FIXES THE REFRESH FLASH -------- */}
        {token ? (
          // If a token exists but userData is still fetching from the backend,
          // we render a steady placeholder matching your profile size to block the button flash.
          !userData ? (
            <div className="w-8 h-8 rounded-full bg-stone-200 animate-pulse hidden md:block" />
          ) : (
            <div className="relative group">
              {/* Profile Click */}
              <div
                onClick={() => {
                  if (window.innerWidth < 768) {
                    setShowDropdown((prev) => !prev);
                  }
                }}
                className="flex items-center gap-2 cursor-pointer select-none"
              >
                <img
                  className="w-9 h-9 rounded-full object-cover border"
                  src={userData.image || assets.profile_pic}
                  alt="profile"
                />
                <img
                  className={`w-2.5 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
                  src={assets.dropdown_icon}
                  alt="dropdown"
                />
              </div>

              {/* Dropdown Box */}
              <div
                className={`
                absolute right-0 top-full z-20 min-w-48 bg-stone-100 rounded p-4 text-gray-600 flex flex-col gap-3 shadow-md
                before:content-[''] before:absolute before:-top-4 before:left-0 before:w-full before:h-4
                ${showDropdown ? 'block' : 'hidden'} 
                md:group-hover:block
              `}
              >
                <p
                  onClick={() => {
                    navigate('/my-profile')
                    setShowDropdown(false)
                  }}
                  className="cursor-pointer px-2 py-1 rounded hover:bg-amber-50 hover:text-black"
                >
                  My Profile
                </p>
                <p
                  onClick={() => {
                    navigate('/my-appointments')
                    setShowDropdown(false)
                  }}
                  className="cursor-pointer px-2 py-1 rounded hover:bg-amber-50 hover:text-black"
                >
                  My Appointments
                </p>
                <p
                  onClick={logout}
                  className="cursor-pointer px-2 py-1 rounded hover:bg-amber-50 hover:text-black"
                >
                  Logout
                </p>
              </div>
            </div>
          )
        ) : (
          // Only show the Create Account button if there is absolutely no token present
          <button
            onClick={() => navigate('/login')}
            className="hidden md:block bg-blue-600 text-white px-6 lg:px-8 py-2.5 lg:py-3 rounded-full cursor-pointer active:scale-95 hover:bg-blue-700 transition-all"
          >
            Create Account
          </button>
        )}

        {/* -------- Mobile Menu Icon -------- */}
        <button onClick={() => setShowMenu(true)} className="md:hidden" >
          <img
            src={assets.menu_icon}
            className="w-6 cursor-pointer"
            alt="menu"
          />
        </button>

        {/* -------- Mobile Menu -------- */}
        <div
          className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${showMenu ? 'visible opacity-100' : 'invisible opacity-0'}`}
        >
          {/* Overlay */}
          <div
            onClick={() => setShowMenu(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Menu Panel */}
          <div
            className={`absolute top-0 right-0 h-full w-[85%] sm:w-[70%] max-w-sm bg-white shadow-xl 
            transform transition-transform duration-300 ${showMenu ? 'translate-x-0' : 'translate-x-full'}`}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <img src={assets.logo} className="w-28" alt="logo" />
              <img
                onClick={() => setShowMenu(false)}
                src={assets.cross_icon}
                className="w-6 cursor-pointer"
                alt="close"
              />
            </div>

            {/* Menu Links */}
            <ul className="flex flex-col gap-5 mt-6 px-6 text-gray-700 font-medium">
              <NavLink className="py-2 border-b border-gray-100" onClick={() => { setShowMenu(false); setShowDropdown(false); }} to="/">
                Home
              </NavLink>
              <NavLink className="py-2 border-b border-gray-100" onClick={() => { setShowMenu(false); setShowDropdown(false); }} to="/doctors">
                All Doctors
              </NavLink>
              <NavLink className="py-2 border-b border-gray-100" onClick={() => { setShowMenu(false); setShowDropdown(false); }} to="/about">
                About
              </NavLink>
              <NavLink className="py-2 border-b border-gray-100" onClick={() => { setShowMenu(false); setShowDropdown(false); }} to="/contact">
                Contact
              </NavLink>
            </ul>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Navbar