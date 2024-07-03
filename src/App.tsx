import React from 'react'
import Home from './components/Home'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import LoginForm from './components/Login'
import MainLayout from './layouts/MainLayout'

const App: React.FC = ()=> {
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout/>}>
        <Route index element={<Home />}/>
        <Route path='/login' element={<LoginForm/>}/>
    </Route> 
  )
)
  return (
 <Provider store={store} >
  <RouterProvider router={router} />
 </Provider>
  )
}

export default App
