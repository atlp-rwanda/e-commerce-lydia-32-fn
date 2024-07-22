import React, { useState } from "react";
import Spinner from "../../Components/Spinners";
import toast from "react-hot-toast";
import { useAddProductMutation } from "../../slices/productSlice/productApiSlice";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const AddNewProduct: React.FC = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productImages, setProductImages] = useState("");
  const [productDimensions, setProductDimensions] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [addNewProduct] = useAddProductMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await addNewProduct({
        productName,
        description: productDescription,
        dimensions: productDimensions,
        images: productImages,
        productCategory,
        price: productPrice,
        quantity: productQuantity,
      }).unwrap();
      toast.success("Add product Successful");

      setProductName("");
      setProductDescription("");
      setProductDimensions("");
      setProductCategory("");
      setProductPrice("");
      setProductQuantity("");
      setProductImages("");

      navigate("/seller/dashboard");
    } catch (err) {
      //@ts-ignore
      const errorMessages = err?.data?.errors || [err.error];
      //@ts-ignore

      toast.error(errorMessages[0] || JSON.stringify(err?.data?.message));
      //@ts-ignore

      console.log(errorMessages[0], JSON.stringify(err?.data?.message));
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold text-center mb-6">ADD NEW PRODUCT</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <div>
            <label htmlFor="productName">Product Name:</label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>
          <div>
            <label htmlFor="productDescription">Product Description:</label>
            <textarea
              id="productDescription"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            ></textarea>
          </div>
          <div>
            <label htmlFor="productCategory">Product Category:</label>
            <select
              id="productCategory"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 bg-white"
              style={{ maxWidth: "100%" }}
            >
              <option value="Select">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothes">Clothes</option>
              <option value="Home & Garden">Home & Garden</option>
              <option value="Sports & Outdoors">Sports & Outdoors</option>
              <option value="Books">Books</option>
              <option value="Toys & Games">Toys & Games</option>
              <option value="Beauty & Personal Care">
                Beauty & Personal Care
              </option>
              <option value="Automotive">Automotive</option>
              <option value="Health & Wellness">Health & Wellness</option>
              <option value="Food & Beverages">Food & Beverages</option>
              <option value="Pet Supplies">Pet Supplies</option>
              <option value="Jewelry">Jewelry</option>
              <option value="Office Products">Office Products</option>
              <option value="Musical Instruments">Musical Instruments</option>
              <option value="Arts & Crafts">Arts & Crafts</option>
            </select>
          </div>
          <div>
            <label htmlFor="productPrice">Product Price:</label>
            <input
              type="number"
              id="productPrice"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>
          <div>
            <label htmlFor="productQuantity">Product Quantity:</label>
            <input
              type="number"
              id="productQuantity"
              value={productQuantity}
              onChange={(e) => setProductQuantity(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>
          <div>
            <label htmlFor="productImages">Product Images:</label>
            <input
              type="text"
              id="productImages"
              value={productImages}
              onChange={(e) => setProductImages(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>
          <div>
            <label htmlFor="productDimensions">Product Dimensions:</label>
            <input
              type="text"
              id="productDimensions"
              value={productDimensions}
              onChange={(e) => setProductDimensions(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : "ADD PRODUCT"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewProduct;
