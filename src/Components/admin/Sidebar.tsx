import React, { useState } from 'react'
import { FaTimes, FaChevronCircleRight, FaHome, FaTachometerAlt, FaUsersCog, FaLock, FaSignOutAlt } from 'react-icons/fa';
import { logOut } from '../../slices/authSlice/authSlice';
import { useLogoutMutation } from '../../slices/authSlice/authApiSlice';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const [isRolesOpen, setRolesOpen] = useState(false);
  const [isPermissionsOpen, setPermissionsOpen] = useState(false);

  const toggleRolesDropdown = () => setRolesOpen(!isRolesOpen);
  const togglePermissionsDropdown = () => setPermissionsOpen(!isPermissionsOpen);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [logout] = useLogoutMutation()

  const handleLogout = async() => {
    try {
      //@ts-ignore
      await logout().unwrap()
      dispatch(logOut());
      toast.success("You're Logged out");
      navigate('/login')
    } catch (err: any) {
      if (err?.data?.message) {
        toast.error(err.data.message);
      } else if (err.status === 400) {
        toast.error('already logged out or not logged in');
      } else if (err.status === 401) {
        toast.error('User is not authenticated');
      } else {
        toast.error('Internal Server Error');
      }
    }
  }
  
  return (
    <div className={`fixed inset-y-0 left-0 z-30 w-64 h-full transition-transform transform bg-gray-800 text-white lg:static lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} `}>
      <div className="p-4 flex items-center justify-between lg:hidden">
        <button onClick={toggleSidebar} className="text-white focus:outline-none">
          <FaTimes />
        </button>
      </div>
      <div className="flex-1 lg:block">
        <ul>
         
          <li className="p-4 hover:bg-gray-700" style={{ color: 'gold' }}>
            <Link to='/admin/dashboard' className="flex items-center">
              <FaTachometerAlt className="mr-2" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to='/' className="flex items-center">
              <FaHome className="mr-2" />
              <span>Homepage</span>
            </Link>
          </li>
          <li className="p-4 hover:bg-gray-700 cursor-pointer flex justify-between items-center" onClick={toggleRolesDropdown}>
            <div className="flex items-center">
              <FaUsersCog className="mr-2" />
              <span>Roles</span>
            </div>
            <FaChevronCircleRight className={`transition-transform ${isRolesOpen ? 'rotate-90' : ''}`} />
          </li>
          {isRolesOpen && (
            <ul className="ml-4">
              <li className="p-2 hover:bg-gray-700">
                <Link to='/admin/create/role' className="flex items-center">
                  <FaUsersCog className="mr-2" />
                  <span>Create role</span>
                </Link>
              </li>
            </ul>
          )}
          <li className="p-4 hover:bg-gray-700 cursor-pointer flex justify-between items-center" onClick={togglePermissionsDropdown}>
            <div className="flex items-center">
              <FaLock className="mr-2" />
              <span>Permissions</span>
            </div>
            <FaChevronCircleRight className={`transition-transform ${isPermissionsOpen ? 'rotate-90' : ''}`} />
          </li>
          {isPermissionsOpen && (
            <ul className="ml-4">
              <li className="p-2 hover:bg-gray-700">
                <Link to='/admin/create/permission' className="flex items-center">
                  <FaLock className="mr-2" />
                  <span>Create permission</span>
                </Link>
              </li>
            </ul>
          )}
          <li onClick={handleLogout} className="p-4 hover:bg-gray-700 hover:cursor-pointer flex items-center">
            <FaSignOutAlt className="mr-2" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar