import { useState } from "react";
import { useAdminOrders } from "../../../hooks/useAdminOrders";
import Layout from "./../../common/Layout";
import Sidebar from "./../../common/Sidebar";
import { Link } from "react-router-dom";

export default function OrdersListPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(null);
  const { orders, pagination, loading, error } = useAdminOrders(
    page,
    15,
    status,
  );

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">Your Title</h4>
            <Link to="" className="btn btn-primary">
              Button
            </Link>
          </div>
          <div className="col-md-3 col-lg-3">
            <Sidebar />
          </div>
          <div className="col-md-9 col-lg-9">
            <div className="row">
              <div className="card shadow">
                <div className="card-body p-4">
                  <div>
                    <h1>All Orders</h1>

                    <select
                      value={status || ""}
                      onChange={(e) => setStatus(e.target.value || null)}
                    >
                      <option value="">All Statuses</option>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing</option>
                    </select>

                    {loading && <div>Loading...</div>}
                    {error && <div>Error: {error}</div>}

                    <table>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Customer</th>
                          <th>Total</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.name}</td>
                            <td>${order.grand_total}</td>
                            <td>{order.status}</td>
                            <td>
                              <a href={`/admin/orders/${order.id}`}>View</a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div>
                      Page {pagination?.current_page} of{" "}
                      {Math.ceil(pagination?.total / 15)}
                      <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                      >
                        Prev
                      </button>
                      <button
                        onClick={() => setPage(page + 1)}
                        disabled={!pagination?.has_more}
                      >
                        Next
                      </button>
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
}
