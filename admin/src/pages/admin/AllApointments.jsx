import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AllAppointments = () => {

    const {
        aToken,
        appointments,
        getAllAppointments,cancelAppointment
    } = useContext(AdminContext);

    const {
        calculateAge,
        slotDateFormat,
        currency
    } = useContext(AppContext);

    useEffect(() => {

        if (aToken) {
            getAllAppointments();
        }

    }, [aToken]);

    return (

        <div className='w-full p-6'>

            {/* Heading */}

            <div className='bg-white rounded-2xl shadow-md overflow-hidden'>

                <div className='px-6 py-5 border-b'>

                    <h2 className='text-2xl font-bold text-gray-800'>
                        All Appointments
                    </h2>

                    <p className='text-gray-500 mt-1'>
                        Manage all patient appointments
                    </p>

                </div>

                {/* Header */}

                <div className='hidden md:grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] gap-4 px-6 py-4 bg-gray-50 font-semibold text-gray-600 border-b'>

                    <p>#</p>
                    <p>Patient</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Doctor</p>
                    <p>Fees</p>
                    <p>Status</p>

                </div>

                {/* Rows */}

                {
                    appointments.map((item, index) => (


                        <div
                            key={index}
                            className='grid md:grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] gap-4 px-6 py-4 border-b items-center hover:bg-gray-50 transition-all duration-300'
                        >

                            {/* Index */}

                            <p className='font-medium text-gray-500'>
                                {index + 1}
                            </p>

                            {/* Patient */}

                            <div className='flex items-center gap-3'>

                                <img
                                    src={item.userData.image}
                                    alt=""
                                    className='w-10 h-10 rounded-full border object-cover'
                                />

                                <div>

                                    <p className='font-medium text-gray-800'>
                                        {item.userData.name}
                                    </p>

                                    <p className='text-xs text-gray-500'>
                                        Patient
                                    </p>

                                </div>

                            </div>

                            {/* Age */}

                            <p className='text-gray-600'>
                                {calculateAge(item.userData.dob)}
                            </p>

                            {/* Date */}

                            <div>

                                <p className='font-medium text-gray-700'>
                                    {slotDateFormat(item.slotDate)}
                                </p>

                                <p className='text-sm text-gray-500'>
                                    {item.slotTime}
                                </p>

                            </div>

                            {/* Doctor */}

                            <div className='flex items-center gap-3'>

                                <img
                                    src={item.docData.image}
                                    alt=""
                                    className='w-10 h-10 rounded-full bg-gray-100 object-cover'
                                />

                                <div>

                                    <p className='font-medium text-gray-800'>
                                        {item.docData.name}
                                    </p>

                                    <p className='text-xs text-blue-500'>
                                        {item.docData.speciality}
                                    </p>

                                </div>

                            </div>

                            {/* Amount */}

                            <p className='font-semibold text-green-600'>
                                {currency}
                                {item.amount}
                            </p>

                            {/* Status */}

                            <div>

                                {
                                    item.cancelled ? (

                                        <span className='px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold'>
                                            Cancelled
                                        </span>

                                    ) : item.isCompleted ? (

                                        <span className='px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-semibold'>
                                            Completed
                                        </span>

                                    ) : (

                                        <button
                                            onClick={()=> cancelAppointment(item._id)}
                                            className='px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-300'
                                        >
                                            Pending
                                        </button>

                                    )
                                }

                            </div>

                        </div>

                    ))
                }

            </div>

        </div>

    )
}

export default AllAppointments