// ── SpendWise AI — Validation Utilities ──────────────────

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/** Validate email format */
export const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/** Validate password meets minimum requirements */
export const isValidPassword = (password: string): boolean =>
  password.length >= 6;

/** Validate that a number is positive */
export const isPositiveNumber = (value: number): boolean =>
  !isNaN(value) && value > 0;

/** Validate login form */
export const validateLoginForm = (
  email: string,
  password: string
): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!email.trim()) errors.email = 'Email is required';
  else if (!isValidEmail(email)) errors.email = 'Invalid email format';

  if (!password) errors.password = 'Password is required';
  else if (!isValidPassword(password))
    errors.password = 'Password must be at least 6 characters';

  return { isValid: Object.keys(errors).length === 0, errors };
};

/** Validate registration form */
export const validateRegisterForm = (data: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!data.name.trim()) errors.name = 'Name is required';

  if (!data.email.trim()) errors.email = 'Email is required';
  else if (!isValidEmail(data.email)) errors.email = 'Invalid email format';

  if (!data.password) errors.password = 'Password is required';
  else if (!isValidPassword(data.password))
    errors.password = 'Password must be at least 6 characters';

  if (data.password !== data.confirmPassword)
    errors.confirmPassword = 'Passwords do not match';

  return { isValid: Object.keys(errors).length === 0, errors };
};

/** Validate expense form */
export const validateExpenseForm = (data: {
  amount: string;
  category: string;
  description: string;
}): ValidationResult => {
  const errors: Record<string, string> = {};
  const amount = parseFloat(data.amount);

  if (!data.amount || isNaN(amount)) errors.amount = 'Amount is required';
  else if (!isPositiveNumber(amount)) errors.amount = 'Amount must be greater than 0';
  else if (amount > 1_000_000) errors.amount = 'Amount seems too large';

  if (!data.category) errors.category = 'Please select a category';

  if (data.description && data.description.length > 100)
    errors.description = 'Description must be under 100 characters';

  return { isValid: Object.keys(errors).length === 0, errors };
};

/** Validate smart purchase request */
export const validatePurchaseRequest = (amount: string): ValidationResult => {
  const errors: Record<string, string> = {};
  const value = parseFloat(amount);

  if (!amount || isNaN(value)) errors.amount = 'Enter a valid amount';
  else if (!isPositiveNumber(value)) errors.amount = 'Amount must be greater than 0';

  return { isValid: Object.keys(errors).length === 0, errors };
};
