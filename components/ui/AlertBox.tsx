import { Colors } from '@constants/colors';
import { BorderRadius, Spacing } from '@constants/spacing';
import { Typography } from '@constants/typography';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type AlertType = 'info' | 'warning' | 'error' | 'success';

interface AlertBoxProps {
  type: AlertType;
  title: string;
  message: string;
}

export const AlertBox: React.FC<AlertBoxProps> = ({ type, title, message }) => {
  const typeConfig = {
    info: { bg: '#EFF6FF', border: '#3B82F6', icon: 'info', color: '#3B82F6' },
    warning: { bg: '#FFFBEB', border: '#F59E0B', icon: 'alert-triangle', color: '#F59E0B' },
    error: { bg: '#FEE2E2', border: '#EF4444', icon: 'alert-circle', color: '#EF4444' },
    success: { bg: '#F0FDF4', border: '#10B981', icon: 'check-circle', color: '#10B981' },
  };

  const config = typeConfig[type];

  const styles = StyleSheet.create({
    container: {
      backgroundColor: config.bg,
      borderLeftWidth: 4,
      borderLeftColor: config.border,
      borderRadius: BorderRadius.lg,
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
      marginBottom: Spacing.lg,
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    icon: {
      marginRight: Spacing.md,
      marginTop: 2,
    },
    content: {
      flex: 1,
    },
    title: {
      color: Colors.trustNavy,
      fontSize: Typography.sizes.sm,
      fontWeight: Typography.weights.semibold,
      marginBottom: 4,
    },
    message: {
      color: Colors.gray600,
      fontSize: Typography.sizes.sm,
      lineHeight: Typography.lineHeights.normal,
    },
  });

  return (
    <View style={styles.container}>
      <Feather
        name={config.icon as any}
        size={20}
        color={config.color}
        style={styles.icon}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
};