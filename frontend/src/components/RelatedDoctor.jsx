import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext);
  const [relDoc, setRelDocs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) =>
          doc.speciality === speciality &&
          doc._id !== docId
      );

      setRelDocs(doctorsData);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className="px-6 md:px-16 lg:px-24 py-12">

      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-semibold text-gray-900">
          Related Doctors
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          Simply browse through our extensive list of trusted doctors.
        </p>
      </div>

      {/* Grid FIXED */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {relDoc.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              window.scrollTo(0, 0);
            }}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-2 transition-all duration-300 bg-white"
          >

            {/* Image */}
            <img
              src={item.image}
              alt=""
              className="w-full aspect-[4/3] object-cover bg-blue-50"
            />

            {/* Content */}
            <div className="p-4">

              {/* Availability */}
              {
                item.available ?
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-green-600">
                    <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                    <p>Available</p>
                  </div>
                  :
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-red-500">
                    <p className="w-2 h-2 bg-red-500 rounded-full"></p>
                    <p>Not Available</p>
                  </div>
              }

              {/* Name */}
              <p className="text-gray-900 font-medium text-lg mt-1">
                {item.name}
              </p>

              {/* Speciality */}
              <p className="text-gray-500 text-sm">
                {item.speciality}
              </p>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default RelatedDoctors;