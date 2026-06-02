import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Route Guard component definitions
import { AdminRequireAuth } from "./components/admin/AdminRequireAuth";
import { AdminAuthProvider } from "./components/context/AdminAuth";
import { AccountRequireAuth } from "./components/account/AccountRequireAuth";
import { AccountAuthProvider } from "./components/context/AccountAuth";
import { GuestRequireAuth } from "./components/account/GuestRequireAuth";

// Admin

import Home from "./components/Home";
import Shop from "./components/Shop";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Confirmation from "./components/Confirmation";
import Login from "./components/admin/Login";
import Dashboard from "./components/admin/Dashboard";

// Category Views
import { default as ShowCategories } from "./components/admin/category/Show";
import { default as CreateCategory } from "./components/admin/category/Create";
import { default as EditCategory } from "./components/admin/category/Edit";

// Brand Views
import { default as ShowBrands } from "./components/admin/brand/Show";
import { default as CreateBrands } from "./components/admin/brand/Create";
import { default as EditBrands } from "./components/admin/brand/Edit";

// Product Views
import { default as ShowProducts } from "./components/admin/product/Show";
import { default as CreateProducts } from "./components/admin/product/Create";
import { default as EditProducts } from "./components/admin/product/Edit";

// Profile Views
import ChangePassword from "./components/admin/ChangePassword";
import Profile from "./components/admin/Profile";

// Account Views
import { default as AccountRegister } from "./components/Register";
import { default as AccountLogin } from "./components/Login";
import { default as AccountProfile } from "./components/account/Profile";
import { default as AccountOrders } from "./components/account/Orders";
import { default as AccountWishlist } from "./components/account/Wishlist";
import AccountAddress from "./components/account/ShippingAddress";
import AccountChangePassword from "./components/account/ChangePassword";

function App() {
  return (
    <AdminAuthProvider>
      <AccountAuthProvider>
        <BrowserRouter>
          <Routes>
            {/* =========================================================================
                🌐 PUBLIC CONSUMER FRONTEND ROUTES
               ========================================================================= */}
            <Route path="/" element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="product/:id" element={<Products />} />
            <Route path="cart" element={<Cart />} />            

            {/* THE GUEST INTERCEPTOR GROUP: Blocks authenticated users from re-login */}
            <Route element={<GuestRequireAuth />}>
              <Route path="account/register" element={<AccountRegister />} />
              <Route path="account/login" element={<AccountLogin />} />
            </Route>

            {/* Admin Authentication Entryway */}
            <Route path="admin/login" element={<Login />} />

            {/* =========================================================================
                🛍️ NESTED CUSTOMER CORE ROUTE PROTECTION (Account/Shopper Domain)
               ========================================================================= */}
            <Route element={<AccountRequireAuth />}>
              {/* Secures checkout screens so only authorized accounts can commit orders */}
              <Route path="checkout" element={<Checkout />} />
              <Route path="order/confirmation/:id" element={<Confirmation />} />

              {/* Account Sub-Resource Group */}
              <Route path="account/profile" element={<AccountProfile />} />
              <Route path="account/orders" element={<AccountOrders />} />
              <Route path="account/wishlist" element={<AccountWishlist />} />
              <Route
                path="account/shipping-address"
                element={<AccountAddress />}
              />
              <Route
                path="account/change-password"
                element={<AccountChangePassword />}
              />

              {/* THE REDIRECT FIX: Catches blank /account or /account/ or typo /account/dashboard links and routes them to profile */}
              <Route
                path="account"
                element={<Navigate to="/account/profile" replace />}
              />
              <Route
                path="account/"
                element={<Navigate to="/account/profile" replace />}
              />
              <Route
                path="account/dashboard"
                element={<Navigate to="/account/profile" replace />}
              />
            </Route>

            {/* =========================================================================
                🔒 NESTED ADMIN CORE ROUTE PROTECTION (Management Panel Domain)
               ========================================================================= */}
            <Route element={<AdminRequireAuth />}>
              <Route path="admin/dashboard" element={<Dashboard />} />

              {/* Category Sub-Resource Group */}
              <Route path="admin/categories" element={<ShowCategories />} />
              <Route
                path="admin/categories/create"
                element={<CreateCategory />}
              />
              <Route
                path="admin/categories/edit/:id"
                element={<EditCategory />}
              />

              {/* Brand Sub-Resource Group */}
              <Route path="admin/brands" element={<ShowBrands />} />
              <Route path="admin/brands/create" element={<CreateBrands />} />
              <Route path="admin/brands/edit/:id" element={<EditBrands />} />

              {/* Product Management Sub-Resource Group */}
              <Route path="admin/products" element={<ShowProducts />} />
              <Route
                path="admin/products/create"
                element={<CreateProducts />}
              />
              <Route
                path="admin/products/edit/:id"
                element={<EditProducts />}
              />

              {/* Profile Sub-Resource Group */}
              <Route path="admin/profile" element={<Profile />} />
              <Route
                path="admin/change-password"
                element={<ChangePassword />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          theme="colored"
        />
      </AccountAuthProvider>
    </AdminAuthProvider>
  );
}

export default App;
