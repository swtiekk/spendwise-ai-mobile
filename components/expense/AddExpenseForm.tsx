import { ExpenseCategories } from '@constants/categories';
import { Semantic } from '@constants/colors';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useExpenses } from '../../hooks/useExpenses';
import { AddExpenseStyles as s } from '../../styles/addExpenseStyles';
import { validateExpenseForm } from '../../utils/validation';
import { AmountInput } from './AmountInput';
import { CategorySelector } from './CategorySelector';

type Category = keyof typeof ExpenseCategories;

interface AddExpenseFormProps {
  onSuccess?: () => void;
  onCancel?:  () => void;
  amount?:          string;
  onAmountChange?:  (v: string) => void;
  category?:        Category | null;
  onCategoryChange?:(v: Category | null) => void;
  description?:     string;
  onDescriptionChange?: (v: string) => void;
  descHeight?: number; // ← dynamic height from screen
}

export const AddExpenseForm: React.FC<AddExpenseFormProps> = ({
  onSuccess,
  onCancel,
  amount:          amountProp,
  onAmountChange,
  category:        categoryProp,
  onCategoryChange,
  description:     descriptionProp,
  onDescriptionChange,
  descHeight,
}) => {
  const { createExpense, isLoading } = useExpenses();

  const [amountInternal,      setAmountInternal]      = useState('');
  const [categoryInternal,    setCategoryInternal]    = useState<Category | null>(null);
  const [descriptionInternal, setDescriptionInternal] = useState('');

  const amount      = amountProp      ?? amountInternal;
  const category    = categoryProp    !== undefined ? categoryProp    : categoryInternal;
  const description = descriptionProp ?? descriptionInternal;

  const setAmount      = (v: string)          => { if (onAmountChange) onAmountChange(v); else setAmountInternal(v); };
  const setCategory    = (v: Category | null) => { if (onCategoryChange) onCategoryChange(v); else setCategoryInternal(v); };
  const setDescription = (v: string)          => { if (onDescriptionChange) onDescriptionChange(v); else setDescriptionInternal(v); };

  const [descFocused, setDescFocused] = useState(false);
  const [errors,      setErrors]      = useState<Record<string, string>>({});

  const handleSubmit = async () => {
    const result = validateExpenseForm({ amount, category: category ?? '', description });
    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }
    setErrors({});
    try {
      await createExpense({
        amount:      parseFloat(amount),
        category:    category as any,
        description,
        timestamp:   new Date().toISOString(),
      });
      onSuccess?.();
    } catch (err: any) {
      Alert.alert('Error', err?.message ?? 'Failed to save expense');
    }
  };

  return (
    <View style={{ gap: 16 }}>
      {/* ── Amount ── */}
      <AmountInput
        value={amount}
        onChangeText={(t) => { setAmount(t); setErrors(e => ({ ...e, amount: '' })); }}
        error={errors.amount}
        autoFocus
      />

      {/* ── Category ── */}
      <View style={s.sectionCard}>
        <Text style={s.sectionLabel}>Category</Text>
        <CategorySelector
          selected={category}
          onSelect={(cat) => { setCategory(cat); setErrors(e => ({ ...e, category: '' })); }}
          error={errors.category}
        />
      </View>

      {/* ── Description ── */}
      <View style={s.sectionCard}>
        <Text style={s.sectionLabel}>Description</Text>
        <TextInput
          style={[
            s.descInput,
            descFocused && s.descInputFocused,
            descHeight ? { minHeight: descHeight } : undefined,
          ]}
          value={description}
          onChangeText={setDescription}
          onFocus={() => setDescFocused(true)}
          onBlur={() => setDescFocused(false)}
          placeholder="What did you spend on? (optional)"
          placeholderTextColor={Semantic.textMuted}
          multiline
          maxLength={100}
        />
        <Text style={s.descCharCount}>{description.length}/100</Text>
      </View>

      {/* ── Buttons ── */}
      <View style={s.buttonRow}>
        {onCancel && (
          <TouchableOpacity style={s.cancelBtn} onPress={onCancel} activeOpacity={0.7}>
            <Text style={s.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[s.submitBtn, isLoading && s.submitBtnDisabled]}
          onPress={handleSubmit}
          disabled={isLoading}
          activeOpacity={0.85}
        >
          {!isLoading && <Ionicons name="checkmark-circle-outline" size={18} color="white" />}
          <Text style={s.submitBtnText}>
            {isLoading ? 'Saving...' : 'Add Expense'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};