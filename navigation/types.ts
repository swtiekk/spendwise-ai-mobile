// ── SpendWise AI — Navigation Types ──────────────────────

export type RootStackParamList = {
  index: undefined;
  '(tabs)': undefined;
  auth: undefined;
  'modals/smart-purchase': { amount?: number; category?: string } | undefined;
  'modals/confirmation': {
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm?: () => void;
  };
};

export type TabParamList = {
  dashboard: undefined;
  'add-expense': undefined;
  history: undefined;
  insights: undefined;
  profile: undefined;
  index: undefined;
  explore: undefined;
};

export type AuthParamList = {
  login: undefined;
  register: undefined;
};
