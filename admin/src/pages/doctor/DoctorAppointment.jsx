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
    <div className="w-full px-4 md:px-8 py-6">

      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Appointments
        </h1>
        <p className="text-gray-500 mt-1">
          Manage all patient appointments from here.
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">

        {/* Table Header */}
        <div className="grid grid-cols-[0.5fr_2.5fr_1.2fr_1fr_2fr_1fr_1.2fr]
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
              className="grid grid-cols-[0.5fr_2.5fr_1.2fr_1fr_2fr_1fr_1.2fr]
                        items-center
                        px-6 py-4
                        border-b
                        hover:bg-blue-50
                        transition-all duration-200"
            >
              {/* Index */}
              <p className="text-gray-700 font-medium">
                {index + 1}
              </p>

              {/* Patient */}
              <div className="flex items-center gap-3">
                <img
                  src={item.userData.image}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover border"
                />

                <div>
                  <p className="font-semibold text-gray-800">
                    {item.userData.name}
                  </p>

                  <p className="text-sm text-gray-500">
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
              <p className="font-medium text-gray-700">
                {calculateAge(item.userData.dob)}
              </p>

              {/* Date */}
              <div>
                <p className="font-medium text-gray-800">
                  {slotDateFormat(item.slotDate)}
                </p>

                <p className="text-sm text-gray-500">
                  {item.slotTime}
                </p>
              </div>

              {/* Fees */}
              <p className="font-bold text-blue-600">
                {currency}
                {item.amount}
              </p>

              {/* Actions */}
              <div className="flex gap-2">

                {item.cancelled ? (

                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                    ✕ Cancelled
                  </span>

                ) : item.isCompleted ? (

                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    ✓ Completed
                  </span>

                ) : (

                  <>
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="px-3 py-2 rounded-lg bg-red-100 text-red-600 font-semibold hover:bg-red-300 hover:text-white transition"
                    >
                      ❌
                    </button>

                    <button
                      onClick={() => completeAppointment(item._id)}
                      className="px-3 py-2 rounded-lg bg-green-100 text-green-600 font-semibold hover:bg-green-300 hover:text-white transition"
                    >
                      ✅
                    </button>
                  </>

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