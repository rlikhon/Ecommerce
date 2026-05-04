import React from "react";
import Layout from "./common/Layout";
import ProductImg8 from "../assets/images/Mens/eight.jpg";
import { Link } from "react-router-dom";

const Shop = () => {
  return (
    <Layout>
      <div className="container">
        <nav aria-label="breadcrumb" className="py-3">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Product
            </li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-md-3">
            <div className="card border-0 shadow mb-3">
              <div className="card-body p-4">
                <h3 className="mb-3">Categories</h3>
                <ul>
                  <li>
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="" className="ps-2">
                      Kids
                    </label>
                  </li>
                  <li>
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="" className="ps-2">
                      Men
                    </label>
                  </li>
                  <li>
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="" className="ps-2">
                      Women
                    </label>
                  </li>
                  <li>
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="" className="ps-2">
                      Boys
                    </label>
                  </li>
                  <li>
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="" className="ps-2">
                      Girls
                    </label>
                  </li>
                </ul>
              </div>
            </div>
            <div className="card border-0 shadow mb-3">
              <div className="card-body p-4">
                <h3 className="mb-3">Brands</h3>
                <ul>
                  <li>
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="" className="ps-2">
                      NIke
                    </label>
                  </li>
                  <li>
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="" className="ps-2">
                      Adidas
                    </label>
                  </li>
                  <li>
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="" className="ps-2">
                      Puma
                    </label>
                  </li>
                  <li>
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="" className="ps-2">
                      Reebok
                    </label>
                  </li>
                  <li>
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="" className="ps-2">
                      Levis
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="filter-options mb-3">
              <select name="" id="" className="form-select">
                <option value="">Sort By</option>
                <option value="">Price: Low to High</option>
                <option value="">Price: High to Low</option>
                <option value="">Newest</option>
                <option value="">Oldest</option>
              </select>
            </div>
            <div className="row pb-5">
              <div className="col-md-3 col-sm-6 col-6">
                <div className="product card border-0">
                  <div className="card-img position-relative">
                    <Link to="/product">
                      <img src={ProductImg8} alt="" className="w-100" />
                    </Link>
                  </div>
                  <div className="card-body pt-3 px-0">
                    <div className="product-title">
                      <Link to="/product">Red Printed T-Shirt</Link>
                    </div>
                    <div className="product-price">
                      <span className="price text-dark fw-bold">$20.00</span>
                      <span className="price text-muted text-decoration-line-through ms-2">
                        $30.00
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 col-6">
                <div className="product card border-0">
                  <div className="card-img position-relative">
                    <Link to="/product">
                      <img src={ProductImg8} alt="" className="w-100" />
                    </Link>
                  </div>
                  <div className="card-body pt-3 px-0">
                    <div className="product-title">
                      <Link to="/product">Red Printed T-Shirt</Link>
                    </div>
                    <div className="product-price">
                      <span className="price text-dark fw-bold">$20.00</span>
                      <span className="price text-muted text-decoration-line-through ms-2">
                        $30.00
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 col-6">
                <div className="product card border-0">
                  <div className="card-img position-relative">
                    <Link to="/product">
                      <img src={ProductImg8} alt="" className="w-100" />
                    </Link>
                  </div>
                  <div className="card-body pt-3 px-0">
                    <div className="product-title">
                      <Link to="/product">Red Printed T-Shirt</Link>
                    </div>
                    <div className="product-price">
                      <span className="price text-dark fw-bold">$20.00</span>
                      <span className="price text-muted text-decoration-line-through ms-2">
                        $30.00
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 col-6">
                <div className="product card border-0">
                  <div className="card-img position-relative">
                    <Link to="/product">
                      <img src={ProductImg8} alt="" className="w-100" />
                    </Link>
                  </div>
                  <div className="card-body pt-3 px-0">
                    <div className="product-title">
                      <Link to="/product">Red Printed T-Shirt</Link>
                    </div>
                    <div className="product-price">
                      <span className="price text-dark fw-bold">$20.00</span>
                      <span className="price text-muted text-decoration-line-through ms-2">
                        $30.00
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
