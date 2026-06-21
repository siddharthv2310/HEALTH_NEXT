import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AllAppointments = () => {

    const {
        aToken,
        appointments,
        getAllAppointments, cancelAppointment
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

        <div className='w-full p-4 md:p-6'>

            {/* Heading */}

            <div className='bg-white rounded-2xl shadow-md overflow-hidden'>

                <div className='px-4 py-4 sm:px-6 sm:py-5 border-b'>

                    <h2 className='text-xl sm:text-2xl font-bold text-gray-800'>
                        All Appointments
                    </h2>

                    <p className='text-sm text-gray-500 mt-1'>
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
                    appointments.length === 0 ? (

                        <div className="flex flex-col items-center justify-center py-20">

                            <h3 className="text-2xl font-semibold text-gray-700">
                                No Appointments Found
                            </h3>

                            <p className="mt-2 text-gray-500 text-sm">
                                There are currently no appointments available.
                            </p>

                        </div>

                    ) :

                        (
                            appointments.map((item, index) => (


                                <div
                                    key={index}
                                    className='flex flex-col gap-3 sm:grid md:grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] md:gap-4 px-4 py-5 sm:px-6 sm:py-4 border-b items-start md:items-center hover:bg-gray-50 transition-all duration-300'
                                >

                                    {/* Index */}

                                    <p className='font-medium text-gray-500 text-sm md:text-base'>
                                        <span className='inline md:hidden text-xs text-gray-400 font-normal mr-1'>Appointment :</span>{index + 1}
                                    </p>

                                    {/* Patient */}

                                    <div className='flex items-center gap-3 w-full md:w-auto'>

                                        <img
                                            src={item.userData.image}
                                            alt=""
                                            className='w-10 h-10 rounded-full border object-cover shrink-0'
                                        />

                                        <div>

                                            <p className='font-medium text-gray-800 text-sm md:text-base'>
                                                {item.userData.name}
                                            </p>

                                            <p className='text-xs text-gray-500'>
                                                Patient
                                            </p>

                                        </div>

                                    </div>

                                    {/* Age */}

                                    <p className='text-gray-600 text-sm md:text-base'>
                                        <span className='inline md:hidden text-xs text-gray-400 block font-normal'>Age : </span>
                                        {calculateAge(item.userData.dob)}
                                    </p>

                                    {/* Date */}

                                    <div>
                                        <span className='inline md:hidden text-xs text-gray-400 block font-normal mb-0.5'>Date & Time </span>
                                        <p className='font-medium text-gray-700 text-sm md:text-base'>
                                            {slotDateFormat(item.slotDate)}
                                        </p>

                                        <p className='text-xs font-medium sm:text-sm text-gray-500'>
                                            {item.slotTime}
                                        </p>

                                    </div>

                                    {/* Doctor */}

                                    <div className='flex items-center gap-3 w-full md:w-auto'>

                                        <img
                                            src={item.docData.image}
                                            alt=""
                                            className='w-10 h-10 rounded-full bg-gray-100 object-cover shrink-0'
                                        />

                                        <div>

                                            <p className='font-medium text-gray-800 text-sm md:text-base'>
                                                {item.docData.name}
                                            </p>

                                            <p className='text-xs text-blue-500'>
                                                {item.docData.speciality}
                                            </p>

                                        </div>

                                    </div>

                                    {/* Amount */}

                                    <p className='font-semibold text-green-600 text-sm md:text-base'>
                                        <span className='inline md:hidden text-xs text-gray-400 block font-normal mb-0.5'>Fees : </span>
                                        {currency}
                                        {item.amount}
                                    </p>

                                    {/* Status */}

                                    <div className='w-full md:w-auto mt-2 md:mt-0'>

                                        {
                                            item.cancelled ? (

                                                <span className='inline-block px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold'>
                                                    Cancelled
                                                </span>

                                            ) : item.isCompleted ? (

                                                <span className='inline-block px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-semibold'>
                                                    Completed
                                                </span>

                                            ) : (

                                                <button
                                                    onClick={() => cancelAppointment(item._id)}
                                                    className='w-full md:w-auto px-4 py-2 bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-600 rounded-lg text-sm transition-all duration-300 border border-blue-200 font-medium'
                                                >
                                                    Cancel Appointment
                                                </button>

                                            )
                                        }

                                    </div>

                                </div>

                            ))
                        )
                }

            </div>

        </div>

    )
}

export default AllAppointments