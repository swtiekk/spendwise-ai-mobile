import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ProfileStyles as s } from '../../styles/profileStyles';
import { formatCurrency } from '../../utils/formatting';

interface UserInfoProps {
  name:         string;
  email:        string;
  incomeType:   string;
  incomeCycle:  string;
  incomeAmount: number;
  onEditPress?: () => void;   // ← NEW (optional, safe to omit)
}

export const UserInfo: React.FC<UserInfoProps> = ({
  name, email, incomeType, incomeCycle, incomeAmount, onEditPress,
}) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <View style={s.userHeroCard}>
      {/* ── Avatar + name row ── */}
      <View style={s.userHeroTopRow}>
        <View style={s.avatar}>
          <Text style={s.avatarText}>{initials}</Text>
        </View>
        <View style={s.userNameCol}>
          <Text style={s.userName}>{name}</Text>
          <Text style={s.userEmail}>{email}</Text>
        </View>

        {/* ── Was: static icon. Now: tappable edit button ── */}
        <TouchableOpacity
          onPress={onEditPress}
          disabled={!onEditPress}
          hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
          activeOpacity={0.65}
        >
          <Ionicons
            name="create-outline"
            size={22}
            color="rgba(255,255,255,0.45)"
          />
        </TouchableOpacity>
      </View>

      {/* ── Divider ── */}
      <View style={s.userHeroDivider} />

      {/* ── Stats row ── */}
      <View style={s.userHeroStatsRow}>
        <View style={s.userHeroStatItem}>
          <Text style={s.userHeroStatLabel}>Income Type</Text>
          <Text style={s.userHeroStatValue}>{incomeType}</Text>
        </View>

        <View style={s.userHeroStatDivider} />

        <View style={s.userHeroStatItem}>
          <Text style={s.userHeroStatLabel}>Pay Cycle</Text>
          <Text style={s.userHeroStatValue}>{incomeCycle}</Text>
        </View>

        <View style={s.userHeroStatDivider} />

        <View style={s.userHeroStatItem}>
          <Text style={s.userHeroStatLabel}>Monthly</Text>
          <Text style={s.userHeroStatTeal}>{formatCurrency(incomeAmount)}</Text>
        </View>
      </View>
    </View>
  );
};