import { Colors } from '@constants/colors';
import React from 'react';
import { Text, View } from 'react-native';
import { InsightsStyles as s } from '../../styles/insightsStyles';

interface TrendPoint { day: string; amount: number; }

interface BehaviorTrendsProps {
  weeklyTrend: TrendPoint[];
}

export const BehaviorTrends: React.FC<BehaviorTrendsProps> = ({ weeklyTrend }) => {
  const maxAmount  = Math.max(...weeklyTrend.map(d => d.amount), 1);
  const maxIdx     = weeklyTrend.reduce((mi, d, i) => d.amount > weeklyTrend[mi].amount ? i : mi, 0);
  const totalSpent = weeklyTrend.reduce((sum, d) => sum + d.amount, 0);

  const fmt = (n: number) => n >= 1000 ? `₱${(n / 1000).toFixed(1)}k` : `₱${n}`;

  return (
    <View style={s.trendsCard}>
      <View style={s.trendsTopRow}>
        <Text style={s.trendsCardTitle}>Weekly Spending</Text>
        <Text style={s.trendsTotalText}>Total ₱{totalSpent.toLocaleString('en-PH')}</Text>
      </View>

      <View style={s.chartRow}>
        {weeklyTrend.map((point, i) => {
          const heightPct = (point.amount / maxAmount) * 100;
          const isHighest = i === maxIdx;
          const barColor  = isHighest ? Colors.growthTeal : Colors.intelligenceBlue + '55';
          return (
            <View key={point.day} style={s.barCol}>
              <Text style={s.barAmountText}>{fmt(point.amount)}</Text>
              <View style={[s.bar, { height: `${Math.max(heightPct, 4)}%` as any, backgroundColor: barColor }]} />
              <Text style={isHighest ? s.barDayTextHighlight : s.barDayText}>{point.day}</Text>
            </View>
          );
        })}
      </View>

      <View style={s.trendsLegendRow}>
        <View style={s.trendsLegendItem}>
          <View style={[s.trendsLegendDot, { backgroundColor: Colors.growthTeal }]} />
          <Text style={s.trendsLegendText}>Highest day</Text>
        </View>
        <View style={s.trendsLegendItem}>
          <View style={[s.trendsLegendDot, { backgroundColor: Colors.intelligenceBlue + '55' }]} />
          <Text style={s.trendsLegendText}>Regular</Text>
        </View>
      </View>
    </View>
  );
};