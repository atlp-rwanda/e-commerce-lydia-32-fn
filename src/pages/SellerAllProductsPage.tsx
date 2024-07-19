import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Spinner from '../Components/Spinners';
import { setProductInfo } from '../slices/productSlice/productSlice';
import SellerProductCard from '../Components/SellerProductCard';
import { useGetSellerProductsQuery } from '../slices/sellerSlice/sellerProductsApiSlice';
import { useDeleteProductMutation } from '../slices/productSlice/productApiSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



const SellerAllProductsPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: products } = useGetSellerProductsQuery();
    const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

    useEffect(() => {
        if (products) {
            dispatch(setProductInfo(products));
        }
    }, [products, dispatch]);


    const handleDelete = async (id: number) => {
        try {
            await deleteProduct(id).unwrap();
            toast.success('Deletion successful');
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            toast.error(`Error: ${(error as Error).message}`);
        }
    };

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
                        {products?.products ? (
                            products.products.map((product) => (
                                <SellerProductCard
                                    key={product.productId}
                                    product={product}
                                    onDelete={handleDelete}
                                    isDeleting={isDeleting}
                                />
                            ))
                        ) : (
                            <div className="col-span-full flex justify-center items-center">
                                <Spinner />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerAllProductsPage;
