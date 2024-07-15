import React, { useEffect } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import { useDispatch } from "react-redux";
import { setSellerProductsInfo } from "../../slices/sellerSlice/sellerProductSlice";
import Spinner from "../Spinners";
import { useGetSellerProductsQuery } from "../../slices/sellerSlice/sellerProductsApiSlice";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

const ProductCategories: React.FC = () => {
  const dispatch = useDispatch();
  //@ts-ignore
  const {
    data: SellerAllProducts,
    isLoading,
    error,
    refetch,
    //@ts-ignore
  } = useGetSellerProductsQuery();

  const electronicsCategory: any =
    SellerAllProducts?.products?.filter(
      (product: any) => product.productCategory === "Electronics"
    ) || [];
  const booksCategory: any =
    SellerAllProducts?.products?.filter(
      (product: any) => product.productCategory === "Books"
    ) || [];
  const clothesCategory: any =
    SellerAllProducts?.products?.filter(
      (product: any) => product.productCategory === "Clothes"
    ) || [];
  const SportsOutdoorsCategory: any =
    SellerAllProducts?.products?.filter(
      (product: any) => product.productCategory === "Sports & Outdoors"
    ) || [];
  const ToysGamesCatgeory: any =
    SellerAllProducts?.products?.filter(
      (product: any) => product.productCategory === "Toys & Games"
    ) || [];
  const HomeGardenCategory: any =
    SellerAllProducts?.products?.filter(
      (product: any) => product.productCategory === "Home & Garden"
    ) || [];
  const BeautyPersonalCareCategory: any =
    SellerAllProducts?.products?.filter(
      (product: any) => product.productCategory === "Beauty & Personal Care"
    ) || [];
  const AutomotiveCategory: any =
    SellerAllProducts?.products?.filter(
      (product: any) => product.productCategory === "Automotive"
    ) || [];
  const HealthWellnessCategory: any =
    SellerAllProducts?.products?.filter(
      (product: any) => product.productCategory === "Health & Wellness"
    ) || [];
  const FoodBeveragesCategory: any =
    SellerAllProducts?.products?.filter(
      (product: any) => product.productCategory === "Food & Beverages"
    ) || [];
  const PetSuppliesCategory: any =
    SellerAllProducts?.products?.filter(
      (product: any) => product.productCategory === "Pet Supplies"
    ) || [];
  const JewelryCategory: any =
    SellerAllProducts?.products?.filter(
      (product: any) => product.productCategory === "Jewelry"
    ) || [];
  const OfficeProductsCategory: any =
    SellerAllProducts?.products?.filter(
      (product: any) => product.productCategory === "Office Products"
    ) || [];
  const MusicalInstrumentsCategory: any =
    SellerAllProducts?.products?.filter(
      (product: any) => product.productCategory === "Musical Instruments"
    ) || [];
  const ArtsCraftsCategory: any =
    SellerAllProducts?.products?.filter(
      (product: any) => product.productCategory === "Arts & Crafts"
    ) || [];

  useEffect(() => {
    if (SellerAllProducts) {
      dispatch(setSellerProductsInfo(SellerAllProducts));
    }
  }, [SellerAllProducts, dispatch]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading || !SellerAllProducts) return <Spinner />;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  const categoryCounts = {
    Clothes: clothesCategory.reduce(
      (acc: any, product: { quantity: any }) => acc + product.quantity,
      0
    ),
    Electronics: electronicsCategory.reduce(
      (acc: any, product: { quantity: any }) => acc + product.quantity,
      0
    ),
    Books: booksCategory.reduce(
      (acc: any, product: { quantity: any }) => acc + product.quantity,
      0
    ),
    SportsOutdoors: SportsOutdoorsCategory.reduce(
      (acc: any, product: { quantity: any }) => acc + product.quantity,
      0
    ),
    ToysGames: ToysGamesCatgeory.reduce(
      (acc: any, product: { quantity: any }) => acc + product.quantity,
      0
    ),
    HomeGarden: HomeGardenCategory.reduce(
      (acc: any, product: { quantity: any }) => acc + product.quantity,
      0
    ),
    BeautyPersonalCare: BeautyPersonalCareCategory.reduce(
      (acc: any, product: { quantity: any }) => acc + product.quantity,
      0
    ),
    Automotive: AutomotiveCategory.reduce(
      (acc: any, product: { quantity: any }) => acc + product.quantity,
      0
    ),
    HealthWellness: HealthWellnessCategory.reduce(
      (acc: any, product: { quantity: any }) => acc + product.quantity,
      0
    ),
    FoodBeverages: FoodBeveragesCategory.reduce(
      (acc: any, product: { quantity: any }) => acc + product.quantity,
      0
    ),
    PetSupplies: PetSuppliesCategory.reduce(
      (acc: any, product: { quantity: any }) => acc + product.quantity,
      0
    ),
    OfficeProducts: OfficeProductsCategory.reduce(
      (acc: any, product: { quantity: any }) => acc + product.quantity,
      0
    ),
    Jewelry: JewelryCategory.reduce(
      (acc: any, product: { quantity: any }) => acc + product.quantity,
      0
    ),
    MusicalInstruments: MusicalInstrumentsCategory.reduce(
      (acc: any, product: { quantity: any }) => acc + product.quantity,
      0
    ),
    ArtsCrafts: ArtsCraftsCategory.reduce(
      (acc: any, product: { quantity: any }) => acc + product.quantity,
      0
    ),
  };

  const data = {
    labels: [
      "Clothes",
      "Electronics",
      "Books",
      "Sports & Outdoors",
      "Toys & Games",
      "Home & Garden",
      "Beauty & Personal Care",
      "Automotive",
      "Health & Wellness",
      "Food & Beverages",
      "Pet Supplies",
      "Jewelry",
      "Office Products",
      "Musical Instruments",
      "Arts & Crafts",
    ],
    datasets: [
      {
        label: "Number of products",
        data: [
          categoryCounts.Clothes,
          categoryCounts.Electronics,
          categoryCounts.Books,
          categoryCounts.SportsOutdoors,
          categoryCounts.ToysGames,
          categoryCounts.HomeGarden,
          categoryCounts.BeautyPersonalCare,
          categoryCounts.Automotive,
          categoryCounts.HealthWellness,
          categoryCounts.FoodBeverages,
          categoryCounts.PetSupplies,
          categoryCounts.Jewelry,
          categoryCounts.OfficeProducts,
          categoryCounts.MusicalInstruments,
          categoryCounts.ArtsCrafts,
        ],
        backgroundColor: [
          "#4D5BD4",
          "#CCD0D8",
          "#2A2E3D",
          "#FFCE56",
          "#ecf39e",
          "#bd1f36",
          "#772e25",
          "#d8a48f",
          "#a1cca5",
          "#fdffb6",
          "#f7a072",
          "#5a2a27",
          "#f3d8c7",
          "#f7d6e0",
          "#e78f8e",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF6384",
          "#f7d6e0",
          "#a1cca5",
          "#f3d8c7",
          "#5a2a27",
          "#e78f8e",
          "#c2a9d1",
          "#8f2d56",
          "#c3aed6",
          "#c29979",
          "#88d4ab",
          "#00798c",
        ],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div className="bg-white p-4" style={{ height: "50vh" }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default ProductCategories;
