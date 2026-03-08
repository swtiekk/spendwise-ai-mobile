import { Semantic } from '@constants/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { InsightsStyles as s } from '../../styles/insightsStyles';

interface RecommendationListProps {
  recommendations: string[];
}

export const RecommendationList: React.FC<RecommendationListProps> = ({ recommendations }) => {
  return (
    <View style={s.recsCard}>
      <View style={s.recsHeader}>
        <View style={s.recsHeaderLeft}>
          <Ionicons name="bulb-outline" size={16} color={Semantic.secondary} />
          {/* "Tips for You" instead of "AI Recommendations" */}
          <Text style={s.recsHeaderTitle}>Tips for You</Text>
        </View>
        <View style={s.recsCountBadge}>
          <Text style={s.recsCountText}>{recommendations.length}</Text>
        </View>
      </View>

      {recommendations.map((rec, i) => {
        const isLast = i === recommendations.length - 1;
        return (
          <View key={i} style={isLast ? s.recItemLast : s.recItem}>
            <View style={s.recIconWrap}>
              <Ionicons name="flash-outline" size={15} color={Semantic.secondary} />
            </View>
            <Text style={s.recText}>{rec}</Text>
          </View>
        );
      })}
    </View>
  );
};