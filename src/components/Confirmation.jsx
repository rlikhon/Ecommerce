import React, { useEffect, useState } from 'react'
import Layout from './common/Layout'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { getOrderByIdService } from '../services/OrderServices' 

const Confirmation = () => {
    const { id } = useParams();
    const [orderData, setOrderData] = useState(null);
    const [orderId, setOrderId] = useState(null);
    const [orderDate, setOrderDate] = useState(null);
    const [orderStatus, setOrderStatus] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [subTotal, setSubTotal] = useState(null);
    const [shipping, setShipping] = useState(null);
    const [totalDiscount, setTotalDiscount] = useState(null);
    const [grandTotal, setGrandTotal] = useState(null);
    const [cartData, setCartData] = useState(null);

    useEffect(() => {
        const getOrderById = async () => {
            try {
                const response = await getOrderByIdService(id);
                
                setOrderData(response.data);
                setOrderId(response.data.id);
                setOrderDate(response.data.created_at);
                setOrderStatus(response.data.status);
                setPaymentMethod(response.data.payment_method);
                setSubTotal(response.data.sub_total);
                setShipping(response.data.shipping_charges);
                setTotalDiscount(response.data.discount);
                setGrandTotal(response.data.grand_total);
                setCartData(response.data.items);
            } catch (error) {
                console.error("Error fetching order:", error);
            }
        };
        getOrderById();
    }, [id]);

    if (!orderData) {
        return <div>Loading...</div>;
    }

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h2 className="h4 pb-0 mb-0">Thank you for your order!</h2>
            <p className="text-center">We will notify you once your order is shipped.</p>
          </div>          
          <div className="col-md-12 col-lg-12">
            <div className="row">               
              <div className="card shadow">
                <div className="card-body p-4">
                    <h3 className="text-center mb-4 fw-bold"> Order Summary</h3>
                    <hr />
                    <div className="row">
                      <div className="col-md-6">
                        <p> <strong>Order ID :</strong> {orderId}</p>
                        <p> <strong>Order Date :</strong> {orderDate}</p>
                        <p> 
                            <strong>Order Status :</strong> 
                            <span className='badge bg-warning'>{orderStatus}</span>
                        </p>
                         <p> <strong>Payment Method :</strong> {paymentMethod}</p>       
                      </div>
                      <div className="col-md-6">
                          <p><strong>Customer Name :</strong> {orderData.name}</p>
                          <p><strong>Customer Email :</strong>{orderData.email}</p>
                          <p><strong>Customer Phone :</strong>{orderData.phone}</p>
                          <p><strong>Customer Address :</strong>{orderData.address}</p>
                          <p><strong>Customer City :</strong>{orderData.city}</p>
                          <p><strong>Customer Country :</strong>{orderData.country}</p>
                          <p><strong>Customer State :</strong>{orderData.state}</p>
                          <p><strong>Customer Zip :</strong>{orderData.zip}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-md-12">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartData.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td>${item.price}</td>
                                            <td>{item.quantity}</td>
                                            <td>${item.price * item.quantity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-md-12">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Sub Total</th>
                                        <th>Shipping</th>
                                        <th>Discount</th>
                                        <th>Grand Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>${subTotal}</td>
                                        <td>${shipping}</td>
                                        <td>${totalDiscount}</td>
                                        <td>${grandTotal}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-md-12">
                            <p className="text-center">Thank you for your order!</p>
                            <Link to="/" className="btn btn-primary">Continue Shopping</Link>
                        </div>
                    </div>
                </div>
              </div>
            </div>            
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Confirmation