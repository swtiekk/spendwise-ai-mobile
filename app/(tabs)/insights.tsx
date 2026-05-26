import { Semantic } from '@constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ErrorMessage } from '../../components/common/ErrorMessage';
import { BehaviorTrends } from '../../components/insights/BehaviorTrends';
import { RecommendationList } from '../../components/insights/RecommendationList';
import { RiskLevelCard } from '../../components/insights/RiskLevelCard';
import { UserClusterCard } from '../../components/insights/UserClusterCard';

import { useInsights } from '../../hooks/useInsights';
import { useUserStore } from '../../store/useUserStore';

import { InsightsStyles as s } from '../../styles/insightsStyles';

function FadeSlide({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(14)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 380,
        delay,
        useNativeDriver: true,
      }),

      Animated.timing(translateY, {
        toValue: 0,
        duration: 380,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        opacity,
        transform: [{ translateY }],
      }}
    >
      {children}
    </Animated.View>
  );
}

function SectionLabel({
  title,
}: {
  title: string;
}) {
  return (
    <View style={s.sectionHeader}>
      <View style={s.sectionDot} />
      <Text style={s.sectionTitle}>{title}</Text>
    </View>
  );
}

export default function InsightsScreen() {
  const router = useRouter();

  const {
    insights,
    isLoading,
    error,
    refresh,
  } = useInsights();

  // Get profile from global store
  const profile = useUserStore((s) => s.profile);

  const clusterLabel =
    (insights as any)?.userCluster || 'Balanced Spender';

  const clusterDescription =
    (insights as any)?.clusterDescription ||
    'Analyzing your spending...';

  const clusterPercentage =
    (insights as any)?.clusterPercentage || 38;

  const clusterColor =
    (insights as any)?.clusterColor || '#6366F1';

  const weeklyData =
    (insights as any)?.weeklyTrend || [];

  const recs = (() => {
    const raw = insights?.recommendations ?? [];
    return (raw as any[])
      .map((r: any) =>
        typeof r === 'string' ? r : r.title ?? ''
      )
      .filter(Boolean);
  })();

  // ── FIXED: Prioritize real data from backend + profile ─────────────────────
  const daysRemaining = (() => {
    // Priority 1: Use daysRemaining directly from ML insights
    if (insights?.daysRemaining !== undefined && insights.daysRemaining !== null) {
      return insights.daysRemaining;
    }

    // Priority 2: Use exact nextIncomeDate from profile
    if (profile?.nextIncomeDate) {
      const next = new Date(profile.nextIncomeDate);
      return Math.max(
        0,
        Math.ceil((next.getTime() - Date.now()) / 86400000)
      );
    }

    // Fallback: Cycle-based calculation
    const cycle = (insights as any)?.incomeCycle ?? 'monthly';
    const next =
      cycle === 'weekly'   ? new Date(Date.now() + 7 * 86400000) :
      cycle === 'biweekly' ? new Date(Date.now() + 14 * 86400000) :
      new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);

    return Math.max(
      0,
      Math.ceil((next.getTime() - Date.now()) / 86400000)
    );
  })();

  const nextPayDate = (() => {
    // Priority 1: Use nextIncomeDate from insights or profile
    const src =
      (insights as any)?.nextIncomeDate ??
      profile?.nextIncomeDate ??
      null;

    if (src) {
      return new Date(src).toLocaleDateString('en-PH', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }

    // Fallback: Cycle-based
    const cycle = (insights as any)?.incomeCycle ?? 'monthly';
    const next =
      cycle === 'weekly'   ? new Date(Date.now() + 7 * 86400000) :
      cycle === 'biweekly' ? new Date(Date.now() + 14 * 86400000) :
      new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);

    return next.toLocaleDateString('en-PH', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  })();

  const riskLevel =
    (insights as any)?.riskLevel || 'low';

  const prediction =
    (insights as any)?.prediction ||
    'Your spending is being analyzed...';

  return (
    <SafeAreaView style={s.screen}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Semantic.background}
      />

      <FadeSlide delay={0}>
        <View style={s.header}>
          <View style={s.headerLeft}>
            <Text style={s.headerEyebrow}>YOUR FINANCES</Text>
            <Text style={s.headerTitle}>My Insights</Text>
          </View>

          <Pressable
            style={({ pressed }) => [
              s.headerAiBadge,
              pressed && { opacity: 0.7 },
            ]}
            onPress={refresh}
            disabled={isLoading}
          >
            <Ionicons
              name={isLoading ? 'sync-outline' : 'pulse-outline'}
              size={13}
              color={Semantic.secondary}
            />
            <Text style={s.headerAiBadgeText}>
              {isLoading ? 'Refreshing...' : 'Up to date'}
            </Text>
          </Pressable>
        </View>
      </FadeSlide>

      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {error && (
          <FadeSlide delay={30}>
            <ErrorMessage
              message={error}
              action={{
                label: 'Retry',
                onPress: refresh,
              }}
            />
          </FadeSlide>
        )}

        <FadeSlide delay={60}>
          <SectionLabel title="How long will your money last?" />

          <View style={s.sustainHeroCard}>
            <View style={s.sustainHeroTopRow}>
              <View style={s.sustainHeroLabelWrap}>
                <View style={s.sustainHeroLabelDot} />
                <Text style={s.sustainHeroLabel}>Money Forecast</Text>
              </View>

              <View style={s.sustainHeroStatusBadge}>
                <Ionicons
                  name="time-outline"
                  size={11}
                  color="rgba(255,255,255,0.55)"
                />
                <Text style={s.sustainHeroStatusText}>Estimated</Text>
              </View>
            </View>

            <View style={s.sustainHeroDaysRow}>
              <Text style={s.sustainHeroDays}>{daysRemaining}</Text>
              <Text style={s.sustainHeroDaysSub}>days of budget left</Text>
            </View>

            <Text style={s.sustainHeroPrediction}>{prediction}</Text>

            <View style={s.sustainHeroDivider} />

            <View style={s.sustainHeroFooterRow}>
              <View style={s.sustainHeroFooterItem}>
                <Text style={s.sustainHeroFooterLabel}>Next Payday</Text>
                <Text style={s.sustainHeroFooterValue}>{nextPayDate}</Text>
              </View>

              <View style={s.sustainHeroFooterItem}>
                <Text style={s.sustainHeroFooterLabel}>Based on</Text>
                <Text style={s.sustainHeroFooterTeal}>
                  Your spending habits
                </Text>
              </View>
            </View>
          </View>
        </FadeSlide>

        <FadeSlide delay={110}>
          <SectionLabel title="Your spending health" />
          {insights && (
            <RiskLevelCard
              riskLevel={riskLevel as any}
              onPress={() => router.push('/spending-health')}
            />
          )}
        </FadeSlide>

        <FadeSlide delay={160}>
          <SectionLabel title="Your money personality" />
          <UserClusterCard
            cluster={clusterLabel}
            description={clusterDescription}
            percentage={clusterPercentage}
            color={clusterColor}
          />
        </FadeSlide>

        <FadeSlide delay={210}>
          <SectionLabel title="Spending this week" />
          <BehaviorTrends weeklyTrend={weeklyData} />
        </FadeSlide>

        <FadeSlide delay={260}>
          <SectionLabel title="Tips for you" />
          <RecommendationList recommendations={recs} />
        </FadeSlide>
      </ScrollView>
    </SafeAreaView>
  );
}