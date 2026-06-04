import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import Layout from '../common/Layout'

// Services
import { getOrderByIdService } from '../../services/OrderServices'

// Helpers
import { formatCurrency, formatDate } from './helpers/formatters'

// Styles
import styles from './styles/confirmationStyles'

// Sub-components
import SuccessBanner  from './components/SuccessBanner'
import InfoRow        from './components/InfoRow'
import StatusBadge    from './components/StatusBadge'
import SummaryRow     from './components/SummaryRow'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorState     from './components/ErrorState'

/* ─────────────────────────────────────────────────────────────────────── */

const Confirmation = () => {
  const { id } = useParams()
  const [orderData, setOrderData] = useState(null)
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState(null)

  const fetchOrder = useCallback(async () => {
    try {
      setLoading(true)
      const { data } = await getOrderByIdService(id)
      setOrderData(data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load order details.')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchOrder()
  }, [fetchOrder])

  const items = useMemo(() => orderData?.items || [], [orderData])

  /* ── Early-exit states ────────────────────────────────────────── */
  if (loading)    return <LoadingSpinner />
  if (error)      return <ErrorState message={error} />
  if (!orderData) return <ErrorState message="Order not found." />

  /* ── Full page ────────────────────────────────────────────────── */
  return (
    <Layout>
      <div className="container" style={{ maxWidth: 780, padding: '2rem 1rem 3rem' }}>

        {/* ── Success Banner ──────────────────────────────────── */}
        <SuccessBanner />

        {/* ── Order & Customer Details ────────────────────────── */}
        <div style={styles.card}>
          <div className="row g-0">
            {/* Order Info */}
            <div className="col-md-6" style={styles.cardSection}>
              <h6 style={styles.sectionTitle}>Order Details</h6>
              <InfoRow label="Order ID" value={`#${orderData.id}`} />
              <InfoRow label="Date"     value={formatDate(orderData.created_at)} />
              <InfoRow label="Status"   value={<StatusBadge status={orderData.status} />} />
              <InfoRow label="Payment"  value={orderData.payment_method?.toUpperCase()} />
            </div>

            {/* Shipping Info */}
            <div className="col-md-6" style={{ ...styles.cardSection, ...styles.cardSectionRight }}>
              <h6 style={styles.sectionTitle}>Shipping To</h6>
              <InfoRow label="Name"  value={orderData.name} />
              <InfoRow label="Email" value={orderData.email} />
              <InfoRow label="Phone" value={orderData.phone} />
              <InfoRow
                label="Address"
                value={[
                  orderData.address,
                  orderData.city,
                  orderData.state,
                  orderData.zip,
                  orderData.country,
                ]
                  .filter(Boolean)
                  .join(', ')}
              />
            </div>
          </div>
        </div>

        {/* ── Items Table ─────────────────────────────────────── */}
        <div style={styles.card}>
          <h6 style={{ ...styles.sectionTitle, padding: '1rem 1.25rem 0' }}>Items Ordered</h6>
          <div className="table-responsive">
            <table className="table mb-0" style={{ fontSize: '0.9rem' }}>
              <thead>
                <tr style={styles.tableHead}>
                  <th style={styles.th}>Product</th>
                  <th style={styles.th} className="text-end">Price</th>
                  <th style={styles.th} className="text-center">Qty</th>
                  <th style={styles.th} className="text-end">Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td style={styles.td}>{item.name}</td>
                    <td style={styles.td} className="text-end">{formatCurrency(item.price)}</td>
                    <td style={styles.td} className="text-center">{item.quantity}</td>
                    <td style={styles.td} className="text-end fw-semibold">
                      {formatCurrency(item.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Price Summary ───────────────────────────────── */}
          <div style={styles.summaryBlock}>
            <SummaryRow label="Subtotal" value={formatCurrency(orderData.sub_total)} />
            <SummaryRow label="Shipping" value={formatCurrency(orderData.shipping_charges)} />
            <SummaryRow label="Discount" value={`-${formatCurrency(orderData.discount)}`} />
            <div style={styles.divider} />
            <SummaryRow label="Grand Total" value={formatCurrency(orderData.grand_total)} bold />
          </div>
        </div>

        {/* ── Actions ─────────────────────────────────────────── */}
        <div style={styles.actions}>
          <Link to="/"               className="btn" style={styles.btnPrimary}>Continue Shopping</Link>
          <Link to="/account/orders" className="btn" style={styles.btnOutline}>View All Orders</Link>
        </div>

      </div>
    </Layout>
  )
}

export default Confirmation
