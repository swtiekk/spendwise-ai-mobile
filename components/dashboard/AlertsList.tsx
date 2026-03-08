import { Semantic } from '@constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { DashboardStyles as s } from '@styles/dashboardStyles';
import React from 'react';
import { Text, View } from 'react-native';

interface Alert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
}

interface AlertsListProps {
  alerts: Alert[];
  onEmpty?: () => void;
}

function getAlertConfig(type: Alert['type']) {
  switch (type) {
    case 'error':   return { color: Semantic.error,   bg: Semantic.errorBg,   icon: 'warning-outline' };
    case 'warning': return { color: Semantic.warning,  bg: Semantic.warningBg, icon: 'alert-circle-outline' };
    case 'success': return { color: Semantic.success,  bg: Semantic.successBg, icon: 'checkmark-circle-outline' };
    default:        return { color: Semantic.secondary, bg: Semantic.secondaryBg, icon: 'information-circle-outline' };
  }
}

export const AlertsList: React.FC<AlertsListProps> = ({ alerts }) => {
  if (alerts.length === 0) {
    return (
      <View style={s.alertsCard}>
        <View style={s.alertEmptyWrap}>
          <Ionicons name="checkmark-circle-outline" size={36} color={Semantic.primary} />
          <Text style={s.alertEmptyTitle}>All Clear</Text>
          <Text style={s.alertEmptyText}>
            No alerts right now. Keep up the good spending habits!
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={s.alertsCard}>
      {alerts.map((alert, i) => {
        const cfg    = getAlertConfig(alert.type);
        const isLast = i === alerts.length - 1;

        return (
          <View key={alert.id} style={isLast ? s.alertItemLast : s.alertItem}>
            <View style={[s.alertIconWrap, { backgroundColor: cfg.bg }]}>
              <Ionicons name={cfg.icon as any} size={17} color={cfg.color} />
            </View>
            <View style={s.alertContent}>
              <Text style={s.alertTitle}>{alert.title}</Text>
              <Text style={s.alertMessage}>{alert.message}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};