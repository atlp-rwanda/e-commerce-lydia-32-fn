import React, { useEffect, useState } from 'react'
import { FaTrash, FaUserPlus, FaEdit } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { setRoleInfo } from '../../slices/roleSlice/requestRoleSlice';
import { useGetRolesQuery, useDeleteRoleMutation } from '../../slices/roleSlice/requestroleApiSlice';
import Spinner from '../Spinners';
import { Link } from 'react-router-dom';

const Roles: React.FC = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  //@ts-ignore 
  const { data: AllRoles, error, refetch } = useGetRolesQuery()
  const [deleteRole] = useDeleteRoleMutation()

  useEffect(() => {
    const handleData = () => {
      setIsLoading(true)
      try {
        if (AllRoles) {
          dispatch(setRoleInfo(AllRoles))
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    handleData()
  }, [AllRoles, dispatch])

  useEffect(() => {
    refetch()
  }, [refetch])

  if (isLoading || !AllRoles) return <Spinner />
  if (error) return <div>Error: {JSON.stringify(error)}</div>

  const handleDeleteRole = async (id: any) => {
    setIsLoading(true)
    try {
      await deleteRole(id)
      refetch()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white p-2 sm:p-4 shadow rounded overflow-x-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-2 sm:mb-4">
        <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-0">Roles</h2>
        <Link to='/admin/create/role'>
          <button className="bg-black text-white px-3 py-1 sm:px-4 sm:py-2 rounded text-sm sm:text-base">+ Create Role</button>
        </Link>
      </div>
      <table className="w-full text-xs sm:text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-2 sm:px-4 py-1 sm:py-2 text-left">Role ID</th>
            <th className="px-2 sm:px-4 py-1 sm:py-2 text-left hidden md:table-cell">Role Name</th>
            <th className="px-2 sm:px-4 py-1 sm:py-2 text-center">Actions</th>
            <th className="px-2 sm:px-4 py-1 sm:py-2 text-center">Edit</th>
            <th className="px-2 sm:px-4 py-1 sm:py-2 text-center">Assign</th>
            <th className="px-2 sm:px-4 py-1 sm:py-2 text-center">Delete Perm</th>
          </tr>
        </thead>
        <tbody>
          {AllRoles.roles && AllRoles.roles.map((role: any) => (
            <tr key={role.id} className="border-b">
              <td className="px-2 sm:px-4 py-1 sm:py-2">{role.id}</td>
              <td className="px-2 sm:px-4 py-1 sm:py-2 hidden md:table-cell">{role.name}</td>
              <td className="px-2 sm:px-4 py-1 sm:py-2 text-center">
                <button onClick={() => handleDeleteRole(role.id)} className="text-red-500 hover:text-red-700"><FaTrash className="w-3 h-3 sm:w-4 sm:h-4" /></button>
              </td>
              <td className="px-2 sm:px-4 py-1 sm:py-2 text-center">
                <button className="text-blue-500 hover:text-blue-700">
                  <Link to={`/admin/edit/role/${role.id}`}>
                    <FaEdit className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Link>
                </button>
              </td>
              <td className="px-2 sm:px-4 py-1 sm:py-2 text-center">
                <button className="text-blue-500 hover:text-blue-700">
                  <Link to={`/admin/assign/permission/${role.id}`}>
                    <FaUserPlus className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Link>
                </button>
              </td>
              <td className="px-2 sm:px-4 py-1 sm:py-2 text-center">
                <button className="text-red-500 hover:text-red-700">
                  <Link to={`/admin/delete/permission/${role.id}`}>
                    <FaTrash className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-2 sm:mt-4 flex justify-end">
        <button className="mx-1 px-2 sm:px-3 py-0.5 sm:py-1 border rounded text-xs sm:text-sm">1</button>
        <button className="mx-1 px-2 sm:px-3 py-0.5 sm:py-1 border rounded bg-purple-600 text-white text-xs sm:text-sm">2</button>
      </div>
    </div>
  );
}

export default Roles