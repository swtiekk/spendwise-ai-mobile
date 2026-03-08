import { Colors, Semantic } from '@constants/colors';
import { Spacing } from '@constants/spacing';
import { Typography } from '@constants/typography';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
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
import { useDashboard } from '../../hooks/useDashboard';
import { useNotifications } from '../../hooks/useNotifications';
import { DashboardStyles as s } from '../../styles/dashboardStyles';

// ── Staggered fade-slide entrance ─────────────────────────────────────────────
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
function SectionLabel({ title, action }: { title: string; action?: string }) {
  return (
    <View style={s.sectionHeader}>
      <View style={s.sectionTitleRow}>
        <View style={s.sectionDot} />
        <Text style={s.sectionTitle}>{title}</Text>
      </View>
      {action && <Text style={s.sectionAction}>{action}</Text>}
    </View>
  );
}

// ── Loading skeleton ───────────────────────────────────────────────────────────
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

// ── Main screen ───────────────────────────────────────────────────────────────
export default function DashboardScreen() {
  const router = useRouter();
  const { data, isLoading, error, refresh } = useDashboard();
  const { activeAlerts } = useNotifications();

  const nextPayDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

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

  // ── Main render ───────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={s.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={Semantic.background} />

      {/* Header */}
      <FadeSlide delay={0}>
        <View style={s.header}>
          <View style={s.headerLeft}>
            <Text style={s.headerGreeting}>Good morning</Text>
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

      {/* Loading */}
      {isLoading && <Skeleton />}

      {/* Content */}
      {data && (
        <ScrollView
          style={s.scroll}
          contentContainerStyle={s.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Balance hero card */}
          <FadeSlide delay={60}>
            <BalanceCard
              balance={data.balance}
              lastUpdated="Just now"
              totalSpent={data.totalSpent}
            />
          </FadeSlide>

          {/* Stats mini-row */}
          <FadeSlide delay={100}>
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
                    <Text style={s.statLabel}>Risk Level</Text>
                    <Text style={[s.statValue, { color: risk.color, fontSize: 14 }]}>{risk.label}</Text>
                    <Text style={s.statSubtext}>financial status</Text>
                  </View>
                );
              })()}
            </View>
          </FadeSlide>

          {/* Sustainability */}
          <FadeSlide delay={140}>
            <SectionLabel title="Income Sustainability" />
            <SustainabilityStatus
              daysRemaining={data.daysRemaining}
              riskLevel={data.riskLevel as any}
              nextIncomeDate={nextPayDate}
            />
          </FadeSlide>

          {/* Spending breakdown */}
          <FadeSlide delay={180}>
            <SectionLabel title="Spending Breakdown" action="See all" />
            <SpendingBreakdown
              categories={data.categories.map(cat => ({
                ...cat,
                icon: cat.icon || 'shopping-bag',
              }))}
              totalSpent={data.totalSpent}
            />
          </FadeSlide>

          {/* Alerts */}
          <FadeSlide delay={220}>
            <SectionLabel title="Active Alerts" />
            <AlertsList alerts={activeAlerts} />
          </FadeSlide>

          {/* Income info */}
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

// Screen-local styles
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