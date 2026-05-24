import React, { useContext, useMemo, useEffect } from "react";
import Layout from "./../common/Layout";
import AccountSidebar from "./common/AccountSidebar";
import { Link } from "react-router-dom";
import { Card, Table, Badge, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ShoppingBag, Clock, Heart, ShieldCheck, ArrowUpRight, Calendar, PackageCheck } from "lucide-react";
import { AccountAuthContext } from "../context/AccountAuth";
import { CartContext } from "../context/Cart"; 

const Profile = () => {
  const { user } = useContext(AccountAuthContext);
  const { cartData } = useContext(CartContext);

  const { register, setValue } = useForm();

  // Populate form fields from the current authenticated user context safely
  useEffect(() => {
    if (user) {
      setValue("name", user.name || "");
      setValue("email", user.email || "");
    }
  }, [user, setValue]);

  // Mock array mapping data ledger lines for recent purchases
  const recentOrdersMock = [
    { id: "#MS-88492", date: "May 20, 2026", total: "$124.50", status: "Delivered", badge: "success" },
    { id: "#MS-88421", date: "May 12, 2026", total: "$89.00", status: "In Transit", badge: "info" },
    { id: "#MS-88310", date: "Apr 28, 2026", total: "$240.00", status: "Cancelled", badge: "danger" }
  ];

  // Dynamically compute total pieces currently inside user cart
  const cartItemsCount = useMemo(() => {
    if (!cartData) return 0;
    return cartData.reduce((total, item) => total + item.qty, 0);
  }, [cartData]);

  // Extracts single identity monogram initial for branding icon frame
  const userInitial = useMemo(() => {
    if (!user?.name) return "U";
    return user.name.charAt(0).toUpperCase();
  }, [user]);

  return (
    <Layout>
      <div className="container py-4">
        {/* Navigation Breadcrumbs */}
        <nav aria-label="breadcrumb" className="mt-4 mb-3">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Account Dashboard</li>
          </ol>
        </nav>

        <div className="row g-4">
          {/* Left Column: Dedicated Customer Sidebar Component Selection */}
          <div className="col-md-3 col-lg-3 mb-4">
            <AccountSidebar />
          </div>

          {/* Right Column: Console Details Workspace Data Panels */}
          <div className="col-md-9 col-lg-9">
            
            {/* Banner block element user quick overview context profiling */}
            <div className="user-quick-profile-card shadow-sm p-4 mb-4">
              <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3">
                <div className="d-flex align-items-center gap-3 flex-column flex-sm-row text-center text-sm-start">
                  <div className="avatar-placeholder rounded-circle shadow-sm">
                    {userInitial}
                  </div>
                  <div>
                    <h4 className="fw-bold mb-1">Welcome Back, {user?.name || "Customer"}!</h4>
                    <p className="mb-0 opacity-75 small d-flex align-items-center justify-content-center justify-content-sm-start gap-1.5">
                      <Calendar size={14} /> Registered: {user?.email || "N/A"}
                    </p>
                  </div>
                </div>
                <Badge bg="primary" className="px-3 py-2 fw-semibold text-uppercase tracking-wider shadow-sm">
                  {user?.role || "Verified Customer"}
                </Badge>
              </div>
            </div>

            {/* High Density Metric Cards Row */}
            <Row className="g-4 mb-4">
              <Col sm={4}>
                <Card className="customer-dashboard-stat-card shadow-sm h-100">
                  <Card.Body className="d-flex align-items-center gap-3">
                    <div className="icon-shape bg-primary bg-opacity-10 text-primary">
                      <ShoppingBag size={22} />
                    </div>
                    <div>
                      <span className="text-muted small fw-semibold d-block">Total Purchases</span>
                      <h4 className="fw-bold text-dark mb-0">12 Placed</h4>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col sm={4}>
                <Card className="customer-dashboard-stat-card shadow-sm h-100">
                  <Card.Body className="d-flex align-items-center gap-3">
                    <div className="icon-shape bg-warning bg-opacity-10 text-warning">
                      <Clock size={22} />
                    </div>
                    <div>
                      <span className="text-muted small fw-semibold d-block">Cart Volatility</span>
                      <h4 className="fw-bold text-dark mb-0">{cartItemsCount} Active Items</h4>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col sm={4}>
                <Card className="customer-dashboard-stat-card shadow-sm h-100">
                  <Card.Body className="d-flex align-items-center gap-3">
                    <div className="icon-shape bg-danger bg-opacity-10 text-danger">
                      <Heart size={22} />
                    </div>
                    <div>
                      <span className="text-muted small fw-semibold d-block">Saved Items</span>
                      <h4 className="fw-bold text-dark mb-0">5 Wishlisted</h4>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Profile Field Summary Readonly Layout Block */}
            <Card className="border-0 shadow-sm mb-4 rounded-3">
              <Card.Body className="p-4">
                <h5 className="fw-bold text-dark mb-4 d-flex align-items-center gap-2">
                  <ShieldCheck size={18} className="text-primary" /> Profile Specification Summary
                </h5>
                <form>
                  <Row className="g-3">
                    <Col md={6}>
                      <label className="form-label small fw-semibold text-secondary mb-1">Full Identity Name</label>
                      <input {...register("name")} type="text" className="form-control bg-light text-muted" disabled />
                    </Col>
                    <Col md={6}>
                      <label className="form-label small fw-semibold text-secondary mb-1">Registered Email Address</label>
                      <input {...register("email")} type="email" className="form-control bg-light text-muted" disabled />
                    </Col>
                  </Row>
                </form>
              </Card.Body>
            </Card>

            {/* Recent Orders Overview Matrix Table */}
            <Card className="border-0 shadow-sm rounded-3 overflow-hidden">
              <Card.Header className="bg-white border-0 pt-4 pb-2 px-4 d-flex justify-content-between align-items-center">
                <h5 className="fw-bold mb-0 text-dark d-flex align-items-center gap-2">
                  <PackageCheck size={18} className="text-success" /> Recent Purchase Activity
                </h5>
                <Link to="/account/orders" className="btn btn-sm btn-light fw-semibold text-primary d-flex align-items-center gap-1">
                  View Full History <ArrowUpRight size={14} />
                </Link>
              </Card.Header>
              <div className="table-responsive">
                <Table className="align-middle mb-0">
                  <thead className="table-light text-secondary small">
                    <tr>
                      <th className="ps-4">Reference ID</th>
                      <th>Placement Date</th>
                      <th>Gross Value</th>
                      <th className="pe-4">Fulfillment State</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrdersMock.map((order) => (
                      <tr key={order.id} className="border-bottom-0">
                        <td className="fw-bold text-dark ps-4 py-3">{order.id}</td>
                        <td className="text-secondary small">{order.date}</td>
                        <td className="fw-semibold text-dark">{order.total}</td>
                        <td className="pe-4">
                          <Badge bg={order.badge} className="px-2.5 py-1.5 fw-semibold rounded-pill text-capitalize">
                            {order.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
