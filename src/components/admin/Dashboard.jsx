import React, { useState, useEffect } from "react";
import Layout from "../common/Layout";
import Sidebar from "../common/Sidebar";
import { Link } from "react-router-dom";
import { Card, Table, Badge, Button, Row, Col, Spinner } from "react-bootstrap";
import { 
  Users, 
  ShoppingBag, 
  Package, 
  DollarSign, 
  ArrowUpRight, 
  TrendingUp,
  Clock
} from "lucide-react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  BarChart, 
  Bar 
} from "recharts";

// Decoupled Modular Mock Data Stream Imports
import { salesTrendData, categoryData, recentOrders } from "../../data/mockDashboard";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  // Simulate dashboard initialization telemetry
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
          <Spinner animation="border" variant="primary" role="status" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* ✅ Changed to standard container for centered, proportional grid constraints */}
      <div className="container px-4">
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mt-5 pb-4 border-bottom">
          <div>
            <h4 className="h4 mb-1 fw-bold text-dark">Dashboard Overview</h4>
            <p className="text-muted small mb-0">Real-time store performance indicators and control panels.</p>
          </div>
          <Button variant="outline-primary" size="sm" className="d-flex align-items-center gap-1">
            <TrendingUp size={16} /> Generate Report
          </Button>
        </div>

        <div className="row mt-4">
          {/* Left Navigation Workspace */}
          <div className="col-md-3 col-lg-3 mb-4">
            <Sidebar />
          </div>

          {/* Right Core Data Analytics Workspace */}
          <div className="col-md-9 col-lg-9">
            
            {/* Row 1: High Density Metrics Summary Indicators */}
            <Row className="g-4 mb-4">
              <Col md={3}>
                <Card className="border-0 shadow-sm bg-primary text-white h-100">
                  <Card.Body className="d-flex justify-content-between align-items-center">
                    <div>
                      <span className="text-white-50 small fw-semibold">Total Revenue</span>
                      <h3 className="fw-bold my-1">$12,450</h3>
                      <small className="text-white-50"><span className="fw-bold">+12%</span> vs last month</small>
                    </div>
                    <div className="bg-white bg-opacity-20 p-3 rounded-circle">
                      <DollarSign size={24} />
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={3}>
                <Card className="border-0 shadow-sm bg-white h-100">
                  <Card.Body className="d-flex justify-content-between align-items-center">
                    <div>
                      <span className="text-muted small fw-semibold">Active Users</span>
                      <h3 className="fw-bold my-1 text-dark">1,240</h3>
                      <small className="text-success"><span className="fw-bold">+4%</span> vs yesterday</small>
                    </div>
                    <div className="bg-light p-3 rounded-circle text-primary">
                      <Users size={24} />
                    </div>
                  </Card.Body>
                  <Card.Footer className="bg-transparent border-0 pt-0">
                    <Link to="/admin/users" className="small text-primary text-decoration-none d-flex align-items-center gap-1">
                      Manage Users <ArrowUpRight size={14} />
                    </Link>
                  </Card.Footer>
                </Card>
              </Col>

              <Col md={3}>
                <Card className="border-0 shadow-sm bg-white h-100">
                  <Card.Body className="d-flex justify-content-between align-items-center">
                    <div>
                      <span className="text-muted small fw-semibold">Total Orders</span>
                      <h3 className="fw-bold my-1 text-dark">342</h3>
                      <small className="text-success"><span className="fw-bold">+18%</span> this week</small>
                    </div>
                    <div className="bg-light p-3 rounded-circle text-warning">
                      <ShoppingBag size={24} />
                    </div>
                  </Card.Body>
                  <Card.Footer className="bg-transparent border-0 pt-0">
                    <Link to="/admin/orders" className="small text-warning text-decoration-none d-flex align-items-center gap-1">
                      View All Orders <ArrowUpRight size={14} />
                    </Link>
                  </Card.Footer>
                </Card>
              </Col>

              <Col md={3}>
                <Card className="border-0 shadow-sm bg-white h-100">
                  <Card.Body className="d-flex justify-content-between align-items-center">
                    <div>
                      <span className="text-muted small fw-semibold">Products Listed</span>
                      <h3 className="fw-bold my-1 text-dark">528</h3>
                      <small className="text-muted">Across 12 categories</small>
                    </div>
                    <div className="bg-light p-3 rounded-circle text-success">
                      <Package size={24} />
                    </div>
                  </Card.Body>
                  <Card.Footer className="bg-transparent border-0 pt-0">
                    <Link to="/admin/products" className="small text-success text-decoration-none d-flex align-items-center gap-1">
                      Inventory Setup <ArrowUpRight size={14} />
                    </Link>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>

            {/* Row 2: Charts Area Dashboard Data Visualizations */}
            <Row className="g-4 mb-4">
              {/* Sales Area Line Chart Vector */}
              <Col lg={8}>
                <Card className="border-0 shadow-sm p-3">
                  <div className="mb-3">
                    <h6 className="fw-bold mb-0 text-dark">Sales & Order Volume Trend</h6>
                    <small className="text-muted">Monthly monitoring summary</small>
                  </div>
                  <div style={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer>
                      <AreaChart data={salesTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="dashboardRevenueGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0d6efd" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#0d6efd" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                        <XAxis dataKey="name" stroke="#a0a0a0" fontSize={12} tickLine={false} />
                        <YAxis stroke="#a0a0a0" fontSize={12} tickLine={false} />
                        <Tooltip />
                        <Area type="monotone" dataKey="Revenue" stroke="#0d6efd" strokeWidth={2} fillOpacity={1} fill="url(#dashboardRevenueGrad)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </Col>

              {/* Category Stock Distribution Bar Graph Vector */}
              <Col lg={4}>
                <Card className="border-0 shadow-sm p-3">
                  <div className="mb-3">
                    <h6 className="fw-bold mb-0 text-dark">Stock by Category</h6>
                    <small className="text-muted">Item volume split</small>
                  </div>
                  <div style={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer>
                      <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                        <XAxis dataKey="name" stroke="#a0a0a0" fontSize={10} tickLine={false} />
                        <YAxis stroke="#a0a0a0" fontSize={12} tickLine={false} />
                        <Tooltip />
                        <Bar dataKey="qty" fill="#198754" radius={[4, 4, 0, 0]} barSize={24} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </Col>
            </Row>

            {/* Row 3: Operation Orders Queue Ledger */}
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white border-0 py-3 d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="fw-bold mb-0 text-dark d-flex align-items-center gap-2">
                    <Clock size={18} className="text-muted" /> Processing Queues
                  </h6>
                </div>
                <Link to="/admin/orders" className="btn btn-sm btn-light fw-semibold text-primary">
                  View Full Registry
                </Link>
              </Card.Header>
              <Table responsive hover className="align-middle mb-0 border-top">
                <thead className="bg-light table-light">
                  <tr>
                    <th className="text-muted small ps-3">Order ID</th>
                    <th className="text-muted small">Customer info</th>
                    <th className="text-muted small">Items Count</th>
                    <th className="text-muted small">Gross Value</th>
                    <th className="text-muted small">Fulfillment State</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={`dashboard-order-${order.id}`}>
                      <td className="fw-semibold text-dark ps-3">{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.items} Units</td>
                      <td className="fw-bold text-dark">{order.total}</td>
                      <td>
                        <Badge bg={order.badge} className="px-2.5 py-1.5 fw-semibold text-capitalize">
                          {order.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
