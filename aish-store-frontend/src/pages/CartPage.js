import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const { cart, loading, updateCartItemQuantity, removeProductFromCart, placeOrder } = useCart();
    const [shippingAddress, setShippingAddress] = useState('');
    const [message, setMessage] = useState('');

    const handlePlaceOrder = async () => {
        if (!shippingAddress.trim()) {
            setMessage("Please enter a shipping address.");
            return;
        }
        setMessage('');
        const result = await placeOrder(shippingAddress);
        if (result.success) {
            setMessage(result.message);
            setShippingAddress('');
        } else {
            setMessage(result.message);
        }
    };

    if (loading) return <div className="text-center py-10">Loading your cart...</div>;
    if (!cart || !cart.items || cart.items.length === 0) {
        console.log('rrrrr', cart);
        
        return (
            <div className="text-center py-20">
                <h1 className="text-2xl font-bold text-gray-800">Your Cart is Empty</h1>
                {message && <p className="text-green-600 mt-4">{message}</p>}
                <Link to="/products" className="mt-6 inline-block bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-indigo-700">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    const subtotal = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    return (
        <div className="max-w-4xl mx-auto py-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Shopping Cart</h1>
            <div className="bg-white shadow-lg rounded-lg p-6">
                {cart.items.map(item => (
                    <div key={item.id} className="flex items-center justify-between border-b py-4">
                        <div className="flex items-center">
                            <img src={`https://placehold.co/100x100/E2E8F0/4A5568?text=${item.product.name.replace(/\s/g, '+')}`} alt={item.product.name} className="w-20 h-20 object-cover rounded-md mr-4"/>
                            <div>
                                <h2 className="text-lg font-semibold">{item.product.name}</h2>
                                <p className="text-gray-600">${item.product.price.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <input 
                                type="number" 
                                min="1" 
                                value={item.quantity}
                                onChange={(e) => updateCartItemQuantity(item.product.id, parseInt(e.target.value))}
                                className="w-16 text-center border rounded-md mx-4"
                            />
                            <button onClick={() => removeProductFromCart(item.product.id)} className="text-red-500 hover:text-red-700">Remove</button>
                        </div>
                    </div>
                ))}
                <div className="mt-6 text-right">
                    <h2 className="text-2xl font-bold">Subtotal: ${subtotal.toFixed(2)}</h2>
                </div>

                <div className="mt-8 border-t pt-6">
                    <h2 className="text-xl font-semibold mb-4">Checkout</h2>
                    {message && <p className={`mb-4 ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
                    <div className="space-y-4">
                         <textarea
                            value={shippingAddress}
                            onChange={(e) => setShippingAddress(e.target.value)}
                            placeholder="Enter your full shipping address"
                            className="w-full p-2 border rounded-md"
                            rows="3"
                        ></textarea>
                        <button 
                            onClick={handlePlaceOrder}
                            className="w-full bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-indigo-700"
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
