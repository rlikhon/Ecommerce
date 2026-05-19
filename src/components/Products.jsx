import React, { useEffect, useState, useCallback, useRef } from "react";
import Layout from "./common/Layout";
import { Link, useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { Spinner, Tab, Tabs } from "react-bootstrap";
import { getProductDetailsService } from "../services/HomeServices";

import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import DefaultProductImg from "../assets/images/Mens/five.jpg";

import WishListButton from "./buttons/WishListButton";
import AddToCartButton from "./buttons/AddToCartButton";

const Products = () => {
  const { id } = useParams();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [rating] = useState(4.5);
  const [productImages, setProductImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  // 1. Setup refs if you ever need direct DOM control (like moving focus)
  const addToCartRef = useRef(null);
  const wishlistRef = useRef(null);

  const fetchProductDetails = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getProductDetailsService(id);
      const productsData = res?.data?.data || res?.data || null;

      if (productsData) {
        setProduct(productsData);

        const imagesList = productsData.product_images || [];
        if (
          imagesList.length === 0 &&
          (productsData.image || productsData.image_url)
        ) {
          imagesList.push({
            id: "cover",
            image_url: productsData.image_url || productsData.image,
          });
        }
        setProductImages(imagesList);
      }
    } catch (error) {
      console.error("Failed to fetch product details:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    const token = setTimeout(() => {
      if (id) fetchProductDetails();
    }, 0);
    return () => clearTimeout(token);
  }, [id, fetchProductDetails]);

  if (loading) {
    return (
      <Layout>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "70vh" }}
        >
          <Spinner animation="border" variant="primary" />
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container text-center py-5">
          <h4 className="text-muted">Product could not be found.</h4>
          <Link to="/shop" className="btn btn-primary mt-3">
            Return to Shop
          </Link>
        </div>
      </Layout>
    );
  }

  // 3. Callback tracking handlers
  const handleCartSuccess = (productId) => {
    console.log(
      `Product ${productId} successfully added to global basket state.`,
    );
    // Trigger your global cart context notifications or navbar bubble increments here
  };

  const handleWishlistChange = (productId, isSaved) => {
    console.log(`Product ${productId} wishlist state changed to: ${isSaved}`);
    // Sync with your persistent LocalStorage or user accounts dashboard DB here
  };

  const handleActionError = (error) => {
    alert(`Action failed: ${error.message}. Please try again.`);
  };

  return (
    <Layout>
      <div className="container product-detail py-4">
        <div className="row">
          <div className="col-md-12">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/shop">Shop</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {product.title}
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="row mb-5">
          <div className="col-md-5">
            <div className="row g-2">
              {/* Left Side Thumbnail Carousel */}
              <div className="col-2">
                {productImages.length > 0 && (
                  <Swiper
                    onSwiper={setThumbsSwiper}
                    loop={false}
                    direction="vertical"
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper"
                    style={{ height: "350px" }}
                  >
                    {productImages.map((img, idx) => (
                      <SwiperSlide key={`thumb-slide-${img.id || idx}`}>
                        <div className="content border rounded overflow-hidden p-1 bg-white cursor-pointer h-100">
                          <img
                            src={
                              img.image_url || img.image || DefaultProductImg
                            }
                            alt=""
                            className="w-100 h-100 object-fit-cover"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>

              {/* Main Core View Showcase Slider */}
              <div className="col-10">
                <Swiper
                  style={{
                    "--swiper-navigation-color": "#43c3d1",
                    "--swiper-pagination-color": "#43c3d1",
                  }}
                  loop={productImages.length > 1}
                  spaceBetween={10}
                  navigation={true}
                  thumbs={{
                    swiper:
                      thumbsSwiper && !thumbsSwiper.destroyed
                        ? thumbsSwiper
                        : null,
                  }}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper2 border rounded bg-light"
                >
                  {productImages.map((img, idx) => (
                    <SwiperSlide key={`main-slide-${img.id || idx}`}>
                      <div
                        className="content d-flex justify-content-center align-items-center"
                        style={{ height: "400px" }}
                      >
                        <img
                          src={img.image_url || img.image || DefaultProductImg}
                          alt={product.title}
                          className="w-100 h-100 object-fit-contain"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>

          {/* Right Side Info Parameters */}
          <div className="col-md-7">
            <h2 className="fw-bold text-dark">{product.title}</h2>
            <div className="d-flex flex-row align-items-center mb-3">
              <Rating readonly initialValue={rating} size={18} />
              <span className="ps-2 text-muted small">4.5 (23 reviews)</span>
            </div>

            <div className="price pb-3 border-bottom mb-3">
              <span className="text-dark fw-bold h3">
                ${parseFloat(product.price).toFixed(2)}
              </span>
              {product.compare_price &&
                parseFloat(product.compare_price) >
                  parseFloat(product.price) && (
                  <span className="text-muted text-decoration-line-through ms-2 fs-5">
                    ${parseFloat(product.compare_price).toFixed(2)}
                  </span>
                )}
            </div>

            <p className="text-secondary mb-4">
              {product.short_description || "No summary description available."}
            </p>

            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-3">
                <strong className="d-block mb-2 text-dark">Select Size:</strong>
                <div className="d-flex gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={`size-btn-${size.id}`}
                      className="btn btn-size active"
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 pt-3 border-top small text-muted">
              <p className="mb-1">
                SKU Barcode:{" "}
                <span className="text-dark fw-semibold">
                  {product.sku || "N/A"}
                </span>
              </p>
              <p className="mb-1">
                Availability:
                <span
                  className={`ms-1 fw-bold ${product.qty > 0 ? "text-success" : "text-danger"}`}
                >
                  {product.qty > 0
                    ? `In Stock (${product.qty} units)`
                    : "Out of Stock"}
                </span>
              </p>
            </div>

            <div className="add-to-cart my-4">
              <button
                className="btn btn-primary btn-lg rounded px-5 py-2.5 fw-semibold shadow-sm"
                disabled={product.qty <= 0}
              >
                {product.qty > 0 ? "Add to Shopping Cart" : "Out of Stock"}
              </button>

              <button className="btn btn-secondary fw-semibold ms-3 btn-lg">
                <i className="bi bi-heart me-2"></i>Add to Wishlist
              </button>
            </div>
            <div className="add-to-cart my-4">
              <AddToCartButton
                ref={addToCartRef}
                productId={product.id}
                onSuccess={handleCartSuccess}
                onError={handleActionError}
                className="product-actions__primary"
              />

              <WishListButton
                ref={wishlistRef}
                productId={product.id}
                initialIsWishlisted={product.isInitiallyWishlisted}
                onStatusChange={handleWishlistChange}
                onError={handleActionError}
                className="product-actions__secondary"
              />
            </div>
          </div>
        </div>

        {/* Tab System Framework (Description & Reviews) */}
        <div className="row mt-5">
          <div className="col-12">
            <Tabs
              defaultActiveKey="description"
              id="product-info-tabs"
              className="nav-tabs"
            >
              {/* Tab 1: Description Panel */}
              <Tab eventKey="description" title="Description">
                <div className="p-4 border border-top-0 rounded-bottom bg-white">
                  {product.description ? (
                    <div
                      className="text-muted product-rich-content"
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                  ) : (
                    <p className="text-muted mb-0">
                      No technical information mapped for this item lines.
                    </p>
                  )}
                </div>
              </Tab>

              {/* Tab 2: Reviews Panel */}
              <Tab eventKey="reviews" title="Reviews (23)">
                <div className="p-4 border border-top-0 rounded-bottom bg-white">
                  <div className="mb-4 d-flex align-items-center gap-2">
                    <h5 className="fw-bold text-dark mb-0">
                      Customer Feedback
                    </h5>
                    <Rating readonly initialValue={4.5} size={16} />
                  </div>
                  <p className="text-muted small">
                    Review configuration models can be dynamic loaded from your
                    database ledger context here.
                  </p>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
