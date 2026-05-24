import React, { useState, useEffect, useContext, useCallback } from "react";
import Layout from "./../common/Layout";
import AccountSidebar from "./common/AccountSidebar";
import { Link } from "react-router-dom";
import { Spinner, Card, Button, Row, Col } from "react-bootstrap";
import { Heart, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";
import { CartContext } from "../context/Cart"; // Hooks directly into your optimized cart array loop
import { getCustomerWishlistService, removeWishlistItemService } from "../../services/WishlistServices";
import DefaultProductImg from "../../assets/images/Mens/five.jpg";

const Wishlist = () => {
  const { addToCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlistData = useCallback(async () => {
    setLoading(true);
    try {
      const rawUserInfo = localStorage.getItem("userInfo");
      const token = rawUserInfo ? JSON.parse(rawUserInfo)?.token : null;

      if (token) {
        const res = await getCustomerWishlistService(token);
        setWishlist(res?.data?.data || res?.data || []);
      } else {
        // Fallback placeholder array dataset for offline playground testing sandbox runs
        setWishlist([
          { id: 201, title: "Premium Casual Denim Jacket", price: "79.99", compare_price: "110.00", image_url: "" },
          { id: 202, title: "Slim-Fit Core Breathable Chinos", price: "45.00", compare_price: null, image_url: "" },
          { id: 203, title: "Vintage Leather Oxford Shoes", price: "120.00", compare_price: "160.00", image_url: "" }
        ]);
      }
    } catch (error) {
      console.error("Failed to sync client storefront wishlist lines:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = setTimeout(() => {
      fetchWishlistData();
    }, 0);
    return () => clearTimeout(token);
  }, [fetchWishlistData]);

  // Handle single entity erasure commands
  const handleRemoveItem = async (productId) => {
    const rawUserInfo = localStorage.getItem("userInfo");
    const token = rawUserInfo ? JSON.parse(rawUserInfo)?.token : null;

    // Optimistic local fallback mutation cleanup
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
    toast.info("Item removed from your wishlist.");

    if (token) {
      try {
        await removeWishlistItemService(productId, token);
      } catch (error) {
        console.error("Failed to sync backend delete validation parameters:", error);
      }
    }
  };

  // Dual-Action pipeline: Move item to cart and remove from wishlist simultaneously
  const handleMoveToCart = (product) => {
    if (addToCart) {
      addToCart(product, null); // Adds item line cleanly using default sizes parameters
      toast.success(`${product.title} shifted to your Shopping Cart!`);
      handleRemoveItem(product.id);
    }
  };

  return (
    <Layout>
      <div className="container py-4">
        {/* Navigation Breadcrumb Module */}
        <nav aria-label="breadcrumb" className="mt-4 mb-3">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/account/profile">Dashboard</Link></li>
            <li className="breadcrumb-item active" aria-current="page">My Wishlist</li>
          </ol>
        </nav>

        <div className="row g-4">
          {/* Left Column: Reusable Customer Menu Panel */}
          <div className="col-md-3 col-lg-3 mb-4">
            <AccountSidebar />
          </div>

          {/* Right Column: Dynamic Wishlist Item Grid */}
          <div className="col-md-9 col-lg-9">
            <div className="d-flex align-items-center gap-2 mb-4">
              <Heart size={20} className="text-danger fill-danger" />
              <h4 className="fw-bold mb-0 text-dark">My Saved Wishlist</h4>
              <span className="badge bg-light text-dark border fw-semibold small rounded-pill px-2.5">
                {wishlist.length} Items
              </span>
            </div>

            {loading ? (
              <div className="d-flex justify-content-center align-items-center py-5">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : wishlist.length === 0 ? (
              <Card className="border-0 shadow-sm text-center py-5 rounded-3">
                <Card.Body>
                  <p className="text-muted fs-6 mb-3">Your wishlist repository is completely empty.</p>
                  <Link to="/shop" className="btn btn-sm btn-primary px-4 fw-semibold d-inline-flex align-items-center gap-1.5">
                    Browse Store Catalog <ArrowRight size={14} />
                  </Link>
                </Card.Body>
              </Card>
            ) : (
              <Row className="g-4">
                {wishlist.map((product) => {
                  const displayImage = product.image_url || product.image || DefaultProductImg;
                  return (
                    <Col key={`wish-item-${product.id}`} sm={6} md={4}>
                      <Card className="wishlist-item-card shadow-sm h-100 d-flex flex-column justify-content-between">
                        
                        {/* Image Showcase & Floating Actions Layer */}
                        <div className="wishlist-img-container overflow-hidden d-flex justify-content-center align-items-center">
                          <Link to={`/product/${product.id}`} className="w-100 h-100">
                            <img 
                              src={displayImage} 
                              alt={product.title} 
                              className="w-100 h-100 object-fit-cover"
                              onError={(e) => { e.target.src = DefaultProductImg; }}
                            />
                          </Link>
                          
                          {/* Quick Eraser Floating Action Tag Trigger */}
                          <div className="wishlist-img-overlay">
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(product.id)}
                              className="btn btn-white bg-white rounded-circle shadow-sm p-2 d-flex align-items-center justify-content-center text-danger border border-light"
                              title="Delete Item"
                              style={{ width: "36px", height: "36px" }}
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>

                        {/* Metadata Details Deck Card Body */}
                        <Card.Body className="p-3 d-flex flex-column justify-content-between flex-grow-1">
                          <div className="mb-2">
                            <Link 
                              to={`/product/${product.id}`} 
                              className="text-dark fw-semibold text-decoration-none h6 d-block text-truncate mb-1"
                            >
                              {product.title}
                            </Link>
                            
                            <div className="d-flex align-items-center gap-2 mt-1">
                              <span className="text-dark fw-bold">${parseFloat(product.price).toFixed(2)}</span>
                              {product.compare_price && parseFloat(product.compare_price) > parseFloat(product.price) && (
                                <span className="text-muted text-decoration-line-through small">
                                  ${parseFloat(product.compare_price).toFixed(2)}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Quick Deployment Operational Context Action Button line */}
                          <div className="pt-2 mt-auto">
                            <Button
                              type="button"
                              variant="outline-secondary"
                              size="sm"
                              className="w-100 border border-secondary border-opacity-25 py-2 fw-semibold rounded-3 d-flex align-items-center justify-content-center gap-1.5 text-secondary"
                              onClick={() => handleMoveToCart(product)}
                              style={{ transition: "0.2s" }}
                              onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.backgroundColor = "#43c3d1"; e.currentTarget.style.borderColor = "#43c3d1"; }}
                              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(6, 17, 35, 0.7)"; e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.borderColor = "rgba(6, 17, 35, 0.25)"; }}
                            >
                              <ShoppingBag size={14} /> <span>Move to Cart</span>
                            </Button>
                          </div>
                        </Card.Body>

                      </Card>
                    </Col>
                  );
                })}
              </Row>
            )}
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Wishlist;
