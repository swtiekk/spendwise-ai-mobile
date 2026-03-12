// ── SpendWise AI Mobile — Mock Data ──────────────────────

export const currentUser = {
  name: 'User Name',
  email: 'user@gmail.com',
  password: 'user123',
  incomeType: 'Monthly Salary',
  incomeCycle: 'Monthly',
  balance: 12450,
  income: 18000,
  daysLeft: 14,
  savingsGoal: 5000,
  currentSavings: 3200,
  spenderType: 'Balanced',
};

export const mockExpenses = [
  { id: 'e1',  title: 'Jollibee',        category: 'Food',          amount: 180,  date: '2025-06-10', icon: '🍔', color: '#F59E0B' },
  { id: 'e2',  title: 'Grab Ride',       category: 'Transport',     amount: 95,   date: '2025-06-10', icon: '🚌', color: '#6366F1' },
  { id: 'e3',  title: 'SM Shopping',     category: 'Shopping',      amount: 1200, date: '2025-06-09', icon: '🛍️', color: '#EC4899' },
  { id: 'e4',  title: 'Meralco Bill',    category: 'Utilities',     amount: 850,  date: '2025-06-09', icon: '💡', color: '#2DD4BF' },
  { id: 'e5',  title: 'Mercury Drug',    category: 'Health',        amount: 320,  date: '2025-06-08', icon: '💊', color: '#10B981' },
  { id: 'e6',  title: 'Netflix',         category: 'Entertainment', amount: 149,  date: '2025-06-08', icon: '🎮', color: '#8B5CF6' },
  { id: 'e7',  title: "McDonald's",      category: 'Food',          amount: 220,  date: '2025-06-07', icon: '🍔', color: '#F59E0B' },
  { id: 'e8',  title: 'Jeepney Fare',    category: 'Transport',     amount: 30,   date: '2025-06-07', icon: '🚌', color: '#6366F1' },
  { id: 'e9',  title: 'Shopee Order',    category: 'Shopping',      amount: 560,  date: '2025-06-06', icon: '🛍️', color: '#EC4899' },
  { id: 'e10', title: 'Savings Deposit', category: 'Savings',       amount: 1500, date: '2025-06-06', icon: '💰', color: '#1A2B47' },
];

export const mockMetrics = [
  { id: 'm1', label: 'Total Balance',    value: '₱12,450', change: '+2.4%', trend: 'up',   color: '#2DD4BF', icon: '💰' },
  { id: 'm2', label: 'Monthly Spend',    value: '₱5,450',  change: '+8.1%', trend: 'up',   color: '#F59E0B', icon: '📊' },
  { id: 'm3', label: 'Savings Progress', value: '64%',     change: '+5%',   trend: 'up',   color: '#6366F1', icon: '🎯' },
  { id: 'm4', label: 'Days Remaining',   value: '14 days', change: '-2',    trend: 'down', color: '#1A2B47', icon: '📅' },
];

export const mockAlerts = [
  { id: 'a1', type: 'warning',  icon: '⚠️', title: 'Food Spending',  message: "You've spent 40% more on food this week",      time: '2h ago' },
  { id: 'a2', type: 'critical', icon: '🔴', title: 'Budget Risk',    message: 'At current rate, funds may run out in 10 days', time: '5h ago' },
  { id: 'a3', type: 'success',  icon: '✅', title: 'Savings Goal',   message: "You're on track to meet your savings goal",     time: '1d ago' },
  { id: 'a4', type: 'info',     icon: '💡', title: 'Smart Tip',      message: 'Reducing transport costs could save ₱600/month', time: '2d ago' },
];

export const mockCategories = [
  { id: 'c1', label: 'Food',          icon: '🍔', color: '#F59E0B' },
  { id: 'c2', label: 'Transport',     icon: '🚗', color: '#6366F1' },
  { id: 'c3', label: 'Shopping',      icon: '🛍️', color: '#EC4899' },
  { id: 'c4', label: 'Utilities',     icon: '💡', color: '#2DD4BF' },
  { id: 'c5', label: 'Health',        icon: '💊', color: '#10B981' },
  { id: 'c6', label: 'Entertainment', icon: '🎮', color: '#8B5CF6' },
  { id: 'c7', label: 'Savings',       icon: '💰', color: '#1A2B47' },
  { id: 'c8', label: 'Other',         icon: '📦', color: '#94A3B8' },
];

