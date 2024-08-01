import React, { useEffect, useState } from 'react'
import { useGetAllUsersQuery } from '../../slices/usersSlice/userApiSlice';
import { setUsersInfo } from '../../slices/usersSlice/userSlice';
import { useDispatch } from 'react-redux';
import { FaBan, FaUserCog, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Spinner from '../Spinners';
import { Link } from 'react-router-dom';
import { useBlockUserMutation } from '../../slices/usersSlice/userApiSlice';
import toast from 'react-hot-toast';

const Users: React.FC = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const { data: AllUsers, error, refetch} = useGetAllUsersQuery()
  const [blockUser] = useBlockUserMutation()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const usersPerPage = 10

  useEffect(() => {
    const handleData = () => {
      setIsLoading(true)
      try {
        if (AllUsers) {
          dispatch(setUsersInfo(AllUsers))
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    handleData()
  }, [AllUsers, dispatch])

  useEffect(() => {
    refetch()
  }, [refetch])

  if (isLoading || !AllUsers) return <Spinner />;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  const handleBlockUser = async(id: any) => {
    setIsLoading(true)
    try {
      await blockUser(id).unwrap()
      refetch()
      toast.success('blocked successfully')
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredUsers = AllUsers.users.filter((user: any) =>
    user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="bg-white p-2 sm:p-4 shadow rounded">
      <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4">Users</h2>
      <div className="mb-4 flex items-center">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search users..."
          className="border rounded px-2 py-1 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
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
            {currentUsers.map((user: any) => (
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
                <td className="px-2 sm:px-4 py-1 sm:py-2 hidden md:table-cell">{user.isBlocked ? 'True' : 'False'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          <FaChevronLeft />
        </button>
        <span>Page {currentPage} of {Math.ceil(filteredUsers.length / usersPerPage)}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(filteredUsers.length / usersPerPage)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

export default Users