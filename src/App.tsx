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
import SignupForm from './pages/Register';
import EmailVerificationPage from './pages/verified';
import EmailVerificationFailedPage from './pages/verifyFailed';
import NotFoundPage from './pages/NotFoundPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPageOnly from './pages/admin/AdminPageOnly';
import AdminCreateRole from './pages/admin/AdminCreateRole';
import AdminCreatePermission from './pages/admin/AdminCreatePermission';
import AdminAssignPermiToRole from './pages/admin/AdminAssignPermiToRole';
import AdminDeletePermiFromRole from './pages/admin/AdminDeletePermiFromRole';
import AdminAssignRoleToUser from './pages/admin/AdminAssignRoleToUser';
import AdminEditRole from './pages/admin/AdminEditRole';

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
        <Route path='' element={<AdminPageOnly/>}>
           <Route path='/admin/dashboard' element={<AdminDashboard/>}/>  
           <Route path='/admin/create/role' element={<AdminCreateRole/>}/>  
           <Route path='/admin/create/permission' element={<AdminCreatePermission/>}/>  
           <Route path='/admin/assign/permission/:id' element={<AdminAssignPermiToRole/>}/>  
           <Route path='/admin/delete/permission/:id' element={<AdminDeletePermiFromRole/>}/>  
           <Route path='/admin/assign/role/:id' element={<AdminAssignRoleToUser/>}/>  
           <Route path='/admin/edit/role/:id' element={<AdminEditRole/>}/>  
        </Route>
       
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
