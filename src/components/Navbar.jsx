import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()

  const [showMenu, setShowMenu] = useState(false)
  const [token, setToken] = useState(true)
  const [showDropdown, setShowDropdown] = useState(false) 

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-400">

      {/* -------- Logo -------- */}
      <img
        onClick={() => {
          navigate('/')
          scrollTo(0, 0)
        }}
        className="cursor-pointer w-44"
        src={assets.logo}
        alt="logo"
      />

      {/* -------- Desktop Menu -------- */}
      <ul className="hidden md:flex items-start gap-5 font-medium">

        <NavLink to="/">
          <li className="py-1">HOME</li>
        </NavLink>

        <NavLink to="/doctors">
          <li className="py-1">ALL DOCTORS</li>
        </NavLink>

        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
        </NavLink>

        <NavLink to="/contact">
          <li className="py-1">CONTACT</li>
        </NavLink>

      </ul>

      {/* -------- Right Section -------- */}
      <div className="flex items-center gap-4">

        {/* -------- User / Button -------- */}
        {token ? (
          <div className="relative group">

            {/* Profile Click */}
            <div
              onClick={() => setShowDropdown((prev) => !prev)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <img
                className="w-8 rounded-full"
                src={assets.profile_pic}
                alt="profile"
              />

              <img
                className={`w-2.5 transition-transform ${
                  showDropdown ? 'rotate-180' : ''
                }`}
                src={assets.dropdown_icon}
                alt="dropdown"
              />
            </div>

            {/* Dropdown */}
            <div
              className={`
                absolute right-0 top-12 z-20 min-w-48 bg-stone-100 rounded p-4 text-gray-600 flex flex-col gap-3 shadow-md

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
                onClick={() => {
                  setToken(false)
                  setShowDropdown(false)
                }}
                className="cursor-pointer px-2 py-1 rounded hover:bg-amber-50 hover:text-black"
              >
                Logout
              </p>

            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="hidden md:block bg-blue-600 text-white px-8 py-3 rounded-full 
            cursor-pointer active:scale-95 active:bg-blue-400"
          >
            Create Account
          </button>
        )}

        {/* -------- Mobile Menu Icon -------- */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 cursor-pointer md:hidden active:scale-90 transition"
          src={assets.menu_icon}
          alt="menu"
        />

        {/* -------- Mobile Menu -------- */}
        <div
          className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
            showMenu ? 'visible opacity-100' : 'invisible opacity-0'
          }`}
        >

          {/* Overlay */}
          <div
            onClick={() => setShowMenu(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Menu Panel */}
          <div
            className={`absolute top-0 right-0 h-full w-3/4 max-w-xs bg-white shadow-xl 
            transform transition-transform duration-300 ${
              showMenu ? 'translate-x-0' : 'translate-x-full'
            }`}
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

              <NavLink onClick={() => setShowMenu(false)} to="/">
                Home
              </NavLink>

              <NavLink onClick={() => setShowMenu(false)} to="/doctors">
                All Doctors
              </NavLink>

              <NavLink onClick={() => setShowMenu(false)} to="/about">
                About
              </NavLink>

              <NavLink onClick={() => setShowMenu(false)} to="/contact">
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