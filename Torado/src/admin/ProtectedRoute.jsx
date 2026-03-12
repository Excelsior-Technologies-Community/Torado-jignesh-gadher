import { Navigate } from "react-router-dom";
import React from "react";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
        // Redirect to admin login if not authenticated
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
