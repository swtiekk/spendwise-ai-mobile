import { Semantic } from '@constants/colors';
import { Spacing } from '@constants/spacing';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface DividerProps {
  margin?: number;
}

export const Divider: React.FC<DividerProps> = ({ margin = Spacing.lg }) => {
  const styles = StyleSheet.create({
    divider: {
      height: 1,
      backgroundColor: Semantic.divider,
      marginVertical: margin,
    },
  });

  return <View style={styles.divider} />;
};