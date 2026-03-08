import { Colors, Semantic } from '@constants/colors';
import { BorderRadius, Spacing } from '@constants/spacing';
import { Typography } from '@constants/typography';
import React, { useState } from 'react';
import { TextInput as RNTextInput, StyleSheet, Text, View, ViewStyle } from 'react-native';

interface InputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  editable?: boolean;
  style?: ViewStyle;
  error?: string;
  label?: string;
}

export const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  editable = true,
  style,
  error,
  label,
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <RNTextInput
        style={[
          styles.field,
          focused && styles.fieldFocused,
          !!error && styles.fieldError,
          !editable && styles.fieldDisabled,
        ]}
        placeholder={placeholder}
        placeholderTextColor={Semantic.textMuted}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        editable={editable}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        selectionColor={Colors.growthTeal}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

// ✅ Module-level — created once
const styles = StyleSheet.create({
  container: { },
  label: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.semibold,
    color: Semantic.text,
    marginBottom: 7,
    letterSpacing: 0.3,
  },
  field: {
    borderWidth: 1.5,
    borderColor: Semantic.border,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    fontSize: Typography.sizes.base,
    color: Semantic.text,
    backgroundColor: Semantic.surface,
    minHeight: 50,
  },
  fieldFocused:  { borderColor: Colors.growthTeal, backgroundColor: Semantic.primaryBg },
  fieldError:    { borderColor: Colors.error, backgroundColor: '#FFF8F8' },
  fieldDisabled: { opacity: 0.55, backgroundColor: Semantic.background },
  errorText: {
    fontSize: Typography.sizes.xs,
    color: Colors.error,
    marginTop: 5,
    marginLeft: 2,
  },
});