import { Colors } from '@constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { DashboardStyles as s } from '@styles/dashboardStyles';
import React from 'react';
import { Text, View } from 'react-native';

interface BalanceCardProps {
  balance: number;
  lastUpdated?: string;
  totalSpent?: number;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  balance,
  lastUpdated,
  totalSpent,
}) => {
  const formatBalance = (amount: number) =>
    amount.toLocaleString('en-PH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <View style={s.balanceCard}>
      {/* Top row — live badge + wallet icon */}
      <View style={s.balanceTopRow}>
        <View style={s.balanceLiveBadge}>
          <View style={s.balanceLiveDot} />
          <Text style={s.balanceLiveText}>Live Balance</Text>
        </View>
        <Ionicons
          name="wallet-outline"
          size={20}
          color={Colors.white}
          style={s.balanceWalletIcon}
        />
      </View>

      {/* Amount */}
      <Text style={s.balanceLabel}>AVAILABLE BALANCE</Text>
      <View style={s.balanceAmountRow}>
        <Text style={s.balanceCurrency}>₱</Text>
        <Text style={s.balanceAmount}>{formatBalance(balance)}</Text>
      </View>

      <View style={s.balanceDivider} />

      {/* Footer row */}
      <View style={s.balanceFooterRow}>
        {totalSpent !== undefined && (
          <View style={s.balanceFooterItem}>
            <Text style={s.balanceFooterLabel}>TOTAL SPENT</Text>
            <Text style={s.balanceFooterValue}>
              ₱{totalSpent.toLocaleString('en-PH', { minimumFractionDigits: 0 })}
            </Text>
          </View>
        )}
        <View style={s.balanceFooterItem}>
          <Text style={s.balanceFooterLabel}>UPDATED</Text>
          <Text style={s.balanceFooterTeal}>{lastUpdated ?? 'Just now'}</Text>
        </View>
      </View>
    </View>
  );
};