// ── Insights / ML Data ────────────────────────────────────
export const mockInsights = {
  userId: 'u1',
  userCluster: 'Balanced Spender',
  clusterDescription: 'Maintains a healthy balance between spending and saving. Low financial risk.',
  dailyBurnRate: 420.5,
  daysRemaining: 14,
  riskLevel: 'medium',
  categoryBreakdown: [
    { id: 'c1', label: 'Food',          value: 565,  color: '#F59E0B', icon: '🍔', percentage: 12 },
    { id: 'c2', label: 'Transport',     value: 125,  color: '#6366F1', icon: '🚌', percentage: 3 },
    { id: 'c3', label: 'Shopping',      value: 1760, color: '#EC4899', icon: '🛍️', percentage: 38 },
    { id: 'c4', label: 'Utilities',     value: 1130, color: '#2DD4BF', icon: '💡', percentage: 24 },
    { id: 'c5', label: 'Health',        value: 770,  color: '#10B981', icon: '💊', percentage: 16 },
    { id: 'c6', label: 'Entertainment', value: 248,  color: '#8B5CF6', icon: '🎮', percentage: 5 },
  ],
  lastUpdated: new Date().toISOString(),
  prediction:      'Funds will likely last until end of cycle with moderate spending.',
  recommendations: [
    {
      id: 'r1',
      type: 'spending-control',
      title: 'Reduce shopping expenses by ₱500 this week.',
      description: 'Reducing shopping will help you stay within your budget.',
      priority: 'medium',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'r2',
      type: 'spending-control',
      title: 'Your food spending is above average — consider home cooking.',
      description: 'Eating out is your highest category right now.',
      priority: 'high',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'r3',
      type: 'savings',
      title: 'You are on track with savings — keep it up!',
      description: 'Keep saving at this rate to reach your emergency fund goal.',
      priority: 'low',
      createdAt: new Date().toISOString(),
    },
  ],
  weeklyTrend: [
    { day: 'Mon', amount: 275 },
    { day: 'Tue', amount: 420 },
    { day: 'Wed', amount: 180 },
    { day: 'Thu', amount: 650 },
    { day: 'Fri', amount: 390 },
    { day: 'Sat', amount: 820 },
    { day: 'Sun', amount: 210 },
  ],
  predictions: [
    {
      id: 'p1',
      type: 'sustainability',
      title: 'Budget sustainability',
      description: 'Your funds are estimated to last 14 more days.',
      value: 14,
      confidence: 94,
      timestamp: new Date().toISOString(),
      actionable: true,
    }
  ],
};

// ── Category Breakdown ────────────────────────────────────
export const mockCategoryBreakdown = [
  { id: 'c1', label: 'Food',          value: 565,  color: '#F59E0B', icon: '🍔' },
  { id: 'c2', label: 'Transport',     value: 125,  color: '#6366F1', icon: '🚌' },
  { id: 'c3', label: 'Shopping',      value: 1760, color: '#EC4899', icon: '🛍️' },
  { id: 'c4', label: 'Utilities',     value: 1130, color: '#2DD4BF', icon: '💡' },
  { id: 'c5', label: 'Health',        value: 770,  color: '#10B981', icon: '💊' },
  { id: 'c6', label: 'Entertainment', value: 248,  color: '#8B5CF6', icon: '🎮' },
  { id: 'c7', label: 'Savings',       value: 1500, color: '#1A2B47', icon: '💰' },
  { id: 'c8', label: 'Others',        value: 200,  color: '#94A3B8', icon: '📦' },
];

// ── Savings Goals ─────────────────────────────────────────
export const mockSavingsGoals = [
  { id: 'g1', title: 'Emergency Fund', target: 10000, current: 4500, color: '#2DD4BF', icon: '🏦' },
  { id: 'g2', title: 'New Laptop',     target: 35000, current: 8200, color: '#6366F1', icon: '💻' },
  { id: 'g3', title: 'Vacation Fund',  target: 20000, current: 2000, color: '#F59E0B', icon: '✈️' },
];