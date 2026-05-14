// src/components/admin/AdminRequireAuth.jsx
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom"; // ✅ Import Outlet
import { AdminAuthContext } from "../context/AdminAuth";

export const AdminRequireAuth = () => {
  const { user } = useContext(AdminAuthContext);

  // If unauthorized, intercept execution rendering tree and force a redirect
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  // ✅ Rent out the shared child component paths inside the parent routing wrapper
  return <Outlet />;
};
