import React, { useState, useEffect, useCallback } from "react";
import Layout from "./../common/Layout";
import AccountSidebar from "./common/AccountSidebar";
import { Link } from "react-router-dom";
import { Table, Spinner, Badge, Card } from "react-bootstrap";
import { ShoppingBag, Eye, Calendar, DollarSign, Activity } from "lucide-react";
import { getCustomerOrdersService } from "../../services/OrderServices";

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const fetchOrderHistory = useCallback(async () => {
    setLoading(true);
    try {
      // Pull active customer token directly out of local storage namespace safely
      const rawUserInfo = localStorage.getItem("userInfo");
      const token = rawUserInfo ? JSON.parse(rawUserInfo)?.token : null;

      if (token) {
        const res = await getCustomerOrdersService(token);
        setOrders(res?.data?.data || res?.data || []);
      } else {
        // Fallback fallback mockup mock arrays if token isn't mounted inside local testing environment
        setOrders([
          { id: 1042, order_number: "MS-88492", created_at: "2026-05-20", grand_total: "124.50", status: "delivered" },
          { id: 1041, order_number: "MS-88421", created_at: "2026-05-12", grand_total: "89.00", status: "pending" },
          { id: 1040, order_number: "MS-88310", created_at: "2026-04-28", grand_total: "240.00", status: "cancelled" }
        ]);
      }
    } catch (error) {
      console.error("Failed to sync customer order history registry lines:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = setTimeout(() => {
      fetchOrderHistory();
    }, 0);
    return () => clearTimeout(token);
  }, [fetchOrderHistory]);

  // Helper dictionary utility mapping state string targets cleanly to Bootstrap badge contextual properties
  const getStatusBadgeConfig = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered": return { bg: "success", text: "Delivered" };
      case "pending":   return { bg: "warning", text: "Pending" };
      case "processing": return { bg: "warning", text: "Processing" };
      case "shipped":   return { bg: "info", text: "In-Transit" };
      case "cancelled": return { bg: "danger", text: "Cancelled" };       
      case "failed":    return { bg: "danger", text: "Failed" };
      default:          return { bg: "secondary", text: status };
    }
  };

  const getPaymentStatusBadgeConfig = (payment_status) => {
    switch (payment_status?.toLowerCase()) {
      case "paid": return { bg: "success", text: "Paid" };
      case "unpaid": return { bg: "warning", text: "Unpaid" };
      case "partial_paid_due": return { bg: "warning", text: "Partial Payment - Due" };
      case "refunded":  return { bg: "danger", text: "Refunded" };
      case "failed":  return { bg: "danger", text: "Failed" };
      default:          return { bg: "secondary", text: payment_status };
    }
  };
  
  return (
    <Layout>
      <div className="container py-4">
        {/* Navigation Breadcrumb Tracker */}
        <nav aria-label="breadcrumb" className="mt-4 mb-3">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/account/profile">Dashboard</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Order History</li>
          </ol>
        </nav>

        <div className="row g-4">
          {/* Left Column: Reusable Customer Menu Workspace Navigation Panel */}
          <div className="col-md-3 col-lg-3 mb-4">
            <AccountSidebar />
          </div>

          {/* Right Column: Dynamic Core Purchase Ledger Area */}
          <div className="col-md-9 col-lg-9">
            <Card className="customer-orders-card border-0 shadow-sm mb-4">
              <Card.Header className="bg-white border-0 pt-4 pb-2 px-4">
                <h5 className="fw-bold mb-0 text-dark d-flex align-items-center gap-2">
                  <ShoppingBag size={18} className="text-secondary" /> Complete Purchase History
                </h5>
                <p className="text-muted small mb-0 mt-1">Track tracking coordinates and fulfillment records for past purchases.</p>
              </Card.Header>
              
              <Card.Body className="p-0">
                {loading ? (
                  <div className="d-flex justify-content-center align-items-center py-5">
                    <Spinner animation="border" variant="primary" />
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-5 text-muted">
                    <p className="fs-6 mb-3">You haven't placed any platform store purchases yet.</p>
                    <Link to="/shop" className="btn btn-sm btn-primary fw-semibold px-4">Explore Shop Catalog</Link>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <Table className="align-middle mb-0">
                      <thead className="table-light">
                        <tr>
                          <th className="ps-4">Invoice ID</th>
                          <th><Calendar size={13} className="me-1" /> Order Date</th>
                          <th><DollarSign size={13} className="me-1" /> Grand Total</th>
                          <th><Activity size={13} className="me-1" /> Status</th>
                          <th><Activity size={13} className="me-1" /> Payment Status</th>
                          <th className="text-end pe-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => {
                          const badgeConfig = getStatusBadgeConfig(order.status);
                          const badgeConfigPayment = getPaymentStatusBadgeConfig(order.payment_status);
                          return (
                            <tr key={order.id || order.order_number}>
                              {/* Reference Identity Number */}
                              <td className="fw-bold text-dark ps-4 py-3.5">
                                {order.order_number || `#MS-00${order.id}`}
                              </td>
                              
                              {/* Timestamp Entry Cell */}
                              <td className="text-secondary small fw-medium">
                                {new Date(order.created_at).toLocaleDateString("en-US", {
                                  year: "numeric", month: "short", day: "numeric"
                                })}
                              </td>
                              
                              {/* Financial Evaluation Pricing Block */}
                              <td className="fw-bold text-dark">
                                ${parseFloat(order.grand_total).toFixed(2)}
                              </td>
                              
                              {/* Status Badge Selection */}
                              <td>
                                <Badge bg={badgeConfig.bg} className="badge-fulfillment shadow-none">
                                  {badgeConfig.text}
                                </Badge>
                              </td>

                               {/* Payment Status Badge Selection */}
                              <td>
                                <Badge bg={badgeConfigPayment.bg} className="badge-fulfillment shadow-none">
                                  {badgeConfigPayment.text}
                                </Badge>
                              </td>
                              
                              {/* Actions View Trigger Buttons Link */}
                              <td className="text-end pe-4">
                                <Link 
                                  to={`/account/orders/${order.id}`} 
                                  className="btn btn-sm btn-outline-light border border-secondary border-opacity-25 text-secondary px-3 fw-semibold d-inline-flex align-items-center gap-1.5"
                                  style={{ transition: "0.2s" }}
                                  onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.backgroundColor = "#43c3d1"; }}
                                  onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(6, 17, 35, 0.7)"; e.currentTarget.style.backgroundColor = "transparent"; }}
                                >
                                  <Eye size={14} /> <span>Invoice Details</span>
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                )}
              </Card.Body>
            </Card>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Orders;
