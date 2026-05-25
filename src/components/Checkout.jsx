import React, { useContext, useState } from "react";
import Layout from "./common/Layout";
import { Link } from "react-router-dom";
import DefaultProductImg from "../assets/images/Mens/five.jpg";
import { CartContext } from "./context/Cart";
import { useForm } from "react-hook-form";
import { Spinner } from "react-bootstrap";
import { createCustomerOrderService } from "../services/OrderServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("cod");  
  const { cartData, grandTotal, subTotal, shipping, clearCart } =
    useContext(CartContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm();

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const processOrder = (data) => {
    if (paymentMethod == "cod") {
      // create order
      saveOrder(data, "pending");
    }
  };

  const saveOrder = async (formData, paymentStatus) => {
  const orderData = {
    ...formData,      
    payment_method: paymentMethod,
    payment_status: paymentStatus,
    sub_total: subTotal,
    shipping_charges: shipping,
    grand_total: grandTotal,
    status: "pending",
    cart: cartData 
  };

  try {    
    const response = await createCustomerOrderService(orderData);
    
    toast.success(response.data.message || "Order placed successfully!");
    if (clearCart) clearCart();
    navigate('/account/orders');
    
  } catch (error) {    
    console.warn("Transaction execution halted by global client interceptor.");
  }
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
        <div className="row g-4">
          <form onSubmit={handleSubmit(processOrder)} className="row g-3">
            <div className="col-md-7 col-lg-7 px-4">
              <h3 className="border-bottom pb-3 mb-3">
                <strong className="text-primary">Billing Details</strong>
              </h3>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      className={`form-control ${errors.name ? "is-invalid" : ""}`}
                      {...register("name", {
                        required: "Name is required",
                      })}
                      onBlur={() => clearErrors("name")}
                    />
                    {errors.name && (
                      <div className="invalid-feedback">
                        {errors.name.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email format",
                        },
                      })}
                      onBlur={() => clearErrors("email")}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">
                        {errors.email.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="email">Address</label>
                  <textarea
                    className={`form-control ${errors.address ? "is-invalid" : ""}`}
                    id="address"
                    rows={3}
                    {...register("address", {
                      required: "Address is required",
                    })}
                    onBlur={() => clearErrors("address")}
                  ></textarea>
                  {errors.address && (
                    <div className="invalid-feedback">
                      {errors.address.message}
                    </div>
                  )}
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="email">City</label>
                    <input
                      type="text"
                      id="city"
                      className={`form-control ${errors.city ? "is-invalid" : ""}`}
                      {...register("city", {
                        required: "City is required",
                      })}
                      onBlur={() => clearErrors("city")}
                    />
                    {errors.city && (
                      <div className="invalid-feedback">
                        {errors.city.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="state">State</label>
                    <input
                      type="text"
                      id="state"
                      className={`form-control ${errors.state ? "is-invalid" : ""}`}
                      {...register("state", {
                        required: "State is required",
                      })}
                      onBlur={() => clearErrors("state")}
                    />
                    {errors.state && (
                      <div className="invalid-feedback">
                        {errors.state.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="email">Zip</label>
                    <input
                      type="text"
                      id="zip"
                      className={`form-control ${errors.zip ? "is-invalid" : ""}`}
                      {...register("zip", {
                        required: "Zip is required",
                      })}
                      onBlur={() => clearErrors("zip")}
                    />
                    {errors.zip && (
                      <div className="invalid-feedback">
                        {errors.zip.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="mobile">Mobile</label>
                    <input
                      type="text"
                      id="mobile"
                      className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
                      {...register("mobile", {
                        required: "Mobile is required",
                      })}
                      onBlur={() => clearErrors("mobile")}
                    />
                    {errors.mobile && (
                      <div className="invalid-feedback">
                        {errors.mobile.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5 col-lg-5">
              <h3 className="border-bottom pb-3 mb-3">
                <strong className="text-primary">Order Summary</strong>
              </h3>
              <table className="table">
                <tbody>
                  {cartData && cartData.length > 0 ? (
                    cartData.map((item) => (
                      <tr key={item.id}>
                        <td width={100}>
                          <img
                            src={item.image_url || DefaultProductImg}
                            alt={item.title}
                            width="50"
                          />
                        </td>
                        <td>
                          <h4 className="text-secondary small">{item.title}</h4>
                          <div className="d-flex align-items-center text-secondary small">
                            <span>${item.price}</span>
                            <span> &nbsp;x &nbsp;</span>
                            <span>{item.qty}</span>
                          </div>
                        </td>
                        <td>
                          <div className="ps-3">
                            <button className="btn btn-size ms-1">
                              {item.size}
                            </button>
                          </div>
                        </td>
                        <td>
                          <span>${item.qty * item.price}</span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2} className="text-center">
                        No items in cart
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="row">
                <div className="col-md-12">
                  <div className="card border-0 shadow-sm bg-light p-3 rounded">
                    <div className="d-flex justify-content-between py-2 border-bottom border-white">
                      <div className="text-secondary small">Subtotal</div>
                      <div className="fw-semibold text-dark">${subTotal}</div>
                    </div>
                    <div className="d-flex justify-content-between py-2 border-bottom border-white">
                      <div className="text-secondary small">Shipping Cost</div>
                      <div className="fw-semibold text-dark">${shipping}</div>
                    </div>
                    <div className="d-flex justify-content-between py-3">
                      <div>
                        <strong className="text-dark">Grand Total</strong>
                      </div>
                      <div>
                        <strong className="text-primary fs-5">
                          ${grandTotal}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="border-bottom pb-3 mb-3 mt-3">
                <strong className="text-primary">Payment Method</strong>
              </h3>
              <div className="row">
                <div className="col-md-12">
                  <div className="d-flex align-items-center">
                    <input
                      type="radio"
                      onClick={handlePaymentMethodChange}
                      checked={paymentMethod === "stripe"}
                      value="stripe"
                      name="payment"
                      id="payment"
                      readOnly={true}
                    />
                    <label htmlFor="payment" className="ps-2">
                      Stripe
                    </label>
                  </div>
                  <div className="d-flex align-items-center">
                    <input
                      type="radio"
                      onClick={handlePaymentMethodChange}
                      checked={paymentMethod === "cod"}
                      value="cod"
                      name="payment"
                      id="payment"
                      readOnly={true}
                    />
                    <label htmlFor="payment" className="ps-2">
                      Cash on Delivery
                    </label>
                  </div>
                </div>
              </div>

              <div className="d-flex py-2">
                <button
                  className="btn btn-primary w-100 py-2 fw-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Pay Now"
                  )}
                </button>
                {/* <Link
                  to="/checkout"
                  className="btn btn-primary w-100 py-2 fw-semibold shadow-sm text-center d-block"
                >
                  Pay Now
                </Link> */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
