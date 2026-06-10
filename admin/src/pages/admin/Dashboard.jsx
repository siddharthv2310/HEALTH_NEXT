import React, { useContext, useEffect } from 'react';
// import { assets } from '../../assets/assets';
import { assets } from '../../assets/assets_admin/assets';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext);

  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);


  if (!dashData) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="m-6 space-y-8 max-w-7xl mx-auto p-4 animate-fade-in">
      {/* page header */}
      <div className="mb-6">

        <h1 className="text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Monitor doctors, appointments and overall platform activity.
        </p>

      </div>

      {/* --- STATS CARDS SECTION --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Doctors Card */}
        <div className="flex items-center gap-5 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="p-4 bg-blue-50 rounded-xl">
            <img className="w-8 h-8 object-contain" src={assets.doctor_icon} alt="Doctors" />
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-800 tracking-tight">{dashData.doctors || 0}</p>
            <p className="text-sm font-medium text-gray-400 mt-0.5">Total Doctors</p>
          </div>
        </div>

        {/* Appointments Card */}
        <div className="flex items-center gap-5 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="p-4 bg-indigo-50 rounded-xl">
            <img className="w-8 h-8 object-contain" src={assets.appointments_icon} alt="Appointments" />
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-800 tracking-tight">{dashData.appointments || 0}</p>
            <p className="text-sm font-medium text-gray-400 mt-0.5">Total Appointments</p>
          </div>
        </div>

        {/* Patients Card */}
        <div className="flex items-center gap-5 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="p-4 bg-emerald-50 rounded-xl">
            <img className="w-8 h-8 object-contain" src={assets.patients_icon} alt="Patients" />
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-800 tracking-tight">{dashData.patients || 0}</p>
            <p className="text-sm font-medium text-gray-400 mt-0.5">Total Patients</p>
          </div>
        </div>

      </div>

      {/* --- LATEST BOOKINGS SECTION --- */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        {/* Section Header */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-50 bg-gray-50/50">
          <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100">
            <img className="w-5 h-5" src={assets.list_icon} alt="List" />
          </div>
          <p className="font-semibold text-gray-800 text-lg">Latest Bookings</p>
        </div>

        {/* Bookings List */}
        <div className="divide-y divide-gray-100">
          {dashData.latestAppointments && dashData.latestAppointments.length > 0 ? (
            dashData.latestAppointments.map((item, index) => (
              <div
                key={item._id || index}
                className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/70 transition-colors duration-200 group"
              >
                {/* Doctor Info */}
                <div className="flex items-center gap-4">
                  <img
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-100 bg-gray-50"
                    src={item.docData?.image || assets.doctor_icon}
                    alt={item.docData?.name || "Doctor"}
                  />
                  <div>
                    <p className="font-semibold text-gray-800 text-base group-hover:text-blue-600 transition-colors">
                      {item.docData?.name || 'Unknown Doctor'}
                    </p>
                    <p className="text-xs font-medium text-gray-400 mt-0.5">
                      Booking on <span className="text-gray-500">{slotDateFormat(item.slotDate)}</span>
                    </p>
                  </div>
                </div>

                {/* Action Button Status */}
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

                      // <button
                      //   onClick={() => cancelAppointment(item._id)}
                      //   className='px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-300'
                      // >
                      //   Pending
                      // </button>
                      <div className='flex gap-4'>
                        <button
                          onClick={async () => {
                            await cancelAppointment(item._id);
                            getDashData(); // Instantly syncs dashboard card figures following layout modifications
                          }}
                          className="px-3 py-1 rounded-lg bg-red-100 text-red-600 font-semibold hover:bg-red-300 hover:text-white transition cursor-pointer"
                        >
                          ❌
                        </button>

                        <span className='px-3 py-2 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold'>
                          Pending
                        </span>
                      </div>
                    )
                  }

                </div>

              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <p className="text-sm font-medium">No recent appointments found</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default Dashboard;