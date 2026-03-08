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

// Maps category → Ionicons name
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

function getCategoryIcon(category: string): React.ComponentProps<typeof Ionicons>['name'] {
  return CATEGORY_ICONS[category.toLowerCase()] ?? 'ellipsis-horizontal-outline';
}

export const ExpenseCard: React.FC<ExpenseCardProps> = ({
  title,
  category,
  amount,
  date,
  color = '#6366F1',
  onPress,
}) => {
  // Icon bg is the expense color at 15% opacity — derived from the color prop
  const iconBg  = color + '22';
  const catIcon = getCategoryIcon(category);

  return (
    <TouchableOpacity
      style={s.expenseCard}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Category icon */}
      <View style={[s.expenseIconWrap, { backgroundColor: iconBg }]}>
        <Ionicons name={catIcon} size={20} color={color} />
      </View>

      {/* Title + meta */}
      <View style={s.expenseInfo}>
        <Text style={s.expenseTitle} numberOfLines={1}>{title}</Text>
        <View style={s.expenseMeta}>
          {/* Category pill */}
          <View style={[s.expenseCategoryPill, { backgroundColor: iconBg }]}>
            <Text style={[s.expenseCategoryText, { color }]}>{category}</Text>
          </View>
          <View style={s.expenseDot} />
          <Text style={s.expenseDate}>{formatDate(date, 'short')}</Text>
        </View>
      </View>

      {/* Amount */}
      <View style={s.expenseRight}>
        <Text style={s.expenseAmount}>
          -{formatCurrency(amount)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};