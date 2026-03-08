// ── SpendWise AI — Formatting Utilities ──────────────────

/**
 * Format a number as Philippine Peso currency
 */
export const formatCurrency = (amount: number, showSymbol = true): string => {
  const formatted = amount.toLocaleString('en-PH', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return showSymbol ? `₱${formatted}` : formatted;
};

/**
 * Format a date string to readable format
 */
export const formatDate = (
  date: string | Date,
  style: 'short' | 'medium' | 'long' = 'medium'
): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const options: Intl.DateTimeFormatOptions =
    style === 'short'
      ? { month: 'short', day: 'numeric' }
      : style === 'long'
      ? { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      : { year: 'numeric', month: 'short', day: 'numeric' };
  return d.toLocaleDateString('en-PH', options);
};

/**
 * Format a date to relative time (e.g. "2h ago", "3d ago")
 */
export const formatRelativeTime = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(d, 'short');
};

/**
 * Capitalize first letter of a string
 */
export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

/**
 * Truncate string to max length
 */
export const truncate = (str: string, maxLength: number): string =>
  str.length > maxLength ? `${str.slice(0, maxLength)}...` : str;

/**
 * Format a percentage value
 */
export const formatPercent = (value: number, decimals = 0): string =>
  `${value.toFixed(decimals)}%`;

/**
 * Format large numbers with K/M suffix
 */
export const formatCompact = (amount: number): string => {
  if (amount >= 1_000_000) return `₱${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `₱${(amount / 1_000).toFixed(1)}K`;
  return formatCurrency(amount);
};
