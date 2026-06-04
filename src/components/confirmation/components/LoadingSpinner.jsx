import React from 'react'
import Layout from '../../common/Layout'
import styles from '../styles/confirmationStyles'

/** Full-page centred loading state shown while fetching the order. */
const LoadingSpinner = () => (
  <Layout>
    <div style={styles.centered}>
      <div className="spinner-border text-primary" role="status" />
      <p className="mt-3 text-muted">Loading your order…</p>
    </div>
  </Layout>
)

export default LoadingSpinner
