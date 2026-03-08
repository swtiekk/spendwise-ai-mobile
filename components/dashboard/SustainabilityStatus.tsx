import { Semantic } from '@constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { DashboardStyles as s } from '@styles/dashboardStyles';
import React from 'react';
import { Text, View } from 'react-native';

type RiskLevel = 'safe' | 'caution' | 'danger';

interface SustainabilityStatusProps {
  daysRemaining: number;
  riskLevel: RiskLevel;
  nextIncomeDate: string;
}

function getRiskConfig(level: RiskLevel) {
  switch (level) {
    case 'danger':  return { color: Semantic.error,   bg: Semantic.errorBg,   icon: 'warning-outline',          label: 'High Risk' };
    case 'caution': return { color: Semantic.warning,  bg: Semantic.warningBg, icon: 'alert-circle-outline',     label: 'Moderate' };
    default:        return { color: Semantic.success,  bg: Semantic.successBg, icon: 'checkmark-circle-outline', label: 'On Track' };
  }
}

export const SustainabilityStatus: React.FC<SustainabilityStatusProps> = ({
  daysRemaining,
  riskLevel,
  nextIncomeDate,
}) => {
  const risk     = getRiskConfig(riskLevel);
  const progress = Math.max(0, Math.min(1, daysRemaining / 30));

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-PH', {
      month: 'short', day: 'numeric', year: 'numeric',
    });

  return (
    <View style={s.sustainCard}>
      <View style={s.sustainTopRow}>
        <View>
          <Text style={s.sustainLabel}>Until Next Income</Text>
          <View style={s.sustainDaysRow}>
            <Text style={s.sustainDays}>{daysRemaining}</Text>
            <Text style={s.sustainDaysSub}>days remaining</Text>
          </View>
        </View>

        <View style={[s.sustainRiskBadge, { backgroundColor: risk.bg }]}>
          <Ionicons name={risk.icon as any} size={13} color={risk.color} />
          <Text style={[s.sustainRiskText, { color: risk.color }]}>{risk.label}</Text>
        </View>
      </View>

      {/* Progress bar */}
      <View style={s.sustainTrack}>
        <View style={[s.sustainFill, { width: `${progress * 100}%`, backgroundColor: risk.color }]} />
      </View>

      <View style={s.sustainFooter}>
        <Text style={s.sustainFooterText}>Today</Text>
        <Text style={s.sustainFooterText}>Next: {formatDate(nextIncomeDate)}</Text>
      </View>
    </View>
  );
};