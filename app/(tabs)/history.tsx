import { Semantic } from '@constants/colors';
import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { Alert, Modal, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { ExpenseCard } from '../../components/expense/ExpenseCard';
import { mockExpenses } from '../../data/mockData';
import { useExpenses } from '../../hooks/useExpenses';
import { HistoryStyles as s } from '../../styles/historyStyles';

type Expense = typeof mockExpenses[0];
type Filter = 'All' | 'Food' | 'Transport' | 'Shopping' | 'Health' | 'Utilities' | 'Entertainment' | 'Savings';
type SortOption = 'newest' | 'oldest' | 'highest' | 'lowest';

const FILTERS: Filter[] = ['All', 'Food', 'Transport', 'Shopping', 'Health', 'Utilities', 'Entertainment', 'Savings'];
const SORT_OPTIONS = [
  { label: 'Newest First',  value: 'newest'  },
  { label: 'Oldest First',  value: 'oldest'  },
  { label: 'Highest Amount',value: 'highest' },
  { label: 'Lowest Amount', value: 'lowest'  },
] as const;

// Group expenses by date label
function groupByDate(expenses: Expense[]) {
  const today     = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const groups: Record<string, Expense[]> = {};
  expenses.forEach(exp => {
    const d = new Date(exp.date);
    const label =
      d.toDateString() === today.toDateString()     ? 'Today' :
      d.toDateString() === yesterday.toDateString() ? 'Yesterday' :
      d.toLocaleDateString('en-PH', { month: 'long', day: 'numeric', year: 'numeric' });
    if (!groups[label]) groups[label] = [];
    groups[label].push(exp);
  });

  return Object.entries(groups).map(([label, data]) => ({ label, data }));
}

const formatCurrency = (n: number) => '₱' + n.toLocaleString('en-PH');
const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('en-PH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

export default function HistoryScreen() {
  const { error, refresh } = useExpenses();
  const [activeFilter, setActiveFilter]     = useState<Filter>('All');
  const [activeSort, setActiveSort]         = useState<SortOption>('newest');
  const [tempSort, setTempSort]             = useState<SortOption>('newest');
  const [showSortModal, setShowSortModal]   = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [deletedIds, setDeletedIds]         = useState<Set<string | number>>(new Set());

  const handleDelete = (expense: Expense) => {
    Alert.alert(
      'Delete Expense',
      `Are you sure you want to delete "${expense.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setDeletedIds(prev => new Set(prev).add(expense.id));
            setSelectedExpense(null);
          },
        },
      ]
    );
  };

  const filtered = useMemo(() => {
    const list = activeFilter === 'All'
      ? mockExpenses
      : mockExpenses.filter(e => e.category.toLowerCase() === activeFilter.toLowerCase());

    return [...list]
      .filter(e => !deletedIds.has(e.id))
      .sort((a, b) => {
        if (activeSort === 'newest')  return new Date(b.date).getTime() - new Date(a.date).getTime();
        if (activeSort === 'oldest')  return new Date(a.date).getTime() - new Date(b.date).getTime();
        if (activeSort === 'highest') return b.amount - a.amount;
        if (activeSort === 'lowest')  return a.amount - b.amount;
        return 0;
      });
  }, [activeFilter, activeSort, deletedIds]);

  const grouped    = useMemo(() => groupByDate(filtered), [filtered]);
  const totalSpent = useMemo(() => filtered.reduce((sum, e) => sum + e.amount, 0), [filtered]);
  const avgPerDay  = filtered.length > 0 ? Math.round(totalSpent / Math.max(grouped.length, 1)) : 0;

  return (
    <SafeAreaView style={s.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={Semantic.background} />

      {/* Header */}
      <View style={s.header}>
        <View style={s.headerLeft}>
          <Text style={s.headerEyebrow}>Overview</Text>
          <Text style={s.headerTitle}>History</Text>
        </View>
        <TouchableOpacity
          style={m.iconBtn}
          onPress={() => { setTempSort(activeSort); setShowSortModal(true); }}
          activeOpacity={0.7}
        >
          <Ionicons name="options-outline" size={18} color={Semantic.text} />
        </TouchableOpacity>
      </View>

      {/* Summary */}
      <View style={s.summaryStrip}>
        {[
          { label: 'Transactions', value: String(filtered.length), style: s.summaryValue },
          { label: 'Total Spent',  value: formatCurrency(totalSpent), style: s.summaryValueRed },
          { label: 'Avg / Day',    value: formatCurrency(avgPerDay),  style: s.summaryValueTeal },
        ].map(({ label, value, style }, i, arr) => (
          <React.Fragment key={label}>
            <View style={s.summaryItem}>
              <Text style={s.summaryLabel}>{label}</Text>
              <Text style={style}>{value}</Text>
            </View>
            {i < arr.length - 1 && <View style={s.summaryDivider} />}
          </React.Fragment>
        ))}
      </View>

      {/* Filter bar */}
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
                <Text style={[s.filterText, activeFilter === f && s.filterTextActive]}>{f}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Expense list */}
      {error ? (
        <ErrorMessage message={error} action={{ label: 'Retry', onPress: refresh }} />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon="receipt-outline"
          title="No Expenses"
          message={`No ${activeFilter === 'All' ? '' : activeFilter + ' '}expenses found.`}
        />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scrollContent}>
          {grouped.map(({ label, data }) => (
            <View key={label} style={s.dateGroup}>
              <Text style={s.dateGroupLabel}>{label}</Text>
              {data.map(expense => (
                <ExpenseCard
                  key={expense.id}
                  {...expense}
                  onPress={() => setSelectedExpense(expense)}
                />
              ))}
            </View>
          ))}
        </ScrollView>
      )}

      {/* ── Sort Modal ── */}
      <Modal visible={showSortModal} transparent animationType="slide" onRequestClose={() => setShowSortModal(false)}>
        <TouchableOpacity style={m.overlay} activeOpacity={1} onPress={() => setShowSortModal(false)}>
          <TouchableOpacity activeOpacity={1} style={m.sheet}>
            <View style={m.handle} />
            <Text style={m.sheetTitle}>Sort By</Text>

            {SORT_OPTIONS.map(opt => (
              <TouchableOpacity
                key={opt.value}
                style={[m.sortOption, tempSort === opt.value && m.sortOptionActive]}
                onPress={() => setTempSort(opt.value as SortOption)}
                activeOpacity={0.7}
              >
                <Text style={[m.sortText, tempSort === opt.value && m.sortTextActive]}>{opt.label}</Text>
                {tempSort === opt.value && <Ionicons name="checkmark" size={18} color="#00b4a6" />}
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={m.applyBtn}
              onPress={() => { setActiveSort(tempSort); setShowSortModal(false); }}
              activeOpacity={0.8}
            >
              <Text style={m.applyText}>Apply</Text>
            </TouchableOpacity>
            <TouchableOpacity style={m.cancelBtn} onPress={() => setShowSortModal(false)} activeOpacity={0.7}>
              <Text style={m.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* ── Expense Detail Modal ── */}
      <Modal visible={!!selectedExpense} transparent animationType="slide" onRequestClose={() => setSelectedExpense(null)}>
        <TouchableOpacity style={m.overlay} activeOpacity={1} onPress={() => setSelectedExpense(null)}>
          <TouchableOpacity activeOpacity={1} style={m.sheet}>
            <View style={m.handle} />
            {selectedExpense && (
              <>
                <View style={[m.detailIconWrap, { backgroundColor: selectedExpense.color + '22' }]}>
                  <Text style={{ fontSize: 36 }}>{selectedExpense.icon}</Text>
                </View>
                <Text style={m.detailTitle}>{selectedExpense.title}</Text>
                <Text style={m.detailAmount}>-{formatCurrency(selectedExpense.amount)}</Text>

                <View style={m.divider} />
                {[
                  { label: 'Category',       value: selectedExpense.category },
                  { label: 'Date',           value: formatDate(selectedExpense.date) },
                  { label: 'Transaction ID', value: `#${selectedExpense.id}` },
                ].map(({ label, value }) => (
                  <View key={label} style={m.detailRow}>
                    <Text style={m.detailLabel}>{label}</Text>
                    <Text style={m.detailValue}>{value}</Text>
                  </View>
                ))}
                <View style={m.divider} />

                {/* Delete Button */}
                <TouchableOpacity
                  style={m.deleteBtn}
                  onPress={() => handleDelete(selectedExpense)}
                  activeOpacity={0.8}
                >
                  <Ionicons name="trash-outline" size={18} color="#fff" style={{ marginRight: 8 }} />
                  <Text style={m.deleteText}>Delete Expense</Text>
                </TouchableOpacity>

                <TouchableOpacity style={m.closeBtn} onPress={() => setSelectedExpense(null)} activeOpacity={0.8}>
                  <Text style={m.closeText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const m = StyleSheet.create({
  iconBtn:          { width: 38, height: 38, borderRadius: 11, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#e0e0e0' },
  overlay:          { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  sheet:            { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 36 },
  handle:           { width: 40, height: 4, borderRadius: 2, backgroundColor: '#e0e0e0', alignSelf: 'center', marginBottom: 20 },
  sheetTitle:       { fontSize: 18, fontWeight: '700', color: '#1a1a2e', marginBottom: 16 },
  sortOption:       { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14, borderRadius: 12, marginBottom: 8, backgroundColor: '#f5f5f5' },
  sortOptionActive: { backgroundColor: '#e6faf9', borderWidth: 1, borderColor: '#00b4a6' },
  sortText:         { fontSize: 15, color: '#555', fontWeight: '500' },
  sortTextActive:   { color: '#00b4a6', fontWeight: '600' },
  applyBtn:         { backgroundColor: '#00b4a6', borderRadius: 14, paddingVertical: 15, alignItems: 'center', marginTop: 12 },
  applyText:        { color: '#fff', fontSize: 16, fontWeight: '700' },
  cancelBtn:        { paddingVertical: 13, alignItems: 'center', marginTop: 4 },
  cancelText:       { color: '#999', fontSize: 15 },
  detailIconWrap:   { width: 72, height: 72, borderRadius: 20, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  detailTitle:      { fontSize: 20, fontWeight: '700', color: '#1a1a2e', textAlign: 'center', marginBottom: 4 },
  detailAmount:     { fontSize: 28, fontWeight: '800', color: '#e53935', textAlign: 'center', marginBottom: 16 },
  divider:          { height: 1, backgroundColor: '#f0f0f0', marginVertical: 12 },
  detailRow:        { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  detailLabel:      { fontSize: 14, color: '#999', fontWeight: '500' },
  detailValue:      { fontSize: 14, color: '#1a1a2e', fontWeight: '600', maxWidth: '60%', textAlign: 'right' },
  deleteBtn:        { flexDirection: 'row', backgroundColor: '#e53935', borderRadius: 14, paddingVertical: 15, alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  deleteText:       { color: '#fff', fontSize: 16, fontWeight: '700' },
  closeBtn:         { backgroundColor: '#1a1a2e', borderRadius: 14, paddingVertical: 15, alignItems: 'center', marginTop: 8 },
  closeText:        { color: '#fff', fontSize: 16, fontWeight: '700' },
});
