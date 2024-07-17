import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, setMinPrice, setMaxPrice, setCategory, clearSearch } from '../slices/searchSlice';
import { useSearchProductsQuery, Product } from '../slices/productSlice/productApiSlice';
import { RootState } from '../store';
import ProductCard from './product';
import toast from 'react-hot-toast';
import Spinner from './Spinners';

interface SearchProps {
  isVisible: boolean;
  onClose: () => void;
}

const ITEMS_PER_PAGE = 6;

const Search: React.FC<SearchProps> = ({ isVisible, onClose }) => {

  const categories = [
    "Electronics",
    "Clothes",
    "Home & Garden",
    "Sports & Outdoors",
    "Books",
    "Toys & Games",
    "Beauty & Personal Care",
    "Automotive",
    "Health & Wellness",
    "Food & Beverages",
    "Jewelry",
    "Pet Supplies",
    "Office Products",
    "Musical Instruments",
    "Arts & Crafts"
  ];
  const dispatch = useDispatch();
  const { searchTerm, minPrice, maxPrice, category } = useSelector((state: RootState) => state.search);

  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [localMinPrice, setLocalMinPrice] = useState(minPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);
  const [localCategory, setLocalCategory] = useState(category);
  const [searchParams, setSearchParams] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [localSearchResults, setLocalSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const { data: searchResults, isLoading, isError, error } = useSearchProductsQuery(
    searchParams,
    {
      skip: !searchParams
    }
  );

  useEffect(() => {
    if (isVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isVisible]);

  useEffect(() => {
    if (searchResults && searchResults.products.length === 0) {
      toast.error('No products that match your criteria were found');
    } else if (searchResults) {
      localStorage.setItem('searchResults', JSON.stringify(searchResults.products));
      setLocalSearchResults(searchResults.products.slice(0, ITEMS_PER_PAGE));
    }
    setIsSearching(false);
  }, [searchResults]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setLocalSearchResults([]);
    
    if (localSearchTerm || localMinPrice || localMaxPrice || localCategory) {
      const params = new URLSearchParams();
      
      if (localSearchTerm) params.append('name', localSearchTerm);
      if (localMinPrice) params.append('minPrice', localMinPrice.toString());
      if (localMaxPrice) params.append('maxPrice', localMaxPrice.toString());
      if (localCategory) params.append('category', localCategory);
      
      dispatch(setSearchTerm(localSearchTerm));
      dispatch(setMinPrice(localMinPrice ? Number(localMinPrice) : 0));
      dispatch(setMaxPrice(localMaxPrice ? Number(localMaxPrice) : 0));
      dispatch(setCategory(localCategory));
      
      setSearchParams(params.toString());
      setCurrentPage(1);
    } else {
      toast.error('Please provide at least one search parameter');
      setIsSearching(false);
    }
    
  };

  const handleClear = () => {
    dispatch(clearSearch());
    setLocalSearchTerm('');
    setLocalMinPrice('');
    setLocalMaxPrice('');
    setLocalCategory('');
    setSearchParams('');
    setCurrentPage(1);
    setLocalSearchResults([]);
    localStorage.removeItem('searchResults');
  };

  const handlePageChange = (newPage: number) => {
    const storedResults = JSON.parse(localStorage.getItem('searchResults') || '[]');
    const startIndex = (newPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const totalItems = JSON.parse(localStorage.getItem('searchResults') || '[]').length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    setLocalSearchResults(storedResults.slice(startIndex, endIndex));
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil((JSON.parse(localStorage.getItem('searchResults') || '[]').length) / ITEMS_PER_PAGE);


  return (
    <div className="bg-white rounded-lg p-4 w-full max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="space-y-4 mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            ref={inputRef}
            type="text"
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <select
            value={localCategory}
            onChange={(e) => setLocalCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="number"
            value={localMinPrice}
            onChange={(e) => setLocalMinPrice(e.target.value)}
            placeholder="Min Price"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="number"
            value={localMaxPrice}
            onChange={(e) => setLocalMaxPrice(e.target.value)}
            placeholder="Max Price"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <button type="submit" className="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Search
        </button>
      </form>
      
      <div className="flex justify-between mb-4">
        <button onClick={handleClear} className="text-gray-600 hover:text-gray-800 focus:outline-none">
          Clear
        </button>
        <button onClick={onClose} className="text-gray-600 hover:text-gray-800 focus:outline-none">
          Close
        </button>
      </div>

      {isLoading || isSearching ? (
        <Spinner/>
      ) : isError && error ? (
        <p>Error occurred while searching: {
          typeof error === 'object' && error !== null && 'data' in error
            ? JSON.stringify((error as any).data.error)
            : 'An unknown error occurred'
        }</p>
      ) : (
        localSearchResults.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {localSearchResults.map((product: any) => (
                <ProductCard key={product.productId} product={product} />
              ))}
            </div>
            <div className="mt-4 flex justify-center">
            <button 
              onClick={() => handlePageChange(currentPage - 1)} 
              disabled={currentPage === 1}
              className="mx-1 px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="mx-2">{`Page ${currentPage}`}</span>
            <button 
              onClick={() => handlePageChange(currentPage + 1)} 
              disabled={currentPage >= totalPages}
              className="mx-1 px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
          </>
        ) : (
          <p>No products found</p>
        )
      )}
    </div>
  );
};

export default Search;
