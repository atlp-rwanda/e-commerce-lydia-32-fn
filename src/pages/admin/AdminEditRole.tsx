import React, { useState, useEffect } from 'react';
import Sidebar from '../../Components/admin/Sidebar';
import Header from '../../Components/admin/Header';
import { useUpdateRoleMutation } from '../../slices/roleSlice/requestroleApiSlice';
import Spinner from '../../Components/Spinners';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSelector, UseSelector } from 'react-redux';

const AdminEditRole = () => {
  const [role, setRole] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate()
  const {id} = useParams()
  const [editRole, {isLoading}] = useUpdateRoleMutation()

  const {roleInfo} = useSelector((state: any) => state.role)

  useEffect(() => {
   if(roleInfo) {
    const myRole = roleInfo.roles.filter((role: any) => role.id == id)
    setRole(myRole[0].name)
   }
  }, [roleInfo])

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
      await editRole({id, name: role}).unwrap()
      toast.success('role Edited successfully')
      navigate('/admin/dashboard')
    } catch (err) {
        //@ts-ignore
        if(err.status === 400) {
            //@ts-ignore
        toast.error(err?.data?.errors)
      }
       //@ts-ignore
      toast.error(err?.data?.message) 
    }    
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        <div className="w-96 h-64 mt-14 mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">EDIT USER ROLE</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4 mt-8">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                Role <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="relative w-full rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-gray-300 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                placeholder="Type the Role"
              />
            </div>
            {isLoading && <Spinner/>}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Edit Role
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminEditRole;
