import { Semantic } from '@constants/colors';
import { BorderRadius, Shadow, Spacing } from '@constants/spacing';
import { Typography } from '@constants/typography';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onBackPress?: () => void;
  rightAction?: {
    label?: string;
    onPress: () => void;
    icon?: string;
  };
  style?: ViewStyle;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  onBackPress,
  rightAction,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.left}>
        {onBackPress && (
          <TouchableOpacity
            style={styles.backBtn}
            onPress={onBackPress}
            activeOpacity={0.7}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="arrow-back" size={20} color={Semantic.text} />
          </TouchableOpacity>
        )}
        <View style={styles.titleWrap}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>

      {rightAction && (
        <TouchableOpacity
          style={styles.rightBtn}
          onPress={rightAction.onPress}
          activeOpacity={0.75}
        >
          {rightAction.icon ? (
            <Ionicons name={rightAction.icon as any} size={20} color={Semantic.text} />
          ) : (
            <Text style={styles.rightLabel}>{rightAction.label}</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Semantic.background,
    borderBottomWidth: 1,
    borderBottomColor: Semantic.divider,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: Spacing.md,
  },
  backBtn: {
    width: 36, height: 36,
    borderRadius: BorderRadius.md,
    backgroundColor: Semantic.surface,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadow.sm,
  },
  titleWrap: { flex: 1 },
  title: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Semantic.text,
  },
  subtitle: {
    fontSize: Typography.sizes.xs,
    color: Semantic.textMuted,
    marginTop: 2,
  },
  rightBtn: {
    width: 36, height: 36,
    borderRadius: BorderRadius.md,
    backgroundColor: Semantic.surface,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadow.sm,
  },
  rightLabel: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: Semantic.primary,
  },
});