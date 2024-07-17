import React, { useEffect } from "react";
import ProductCategories from "../../Components/seller/pieChart";
import CategoriesStatistics from "../../Components/seller/CategoriesPieChart";
import { useDispatch } from "react-redux";
import { setSellerProductsInfo } from "../../slices/sellerSlice/sellerProductSlice";
import Spinner from "../../Components/Spinners";
import { useGetSellerProductsQuery } from "../../slices/sellerSlice/sellerProductsApiSlice";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  //@ts-ignore
  const {
    data: SellerAllProducts,
    isLoading,
    error,
    //@ts-ignore
  } = useGetSellerProductsQuery();

  useEffect(() => {
    if (SellerAllProducts) {
      dispatch(setSellerProductsInfo(SellerAllProducts));
    }
  }, [SellerAllProducts, dispatch]);

  if (isLoading || !SellerAllProducts) return <Spinner />;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  const products = SellerAllProducts.products;

  const productsByCategory = products.reduce(
    //@ts-ignore
    (acc, product) => {
      const { productCategory, quantity } = product;
      acc[productCategory] = (acc[productCategory] || 0) + quantity;
      return acc;
    },
    {} as Record<string, number>
  );

  const mostSellingCategory = Object.entries(productsByCategory).reduce(
    (acc, [category, count]) => {
      //@ts-ignore
      return count > acc[1] ? [category, count] : acc;
    },
    ["", 0]
  )[0];

  const leastSellingCategory = Object.entries(productsByCategory).reduce(
    (acc, [category, count]) => {
      //@ts-ignore
      return count < acc[1] ? [category, count] : acc;
    },
    ["", Infinity]
  )[0];

  const totalCategories = Object.keys(productsByCategory).length;
  console.log(totalCategories)

  //@ts-ignore
  const totalProducts = products.reduce((acc, products) => {
    return acc + products.quantity;
  }, 0);

  //@ts-ignore
  const totalProductsPrice = products.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  const availableProducts = products.filter((product: any) => {
    return product.quantity === 0;
  });

  const productWithHighestPrice = products.reduce(
    (maxProduct: { price: number }, currentProduct: { price: number }) => {
      return currentProduct.price > maxProduct.price
        ? currentProduct
        : maxProduct;
    },
    products[0]
  );

  return (
    <div className=" bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricCard
              title="Total Products"
              value={totalProducts}
              changeType="increase"
            />
            <MetricCard
              title="Categories"
              value={totalCategories}
              changeType="decrease"
            />
            <MetricCard
              title="Category with Most Products"
              value={mostSellingCategory}
              changeType="increase"
            />

            <MetricCard
              title="Category with Least Products"
              value={leastSellingCategory}
              changeType="increase"
            />
            <MetricCard
              title="Number of Empty Categories"
              value={15 - totalCategories}
              changeType="increase"
            />
            <MetricCard
              title="Products Total Price"
              value={`${totalProductsPrice} RWF`}
              changeType="increase"
            />
            <MetricCard
              title="Number of Soldout Products"
              value={availableProducts.length}
              changeType="increase"
            />
            <MetricCard
              title="Most Expensive Product"
              value={`${productWithHighestPrice.productName} ${productWithHighestPrice.price} RWF`}
              changeType="increase"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg shadow overflow-hidden">
              <h3 className="text-lg font-semibold mb-4">
                Categories Statistics
              </h3>
              <div className="flex justify-center">
                <ProductCategories />
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">
                Categories Analytics
              </h3>
              <div className="flex justify-center">
                <CategoriesStatistics />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

//@ts-ignore
const MetricCard = ({ title, value, changeType }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <h3 className="text-sm text-gray-500 mb-2">{title}</h3>
    <p className="text-2xl font-bold mb-2">{value}</p>
    <p
      className={`text-sm ${changeType === "increase" ? "text-green-500" : "text-red-500"}`}
    ></p>
  </div>
);

export default Dashboard;
