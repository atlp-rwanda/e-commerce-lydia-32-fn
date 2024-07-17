import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Spinner from '../Components/Spinners';
import { setProductInfo } from '../slices/productSlice/productSlice';
import SellerProductCard from '../Components/SellerProductCard';

const SellerAllProductsPage: React.FC = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const getUserToken = (): string | null => {
        const userInfoString = localStorage.getItem('userInfo');
        if (userInfoString) {
            try {
                const userInfo = JSON.parse(userInfoString);
                return userInfo.token || null;
            } catch (error) {
                console.error('Error parsing userInfo from localStorage:', error);
                return null;
            }
        }
        return null;
    };

    // Usage

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = getUserToken();
                if (!token) {
                    console.error('No token found');
                    setProducts([]);
                    setLoading(false);
                    return;
                }
                const response = await fetch(`${BACKEND_URL}api/seller/products`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setProducts(data.products);
                    dispatch(setProductInfo(data.products));
                } else {
                    setProducts([]);
                }
            } catch (error) {
                console.error('Failed to fetch products', error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-white py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col">
                    <nav className="flex space-x-4 mb-8">
                        <a href="#" className="text-sm text-gray-600 hover:text-gray-900">ALL</a>
                        <a href="#" className="text-sm text-gray-600 hover:text-gray-900">ELECTRONIC</a>
                        <a href="#" className="text-sm text-gray-600 hover:text-gray-900">CLOTHES</a>
                        <a href="#" className="text-sm text-gray-600 hover:text-gray-900">FOOD</a>
                    </nav>
                    <div className="flex flex-col">
                        {loading ? (
                            <div className="col-span-full flex justify-center items-center">
                                <Spinner />
                            </div>
                        ) : products && products.length > 0 ? (
                            products.map((product) => (
                                <SellerProductCard key={product.productId} product={product} />
                            ))
                        ) : (
                            <div className="col-span-full flex justify-center items-center">
                                <p>There are no products for this particular seller.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerAllProductsPage;
