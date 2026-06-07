import { useParams } from "react-router-dom";
import { useAdminOrderDetail } from "../../../hooks/useAdminOrderDetail";
import React from "react";
import Layout from "./../../common/Layout";
import Sidebar from "./../../common/Sidebar";
import { Link } from "react-router-dom";

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const { order, loading, error, confirmOrder, updateStatus } =
    useAdminOrderDetail(orderId);

  const handleConfirm = async () => {
    await confirmOrder("Payment verified");
  };

  const handleUpdateStatus = async (newStatus) => {
    await updateStatus(newStatus);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!order) return <div>Order not found</div>;

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">Your Title</h4>
            <Link to="/admin/orders" className="btn btn-primary">
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
                  <div className="p-6">
                    <h1>Order #{order.id}</h1>
                    <p>
                      Status: <strong>{order.status}</strong>
                    </p>
                    <p>Total: ${order.grand_total}</p>

                    {order.status === "pending" && (
                      <button onClick={handleConfirm} className="btn">
                        Confirm Order
                      </button>
                    )}

                    {order.status === "confirmed" && (
                      <button
                        onClick={() => handleUpdateStatus("processing")}
                        className="btn"
                      >
                        Move to Processing
                      </button>
                    )}

                    <div className="mt-6">
                      <h3>Items:</h3>
                      {order.items?.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between py-2"
                        >
                          <span>
                            {item.name} × {item.quantity}
                          </span>
                          <span>${item.price}</span>
                        </div>
                      ))}
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
