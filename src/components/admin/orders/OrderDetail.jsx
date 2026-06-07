import { useParams } from "react-router-dom";
import { useAdminOrderDetail } from "../../../hooks/useAdminOrderDetail";
import React from "react";
import Layout from "./../../common/Layout";
import Sidebar from "./../../common/Sidebar";
import { Link } from "react-router-dom";


  /* ─── helpers ─────────────────────────────────────────────────────────── */
const fmt = (n) =>
  Number(n ?? 0).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const STATUS_META = {
  pending: { color: "#f59e0b", bg: "#fffbeb", label: "Pending" },
  processing: { color: "#3b82f6", bg: "#eff6ff", label: "Processing" },
  shipped: { color: "#06b6d4", bg: "#ecfeff", label: "Shipped" },
  delivered: { color: "#10b981", bg: "#ecfdf5", label: "Delivered" },
  cancelled: { color: "#ef4444", bg: "#fef2f2", label: "Cancelled" },
  failed: { color: "#ef4444", bg: "#fef2f2", label: "Failed" },
};

const StatusBadge = ({ status }) => {
  const meta = STATUS_META[status?.toLowerCase()] ?? {
    color: "#6b7280",
    bg: "#f3f4f6",
    label: status,
  };
return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 12px",
        borderRadius: 20,
        fontSize: 13,
        fontWeight: 600,
        color: meta.color,
        backgroundColor: meta.bg,
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          backgroundColor: meta.color,
          display: "inline-block",
        }}
      />
      {meta.label}
    </span>
  );
};

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
