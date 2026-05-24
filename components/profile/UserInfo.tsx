import { Semantic } from '@constants/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../hooks/useAuth';

interface UserInfoProps {
  name?:        string;
  email?:       string;
  avatar?:      string;
  onEditPress?: () => void;  // ← ADD THIS
}

export const UserInfo = ({ name, email, avatar, onEditPress }: UserInfoProps) => {
  const { user } = useAuth();

  return (
    <View style={{ alignItems: 'center', paddingVertical: 24 }}>
      <View style={{
        width: 88, height: 88, borderRadius: 44,
        overflow: 'hidden',
        backgroundColor: Semantic.secondaryBg,
        justifyContent: 'center', alignItems: 'center',
        marginBottom: 16,
      }}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={{ width: '100%', height: '100%' }} />
        ) : (
          <Text style={{ fontSize: 32, fontWeight: '700', color: Semantic.secondary }}>
            {name?.charAt(0)?.toUpperCase() || user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </Text>
        )}
      </View>

      <Text style={{ fontSize: 22, fontWeight: '800', color: Semantic.text, marginBottom: 4 }}>
        {name || user?.name || 'Unknown User'}
      </Text>

      <Text style={{ fontSize: 14, color: Semantic.textMuted, marginBottom: 12 }}>
        {email || user?.email || 'No email'}
      </Text>

      {/* ← ADD EDIT BUTTON */}
      {onEditPress && (
        <TouchableOpacity
          onPress={onEditPress}
          activeOpacity={0.7}
          style={{
            flexDirection:   'row',
            alignItems:      'center',
            gap:             6,
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius:    20,
            backgroundColor: Semantic.primaryBg,
            borderWidth:     1,
            borderColor:     Semantic.primary,
          }}
        >
          <Ionicons name="pencil-outline" size={13} color={Semantic.primary} />
          <Text style={{ fontSize: 13, fontWeight: '700', color: Semantic.primary }}>
            Edit Profile
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};