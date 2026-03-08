import { Colors } from '@constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { DashboardStyles as s } from '@styles/dashboardStyles';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface SmartPurchaseButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

export const SmartPurchaseButton: React.FC<SmartPurchaseButtonProps> = ({
  onPress,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[s.smartPurchaseBtn, disabled && { opacity: 0.6 }]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.85}
    >
      <View style={s.smartPurchaseLeft}>
        <View style={s.smartPurchaseIconWrap}>
          <Ionicons name="flash-outline" size={22} color={Colors.white} />
        </View>
        <View>
          <Text style={s.smartPurchaseTitle}>Smart Purchase Advisor</Text>
          <Text style={s.smartPurchaseSubtitle}>Ask AI before you spend</Text>
        </View>
      </View>

      <View style={s.smartPurchaseArrow}>
        <Ionicons name="chevron-forward" size={18} color={Colors.white} />
      </View>
    </TouchableOpacity>
  );
};