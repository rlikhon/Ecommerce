import React, { useState, useEffect, useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { User, ShoppingBag, Flame, LayoutDashboard } from "lucide-react";
import { AdminAuthContext } from "../context/AdminAuth";
import Logo from "../../assets/images/logo.png";

const Header = () => {
  const { user } = useContext(AdminAuthContext);
  
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
          {/* Brand Identity Logo Wrap */}
          <Navbar.Brand as={Link} to="/" className="p-0">
            <img src={Logo} alt="E-Commerce Platform Logo" width="170px" />
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="navbarScroll" className="border-0 shadow-none" />
          
          <Navbar.Collapse id="navbarScroll">
            {/* Middle Aligned Navigation Links Router Integrations */}
            <Nav className="ms-auto my-2 my-lg-0 gap-1" navbarScroll>
              <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
              <Nav.Link as={NavLink} to="/shop">Shop</Nav.Link>
              <Nav.Link as={NavLink} to="/shop?gender=men">Men</Nav.Link>
              <Nav.Link as={NavLink} to="/shop?gender=women">Women</Nav.Link>
            </Nav>

            {/* Right-Aligned Navigation Console Tray Actions */}
            <div className="nav-right d-flex align-items-center gap-2 ms-lg-3 mt-3 mt-lg-0">
              
              {/* Conditional Rendering Layer mapping Auth State capsules */}
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

              {/* Shopping Bag Trigger Link */}
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
