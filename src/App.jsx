import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Route Guard component
import { AdminRequireAuth } from "./components/admin/AdminRequireAuth";
import { AdminAuthProvider } from "./components/context/AdminAuth";

import Home from "./components/Home";
import Shop from "./components/Shop";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
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

function App() {
  return (
    <AdminAuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Consumer Frontend Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* Admin Authentication Entryway */}
          <Route path="/admin/login" element={<Login />} />

          {/* ✅ THE SUPER-LEVEL ARCHITECTURE: Nested Admin Core Route Protection */}
          <Route element={<AdminRequireAuth />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            
            {/* Category Sub-Resource Group */}
            <Route path="/admin/categories" element={<ShowCategories />} />
            <Route path="/admin/categories/create" element={<CreateCategory />} />
            <Route path="/admin/categories/edit/:id" element={<EditCategory />} />

            {/* Brand Sub-Resource Group */}
            <Route path="/admin/brands" element={<ShowBrands />} />
            <Route path="/admin/brands/create" element={<CreateBrands />} />
            <Route path="/admin/brands/edit/:id" element={<EditBrands />} />

            {/* Product Management Sub-Resource Group */}
            <Route path="/admin/products" element={<ShowProducts />} />
            <Route path="/admin/products/create" element={<CreateProducts />} />
            <Route path="/admin/products/edit/:id" element={<EditProducts />} />
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
    </AdminAuthProvider>
  );
}

export default App;
