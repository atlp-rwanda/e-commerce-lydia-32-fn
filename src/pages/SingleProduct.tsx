import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAddToCartMutation } from '../slices/cartSlice/cartApiSlice';
import { useDispatch } from 'react-redux';
import { useGetProductsQuery } from '../slices/productSlice/productApiSlice';
import ProductCard from '../Components/product';
import Spinner from '../Components/Spinners';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'

interface ProductCardProps {
  product: {
    productId: number;
    images: string[];
    productName: string;
    price: number;
    description: string;
    productCategory: string;
    quantity: number;
  };
}

const SingleProduct: React.FC = () => {
const { id } = useParams();
const [product, setProduct] = useState<ProductCardProps['product'] | null>(null);
const [relatedProducts, setRelatedProducts] = useState([]);
    const [cartItemQty, SetCartItemQty] = useState(1);
const [addToCart] = useAddToCartMutation();
const dispatch = useDispatch();
const { data: productsData, isLoading } = useGetProductsQuery();

  useEffect(() => {
    if (productsData && id) {
      const currentProduct = productsData.products.find((p: any) => p.productId.toString() === id);
      setProduct(currentProduct);

      const related = productsData.products.filter((p: any) => p.productCategory === currentProduct.productCategory && p.productId.toString() !== id);
      setRelatedProducts(related);
    }
  }, [productsData, id]);

    const handleQtyChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        SetCartItemQty(Number(e.target.value));
    }
    const handleAddToCart = async () => {
        try {
            const userInfo = localStorage.getItem("userInfo");
            if (userInfo) {
                const data = { productId: id, quantity: cartItemQty };
                const response = await addToCart(data).unwrap();
                if (response.message == 'Item added to cart successfully') {
                    toast.success('Product added to cart successfully!');
                }
                else {
                    toast.error(response.message);
                }
            }
             else {
                toast.error('Please Login First To Proceed ')
            };
        } catch (error:any) {
             if (error.status==400) {
                  toast.error("Product Already In Your Cart. Please Consider updating quantities !");
               } else {
                   toast.error('Failed to add product to cart.');
               }
    
                console.error('Error adding product to cart:', error.status);
            }  
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const sideImages = product.images.length <= 1 ? new Array(4).fill(product.images[0]) : product.images;

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 flex flex-row mr-20 justify-center items-center">
            <div className="md:w-1/2 flex flex-col justify-center items-center">
              {sideImages.map((image, index) => (
                <img key={index} src={image} alt={`Product ${index + 1}`} className="bg-gray-100 mb-2 w-20" />
              ))}
            </div>
          <div className="md:w-1/2 bg-gray-100 w-full m-0 h-35" >
            <img src={product.images[0]} alt={product.productName} className="w-full" />
            </div>
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h1 className="text-3xl font-semibold mb-2"> {product.productName}</h1>
          <p className="text-xl text-gray-700 mb-4">Rwf  {product.price}</p>
          <div className="flex items-center mb-2">
        {[...Array(5)].map((_, index) => (
          <svg key={index} className="w-5 h-5 text-yellow-100 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 .587l3.668 7.568L24 9.423l-6 6.097 1.428 8.485L12 18.908l-7.428 5.097L6 15.52 0 9.423l8.332-1.268L12 .587z"/>
      </svg> 
    ))}
  </div>
          <p className="text-gray-600 mb-4">{product.description}.</p>
          <div className='flex items-center justify-start align-middle '>
            <div className="flex items-center">
            <span className="">Quantity:</span>
            <input type="number" min="1" max={product.quantity} value={cartItemQty}
              onChange={handleQtyChange} className="border rounded w-16 p-1 text-center" />
          </div>
             <button onClick={handleAddToCart} className="ml-10 px-6 py-2 bg-black text-white rounded transition duration-300 ease-in-out transform hover:bg-gray-800 hover:scale-105">Add to Cart</button>
          </div>
          <div className="mt-4">
            <button className="text-gray-500">Add to Wishlist</button>
          </div>
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2">Dimensions:</h2>
            <p className="text-gray-600">10x10x10 cm</p>
          </div>
          <div className="mt-4">
            <h2 >Category:  <span className="text-lg font-semibold mb-2"> {product.productCategory}</span></h2>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <ul className="flex border-b">
          <li className="mr-1">
            <a className="bg-white inline-block py-2 px-4 text-black font-semibold" href="#description">Description</a>
          </li>
          <li className="mr-1">
            <a className="bg-white inline-block py-2 px-4 text-gray-400 hover:text-black font-semibold" href="#reviews">Reviews</a>
          </li>
        </ul>
        <div id="description" className="mt-4">
                  <p className="text-gray-600">{ product.description}</p>
        </div>
        <div id="reviews" className="mt-4 hidden">
          <p className="text-gray-600">No reviews yet.</p>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts.map((relatedProduct: any) => (
            <ProductCard key={relatedProduct.productId} product={relatedProduct} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;

