;
import depot from '../assets/depot.jpg'
import background from '../assets/Background.jpg'
import Footer from '../Components/footer';
import React, { useEffect, useRef, useState } from 'react';

const AboutUs: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const imageRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.1 }
      );
  
      if (imageRef.current) {
        observer.observe(imageRef.current);
      }
  
      return () => {
        if (imageRef.current) {
          observer.unobserve(imageRef.current);
        }
      };
    }, []);
  
    return (
      <div className="w-full">
        {/* Hero Section */}
        <div className="relative h-64 md:h-80 lg:h-96 bg-gray-100">
          <img 
            src={background} 
            alt="Office Interior" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <h1 className="text-white text-4xl md:text-1xl font-semi-bold">
              ABOUT US
            </h1>
          </div>
        </div>
  
        {/* Content Section */}
        <div className="max-w-6xl mx-auto px-4 py-16 mb-16 flex flex-col md:flex-row items-center">
          <div 
            ref={imageRef}
            className={`md:w-1/2 mb-8 md:mb-0 md:pr-8  ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={depot} 
              alt="Depot - Your Favorite Store" 
              className="w-full"
            />
          </div>
          <div className="md:w-1/2">
            <div className="inline-block bg-black text-white text-sm  px-8 py-4 mb-6">
              ABOUT US
            </div>
            <p className="text-gray-600 mb-4 font-catamaran font-thin">
              At Depot, we are passionate about bringing you the best shopping experience online. Our mission is to provide a wide range of high-quality products at competitive prices, delivered right to your doorstep.
              We envision a world where shopping is not just a necessity, but an enjoyable and fulfilling experience. We strive to create a seamless and personalized shopping journey for each of our customers, ensuring they find exactly what they need and more
            </p>
            <a href="#" className="text-gray-600 hover:text-black inline-flex items-center">
              Learn More 
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    );
  };
  
  export default AboutUs;