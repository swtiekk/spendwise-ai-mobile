import { Colors, Semantic } from '@constants/colors';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ProfileStyles as s } from '../../styles/profileStyles';
import { formatCurrency } from '../../utils/formatting';

interface IncomeSettingsProps {
  incomeAmount: number;
  incomeType:   string;
  incomeCycle:  string;
  onSave?:      (amount: number) => void;
}

export const IncomeSettings: React.FC<IncomeSettingsProps> = ({
  incomeAmount, incomeType, incomeCycle, onSave,
}) => {
  const [editing, setEditing] = useState(false);
  const [amount,  setAmount]  = useState(String(incomeAmount));

  const handleSave = () => {
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) {
      Alert.alert('Invalid', 'Please enter a valid income amount.');
      return;
    }
    onSave?.(val);
    setEditing(false);
  };

  return (
    <View style={s.incomeCard}>
      {/* ── Card header ── */}
      <View style={s.incomeCardHeader}>
        <View style={s.incomeCardHeaderLeft}>
          <Ionicons name="wallet-outline" size={16} color={Semantic.primary} />
          <Text style={s.incomeCardTitle}>Income Settings</Text>
        </View>
        {editing ? (
          <TouchableOpacity style={s.incomeSaveBtn} onPress={handleSave} activeOpacity={0.8}>
            <Ionicons name="checkmark" size={13} color={Colors.white} />
            <Text style={s.incomeSaveBtnText}>Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={s.incomeEditBtn} onPress={() => setEditing(true)} activeOpacity={0.8}>
            <Ionicons name="pencil-outline" size={12} color={Semantic.primary} />
            <Text style={s.incomeEditBtnText}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* ── Income type row ── */}
      <View style={s.incomeRow}>
        <View style={s.incomeRowLeft}>
          <Ionicons name="briefcase-outline" size={15} color={Semantic.textMuted} />
          <Text style={s.incomeRowLabel}>Type</Text>
        </View>
        <View style={s.incomePill}>
          <Text style={s.incomePillText}>{incomeType}</Text>
        </View>
      </View>

      {/* ── Cycle row ── */}
      <View style={s.incomeRow}>
        <View style={s.incomeRowLeft}>
          <Ionicons name="calendar-outline" size={15} color={Semantic.textMuted} />
          <Text style={s.incomeRowLabel}>Pay Cycle</Text>
        </View>
        <View style={s.incomePill}>
          <Text style={s.incomePillText}>{incomeCycle}</Text>
        </View>
      </View>

      {/* ── Amount row ── */}
      <View style={s.incomeRowLast}>
        <View style={s.incomeRowLeft}>
          <Ionicons name="cash-outline" size={15} color={Semantic.textMuted} />
          <Text style={s.incomeRowLabel}>Monthly Income</Text>
        </View>
        <Text style={s.incomeRowValue}>{formatCurrency(incomeAmount)}</Text>
      </View>

      {/* ── Edit field (shown when editing) ── */}
      {editing && (
        <View style={s.incomeEditField}>
          <TextInput
            style={s.incomeInput}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="Enter new amount"
            placeholderTextColor={Semantic.textMuted}
            selectionColor={Semantic.primary}
          />
          <TouchableOpacity style={s.incomeCancelBtn} onPress={() => setEditing(false)} activeOpacity={0.7}>
            <Text style={s.incomeCancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};