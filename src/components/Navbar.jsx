import React, { useState } from 'react'
import {assets} from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
const Navbar = () => {

    const navigate=useNavigate();

    const [showMenu, setshowMenu] = useState(false)
    const [token, settoken] = useState(true)

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 '>
      <img onClick={()=> {navigate('/'); scrollTo(0,0)}} className='cursor-pointer w-44' src={assets.logo} alt="image" />
      <ul className='hidden md:flex items-start gap-5 font-medium'>
        <NavLink to='/'>
            <li className='py-1 '>
                HOME
            </li>
            <hr className='border-none outline-none h-0.5 bg-gray-400 w-3/5 m-auto hidden' />
        </NavLink >

        <NavLink to='/doctors'>
            <li className='py-1 '>
                ALL DOCTORS
            </li>
            <hr className='border-none outline-none h-0.5 bg-gray-400 w-3/5 m-auto hidden' />
        </NavLink>

        <NavLink to='/about'>
            <li className='py-1 '>
                ABOUT
            </li>
            <hr className='border-none outline-none h-0.5 bg-gray-400 w-3/5 m-auto hidden' />
        </NavLink>

        <NavLink to='/contact'>
            <li className='py-1 '>
                CONTACT
            </li>
            <hr className='border-none outline-none h-0.5 bg-gray-400 w-3/5 m-auto hidden' />
        </NavLink>
      </ul>
      <div className='flex items-center gap-4'>
        {
            token
            ?<div className='flex items-center gap-2 cursor-pointer group relative'>
                <img className=' w-8 rounded-full' src={assets.profile_pic} alt="profilepic"/>
                <img className=' w-2.5' src={assets.dropdown_icon} alt="profilepic"/>
                <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                    <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 ">
                        <p onClick={()=> navigate('./my-profile')} className='hover:text-black hover:bg-amber-50 hover:w-fit hover:rounded-2xl cursor-pointer px-2 py-1 '>My Profile</p>
                        <p onClick={()=> navigate('./my-appointments')} className='hover:text-black hover:bg-amber-50 hover:w-fit hover:rounded-2xl cursor-pointer px-2 py-1'> My Appointments</p>
                        <p onClick={()=> settoken(false)} className='hover:text-black hover:bg-amber-50 hover:w-fit hover:rounded-2xl cursor-pointer px-2 py-1'> Logout</p>
                    </div>
                </div>
            </div>
            :<button onClick={()=>{navigate('/login')}} className='bg-blue-600 cursor-pointer active:scale-95 active:bg-blue-400 text-white px-8 py-3 rounded-full font-light hidden md:block'>Create Acount</button>
        }
        
      </div>
    </div>
  )
}

export default Navbar
