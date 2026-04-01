import { Semantic } from '@constants/colors';
import { Spacing } from '@constants/spacing';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Pressable, ScrollView, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { useInsights } from '../hooks/useInsights';
import { InsightsStyles as s } from '../styles/insightsStyles';

const CATEGORY_ICONS: Record<string, string> = {
  Food: 'fast-food-outline',
  Transport: 'car-outline',
  Shopping: 'bag-handle-outline',
  Utilities: 'flash-outline',
  Health: 'medical-outline',
  Entertainment: 'game-controller-outline',
  Savings: 'wallet-outline',
  Others: 'ellipsis-horizontal-outline',
};

const RISK_CONFIG = {
  low: { bg: '#16A34A', label: 'Healthy', icon: 'checkmark-circle' },
  medium: { bg: '#D97706', label: 'Caution', icon: 'alert-circle' },
  high: { bg: '#DC2626', label: 'Critical', icon: 'warning' },
};

export default function SpendingHealthScreen() {
  const router = useRouter();
  const { insights, isLoading, error, refresh } = useInsights();

  const riskLevel = insights?.riskLevel || 'medium';
  const cfg = RISK_CONFIG[riskLevel as keyof typeof RISK_CONFIG] || RISK_CONFIG.medium;
  const breakdown = insights?.categoryBreakdown || [];

  const formatAmount = (amount: number) =>
    '₱' + amount.toLocaleString('en-PH', { minimumFractionDigits: 0 });

  if (isLoading && !insights) {
    return (
      <SafeAreaView style={[s.screen, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={Semantic.secondary} />
        <Text style={{ marginTop: 12, color: Semantic.textSecondary, fontWeight: '600' }}>
          Analyzing your spending...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[s.screen, { backgroundColor: Semantic.background }]}>
      <StatusBar barStyle="dark-content" />
      
      <View style={[s.header, { paddingBottom: Spacing.md }]}>
        <Pressable onPress={() => router.back()} style={{ padding: 8, marginLeft: -8 }}>
          <Ionicons name="arrow-back" size={24} color={Semantic.text} />
        </Pressable>
        <Text style={[s.headerTitle, { fontSize: 20, flex: 1, marginLeft: 12 }]}>Spending Health</Text>
        <Pressable onPress={refresh} disabled={isLoading} style={{ padding: 8 }}>
          <Ionicons name={isLoading ? "sync" : "refresh"} size={20} color={Semantic.secondary} />
        </Pressable>
      </View>

      <ScrollView 
        style={s.scroll} 
        contentContainerStyle={[s.scrollContent, { paddingTop: 0 }]}
        showsVerticalScrollIndicator={false}
      >
        {error && <ErrorMessage message={error} action={{ label: 'Retry', onPress: refresh }} />}

        <View style={{ marginTop: 12 }}>
          <View style={{ 
            backgroundColor: cfg.bg, 
            padding: 24, 
            borderRadius: 24,
            alignItems: 'center',
            elevation: 4,
            shadowColor: cfg.bg,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
          }}>
            <View style={{ 
              width: 64, height: 64, borderRadius: 32, 
              backgroundColor: 'rgba(255,255,255,0.2)', 
              justifyContent: 'center', alignItems: 'center',
              marginBottom: 16
            }}>
              <Ionicons name={cfg.icon as any} size={32} color="#FFF" />
            </View>
            <Text style={{ color: 'rgba(255,255,255,0.8)', fontWeight: '700', fontSize: 12, letterSpacing: 1 }}>
              CURRENT STATUS
            </Text>
            <Text style={{ color: '#FFF', fontWeight: '800', fontSize: 32, marginTop: 4 }}>
              {cfg.label}
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 24 }}>
          <View style={s.sectionHeader}>
            <View style={s.sectionDot} />
            <Text style={s.sectionTitle}>Detailed Breakdown</Text>
          </View>

          <View style={{ backgroundColor: Semantic.surface, borderRadius: 24, padding: 20 }}>
            {breakdown.length === 0 ? (
              <Text style={{ textAlign: 'center', color: Semantic.textMuted, padding: 20 }}>
                No spending data available for this cycle.
              </Text>
            ) : (
              breakdown.map((cat, index) => (
                <View 
                  key={cat.id} 
                  style={{ 
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    marginBottom: index === breakdown.length - 1 ? 0 : 20 
                  }}
                >
                  <View style={{ 
                    width: 44, height: 44, borderRadius: 12, 
                    backgroundColor: cat.color + '20', 
                    justifyContent: 'center', alignItems: 'center',
                    marginRight: 16
                  }}>
                    <Ionicons 
                      name={(CATEGORY_ICONS[cat.label] || 'cube-outline') as any} 
                      size={20} color={cat.color} 
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                      <Text style={{ color: Semantic.text, fontWeight: '700', fontSize: 15 }}>{cat.label}</Text>
                      <Text style={{ color: Semantic.text, fontWeight: '800', fontSize: 15 }}>{formatAmount(cat.value)}</Text>
                    </View>
                    <View style={{ height: 6, borderRadius: 3, backgroundColor: Semantic.secondaryBg, overflow: 'hidden' }}>
                      <View style={{ height: '100%', width: `${cat.percentage ?? 0}%`, backgroundColor: cat.color }} />
                    </View>
                    <Text style={{ color: Semantic.textMuted, fontSize: 11, marginTop: 4, fontWeight: '600' }}>
                      {cat.percentage}% of total spending
                    </Text>
                  </View>
                </View>
              ))
            )}
          </View>
        </View>

        <View style={{ 
          marginTop: 24, 
          backgroundColor: Semantic.secondaryBg, 
          padding: 20, 
          borderRadius: 24, 
          borderLeftWidth: 4, 
          borderLeftColor: Semantic.secondary 
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Ionicons name="sparkles" size={16} color={Semantic.secondary} style={{ marginRight: 6 }} />
            <Text style={{ color: Semantic.secondary, fontWeight: '800', fontSize: 12, letterSpacing: 0.5 }}>
              AI INSIGHT
            </Text>
          </View>
          <Text style={{ color: Semantic.text, fontSize: 14, lineHeight: 22, fontWeight: '500' }}>
            {insights?.prediction || "Your spending patterns are stable. You're likely to stay within budget if you maintain this pace."}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}