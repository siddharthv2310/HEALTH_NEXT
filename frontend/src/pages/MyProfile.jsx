import React, { useState } from "react";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);

  const [userData, setUserData] = useState({
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    name: "Edward Vincent",
    email: "richardjameswap@gmail.com",
    phone: "+1 123 456 7890",
    address: {
      line1:"57th Cross, Richmond ",
      line2:"Circle, Church Road, LondonChurch"
      },
    gender: "Male",
    dob: "20 July, 2024",
  });

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10">
      <div className="bg-white w-175 p-8 rounded-xl shadow">

        {/* Profile Image */}
        <div className="flex items-center gap-6">
          <img
            src={userData.image}
            alt=""
            className="w-28 h-28 rounded-lg object-cover"
          />

          <div>
            {isEdit ? (
              <input
                type="text"
                value={userData.name}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                className="text-2xl font-semibold border px-2 py-1 rounded"
              />
            ) : (
              <p className="text-2xl font-semibold text-gray-800">
                {userData.name}
              </p>
            )}
          </div>
        </div>

        <hr className="my-6" />

        {/* CONTACT INFO */}
        <div className="mb-6">
          <p className="text-gray-500 text-sm mb-3">CONTACT INFORMATION</p>

          <div className="grid grid-cols-[120px_1fr] gap-y-3 text-sm">

            <p>Email id:</p>
            <p className="text-indigo-600">{userData.email}</p>

            <p>Phone:</p>
            {isEdit ? (
              <input
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
                className="border px-2 py-1 rounded"
              />
            ) : (
              <p className="text-indigo-600">{userData.phone}</p>
            )}

            <p>Address:</p>
            {isEdit ? (
              <div>
                <input
                type="text"
                value={userData.address.line1}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address:{...prev.address,line1:e.target.value}
                  }))
                }
                className="border px-2 py-1 rounded"
              />
              <br/>
              <input type="text" 
              value={userData.address.line2}
              onChange={(e) =>
                setUserData((prev)=>({
                  ...prev,
                  address:{...prev.address,line2:e.target.value}
                }))
              }
                className="border px-2 py-1 rounded"
              />
              </div>
              
            ) : (
              <div>
                <p className="text-gray-700">{userData.address.line1}</p>
                <p className="text-gray-700">{userData.address.line2}</p>
              </div>
              
            )}
          </div>
        </div>

        {/* BASIC INFO */}
        <div className="mb-6">
          <p className="text-gray-500 text-sm mb-3">BASIC INFORMATION</p>

          <div className="grid grid-cols-[120px_1fr] gap-y-3 text-sm">

            <p>Gender:</p>
            {isEdit ? (
              <select
                value={userData.gender}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    gender: e.target.value,
                  }))
                }
                className="border px-2 py-1 rounded"
              >
                <option>Male</option>
                <option>Female</option>
              </select>
            ) : (
              <p>{userData.gender}</p>
            )}

            <p>Birthday:</p>
            {isEdit ? (
              <input
                type="text"
                value={userData.dob}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    dob: e.target.value,
                  }))
                }
                className="border px-2 py-1 rounded"
              />
            ) : (
              <p>{userData.dob}</p>
            )}
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4">
          {isEdit ? (
            <button
              onClick={() => setIsEdit(false)}
              className="px-6 py-2 border border-indigo-500 text-indigo-500 rounded-full hover:bg-indigo-400 hover:text-white"
            >
              Save information
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="px-6 py-2 border border-indigo-500 text-indigo-500 rounded-full hover:bg-indigo-400 hover:text-white"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};


export default MyProfile;
