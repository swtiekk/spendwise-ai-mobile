import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { InsightsStyles as s } from '../../styles/insightsStyles';

export type RiskLevel = 'low' | 'medium' | 'high';

interface RiskLevelCardProps {
  riskLevel: RiskLevel;
}

const RISK_CONFIG = {
  low: {
    bg:          '#16A34A',
    statusLabel: 'ALL GOOD',
    title:       "You're doing great!",
    description: "Your spending is well within your budget this cycle. Keep it up — you're on track to reach your next payday with money to spare.",
    icon:        'shield-checkmark-outline' as const,
    meter:       0.2,
  },
  medium: {
    bg:          '#D97706',
    statusLabel: 'HEADS UP',
    title:       'Watch your spending',
    description: "You've been spending a bit more than usual lately. Try to hold off on non-essential purchases for the next few days to stay on track.",
    icon:        'alert-circle-outline' as const,
    meter:       0.55,
  },
  high: {
    bg:          '#DC2626',
    statusLabel: 'TAKE ACTION',
    title:       'Time to cut back',
    description: "At this rate, your money may not last until your next payday. Try to avoid unnecessary expenses and focus only on essentials right now.",
    icon:        'warning-outline' as const,
    meter:       0.9,
  },
};

export const RiskLevelCard: React.FC<RiskLevelCardProps> = ({ riskLevel }) => {
  const cfg = RISK_CONFIG[riskLevel];

  return (
    <View style={[s.riskCard, { backgroundColor: cfg.bg }]}>
      {/* Top row — status label + icon */}
      <View style={s.riskCardTopRow}>
        <Text style={[s.riskCardLabel, { color: 'rgba(255,255,255,0.8)' }]}>
          {cfg.statusLabel}
        </Text>
        <View style={s.riskIconWrap}>
          <Ionicons name={cfg.icon} size={22} color="rgba(255,255,255,0.9)" />
        </View>
      </View>

      {/* Title */}
      <Text style={[s.riskLevelText, { color: '#FFFFFF' }]}>{cfg.title}</Text>

      {/* Plain-language description */}
      <Text style={[s.riskDescription, { color: 'rgba(255,255,255,0.85)' }]}>
        {cfg.description}
      </Text>

      {/* Health meter */}
      <View style={s.riskMeterTrack}>
        <View style={[s.riskMeterFill, { width: `${cfg.meter * 100}%` as any }]} />
      </View>
      <View style={s.riskMeterLabels}>
        <Text style={[s.riskMeterLabelText, { color: 'rgba(255,255,255,0.6)' }]}>Healthy</Text>
        <Text style={[s.riskMeterLabelText, { color: 'rgba(255,255,255,0.6)' }]}>Caution</Text>
        <Text style={[s.riskMeterLabelText, { color: 'rgba(255,255,255,0.6)' }]}>Critical</Text>
      </View>
    </View>
  );
};