import React, { useContext } from "react";
import { AdminAuthContext } from "../context/AdminAuth";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Layers,
  Bookmark,
  Package,
  ShoppingBag,
  Users,
  Truck,
  KeyRound,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const { logout } = useContext(AdminAuthContext);
  const location = useLocation();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  const menuItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/categories", label: "Categories", icon: Layers },
    { path: "/admin/brands", label: "Brands", icon: Bookmark },
    { path: "/admin/products", label: "Products", icon: Package },
    { path: "/admin/orders", label: "Orders", icon: ShoppingBag },
    { path: "/admin/users", label: "Users", icon: Users },
    { path: "/admin/shipping", label: "Shipping", icon: Truck },
    {
      path: "/admin/change-password",
      label: "Change Password",
      icon: KeyRound,
    },
  ];

  return (
    <div className="card shadow border-0 sidebar mb-5">
      <div className="card-body p-0 py-2">
        <ul className="list-unstyled mb-0">
          {menuItems.map((item) => {
            const IconComponent = item.icon;

            // ✅ THE SUPER-LEVEL FIX: Sub-string partial path detection matching rules
            // If the URL is exactly the dashboard, match strictly.
            // For resource sub-directories, highlight if the current path starts with the module path base string.
            const isActive =
              item.path === "/admin/dashboard"
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path);

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`sidebar-link ${isActive ? "active" : ""}`}
                >
                  <IconComponent size={18} className="sidebar-icon" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}

          <li className="border-top mt-2 pt-2">
            <a
              href="#"
              onClick={handleLogout}
              className="sidebar-link text-danger logout-link"
            >
              <LogOut size={18} className="sidebar-icon" />
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
