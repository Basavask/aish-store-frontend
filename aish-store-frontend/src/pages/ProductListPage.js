import React, { useState, useEffect } from 'react';
import api from '../api/api';
import ProductCard from '../components/ProductCard';

const ProductListPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetch products with pagination (defaulting to page 0, size 10)
                const response = await api.get('/products?page=0&size=10');
                setProducts(response.data.content);
            } catch (err) {
                setError('Failed to fetch products. The store might be temporarily unavailable.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return <div className="text-center py-20 text-gray-500">Loading products...</div>;
    }

    if (error) {
        return <div className="text-center py-20 text-red-500 bg-red-50 p-4 rounded-md">{error}</div>;
    }

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 sm:px-0">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Our Products</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductListPage;
