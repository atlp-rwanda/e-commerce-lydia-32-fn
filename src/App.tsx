import React from 'react';
import Home from './pages/Home';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import SellerPageOnly from "./pages/seller/SellerPageOnly";
import SellerDashboardLayout from "./layouts/sellerDashboardLayout";
import AddNewProduct from "./pages/seller/AddProduct";
import Dashboard from "./pages/seller/GeneralAnalysis";
import NotificationBar from "./pages/seller/NotificationBar";
import SellerAllProductsPage from './pages/SellerAllProductsPage';
import SellerSingleProductPage from './pages/SellerSingleProductPage';
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/wishlist";
import WishlistEmpty from "./Components/wishlistEmpty";

import LoginForm from './pages/Login';
import MainLayout from './layouts/MainLayout';
import TeamSection from './pages/ourTeam';
import ForgotPasswordLayout from './pages/ForgotPassword';
import ResetPasswordLayout from './pages/ResetPassword';
import AboutUs from './pages/AboutUs';
import SignupForm from './pages/Register';
import EmailVerificationPage from './pages/verified';
import EmailVerificationFailedPage from './pages/verifyFailed';
import NotFoundPage from './pages/NotFoundPage';
import UpdatePassword from './pages/updatePassword';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPageOnly from './pages/admin/AdminPageOnly';
import AdminCreateRole from './pages/admin/AdminCreateRole';
import AdminCreatePermission from './pages/admin/AdminCreatePermission';
import AdminAssignPermiToRole from './pages/admin/AdminAssignPermiToRole';
import AdminDeletePermiFromRole from './pages/admin/AdminDeletePermiFromRole';
import AdminAssignRoleToUser from './pages/admin/AdminAssignRoleToUser';
import AdminEditRole from './pages/admin/AdminEditRole';
import Profile from './pages/Profile';
import OrderConfirmation from './pages/OrderConfirmation';
import PaymentSuccessPage from './pages/PaymentSuccess';
import PaymentErrorPage from './pages/PyamentErroPage';
import BuyerOrdersComponent from "./pages/order/orderHistory";
import OrderDetailComponent from "./pages/order/orderDetail";
import CustomerSupportPage from './pages/customerSupport';


const App: React.FC = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/ourTeam" element={<TeamSection />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/singleProduct/:id' element={<SingleProduct />} />
        <Route path='/orderConfirmation/:sessionId/:orderId' element={<OrderConfirmation />} />
        <Route path="/payment-success" element={<PaymentSuccessPage />} />
        <Route path="/payment-error" element={<PaymentErrorPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordLayout />} />
        <Route path="/reset-password" element={<ResetPasswordLayout />} />
        <Route path="/register" element={<SignupForm />} />
        <Route path="/verified" element={<EmailVerificationPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-orders" element={<BuyerOrdersComponent />} />
        <Route path="/order/:id" element={<OrderDetailComponent />} />
        <Route path="/customer-support" element={<CustomerSupportPage />} />
        <Route
          path="/verification/failed"
          element={<EmailVerificationFailedPage />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="" element={<AdminPageOnly />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/create/role" element={<AdminCreateRole />} />
          <Route
            path="/admin/create/permission"
            element={<AdminCreatePermission />}
          />
          <Route
            path="/admin/assign/permission/:id"
            element={<AdminAssignPermiToRole />}
          />
          <Route
            path="/admin/delete/permission/:id"
            element={<AdminDeletePermiFromRole />}
          />
          <Route
            path="/admin/assign/role/:id"
            element={<AdminAssignRoleToUser />}
          />
          <Route path="/admin/edit/role/:id" element={<AdminEditRole />} />
        </Route>

        <Route
          path=""
          element={
            <SellerDashboardLayout>
              <SellerPageOnly />
            </SellerDashboardLayout>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="/seller/newproduct" element={<AddNewProduct />} />
          <Route path="/seller/dashboard" element={<Dashboard />} />
          <Route path="/seller/notifications" element={<NotificationBar />} />
          <Route
            path="/seller/product/:id"
            element={<SellerSingleProductPage />}
          />
          <Route path="/seller/products" element={<SellerAllProductsPage />} />
          <Route path="/seller/product/:id" element={<SellerSingleProductPage />} />
          <Route path="/seller/products" element={<SellerAllProductsPage />} />
        </Route>

        <Route path="/wishlist" element={<Wishlist />}></Route>
        <Route path="/wishlist/empty" element={<WishlistEmpty />}></Route>

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
