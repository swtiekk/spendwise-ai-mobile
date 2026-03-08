import { Semantic } from '@constants/colors';
import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import {
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { ExpenseCard } from '../../components/expense/ExpenseCard';
import { mockExpenses } from '../../data/mockData';
import { useExpenses } from '../../hooks/useExpenses';
import { HistoryStyles as s } from '../../styles/historyStyles';

// ─── Filter options ───────────────────────────────────────────────────────────
const FILTERS = ['All', 'Food', 'Transport', 'Shopping', 'Health', 'Utilities', 'Entertainment', 'Savings'] as const;
type Filter = typeof FILTERS[number];

// ─── Group expenses by date ───────────────────────────────────────────────────
type Expense = typeof mockExpenses[0];

function groupByDate(expenses: Expense[]): { label: string; data: Expense[] }[] {
  const groups: Record<string, Expense[]> = {};

  expenses.forEach(exp => {
    const d     = new Date(exp.date);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    let label: string;
    if (d.toDateString() === today.toDateString()) {
      label = 'Today';
    } else if (d.toDateString() === yesterday.toDateString()) {
      label = 'Yesterday';
    } else {
      label = d.toLocaleDateString('en-PH', { month: 'long', day: 'numeric', year: 'numeric' });
    }

    if (!groups[label]) groups[label] = [];
    groups[label].push(exp);
  });

  return Object.entries(groups).map(([label, data]) => ({ label, data }));
}

// ─── Screen ───────────────────────────────────────────────────────────────────
export default function HistoryScreen() {
  const { error, refresh } = useExpenses();
  const [activeFilter, setActiveFilter] = useState<Filter>('All');

  const displayExpenses = mockExpenses;

  const filtered = useMemo(() =>
    activeFilter === 'All'
      ? displayExpenses
      : displayExpenses.filter(e => e.category.toLowerCase() === activeFilter.toLowerCase()),
    [activeFilter, displayExpenses]
  );

  const grouped = useMemo(() => groupByDate(filtered), [filtered]);

  // Summary numbers
  const totalSpent = useMemo(
    () => filtered.reduce((sum, e) => sum + e.amount, 0),
    [filtered]
  );
  const txCount = filtered.length;

  const formatCurrency = (n: number) =>
    '₱' + n.toLocaleString('en-PH', { minimumFractionDigits: 0 });

  return (
    <SafeAreaView style={s.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={Semantic.background} />

      {/* ── Header ── */}
      <View style={s.header}>
        <View style={s.headerLeft}>
          <Text style={s.headerEyebrow}>Overview</Text>
          <Text style={s.headerTitle}>History</Text>
        </View>
        <TouchableOpacity
          style={{
            width: 38, height: 38,
            borderRadius: 11,
            backgroundColor: Semantic.surface,
            justifyContent: 'center', alignItems: 'center',
            borderWidth: 1, borderColor: Semantic.divider,
          }}
          activeOpacity={0.7}
        >
          <Ionicons name="options-outline" size={18} color={Semantic.text} />
        </TouchableOpacity>
      </View>

      {/* ── Summary strip ── */}
      <View style={s.summaryStrip}>
        <View style={s.summaryItem}>
          <Text style={s.summaryLabel}>Transactions</Text>
          <Text style={s.summaryValue}>{txCount}</Text>
        </View>
        <View style={s.summaryDivider} />
        <View style={s.summaryItem}>
          <Text style={s.summaryLabel}>Total Spent</Text>
          <Text style={s.summaryValueRed}>{formatCurrency(totalSpent)}</Text>
        </View>
        <View style={s.summaryDivider} />
        <View style={s.summaryItem}>
          <Text style={s.summaryLabel}>Avg / Day</Text>
          <Text style={s.summaryValueTeal}>
            {formatCurrency(txCount > 0 ? Math.round(totalSpent / Math.max(grouped.length, 1)) : 0)}
          </Text>
        </View>
      </View>

      {/* ── Filter bar ── */}
      <View style={s.filterWrap}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={s.filterContent}>
            {FILTERS.map(f => (
              <TouchableOpacity
                key={f}
                style={[s.filterBtn, activeFilter === f && s.filterBtnActive]}
                onPress={() => setActiveFilter(f)}
                activeOpacity={0.7}
              >
                <Text style={[s.filterText, activeFilter === f && s.filterTextActive]}>
                  {f}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* ── Content ── */}
      {error ? (
        <ErrorMessage
          message={error}
          action={{ label: 'Retry', onPress: refresh }}
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon="receipt-outline"
          title="No Expenses"
          message={`No ${activeFilter === 'All' ? '' : activeFilter + ' '}expenses found.`}
        />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={s.scrollContent}
        >
          {grouped.map(({ label, data }) => (
            <View key={label} style={s.dateGroup}>
              <Text style={s.dateGroupLabel}>{label}</Text>
              {data.map(expense => (
                <ExpenseCard
                  key={expense.id}
                  id={expense.id}
                  title={expense.title}
                  category={expense.category}
                  amount={expense.amount}
                  date={expense.date}
                  icon={expense.icon}
                  color={expense.color}
                />
              ))}
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}