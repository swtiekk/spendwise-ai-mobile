import { Semantic } from '@constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { ExpenseCard } from '../../components/expense/ExpenseCard';
import { useExpenses } from '../../hooks/useExpenses';
import { HistoryStyles as s } from '../../styles/historyStyles';
import { Expense } from '../../types/expense';

type Filter = 'All' | 'Food' | 'Transport' | 'Shopping' | 'Health' | 'Utilities' | 'Entertainment' | 'Other';
type SortOption = 'newest' | 'oldest' | 'highest' | 'lowest';

const FILTERS: Filter[] = [
  'All', 'Food', 'Transport', 'Shopping',
  'Health', 'Utilities', 'Entertainment', 'Other',
];

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: 'Newest First',   value: 'newest'  },
  { label: 'Oldest First',   value: 'oldest'  },
  { label: 'Highest Amount', value: 'highest' },
  { label: 'Lowest Amount',  value: 'lowest'  },
];

const CATEGORY_COLORS: Record<string, string> = {
  food:          '#F59E0B',
  transport:     '#6366F1',
  shopping:      '#EC4899',
  utilities:     '#10B981',
  health:        '#EF4444',
  entertainment: '#8B5CF6',
  education:     '#3B82F6',
  other:         '#6B7280',
};

function safeCategory(val: unknown): string {
  if (val === null || val === undefined) return 'other';
  if (typeof val === 'string') return val.toLowerCase();
  if (typeof val === 'object') {
    const obj = val as any;
    return String(obj.key ?? obj.name ?? obj.slug ?? 'other').toLowerCase();
  }
  return String(val).toLowerCase();
}

function capitalize(s: string): string {
  if (!s) return 'Other';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function groupByDate(expenses: Expense[]) {
  const today     = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const groups: Record<string, Expense[]> = {};
  expenses.forEach(exp => {
    const d = new Date(exp.timestamp);
    const label =
      d.toDateString() === today.toDateString()     ? 'Today'     :
      d.toDateString() === yesterday.toDateString() ? 'Yesterday' :
      d.toLocaleDateString('en-PH', { month: 'long', day: 'numeric', year: 'numeric' });
    if (!groups[label]) groups[label] = [];
    groups[label].push(exp);
  });

  return Object.entries(groups).map(([label, data]) => ({ label, data }));
}

const formatCurrency = (n: number) =>
  '₱' + Number(n ?? 0).toLocaleString('en-PH', { minimumFractionDigits: 0 });

const formatDateLong = (iso: string) => {
  try {
    return new Date(iso).toLocaleDateString('en-PH', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });
  } catch {
    return iso ?? '—';
  }
};

