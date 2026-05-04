import React from 'react'
import { useContext } from "react";
import { AdminAuthContext } from "../context/AdminAuth";
import { Link } from 'react-router-dom';


const Sidebar = () => {
    const { logout } = useContext(AdminAuthContext);

  const handleLogout = () => {
    logout();
  };
  return (
    <>
        <div className="card shadow sidebar mb-5">
              <div className="card-body p-4">
                <ul className="list-unstyled">
                  <li><Link to="/admin/dashboard">Dashboard</Link></li>
                  <li><Link to="/admin/categories">Categories</Link></li>
                  <li><Link to="/admin/brands">Brands</Link></li>                  
                  <li><Link to="/admin/products">Products</Link></li>
                  <li><a href="#">Orders</a></li>
                  <li><a href="#">Users</a></li>
                  <li><a href="#">Shipping</a></li>
                  <li><a href="#">Change Password</a></li>
                  <li><a href="#" onClick={handleLogout}>Logout</a></li>
                </ul>
              </div>
            </div>
    </>
  )
}

export default Sidebar