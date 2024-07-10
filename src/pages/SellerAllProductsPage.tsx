import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Spinner from '../Components/Spinners';
import { setProductInfo } from '../slices/productSlice/productSlice';
import { useGetProductsQuery } from '../slices/productSlice/sellerproductApiSlice';
import SellerProductCard from '../Components/SellerProductCard';

const SellerAllProductsPage: React.FC = () => {
    const dispatch = useDispatch()
    const { data: products } = useGetProductsQuery()

    useEffect(() => {
        if (products) {
            dispatch(setProductInfo(products))
        }
    }, [products, dispatch])

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
                                <SellerProductCard key={product.productId} product={product} />
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
    )
}

export default SellerAllProductsPage