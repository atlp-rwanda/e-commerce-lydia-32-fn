import React, { useState } from 'react';
import Sidebar from '../../Components/admin/Sidebar';
import Header from '../../Components/admin/Header';
import { useGetPermissionsQuery, useAddPermissionToRoleMutation } from '../../slices/permissionSlice/permissionApiSlice';
import Spinner from '../../Components/Spinners';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';


const AssignPermissionToRole = () => {
  const [selectedPermission, setSelectedPermission] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate()
  const {id} = useParams()

  //@ts-ignore
  const {data: AllPermission } = useGetPermissionsQuery()
  const [AssignPermission, {isLoading}] = useAddPermissionToRoleMutation()
 

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
   try {
    await AssignPermission({permissionId: +selectedPermission, id}).unwrap()
    toast.success('Permission Assigned Successfully')
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
        <div className="max-w-md mt-14 mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Assign Permission To Role</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="permission" className="block text-sm font-medium text-gray-700 mb-1">
                Permission <span className="text-red-500">*</span>
              </label>
              <select
                id="permission"
                value={selectedPermission}
                onChange={(e) => setSelectedPermission(e.target.value)}
                className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-gray-300 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
              >
                {AllPermission && AllPermission.permissions.map((permission: any) => (
                  <option key={permission.id} value={permission.id}>
                    {permission.name}
                  </option>
                ))}
              </select>
            </div>
            
            {isLoading && <Spinner/>}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Assign Permission
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AssignPermissionToRole;
