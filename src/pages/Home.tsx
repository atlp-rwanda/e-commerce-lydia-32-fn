import React, { useEffect, useState } from "react";
import ProductCard from "../Components/product";
import { useOutletContext } from "react-router-dom";
import Search from "../Components/search";
import chair from "../assets/chair.png";
import { useDispatch } from "react-redux";
import Spinner from "../Components/Spinners";
import { setProductInfo } from "../slices/productSlice/productSlice";
import { useGetProductsQuery } from "../slices/productSlice/productApiSlice";

type OutletContext = {
  isSearchVisible: boolean;
  setIsSearchVisible: (isVisible: boolean) => void;
};

const categories = ["ALL", "ELECTRONICS", "CLOTHES", "FOOD"];

const App: React.FC = () => {
  const { isSearchVisible, setIsSearchVisible } = useOutletContext<OutletContext>();
  const dispatch = useDispatch();
  const { data: products, isLoading } = useGetProductsQuery();
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  useEffect(() => {
    if (products) {
      dispatch(setProductInfo(products));
    }
  }, [products, dispatch]);

  useEffect(() => {
    if (products?.products) {
      if (selectedCategory === "ALL") {
        setFilteredProducts(products.products);
      } else {
        const filtered = products.products.filter((product: any) =>
          product.productCategory && product.productCategory.toUpperCase() === selectedCategory
        );
        setFilteredProducts(filtered);
      }
    }
  }, [selectedCategory, products]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-center mb-12">
          <div className="w-full md:w-1/2 mt-10 md:mt-20">
            <h1 className="text-3xl font-bold mb-4 font-catamaran">
              THINK DIFFERENT.
            </h1>
            <p className="text-lg text-gray-600 font-catamaran font-light leading-relaxed">
              With a wide range of products, from electronics to clothing and food, Depot offers a seamless shopping experience for customers.
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0">
            <img src={chair} alt="Chair" className="w-auto h-auto max-w-full" />
          </div>
        </div>

        <div className="flex flex-col">
          {isSearchVisible && (
            <div className="mb-8 border border-gray-300 p-4 rounded-lg">
              <Search
                isVisible={isSearchVisible}
                onClose={() => setIsSearchVisible(false)}
              />
            </div>
          )}
       <nav className="flex flex-wrap  mb-8 py-12">
  {categories.map((category) => (
    <button 
      key={category} 
      onClick={() => handleCategoryClick(category)}
      className={`
        mx-2 mb-2 px-4 py-2 rounded-full transition-all duration-200 ease-in-out
        ${selectedCategory === category
          ? "bg-gray-900 text-white font-semibold"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }
        font-catamaran text-sm
      `}
    >
      {category}
    </button>
  ))}
</nav>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <div className="col-span-full flex justify-center items-center">
                <Spinner />
              </div>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product: any) => (
                <ProductCard key={product.productId} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 font-catamaran">
                No products found in this category.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;