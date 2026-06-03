// src/components/DoctorRoute.jsx

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";

const DoctorRoute = ({ children }) => {

    const { dToken } = useContext(DoctorContext);

    const role = localStorage.getItem("role");

    if (!dToken || role !== "doctor") {
        return <Navigate to="/doctor-login" />;
    }

    return children;
};

export default DoctorRoute;