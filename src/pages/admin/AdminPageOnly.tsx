import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AdminPageOnly: React.FC = () => {
  const {userInfo} = useSelector((state: any) => state.auth)

  const isUserAdmin = userInfo && userInfo.user.roleId === 1
  return (
    <>
      {isUserAdmin ? <Outlet/> : <Navigate to="/" replace/>}
    </>
  )
}

export default AdminPageOnly
