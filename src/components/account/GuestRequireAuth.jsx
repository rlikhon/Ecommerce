import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AccountAuthContext } from "../context/AccountAuth";

export const GuestRequireAuth = () => {
  const { user } = useContext(AccountAuthContext);

  // ✅ THE INTERCEPTOR FIX: If a customer is ALREADY logged in, 
  // block them from seeing the forms and redirect them to their profile page.
  if (user) {
    return <Navigate to="/account" replace />;
  }

  // If they are genuine guest visitors, allow them to view the Login/Register forms
  return <Outlet />;
};
