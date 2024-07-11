import React, { useEffect, useState } from 'react'
import { useGetAllUsersQuery } from '../../slices/usersSlice/userApiSlice';
import { setUsersInfo } from '../../slices/usersSlice/userSlice';
import { useDispatch } from 'react-redux';
import { FaBan, FaUserCog } from 'react-icons/fa';
import Spinner from '../Spinners';
import { Link } from 'react-router-dom';
import { useBlockUserMutation } from '../../slices/usersSlice/userApiSlice';
import toast from 'react-hot-toast';

const Users: React.FC = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  //@ts-ignore
  const { data: AllUsers, error, refetch} = useGetAllUsersQuery()
  const [blockUser] = useBlockUserMutation()

  useEffect(() => {
    const handleData = () => {
      setIsLoading(true)
      try {
        if (AllUsers) {
          dispatch(setUsersInfo(AllUsers))
        }
      } catch (error) {
        console.log(error)
      }finally {
        setIsLoading(false)
      }
     
    }
    handleData()
  }, [AllUsers, dispatch])

  useEffect(() => {
    refetch()
  }, [refetch])

  if (isLoading  || !AllUsers) return <Spinner />;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;


  const handleBlockUser = async(id: any) => {
    setIsLoading(true)
  try {
    await blockUser(id).unwrap()
    refetch()
    toast.success('blocked successfully')
  } catch (error) {
    console.log(error)
  }finally {
    setIsLoading(false)
  }
  }

  return (
    <div className="bg-white p-2 sm:p-4 shadow rounded overflow-x-auto">
      <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4">Users</h2>
      <table className="w-full text-xs sm:text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-2 sm:px-4 py-1 sm:py-2 text-left">Names</th>
            <th className="px-2 sm:px-4 py-1 sm:py-2 text-left hidden md:table-cell">Email</th>
            <th className="px-2 sm:px-4 py-1 sm:py-2 text-left">Role</th>
            <th className="px-2 sm:px-4 py-1 sm:py-2 text-center">Assign</th>
            <th className="px-2 sm:px-4 py-1 sm:py-2 text-center">Block</th>
            <th className="px-2 sm:px-4 py-1 sm:py-2 text-left hidden md:table-cell">IsBlocked</th>
          </tr>
        </thead>
        <tbody>
          {AllUsers && AllUsers.users && AllUsers.users.map((user: any) => (
            <tr key={user.id} className="border-b">
              <td className="px-2 sm:px-4 py-1 sm:py-2">{user.firstname}</td>
              <td className="px-2 sm:px-4 py-1 sm:py-2 hidden md:table-cell">{user.email}</td>
              <td className="px-2 sm:px-4 py-1 sm:py-2">{user.roleId}</td>
              <td className="px-2 sm:px-4 py-1 sm:py-2 text-center">
                <button className="text-blue-500 hover:text-blue-700">
                  <Link to={`/admin/assign/role/${user.id}`}>
                  <FaUserCog className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Link>
                  
                </button>
              </td>
              <td className="px-2 sm:px-4 py-1 sm:py-2 text-center">
                <button onClick={() => handleBlockUser(user.id)} className="text-red-500 hover:text-red-700">
                  <FaBan className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </td>
              <td  className="px-2  sm:px-4 py-1 sm:py-2 hidden md:table-cell">{user.isBlocked ? 'True' : 'False'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users