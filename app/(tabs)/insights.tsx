import { Semantic } from '@constants/colors';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, ScrollView, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { BehaviorTrends } from '../../components/insights/BehaviorTrends';
import { RecommendationList } from '../../components/insights/RecommendationList';
import { RiskLevelCard } from '../../components/insights/RiskLevelCard';
import { UserClusterCard } from '../../components/insights/UserClusterCard';
import { mockInsights } from '../../data/mockData';
import { seedClusterProfiles } from '../../data/seedData';
import { useInsights } from '../../hooks/useInsights';
import { InsightsStyles as s } from '../../styles/insightsStyles';

// ── Staggered fade-slide ──────────────────────────────────────────────────────
function FadeSlide({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const opacity    = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(14)).current;
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
function SectionLabel({ title }: { title: string }) {
  return (
    <View style={s.sectionHeader}>
      <View style={s.sectionDot} />
      <Text style={s.sectionTitle}>{title}</Text>
    </View>
  );
}

// ── Screen ────────────────────────────────────────────────────────────────────
export default function InsightsScreen() {
  const { error, refresh } = useInsights();

  const cluster    = seedClusterProfiles[0];
  const weeklyData = mockInsights.weeklyTrend;
  const recs       = mockInsights.recommendations;

  const daysRemaining = 14;
  const riskLevel     = 'medium' as const;
  const prediction    = mockInsights.prediction;
  const nextPayDate   = new Date(Date.now() + daysRemaining * 24 * 60 * 60 * 1000)
    .toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' });

  if (error) {
    return (
      <SafeAreaView style={s.screen}>
        <View style={s.header}>
          <View style={s.headerLeft}>
            <Text style={s.headerTitle}>My Insights</Text>
          </View>
        </View>
        <ErrorMessage message={error} action={{ label: 'Retry', onPress: refresh }} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={Semantic.background} />

      {/* ── Header ── */}
      <FadeSlide delay={0}>
        <View style={s.header}>
          <View style={s.headerLeft}>
            {/* Removed "Machine Learning" eyebrow — not user-friendly */}
            <Text style={s.headerEyebrow}>YOUR FINANCES</Text>
            <Text style={s.headerTitle}>My Insights</Text>
          </View>
          <View style={s.headerAiBadge}>
            <Ionicons name="pulse-outline" size={13} color={Semantic.secondary} />
            {/* "Live Analysis" softened to "Up to date" */}
            <Text style={s.headerAiBadgeText}>Up to date</Text>
          </View>
        </View>
      </FadeSlide>

      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── 1. How long will your money last? ── */}
        <FadeSlide delay={60}>
          <SectionLabel title="How long will your money last?" />
          <View style={s.sustainHeroCard}>
            {/* Removed "Regression Forecast" — replaced with plain status */}
            <View style={s.sustainHeroTopRow}>
              <View style={s.sustainHeroLabelWrap}>
                <View style={s.sustainHeroLabelDot} />
                <Text style={s.sustainHeroLabel}>Money Forecast</Text>
              </View>
              <View style={s.sustainHeroStatusBadge}>
                <Ionicons name="time-outline" size={11} color="rgba(255,255,255,0.55)" />
                <Text style={s.sustainHeroStatusText}>Estimated</Text>
              </View>
            </View>

            {/* Big days number */}
            <View style={s.sustainHeroDaysRow}>
              <Text style={s.sustainHeroDays}>{daysRemaining}</Text>
              <Text style={s.sustainHeroDaysSub}>days of budget left</Text>
            </View>

            <Text style={s.sustainHeroPrediction}>{prediction}</Text>

            <View style={s.sustainHeroDivider} />

            {/* Footer — removed "Model: Linear Regression", replaced with useful info */}
            <View style={s.sustainHeroFooterRow}>
              <View style={s.sustainHeroFooterItem}>
                <Text style={s.sustainHeroFooterLabel}>Next Payday</Text>
                <Text style={s.sustainHeroFooterValue}>{nextPayDate}</Text>
              </View>
              <View style={s.sustainHeroFooterItem}>
                <Text style={s.sustainHeroFooterLabel}>Based on</Text>
                <Text style={s.sustainHeroFooterTeal}>Your spending habits</Text>
              </View>
            </View>
          </View>
        </FadeSlide>

        {/* ── 2. Your spending health ── */}
        <FadeSlide delay={110}>
          <SectionLabel title="Your spending health" />
          <RiskLevelCard riskLevel={riskLevel} />
        </FadeSlide>

        {/* ── 3. Your money personality ── */}
        <FadeSlide delay={160}>
          <SectionLabel title="Your money personality" />
          <UserClusterCard
            cluster={cluster.label}
            description={cluster.description}
            percentage={cluster.percentage}
            color={cluster.color}
          />
        </FadeSlide>

        {/* ── 4. Spending this week ── */}
        <FadeSlide delay={210}>
          <SectionLabel title="Spending this week" />
          <BehaviorTrends weeklyTrend={weeklyData} />
        </FadeSlide>

        {/* ── 5. Tips for you ── */}
        <FadeSlide delay={260}>
          <SectionLabel title="Tips for you" />
          <RecommendationList recommendations={recs} />
        </FadeSlide>
      </ScrollView>
    </SafeAreaView>
  );
}