import React from 'react'
import styles from '../styles/confirmationStyles'

/**
 * A single row inside the price summary block.
 * Pass `bold` to apply the grand-total emphasis style.
 * @param {string}  label - e.g. "Subtotal", "Shipping", "Grand Total"
 * @param {string}  value - Formatted currency string
 * @param {boolean} bold  - Whether to render the row in bold (grand total)
 */
const SummaryRow = ({ label, value, bold = false }) => (
  <div style={{ ...styles.summaryRow, ...(bold ? styles.summaryRowBold : {}) }}>
    <span>{label}</span>
    <span style={bold ? { fontSize: '1.1rem' } : {}}>{value}</span>
  </div>
)

export default SummaryRow
