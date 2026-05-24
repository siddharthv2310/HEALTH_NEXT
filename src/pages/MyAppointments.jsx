import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const MyAppointments = () => {
  const {doctors} = useContext(AppContext);

  return (
    <div className="max-w-5xl mx-auto mt-12 px-4">

      {/* Heading */}
      <p className="text-xl font-semibold text-gray-800 mb-6">
        My Appointments
      </p>

      {/* List */}
      {doctors.slice(0,3).map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center border-b py-6"
        >
          {/* LEFT SIDE */}
          <div className="flex gap-5">

            {/* Image */}
            <img
              src={item.image}
              alt=""
              className="w-24 h-24 rounded-lg object-cover bg-gray-200"
            />

            {/* Info */}
            <div className="text-sm">
              <p className="text-lg font-semibold text-gray-800">
                {item.name}
              </p>
              <p className="text-gray-500">{item.speciality}</p>

              <p className="mt-3 font-medium">Address:</p>
              <p className="text-gray-600">{item.address.line1}</p>
              <p className="text-gray-600">{item.address.line2}</p>

              <p className="mt-3 text-gray-600">
                <span className="font-medium">Date & Time:</span>{" "}
                {item.date} | {item.time}
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-3">

            {item.payment === "paid" ? (
              <button className="px-6 py-2 cursor-pointer bg-indigo-500 text-white rounded-md">
                Paid
              </button>
            ) : (
              <button className="px-6 py-2 cursor-pointer bg-indigo-500 hover:bg-indigo-600 text-white rounded-md transition">
                Pay here
              </button>
            )}

            <button className="px-6 py-2 cursor-pointer border rounded-md text-gray-600 hover:bg-red-500 transition">
              Cancel appointment
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyAppointments
