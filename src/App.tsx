import React from 'react'
import { useState } from 'react';
import Home from './pages/Home';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import LoginForm from './pages/Login';
import MainLayout from './layouts/MainLayout';
import TeamSection from './pages/ourTeam';
import ForgotPasswordLayout from './pages/ForgotPassword'
import ResetPasswordLayout from './pages/ResetPassword'
import AboutUs from './pages/AboutUs';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path= '/' element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path='/login' element={<LoginForm />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/ourTeam" element={<TeamSection/>} />
      <Route path='/forgot-password' element={<ForgotPasswordLayout />} />
      <Route path='/reset-password' element={<ResetPasswordLayout />} />
    </Route>
    )
  );

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
