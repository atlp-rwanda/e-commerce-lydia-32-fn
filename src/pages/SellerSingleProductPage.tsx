import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Product {
    images: string;
    productId: number;
    sellerId: number;
    productName: string;
    description: string;
    productCategory: string;
    price: number;
    quantity: number;
    dimensions: string;
    isAvailable: boolean;
    createdAt: string;
    updatedAt: string;
}

const SellerSingleProductPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://team-lydia-demo.onrender.com/api/product/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product data');
                }
                const data = await response.json();
                setProduct(data.product);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!product) {
        return <div>No product found</div>;
    }

    return (
        <div>
            <h1>{product.productName}</h1>
            <img src={product.images.split(', ')[0]} alt={product.productName} width="200" />
            <p>{product.description}</p>
            <p>Category: {product.productCategory}</p>
            <p>Price: ${product.price}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Dimensions: {product.dimensions}</p>
            <p>Available: {product.isAvailable ? 'Yes' : 'No'}</p>
            <p>Created at: {new Date(product.createdAt).toLocaleDateString()}</p>
            <p>Updated at: {new Date(product.updatedAt).toLocaleDateString()}</p>
        </div>
    );
};

export default SellerSingleProductPage;
