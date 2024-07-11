import React, {useEffect, useState} from 'react'
import { FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { setPermissionInfo } from '../../slices/permissionSlice/permissionSlice';
import { useGetPermissionsQuery } from '../../slices/permissionSlice/permissionApiSlice';
import { useDeletePermissionMutation } from '../../slices/permissionSlice/permissionApiSlice';
import Spinner from '../Spinners';
const Permissions: React.FC = () => {

  const dispatch = useDispatch()

  //@ts-ignore
  const {data: AllPermission, error, refetch} = useGetPermissionsQuery()
  const [deletePermission] =useDeletePermissionMutation()
  const [isLoading, setIsLoading] = useState(false)

useEffect(() => {
  const handleData = async() => {
    setIsLoading(true)
    try {
      if(AllPermission) {
        dispatch(setPermissionInfo(AllPermission))
      }
    } catch (error) {
      console.log(error)
    }finally {
      setIsLoading(false)
    }
  }
  handleData()
}, [AllPermission, dispatch])

useEffect(() => {
  refetch()
}, [refetch])

if(isLoading || !AllPermission) return <Spinner/>
if(error) return <div>Error: {JSON.stringify(error)}</div>
    
const handleDeletePermission = async (id: any) => {
  setIsLoading(true)
  try {
    await deletePermission(id)
    refetch()
  } catch (error) {
    console.log(error)
  } finally {
    setIsLoading(false)
  }
}

      return (
        <div className="bg-white p-4 shadow rounded overflow-x-auto">
          <h2 className="text-lg font-bold mb-4">Permissions</h2>
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-2">ID</th>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {AllPermission.permissions && AllPermission.permissions.map((permission: any) => (
                <tr key={permission.id}>
                  <td className="p-2">{permission.id}</td>
                  <td className="p-2">{permission.name}</td>
                  <td className="p-2">
                    <button onClick={() => handleDeletePermission(permission.id)} className="bg-red-500 text-white p-2 rounded">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
}

export default Permissions
