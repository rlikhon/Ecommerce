import React from 'react'
import styles from '../styles/confirmationStyles'

const SuccessBanner = () => (
  <div style={styles.successBanner}>
    <div style={styles.checkCircle}>
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
    <h2 style={styles.successTitle}>Order Confirmed!</h2>
    <p style={styles.successSubtitle}>
      Thank you for your purchase. We'll send you a notification once your order ships.
    </p>
  </div>
)

export default SuccessBanner
