import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { InsightsStyles as s } from '../../styles/insightsStyles';

interface UserClusterCardProps {
  cluster:     string;
  description: string;
  percentage?: number;
  color?:      string;
}

const CLUSTER_ICONS: Record<string, React.ComponentProps<typeof Ionicons>['name']> = {
  'Balanced Spender':   'scale-outline',
  'Impulsive Spender':  'cart-outline',
  'Conservative Saver': 'save-outline',
  'High-Risk Spender':  'warning-outline',
};

export const UserClusterCard: React.FC<UserClusterCardProps> = ({
  cluster, description, percentage, color = '#6366F1',
}) => {
  const iconName = CLUSTER_ICONS[cluster] ?? 'person-outline';
  const iconBg   = color + '1A';

  return (
    <View style={s.clusterCard}>
      <View style={s.clusterTopRow}>
        <View style={[s.clusterIconWrap, { backgroundColor: iconBg }]}>
          <Ionicons name={iconName} size={24} color={color} />
        </View>
        <View style={{ flex: 1 }}>
          {/* "Your Money Personality" instead of "K-Means Behavior Profile" */}
          <Text style={s.clusterTypeLabel}>Your Money Personality</Text>
          <Text style={[s.clusterName, { color }]}>{cluster}</Text>
        </View>
      </View>

      <Text style={s.clusterDescription}>{description}</Text>

      {percentage !== undefined && (
        <View style={s.clusterFooter}>
          <View style={[s.clusterFooterDot, { backgroundColor: color }]} />
          <Text style={s.clusterFooterText}>
            {percentage}% of SpendWise users share this personality
          </Text>
        </View>
      )}
    </View>
  );
};