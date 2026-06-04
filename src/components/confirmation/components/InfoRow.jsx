import React from 'react'
import styles from '../styles/confirmationStyles'

/**
 * A single label/value row used inside the order & shipping detail cards.
 * @param {string}          label - Left-side descriptor text
 * @param {string|ReactNode} value - Right-side content (text or JSX)
 */
const InfoRow = ({ label, value }) => (
  <div style={styles.infoRow}>
    <span style={styles.infoLabel}>{label}</span>
    <span style={styles.infoValue}>{value}</span>
  </div>
)

export default InfoRow
