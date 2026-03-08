import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AmountInput } from '../../components/expense/AmountInput';
import { Header } from '../../components/layout/Header';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { PurchaseRecommendation } from '../../components/smart-purchase/PurchaseRecommendation';
import { RiskIndicator } from '../../components/smart-purchase/RiskIndicator';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Colors, Semantic } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { Typography } from '../../constants/typography';
import { useSmartPurchase } from '../../hooks/useSmartPurchase';
import { formatCurrency } from '../../utils/formatting';
import { validatePurchaseRequest } from '../../utils/validation';

export default function SmartPurchaseScreen() {
  const router = useRouter();
  const { decision, isLoading, checkPurchase, reset } = useSmartPurchase();

  const [amount, setAmount]           = useState('');
  const [category, setCategory]       = useState('');
  const [description, setDesc]        = useState('');
  const [amountError, setAmountError] = useState('');

  const handleCheck = async () => {
    const { isValid, errors } = validatePurchaseRequest(amount);
    if (!isValid) { setAmountError(errors.amount ?? ''); return; }
    setAmountError('');
    await checkPurchase({ amount: parseFloat(amount), category, description });
  };

  const handleReset = () => {
    reset();
    setAmount('');
    setCategory('');
    setDesc('');
    setAmountError('');
  };

  const styles = StyleSheet.create({
    content: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.lg },
    heroCard: {
      backgroundColor: Colors.trustNavy,
      borderRadius: 16,
      padding: Spacing.xl,
      marginBottom: Spacing.xl,
      alignItems: 'center',
    },
    heroEmoji:   { fontSize: 40, marginBottom: Spacing.md },
    heroTitle: {
      fontSize: Typography.sizes['2xl'],
      fontWeight: Typography.weights.bold,
      color: '#FFFFFF',
      marginBottom: Spacing.sm,
      textAlign: 'center',
    },
    heroSubtitle: {
      fontSize: Typography.sizes.sm,
      color: 'rgba(255,255,255,0.7)',
      textAlign: 'center',
      lineHeight: Typography.lineHeights.relaxed,
    },
    inputGroup:   { marginBottom: Spacing.md },
    resultAmount: {
      fontSize: Typography.sizes.sm,
      color: Semantic.textSecondary,
      marginBottom: Spacing.lg,
      textAlign: 'center',
    },
    divider:  { height: 1, backgroundColor: Semantic.divider, marginVertical: Spacing.lg },
    resetLink: { alignItems: 'center', marginTop: Spacing.md },
    resetText: {
      fontSize: Typography.sizes.sm,
      color: Semantic.primary,
      fontWeight: Typography.weights.semibold,
    },
    disclaimer: {
      fontSize: Typography.sizes.xs,
      color: Semantic.textMuted,
      textAlign: 'center',
      marginTop: Spacing.xl,
      lineHeight: Typography.lineHeights.relaxed,
    },
  });

  return (
    <ScreenContainer scrollable={false}>
      <Header title="Smart Purchase" onBackPress={() => router.back()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>

          <View style={styles.heroCard}>
            <Text style={styles.heroEmoji}>🧠</Text>
            <Text style={styles.heroTitle}>AI Purchase Advisor</Text>
            <Text style={styles.heroSubtitle}>
              Enter what you want to buy and we'll tell you if it's financially safe.
            </Text>
          </View>

          {!decision ? (
            <>
              <View style={styles.inputGroup}>
                <AmountInput value={amount} onChangeText={setAmount} error={amountError} autoFocus />
              </View>
              <View style={styles.inputGroup}>
                <Input label="Category (optional)" placeholder="e.g. Shopping, Electronics" value={category} onChangeText={setCategory} />
              </View>
              <View style={styles.inputGroup}>
                <Input label="What are you buying? (optional)" placeholder="e.g. New shoes, Groceries" value={description} onChangeText={setDesc} />
              </View>
              <Button
                title={isLoading ? 'Analyzing...' : '🧠 Analyze Purchase'}
                onPress={handleCheck}
                disabled={isLoading}
                variant="primary"
                size="lg"
              />
            </>
          ) : (
            <>
              <Text style={styles.resultAmount}>
                Analysis for {formatCurrency(parseFloat(amount))}
                {category ? ` · ${category}` : ''}
              </Text>
              <RiskIndicator riskScore={decision.riskScore} decision={decision.decision} />
              <PurchaseRecommendation
                reasoning={decision.reasoning}
                suggestions={decision.suggestions}
                decision={decision.decision}
              />
              <View style={styles.divider} />
              <Button title="Check Another Purchase" onPress={handleReset} variant="primary" size="lg" />
              <TouchableOpacity style={styles.resetLink} onPress={() => router.back()}>
                <Text style={styles.resetText}>← Back to Dashboard</Text>
              </TouchableOpacity>
            </>
          )}

          <Text style={styles.disclaimer}>
            This analysis is for guidance only and does not constitute financial advice.
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}