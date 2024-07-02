import { useState } from 'react';
import Home from './pages/Home';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import LoginForm from './pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './layout';

import AboutUs from './pages/AboutUs';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<LoginForm />} />
      <Route path="/about" element={<AboutUs />} />
    </Route>
    )
  );

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  );
};

export default App;





