import React, { useState, useEffect } from 'react';
import Sidebar from '../../Components/admin/Sidebar';
import Header from '../../Components/admin/Header';
import { useGetRolePermissionQuery } from '../../slices/roleSlice/requestroleApiSlice';
import { useGetPermissionsQuery } from '../../slices/permissionSlice/permissionApiSlice';
import { useRemovePermissionFromRoleMutation } from '../../slices/permissionSlice/permissionApiSlice';
import Spinner from '../../Components/Spinners';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';


const AdminDeletePermiFromRole = () => {
  const [selectedPermission, setSelectedPermission] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [myPermissions, setMyPermissions] = useState<any[]>([]);

  const { id } = useParams();
  const navigate = useNavigate()

  //@ts-ignore
  const { data: rolePermission, refetch } = useGetRolePermissionQuery();
  //@ts-ignore
  const { data: permission,  } = useGetPermissionsQuery();

  const [removePermission, {isLoading}] = useRemovePermissionFromRoleMutation()

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        await refetch();
        if (permission && rolePermission) {
          const filteredPermissions = permission.permissions.filter((permi: any) => 
            rolePermission.rolePermissions.some((rolePermi: any) => 
              rolePermi.roleId == id && rolePermi.permissionId === permi.id
            )
          );
          setMyPermissions(filteredPermissions);
        }
      }
    };
  
    fetchData();
  }, [id, refetch, permission, rolePermission]);

  useEffect(() => {
    if (myPermissions.length !== 0) {
      console.log(myPermissions.map(perm => perm));
    }
  }, [myPermissions]);

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
   try {

    await removePermission({id, permissionId: +selectedPermission}).unwrap()
    setMyPermissions(prevPermissions => 
      prevPermissions.filter(perm => perm.id !== +selectedPermission)
    );
    toast.success('permission removed successfully')
    refetch()
    navigate('/admin/dashboard')
   } catch (err) {
    //@ts-ignore
    if(err?.data?.error) {
      //@ts-ignore
  toast.error(err?.data?.error)
}
//@ts-ignore
    if(err?.data?.message) {
       //@ts-ignore
    toast.error(err?.data?.message) 
}

   }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        <div className="max-w-md mt-14 mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Delete Permission From Role</h2>
          
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
                {myPermissions.map((permission: any) => (
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
              Delete Permission
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminDeletePermiFromRole;