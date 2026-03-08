import { Colors, Semantic } from '@constants/colors';
import { Spacing } from '@constants/spacing';
import { Typography } from '@constants/typography';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AlertsList } from '../../components/dashboard/AlertsList';
import { BalanceCard } from '../../components/dashboard/BalanceCard';
import { IncomeInfo } from '../../components/dashboard/IncomeInfo';
import { SpendingBreakdown } from '../../components/dashboard/SpendingBreakdown';
import { SustainabilityStatus } from '../../components/dashboard/SustainabilityStatus';
import { useAuth } from '../../hooks/useAuth';
import { useDashboard } from '../../hooks/useDashboard';
import { useNotifications } from '../../hooks/useNotifications';
import { DashboardStyles as s } from '../../styles/dashboardStyles';

// ── Date range filter options ─────────────────────────────────────────────────
type DateRange = 'Today' | 'This Week' | 'This Month';
const DATE_RANGES: DateRange[] = ['Today', 'This Week', 'This Month'];

// ── Quick expense categories ──────────────────────────────────────────────────
const QUICK_CATEGORIES = [
  { key: 'food',          label: 'Food',      icon: 'fast-food-outline',      color: '#F59E0B', bg: '#FFFBEB' },
  { key: 'transport',     label: 'Transport', icon: 'car-outline',             color: '#6366F1', bg: '#EEF2FF' },
  { key: 'shopping',      label: 'Shopping',  icon: 'bag-outline',             color: '#EC4899', bg: '#FDF2F8' },
  { key: 'entertainment', label: 'Fun',       icon: 'game-controller-outline', color: '#8B5CF6', bg: '#F5F3FF' },
  { key: 'health',        label: 'Health',    icon: 'medical-outline',         color: '#22C55E', bg: '#F0FDF4' },
] as const;

// ── Time-based greeting ───────────────────────────────────────────────────────
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

// ── Staggered fade-slide ──────────────────────────────────────────────────────
function FadeSlide({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const opacity    = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(16)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity,    { toValue: 1, duration: 380, delay, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 380, delay, useNativeDriver: true }),
    ]).start();
  }, []);
  return (
    <Animated.View style={{ opacity, transform: [{ translateY }] }}>
      {children}
    </Animated.View>
  );
}

// ── Section label ─────────────────────────────────────────────────────────────
function SectionLabel({ title, action, onAction }: { 
  title: string; 
  action?: string;
  onAction?: () => void;
}) {
  return (
    <View style={s.sectionHeader}>
      <View style={s.sectionTitleRow}>
        <View style={s.sectionDot} />
        <Text style={s.sectionTitle}>{title}</Text>
      </View>
      {action && (
        <TouchableOpacity onPress={onAction} activeOpacity={0.7}>
          <Text style={s.sectionAction}>{action}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// ── Loading skeleton ──────────────────────────────────────────────────────────
function Skeleton() {
  const opacity = useRef(new Animated.Value(0.4)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1,   duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.4, duration: 700, useNativeDriver: true }),
      ])
    ).start();
  }, []);
  return (
    <View style={s.skeletonWrap}>
      {[120, 80, 60, 140, 100].map((h, i) => (
        <Animated.View key={i} style={[s.skeletonBlock, { height: h, opacity }]} />
      ))}
    </View>
  );
}

// ── Quick shortcut item with bounce animation ─────────────────────────────────
function QuickItem({
  item,
  onPress,
}: {
  item: typeof QUICK_CATEGORIES[number];
  onPress: () => void;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.88, duration: 80,  useNativeDriver: true }),
      Animated.spring(scale,  { toValue: 1,    friction: 4,   useNativeDriver: true }),
    ]).start();
    onPress();
  };

  return (
    <Animated.View style={[s.quickItem, { transform: [{ scale }] }]}>
      <TouchableOpacity onPress={handlePress} activeOpacity={1}>
        <View style={[s.quickIconWrap, s.quickIconWrapActive, { backgroundColor: item.bg, borderColor: item.bg }]}>
          <Ionicons name={item.icon as any} size={22} color={item.color} />
        </View>
        <Text style={s.quickLabel}>{item.label}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

// ── Date filter multipliers (mock — in production filter real data) ───────────
function applyDateFilter(
  data: { totalSpent: number; categories: any[] },
  range: DateRange
) {
  const multiplier = range === 'Today' ? 0.08 : range === 'This Week' ? 0.35 : 1;
  return {
    totalSpent: Math.round(data.totalSpent * multiplier),
    categories: data.categories.map(cat => ({
      ...cat,
      amount: Math.round(cat.amount * multiplier),
    })),
  };
}

// ── Main screen ───────────────────────────────────────────────────────────────
export default function DashboardScreen() {
  const router              = useRouter();
  const { user }            = useAuth();
  const { data, isLoading, error, refresh } = useDashboard();
  const { activeAlerts }    = useNotifications();

  // ── State ─────────────────────────────────────────────────────────────────
  const [dateRange,    setDateRange]    = useState<DateRange>('This Month');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const nextPayDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

  // ── Filter tab animation ──────────────────────────────────────────────────
  const filterAnim = useRef(new Animated.Value(DATE_RANGES.indexOf('This Month'))).current;

  const handleFilterChange = (range: DateRange) => {
    const idx = DATE_RANGES.indexOf(range);
    setDateRange(range);
    Animated.spring(filterAnim, { toValue: idx, friction: 6, useNativeDriver: false }).start();
  };

  // ── Pull-to-refresh ───────────────────────────────────────────────────────
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refresh();
    setIsRefreshing(false);
  }, [refresh]);

  // ── Quick shortcut handler ────────────────────────────────────────────────
  const handleQuickCategory = (categoryKey: string) => {
    router.push({
      pathname: '/(tabs)/add-expense',
      params: { category: categoryKey },
    });
  };

  // ── Filtered data ─────────────────────────────────────────────────────────
  const filteredData = data ? applyDateFilter(data, dateRange) : null;

  // ── Greeting ──────────────────────────────────────────────────────────────
  const firstName  = user?.name?.split(' ')[0] ?? 'there';
  const greeting   = getGreeting();

  // ── Error state ───────────────────────────────────────────────────────────
  if (error) {
    return (
      <SafeAreaView style={s.screen}>
        <StatusBar barStyle="dark-content" backgroundColor={Semantic.background} />
        <View style={sc.errorHeader}>
          <Text style={sc.errorHeaderTitle}>Dashboard</Text>
        </View>
        <View style={s.errorState}>
          <Ionicons name="cloud-offline-outline" size={52} color={Semantic.textMuted} />
          <Text style={s.errorStateTitle}>Something went wrong</Text>
          <Text style={s.errorStateMessage}>{error}</Text>
          <TouchableOpacity style={sc.retryBtn} onPress={refresh} activeOpacity={0.85}>
            <Ionicons name="refresh-outline" size={16} color={Colors.white} />
            <Text style={sc.retryText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={Semantic.background} />

      {/* ── Header with time-based greeting + first name ── */}
      <FadeSlide delay={0}>
        <View style={s.header}>
          <View style={s.headerLeft}>
            <Text style={s.headerGreeting}>{greeting}, {firstName} 👋</Text>
            <Text style={s.headerTitle}>Dashboard</Text>
          </View>
          <TouchableOpacity
            style={s.headerAvatar}
            onPress={() => router.push('/(tabs)/profile')}
            activeOpacity={0.8}
          >
            <Ionicons name="person-outline" size={20} color={Semantic.primary} />
          </TouchableOpacity>
        </View>
      </FadeSlide>

      {isLoading && <Skeleton />}

      {data && filteredData && (
        <ScrollView
          style={s.scroll}
          contentContainerStyle={s.scrollContent}
          showsVerticalScrollIndicator={false}
          // ── Pull-to-refresh ──
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor={Colors.growthTeal}
              colors={[Colors.growthTeal]}
              progressBackgroundColor={Colors.white}
            />
          }
        >
          {/* ── Balance hero card ── */}
          <FadeSlide delay={60}>
            <BalanceCard
              balance={data.balance}
              lastUpdated="Just now"
              totalSpent={filteredData.totalSpent}
            />
          </FadeSlide>

          {/* ── Date range filter tabs ── */}
          <FadeSlide delay={90}>
            <View style={s.filterRow}>
              {DATE_RANGES.map((range) => {
                const isActive = dateRange === range;
                return (
                  <TouchableOpacity
                    key={range}
                    style={[s.filterTab, isActive && s.filterTabActive]}
                    onPress={() => handleFilterChange(range)}
                    activeOpacity={0.8}
                  >
                    <Text style={[s.filterTabText, isActive && s.filterTabTextActive]}>
                      {range}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </FadeSlide>

          {/* ── Stats mini-row ── */}
          <FadeSlide delay={110}>
            <View style={s.statsRow}>
              <View style={s.statCard}>
                <View style={[s.statIconWrap, { backgroundColor: Semantic.primaryBg }]}>
                  <Ionicons name="calendar-outline" size={18} color={Semantic.primary} />
                </View>
                <Text style={s.statLabel}>Days Remaining</Text>
                <Text style={s.statValue}>{data.daysRemaining}</Text>
                <Text style={s.statSubtext}>until next pay</Text>
              </View>

              {(() => {
                const riskMap = {
                  danger:  { color: Semantic.error,   bg: Semantic.errorBg,   label: 'High Risk', icon: 'warning-outline' },
                  caution: { color: Semantic.warning,  bg: Semantic.warningBg, label: 'Moderate',  icon: 'alert-circle-outline' },
                  safe:    { color: Semantic.success,  bg: Semantic.successBg, label: 'On Track',  icon: 'checkmark-circle-outline' },
                };
                const risk = riskMap[data.riskLevel as keyof typeof riskMap] ?? riskMap.safe;
                return (
                  <View style={s.statCard}>
                    <View style={[s.statIconWrap, { backgroundColor: risk.bg }]}>
                      <Ionicons name={risk.icon as any} size={18} color={risk.color} />
                    </View>
                    <Text style={s.statLabel}>Spending Health</Text>
                    <Text style={[s.statValue, { color: risk.color, fontSize: 14 }]}>{risk.label}</Text>
                    <Text style={s.statSubtext}>financial status</Text>
                  </View>
                );
              })()}
            </View>
          </FadeSlide>

          {/* ── Quick expense shortcuts ── */}
          <FadeSlide delay={140}>
            <SectionLabel title="Quick Add" />
            <View style={s.quickRow}>
              {QUICK_CATEGORIES.map((item) => (
                <QuickItem
                  key={item.key}
                  item={item}
                  onPress={() => handleQuickCategory(item.key)}
                />
              ))}
            </View>
          </FadeSlide>

          {/* ── Income sustainability ── */}
          <FadeSlide delay={170}>
            <SectionLabel title="Money Forecast" />
            <SustainabilityStatus
              daysRemaining={data.daysRemaining}
              riskLevel={data.riskLevel as any}
              nextIncomeDate={nextPayDate}
            />
          </FadeSlide>

          {/* ── Spending breakdown (filtered) ── */}
          <FadeSlide delay={200}>
            <SectionLabel 
              title="Spending Breakdown" 
              action="See all" 
              onAction={() => router.push('/(tabs)/history')}
          />
            <SpendingBreakdown
              categories={filteredData.categories.map(cat => ({
                ...cat,
                icon: cat.icon || 'shopping-bag',
              }))}
              totalSpent={filteredData.totalSpent}
            />
          </FadeSlide>

          {/* ── Alerts ── */}
          <FadeSlide delay={230}>
            <SectionLabel title="Active Alerts" />
            <AlertsList alerts={activeAlerts} />
          </FadeSlide>

          {/* ── Income info ── */}
          <FadeSlide delay={260}>
            <SectionLabel title="Income Info" />
            <IncomeInfo
              amount={20000}
              type="salary"
              cycle="monthly"
              nextPayDate={nextPayDate}
            />
          </FadeSlide>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const sc = StyleSheet.create({
  errorHeader: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Semantic.divider,
    alignItems: 'center',
  },
  errorHeaderTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Semantic.text,
  },
  retryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Semantic.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: 13,
    marginTop: Spacing.sm,
  },
  retryText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: Colors.white,
  },
});