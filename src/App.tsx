import { useState } from 'react'
import Home from './Components/Home'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

const App = ()=> {
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Home />}/>
  )
)
  return (
 <Provider store={store} >
  <RouterProvider router={router} />
 </Provider>
  )
}

export default App
