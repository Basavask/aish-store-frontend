import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-white">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
                Welcome to Aish Store
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl">
                Your one-stop shop for the latest in electronics, books, and more. Discover amazing products at unbeatable prices.
            </p>
            <div className="mt-8">
                <Link 
                    to="/products" 
                    className="inline-block bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-indigo-700 transition-colors duration-300"
                >
                    Shop Now
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
