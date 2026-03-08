// ── SpendWise AI — Deep Linking Config ───────────────────
import { LinkingOptions } from '@react-navigation/native';

export const linking: LinkingOptions<any> = {
  prefixes: ['spendwise://', 'https://spendwise.ai'],
  config: {
    screens: {
      '(tabs)': {
        screens: {
          dashboard: 'dashboard',
          'add-expense': 'add-expense',
          history: 'history',
          insights: 'insights',
          profile: 'profile',
        },
      },
      auth: {
        screens: {
          login: 'login',
          register: 'register',
        },
      },
      'modals/smart-purchase': 'smart-purchase',
      'modals/confirmation': 'confirmation',
    },
  },
};
