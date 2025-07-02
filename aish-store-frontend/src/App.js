import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
// import AdminDashboardPage from './pages/AdminDashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

function App() {
    return (
        <Router>
            <AuthProvider>
                <CartProvider>
                    <div className="flex flex-col min-h-screen">
                        <Navbar />
                        <main className="flex-grow">
                            <Routes>
                                {/* Public Routes */}
                                <Route path="/" element={<HomePage />} />
                                <Route path="/products" element={<ProductListPage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/register" element={<RegisterPage />} />

                                {/* Protected User Routes */}
                                <Route path="/cart" element={
                                    <ProtectedRoute>
                                        <CartPage />
                                    </ProtectedRoute>
                                } />

                                {/* Protected Admin Routes */}
                                <Route path="/admin" element={
                                    <ProtectedRoute adminOnly={true}>
                                        <AdminDashboardPage />
                                    </ProtectedRoute>
                                } />
                            </Routes>
                        </main>
                    </div>
                </CartProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
