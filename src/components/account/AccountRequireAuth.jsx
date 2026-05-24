import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
// Adjust the relative dots depending on your context structure path
import { AccountAuthContext } from "../context/AccountAuth"; 

export const AccountRequireAuth = () => {
  const { user } = useContext(AccountAuthContext);

  // If a standard guest shopper is unauthorized, route them to the store login
  if (!user) {
    return <Navigate to="/account/login" replace />;
  }

  // Allow consumer-specific nested routing layouts
  return <Outlet />;
};
