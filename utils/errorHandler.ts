// ── SpendWise AI — Error Handler ─────────────────────────

export interface AppError {
  message: string;
  code?: string;
  statusCode?: number;
}

/**
 * Extract a readable message from any thrown error
 */
export const getErrorMessage = (error: unknown): string => {
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  if (typeof error === 'object' && error !== null) {
    const e = error as any;
    return e?.message ?? e?.error ?? 'An unexpected error occurred';
  }
  return 'An unexpected error occurred';
};

/**
 * Map HTTP status codes to user-friendly messages
 */
export const getHttpErrorMessage = (statusCode: number): string => {
  const messages: Record<number, string> = {
    400: 'Invalid request. Please check your input.',
    401: 'Session expired. Please log in again.',
    403: 'You do not have permission to do that.',
    404: 'The requested resource was not found.',
    409: 'A conflict occurred. Please try again.',
    422: 'Validation failed. Please check your data.',
    429: 'Too many requests. Please slow down.',
    500: 'Server error. Please try again later.',
    503: 'Service unavailable. Please try again later.',
  };
  return messages[statusCode] ?? `Error ${statusCode}. Please try again.`;
};

/**
 * Log errors in development only
 */
export const logError = (context: string, error: unknown): void => {
  if (__DEV__) {
    console.error(`[SpendWise][${context}]`, error);
  }
};

/**
 * Check if an error is a network error
 */
export const isNetworkError = (error: unknown): boolean => {
  if (error instanceof Error) {
    return (
      error.message.includes('Network') ||
      error.message.includes('network') ||
      error.message.includes('fetch') ||
      error.message.includes('timeout')
    );
  }
  return false;
};
