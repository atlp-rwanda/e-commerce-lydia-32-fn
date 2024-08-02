import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useAddToCartMutation,
  useGetCartQuery,
} from "../slices/cartSlice/cartApiSlice";
import { useGetProductsQuery } from "../slices/productSlice/productApiSlice";
import ProductCard from "../Components/product";
import Spinner from "../Components/Spinners";
import toast from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAddToWishlistMutation } from "../slices/wishlistSlice/wishlistSliceApi";
import { useDispatch } from "react-redux";
import { useAddReviewMutation } from "../slices/reviewSlice/productReviewsApiSlice";
import {
  addReview,
  setError,
  setLoading,
} from "../slices/reviewSlice/reviewSlice";

interface ProductCardProps {
  product: {
    productId: number;
    images: string[];
    productName: string;
    price: number;
    description: string;
    productCategory: string;
    quantity: number;
    reviews: String[];
    averageRating: number;
  };
}

// product.averageRating

const SingleProduct: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductCardProps["product"] | null>(
    null
  );
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cartItemQty, SetCartItemQty] = useState(1);
  const [addToCart] = useAddToCartMutation();
  const [addToWishlist] = useAddToWishlistMutation();
  const { refetch } = useGetCartQuery();
  const [addingToCart, setAddingToCart] = useState<boolean>(false);
  const [addingToWishlist, setAddingToWishlist] = useState<boolean>(false);
  const {
    data: productsData,
    isLoading,
    refetch: RefetchProductdata,
  } = useGetProductsQuery();
  const [activeTab, setActiveTab] = useState("description");
  const dispatch = useDispatch();
  const [addReviewMutation] = useAddReviewMutation();
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const userInfo = localStorage.getItem("userInfo");

  const handleAddToWishlist = async () => {
    try {
      if (!userInfo) {
        toast.error("Please Login First To Proceed");
        return;
      }

      setAddingToWishlist(true);
      const response = await addToWishlist(Number(id)).unwrap();
      console.log("Wishlist response:", response);
      //@ts-ignore
      if (response.Message) {
        toast.success("Product added to wishlist successfully!");
        //@ts-ignore
      } else if (response.Warning || response.Error) {
        //@ts-ignore
        toast.success(response.Warning || response.Error);
      } else {
        toast.success("Product added to wishlist successfully!");
      }
    } catch (err: any) {
      console.error("Error adding product to wishlist:", err);
      if (err.status === 400) {
        toast.error("Product Already In Your Wishlist!");
      } else if (err.status === 403) {
        toast.error(err?.data?.message || "Authentication error");
      } else {
        toast.error("Error adding product to wishlist");
      }
    } finally {
      setAddingToWishlist(false);
    }
  };

  useEffect(() => {
    if (productsData && id) {
      const currentProduct = productsData.products.find(
        (p: any) => p.productId.toString() === id
      );
      setProduct(currentProduct);

      const related = productsData.products.filter(
        (p: any) =>
          p.productCategory === currentProduct.productCategory &&
          p.productId.toString() !== id
      );
      setRelatedProducts(related);
      if (currentProduct && currentProduct.reviews) {
        const totalRating = currentProduct.reviews.reduce(
          (acc: any, review: { RatingValue: any }) => acc + review.RatingValue,
          0
        );
        const averageRating = totalRating / currentProduct.reviews.length;
        const roundedAverage = Math.floor(averageRating);

        setProduct({ ...currentProduct, averageRating: roundedAverage });

        console.log(
          "THIS IS THE AVERAGE RATING OF THIS PRODUCT",
          averageRating,
          roundedAverage
        );
      }
    }
  }, [productsData, id]);

  useEffect(() => {
    const interval = setInterval(() => {
      RefetchProductdata();
    }, 2000);

    return () => clearInterval(interval);
  }, [RefetchProductdata]);

  const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetCartItemQty(Number(e.target.value));
  };
  const handleAddToCart = async () => {
    try {
      const userInfo = localStorage.getItem("userInfo");
      if (Number(cartItemQty) <= 0) {
        toast.error("Product Quantity of 0 or Less is not allowed !");
        return;
      }
      if (userInfo) {
        setAddingToCart(true);
        const data = { productId: Number(id), quantity: Number(cartItemQty) };
        const response = await addToCart(data).unwrap();
        if (response.message == "Item added to cart successfully") {
          toast.success("Product added to cart successfully!");
          refetch();
        } else {
          toast.error(response.message);
        }
      } else {
        toast.error("Please Login First To Proceed ");
      }
    } catch (err: any) {
      if (err.status == 400) {
        toast.error(
          "Product Already In Your Cart. Please Consider updating quantities !"
        );
      } else if (err.status === 403) {
        // @ts-ignore
        toast.error(err?.data?.message);
        navigate("/update-password");
      } else if (err.status === 406) {
        console.log(err.status);
        toast.error(
          err?.data?.message || "You can't add your own product to cart"
        );
      }
      console.error("Error adding product to cart:", err.status);
    } finally {
      setAddingToCart(false);
    }
  };

  const getRatingWord = (rating: number): string => {
    switch (rating) {
      case 1:
        return "Poor";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Very Good";
      case 5:
        return "Amazing!";
      default:
        return "Unknown";
    }
  };

  const handleAddreview = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));

    const reviewData = {
      productId: product?.productId,
      RatingValue: rating,
      review: reviewText,
    };

    console.log("Sending review data:", reviewData);

    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      toast.error("Please Login First To Proceed");
      return;
    }

    try {
      const result = await addReviewMutation(reviewData).unwrap();
      dispatch(addReview(result));
      setReviewText("");
      setRating(5);
      toast.success("Review submitted successfully");
      RefetchProductdata();
    } catch (err: any) {
      console.error("Error details:", err);
      const errorMessage =
        err.data?.message || err.message || "An unknown error occurred";
      dispatch(setError(errorMessage));
      toast.error(errorMessage);

      if (
        errorMessage === "You didn't buy this product" &&
        err.status === 400
      ) {
        console.log("400 ERROR YOU DIDN'T BUTY THE PRODUCT");
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  // const sortedReviews = product.reviews.sort(
  //   (a: any, b: any) =>
  //     new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  // );

  // console.log("this is the product", product.reviews, sortedReviews);

  const sideImages =
    product.images.length <= 1
      ? new Array(4).fill(product.images[0])
      : product.images;

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 flex flex-row mr-20 justify-center items-center">
          <div className="md:w-1/2 flex flex-col justify-center items-center">
            {sideImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product ${index + 1}`}
                className="bg-gray-100 mb-2 w-20"
              />
            ))}
          </div>
          <div className="md:w-1/2 bg-gray-100 w-full m-0 h-35">
            <img
              src={product.images[0]}
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
          {product.reviews.length !== 0 ? (
            <div className="flex items-center mb-2">
              {[...Array(product.averageRating)].map((_, index) => (
                <svg
                  key={index}
                  className="w-5 h-5 text-yellow-400 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .587l3.668 7.568L24 9.423l-6 6.097 1.428 8.485L12 18.908l-7.428 5.097L6 15.52 0 9.423l8.332-1.268L12 .587z" />
                </svg>
              ))}{" "}
              <br />
              <p className="text-gray-700 font-bold ">
                &nbsp; {` Based on ${product.reviews.length}`}{" "}
                {product.reviews.length <= 1 ? "Review" : "Reviews"}
              </p>
            </div>
          ) : (
            <p className="font-bold text-xl">No reviews yet</p>
          )}
          <p className="text-gray-600 mb-4">{product.description}.</p>
          <div className="flex items-center justify-start align-middle ">
            <div className="flex items-center">
              <span className="">Quantity:</span>
              <input
                type="number"
                min="1"
                max={product.quantity}
                value={cartItemQty}
                onChange={handleQtyChange}
                className="border rounded w-16 p-1 text-center"
              />
            </div>
            <div className="ml-5 flex flex-col sm:flex-row sm:flex-wrap gap-4 px-4 sm:px-0">
              <button
                onClick={handleAddToCart}
                className="w-full sm:w-auto mb-4 sm:mb-0 px-4 sm:px-6 py-2 bg-black text-white rounded transition duration-300 ease-in-out transform hover:bg-gray-800 hover:scale-105 text-sm sm:text-base"
              >
                {addingToCart ? "Adding Item To Cart..." : "Add to Cart"}
              </button>
              <button
                onClick={handleAddToWishlist}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-black text-white rounded transition duration-300 ease-in-out transform hover:bg-gray-800 hover:scale-105 text-sm sm:text-base"
                disabled={addingToWishlist}
              >
                {addingToWishlist ? "Adding to Wishlist..." : "Add to Wishlist"}
              </button>
            </div>
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
        </div>
      </div>
      <div className="mt-12">
        <ul className="flex border-b">
          <li className="mr-1">
            <a
              className={`inline-block py-2 px-4 font-semibold ${
                activeTab === "description"
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
              href="#"
              onClick={() => setActiveTab("description")}
            >
              Description
            </a>
          </li>
          <li className="mr-1">
            <a
              className={`inline-block py-2 px-4 font-semibold ${
                activeTab === "reviews"
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
              href="#"
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
            </a>
          </li>
        </ul>
        <div
          id="description"
          className={`mt-4 ${activeTab === "description" ? "" : "hidden"}`}
        >
          <p className="text-gray-600">{product.description}</p>
        </div>
        <div
          id="reviews"
          className={`mt-4 ${activeTab === "reviews" ? "" : "hidden"}`}
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-600">
            {product.reviews.length}{" "}
            {product.reviews.length <= 1 ? "REVIEW" : "REVIEWS"}
            {` FOR ${product.productName.toUpperCase()}`}
          </h2>

          {/* New review form */}

          {userInfo ? (
            <form onSubmit={handleAddreview} className="mb-10">
              <h3 className="text-xl font-semibold mb-2">
                Your Review<span className="text-red-400">*</span>
              </h3>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full p-2 border rounded mb-4"
                rows={6}
                required
              />
              <div className="mb-4">
                <label className="block mb-2">Your Rating:</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={(e) =>
                    setRating(
                      Math.min(5, Math.max(1, parseInt(e.target.value)))
                    )
                  }
                  className="border rounded p-2 w-20"
                />
              </div>
              <button
                type="submit"
                className="bg-black text-white py-2 px-4 rounded"
                onClick={handleAddreview}
                // disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit"}
                {isLoading && <span className="loading-dots">...</span>}
              </button>
            </form>
          ) : (
            ""
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.reviews.map((review: any) => (
              <div className="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-bold">{`${review.user.firstname} ${review.user.othername}`}</p>
                    <div className="flex">
                      {[...Array(review.RatingValue)].map((_, index) => (
                        <svg
                          key={index}
                          className="w-5 h-5 text-yellow-400 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .587l3.668 7.568L24 9.423l-6 6.097 1.428 8.485L12 18.908l-7.428 5.097L6 15.52 0 9.423l8.332-1.268L12 .587z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="font-bold mb-2">
                  {getRatingWord(review.RatingValue)}
                </p>
                <p>{review.review}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts.map((relatedProduct: any) => (
            <ProductCard
              key={relatedProduct.productId}
              product={relatedProduct}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
