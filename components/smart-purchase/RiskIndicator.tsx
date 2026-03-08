import { Colors } from '@constants/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { SmartPurchaseStyles as s } from '../../styles/smartPurchaseStyles';

interface RiskIndicatorProps {
  riskScore: number; // 0–100
  decision: 'safe' | 'caution' | 'risky';
}

const RISK_CONFIG = {
  safe: {
    bg:       '#D1FAE5',
    text:     '#065F46',
    label:    'Safe to Buy',
    bar:      Colors.success,
    icon:     'shield-checkmark-outline' as const,
  },
  caution: {
    bg:       '#FEF3C7',
    text:     '#92400E',
    label:    'Proceed with Caution',
    bar:      Colors.alertAmber,
    icon:     'alert-circle-outline' as const,
  },
  risky: {
    bg:       '#FEE2E2',
    text:     '#991B1B',
    label:    'High Risk — Defer',
    bar:      Colors.error,
    icon:     'warning-outline' as const,
  },
};

export const RiskIndicator: React.FC<RiskIndicatorProps> = ({ riskScore, decision }) => {
  const cfg = RISK_CONFIG[decision];

  return (
    <View style={[s.riskIndicator, { backgroundColor: cfg.bg }]}>
      <View style={s.riskTopRow}>
        <View style={s.riskLabelWrap}>
          <View style={[s.riskIconWrap]}>
            <Ionicons name={cfg.icon} size={18} color={cfg.text} />
          </View>
          <Text style={[s.riskLabel, { color: cfg.text }]}>{cfg.label}</Text>
        </View>
        <View style={[s.riskScoreBadge, { backgroundColor: 'rgba(0,0,0,0.07)' }]}>
          <Text style={[s.riskScoreText, { color: cfg.text }]}>{riskScore}/100</Text>
        </View>
      </View>

      <View style={s.riskBarTrack}>
        <View style={[s.riskBarFill, {
          width:           `${Math.min(100, riskScore)}%` as any,
          backgroundColor: cfg.bar,
        }]} />
      </View>
    </View>
  );
};