import React, { useState, useEffect } from 'react';
import api from '../api/api';

const AdminDashboardPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // This endpoint needs to be created in the backend
                // For now, we'll assume an endpoint /api/orders/all exists for admins
                // Let's modify the plan to use an existing endpoint if possible
                // The prompt has GET /api/orders/{id}, let's assume an admin can get all
                // For now, let's just make a placeholder. We'll need to add this endpoint to the backend.
                // Let's assume the backend has GET /api/orders/all for admins.
                // If not, this will fail. Let's add a note.
                // **Backend update needed: Create GET /api/orders/all for ADMIN role**
                
                // For now, we cannot implement this without a backend change.
                // Let's create a placeholder UI.
                setError("Functionality to fetch all orders needs a new backend endpoint for admins.");
                setLoading(false);

            } catch (err) {
                setError('Failed to fetch orders.');
                console.error(err);
            }
        };

        fetchOrders();
    }, []);

    const handleStatusUpdate = async (orderId, status) => {
        try {
            await api.put(`/orders/${orderId}/status`, { status });
            // Refetch orders after update
            // fetchOrders();
             alert(`Order ${orderId} status updated to ${status}`);
        } catch (error) {
            alert('Failed to update order status.');
        }
    };

    if (loading) return <div className="text-center py-10">Loading dashboard...</div>;

    return (
        <div className="max-w-7xl mx-auto py-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">Order Management</h2>
                {error && <p className="text-red-500 bg-red-50 p-3 rounded-md">{error}</p>}
                
                {/* Placeholder content since we can't fetch all orders yet */}
                <p className="text-gray-600">This section will display all customer orders. You can update their status here.</p>
                <div className="mt-4 border-t pt-4">
                    <h3 className="font-semibold">Example Order #123</h3>
                    <p>Status: PENDING</p>
                    <select 
                        onChange={(e) => alert(`Would update order #123 to ${e.target.value}`)}
                        className="mt-2 p-2 border rounded-md"
                    >
                        <option value="PENDING">Pending</option>
                        <option value="CONFIRMED">Confirmed</option>
                        <option value="SHIPPED">Shipped</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="CANCELLED">Cancelled</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
