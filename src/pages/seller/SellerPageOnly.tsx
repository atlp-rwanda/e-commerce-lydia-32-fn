import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const SellerPageOnly: React.FC = () => {
  const { userInfo } = useSelector((state: any) => state.auth);

  const isUserSeller = userInfo && userInfo.user.roleId === 2;
  return <>{isUserSeller ? <Outlet /> : <Navigate to="/" replace />}</>;
};

export default SellerPageOnly;
