import { Colors } from '@constants/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { SmartPurchaseStyles as s } from '../../styles/smartPurchaseStyles';

interface PurchaseRecommendationProps {
  reasoning:    string;
  suggestions?: string[];
  decision:     'safe' | 'caution' | 'risky';
}

const ACCENT: Record<PurchaseRecommendationProps['decision'], string> = {
  safe:    Colors.success,
  caution: Colors.alertAmber,
  risky:   Colors.error,
};

export const PurchaseRecommendation: React.FC<PurchaseRecommendationProps> = ({
  reasoning,
  suggestions = [],
  decision,
}) => {
  const accent = ACCENT[decision];

  return (
    <View style={s.recContainer}>
      {/* Reasoning box with left accent border */}
      <View style={[s.recReasoningBox, { borderLeftColor: accent }]}>
        <Text style={s.recReasoningText}>{reasoning}</Text>
      </View>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <>
          <Text style={s.recSuggestionsTitle}>Suggestions</Text>
          {suggestions.map((suggestion, i) => (
            <View key={i} style={s.recSuggestionRow}>
              <View style={[s.recSuggestionIconWrap, { backgroundColor: accent + '18' }]}>
                <Ionicons name="checkmark-outline" size={13} color={accent} />
              </View>
              <Text style={s.recSuggestionText}>{suggestion}</Text>
            </View>
          ))}
        </>
      )}
    </View>
  );
};