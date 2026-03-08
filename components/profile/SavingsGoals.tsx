import { Semantic } from '@constants/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { ProfileStyles as s } from '../../styles/profileStyles';
import { calcSavingsProgress } from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatting';

interface Goal {
  id:            string;
  name:          string;
  targetAmount:  number;
  currentAmount: number;
}

interface SavingsGoalsProps { goals: Goal[] }

export const SavingsGoals: React.FC<SavingsGoalsProps> = ({ goals }) => {
  return (
    <View style={s.goalsCard}>
      {/* ── Card header ── */}
      <View style={s.goalsCardHeader}>
        <View style={s.goalsCardHeaderLeft}>
          <Ionicons name="trophy-outline" size={16} color={Semantic.primary} />
          <Text style={s.goalsCardTitle}>Savings Goals</Text>
        </View>
        <View style={s.goalsCountBadge}>
          <Text style={s.goalsCountText}>{goals.length} active</Text>
        </View>
      </View>

      {/* ── Goal items ── */}
      {goals.map((goal, idx) => {
        const pct       = calcSavingsProgress(goal.currentAmount, goal.targetAmount);
        const isLast    = idx === goals.length - 1;
        const itemStyle = isLast ? s.goalItemLast : s.goalItem;

        return (
          <View key={goal.id} style={itemStyle}>
            <View style={s.goalTopRow}>
              <Text style={s.goalName}>{goal.name}</Text>
              <Text style={s.goalPct}>{pct}%</Text>
            </View>
            <View style={s.goalBarBg}>
              <View style={[s.goalBarFill, { width: `${pct}%` as any }]} />
            </View>
            <View style={s.goalAmountsRow}>
              <Text style={s.goalAmountText}>{formatCurrency(goal.currentAmount)}</Text>
              <Text style={s.goalAmountText}>of {formatCurrency(goal.targetAmount)}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};