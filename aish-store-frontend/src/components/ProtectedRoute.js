import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { user } = useAuth();

    if (!user) {
        // If not logged in, redirect to the login page
        return <Navigate to="/login" />;
    }

    if (adminOnly && user.role !== 'ADMIN') {
        // If the route is admin-only and the user is not an admin, redirect to home
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
