import { Colors } from '@constants/colors';
import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { AddExpenseStyles as s } from '../../styles/addExpenseStyles';

interface AmountInputProps {
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  autoFocus?: boolean;
}

export const AmountInput: React.FC<AmountInputProps> = ({
  value,
  onChangeText,
  error,
  autoFocus = false,
}) => {
  return (
    <View style={s.amountCard}>
      <Text style={s.amountCardLabel}>Enter Amount</Text>

      <View style={s.amountRow}>
        <Text style={s.amountCurrency}>₱</Text>
        <TextInput
          style={[s.amountInput, !!error && s.amountInputError]}
          value={value}
          onChangeText={onChangeText}
          keyboardType="numeric"
          placeholder="0.00"
          placeholderTextColor="rgba(255,255,255,0.22)"
          autoFocus={autoFocus}
          selectionColor={Colors.growthTeal}
        />
      </View>

      {error
        ? <Text style={s.amountError}>{error}</Text>
        : <Text style={s.amountHint}>Tap to enter amount</Text>
      }
    </View>
  );
};