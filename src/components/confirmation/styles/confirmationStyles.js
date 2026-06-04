/**
 * Centralised inline-style definitions for the Confirmation page.
 * Kept as a plain JS object so they remain co-locatable with the
 * component tree while staying out of the JSX files themselves.
 */
const confirmationStyles = {
  /* ── Layout ─────────────────────────────────────────────── */
  centered: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '50vh',
    textAlign: 'center',
  },

  /* ── Success Banner ──────────────────────────────────────── */
  successBanner: {
    textAlign: 'center',
    padding: '2.5rem 1rem 1.5rem',
  },
  checkCircle: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    height: 64,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #10b981, #059669)',
    boxShadow: '0 4px 20px rgba(16,185,129,0.35)',
    marginBottom: '1rem',
    animation: 'popIn 0.45s cubic-bezier(.17,.67,.28,1.2)',
  },
  successTitle: {
    fontSize: '1.6rem',
    fontWeight: 700,
    color: '#1e293b',
    margin: '0 0 0.35rem',
  },
  successSubtitle: {
    fontSize: '0.92rem',
    color: '#64748b',
    margin: 0,
    maxWidth: 420,
    marginInline: 'auto',
  },

  /* ── Cards ───────────────────────────────────────────────── */
  card: {
    background: '#fff',
    borderRadius: 12,
    border: '1px solid #e2e8f0',
    marginBottom: '1rem',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
  },
  cardSection: {
    padding: '1.25rem',
  },
  cardSectionRight: {
    borderLeft: '1px solid #f1f5f9',
  },
  sectionTitle: {
    fontSize: '0.75rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: '#94a3b8',
    marginBottom: '0.85rem',
  },

  /* ── Info Rows ───────────────────────────────────────────── */
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '0.3rem 0',
    gap: '0.75rem',
  },
  infoLabel: {
    fontSize: '0.85rem',
    color: '#64748b',
    flexShrink: 0,
  },
  infoValue: {
    fontSize: '0.85rem',
    fontWeight: 500,
    color: '#1e293b',
    textAlign: 'right',
    wordBreak: 'break-word',
  },

  /* ── Status Badge ────────────────────────────────────────── */
  statusBadge: {
    display: 'inline-block',
    padding: '0.15rem 0.65rem',
    borderRadius: 999,
    fontSize: '0.75rem',
    fontWeight: 600,
    textTransform: 'capitalize',
  },

  /* ── Items Table ─────────────────────────────────────────── */
  tableHead: {
    backgroundColor: '#f8fafc',
  },
  th: {
    padding: '0.65rem 1.25rem',
    fontWeight: 600,
    fontSize: '0.78rem',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    color: '#94a3b8',
    border: 'none',
    borderBottom: '1px solid #e2e8f0',
  },
  td: {
    padding: '0.7rem 1.25rem',
    verticalAlign: 'middle',
    borderColor: '#f1f5f9',
    color: '#334155',
  },

  /* ── Price Summary ───────────────────────────────────────── */
  summaryBlock: {
    borderTop: '1px solid #e2e8f0',
    padding: '1rem 1.25rem',
    maxWidth: 320,
    marginLeft: 'auto',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.25rem 0',
    fontSize: '0.88rem',
    color: '#475569',
  },
  summaryRowBold: {
    fontWeight: 700,
    color: '#0f172a',
    paddingTop: '0.5rem',
  },
  divider: {
    height: 1,
    background: '#e2e8f0',
    margin: '0.4rem 0',
  },

  /* ── Action Buttons ──────────────────────────────────────── */
  actions: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.75rem',
    paddingTop: '0.5rem',
    flexWrap: 'wrap',
  },
  btnPrimary: {
    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    color: '#fff',
    padding: '0.6rem 1.8rem',
    borderRadius: 8,
    fontWeight: 600,
    fontSize: '0.9rem',
    border: 'none',
    boxShadow: '0 2px 8px rgba(37,99,235,0.25)',
    transition: 'transform 0.15s, box-shadow 0.15s',
  },
  btnOutline: {
    background: 'transparent',
    color: '#3b82f6',
    padding: '0.6rem 1.8rem',
    borderRadius: 8,
    fontWeight: 600,
    fontSize: '0.9rem',
    border: '1.5px solid #3b82f6',
    transition: 'background 0.15s, color 0.15s',
  },
}

export default confirmationStyles
