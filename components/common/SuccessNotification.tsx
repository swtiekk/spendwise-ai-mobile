import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, Text, View } from 'react-native';
import { AddExpenseStyles as s } from '../../styles/addExpenseStyles';

interface SuccessNotificationProps {
  title?: string;
  message: string;
  duration?: number;
  onHide?: () => void;
  visible?: boolean;
}

export const SuccessNotification: React.FC<SuccessNotificationProps> = ({
  title = 'Success',
  message,
  duration = 3000,
  onHide,
  visible = true,
}) => {
  // ✅ useRef — not new Animated.Value() on every render
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-8)).current;

  useEffect(() => {
    if (!visible) return;

    // Fade + slide in
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 280, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 280, useNativeDriver: true }),
    ]).start();

    if (duration > 0) {
      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(fadeAnim,  { toValue: 0, duration: 260, useNativeDriver: true }),
          Animated.timing(slideAnim, { toValue: -8, duration: 260, useNativeDriver: true }),
        ]).start(() => onHide?.());
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <Animated.View style={{
      opacity: fadeAnim,
      transform: [{ translateY: slideAnim }],
    }}>
      <View style={s.successWrap}>
        <View style={s.successIconWrap}>
          <Ionicons name="checkmark-circle-outline" size={20} color="#22C55E" />
        </View>
        <View style={s.successContent}>
          <Text style={s.successTitle}>{title}</Text>
          <Text style={s.successMessage}>{message}</Text>
        </View>
      </View>
    </Animated.View>
  );
};