import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { latestProductsService } from "../../services/HomeServices";
import DefaultProductImg from "../../assets/images/Mens/eight.jpg";

const LatestProducts = () => {
  const [loading, setLoading] = useState(true);  
  const [latestProducts, setLatestProducts] = useState([]);

  const fetchLatestProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await latestProductsService();
      
      // ✅ Step 1: Ensure we extract the data object accurately
      const productsData = res?.data?.data || res?.data || [];
      setLatestProducts(productsData);
    } catch (error) {
      console.error("Failed to fetch latest products:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // ✅ Step 2: Push execution to the next event loop tick to eliminate synchronous cascading renders
    const token = setTimeout(() => {
      fetchLatestProducts();
    }, 0);

    return () => clearTimeout(token);
  }, [fetchLatestProducts]);

  return (
    <section className="section-2 py-5">
      <div className="container">
        <div className="text-left mb-4">
          <h2 className="fw-bold text-dark">New Arrivals</h2>
        </div>

        {/* ✅ Dynamic State Handling view template layer */}
        {loading ? (
          <div className="d-flex justify-content-center align-items-center py-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : latestProducts.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <p className="mb-0">No new arrivals found in stock right now.</p>
          </div>
        ) : (
          <div className="row mt-4 g-4">
            {/* ✅ Step 3: Map real products fetched dynamically from your Laravel backend API */}
            {latestProducts.map((product) => {
              // Extract the image fallback path dynamically
              const displayImage = product.image_url || product.image || DefaultProductImg;
              
              return (
                <div key={`latest-prod-${product.id}`} className="col-md-3 col-sm-6 col-6">
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
                        {product.compare_price && parseFloat(product.compare_price) > parseFloat(product.price) ? (
                          <span className="price text-muted text-decoration-line-through ms-2 small">
                            ${parseFloat(product.compare_price).toFixed(2)}
                          </span>
                        ) : null}
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

export default LatestProducts;
