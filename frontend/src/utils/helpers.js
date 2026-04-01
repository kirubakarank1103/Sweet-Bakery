// ─── Helper Utilities ────────────────────────────────────────────

// Format price in Indian Rupees
export const formatPrice = (amount) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

// Format date
export const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

// Truncate text
export const truncate = (text, len = 80) =>
  text.length > len ? text.slice(0, len) + '...' : text;

// Get order status color
export const statusColor = (status) => ({
  Pending:    '#f0a030',
  Processing: '#4c9ed4',
  Shipped:    '#b56fd4',
  Delivered:  '#4caf6e',
  Cancelled:  '#e85555',
}[status] || '#a89878');