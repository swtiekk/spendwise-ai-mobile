import { Semantic } from '@constants/colors';
import { Spacing } from '@constants/spacing';
import React from 'react';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
  style?: ViewStyle;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  scrollable = true,
  style,
}) => {
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: Semantic.background,
    },
    scrollView: {
      flex: 1,
      backgroundColor: Semantic.background,
    },
    scrollContent: {
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.lg,
    },
    nonScrollContent: {
      flex: 1,
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.lg,
      backgroundColor: Semantic.background,
    },
  });

  if (scrollable) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.nonScrollContent, style]}>
        {children}
      </View>
    </SafeAreaView>
  );
};