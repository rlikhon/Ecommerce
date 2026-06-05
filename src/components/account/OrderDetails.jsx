import React, { useEffect, useState, useCallback, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { getOrderByIdService } from "../../services/OrderServices.jsx";
import Layout from "./../common/Layout";
import AccountSidebar from "./common/AccountSidebar";
import html2pdf from "html2pdf.js";

/* ─── helpers ─────────────────────────────────────────────────────────── */
const fmt = (n) =>
  Number(n ?? 0).toLocaleString("en-US", { style: "currency", currency: "USD" });

const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const STATUS_META = {
  pending:    { color: "#f59e0b", bg: "#fffbeb", label: "Pending" },
  processing: { color: "#3b82f6", bg: "#eff6ff", label: "Processing" },
  shipped:    { color: "#06b6d4", bg: "#ecfeff", label: "Shipped" },
  delivered:  { color: "#10b981", bg: "#ecfdf5", label: "Delivered" },
  cancelled:  { color: "#ef4444", bg: "#fef2f2", label: "Cancelled" },
  failed:     { color: "#ef4444", bg: "#fef2f2", label: "Failed" },
};

const StatusBadge = ({ status }) => {
  const meta = STATUS_META[status?.toLowerCase()] ?? {
    color: "#6b7280", bg: "#f3f4f6", label: status,
  };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "4px 12px", borderRadius: 20, fontSize: 13, fontWeight: 600,
      color: meta.color, backgroundColor: meta.bg,
    }}>
      <span style={{
        width: 7, height: 7, borderRadius: "50%", backgroundColor: meta.color,
        display: "inline-block",
      }} />
      {meta.label}
    </span>
  );
};

