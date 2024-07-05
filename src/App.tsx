import React from 'react'
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
import NotFoundPage from './pages/NotFoundPage';
import SignupForm from './Components/Register';
import EmailVerificationPage from './Components/common/verified';
import EmailVerificationFailedPage from './Components/common/verifyFailed';

const App:React.FC = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path= '/' element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path='*' element={<NotFoundPage/>}/>
      <Route path='/login' element={<LoginForm />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/ourTeam" element={<TeamSection/>} />
      <Route path='/forgot-password' element={<ForgotPasswordLayout />} />
      <Route path='/reset-password' element={<ResetPasswordLayout />} />
      <Route path="/register" element={<SignupForm />} />
        <Route path="/verified" element={<EmailVerificationPage />} />
        <Route
          path="/verification/failed"
          element={<EmailVerificationFailedPage />}
        />
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
