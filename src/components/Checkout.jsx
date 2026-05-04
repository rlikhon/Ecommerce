import React, { useState } from "react";
import Layout from "./common/Layout";
import { Link } from "react-router-dom";
import ProductImgOne from "../assets/images/Mens/five.jpg";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };


  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/cart">Cart</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Checkout
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="row">
          <div className="col-md-7">
            <h3 className="border-bottom pb-3 mb-3">
              <strong className="text-primary">Billing Details</strong>
            </h3>
            <form action="">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" className="form-control" />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="email">Address</label>
                  <textarea
                    className="form-control"
                    id="address"
                    rows={3}
                  ></textarea>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="email">City</label>
                    <input type="text" id="city" className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="state">State</label>
                    <input type="text" id="state" className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="email">Zip</label>
                    <input type="text" id="zip" className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="mobile">Mobile</label>
                    <input type="text" id="mobile" className="form-control" />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-5">
            <h3 className="border-bottom pb-3 mb-3">
              <strong className="text-primary">Order Summary</strong>
            </h3>
            <table className="table">
              <tbody>
                <tr>
                  <td width={100}>
                    <img src={ProductImgOne} alt="" width="100" />
                  </td>
                  <td>
                    <h4>Dummy Product Title</h4>
                    <div className="d-flex align-items-center">
                      <span>$10</span>
                      <div className="ps-3">
                        <button className="btn btn-size ms-1">L</button>
                      </div>
                    </div>
                    <div className="ps-3">X 1</div>
                  </td>
                </tr>
                <tr>
                  <td width={100}>
                    <img src={ProductImgOne} alt="" width="100" />
                  </td>
                  <td>
                    <h4>Dummy Product Title</h4>
                    <div className="d-flex align-items-center">
                      <span>$10</span>
                      <div className="ps-3">
                        <button className="btn btn-size ms-1">L</button>
                      </div>
                    </div>
                    <div className="ps-3">X 1</div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="row">
              <div className="col-md-12">
                <div className="d-flex justify-content-between py-2">
                  <div>Subtotal</div>
                  <div>$20</div>
                </div>
                <div className="d-flex justify-content-between py-2">
                  <div>Shipping</div>
                  <div>$20</div>
                </div>
                <div className="d-flex justify-content-between py-2">
                  <div>
                    <strong>Grand Total</strong>
                  </div>
                  <div>$40</div>
                </div>
              </div>
            </div>

            <h3 className="border-bottom pb-3 mb-3 mt-3">
              <strong className="text-primary">Payment Method</strong>
            </h3>
            <div className="d-flex align-items-center">
              <input type="radio" 
              onClick={handlePaymentMethodChange}
              checked={paymentMethod === 'stripe'}
              value="stripe"
              name="payment" id="payment" />
              <label htmlFor="payment" className="ps-2">
                Stripe
              </label>
            </div>
            <div className="d-flex align-items-center">
              <input type="radio" 
              onClick={handlePaymentMethodChange}
              checked={paymentMethod === 'cod'}
              value="cod"
              name="payment" id="payment" />
              <label htmlFor="payment" className="ps-2">
                Cash on Delivery
              </label>
            </div>

            <div className="d-flex py-2">
              <Link to="/checkout">
                <button className="btn btn-primary">Pay Now</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
