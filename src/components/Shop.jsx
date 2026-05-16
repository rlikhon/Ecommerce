import React, { useState, useMemo } from "react"; // ✅ Added useMemo
import Layout from "./common/Layout";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { useCategories } from "../hooks/useCategories";
import { useBrands } from "../hooks/useBrands";
import { useProducts } from "../hooks/useProducts";
import { useSearchParams } from "react-router-dom"; // ✅ FIX: Bring this hook into scope

const Shop = () => {
  // ✅ FIX: Replace standard useState hooks with URL parameter engine synchronization
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. Read values from URL on load/refresh (Parse safely)
  const selectedCategoryIds = useMemo(() => {
    const param = searchParams.get("categories");
    return param ? param.split(",").map(Number) : [];
  }, [searchParams]);

  const selectedBrandIds = useMemo(() => {
    const param = searchParams.get("brands");
    return param ? param.split(",").map(Number) : [];
  }, [searchParams]);

  const sortBy = searchParams.get("sort") || "";

  // 2. Format comma-separated parameters dynamically for your useProducts hook
  const categoriesParam = searchParams.get("categories"); // Already string or null
  const brandsParam = searchParams.get("brands");         // Already string or null

  // Pass strings directly into your untouched useProducts hook setup
  const { products, loading } = useProducts(categoriesParam, brandsParam);

  // Fetch structural items
  const { categories, categoryLoading } = useCategories();
  const { brands, brandLoading } = useBrands();

  // 3. Helper utility to update URL parameters easily
  const updateUrlParams = (key, value) => {
    setSearchParams((prev) => {
      if (value && value.length > 0) {
        prev.set(key, value);
      } else {
        prev.delete(key);
      }
      return prev;
    }, { replace: true }); // 'replace' prevents bloating the back-button stack
  };

  // Handle category checkbox changes
  const handleCategoryChange = (event) => {
    const { checked, value } = event.target;
    const categoryId = parseInt(value, 10);
    
    let updatedIds = [...selectedCategoryIds];
    if (checked) {
      updatedIds.push(categoryId);
    } else {
      updatedIds = updatedIds.filter((id) => id !== categoryId);
    }
    
    updateUrlParams("categories", updatedIds.join(","));
  };

  // Handle brand checkbox changes
  const handleBrandChange = (event) => {
    const { checked, value } = event.target;
    const brandId = parseInt(value, 10);
    
    let updatedIds = [...selectedBrandIds];
    if (checked) {
      updatedIds.push(brandId);
    } else {
      updatedIds = updatedIds.filter((id) => id !== brandId);
    }
    
    updateUrlParams("brands", updatedIds.join(","));
  };

  const handleSortChange = (event) => {
    updateUrlParams("sort", event.target.value);
  };

  // Client Side In-Memory runtime sorting calculation cache
  const sortedProducts = useMemo(() => {
    if (!products) return [];
    const productsCopy = [...products];
    switch (sortBy) {
      case "price_low":
        return productsCopy.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      case "price_high":
        return productsCopy.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      case "newest":
        return productsCopy.sort((a, b) => b.id - a.id);
      case "oldest":
        return productsCopy.sort((a, b) => a.id - b.id);
      default:
        return productsCopy;
    }
  }, [products, sortBy]);


  return (
    <Layout>
      <div className="container">
        {/* Breadcrumbs */}
        <nav aria-label="breadcrumb" className="py-3">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Shop</li>
          </ol>
        </nav>

        <div className="row">
          {/* Filters Sidebar */}
          <div className="col-md-3">
            {/* Categories */}
            <div className="card border-0 shadow-sm mb-3 rounded">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3 text-dark border-bottom pb-2">Categories</h5>
                <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
                  {categoryLoading ? (
                    <div className="py-2 text-muted small"><Spinner animation="border" size="sm" className="me-2" />Loading...</div>
                  ) : (
                    categories?.map((category) => (
                      <li key={`shop-cat-${category.id}`} className="d-flex align-items-center">
                        <input 
                          type="checkbox" 
                          className="form-check-input cursor-pointer"
                          id={`cat-check-${category.id}`}
                          name="category_id" 
                          value={category.id} 
                          onChange={handleCategoryChange}
                          // ✅ CHECK BOX RETENTION PERSISTENCE: Evaluates URL data match state on reload
                          checked={selectedCategoryIds.includes(category.id)}
                        />
                        <label htmlFor={`cat-check-${category.id}`} className="ps-2 form-check-label cursor-pointer small text-secondary">
                          {category.name}
                        </label>
                      </li>
                    ))
                  )}                  
                </ul>
              </div>
            </div>

            {/* Brands */}
            <div className="card border-0 shadow-sm mb-3 rounded">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3 text-dark border-bottom pb-2">Brands</h5>
                <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
                  {brandLoading ? (
                    <div className="py-2 text-muted small"><Spinner animation="border" size="sm" className="me-2" />Loading...</div>
                  ) : (
                    brands?.map((brand) => (
                      <li key={`shop-brand-${brand.id}`} className="d-flex align-items-center">
                        <input 
                          type="checkbox" 
                          className="form-check-input cursor-pointer"
                          id={`brand-check-${brand.id}`}
                          name="brand_id" 
                          value={brand.id} 
                          onChange={handleBrandChange}
                          // ✅ CHECK BOX RETENTION PERSISTENCE: Evaluates URL data match state on reload
                          checked={selectedBrandIds.includes(brand.id)}
                        />
                        <label htmlFor={`brand-check-${brand.id}`} className="ps-2 form-check-label cursor-pointer small text-secondary">
                          {brand.name}
                        </label>
                      </li>
                    ))
                  )}                  
                </ul>
              </div>
            </div>
          </div>

          {/* Product Grid Container Area */}
          <div className="col-md-9">
            <div className="filter-options mb-3 d-flex justify-content-end">
              <select 
                name="sort" 
                id="sort" 
                className="form-select" 
                style={{ width: "200px" }}
                value={sortBy} // ✅ DROPDOWN RETENTION PERSISTENCE
                onChange={handleSortChange}
              >
                <option value="">Sort By</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>

            {/* Grid Elements Logic */}
            <div className="row pb-5 g-4">
              {loading ? (
                <div className="d-flex justify-content-center align-items-center py-5 w-100">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : sortedProducts.length === 0 ? (
                <div className="text-center py-5 text-muted w-100">
                  <p className="mb-0">No products match the selected filter parameters.</p>
                </div>
              ) : (
                sortedProducts.map((product) => {
                  const displayImage = product.image_url || product.image || DefaultProductImg;
                  return (
                    <div className="col-md-3 col-sm-6 col-6 mb-3" key={`shop-prod-${product.id}`}>
                      <div className="product card border-0 h-100 shadow-sm rounded">
                        <div className="card-img position-relative overflow-hidden rounded-top">
                          <Link to={`/product/${product.id}`}>
                            <img src={displayImage} alt={product.title} className="w-100 object-fit-cover" style={{ height: "240px" }} />
                          </Link>
                        </div>
                        <div className="card-body pt-3 px-3 pb-3 d-flex flex-column justify-content-between">
                          <div className="product-title mb-2">
                            <Link to={`/product/${product.id}`} className="text-dark fw-semibold text-decoration-none h6 d-block text-truncate">{product.title}</Link>
                          </div>                   
                          <div className="product-price mt-auto">
                            <span className="price text-dark fw-bold">${parseFloat(product.price).toFixed(2)}</span>
                            {product.compare_price && parseFloat(product.compare_price) > parseFloat(product.price) && (
                              <span className="price text-muted text-decoration-line-through ms-2 small">${parseFloat(product.compare_price).toFixed(2)}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Shop;
