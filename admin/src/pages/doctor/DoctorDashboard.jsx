import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets_admin/assets'

const DoctorDashboard = () => {

  const { dToken, dashData, getDashData } = useContext(DoctorContext)

  const { slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getDashData()
    }
  }, [dToken])

  if (!dashData) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (

    <div className="mx-auto my-6 px-4 sm:px-6 space-y-6 md:space-y-8 max-w-7xl animate-fade-in pb-12">

      {/* page header */}
      <div className="mb-6">

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Doctor Dashboard
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Manage appointments, track earnings and monitor patient activity.
        </p>

      </div>

      {/* STATS CARDS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

        {/* Earnings */}

        <div className="flex items-center gap-5 bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">

          <div className="p-3 sm:p-4 bg-green-50 rounded-xl shrink-0">
            <img
              className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
              src={assets.earning_icon}
              alt=""
            />
          </div>

          <div>
            <p className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
              {currency}{dashData.earning || 0}
            </p>

            <p className="text-xs sm:text-sm font-medium text-gray-400 mt-0.5">
              Total Earnings
            </p>
          </div>

        </div>

        {/* Appointments */}

        <div className="flex items-center gap-5 bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">

          <div className="p-3 sm:p-4 bg-indigo-50 rounded-xl shrink-0">
            <img
              className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
              src={assets.appointments_icon}
              alt=""
            />
          </div>

          <div>
            <p className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
              {dashData.appointments || 0}
            </p>

            <p className="text-xs sm:text-sm font-medium text-gray-400 mt-0.5">
              Total Appointments
            </p>
          </div>

        </div>

        {/* Patients */}

        <div className="flex items-center gap-5 bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 sm:col-span-2 lg:col-span-1">

          <div className="p-3 sm:p-4 bg-blue-50 rounded-xl shrink-0">
            <img
              className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
              src={assets.patients_icon}
              alt=""
            />
          </div>

          <div>
            <p className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
              {dashData.patients || 0}
            </p>

            <p className="text-xs sm:text-sm font-medium text-gray-400 mt-0.5">
              Total Patients
            </p>
          </div>

        </div>

      </div>

      {/* RECENT APPOINTMENTS */}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        {/* Header */}

        <div className="flex items-center gap-3 px-4 py-4 sm:px-6 sm:py-5 border-b border-gray-50 bg-gray-50/50">

          <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100">
            <img
              className="w-5 h-5"
              src={assets.list_icon}
              alt=""
            />
          </div>

          <p className="font-semibold text-gray-800 text-base sm:text-lg">
            Recent Appointments
          </p>

        </div>

        {/* Appointment List */}

        <div className="divide-y divide-gray-100">

          {
            dashData.latestAppointments &&
              dashData.latestAppointments.length > 0 ? (

              dashData.latestAppointments.map((item, index) => (

                <div
                  key={item._id || index}
                  className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-4 py-4 sm:px-6 hover:bg-gray-50/70 transition-colors duration-200"
                >

                  {/* Patient Info */}

                  <div className="flex items-center gap-4 w-full sm:w-auto">

                    <img
                      className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-gray-100 bg-gray-50 shrink-0"
                      src={item.userData?.image}
                      alt=""
                    />

                    <div>

                      <p className="font-semibold text-gray-800 text-sm sm:text-base">
                        {item.userData?.name}
                      </p>

                      <p className="text-xs font-medium text-gray-400 mt-0.5">
                        Appointment on{" "}
                        <span className="text-gray-500">
                          {slotDateFormat(item.slotDate)}
                        </span>
                      </p>

                    </div>

                  </div>

                  {/* Status */}

                  <div className="w-full sm:w-auto flex justify-start sm:justify-end">

                    {
                      item.cancelled ? (

                        <span className="inline-block px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold">
                          Cancelled
                        </span>

                      ) : item.isCompleted ? (

                        <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-semibold">
                          Completed
                        </span>

                      ) : (

                        <span className="inline-block px-3 py-1 rounded-full bg-yellow-100 text-yellow-600 text-xs font-semibold">
                          Pending
                        </span>

                      )
                    }

                  </div>

                </div>

              ))

            ) : (

              <div className="flex flex-col items-center justify-center py-12 text-gray-400">

                <img
                  src={assets.appointments_icon}
                  className="w-12 opacity-30 mb-3"
                  alt=""
                />

                <p className="text-sm font-medium">
                  No recent appointments found
                </p>

              </div>

            )
          }

        </div>

      </div>

    </div>
  )
}

export default DoctorDashboard