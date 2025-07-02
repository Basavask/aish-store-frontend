import React from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addProductToCart } = useCart();
    
    const handleAddToCart = async () => {
        const result = await addProductToCart(product.id, 1);
        alert(result.message); // Simple feedback for the user
    };

    const imageUrl = `https://placehold.co/600x400/E2E8F0/4A5568?text=${product.name.replace(/\s/g, '+')}`;

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 group flex flex-col">
            <div className="w-full h-48 bg-gray-200">
                <img src={imageUrl} alt={product.name} className="w-full h-full object-cover"/>
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 truncate group-hover:text-indigo-600">{product.name}</h3>
                <p className="text-gray-600 mt-1 text-sm flex-grow">{product.description}</p>
                <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    <button 
                        onClick={handleAddToCart}
                        className="bg-indigo-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
