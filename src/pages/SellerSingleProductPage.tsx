import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UpdateProductDialog from "../Components/UpdateProductDialog";
import { Product } from "../slices/productSlice/productApiSlice";
import { useDispatch } from "react-redux";

// interface Product {
//   images: string;
//   productId: number;
//   sellerId: number;
//   productName: string;
//   description: string;
//   productCategory: string;
//   price: number;
//   quantity: number;
//   dimensions: string;
//   isAvailable: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

const SellerSingleProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedPRoduct] = useState<Product | null>(null);

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (prod: Product) => {
    setOpen(true);
    setSelectedPRoduct(prod);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://team-lydia-demo.onrender.com/api/product/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }
        const data = await response.json();
        console.log(data);

        setProduct(data.product);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {}, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>No product found</div>;
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 flex flex-row mr-20 justify-center items-center">
          <div className="md:w-1/2 bg-gray-100 w-full m-0 h-35">
            <img
              src={product.images}
              alt={product.productName}
              className="w-full"
            />
          </div>
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h1 className="text-3xl font-semibold mb-2">
            {" "}
            {product.productName}
          </h1>
          <p className="text-xl text-gray-700 mb-4">Rwf {product.price}</p>
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className="w-5 h-5 text-yellow-100 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 .587l3.668 7.568L24 9.423l-6 6.097 1.428 8.485L12 18.908l-7.428 5.097L6 15.52 0 9.423l8.332-1.268L12 .587z" />
              </svg>
            ))}
          </div>
          <p className="text-gray-600 mb-4">{product.description}.</p>
          <div className="flex items-center justify-start align-middle ">
            <button
              className="ml-10 px-6 py-2 bg-black text-white rounded transition duration-300 ease-in-out transform hover:bg-gray-800 hover:scale-105"
              onClick={() => handleEdit(product)}
            >
              Edit
            </button>
            <button className="ml-10 px-6 py-2 bg-black text-white rounded transition duration-300 ease-in-out transform hover:bg-red-800 hover:scale-105">
              Delete
            </button>
          </div>
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2">Dimensions:</h2>
            <p className="text-gray-600">10x10x10 cm</p>
          </div>
          <div className="mt-4">
            <h2>
              Category:{" "}
              <span className="text-lg font-semibold mb-2">
                {" "}
                {product.productCategory}
              </span>
            </h2>
          </div>
          <div className="mt-4">
            <h2>
              Quantity Remaining:{" "}
              <span className="text-lg font-semibold mb-2">
                {" "}
                {product.quantity}
              </span>
            </h2>
          </div>
          <div className="mt-4">
            <h2>
              Availability:{" "}
              <span className="text-lg font-semibold mb-2">
                {" "}
                {product.isAvailable}
              </span>
            </h2>
          </div>
          <div className="mt-4">
            <h2>
              Created At:{" "}
              <span className="text-lg font-semibold mb-2">
                {formatDate(product?.createdAt)}
              </span>
            </h2>
          </div>
          <div className="mt-4">
            <h2>
              Last Updated:{" "}
              <span className="text-lg font-semibold mb-2">
                {formatDate(product!.updatedAt)}
              </span>
            </h2>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <ul className="flex border-b">
          <li className="mr-1">
            <a
              className="bg-white inline-block py-2 px-4 text-black font-semibold"
              href="#description"
            >
              Description
            </a>
          </li>
          <li className="mr-1">
            <a
              className="bg-white inline-block py-2 px-4 text-gray-400 hover:text-black font-semibold"
              href="#reviews"
            >
              Reviews
            </a>
          </li>
        </ul>
        <div id="description" className="mt-4">
          <p className="text-gray-600">{product.description}</p>
        </div>
        <div id="reviews" className="mt-4 hidden">
          <p className="text-gray-600">No reviews yet.</p>
        </div>
      </div>
      <UpdateProductDialog
        open={open}
        handleClose={handleClose}
        selectedProduct={selectedProduct}
      />
    </div>
  );
};

export default SellerSingleProductPage;