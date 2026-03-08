import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/ui/Button';
import { Colors, Semantic } from '../../constants/colors';
import { BorderRadius, Spacing } from '../../constants/spacing';
import { Typography } from '../../constants/typography';

export default function ConfirmationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    title?: string;
    message?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: 'danger' | 'primary';
    icon?: string;
  }>();

  const variant   = params.variant ?? 'danger';
  const icon      = params.icon    ?? 'alert-circle';
  const iconColor = variant === 'danger' ? Colors.error : Colors.growthTeal;

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: Spacing.xl,
    },
    card: {
      backgroundColor: Semantic.surface,
      borderRadius: BorderRadius.xl,
      padding: Spacing.xl,
      width: '100%',
    },
    iconWrap: {
      width: 56, height: 56,
      borderRadius: BorderRadius.full,
      backgroundColor: iconColor + '20',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginBottom: Spacing.lg,
    },
    title: {
      fontSize: Typography.sizes.xl,
      fontWeight: Typography.weights.bold,
      color: Semantic.text,
      textAlign: 'center',
      marginBottom: Spacing.sm,
    },
    message: {
      fontSize: Typography.sizes.sm,
      color: Semantic.textSecondary,
      textAlign: 'center',
      lineHeight: Typography.lineHeights.relaxed,
      marginBottom: Spacing.xl,
    },
    buttonRow: { flexDirection: 'row', gap: Spacing.md },
  });

  return (
    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.iconWrap}>
            <Feather name={icon as any} size={28} color={iconColor} />
          </View>
          <Text style={styles.title}>{params.title ?? 'Confirm'}</Text>
          <Text style={styles.message}>{params.message ?? 'Are you sure?'}</Text>
          <View style={styles.buttonRow}>
            <Button
              title={params.cancelLabel ?? 'Cancel'}
              onPress={() => router.back()}
              variant="outline"
              size="md"
              style={{ flex: 1 }}
            />
            <Button
              title={params.confirmLabel ?? 'Confirm'}
              onPress={() => router.back()}
              variant={variant}
              size="md"
              style={{ flex: 1 }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}