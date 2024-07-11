import React from 'react'
import { FaBars } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const {userInfo} = useSelector((state: any) => state.auth)
  return (
    <div className="p-4 bg-white shadow flex justify-between items-center">
      <button onClick={toggleSidebar} className="text-gray-700 focus:outline-none lg:hidden">
        <i className="fas fa-bars"><FaBars/></i>
      </button>
      <h1 className="text-xl font-bold">
        <Link to='/admin/dashboard'>Dashboard</Link>
        </h1>
      <div className="flex items-center">
        <span className="mr-4">{userInfo && userInfo.user.firstname}</span>
        
      </div>
    </div>
  );
}

export default Header