export default function HistoryScreen() {
  const { expenses, error, refresh, deleteExpense } = useExpenses();

  const [activeFilter,    setActiveFilter]    = useState<Filter>('All');
  const [activeSort,      setActiveSort]      = useState<SortOption>('newest');
  const [tempSort,        setTempSort]        = useState<SortOption>('newest');
  const [showSortModal,   setShowSortModal]   = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isDeleting,      setIsDeleting]      = useState(false);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );

  const handleDelete = useCallback((expense: Expense) => {
    const label = String(expense.description ?? expense.id ?? 'this expense');

    const doDelete = async () => {
      try {
        setIsDeleting(true);
        console.log('[handleDelete] id:', expense.id);
        await deleteExpense(String(expense.id));
        console.log('[handleDelete] success');
        setSelectedExpense(null);
      } catch (err: any) {
        console.error('[handleDelete] error:', err?.message);
        Alert.alert(
          'Delete Failed',
          String(err?.message ?? 'Failed to delete. Please try again.')
        );
      } finally {
        setIsDeleting(false);
      }
    };

    // Alert.alert does not work on web (localhost) — use window.confirm instead
    if (typeof window !== 'undefined' && typeof window.confirm === 'function') {
      if (window.confirm(`Are you sure you want to delete "${label}"?`)) {
        doDelete();
      }
    } else {
      Alert.alert(
        'Delete Expense',
        `Are you sure you want to delete "${label}"?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Delete', style: 'destructive', onPress: doDelete },
        ]
      );
    }
  }, [deleteExpense]);

  const filtered = useMemo(() => {
    const list =
      activeFilter === 'All'
        ? expenses
        : expenses.filter(e =>
            safeCategory(e.category) === activeFilter.toLowerCase()
          );

    return [...list].sort((a, b) => {
      const aTime = new Date(a.timestamp ?? 0).getTime();
      const bTime = new Date(b.timestamp ?? 0).getTime();
      if (activeSort === 'newest')  return bTime - aTime;
      if (activeSort === 'oldest')  return aTime - bTime;
      if (activeSort === 'highest') return Number(b.amount) - Number(a.amount);
      if (activeSort === 'lowest')  return Number(a.amount) - Number(b.amount);
      return 0;
    });
  }, [expenses, activeFilter, activeSort]);

  const grouped    = useMemo(() => groupByDate(filtered), [filtered]);
  const totalSpent = useMemo(() => filtered.reduce((sum, e) => sum + Number(e.amount ?? 0), 0), [filtered]);
  const avgPerDay  = filtered.length > 0
    ? Math.round(totalSpent / Math.max(grouped.length, 1))
    : 0;

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
          style={m.iconBtn}
          onPress={() => { setTempSort(activeSort); setShowSortModal(true); }}
          activeOpacity={0.7}
        >
          <Ionicons name="options-outline" size={18} color={Semantic.text} />
        </TouchableOpacity>
      </View>

      {/* ── Summary Strip ── */}
      <View style={s.summaryStrip}>
        {[
          { label: 'Transactions', value: String(filtered.length),    style: s.summaryValue     },
          { label: 'Total Spent',  value: formatCurrency(totalSpent), style: s.summaryValueRed  },
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

      {/* ── Filter Bar ── */}
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

      {/* ── Expense List ── */}
      {error ? (
        <ErrorMessage message={error} action={{ label: 'Retry', onPress: refresh }} />
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
              {data.map(expense => {
                const cat   = safeCategory(expense.category);
                const color = CATEGORY_COLORS[cat] ?? '#6B7280';
                return (
                  <ExpenseCard
                    key={String(expense.id)}
                    id={String(expense.id)}
                    title={String(expense.description ?? '')}
                    category={cat}
                    amount={Number(expense.amount ?? 0)}
                    date={String(expense.timestamp ?? '')}
                    color={color}
                    onPress={() => setSelectedExpense(expense)}
                  />
                );
              })}
            </View>
          ))}
        </ScrollView>
      )}

      {/* ── Sort Modal ── */}
      <Modal
        visible={showSortModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowSortModal(false)}
      >
        <TouchableOpacity style={m.overlay} activeOpacity={1} onPress={() => setShowSortModal(false)}>
          <TouchableOpacity activeOpacity={1} style={m.sheet}>
            <View style={m.handle} />
            <Text style={m.sheetTitle}>Sort By</Text>

            {SORT_OPTIONS.map(opt => (
              <TouchableOpacity
                key={opt.value}
                style={[m.sortOption, tempSort === opt.value && m.sortOptionActive]}
                onPress={() => setTempSort(opt.value)}
                activeOpacity={0.7}
              >
                <Text style={[m.sortText, tempSort === opt.value && m.sortTextActive]}>
                  {opt.label}
                </Text>
                {tempSort === opt.value && (
                  <Ionicons name="checkmark" size={18} color="#00b4a6" />
                )}
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={m.applyBtn}
              onPress={() => { setActiveSort(tempSort); setShowSortModal(false); }}
              activeOpacity={0.8}
            >
              <Text style={m.applyText}>Apply</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={m.cancelBtn}
              onPress={() => setShowSortModal(false)}
              activeOpacity={0.7}
            >
              <Text style={m.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* ── Expense Detail Modal ── */}
      <Modal
        visible={!!selectedExpense}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedExpense(null)}
      >
        <TouchableOpacity style={m.overlay} activeOpacity={1} onPress={() => setSelectedExpense(null)}>
          <TouchableOpacity activeOpacity={1} style={m.sheet}>
            <View style={m.handle} />

            {selectedExpense && (() => {
              const cat      = safeCategory(selectedExpense.category);
              const color    = CATEGORY_COLORS[cat] ?? '#6B7280';
              const catLabel = capitalize(cat);
              const title    = String(selectedExpense.description ?? '—');
              const dateStr  = String(selectedExpense.timestamp ?? '');
              const txId     = String(selectedExpense.id ?? '—');

              return (
                <>
                  <View style={[m.detailIconWrap, { backgroundColor: color + '22' }]}>
                    <Ionicons name="receipt-outline" size={36} color={color} />
                  </View>

                  <Text style={m.detailTitle}>{title}</Text>
                  <Text style={m.detailAmount}>
                    -{formatCurrency(Number(selectedExpense.amount ?? 0))}
                  </Text>

                  <View style={m.divider} />

                  {[
                    { label: 'Category',       value: catLabel },
                    { label: 'Date',           value: formatDateLong(dateStr) },
                    { label: 'Transaction ID', value: `#${txId}` },
                  ].map(({ label, value }) => (
                    <View key={label} style={m.detailRow}>
                      <Text style={m.detailLabel}>{label}</Text>
                      <Text style={m.detailValue}>{value}</Text>
                    </View>
                  ))}

                  <View style={m.divider} />

                  <TouchableOpacity
                    style={[m.deleteBtn, isDeleting && { opacity: 0.6 }]}
                    onPress={() => { if (!isDeleting) handleDelete(selectedExpense); }}
                    activeOpacity={0.8}
                    disabled={isDeleting}
                  >
                    <Ionicons name="trash-outline" size={18} color="#fff" style={{ marginRight: 8 }} />
                    <Text style={m.deleteText}>
                      {isDeleting ? 'Deleting...' : 'Delete Expense'}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={m.closeBtn}
                    onPress={() => setSelectedExpense(null)}
                    activeOpacity={0.8}
                  >
                    <Text style={m.closeText}>Close</Text>
                  </TouchableOpacity>
                </>
              );
            })()}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

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