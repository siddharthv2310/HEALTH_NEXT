import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import { assets } from '../assets/assets_admin/assets'

const Sidebar = () => {

    const { aToken } = useContext(AdminContext)

    const navLinkClass = ({ isActive }) =>
        `flex items-center gap-4 py-3.5 px-5 md:px-8 rounded-xl cursor-pointer
        ${isActive
            ? 'bg-gradient-to-r from-blue-50 to-indigo-100 text-blue-700 shadow-md border border-blue-100'
            : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
        }`

    return (

        <div className='min-h-screen w-[250px] md:w-[280px] bg-white border-r border-gray-100 shadow-sm'>

            {
                aToken &&

                <div className='pt-6 px-3'>

                    <ul className='flex flex-col gap-3'>

                        {/* Dashboard */}
                        <NavLink
                            className={navLinkClass}
                            to={'/admin-dashboard'}
                        >

                            <div className='bg-blue-100 p-2 rounded-lg'>
                                <img
                                    className='w-5 h-5'
                                    src={assets.home_icon}
                                    alt=""
                                />
                            </div>

                            <p className='hidden md:block font-medium text-[15px]'>
                                Dashboard
                            </p>

                        </NavLink>

                        {/* Appointments */}
                        <NavLink
                            className={navLinkClass}
                            to={'/all-appointments'}
                        >

                            <div className='bg-purple-100 p-2 rounded-lg'>
                                <img
                                    className='w-5 h-5'
                                    src={assets.appointment_icon}
                                    alt=""
                                />
                            </div>

                            <p className='hidden md:block font-medium text-[15px]'>
                                Appointments
                            </p>

                        </NavLink>

                        {/* Add Doctor */}
                        <NavLink
                            className={navLinkClass}
                            to={'/add-doctor'}
                        >

                            <div className='bg-green-100 p-2 rounded-lg'>
                                <img
                                    className='w-5 h-5'
                                    src={assets.add_icon}
                                    alt=""
                                />
                            </div>

                            <p className='hidden md:block font-medium text-[15px]'>
                                Add Doctor
                            </p>

                        </NavLink>

                        {/* Doctors List */}
                        <NavLink
                            className={navLinkClass}
                            to={'/doctor-list'}
                        >

                            <div className='bg-pink-100 p-2 rounded-lg'>
                                <img
                                    className='w-5 h-5'
                                    src={assets.people_icon}
                                    alt=""
                                />
                            </div>

                            <p className='hidden md:block font-medium text-[15px]'>
                                Doctors List
                            </p>

                        </NavLink>

                    </ul>

                </div>
            }

        </div>
    )
}

export default Sidebar