import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useDispatch } from "react-redux";
import { useGetSellerProductsQuery } from "../../slices/sellerSlice/sellerProductsApiSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  data: { category: string; products: number }[];
}

const CategoryBarChart: React.FC = () => {
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

  const chartData = {
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
        label: "Categories Count",
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
          "#2b2d42",
          "#bd1f36",
          "#772e25",
          "#d8a48f",
          "#a1cca5",
          "#3c6e71",
          "#f7a072",
          "#5a2a27",
          "#f3d8c7",
          "#f7d6e0",
          "#e78f8e",
        ],
        borderColor: [
          "#4D5BD4",
          "#CCD0D8",
          "#2A2E3D",
          "#FFCE56",
          "#2b2d42",
          "#bd1f36",
          "#772e25",
          "#d8a48f",
          "#a1cca5",
          "#3c6e71",
          "#f7a072",
          "#5a2a27",
          "#f3d8c7",
          "#f7d6e0",
          "#e78f8e",
        ],
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Product Categories Distribution",
        font: {
          size: 18,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y + " products";
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          font: {
            size: 12,
          },
          callback: function (value: any) {
            return value + " pcs";
          },
        },
      },
    },
    animation: {
      duration: 2000,
      easing: "easeOutBounce",
    },
    layout: {
      padding: 20,
    },
  };
  //@ts-ignore
  return <Bar data={chartData} options={options} height={50} width={50} />;
};

export default CategoryBarChart;
