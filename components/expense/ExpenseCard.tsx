import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { HistoryStyles as s } from '../../styles/historyStyles';
import { formatCurrency, formatDate } from '../../utils/formatting';

interface ExpenseCardProps {
  id: string;
  title: string;
  category: string;
  amount: number;
  date: string;
  icon?: string;
  color?: string;
  onPress?: () => void;
  onDelete?: () => void;
}

const CATEGORY_ICONS: Record<string, React.ComponentProps<typeof Ionicons>['name']> = {
  food:          'fast-food-outline',
  transport:     'car-outline',
  shopping:      'bag-outline',
  utilities:     'flash-outline',
  health:        'medical-outline',
  entertainment: 'game-controller-outline',
  savings:       'save-outline',
  education:     'book-outline',
  other:         'ellipsis-horizontal-outline',
};

function safeString(val: unknown): string {
  if (val === null || val === undefined) return 'other';
  if (typeof val === 'string') return val.toLowerCase();
  if (typeof val === 'object') {
    const obj = val as any;
    return String(obj.key ?? obj.name ?? obj.slug ?? 'other').toLowerCase();
  }
  return String(val).toLowerCase();
}

function getCategoryIcon(category: unknown): React.ComponentProps<typeof Ionicons>['name'] {
  return CATEGORY_ICONS[safeString(category)] ?? 'ellipsis-horizontal-outline';
}

export const ExpenseCard: React.FC<ExpenseCardProps> = ({
  title,
  category,
  amount,
  date,
  color = '#6366F1',
  onPress,
}) => {
  const safeCategory = safeString(category);
  const iconBg       = color + '22';
  const catIcon      = getCategoryIcon(category);
  const displayCat   = safeCategory.charAt(0).toUpperCase() + safeCategory.slice(1);

  return (
    <TouchableOpacity
      style={s.expenseCard}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[s.expenseIconWrap, { backgroundColor: iconBg }]}>
        <Ionicons name={catIcon} size={20} color={color} />
      </View>

      <View style={s.expenseInfo}>
        <Text style={s.expenseTitle} numberOfLines={1}>
          {String(title ?? '')}
        </Text>
        <View style={s.expenseMeta}>
          <View style={[s.expenseCategoryPill, { backgroundColor: iconBg }]}>
            <Text style={[s.expenseCategoryText, { color }]}>{displayCat}</Text>
          </View>
          <View style={s.expenseDot} />
          <Text style={s.expenseDate}>{formatDate(date, 'short')}</Text>
        </View>
      </View>

      <View style={s.expenseRight}>
        <Text style={s.expenseAmount}>
          -{formatCurrency(amount)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};