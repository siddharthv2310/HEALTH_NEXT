import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);

  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointments, setAppointments] = useState([]);

  const activeAppointments = appointments.filter((item) => !item.cancelled);
  const cancelledAppointments = appointments.filter((item) => item.cancelled);

  const navigate = useNavigate();

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split(' ');
    return dateArray[0] + " " + months[Number(dateArray[1]) - 1] + " " + dateArray[2];
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/user/appointments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setAppointments(
          Array.isArray(data.appointments)
            ? [...data.appointments].reverse()
            : []
        );
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };


  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const inthisPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const {data} = await axios.post(backendUrl+'/api/user/verifyRazorpay',response ,{ headers: { Authorization: `Bearer ${token}`, } })
          if(data.success){
            getUserAppointments();
            navigate('/my-appointments')
          }
        }
        catch (err) {
          console.log(err);
          toast.error(err.message);
        }
      }

    }

    console.log(options);
    const rzp = new window.Razorpay(options)
    rzp.open();
  }


  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { Authorization: `Bearer ${token}`, } })

      if (data.success) {
        inthisPay(data.order)
      }
    }
    catch (err) {
      console.log(err);
      toast.error(err.message);
    }

  }

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800">
            My Appointments
          </h1>
          <p className="text-gray-500 mt-2">
            View and manage your booked appointments
          </p>
        </div>

        {/* Empty State */}
        {appointments.length === 0 && (
          <div className="bg-white rounded-2xl shadow-md p-10 text-center">
            <h2 className="text-xl font-semibold text-gray-700">
              No Appointments Found
            </h2>
            <p className="text-gray-500 mt-2">
              You have not booked any appointments yet.
            </p>
          </div>
        )}

        {/* Upcoming Appointments */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Upcoming Appointments
          </h2>

          <div className="space-y-6">
            {activeAppointments.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-md p-6 text-center">
                <p className="text-gray-500">No upcoming appointments</p>
              </div>
            ) : (
              activeAppointments.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-3xl shadow-md border border-gray-100 p-6 flex flex-col md:flex-row md:justify-between gap-6 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row gap-5">
                    <img
                      src={item.docData.image}
                      alt=""
                      className="w-32 h-32 rounded-2xl object-cover bg-indigo-100"
                    />

                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        {item.docData.name}
                      </h2>
                      <p className="text-indigo-600 font-medium mt-1">
                        {item.docData.speciality}
                      </p>

                      <div className="mt-4">
                        <p className="font-semibold text-gray-700">
                          Address
                        </p>
                        <p className="text-gray-500">
                          {item.docData.address.line1}
                        </p>
                        <p className="text-gray-500">
                          {item.docData.address.line2}
                        </p>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-3">
                        <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl text-sm font-medium">
                          {slotDateFormat(item.slotDate)}
                        </div>
                        <div className="bg-green-50 text-green-700 px-4 py-2 rounded-xl text-sm font-medium">
                          {item.slotTime}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center gap-4 min-w-[200px]">
                    {item.payment ? (
                      <button className="bg-green-500 text-white py-3 rounded-xl font-semibold cursor-default">
                        Paid
                      </button>
                    ) : (
                      <button onClick={() => appointmentRazorpay(item._id)} className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold">
                        Pay Now
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setSelectedAppointment(item._id);
                        setShowModal(true);
                      }}
                      className="border border-red-400 text-red-500 hover:bg-red-500 hover:text-white py-3 rounded-xl font-semibold"
                    >
                      Cancel Appointment
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Cancelled Appointments */}
        <div>
          <h2 className="text-2xl font-semibold text-red-500 mb-6">
            Cancelled Appointments
          </h2>

          <div className="space-y-6">
            {cancelledAppointments.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-md p-6 text-center">
                <p className="text-gray-500">No cancelled appointments</p>
              </div>
            ) : (
              cancelledAppointments.map((item) => (
                <div
                  key={item._id}
                  className="bg-gray-50 rounded-3xl shadow-sm border border-red-200 p-6 flex flex-col md:flex-row md:justify-between gap-6 opacity-80"
                >
                  <div className="flex flex-col sm:flex-row gap-5">
                    <img
                      src={item.docData.image}
                      alt=""
                      className="w-32 h-32 rounded-2xl object-cover bg-gray-200"
                    />

                    <div>
                      <h2 className="text-2xl font-bold text-gray-700">
                        {item.docData.name}
                      </h2>
                      <p className="text-gray-500 font-medium mt-1">
                        {item.docData.speciality}
                      </p>

                      <div className="mt-4">
                        <p className="font-semibold text-gray-700">
                          Address
                        </p>
                        <p className="text-gray-500">
                          {item.docData.address.line1}
                        </p>
                        <p className="text-gray-500">
                          {item.docData.address.line2}
                        </p>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-3">
                        <div className="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium">
                          {slotDateFormat(item.slotDate)}
                        </div>
                        <div className="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium">
                          {item.slotTime}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center min-w-[200px]">
                    <div className="bg-red-100 text-red-600 px-6 py-3 rounded-xl font-semibold">
                      Appointment Cancelled
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-md rounded-2xl p-6 shadow-2xl">
            <h2 className="text-2xl font-semibold text-gray-800">
              Information
            </h2>
            <p className="text-gray-500 mt-3">
              Are you sure you want to cancel this appointment?
            </p>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedAppointment(null);
                }}
                className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              >
                No
              </button>

              <button
                onClick={() => {
                  cancelAppointment(selectedAppointment);
                  setShowModal(false);
                }}
                className="px-5 py-2 bg-rose-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyAppointments;