import { Semantic } from '@constants/colors';
import { BorderRadius, Spacing } from '@constants/spacing';
import { Typography } from '@constants/typography';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSmartPurchase } from '../../hooks/useSmartPurchase';
import { formatCurrency } from '../../utils/formatting';
import { validatePurchaseRequest } from '../../utils/validation';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { PurchaseRecommendation } from './PurchaseRecommendation';
import { RiskIndicator } from './RiskIndicator';

interface PurchaseDecisionModalProps {
  visible: boolean;
  onClose: () => void;
}

export const PurchaseDecisionModal: React.FC<PurchaseDecisionModalProps> = ({
  visible,
  onClose,
}) => {
  const { decision, isLoading, checkPurchase, reset } = useSmartPurchase();
  const [amount, setAmount]       = useState('');
  const [category, setCategory]   = useState('');
  const [description, setDesc]    = useState('');
  const [amountError, setAmountError] = useState('');

  const handleCheck = async () => {
    const { isValid, errors } = validatePurchaseRequest(amount);
    if (!isValid) {
      setAmountError(errors.amount ?? '');
      return;
    }
    setAmountError('');
    await checkPurchase({ amount: parseFloat(amount), category, description });
  };

  const handleClose = () => {
    reset();
    setAmount('');
    setCategory('');
    setDesc('');
    setAmountError('');
    onClose();
  };

  const styles = StyleSheet.create({
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    sheet: {
      backgroundColor: Semantic.surface,
      borderTopLeftRadius: BorderRadius.xl,
      borderTopRightRadius: BorderRadius.xl,
      paddingHorizontal: Spacing.lg,
      paddingTop: Spacing.lg,
      paddingBottom: Spacing.xxxl,
      maxHeight: '90%',
    },
    handle: {
      width: 40, height: 4,
      backgroundColor: Semantic.border,
      borderRadius: BorderRadius.full,
      alignSelf: 'center',
      marginBottom: Spacing.lg,
    },
    title: {
      fontSize: Typography.sizes['2xl'],
      fontWeight: Typography.weights.bold,
      color: Semantic.text,
      marginBottom: Spacing.sm,
    },
    subtitle: {
      fontSize: Typography.sizes.sm,
      color: Semantic.textSecondary,
      marginBottom: Spacing.xl,
    },
    inputGroup: { marginBottom: Spacing.md },
    aiLabel: {
      fontSize: Typography.sizes.xs,
      color: Semantic.textMuted,
      textAlign: 'center',
      marginTop: Spacing.md,
    },
  });

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.overlay}>
          <View style={styles.sheet}>
            <View style={styles.handle} />
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.title}>🧠 Smart Purchase</Text>
              <Text style={styles.subtitle}>
                Enter a purchase amount and our AI will assess the financial risk.
              </Text>

              {!decision ? (
                <>
                  <View style={styles.inputGroup}>
                    <Input
                      label="Purchase Amount (₱)"
                      placeholder="e.g. 2500"
                      value={amount}
                      onChangeText={setAmount}
                      keyboardType="numeric"
                      error={amountError}
                    />
                  </View>
                  <View style={styles.inputGroup}>
                    <Input
                      label="Category (optional)"
                      placeholder="e.g. Shopping, Health"
                      value={category}
                      onChangeText={setCategory}
                    />
                  </View>
                  <View style={styles.inputGroup}>
                    <Input
                      label="Description (optional)"
                      placeholder="What are you buying?"
                      value={description}
                      onChangeText={setDesc}
                    />
                  </View>
                  <Button
                    title={isLoading ? 'Analyzing...' : 'Analyze Purchase'}
                    onPress={handleCheck}
                    disabled={isLoading}
                    variant="primary"
                    size="lg"
                  />
                </>
              ) : (
                <>
                  <Text style={{ ...styles.subtitle, marginBottom: Spacing.md }}>
                    Amount: {formatCurrency(parseFloat(amount))}
                  </Text>
                  <RiskIndicator riskScore={decision.riskScore} decision={decision.decision} />
                  <PurchaseRecommendation
                    reasoning={decision.reasoning}
                    suggestions={decision.suggestions}
                    decision={decision.decision}
                  />
                  <Button title="Check Another" onPress={() => { reset(); setAmount(''); }} variant="outline" size="lg" />
                </>
              )}

              <Button title="Close" onPress={handleClose} variant="outline" size="md" style={{ marginTop: Spacing.md }} />
              <Text style={styles.aiLabel}>Powered by SpendWise AI · For guidance only</Text>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
