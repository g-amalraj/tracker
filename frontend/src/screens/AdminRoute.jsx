import React from "react";
import { RouterProvider } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userInfo = useSelector((state) => state.auth.userInfo);

  return isAuthenticated && userInfo.isAdmin === true ? 
    (children)
   : (
    <Navigate to="/assign" />
  );
}

export default AdminRoute;
