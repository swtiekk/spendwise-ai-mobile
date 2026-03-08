import { Colors, Semantic } from '@constants/colors';
import { BorderRadius, Spacing } from '@constants/spacing';
import React from 'react';
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';

interface BottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  height?: number;
  snapPoints?: number[];
  style?: ViewStyle;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isVisible,
  onClose,
  children,
  title,
  height = 400,
  style,
}) => {
  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    container: {
      backgroundColor: Semantic.surface,
      borderTopLeftRadius: BorderRadius.xl,
      borderTopRightRadius: BorderRadius.xl,
      maxHeight: height,
      shadowColor: Colors.black,
      shadowOffset: { width: 0, height: -3 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    handle: {
      height: 4,
      width: 40,
      backgroundColor: Semantic.border,
      borderRadius: BorderRadius.full,
      alignSelf: 'center',
      marginTop: Spacing.md,
      marginBottom: Spacing.md,
    },
    titleContainer: {
      paddingHorizontal: Spacing.lg,
      paddingBottom: Spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: Semantic.divider,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: Semantic.text,
    },
    content: {
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.lg,
      flex: 1,
    },
    closeArea: {
      paddingBottom: Spacing.xl,
    },
  });

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={onClose}
        >
          <TouchableOpacity
            style={[styles.container, style]}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.handle} />

            {title && (
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
              </View>
            )}

            <View style={styles.content}>
              {children}
              <View style={styles.closeArea} />
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modal>
  );
};