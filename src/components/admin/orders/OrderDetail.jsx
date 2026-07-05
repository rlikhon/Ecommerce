import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAdminOrderDetail } from "../../../hooks/useAdminOrderDetail";
import Layout from "./../../common/Layout";
import Sidebar from "./../../common/Sidebar";
import { Link } from "react-router-dom";
import html2pdf from "html2pdf.js";

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
/* ─── inline invoice template (print-ready) ───────────────────────────── */
const buildInvoiceHTML = (order) => {
  alert('Under development');
}
export default function OrderDetailPage() {
  const { orderId } = useParams();
  const { order, loading, error, confirmOrder, updateStatus } =
    useAdminOrderDetail(orderId);
  const [showInvoice, setShowInvoice] = useState(false);
  const invoiceRef = useRef(null);

  const handleConfirm = async () => {
    await confirmOrder("Payment verified");
  };

  const handleUpdateStatus = async (newStatus) => {
    await updateStatus(newStatus);
  };

  /* ── actions ── */
  const handlePrint = () => {
    const html = buildInvoiceHTML(order);
    const w = window.open("", "_blank", "width=900,height=700");
    w.document.write(html);
    w.document.close();
    w.onload = () => {
      w.focus();
      w.print();
    };
  };

  const handleDownload = () => {    
    const html = buildInvoiceHTML(order);
    const w = window.open("", "_blank", "width=900,height=700");
    w.document.write(html);
    w.document.close();
    w.onload = () => {
      w.focus();
      w.print();
    };
  };

  /* ── states ── */
  if (loading)
    return (
      <Layout>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "60vh",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div className="spinner-border text-primary" role="status" />
            <p style={{ marginTop: 12, color: "#6b7280", fontSize: 14 }}>
              Loading order details…
            </p>
          </div>
        </div>
      </Layout>
    );

  if (error)
    return (
      <Layout>
        <div className="container py-5">
          <div className="alert alert-danger">{error}</div>
        </div>
      </Layout>
    );

  const total = Number(order.grand_total ?? order.total ?? 0);
  const items = order.items ?? [];

  /* ── inline styles (scoped) ── */
  const s = {
    page: { background: "#f8f9fb", minHeight: "100vh", padding: "2rem 0" },
    card: {
      background: "#fff",
      borderRadius: 14,
      boxShadow: "0 1px 6px rgba(0,0,0,.07)",
      padding: "24px 28px",
      marginBottom: 20,
    },
    sectionTtl: {
      fontSize: 12,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "1px",
      color: "#9ca3af",
      marginBottom: 14,
    },
    infoLabel: { fontSize: 13, color: "#6b7280", marginBottom: 4 },
    infoVal: {
      fontSize: 15,
      fontWeight: 600,
      color: "#111827",
      marginBottom: 0,
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      padding: "4px 12px",
      borderRadius: 20,
      fontSize: 13,
      fontWeight: 600,
    },
    divider: { height: 1, background: "#f0f0f0", margin: "16px 0" },
    btnPrimary: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "9px 18px",
      borderRadius: 8,
      fontSize: 13,
      fontWeight: 600,
      background: "#4f46e5",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      transition: "opacity .2s",
    },
    btnOutline: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "9px 18px",
      borderRadius: 8,
      fontSize: 13,
      fontWeight: 600,
      background: "transparent",
      color: "#4f46e5",
      border: "1.5px solid #4f46e5",
      cursor: "pointer",
      transition: "background .2s",
    },
    btnGhost: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "9px 18px",
      borderRadius: 8,
      fontSize: 13,
      fontWeight: 600,
      background: "transparent",
      color: "#6b7280",
      border: "1.5px solid #d1d5db",
      cursor: "pointer",
      transition: "background .2s",
    },
    th: {
      padding: "12px 16px",
      fontSize: 12,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: ".5px",
      color: "#6b7280",
      borderBottom: "1px solid #f0f0f0",
      textAlign: "left",
    },
    td: {
      padding: "14px 16px",
      fontSize: 14,
      color: "#374151",
      borderBottom: "1px solid #f9fafb",
      verticalAlign: "middle",
    },
  };
  
  if (!order) return (
    <Layout>
      <div className="container py-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div style={s.page}>
        <div className="container">
          <div className="row">
            <div className="d-flex justify-content-between mt-5 pb-3">
              <h4 className="h4 pb-0 mb-0">Order Details</h4>
              {/*--<Link to="/admin/orders" className="btn btn-primary">
                Button
              </Link>*/}
            </div>
            <div className="col-md-3 col-lg-3">
              <Sidebar />
            </div>
            <div className="col-md-9">
              {/* ── Top bar ── */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <div>
                  <Link
                    to="/admin/orders"
                    style={{
                      fontSize: 13,
                      color: "#6b7280",
                      textDecoration: "none",
                    }}
                  >
                    ← Back to Orders
                  </Link>
                  <h4
                    style={{
                      margin: "6px 0 0",
                      fontWeight: 700,
                      color: "#111827",
                    }}
                  >
                    Order{" "}
                    <span style={{ color: "#4f46e5" }}>
                      #{order.order_number ?? order.id}
                    </span>
                  </h4>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button style={s.btnGhost} onClick={handleDownload}>
                    ↓ Download
                  </button>
                  <button
                    style={s.btnOutline}
                    onClick={() => setShowInvoice(true)}
                  >
                    👁 View Invoice
                  </button>
                  <button style={s.btnPrimary} onClick={handlePrint}>
                    🖨 Print Invoice
                  </button>
                </div>
              </div>

              {/* ── Order meta cards ── */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                  marginBottom: 20,
                }}
              >
                {/* Order Info */}
                <div style={s.card}>
                  <p style={s.sectionTtl}>Order Info</p>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 12,
                    }}
                  >
                    <div>
                      <p style={s.infoLabel}>Date Placed</p>
                      <p style={s.infoVal}>{fmtDate(order.created_at)}</p>
                    </div>
                    <div>
                      <p style={s.infoLabel}>Status</p>
                      <StatusBadge status={order.status} />
                    </div>
                    <div>
                      <p style={s.infoLabel}>Payment Method</p>
                      <p style={s.infoVal}>
                        {(order.payment_method ?? "—").toUpperCase()}
                      </p>
                    </div>
                    <div>
                      <p style={s.infoLabel}>Payment Status</p>
                      <p
                        style={{
                          ...s.infoVal,
                          color:
                            order.payment_status === "paid"
                              ? "#10b981"
                              : "#f59e0b",
                        }}
                      >
                        {(order.payment_status ?? "—").toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Shipping */}
                <div style={s.card}>
                  <p style={s.sectionTtl}>Ship To</p>
                  <p
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#111827",
                      marginBottom: 4,
                    }}
                  >
                    {order.name ?? "—"}
                  </p>
                  <p
                    style={{
                      fontSize: 13,
                      color: "#6b7280",
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {order.address}
                    <br />
                    {[order.city, order.state, order.zip]
                      .filter(Boolean)
                      .join(", ")}
                    <br />
                    {order.country}
                  </p>
                  {order.phone && (
                    <p style={{ fontSize: 13, color: "#6b7280", marginTop: 6 }}>
                      📞 {order.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* ── Items Table ── */}
              <div style={s.card}>
                <p style={s.sectionTtl}>Items Ordered</p>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#f8f9fb" }}>
                      <th style={s.th}>Product</th>
                      <th style={{ ...s.th, textAlign: "center" }}>Qty</th>
                      <th style={{ ...s.th, textAlign: "right" }}>
                        Unit Price
                      </th>
                      <th style={{ ...s.th, textAlign: "right" }}>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id}>
                        <td style={s.td}>
                          <span style={{ fontWeight: 600, color: "#111827" }}>
                            {item.name}
                          </span>
                          {item.sku && (
                            <span
                              style={{
                                display: "block",
                                fontSize: 12,
                                color: "#9ca3af",
                              }}
                            >
                              SKU: {item.sku}
                            </span>
                          )}
                        </td>
                        <td style={{ ...s.td, textAlign: "center" }}>
                          <span style={{ fontWeight: 600 }}>
                            {item.quantity}
                          </span>
                        </td>
                        <td style={{ ...s.td, textAlign: "right" }}>
                          {fmt(item.price)}
                        </td>
                        <td
                          style={{
                            ...s.td,
                            textAlign: "right",
                            fontWeight: 600,
                            color: "#111827",
                          }}
                        >
                          {fmt(item.price * item.quantity)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Totals */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: 16,
                  }}
                >
                  <div style={{ minWidth: 260 }}>
                    {[
                      ["Subtotal", fmt(order.sub_total ?? order.subtotal)],
                      ["Shipping", fmt(order.shipping_charges ?? 0)],
                      ["Discount", `-${fmt(order.discount ?? 0)}`],
                    ].map(([label, val]) => (
                      <div
                        key={label}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "6px 0",
                          fontSize: 14,
                          color: "#6b7280",
                          borderBottom: "1px solid #f0f0f0",
                        }}
                      >
                        <span>{label}</span>
                        <span>{val}</span>
                      </div>
                    ))}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "12px 0 0",
                        fontSize: 17,
                        fontWeight: 700,
                        color: "#4f46e5",
                      }}
                    >
                      <span>Grand Total</span>
                      <span>{fmt(total)}</span>
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
