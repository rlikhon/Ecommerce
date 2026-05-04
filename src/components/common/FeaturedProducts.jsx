import React from 'react'
import ProductImg8 from "../../assets/images/Mens/eleven.jpg";

const FeaturedProducts = () => {
  return (
    <section className="section-2 py-5">
          <div className="container">
            <div className="text-left mb-4">
              <h2>Featured Products</h2>
            </div>
            <div className="row mt-4">
              <div className="col-md-3 col-sm-6 col-6">
                <div className="product card border-0">
                  <div className="card-img position-relative">
                    <img src={ProductImg8} alt="" className="w-100" />
                  </div>
                  <div className="card-body pt-3 px-0">
                    <div className="product-title">
                      <a href="#">Red Printed T-Shirt</a>
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
                    <img src={ProductImg8} alt="" className="w-100" />
                  </div>
                  <div className="card-body pt-3 px-0">
                    <div className="product-title">
                      <a href="#">Red Printed T-Shirt</a>
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
                    <img src={ProductImg8} alt="" className="w-100" />
                  </div>
                  <div className="card-body pt-3 px-0">
                    <div className="product-title">
                      <a href="#">Red Printed T-Shirt</a>
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
                    <img src={ProductImg8} alt="" className="w-100" />
                  </div>
                  <div className="card-body pt-3 px-0">
                    <div className="product-title">
                      <a href="#">Red Printed T-Shirt</a>
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
        </section>
  )
}

export default FeaturedProducts