/* ─── inline invoice template (print-ready) ───────────────────────────── */
const buildInvoiceHTML = (order) => {
  const total = order.grand_total ?? order.total ?? 0;
  const rows = (order.items ?? []).map((item) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f0f0f0">${item.name}</td>
      <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;text-align:center">${item.quantity}</td>
      <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;text-align:right">${fmt(item.price)}</td>
      <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;text-align:right;font-weight:600">${fmt(item.price * item.quantity)}</td>
    </tr>`).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Invoice #${order.id}</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Segoe UI',Arial,sans-serif;color:#1a1a2e;background:#fff;padding:0}
    .page{max-width:760px;margin:0 auto;padding:48px 40px}
    .header{display:flex;justify-content:space-between;align-items:flex-start;padding-bottom:28px;border-bottom:3px solid #4f46e5;margin-bottom:32px}
    .brand{font-size:26px;font-weight:800;color:#4f46e5;letter-spacing:-0.5px}
    .brand span{color:#1a1a2e}
    .invoice-label{text-align:right}
    .invoice-label h2{font-size:22px;font-weight:700;color:#1a1a2e}
    .invoice-label p{font-size:13px;color:#6b7280;margin-top:4px}
    .meta{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:28px}
    .meta-box{background:#f8f9ff;border-radius:10px;padding:18px 20px}
    .meta-box h4{font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#6b7280;margin-bottom:10px}
    .meta-box p{font-size:14px;color:#1a1a2e;line-height:1.7;margin:0}
    .meta-box strong{color:#1a1a2e}
    table{width:100%;border-collapse:collapse}
    thead tr{background:#4f46e5;color:#fff}
    thead th{padding:12px 10px;font-size:13px;font-weight:600;text-align:left}
    thead th:nth-child(2){text-align:center}
    thead th:nth-child(3),thead th:nth-child(4){text-align:right}
    .totals{display:flex;justify-content:flex-end;margin-top:20px}
    .totals-box{min-width:240px}
    .totals-row{display:flex;justify-content:space-between;padding:6px 0;font-size:14px;color:#374151;border-bottom:1px solid #f0f0f0}
    .totals-row.grand{font-size:17px;font-weight:700;color:#4f46e5;border-bottom:none;padding-top:10px}
    .footer{margin-top:40px;padding-top:18px;border-top:1px solid #e5e7eb;text-align:center;font-size:12px;color:#9ca3af}
    .status-badge{display:inline-block;padding:3px 12px;border-radius:20px;font-size:12px;font-weight:600}
    @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
  </style>
</head>
<body>
<div class="page">
  <div class="header">
    <div class="brand">My<span>Store</span></div>
    <div class="invoice-label">
      <h2>INVOICE</h2>
      <p>#INV-${String(order.id).padStart(5, "0")}</p>
      <p style="margin-top:2px">${fmtDate(order.created_at)}</p>
    </div>
  </div>

  <div class="meta">
    <div class="meta-box">
      <h4>Billed To</h4>
      <p>
        <strong>${order.name ?? "—"}</strong><br/>
        ${order.email ?? ""}<br/>
        ${order.phone ?? ""}
      </p>
    </div>
    <div class="meta-box">
      <h4>Ship To</h4>
      <p>
        ${order.address ?? "—"}<br/>
        ${[order.city, order.state, order.zip].filter(Boolean).join(", ")}<br/>
        ${order.country ?? ""}
      </p>
    </div>
    <div class="meta-box">
      <h4>Order Info</h4>
      <p>
        <strong>Order #:</strong> ${order.order_number ?? order.id}<br/>
        <strong>Payment:</strong> ${(order.payment_method ?? "").toUpperCase()}<br/>
        <strong>Payment Status:</strong> ${order.payment_status ?? "—"}
      </p>
    </div>
    <div class="meta-box">
      <h4>Status</h4>
      <p>
        <span class="status-badge" style="background:${STATUS_META[order.status?.toLowerCase()]?.bg ?? "#f3f4f6"};color:${STATUS_META[order.status?.toLowerCase()]?.color ?? "#6b7280"}">
          ${STATUS_META[order.status?.toLowerCase()]?.label ?? order.status}
        </span>
      </p>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Product</th>
        <th style="text-align:center">Qty</th>
        <th style="text-align:right">Unit Price</th>
        <th style="text-align:right">Total</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>

  <div class="totals">
    <div class="totals-box">
      <div class="totals-row"><span>Subtotal</span><span>${fmt(order.sub_total ?? order.subtotal)}</span></div>
      <div class="totals-row"><span>Shipping</span><span>${fmt(order.shipping_charges ?? 0)}</span></div>
      <div class="totals-row"><span>Discount</span><span>-${fmt(order.discount ?? 0)}</span></div>
      <div class="totals-row grand"><span>Grand Total</span><span>${fmt(total)}</span></div>
    </div>
  </div>

  <div class="footer">
    <p>Thank you for your purchase! Questions? Contact support@mystore.com</p>
  </div>
</div>
</body>
</html>`;
};

/* ─── main component ──────────────────────────────────────────────────── */
const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder]           = useState(null);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [showInvoice, setShowInvoice] = useState(false);
  const invoiceRef = useRef(null);

  const fetchOrder = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await getOrderByIdService(id);
      setOrder(data);
    } catch (err) {
      setError(err.response?.data?.message ?? "Failed to load order details.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchOrder(); }, [fetchOrder]);

  /* ── actions ── */
  const handlePrint = () => {
    const html = buildInvoiceHTML(order);
    const w = window.open("", "_blank", "width=900,height=700");
    w.document.write(html);
    w.document.close();
    w.onload = () => { w.focus(); w.print(); };
  };

  const handleDownload = () => {
    const htmlString = buildInvoiceHTML(order);
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    
    // Create a wrapper div to contain style tags and body content
    const wrapper = document.createElement("div");
    const stylesHtml = Array.from(doc.head.querySelectorAll("style"))
      .map((s) => s.outerHTML)
      .join("\n");
    
    wrapper.innerHTML = `${stylesHtml}\n${doc.body.innerHTML}`;

    const opt = {
      margin:       0,
      filename:     `invoice-${order.order_number ?? order.id}.pdf`,
      image:        { type: "jpeg", quality: 0.98 },
      html2canvas:  { scale: 2.5, useCORS: true, letterRendering: true },
      jsPDF:        { unit: "in", format: "letter", orientation: "portrait" }
    };

    html2pdf().set(opt).from(wrapper).save();
  };

  /* ── states ── */
  if (loading) return (
    <Layout>
      <div style={{ display:"flex", justifyContent:"center", alignItems:"center", minHeight:"60vh" }}>
        <div style={{ textAlign:"center" }}>
          <div className="spinner-border text-primary" role="status" />
          <p style={{ marginTop:12, color:"#6b7280", fontSize:14 }}>Loading order details…</p>
        </div>
      </div>
    </Layout>
  );

  if (error) return (
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
    page:       { background:"#f8f9fb", minHeight:"100vh", padding:"2rem 0" },
    card:       { background:"#fff", borderRadius:14, boxShadow:"0 1px 6px rgba(0,0,0,.07)", padding:"24px 28px", marginBottom:20 },
    sectionTtl: { fontSize:12, fontWeight:700, textTransform:"uppercase", letterSpacing:"1px", color:"#9ca3af", marginBottom:14 },
    infoLabel:  { fontSize:13, color:"#6b7280", marginBottom:4 },
    infoVal:    { fontSize:15, fontWeight:600, color:"#111827", marginBottom:0 },
    badge:      { display:"inline-flex", alignItems:"center", gap:5, padding:"4px 12px", borderRadius:20, fontSize:13, fontWeight:600 },
    divider:    { height:1, background:"#f0f0f0", margin:"16px 0" },
    btnPrimary: {
      display:"inline-flex", alignItems:"center", gap:6,
      padding:"9px 18px", borderRadius:8, fontSize:13, fontWeight:600,
      background:"#4f46e5", color:"#fff", border:"none", cursor:"pointer",
      transition:"opacity .2s",
    },
    btnOutline: {
      display:"inline-flex", alignItems:"center", gap:6,
      padding:"9px 18px", borderRadius:8, fontSize:13, fontWeight:600,
      background:"transparent", color:"#4f46e5",
      border:"1.5px solid #4f46e5", cursor:"pointer", transition:"background .2s",
    },
    btnGhost: {
      display:"inline-flex", alignItems:"center", gap:6,
      padding:"9px 18px", borderRadius:8, fontSize:13, fontWeight:600,
      background:"transparent", color:"#6b7280",
      border:"1.5px solid #d1d5db", cursor:"pointer", transition:"background .2s",
    },
    th: { padding:"12px 16px", fontSize:12, fontWeight:700, textTransform:"uppercase", letterSpacing:".5px", color:"#6b7280", borderBottom:"1px solid #f0f0f0", textAlign:"left" },
    td: { padding:"14px 16px", fontSize:14, color:"#374151", borderBottom:"1px solid #f9fafb", verticalAlign:"middle" },
  };

  /* ── render ── */
  return (
    <Layout>
      <div style={s.page}>
        <div className="container">
          <div className="row g-4">

            {/* Sidebar */}
            <div className="col-md-3">
              <AccountSidebar />
            </div>

            {/* Main */}
            <div className="col-md-9">

              {/* ── Top bar ── */}
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
                <div>
                  <Link to="/account/orders" style={{ fontSize:13, color:"#6b7280", textDecoration:"none" }}>
                    ← Back to Orders
                  </Link>
                  <h4 style={{ margin:"6px 0 0", fontWeight:700, color:"#111827" }}>
                    Order <span style={{ color:"#4f46e5" }}>#{order.order_number ?? order.id}</span>
                  </h4>
                </div>
                <div style={{ display:"flex", gap:8 }}>
                  <button style={s.btnGhost} onClick={handleDownload}>
                    ↓ Download
                  </button>
                  <button style={s.btnOutline} onClick={() => setShowInvoice(true)}>
                    👁 View Invoice
                  </button>
                  <button style={s.btnPrimary} onClick={handlePrint}>
                    🖨 Print Invoice
                  </button>
                </div>
              </div>

              {/* ── Order meta cards ── */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:20 }}>

                {/* Order Info */}
                <div style={s.card}>
                  <p style={s.sectionTtl}>Order Info</p>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
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
                      <p style={s.infoVal}>{(order.payment_method ?? "—").toUpperCase()}</p>
                    </div>
                    <div>
                      <p style={s.infoLabel}>Payment Status</p>
                      <p style={{ ...s.infoVal, color: order.payment_status === "paid" ? "#10b981" : "#f59e0b" }}>
                        {(order.payment_status ?? "—").toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Shipping */}
                <div style={s.card}>
                  <p style={s.sectionTtl}>Ship To</p>
                  <p style={{ fontSize:15, fontWeight:600, color:"#111827", marginBottom:4 }}>{order.name ?? "—"}</p>
                  <p style={{ fontSize:13, color:"#6b7280", lineHeight:1.7, margin:0 }}>
                    {order.address}<br/>
                    {[order.city, order.state, order.zip].filter(Boolean).join(", ")}<br/>
                    {order.country}
                  </p>
                  {order.phone && (
                    <p style={{ fontSize:13, color:"#6b7280", marginTop:6 }}>📞 {order.phone}</p>
                  )}
                </div>
              </div>

              {/* ── Items Table ── */}
              <div style={s.card}>
                <p style={s.sectionTtl}>Items Ordered</p>
                <table style={{ width:"100%", borderCollapse:"collapse" }}>
                  <thead>
                    <tr style={{ background:"#f8f9fb" }}>
                      <th style={s.th}>Product</th>
                      <th style={{ ...s.th, textAlign:"center" }}>Qty</th>
                      <th style={{ ...s.th, textAlign:"right" }}>Unit Price</th>
                      <th style={{ ...s.th, textAlign:"right" }}>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id}>
                        <td style={s.td}>
                          <span style={{ fontWeight:600, color:"#111827" }}>{item.name}</span>
                          {item.sku && <span style={{ display:"block", fontSize:12, color:"#9ca3af" }}>SKU: {item.sku}</span>}
                        </td>
                        <td style={{ ...s.td, textAlign:"center" }}>
                          <span style={{ fontWeight:600 }}>{item.quantity}</span>
                        </td>
                        <td style={{ ...s.td, textAlign:"right" }}>{fmt(item.price)}</td>
                        <td style={{ ...s.td, textAlign:"right", fontWeight:600, color:"#111827" }}>
                          {fmt(item.price * item.quantity)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Totals */}
                <div style={{ display:"flex", justifyContent:"flex-end", marginTop:16 }}>
                  <div style={{ minWidth:260 }}>
                    {[
                      ["Subtotal",   fmt(order.sub_total ?? order.subtotal)],
                      ["Shipping",   fmt(order.shipping_charges ?? 0)],
                      ["Discount",  `-${fmt(order.discount ?? 0)}`],
                    ].map(([label, val]) => (
                      <div key={label} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", fontSize:14, color:"#6b7280", borderBottom:"1px solid #f0f0f0" }}>
                        <span>{label}</span><span>{val}</span>
                      </div>
                    ))}
                    <div style={{ display:"flex", justifyContent:"space-between", padding:"12px 0 0", fontSize:17, fontWeight:700, color:"#4f46e5" }}>
                      <span>Grand Total</span><span>{fmt(total)}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>{/* /col-md-9 */}
          </div>{/* /row */}
        </div>{/* /container */}
      </div>

      {/* ══════════════════════════════════════════════════
          Invoice Preview Modal
      ══════════════════════════════════════════════════ */}
      {showInvoice && (
        <div style={{
          position:"fixed", inset:0, background:"rgba(0,0,0,.55)", zIndex:1050,
          display:"flex", alignItems:"center", justifyContent:"center", padding:20,
        }} onClick={() => setShowInvoice(false)}>
          <div style={{
            background:"#fff", borderRadius:16, width:"100%", maxWidth:820,
            maxHeight:"92vh", display:"flex", flexDirection:"column", overflow:"hidden",
            boxShadow:"0 25px 50px rgba(0,0,0,.25)",
          }} onClick={(e) => e.stopPropagation()}>

            {/* Modal header */}
            <div style={{
              display:"flex", justifyContent:"space-between", alignItems:"center",
              padding:"18px 24px", borderBottom:"1px solid #f0f0f0",
            }}>
              <h5 style={{ margin:0, fontWeight:700, color:"#111827" }}>
                Invoice Preview — #{order.order_number ?? order.id}
              </h5>
              <div style={{ display:"flex", gap:8 }}>
                <button style={s.btnOutline} onClick={handleDownload}>↓ Download</button>
                <button style={s.btnPrimary} onClick={handlePrint}>🖨 Print</button>
                <button style={s.btnGhost} onClick={() => setShowInvoice(false)}>✕</button>
              </div>
            </div>

            {/* Invoice body */}
            <div ref={invoiceRef} style={{ overflowY:"auto", flex:1, padding:"32px 40px", fontFamily:"'Segoe UI',Arial,sans-serif" }}>
              {/* Header */}
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", paddingBottom:24, borderBottom:"3px solid #4f46e5", marginBottom:28 }}>
                <div style={{ fontSize:26, fontWeight:800, color:"#4f46e5" }}>
                  My<span style={{ color:"#111827" }}>Store</span>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:22, fontWeight:700, color:"#111827" }}>INVOICE</div>
                  <div style={{ fontSize:13, color:"#6b7280", marginTop:4 }}>
                    #INV-{String(order.id).padStart(5, "0")}
                  </div>
                  <div style={{ fontSize:13, color:"#6b7280" }}>{fmtDate(order.created_at)}</div>
                </div>
              </div>

              {/* Meta grid */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:28 }}>
                {[
                  ["Billed To", <>{order.name}<br/><span style={{ color:"#6b7280",fontSize:13 }}>{order.email}<br/>{order.phone}</span></>],
                  ["Ship To",   <>{order.address}<br/>{[order.city, order.state, order.zip].filter(Boolean).join(", ")}<br/>{order.country}</>],
                  ["Order Info",<>Order # {order.order_number ?? order.id}<br/>Payment: {(order.payment_method ?? "").toUpperCase()}<br/>Payment Status: {order.payment_status ?? "—"}</>],
                  ["Status",    <StatusBadge status={order.status} />],
                ].map(([title, content]) => (
                  <div key={title} style={{ background:"#f8f9ff", borderRadius:10, padding:"16px 18px" }}>
                    <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:"1px", color:"#9ca3af", fontWeight:700, marginBottom:8 }}>{title}</div>
                    <div style={{ fontSize:14, color:"#111827", lineHeight:1.7 }}>{content}</div>
                  </div>
                ))}
              </div>

              {/* Items table */}
              <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <thead>
                  <tr style={{ background:"#4f46e5", color:"#fff" }}>
                    {["Product","Qty","Unit Price","Total"].map((h, i) => (
                      <th key={h} style={{ padding:"12px 12px", fontSize:12, fontWeight:600, textAlign: i===1?"center": i>1?"right":"left" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) => (
                    <tr key={item.id} style={{ background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                      <td style={{ padding:"12px", fontSize:14, color:"#374151", borderBottom:"1px solid #f0f0f0" }}>{item.name}</td>
                      <td style={{ padding:"12px", fontSize:14, color:"#374151", borderBottom:"1px solid #f0f0f0", textAlign:"center" }}>{item.quantity}</td>
                      <td style={{ padding:"12px", fontSize:14, color:"#374151", borderBottom:"1px solid #f0f0f0", textAlign:"right" }}>{fmt(item.price)}</td>
                      <td style={{ padding:"12px", fontSize:14, fontWeight:600, color:"#111827", borderBottom:"1px solid #f0f0f0", textAlign:"right" }}>{fmt(item.price * item.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals */}
              <div style={{ display:"flex", justifyContent:"flex-end", marginTop:20 }}>
                <div style={{ minWidth:260 }}>
                  {[
                    ["Subtotal", fmt(order.sub_total ?? order.subtotal)],
                    ["Shipping", fmt(order.shipping_charges ?? 0)],
                    ["Discount", `-${fmt(order.discount ?? 0)}`],
                  ].map(([l, v]) => (
                    <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", fontSize:14, color:"#6b7280", borderBottom:"1px solid #f0f0f0" }}>
                      <span>{l}</span><span>{v}</span>
                    </div>
                  ))}
                  <div style={{ display:"flex", justifyContent:"space-between", padding:"12px 0 0", fontSize:18, fontWeight:700, color:"#4f46e5" }}>
                    <span>Grand Total</span><span>{fmt(total)}</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div style={{ marginTop:40, paddingTop:18, borderTop:"1px solid #e5e7eb", textAlign:"center", fontSize:12, color:"#9ca3af" }}>
                Thank you for your purchase! Questions? Contact support@mystore.com
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default OrderDetails;
