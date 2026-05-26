# SpendWise AI – Mobile Application

## Project Description

SpendWise AI Mobile is a React Native / Expo application for personal expense tracking and AI-powered financial insights. Users can log expenses, monitor their spending health, and receive real-time ML-based recommendations — all through a clean, mobile-first interface. The app communicates with the SpendWise AI FastAPI backend via Axios.

## Features

- **Authentication** – Login, Register, and Onboarding screens; JWT token persisted in AsyncStorage
- **Dashboard** – Balance card, sustainability status, category spending breakdown, active alerts, and Smart Purchase shortcut
- **Expense Management** – Add expenses with amount, category, description, and timestamp; full history with edit and delete
- **Smart Purchase Advisor** – Enter a proposed purchase; get an AI risk indicator and recommendation (approve / caution / decline)
- **AI Insights** – User cluster card, risk level card, behavior trends, and personalized recommendation list
- **Spending Health Screen** – Daily burn rate and days-remaining visualization
- **Profile Management** – Edit income settings, income type, income cycle, next income date, savings goals, and notification preferences

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | React Native 0.81.5 + Expo ~54.0.34 |
| Navigation | Expo Router ~6.0.23 (file-based) + React Navigation Bottom Tabs ^7.4.0 |
| State Management | Zustand ^5.0.11 |
| HTTP Client | Axios ^1.13.6 |
| Forms | React Hook Form ^7.71.2 |
| Storage | @react-native-async-storage/async-storage 2.2.0 |
| Date Utilities | date-fns ^4.1.0 |
| Language | TypeScript ~5.9.2 |
| Icons | @expo/vector-icons ^15.0.3 |


## System Architecture

```
app/
├── auth/               – login.tsx, register.tsx, onboarding.tsx
├── (tabs)/             – dashboard.tsx, add-expense.tsx, history.tsx, insights.tsx, profile.tsx
├── modals/             – smart-purchase.tsx, confirmation.tsx
└── spending-health.tsx
components/
├── dashboard/          – BalanceCard, SpendingBreakdown, AlertsList, SustainabilityStatus, SmartPurchaseButton
├── expense/            – AddExpenseForm, ExpenseCard, AmountInput, CategorySelector
├── insights/           – UserClusterCard, RiskLevelCard, BehaviorTrends, RecommendationList
├── smart-purchase/     – SmartPurchaseSheet, RiskIndicator, PurchaseDecisionModal, PurchaseRecommendation
├── profile/            – UserInfo, IncomeSettings, SavingsGoals, NotificationSettings
└── ui/                 – Button, Card, Input, Badge, AlertBox, ProgressRing, StatusBadge, Divider
hooks/                  – useDashboard, useInsights, useSmartPurchase, useUser, useSustainability, useNotifications
types/                  – auth.ts, user.ts, expense.ts, ml.ts, api.ts
```

## Installation & Setup

**Prerequisites:** Node.js 18+, Expo Go app on your device

```bash
git clone https://github.com/swtiekk/spendwise-ai-mobile.git
cd spendwise-ai-mobile

npm install
```

Update the API base URL in the API service/config file to point to your running FastAPI backend:

```
http://<your-local-ip>:8000
```

```bash
npx expo start
```

- Scan the QR code with **Expo Go**
- Press `a` for Android emulator
- Press `i` for iOS simulator

## Deployment Link




## Team Members and Roles

Sotie Katrina Golez  
Florie Jayne Soler  
Trisha Araquil  
Steve Drylle Sarino  

## Known Limitations

- Expo Go does not support all native modules; some features may require a development build (`npx expo run:android`)
- The API base URL must be manually updated to match the backend server's local IP
- Offline mode is not supported; all features require an active connection to the FastAPI backend
- iOS build was not tested on a physical device; primarily developed and tested on Android

## Screenshots
![Screenshot](app/docs/1.png)
![Screenshot](app/docs/2.png)
![Screenshot](app/docs/3.png)
![Screenshot](app/docs/4.png)
![Screenshot](app/docs/5.png)
![Screenshot](app/docs/6.png)
![Screenshot](app/docs/7.png)
![Screenshot](app/docs/8.png)
![Screenshot](app/docs/9.png)
![Screenshot](app/docs/10.png)