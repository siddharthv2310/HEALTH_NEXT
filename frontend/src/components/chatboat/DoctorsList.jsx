const DoctorsList = ({ doctors }) => {

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
                </div>

            ))}

        </div>
    );
};

export default DoctorsList;