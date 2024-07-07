import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
// import Search from './search';
import { logOut } from '../slices/authSlice/authSlice';
import {FiSearch} from 'react-icons/fi';
import { useLogoutMutation } from '../slices/authSlice/authApiSlice';

interface NavbarProps {
  onSearchToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({onSearchToggle}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { userInfo } = useSelector((state: any) => state.auth);
  const [isLoading, setIsLoading] = useState<boolean>(false);
   const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout ]=useLogoutMutation()
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toogleSearch = () => {
      onSearchToggle();
  };
  const handleLogout = async(e: any) =>{
  e.preventDefault()
  setIsLoading(true)
  try {
    //@ts-ignore
      await logout().unwrap();
      dispatch(logOut());
      toast.success("You're Logged out");
      navigate('/login')
    }
  catch(err:any){ if (err?.data?.message) {
        toast.error(err.data.message);
      } else if (err.status === 400) {
        toast.error('already logged out or not logged in');
      } else if (err.status === 401) {
        toast.error('User is not authenticated');
      } else {
        toast.error('Internal Server Error');
      }
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <nav className="bg-white fixed top-0 left-0 right-0 z-10">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="hidden md:flex items-center space-x-4 sm:space-x-6">
            <Link to="/" className="text-sm text-gray-600 hover:text-black">HOME</Link>
            <Link to="/shop" className="text-sm text-gray-600 hover:text-black">SHOP</Link>
            <Link to="/about" className="text-sm text-gray-600 hover:text-black">ABOUT</Link>
            <Link to="/chat" className="text-sm text-gray-600 hover:text-black">CHAT</Link>
          </div>

          <div className="hidden md:block text-xl font-bold">DEPOT</div>
          
            {/* <div className='mt-20'>
               <Search  isVisible={isInputVisible} onClose={() => setIsInputVisible(false)}/>
            </div> */}
          <div className="hidden md:flex items-center space-x-4 sm:space-x-6 ml-60">
            {userInfo ? (
              <div className="relative">
                <button onClick={toggleDropdown} className="block text-sm text-gray-600 hover:text-black">
                  {userInfo.user.firstname}
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                    <button 
                    className="block px-4 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-100 "
                    onClick={handleLogout}
                    >Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-sm text-gray-600 hover:text-black">LOGIN</Link>
            )}
            <Link to="/cart" className="text-sm text-gray-600 hover:text-black">CART (50)</Link>
            
            <button onClick={ toogleSearch } className="text-gray-600 hover:text-black">
               <FiSearch className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block text-sm text-gray-600 hover:text-black transition-transform duration-200 ease-in-out transform hover:translate-x-2">HOME</Link>
            <Link to="/shop" className="block text-sm text-gray-600 hover:text-black transition-transform duration-200 ease-in-out transform hover:translate-x-2">SHOP</Link>
            <Link to="/about" className="block text-sm text-gray-600 hover:text-black transition-transform duration-200 ease-in-out transform hover:translate-x-2">ABOUT</Link>
            <Link to="/chat" className="block text-sm text-gray-600 hover:text-black transition-transform duration-200 ease-in-out transform hover:translate-x-2">CHAT</Link>
            <Link to="/cart" className="block text-sm text-gray-600 hover:text-black transition-transform duration-200 ease-in-out transform hover:translate-x-2">CART (50)</Link>
            {userInfo ? (
              <Link to="/logout" className="block text-sm text-gray-600 hover:text-black transition-transform duration-200 ease-in-out transform hover:translate-x-2">LOGOUT</Link>
            ) : (
              <Link to="/login" className="block text-sm text-gray-600 hover:text-black transition-transform duration-200 ease-in-out transform hover:translate-x-2">LOGIN</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
