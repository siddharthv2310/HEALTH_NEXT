import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const currencySymbol = "$";
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [doctors, setDoctors] = useState([]);
    const [token, setToken] = useState(
        localStorage.getItem("token") || false
    );
    const [userData, setUserData] = useState(false);

    // LOGOUT 

    const logoutUser = () => {
        localStorage.removeItem("token");
        setToken(false);
        setUserData(false);
    };

    //  GET DOCTORS 

    const getDoctorsData = async () => {
        try {

            const { data } = await axios.get(
                backendUrl + "/api/doctor/list"
            );

            if (data.success) {
                setDoctors(data.doctors);
            } else {
                toast.error(data.message);
            }

        } catch (error) {

            console.log(error);
            toast.error(
                error.response?.data?.message || error.message
            );

        }
    };

    //  LOAD USER PROFILE 

    const loadUserProfileData = async () => {

        if (!token) return;

        try {

            const { data } = await axios.get(
                backendUrl + "/api/user/get-profile",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (data.success) {

                setUserData(data.userData);

            } else {

                toast.error(data.message);

            }

        } catch (error) {

            console.log(error);

            if (error.response?.status === 401) {

                logoutUser();

                toast.info("Session expired. Please login again.");

                return;
            }

            toast.error(
                error.response?.data?.message || error.message
            );
        }
    };

    //  CONTEXT VALUE 

    const value = {
        doctors,
        getDoctorsData,
        currencySymbol,
        backendUrl,
        token,
        setToken,
        userData,
        setUserData,
        loadUserProfileData,
        logoutUser
    };

    //  EFFECTS 

    useEffect(() => {
        getDoctorsData();
    }, []);

    useEffect(() => {

        if (token) {
            loadUserProfileData();
        } else {
            setUserData(false);
        }

    }, [token]);

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;