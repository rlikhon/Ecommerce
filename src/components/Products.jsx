import React, { useState } from "react";
import Layout from "./common/Layout";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import ProductImgOne from "../assets/images/Mens/five.jpg";
import ProductImgTwo from "../assets/images/Mens/ten.jpg";
import ProductImgThree from "../assets/images/Mens/three.jpg";
import ProductImgFour from "../assets/images/Mens/ten.jpg";
import ProductImgFive from "../assets/images/Mens/nine.jpg";

const Products = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [rating, setRating] = useState(4);
  return (
    <Layout>
      <div className="container product-detail">
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
                  Duppy Product Title
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-md-5">
            <div className="row">
              <div className="col-2">
                <Swiper
                  style={{
                    "--swiper-navigation-color": "#000",
                    "--swiper-pagination-color": "#000",
                  }}
                  onSwiper={setThumbsSwiper}
                  loop={true}
                  direction={`vertical`}
                  spaceBetween={10}
                  slidesPerView={6}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper mt-2"
                >
                  <SwiperSlide>
                    <div className="content">
                      <img
                        src={ProductImgOne}
                        alt=""
                        height={100}
                        className="w-100"
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="content">
                      <img
                        src={ProductImgTwo}
                        alt=""
                        height={100}
                        className="w-100"
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="content">
                      <img
                        src={ProductImgThree}
                        alt=""
                        height={100}
                        className="w-100"
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="content">
                      <img
                        src={ProductImgFour}
                        alt=""
                        height={100}
                        className="w-100"
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="content">
                      <img
                        src={ProductImgFive}
                        alt=""
                        height={100}
                        className="w-100"
                      />
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
              <div className="col-10">
                <Swiper
                  style={{
                    "--swiper-navigation-color": "#000",
                    "--swiper-pagination-color": "#000",
                  }}
                  loop={true}
                  spaceBetween={0}
                  navigation={true}
                  thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper2"
                >
                  <SwiperSlide>
                    <div className="content">
                      <img src={ProductImgOne} alt="One" className="w-100" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="content">
                      <img src={ProductImgTwo} alt="Two" className="w-100" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="content">
                      <img
                        src={ProductImgThree}
                        alt="Three"
                        className="w-100"
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="content">
                      <img src={ProductImgFour} alt="Four" className="w-100" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="content">
                      <img src={ProductImgFive} alt="Five" className="w-100" />
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <h2>Duppy Product Title</h2>
            <div className="d-flex flex-row align-items-center">
              <Rating readonly initialValue={rating} size={20} />
              <span className="pt-1 ps-2 text-muted">4.5 (23 reviews)</span>
            </div>
            <div className="price h3 py-3">
              $30
              <span className="text-decoration-line-through ms-3">$50</span>
            </div>
            <div>
              100% original product <br />
              Pay on delivery might beavailable <br />
              Easy 15 days return and exchange
            </div>
            <div className="mt-2">
              <strong className="pt-3">Select Size</strong>
              <div className="sizes mt-2">
                <button className="btn btn-size">S</button>
                <button className="btn btn-size ms-1">M</button>
                <button className="btn btn-size ms-1">L</button>
                <button className="btn btn-size ms-1">XL</button>
              </div>
              <div className="add-to-cart my-4">
                <button className="btn btn-primary text-uppercase">
                  Add to Cart
                </button>
                <button className="btn btn-secondary text-uppercase ms-3">
                  Add to Wishlist
                </button>
              </div>
              <hr />
              <div>
                <strong>SKU</strong>
                DDX2234
              </div>
            </div>
          </div>
        </div>
        <div className="row pb-5">
          <div className="col-md-12">
            <Tabs
              defaultActiveKey="profile"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="home" title="Description">
                Tab content for Description
              </Tab>
              <Tab eventKey="profile" title="Reviews(10)">
                Review area
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
