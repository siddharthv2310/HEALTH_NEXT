const DoctorsList = ({ doctors, onBookDoctor, bookingLoadingId }) => {

    if (!doctors?.length) {
        return null;
    }

    return (
        <div className="mt-3 flex flex-col gap-3">

            {doctors.map((doctor) => (

                <div
                    key={doctor.id}
                    className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm"
                >
                    <h3 className="font-semibold text-gray-900">
                        {doctor.name}
                    </h3>

                    <p className="text-sm text-gray-600">
                        {doctor.speciality}
                    </p>

                    <p className="text-sm">
                        Experience: {doctor.experience}
                    </p>

                    <p className="text-sm">
                        Fee: ₹{doctor.fees}
                    </p>

                    <p className="text-sm">
                        {doctor.available
                            ? "Available"
                            : "Unavailable"}
                    </p>

                    {
                        doctor.nearestSlot && (
                            <p className="mt-2 text-sm text-orange-600 font-medium">
                                Requested time is unavailable.
                                <br />
                                Nearest Slot: {doctor.nearestSlot}
                            </p>
                        )
                    }

                    <button
                        disabled={
                            !doctor.available ||
                            bookingLoadingId === doctor.id
                        }
                        onClick={() =>
                            onBookDoctor(
                                doctor.id,
                                doctor.bookingData
                            )
                        }
                        className={`mt-3 w-full py-2 rounded-lg text-white ${
                            doctor.available
                                ? "bg-blue-600 hover:bg-blue-700"
                                : "bg-gray-400 cursor-not-allowed"
                        }`}
                    >
                        {
                            bookingLoadingId === doctor.id
                                ? "Booking..."
                                : doctor.available
                                    ? "Book Appointment"
                                    : "Unavailable"
                        }
                    </button>

                </div>

            ))}

        </div>
    );
};

export default DoctorsList;