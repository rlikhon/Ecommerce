import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../common/Layout'
import styles from '../styles/confirmationStyles'

/**
 * Full-page error state shown when the order fetch fails or returns nothing.
 * @param {string} message - Human-readable error description
 */
const ErrorState = ({ message }) => (
  <Layout>
    <div style={styles.centered}>
      <div style={{ fontSize: '3rem' }}>⚠️</div>
      <h4 className="mt-3">Something went wrong</h4>
      <p className="text-muted">{message}</p>
      <Link to="/" className="btn btn-primary mt-2">
        Back to Home
      </Link>
    </div>
  </Layout>
)

export default ErrorState
