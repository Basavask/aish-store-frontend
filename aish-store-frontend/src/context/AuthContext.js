import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/api';

// Create the context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // On initial load, check if a user session exists in local storage
        try {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser && storedUser.token) {
                setUser(storedUser);
            }
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
            localStorage.removeItem('user');
        } finally {
            setLoading(false); // Finished initial loading
        }
    }, []);

    // Login function
    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            const userData = {
                email: response.data.email,
                role: response.data.role,
                token: response.data.token
            };
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            return { success: true };
        } catch (error) {
            console.error('Login failed:', error);
            return { success: false, message: error.response?.data?.message || "Login failed. Please check your credentials." };
        }
    };

    // Register function
    const register = async (firstName, lastName, email, password) => {
        try {
            await api.post('/auth/register', { firstName, lastName, email, password });
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || "Registration failed. Please try again." };
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    const value = { user, loading, login, register, logout };

    // Return the provider with the context value
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};
