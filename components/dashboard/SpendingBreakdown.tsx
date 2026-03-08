import { Semantic } from '@constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { DashboardStyles as s } from '@styles/dashboardStyles';
import React from 'react';
import { Text, View } from 'react-native';

interface CategorySpending {
  category: string;
  amount: number;
  percentage: number;
  icon: string;
}

interface SpendingBreakdownProps {
  categories: CategorySpending[];
  totalSpent: number;
}

// Maps icon/category key → { icon name, color, bg tint }
const CATEGORY_CONFIG: Record<string, { icon: string; color: string; bg: string }> = {
  food:          { icon: 'fast-food-outline',       color: '#F59E0B', bg: '#FFFBEB' },
  transport:     { icon: 'car-outline',              color: '#6366F1', bg: '#EEF2FF' },
  shopping:      { icon: 'bag-outline',              color: '#EC4899', bg: '#FDF2F8' },
  'shopping-bag':{ icon: 'bag-outline',              color: '#EC4899', bg: '#FDF2F8' },
  entertainment: { icon: 'game-controller-outline',  color: '#8B5CF6', bg: '#F5F3FF' },
  health:        { icon: 'medical-outline',          color: '#22C55E', bg: '#F0FDF4' },
  utilities:     { icon: 'flash-outline',            color: '#EF4444', bg: '#FFF1F2' },
  education:     { icon: 'book-outline',             color: '#3B82F6', bg: '#EFF6FF' },
  savings:       { icon: 'save-outline',             color: '#2DD4BF', bg: '#F0FDFB' },
};

const DEFAULT_CAT = {
  icon: 'ellipsis-horizontal-outline',
  color: Semantic.primary,
  bg: Semantic.primaryBg,
};

function getCategoryConfig(icon: string, category: string) {
  return (
    CATEGORY_CONFIG[icon] ??
    CATEGORY_CONFIG[category.toLowerCase()] ??
    DEFAULT_CAT
  );
}

export const SpendingBreakdown: React.FC<SpendingBreakdownProps> = ({
  categories,
  totalSpent,
}) => {
  const formatAmount = (amount: number) =>
    '₱' + amount.toLocaleString('en-PH', { minimumFractionDigits: 0 });

  return (
    <View style={s.spendingCard}>
      {/* Header total */}
      <View style={s.spendingTotalRow}>
        <View>
          <Text style={s.spendingTotalLabel}>TOTAL SPENT</Text>
          <Text style={s.spendingTotalAmount}>{formatAmount(totalSpent)}</Text>
        </View>
        <Text style={s.spendingTotalCycleLabel}>This cycle</Text>
      </View>

      {/* Category rows */}
      {categories.map((cat, i) => {
        const cfg    = getCategoryConfig(cat.icon, cat.category);
        const isLast = i === categories.length - 1;

        return (
          <View key={i} style={isLast ? s.categoryRowLast : s.categoryRow}>
            <View style={[s.categoryIconWrap, { backgroundColor: cfg.bg }]}>
              <Ionicons name={cfg.icon as any} size={17} color={cfg.color} />
            </View>

            <View style={s.categoryInfo}>
              <Text style={s.categoryName}>{cat.category}</Text>
              <View style={s.categoryBar}>
                <View
                  style={[
                    s.categoryFill,
                    { width: `${cat.percentage}%`, backgroundColor: cfg.color },
                  ]}
                />
              </View>
            </View>

            <View style={s.categoryRight}>
              <Text style={s.categoryAmount}>{formatAmount(cat.amount)}</Text>
              <Text style={s.categoryPct}>{cat.percentage}%</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};