import { Semantic } from '@constants/colors';
import { Spacing } from '@constants/spacing';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSmartPurchase } from '../../hooks/useSmartPurchase';
import { SmartPurchaseStyles as s } from '../../styles/smartPurchaseStyles';
import { formatCurrency } from '../../utils/formatting';
import { PurchaseRecommendation } from './PurchaseRecommendation';
import { RiskIndicator } from './RiskIndicator';

interface SmartPurchaseSheetProps {
  visible:     boolean;
  onClose:     () => void;
  onProceed:   () => void;   // called when user taps "Proceed & Add Expense"
  // Prefilled from the Add Expense form
  amount:      number;
  category:    string;
  description: string;
}

export const SmartPurchaseSheet: React.FC<SmartPurchaseSheetProps> = ({
  visible, onClose, onProceed,
  amount, category, description,
}) => {
  const { decision, isLoading, error, checkPurchase, reset } = useSmartPurchase();

  // Auto-run analysis when sheet opens with valid amount
  useEffect(() => {
    if (visible && amount > 0) {
      reset();
      checkPurchase({ amount, category, description });
    }
  }, [visible]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleProceed = () => {
    reset();
    onProceed(); // submits the Add Expense form
  };

  const handleCheckAgain = () => {
    reset();
    checkPurchase({ amount, category, description });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={s.overlay}>
          <View style={s.sheet}>
            {/* Handle */}
            <View style={s.handle} />

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Sheet header */}
              <View style={s.sheetHeader}>
                <View style={s.sheetHeaderLeft}>
                  <View style={s.sheetAiBadge}>
                    <Ionicons name="analytics-outline" size={11} color={Semantic.secondary} />
                    <Text style={s.sheetAiBadgeText}>SpendWise AI</Text>
                  </View>
                  <Text style={s.sheetTitle}>Smart Purchase</Text>
                  <Text style={s.sheetSubtitle}>
                    AI analysis based on your balance, spending behavior, and risk level.
                  </Text>
                </View>
                <TouchableOpacity style={s.sheetCloseBtn} onPress={handleClose} activeOpacity={0.7}>
                  <Ionicons name="close" size={18} color={Semantic.textSecondary} />
                </TouchableOpacity>
              </View>

              {/* Prefill card — shows what's being analyzed */}
              <View style={s.prefillCard}>
                <View style={s.prefillIconWrap}>
                  <Ionicons name="receipt-outline" size={18} color={Semantic.secondary} />
                </View>
                <View style={s.prefillContent}>
                  <Text style={s.prefillLabel}>Analyzing purchase</Text>
                  <Text style={s.prefillValue}>
                    {description || category || 'Unnamed item'} · {formatCurrency(amount)}
                  </Text>
                </View>
              </View>

              {/* Loading state */}
              {isLoading && (
                <View style={{ alignItems: 'center', paddingVertical: 40, gap: Spacing.md }}>
                  <ActivityIndicator size="large" color={Semantic.secondary} />
                  <Text style={{ fontSize: 13, color: Semantic.textMuted }}>
                    Analyzing your purchase...
                  </Text>
                </View>
              )}

              {/* Error state */}
              {error && !isLoading && (
                <View style={{ alignItems: 'center', paddingVertical: 32, gap: Spacing.md }}>
                  <Ionicons name="cloud-offline-outline" size={40} color={Semantic.textMuted} />
                  <Text style={{ fontSize: 13, color: Semantic.textMuted, textAlign: 'center' }}>
                    {error}
                  </Text>
                  <TouchableOpacity style={s.analyzeBtn} onPress={handleCheckAgain} activeOpacity={0.85}>
                    <Ionicons name="refresh-outline" size={16} color="#fff" />
                    <Text style={s.analyzeBtnText}>Try Again</Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* Result */}
              {decision && !isLoading && (
                <>
                  <RiskIndicator
                    riskScore={decision.riskScore}
                    decision={decision.decision}
                  />
                  <PurchaseRecommendation
                    reasoning={decision.reasoning}
                    suggestions={decision.suggestions}
                    decision={decision.decision}
                  />

                  {/* Action buttons */}
                  <View style={s.actionRow}>
                    {/* Always allow proceeding — AI is advisory, not blocking */}
                    <TouchableOpacity
                      style={s.proceedBtn}
                      onPress={handleProceed}
                      activeOpacity={0.85}
                    >
                      <Ionicons name="checkmark-outline" size={16} color="#fff" />
                      <Text style={s.proceedBtnText}>Proceed & Add</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={s.checkAgainBtn}
                      onPress={handleCheckAgain}
                      activeOpacity={0.8}
                    >
                      <Ionicons name="refresh-outline" size={15} color={Semantic.textSecondary} />
                      <Text style={s.checkAgainBtnText}>Re-check</Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity style={s.closeBtn} onPress={handleClose} activeOpacity={0.8}>
                    <Text style={s.closeBtnText}>Cancel — Don't Add</Text>
                  </TouchableOpacity>
                </>
              )}

              {/* Footer */}
              <View style={s.footerNote}>
                <Ionicons name="information-circle-outline" size={12} color={Semantic.textMuted} />
                <Text style={s.footerNoteText}>
                  Powered by SpendWise AI · For guidance only
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};