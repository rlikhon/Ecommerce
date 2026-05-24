import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AccountAuthContext } from "../../context/AccountAuth";
import { User, ShoppingBag, MapPin, KeyRound, LogOut, Heart } from 'lucide-react';

const AccountSidebar = () => {
  const { logout } = useContext(AccountAuthContext);
  const location = useLocation();

  const handleCustomerLogout = (e) => {
    e.preventDefault();
    logout(); 
  };

  const accountMenuItems = [
    { path: '/account/profile', label: 'My Profile', icon: User },
    { path: '/account/orders', label: 'Order History', icon: ShoppingBag },
    { path: '/account/wishlist', label: 'My Wishlist', icon: Heart },
    { path: '/account/shipping-address', label: 'Shipping Addresses', icon: MapPin },
    { path: '/account/change-password', label: 'Update Password', icon: KeyRound },
  ];

  return (
    <div className="card shadow-sm border-0 account-sidebar mb-5">
      <div className="card-body p-0 py-2">
        <ul className="list-unstyled mb-0">
          {accountMenuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname.startsWith(item.path);

            return (
              <li key={item.path}>
                <Link to={item.path} className={`account-sidebar-link ${isActive ? 'active' : ''}`}>
                  <IconComponent size={18} className="account-sidebar-icon" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
          <li className="border-top mt-2 pt-2">
            <a href="#" onClick={handleCustomerLogout} className="account-sidebar-link text-danger logout-link">
              <LogOut size={18} className="account-sidebar-icon" />
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AccountSidebar;
