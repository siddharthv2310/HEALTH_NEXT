const AppointmentList = ({
    appointments,
    handleCancel
}) => {

    if (!appointments?.length) {
        return null;
    }

    return (
        <div className="mt-3 flex flex-col gap-3">

            {appointments.map(app => (

                <div
                    key={app.id}
                    className="bg-white border rounded-xl p-3 shadow-sm"
                >
                    <h3 className="font-semibold">
                        {app.doctorName}
                    </h3>

                    <p>
                        {app.speciality}
                    </p>

                    <p>
                        Date : {app.date}
                    </p>

                    <p>
                        Time : {app.time}
                    </p>

                    <p>
                        Fee : ₹{app.amount}
                    </p>

                {
                        app.cancelled ? (
                            <button
                                disabled
                                className="mt-3 bg-gray-400 text-white px-3 py-2 rounded-lg cursor-not-allowed"
                            >
                                Cancelled
                            </button>
                        ) : app.payment ? (
                            <button
                                disabled
                                className="mt-3 bg-green-500 text-white px-3 py-2 rounded-lg cursor-not-allowed"
                            >
                                Paid Appointment
                            </button>
                        ) : (
                            <button
                                onClick={() => handleCancel(app.id)}
                                className="mt-3 bg-red-400 text-white px-3 py-2 rounded-lg cursor-pointer"
                            >
                                Cancel Appointment
                            </button>
                        )
                    }

                </div>

            ))}

        </div>
    );
};

export default AppointmentList;