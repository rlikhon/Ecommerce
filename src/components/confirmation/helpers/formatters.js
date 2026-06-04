/**
 * Formats a numeric value as a USD currency string.
 * @param {number|string} value
 * @returns {string}  e.g. "$12.00"
 */
export const formatCurrency = (value) =>
  Number(value || 0).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })

/**
 * Formats an ISO date string into a human-readable date + time.
 * @param {string} dateString
 * @returns {string}  e.g. "June 4, 2026 at 08:05 PM"
 */
export const formatDate = (dateString) => {
  if (!dateString) return '—'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Maps order status strings to their corresponding hex color values.
 * Any unknown status falls back to a neutral gray in the component.
 */
export const STATUS_COLORS = {
  pending: '#f59e0b',
  processing: '#3b82f6',
  shipped: '#8b5cf6',
  delivered: '#10b981',
  cancelled: '#ef4444',
}
