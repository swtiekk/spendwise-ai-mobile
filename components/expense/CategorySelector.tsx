import { ExpenseCategories } from '@constants/categories';
import { Spacing } from '@constants/spacing';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { AddExpenseStyles as s } from '../../styles/addExpenseStyles';

type Category = keyof typeof ExpenseCategories;

interface CategorySelectorProps {
  selected: Category | null;
  onSelect: (category: Category) => void;
  error?: string;
}

const CATEGORY_META: Record<string, {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
  bg: string;
}> = {
  food:          { icon: 'fast-food-outline',           color: '#F59E0B', bg: '#FFFBEB' },
  transport:     { icon: 'car-outline',                  color: '#6366F1', bg: '#EEF2FF' },
  entertainment: { icon: 'game-controller-outline',      color: '#8B5CF6', bg: '#F5F3FF' },
  utilities:     { icon: 'flash-outline',                color: '#2DD4BF', bg: '#F0FDFB' },
  shopping:      { icon: 'bag-outline',                  color: '#EC4899', bg: '#FDF2F8' },
  health:        { icon: 'medical-outline',              color: '#22C55E', bg: '#F0FDF4' },
  education:     { icon: 'book-outline',                 color: '#3B82F6', bg: '#EFF6FF' },
  other:         { icon: 'ellipsis-horizontal-outline',  color: '#94A3B8', bg: '#F8FAFC' },
};

const DEFAULT_META = {
  icon: 'ellipsis-horizontal-outline' as const,
  color: '#94A3B8',
  bg: '#F8FAFC',
};

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selected,
  onSelect,
  error,
}) => {
  const { width } = useWindowDimensions();

  // Responsive item size:
  // Total width - horizontal screen padding (lg * 2) - card padding (lg * 2) - gaps between 4 items (sm * 3)
  const totalPadding = Spacing.lg * 4 + Spacing.sm * 3;
  const itemSize     = Math.floor((width - totalPadding) / 4);

  return (
    <View>
      <View style={s.categoryGrid}>
        {(Object.keys(ExpenseCategories) as Category[]).map((key) => {
          const cat        = ExpenseCategories[key];
          const meta       = CATEGORY_META[key] ?? DEFAULT_META;
          const isSelected = selected === key;

          return (
            <TouchableOpacity
              key={key}
              style={[
                s.categoryItem,
                // Override fixed width/height with responsive values
                { width: itemSize, height: itemSize },
                isSelected && s.categoryItemSelected,
                isSelected && { backgroundColor: meta.bg, borderColor: meta.color },
              ]}
              onPress={() => onSelect(key)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={meta.icon}
                size={itemSize * 0.4}  // icon scales with item
                color={isSelected ? meta.color : '#9CA3AF'}
              />
              <Text style={[
                s.categoryItemName,
                isSelected && s.categoryItemNameSelected,
                isSelected && { color: meta.color },
              ]}>
                {cat.label.split(' ')[0]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {error && <Text style={s.categoryError}>{error}</Text>}
    </View>
  );
};