import { Semantic } from '@constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { DashboardStyles as s } from '@styles/dashboardStyles';
import React from 'react';
import { Text, View } from 'react-native';

interface IncomeInfoProps {
  amount: number;
  type: string;
  cycle: string;
  nextPayDate: string;
}

const TYPE_LABELS:  Record<string, string> = { salary: 'Salary', allowance: 'Allowance', freelance: 'Freelance', other: 'Other' };
const CYCLE_LABELS: Record<string, string> = { monthly: 'Monthly', weekly: 'Weekly', biweekly: 'Bi-weekly' };

export const IncomeInfo: React.FC<IncomeInfoProps> = ({
  amount,
  type,
  cycle,
  nextPayDate,
}) => {
  const formatAmount = (n: number) =>
    '₱' + n.toLocaleString('en-PH', { minimumFractionDigits: 0 });

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-PH', {
      month: 'short', day: 'numeric', year: 'numeric',
    });

  return (
    <View style={s.incomeCard}>
      {/* Top row: amount + icon */}
      <View style={s.incomeTopRow}>
        <View style={s.incomeLeft}>
          <Text style={s.incomeLabel}>NEXT INCOME</Text>
          <Text style={s.incomeAmount}>{formatAmount(amount)}</Text>
          <View style={s.incomeMetaRow}>
            <View style={s.incomePill}>
              <Text style={s.incomePillText}>{TYPE_LABELS[type] ?? type}</Text>
            </View>
            <View style={s.incomeSeparator} />
            <Text style={s.incomeCycleText}>{CYCLE_LABELS[cycle] ?? cycle}</Text>
          </View>
        </View>

        <View style={s.incomeIconWrap}>
          <Ionicons name="cash-outline" size={24} color={Semantic.primary} />
        </View>
      </View>

      <View style={s.incomeDivider} />

      {/* Next pay date */}
      <View style={s.incomeNextRow}>
        <Text style={s.incomeNextLabel}>Scheduled for</Text>
        <Text style={s.incomeNextDate}>{formatDate(nextPayDate)}</Text>
      </View>
    </View>
  );
};