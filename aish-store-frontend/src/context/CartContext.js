import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    // Fetch the cart from the backend whenever the user changes
    useEffect(() => {
        const fetchCart = async () => {
            if (user) {
                setLoading(true);
                try {
                    const { data } = await api.get('/cart');
            console.log('daa.', data);

                    setCart(data);
                } catch (error) {
                    console.error("Failed to fetch cart:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                // Clear cart if user logs out
                setCart(null);
                setLoading(false);
            }
        };

        fetchCart();
    }, [user]);

    const addProductToCart = async (productId, quantity) => {
        if (!user) return alert("Please log in to add items to your cart.");
        try {
            const { data } = await api.post('/cart/add', { productId, quantity });
            setCart(data);
            return { success: true, message: "Item added to cart!" };
        } catch (error) {
            console.error("Failed to add to cart:", error);
            return { success: false, message: "Could not add item." };
        }
    };

    const updateCartItemQuantity = async (productId, quantity) => {
        try {
            const { data } = await api.put('/cart/update', { productId, quantity });
            setCart(data);
        } catch (error) {
            console.error("Failed to update cart quantity:", error);
        }
    };
    
    const removeProductFromCart = async (productId) => {
        try {
            const { data } = await api.delete(`/cart/remove/${productId}`);
            setCart(data);
        } catch (error) {
            console.error("Failed to remove from cart:", error);
        }
    };

    const placeOrder = async (shippingAddress) => {
        try {
            await api.post('/orders', { shippingAddress });
            // After placing order, the backend clears the cart, so we refetch it
            const { data } = await api.get('/cart');
            console.log('daa.', data);
            
            setCart(data);
            return { success: true, message: "Order placed successfully!" };
        } catch (error) {
            console.error("Failed to place order:", error);
            return { success: false, message: "Could not place order." };
        }
    };

    const value = {
        cart,
        loading,
        addProductToCart,
        updateCartItemQuantity,
        removeProductFromCart,
        placeOrder
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
