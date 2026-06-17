import { createContext, useContext, useState } from "react";
import axios from "axios";

const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {

    const [appointments, setAppointments] = useState([]);

    const getUserAppointments = async (backendUrl, token) => {

        try {

            const { data } = await axios.get(
                backendUrl + "/api/user/appointments",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (data.success) {

                setAppointments(
                    Array.isArray(data.appointments)
                        ? [...data.appointments].reverse()
                        : []
                );

            }

        } catch (error) {

            console.log(error);

        }
    };

    return (
        <AppointmentContext.Provider
            value={{
                appointments,
                setAppointments,
                getUserAppointments
            }}
        >
            {children}
        </AppointmentContext.Provider>
    );
};

export const useAppointments = () => {
    return useContext(AppointmentContext);
};