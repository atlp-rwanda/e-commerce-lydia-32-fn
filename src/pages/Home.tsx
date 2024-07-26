import React, { useState, useEffect } from "react";
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

const App: React.FC = () => {
  const { isSearchVisible, setIsSearchVisible } =
    useOutletContext<OutletContext>();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { data: products, refetch } = useGetProductsQuery();
  useEffect(() => {
    if (products) {
      dispatch(setProductInfo(products));
    }
  }, [products, dispatch]);

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-12">
          <div className="w-1/2 mt-20">
            <h1 className="text-xl font-semibold mb-4 font-catamaran">
              THINK DIFFERENT.
            </h1>
            <p className="text-l text-gray-600 font-catamaran font-thin">
              With a wide range of products, from electronics to clothing and
              food, Depot offers <br></br>a seamless shopping experience for
              customers
            </p>
          </div>
          <div className="w-1/2 flex justify-center">
            <img src={chair} alt="Chair" className="w-auto h-auto" />
          </div>
        </div>

        <div className="flex flex-col">
          {isSearchVisible && (
            <div className="mb-8 border border-gray-300 p-4 rounded-lg">
              {" "}
              {/* Add some visible styling */}
              <Search
                isVisible={isSearchVisible}
                onClose={() => setIsSearchVisible(false)}
              />
            </div>
          )}
          <nav className="flex space-x-4 mb-8">
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
              ALL
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
              ELECTRONIC
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
              CLOTHES
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
              FOOD
            </a>
          </nav>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products?.products ? (
              products.products.map((product: any) => (
                <ProductCard key={product.productId} product={product} />
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

export default App;
