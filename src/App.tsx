import React from 'react'
import Home from './Components/Home'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import LoginForm from './Components/Login'
import MainLayout from './layouts/MainLayout'
import ForgotPasswordLayout from './pages/ForgotPassword'
import ResetPasswordLayout from './pages/ResetPassword'

const App: React.FC = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='/login' element={<LoginForm />} />
        </Route>
        <Route path='/forgot-password' element={<ForgotPasswordLayout />} />
        <Route path='/reset-password' element={<ResetPasswordLayout />} />
      </>
    )
  )
  return (
    <Provider store={store} >
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
