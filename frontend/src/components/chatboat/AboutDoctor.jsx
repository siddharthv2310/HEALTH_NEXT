
const AboutDoctor = ({doctor}) => {
    if(!doctor)
        return null;

    return (
        <div className="mt-3 bg-white border border-gray-200 rounded-xl p-4 shadow-sm">

            <h2 className="font-bold text-lg">
                {doctor.name}
            </h2>

            <p>
                {doctor.speciality}
            </p>

            <p>
                Degree: {doctor.degree}
            </p>

            <p>
                Experience: {doctor.experience}
            </p>

            <p>
                Fee: ₹{doctor.fees}
            </p>

            <p>
                {doctor.available
                    ? " Available"
                    : " Unavailable"}
            </p>

            {doctor.about && (
                <p className="mt-2 text-sm text-gray-600">
                    {doctor.about}
                </p>
            )}
        </div>
    )
}

export default AboutDoctor
