import React from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

const MainLayout: React.FC = () => {
  return (
    <>
      <Toaster/>
      <Outlet/>
    </>
  )
}

export default MainLayout
