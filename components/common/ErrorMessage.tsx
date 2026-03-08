import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { HistoryStyles as s } from '../../styles/historyStyles';

interface ErrorMessageProps {
  title?: string;
  message: string;
  action?: {
    label: string;
    onPress: () => void;
  };
  dismissible?: boolean;
  onDismiss?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = 'Something went wrong',
  message,
  action,
  dismissible = false,
  onDismiss,
}) => {
  return (
    <View style={s.errorWrap}>
      {/* Icon */}
      <View style={s.errorIconWrap}>
        <Ionicons name="alert-circle-outline" size={18} color="#EF4444" />
      </View>

      {/* Content */}
      <View style={s.errorContent}>
        <Text style={s.errorTitle}>{title}</Text>
        <Text style={s.errorMessage}>{message}</Text>
        {action && (
          <TouchableOpacity style={s.errorRetryBtn} onPress={action.onPress} activeOpacity={0.85}>
            <Text style={s.errorRetryText}>{action.label}</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Dismiss */}
      {dismissible && onDismiss && (
        <TouchableOpacity
          style={s.errorDismiss}
          onPress={onDismiss}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="close" size={16} color="#991B1B" />
        </TouchableOpacity>
      )}
    </View>
  );
};