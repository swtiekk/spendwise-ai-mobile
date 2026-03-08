export const Messages = {
  auth: {
    loginSuccess: 'Logged in successfully',
    loginError: 'Invalid email or password',
    registerSuccess: 'Account created successfully',
  },
  validation: {
    emailRequired: 'Email is required',
    emailInvalid: 'Invalid email format',
    passwordRequired: 'Password is required',
    passwordTooShort: 'Password must be at least 6 characters',
  },
  errors: {
    networkError: 'Network error. Please try again.',
    unknownError: 'An unexpected error occurred',
  },
} as const;