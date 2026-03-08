import { ExpenseCategories } from '@constants/categories';
import { Semantic } from '@constants/colors';
import { Spacing } from '@constants/spacing';
import { Typography } from '@constants/typography';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SuccessNotification } from '../../components/common/SuccessNotification';
import { AddExpenseForm } from '../../components/expense/AddExpenseForm';
import { SmartPurchaseSheet } from '../../components/smart-purchase/SmartPurchaseSheet';
import { AddExpenseStyles as s } from '../../styles/addExpenseStyles';
import { SmartPurchaseStyles as sp } from '../../styles/smartPurchaseStyles';

type Category = keyof typeof ExpenseCategories;

// ── Staggered fade-slide ───────────────────────────────────────────────────────
function FadeSlide({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const opacity    = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(14)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity,    { toValue: 1, duration: 360, delay, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 360, delay, useNativeDriver: true }),
    ]).start();
  }, []);
  return (
    <Animated.View style={{ opacity, transform: [{ translateY }] }}>
      {children}
    </Animated.View>
  );
}

// ── Screen ─────────────────────────────────────────────────────────────────────
export default function AddExpenseScreen() {
  const router = useRouter();
  const { height } = useWindowDimensions();

  // Dynamic desc height so content fills screen on any device size
  // 780 = approx sum of all other elements (header + amount card + category + buttons + AI + gaps)
  const descHeight = Math.max(80, height - 780);

  // ── Lifted state ──────────────────────────────────────────────────────────
  const [amount,      setAmount]      = useState('');
  const [category,    setCategory]    = useState<Category | null>(null);
  const [description, setDescription] = useState('');
  const [showSuccess,  setShowSuccess]  = useState(false);
  const [showAiSheet,  setShowAiSheet]  = useState(false);

  const parsedAmount   = parseFloat(amount);
  const canCheckWithAi = !isNaN(parsedAmount) && parsedAmount > 0 && category !== null;

  const handleSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      router.replace('/(tabs)/history');
    }, 1800);
  };

  const handleReset = () => {
    setAmount('');
    setCategory(null);
    setDescription('');
  };

  return (
    <SafeAreaView style={s.screen} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={Semantic.background} />

      {/* ── Header ── */}
      <FadeSlide delay={0}>
        <View style={s.header}>
          <TouchableOpacity style={s.headerCloseBtn} onPress={() => router.back()} activeOpacity={0.7}>
            <Ionicons name="close" size={20} color={Semantic.text} />
          </TouchableOpacity>
          <Text style={s.headerTitle}>Add Expense</Text>
          <TouchableOpacity style={s.headerResetBtn} onPress={handleReset} activeOpacity={0.7}>
            <Text style={s.headerResetText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </FadeSlide>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={s.scroll}
          contentContainerStyle={s.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <FadeSlide delay={60}>
            <AddExpenseForm
              amount={amount}
              onAmountChange={setAmount}
              category={category}
              onCategoryChange={setCategory}
              description={description}
              onDescriptionChange={setDescription}
              onSuccess={handleSuccess}
              onCancel={() => router.back()}
              descHeight={descHeight}
            />
          </FadeSlide>

          {/* ── AI Advisor section ── */}
          <FadeSlide delay={120}>
            <View style={sc.aiSection}>
              <View style={sc.aiSectionHeader}>
                <View style={sc.aiSectionDot} />
                <Text style={sc.aiSectionTitle}>AI Advisor</Text>
              </View>

              <TouchableOpacity
                style={[sp.aiCheckBtn, !canCheckWithAi && sc.aiCheckBtnDisabled]}
                onPress={() => setShowAiSheet(true)}
                disabled={!canCheckWithAi}
                activeOpacity={0.85}
              >
                <Ionicons
                  name="flash-outline"
                  size={17}
                  color={canCheckWithAi ? Semantic.secondary : Semantic.textMuted}
                />
                <Text style={[sp.aiCheckBtnText, !canCheckWithAi && { color: Semantic.textMuted }]}>
                  Check with AI before adding
                </Text>
              </TouchableOpacity>

              {!canCheckWithAi && (
                <Text style={sc.aiHintText}>
                  Enter an amount and select a category to enable
                </Text>
              )}
            </View>
          </FadeSlide>
        </ScrollView>
      </KeyboardAvoidingView>

      <SuccessNotification visible={showSuccess} message="Expense added successfully!" />

      <SmartPurchaseSheet
        visible={showAiSheet}
        onClose={() => setShowAiSheet(false)}
        onProceed={() => setShowAiSheet(false)}
        amount={parsedAmount || 0}
        category={category ?? ''}
        description={description}
      />
    </SafeAreaView>
  );
}

const sc = StyleSheet.create({
  aiSection: {
    marginTop: Spacing.sm,
    marginBottom: 0,
  },
  aiSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  aiSectionDot: {
    width: 6, height: 6,
    borderRadius: 3,
    backgroundColor: Semantic.secondary,
  },
  aiSectionTitle: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: Semantic.text,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  aiCheckBtnDisabled: { opacity: 0.4 },
  aiHintText: {
    fontSize: Typography.sizes.xs,
    color: Semantic.textMuted,
    marginTop: Spacing.sm,
    textAlign: 'center',
  },
});