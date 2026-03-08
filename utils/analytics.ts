// ── SpendWise AI — Analytics Utilities ───────────────────
// Placeholder analytics layer — swap with real provider (e.g. Segment, Amplitude)

type EventProperties = Record<string, string | number | boolean | null>;

let analyticsEnabled = true;

/**
 * Enable or disable analytics (e.g. based on user preference)
 */
export const setAnalyticsEnabled = (enabled: boolean): void => {
  analyticsEnabled = enabled;
};

/**
 * Track a screen view
 */
export const trackScreen = (screenName: string, props?: EventProperties): void => {
  if (!analyticsEnabled) return;
  if (__DEV__) console.log(`[Analytics] Screen: ${screenName}`, props);
};

/**
 * Track a user action event
 */
export const trackEvent = (eventName: string, props?: EventProperties): void => {
  if (!analyticsEnabled) return;
  if (__DEV__) console.log(`[Analytics] Event: ${eventName}`, props);
};

/**
 * Track expense creation
 */
export const trackExpenseCreated = (amount: number, category: string): void => {
  trackEvent('expense_created', { amount, category });
};

/**
 * Track smart purchase check
 */
export const trackSmartPurchaseCheck = (
  amount: number,
  decision: 'safe' | 'caution' | 'risky'
): void => {
  trackEvent('smart_purchase_checked', { amount, decision });
};

/**
 * Track login
 */
export const trackLogin = (): void => {
  trackEvent('user_login');
};

/**
 * Track logout
 */
export const trackLogout = (): void => {
  trackEvent('user_logout');
};
