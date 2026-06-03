import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";


const AdminRoute = ({ children }) => {

    const { aToken } = useContext(AdminContext);
    const role = localStorage.getItem("role");

    if (!aToken || role !== "admin") {
        return <Navigate to="/admin-login" />;
    }

    return children;
};

export default AdminRoute;