import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const {
    dToken,
    backendUrl,
    profileData,
    getProfileData,
    setProfileData,
  } = useContext(DoctorContext);

  const { currency } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateProfile = async () => {
    try {

      const formData = new FormData();

      formData.append("fees", Number(profileData.fees));
      formData.append("available", profileData.available);

      formData.append(
        "address",
        JSON.stringify(profileData.address)
      );

      if (image) {
        formData.append("image", image);
      }

      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${dToken}`,
          },
        }
      );

      if (data.success) {

        toast.success(data.message);

        setIsEdit(false);

        setImage(false);

        getProfileData();

      } else {
        toast.error(data.message);
      }

    } catch (err) {

      console.log(err);

      toast.error(err.response?.data?.message || err.message);

    }
  };

  const toggleAvailability = async () => {
    try {
      const newAvailability = !profileData.available;


      setProfileData((prev) => ({
        ...prev,
        available: newAvailability,
      }));

      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        {
          fees: Number(profileData.fees),
          address: profileData.address,
          available: newAvailability,
        },
        {
          headers: {
            Authorization: `Bearer ${dToken}`,
          },
        }
      );

      if (data.success) {
        toast.success(
          `Doctor marked as ${newAvailability ? "Available" : "Unavailable"
          }`
        );
      } else {
        toast.error(data.message);


        setProfileData((prev) => ({
          ...prev,
          available: !newAvailability,
        }));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);


      setProfileData((prev) => ({
        ...prev,
        available: !prev.available,
      }));
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  if (!profileData) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading Profile...
      </div>
    );
  }

  return profileData && (
    <div className="p-4 sm:p-6 pb-12 w-full">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* PROFILE CARD */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-8">

          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start text-center md:text-left">

            <div className="flex justify-center shrink-0">
              {
                isEdit ? (
                  <label htmlFor="doc-image" className="cursor-pointer relative block">

                    <img
                      src={image ? URL.createObjectURL(image) : profileData.image}
                      alt=""
                      className="w-44 h-44 sm:w-52 sm:h-52 rounded-2xl object-cover"
                    />

                    <div className="absolute inset-0 bg-black/30 rounded-2xl flex items-center justify-center text-white font-medium text-sm">
                      Change Photo
                    </div>

                    <input
                      type="file"
                      id="doc-image"
                      hidden
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                    />

                  </label>
                ) : (
                  <img
                    src={profileData.image}
                    alt=""
                    className="w-44 h-44 sm:w-52 sm:h-52 rounded-2xl object-cover"
                  />
                )
              }
            </div>

            <div className="flex-1 w-full min-w-0">

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 break-words">
                {profileData.name}
              </h1>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3 mt-3 text-sm sm:text-base">

                <span className="text-gray-600 font-medium">
                  {profileData.degree}
                </span>

                <span className="text-gray-400 hidden sm:inline">•</span>

                <span className="text-gray-600">
                  {profileData.speciality}
                </span>

              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-5">

                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-medium">
                  {profileData.experience}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${profileData.available
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                    }`}
                >
                  {profileData.available
                    ? "Available"
                    : "Unavailable"}
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* ABOUT CARD */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6">

          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
            About Doctor
          </h2>

          <p className="text-gray-600 text-sm sm:text-base leading-7 sm:leading-8">
            {profileData.about}
          </p>

        </div>

        {/* FEES + ADDRESS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* FEES */}

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6">

            <h3 className="font-semibold text-base sm:text-lg text-gray-800 mb-4">
              Consultation Fee
            </h3>

            {isEdit ? (
              <input
                type="number"
                value={profileData.fees || ""}
                onChange={(e) => {
                  const val = e.target.value;
                  setProfileData((prev) => ({
                    ...prev,
                    fees: val === '' ? '' : Number(val),
                  }))
                }}
                className="w-full border rounded-lg px-4 py-2 text-sm"
              />
            ) : (
              <p className="text-3xl sm:text-4xl font-bold text-green-600">
                {currency}{profileData.fees}
              </p>
            )}

          </div>

          {/* ADDRESS */}

          <div className="md:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6">

            <h3 className="font-semibold text-base sm:text-lg text-gray-800 mb-4">
              Clinic Address
            </h3>

            {isEdit ? (
              <div className="space-y-3">

                <input
                  type="text"
                  value={profileData.address?.line1 || ""}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        line1: e.target.value,
                      },
                    }))
                  }
                  placeholder="Address Line 1"
                  className="w-full border rounded-lg px-4 py-2 text-sm"
                />

                <input
                  type="text"
                  value={profileData.address?.line2 || ""}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        line2: e.target.value,
                      },
                    }))
                  }
                  placeholder="Address Line 2"
                  className="w-full border rounded-lg px-4 py-2 text-sm"
                />

              </div>
            ) : (
              <div className="text-gray-600 text-sm sm:text-base leading-7 sm:leading-8">
                <p>{profileData.address?.line1}</p>
                <p>{profileData.address?.line2}</p>
              </div>
            )}

          </div>

        </div>

        {/* AVAILABILITY EDIT */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                Availability Status
              </h3>

              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                change your appointment availability
              </p>
            </div>

            <label className="flex items-center gap-3 cursor-pointer sm:mr-10 self-start sm:self-auto">

              <input
                type="checkbox"
                checked={!!profileData.available}
                onChange={toggleAvailability}
                className="w-5 h-5 accent-green-600 shrink-0"
              />

              <span
                className={`font-medium text-sm sm:text-base ${profileData.available
                  ? "text-green-600"
                  : "text-red-600"
                  }`}
              >
                {profileData.available
                  ? "Available"
                  : "Unavailable"}
              </span>

            </label>

          </div>

        </div>


        {/* BUTTONS */}

        <div className="flex justify-center pt-2 w-full">

          {!isEdit ? (
            <button
              onClick={() => setIsEdit(true)}
              className="w-full sm:w-auto text-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition text-sm sm:text-base"
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-4 w-full sm:w-auto">

              <button
                onClick={() => setIsEdit(false)}
                className="flex-1 sm:flex-none text-center px-8 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 text-sm sm:text-base"
              >
                Cancel
              </button>

              <button
                onClick={updateProfile}
                className="flex-1 sm:flex-none text-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm sm:text-base"
              >
                Save Changes
              </button>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default DoctorProfile;