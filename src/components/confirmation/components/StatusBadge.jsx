import React from 'react'
import styles from '../styles/confirmationStyles'
import { STATUS_COLORS } from '../helpers/formatters'

/**
 * Pill-shaped badge that renders the order status with a matching accent color.
 * Falls back to a neutral gray for any unrecognised status string.
 * @param {string} status - e.g. "pending" | "shipped" | "delivered"
 */
const StatusBadge = ({ status }) => {
  const color = STATUS_COLORS[status?.toLowerCase()] || '#6b7280'

  return (
    <span
      style={{
        ...styles.statusBadge,
        backgroundColor: `${color}18`,
        color,
        border: `1px solid ${color}40`,
      }}
    >
      {status}
    </span>
  )
}

export default StatusBadge
