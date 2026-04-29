export const AppConfig = {
  APP_NAME: 'SpendWise AI',
  APP_VERSION: '1.0.0',
  API_TIMEOUT: 10000,
  MIN_PASSWORD_LENGTH: 6,
  MAX_DESCRIPTION_LENGTH: 100,
  BASE_URL: 'http://10.171.181.116:8000',

} as const;

export const RiskThresholds = {
  SAFE: 0.4,
  CAUTION: 0.15,
  DANGER: 0.15,
} as const;