import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { featuredProductsService } from "../../services/HomeServices";
import DefaultProductImg from "../../assets/images/Mens/eleven.jpg";

const FeaturedProducts = () => {
  const [loading, setLoading] = useState(true);  
  const [featuredProducts, setFeaturedProducts] = useState([]);

  const fetchFeaturedProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await featuredProductsService();
      
      // Handle the nested data payload structure safely
      const productsData = res?.data?.data || res?.data || [];
      setFeaturedProducts(productsData);
    } catch (error) {
      console.error("Failed to fetch featured products:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // ✅ Breaks potential synchronous state call cascades to safeguard React 19 lifecycles
    const token = setTimeout(() => {
      fetchFeaturedProducts();
    }, 0);

    return () => clearTimeout(token);
  }, [fetchFeaturedProducts]);

  return (
    <section className="section-2 py-5">
      <div className="container">
        <div className="text-left mb-4">
          <h2 className="fw-bold text-dark">Featured Products</h2>
        </div>

        {/* Dynamic State Interface Handler Layer */}
        {loading ? (
          <div className="d-flex justify-content-center align-items-center py-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : featuredProducts.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <p className="mb-0">No featured products cataloged right now.</p>
          </div>
        ) : (
          <div className="row mt-4 g-4">
            {/* ✅ Map dynamic items fetched directly from your Laravel database context */}
            {featuredProducts.map((product) => {
              const displayImage = product.image_url || product.image || DefaultProductImg;
              
              return (
                <div key={`featured-prod-${product.id}`} className="col-md-3 col-sm-6 col-6">
                  <div className="product card border-0 h-100 shadow-sm rounded">
                    <div className="card-img position-relative overflow-hidden rounded-top">
                      <img 
                        src={displayImage} 
                        alt={product.title} 
                        className="w-100 object-fit-cover"
                        style={{ height: "280px" }}
                        onError={(e) => { e.target.src = DefaultProductImg; }}
                      />
                    </div>
                    <div className="card-body pt-3 px-3 pb-3 d-flex flex-column justify-content-between">
                      <div className="product-title mb-2">
                        <Link to={`/product/${product.id}`} className="text-dark fw-semibold text-decoration-none h6 d-block text-truncate">
                          {product.title}
                        </Link>
                      </div>
                      <div className="product-price mt-auto">
                        <span className="price text-dark fw-bold">${parseFloat(product.price).toFixed(2)}</span>
                        {product.compare_price && parseFloat(product.compare_price) > parseFloat(product.price) && (
                          <span className="price text-muted text-decoration-line-through ms-2 small">
                            ${parseFloat(product.compare_price).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
