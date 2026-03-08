import { Semantic } from '@constants/colors';
import { BorderRadius, Spacing } from '@constants/spacing';
import { Typography } from '@constants/typography';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { HistoryStyles as s } from '../../styles/historyStyles';

interface EmptyStateProps {
  icon?: React.ComponentProps<typeof Ionicons>['name'];
  title: string;
  message: string;
  action?: {
    label: string;
    onPress: () => void;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'receipt-outline',
  title,
  message,
  action,
}) => {
  return (
    <View style={s.emptyWrap}>
      <View style={s.emptyIconWrap}>
        <Ionicons name={icon} size={36} color={Semantic.primary} />
      </View>
      <Text style={s.emptyTitle}>{title}</Text>
      <Text style={s.emptyMessage}>{message}</Text>
      {action && (
        <TouchableOpacity style={ls.actionBtn} onPress={action.onPress} activeOpacity={0.85}>
          <Text style={ls.actionText}>{action.label}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// Only the action button is local — everything else lives in historyStyles
const ls = StyleSheet.create({
  actionBtn: {
    marginTop: Spacing.sm,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    backgroundColor: Semantic.primary,
  },
  actionText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: '#FFFFFF',
  },
});