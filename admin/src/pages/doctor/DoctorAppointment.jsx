import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from '../../assets/assets_admin/assets'
import { AppContext } from "../../context/AppContext";

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext);
  const { slotDateFormat, currency, calculateAge } = useContext(AppContext)


  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-6 pb-12">

      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Appointments
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage all patient appointments from here.
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">

        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_2.5fr_1.2fr_1fr_2fr_1fr_1.2fr]
                        bg-gray-50
                        px-6 py-4
                        border-b
                        font-semibold
                        text-gray-700
                        text-sm">

          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Appointments */}
        <div className="max-h-[75vh] overflow-y-auto">

          {appointments?.map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 sm:grid sm:grid-cols-[0.5fr_2.5fr_1.2fr_1fr_2fr_1fr_1.2fr]
                        items-start sm:items-center
                        px-4 py-5 sm:px-6 sm:py-4
                        border-b
                        hover:bg-blue-50
                        transition-all duration-200"
            >
              {/* Index */}
              <p className="text-gray-700 font-medium text-sm sm:text-base">
                <span className="inline sm:hidden text-xs text-gray-400 font-normal mr-1">Appointment : </span>{index + 1}
              </p>

              {/* Patient */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <img
                  src={item.userData.image}
                  alt=""
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border shrink-0"
                />

                <div className="min-w-0">
                  <p className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                    {item.userData.name}
                  </p>

                  <p className="text-xs sm:text-sm text-gray-500 truncate">
                    {item.userData.email}
                  </p>
                </div>
              </div>

              {/* Payment */}
              <div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${item.payment
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-700"
                    }`}
                >
                  {item.payment ? "ONLINE" : "CASH"}
                </span>
              </div>

              {/* Age */}
              <p className="font-medium text-gray-700 text-sm sm:text-base">
                <span className="inline sm:hidden text-xs text-gray-400 block font-normal mb-0.5">Age : </span>
                {calculateAge(item.userData.dob)}
              </p>

              {/* Date */}
              <div>
                <span className="inline sm:hidden text-xs text-gray-400 block font-normal mb-0.5">Date & Time </span>
                <p className="font-medium text-gray-800 text-sm sm:text-base">
                  {slotDateFormat(item.slotDate)}
                </p>

                <p className="text-xs sm:text-sm text-gray-500">
                  {item.slotTime}
                </p>
              </div>

              {/* Fees */}
              <p className="font-bold text-blue-600 text-sm sm:text-base">
                <span className="inline sm:hidden text-xs text-gray-400 block font-normal mb-0.5">Fees :</span>
                {currency}
                {item.amount}
              </p>

              {/* Actions */}
              <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">

                {item.cancelled ? (

                  <span className="w-full sm:w-auto text-center px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs sm:text-sm font-semibold">
                    ✕ Cancelled
                  </span>

                ) : item.isCompleted ? (

                  <span className="w-full sm:w-auto text-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm font-semibold">
                    ✓ Completed
                  </span>

                ) : (

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="flex-1 sm:flex-none px-4 py-2 sm:px-3 sm:py-2 rounded-lg bg-red-100 text-red-600 font-semibold hover:bg-red-300 hover:text-white transition text-center text-sm"
                    >
                      ❌ Cancel
                    </button>

                    <button
                      onClick={() => completeAppointment(item._id)}
                      className="flex-1 sm:flex-none px-4 py-2 sm:px-3 sm:py-2 rounded-lg bg-green-100 text-green-600 font-semibold hover:bg-green-300 hover:text-white transition text-center text-sm"
                    >
                      ✅ Complete
                    </button>
                  </div>

                )}

              </div>
            </div>
          ))}

          {/* Empty State */}
          {appointments?.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-gray-400 text-lg">
                No appointments found
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointments;