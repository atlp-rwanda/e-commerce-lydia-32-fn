import React from 'react';
import ProductCard from '../Components/product';
import comp from '../assets/comp.png'
import iphone from '../assets/iphone.jpg'

const products = [
  {
    image: comp,
    title: 'Basket with Handles',
    price: 90,
    isNew: true,
  },
  {
    image: iphone,
    title: 'Flower Vase',
    price: 170,
    oldPrice: 210,
    discount: 19,
    isNew: true,
  },
  {
    image: 'https://www.pngall.com/wp-content/uploads/1/Electronic-High-Quality-PNG.png',
    title: 'Deco Accent',
    price: 15,
  },
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY8KPK-G-rGJVPpGCRKdQLAlCiely73WPuCh_cBsQuOVQAUIToTHMOJKGUyGIHbiwGb8M&usqp=CAU',
    title: 'Wall Clock',
    price: 110,
    isNew: true,
  },
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-JVHVviANvWUJalO_yf0PTqmZdDCxjXjzJI0xxyo90BwO3GU2YnhYrMoqgAgcvhpz4As&usqp=CAU',
    title: 'Newspaper Storage',
    price: 90,
  },
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_CLRP7ntVhVSC6FuWiRhBNbbYir4QUCQp5aetXtlgZRCc1Rn-SZDgU11dUq__wNUD-aU&usqp=CAU',
    title: 'Pottery Vase',
    price: 60,
  },
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCMQezlOOpV0PFiMamtTGhQuZYkqxdLBHgsccwyei-Ki1gaKVnTxtwOR3FOyf3jOy-UAY&usqp=CAU',
    title: 'Rose Holdback',
    price: 24,
    oldPrice: 30,
    discount: 20,
  },
  {
    image: 'https://www.pngall.com/wp-content/uploads/13/Computer-PNG-Image-HD.png',
    title: 'Table Lamp',
    price: 240,
    isNew: true,
  },
];

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white py-12 mt-20 ">
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center mb-12">
        <div className="flex items-center mb-4">
          <h1 className="text-4xl font-bold">THINK DIFFERENT.</h1>
          <img src={iphone} alt="Think Different" className="ml-4 w-16 h-16" /> {/* Adjust the class names as needed */}
        </div>
        <p className="text-lg text-gray-600">Depot is a unique & captivating theme designed specifically for all types of shops and online stores.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  </div>
);
};


export default App;
