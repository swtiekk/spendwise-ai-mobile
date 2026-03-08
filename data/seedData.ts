// ── SpendWise AI Mobile — Seed Data ──────────────────────
// Used for resetting app state during development/testing

import { currentUser, mockAlerts, mockCategories, mockCategoryBreakdown, mockExpenses, mockInsights, mockMetrics, mockSavingsGoals } from './mockData';

// ── Seed Users ────────────────────────────────────────────
export const seedUsers = [
  {
    id: 'u1',
    name: 'Skatrina Golez',
    email: 'skatrinagolez@gmail.com',
    password: 'admin123',
    incomeType: 'Monthly Salary',
    incomeCycle: 'Monthly',
    balance: 12450,
    income: 18000,
    daysLeft: 14,
    savingsGoal: 5000,
    currentSavings: 3200,
    spenderType: 'Balanced',
    joinedDate: '2025-01-15',
  },
  {
    id: 'u2',
    name: 'Alex Santos',
    email: 'alex@spendwise.ai',
    password: 'demo123',
    incomeType: 'Freelance',
    incomeCycle: 'Weekly',
    balance: 8200,
    income: 12000,
    daysLeft: 7,
    savingsGoal: 3000,
    currentSavings: 1800,
    spenderType: 'Impulsive',
    joinedDate: '2025-02-20',
  },
];

// ── Seed Expenses ─────────────────────────────────────────
export const seedExpenses = [
  ...mockExpenses,
  // Additional historical data — May 2025
  { id: 'e11', title: 'Chowking',        category: 'Food',          amount: 120,  date: '2025-05-31', icon: '🍔', color: '#F59E0B' },
  { id: 'e12', title: 'Bus Fare',        category: 'Transport',     amount: 45,   date: '2025-05-31', icon: '🚌', color: '#6366F1' },
  { id: 'e13', title: 'Lazada Order',    category: 'Shopping',      amount: 899,  date: '2025-05-30', icon: '🛍️', color: '#EC4899' },
  { id: 'e14', title: 'Globe Load',      category: 'Utilities',     amount: 100,  date: '2025-05-29', icon: '💡', color: '#2DD4BF' },
  { id: 'e15', title: 'Spa Session',     category: 'Health',        amount: 450,  date: '2025-05-28', icon: '💊', color: '#10B981' },
  { id: 'e16', title: 'Spotify',         category: 'Entertainment', amount: 129,  date: '2025-05-27', icon: '🎮', color: '#8B5CF6' },
  { id: 'e17', title: 'Mang Inasal',     category: 'Food',          amount: 155,  date: '2025-05-26', icon: '🍔', color: '#F59E0B' },
  { id: 'e18', title: 'Tricycle',        category: 'Transport',     amount: 20,   date: '2025-05-26', icon: '🚌', color: '#6366F1' },
  { id: 'e19', title: 'Savings Deposit', category: 'Savings',       amount: 2000, date: '2025-05-25', icon: '💰', color: '#1A2B47' },
  { id: 'e20', title: 'Water Bill',      category: 'Utilities',     amount: 280,  date: '2025-05-24', icon: '💡', color: '#2DD4BF' },
];

// ── Seed Income Records ───────────────────────────────────
export const seedIncome = [
  { id: 'i1', title: 'Monthly Salary',   amount: 18000, date: '2025-06-01', category: 'Salary',    icon: '💼', color: '#10B981' },
  { id: 'i2', title: '13th Month Pay',   amount: 9000,  date: '2025-05-15', category: 'Bonus',     icon: '🎁', color: '#6366F1' },
  { id: 'i3', title: 'Freelance Work',   amount: 2500,  date: '2025-05-10', category: 'Freelance', icon: '💻', color: '#F59E0B' },
  { id: 'i4', title: 'Monthly Salary',   amount: 18000, date: '2025-05-01', category: 'Salary',    icon: '💼', color: '#10B981' },
];

// ── Seed Notifications ────────────────────────────────────
export const seedNotifications = [
  { id: 'n1', type: 'warning',  title: 'High Food Spending',    message: "You've spent ₱565 on food this month — 40% above average.", time: '2025-06-10T08:30:00', read: false },
  { id: 'n2', type: 'critical', title: 'Budget Risk Detected',  message: 'At current spending, funds may run out 4 days early.',       time: '2025-06-09T14:00:00', read: false },
  { id: 'n3', type: 'success',  title: 'Savings Goal On Track', message: "You've saved ₱3,200 of your ₱5,000 goal — great progress!",  time: '2025-06-08T09:00:00', read: true  },
  { id: 'n4', type: 'info',     title: 'Weekly Summary Ready',  message: 'Your spending report for the week is available.',            time: '2025-06-07T18:00:00', read: true  },
  { id: 'n5', type: 'warning',  title: 'Shopping Spike',        message: 'Shopping expenses increased by ₱760 compared to last week.', time: '2025-06-06T11:00:00', read: true  },
];

// ── Seed Smart Purchase Scenarios ────────────────────────
export const seedSmartPurchases = [
  {
    id: 'sp1',
    item: 'New Smartphone',
    price: 15999,
    category: 'Shopping',
    decision: 'defer',
    reason: 'This purchase would use 128% of your remaining balance. Consider waiting until next pay cycle.',
    riskLevel: 'critical',
    date: '2025-06-08',
  },
  {
    id: 'sp2',
    item: 'Running Shoes',
    price: 2499,
    category: 'Health',
    decision: 'proceed',
    reason: 'This purchase is within budget and aligns with your health goals.',
    riskLevel: 'safe',
    date: '2025-06-07',
  },
  {
    id: 'sp3',
    item: 'Groceries (Weekly)',
    price: 800,
    category: 'Food',
    decision: 'proceed',
    reason: 'Essential purchase. No significant budget impact.',
    riskLevel: 'safe',
    date: '2025-06-06',
  },
];

// ── Seed ML Cluster Profiles ──────────────────────────────
export const seedClusterProfiles = [
  {
    id: 'cl1',
    label: 'Balanced Spender',
    description: 'Maintains a healthy balance between spending and saving. Low financial risk.',
    percentage: 38,
    color: '#10B981',
    icon: '⚖️',
  },
  {
    id: 'cl2',
    label: 'Impulsive Spender',
    description: 'Frequent unplanned purchases. Moderate-to-high financial risk.',
    percentage: 29,
    color: '#F59E0B',
    icon: '🛒',
  },
  {
    id: 'cl3',
    label: 'Conservative Saver',
    description: 'Minimal discretionary spending. Prioritizes savings aggressively.',
    percentage: 21,
    color: '#6366F1',
    icon: '🏦',
  },
  {
    id: 'cl4',
    label: 'High-Risk Spender',
    description: 'Consistently overspends income. High probability of fund depletion.',
    percentage: 12,
    color: '#EF4444',
    icon: '⚠️',
  },
];

// ── Full seed state (use to reset app) ───────────────────
export const seedState = {
  currentUser,
  expenses:          seedExpenses,
  income:            seedIncome,
  categories:        mockCategories,
  alerts:            mockAlerts,
  metrics:           mockMetrics,
  insights:          mockInsights,
  categoryBreakdown: mockCategoryBreakdown,
  savingsGoals:      mockSavingsGoals,
  notifications:     seedNotifications,
  smartPurchases:    seedSmartPurchases,
  clusterProfiles:   seedClusterProfiles,
};