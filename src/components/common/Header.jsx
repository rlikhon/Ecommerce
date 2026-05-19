import React, { useState, useEffect, useContext } from "react";
import { Nav, Navbar, Spinner } from "react-bootstrap";
// ✅ THE FIX: Standardized on semantic Link for structural isolation control
import { Link, useLocation } from "react-router-dom";
import { User, ShoppingBag, Flame, LayoutDashboard } from "lucide-react";
import { AdminAuthContext } from "../context/AdminAuth";
import { useCategories } from "../../hooks/useCategories";
import Logo from "../../assets/images/logo.png";

const Header = () => {
  const { user } = useContext(AdminAuthContext);
  const location = useLocation(); 
  
  // Real-time asynchronous countdown timer state
  const [timeLeft, setTimeLeft] = useState({ hours: 3, minutes: 24, seconds: 45 });

  useEffect(() => {
    const clockEngine = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        clearInterval(clockEngine);
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(clockEngine);
  }, []);

  const formatSegment = (num) => String(num).padStart(2, "0");

  const { categories, categoryLoading } = useCategories();

  // Create an explicit URL parameter lookup query reference context block
  const currentQueryParams = new URLSearchParams(location.search);
  const activeCategoryQuery = currentQueryParams.get("categories");

  return (
    <header className="shadow-sm">
      {/* ⚡ High-Density Interactive Announcement Offer Ribbon */}
      <div className="offer-ticker-bar py-2">
        <div className="container">
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2">
            <div className="d-flex align-items-center gap-2">
              <span className="live-dot"></span>
              <Flame size={14} className="text-warning" />
              <span>
                <strong>EXCLUSIVE PARTNER OFFER:</strong> Use code <strong>FASHION25</strong> for 25% off storewide!
              </span>
            </div>
            <div className="d-flex align-items-center gap-2 small">
              <span className="text-white-50">Offer Expires In:</span>
              <span className="ticker-clock">
                {formatSegment(timeLeft.hours)}h : {formatSegment(timeLeft.minutes)}m : {formatSegment(timeLeft.seconds)}s
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Core Application Navigation Bar */}
      <div className="container">
        <Navbar expand="lg" className="bg-white border-0">
          <Navbar.Brand as={Link} to="/" className="p-0">
            <img src={Logo} alt="E-Commerce Platform Logo" width="170px" />
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="navbarScroll" className="border-0 shadow-none" />
          
          <Navbar.Collapse id="navbarScroll">
            {/* ✅ THE FIX: Standardized nav wrapper using structural links to stop dual-selection leaks */}
            <div className="navbar-nav ms-auto my-2 my-lg-0 gap-1">
              
              {/* Home Link */}
              <Link 
                key="home" 
                to="/" 
                className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
              >
                Home
              </Link>
              
              {/* Main Shop Link: STRICT evaluation constraint rule */}
              <Link 
                key="shop" 
                to="/shop"
                className={`nav-link ${location.pathname === "/shop" && !activeCategoryQuery ? "active" : ""}`}
              >
                Shop
              </Link>

              {/* Dynamic Category List Links */}
              {categoryLoading ? (
                <div className="py-2 text-muted small d-flex align-items-center">
                  <Spinner animation="border" size="sm" className="me-2" />Loading...
                </div>
              ) : (
                categories?.map((category) => {
                  // Strict category ID tracking check
                  const isCurrentCategoryActive = location.pathname === "/shop" && activeCategoryQuery === String(category.id);

                  return (
                    <Link 
                      key={`shop-cat-${category.id}`} 
                      to={`/shop?categories=${category.id}`}
                      className={`nav-link ${isCurrentCategoryActive ? "active" : ""}`}
                    >
                      {category.name}
                    </Link>
                  );
                })
              )}
            </div>

            {/* Right-Aligned Navigation Console Tray Actions */}
            <div className="nav-right d-flex align-items-center gap-2 ms-lg-3 mt-3 mt-lg-0">
              {user ? (
                <Link 
                  to="/admin/dashboard" 
                  className="btn btn-outline-dark btn-sm d-flex align-items-center gap-1.5 px-3 py-1.5 rounded-pill fw-semibold me-2"
                >
                  <LayoutDashboard size={16} />
                  <span>Admin Hub</span>
                </Link>
              ) : (
                <Link to="/admin/login" className="header-icon-trigger" aria-label="Account Login Profile">
                  <User size={22} />
                </Link>
              )}

              <Link to="/cart" className="header-icon-trigger" aria-label="View Shopping Cart Layout">
                <ShoppingBag size={22} />
              </Link>
            </div>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  );
};

export default Header;
