import React, { useContext } from 'react'
import { assets } from '../assets/assets_admin/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {

    const { aToken, setAToken } = useContext(AdminContext)
    const { dToken, setDToken } = useContext(DoctorContext)

    const navigate = useNavigate()

    const logout = () => {

        const role = localStorage.getItem('role');

        localStorage.removeItem('aToken');
        localStorage.removeItem('dToken');
        localStorage.removeItem('role');

        setAToken('');
        setDToken('');

        if (role === 'doctor') {
            navigate('/doctor-login');
        } else {
            navigate('/admin-login');
        }
    }

    return (

        <div className='flex items-center justify-between px-4 sm:px-10 py-4 border-b bg-white shadow-md sticky top-0 z-50'>

            {/* Left Side */}
            <div className='flex items-center gap-3'>

                <img
                    className='w-32 sm:w-40 cursor-pointer hover:scale-105 transition-all duration-300'
                    src={assets.admin_logo}
                    alt="Admin Logo"
                />

                {
                    aToken && localStorage.getItem("role") === 'admin' 

                        ? <p className='hidden sm:block border border-blue-500 text-blue-600 text-xs font-semibold px-4 py-1 rounded-full bg-blue-50 shadow-sm'>
                            Admin Panel
                        </p>
                        : <p className='hidden sm:block border border-blue-500 text-blue-600 text-xs font-semibold px-4 py-1 rounded-full bg-blue-50 shadow-sm'>
                            Doctor Panel
                        </p>
                }

            </div>

            {/* Right Side */}
            <button
                onClick={logout}
                className='bg-linear-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium px-8 py-2.5 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300'
            >
                Logout
            </button>

        </div>

    )
}

export default Navbar