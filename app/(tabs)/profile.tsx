import { Colors, Semantic } from '@constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Modal,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NotificationSettings } from '../../components/profile/NotificationSettings';
import { SavingsGoals } from '../../components/profile/SavingsGoals';
import { UserInfo } from '../../components/profile/UserInfo';
import { useAuth } from '../../hooks/useAuth';
import { useUser } from '../../hooks/useUser';
import { ProfileStyles as s } from '../../styles/profileStyles';

function FadeSlide({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const opacity    = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(14)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity,    { toValue: 1, duration: 360, delay, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 360, delay, useNativeDriver: true }),
    ]).start();
  }, []);
  return (
    <Animated.View style={{ opacity, transform: [{ translateY }] }}>
      {children}
    </Animated.View>
  );
}

export default function ProfileScreen() {
  const router                      = useRouter();
  const { logout, user }            = useAuth();
  const { profile, savingsGoals = [] } = useUser();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = async () => {
    setShowLogoutModal(false);
    await logout();
  };

  const p = profile ?? {
    name:         user?.name         ?? 'User',
    email:        user?.email        ?? '',
    incomeType:   user?.incomeType   ?? 'salary',
    incomeCycle:  user?.incomeCycle  ?? 'monthly',
    incomeAmount: user?.incomeAmount ?? 0,
  };

  return (
    <SafeAreaView style={s.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={Semantic.background} />

      {/* ── Header ── */}
      <FadeSlide delay={0}>
        <View style={s.header}>
          <View>
            <Text style={s.headerEyebrow}>ACCOUNT</Text>
            <Text style={s.headerTitle}>Profile</Text>
          </View>
          <Ionicons name="person-circle-outline" size={28} color={Semantic.textMuted} />
        </View>
      </FadeSlide>

      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── User Card ── */}
        <FadeSlide delay={60}>
          <UserInfo
            name={p.name}
            email={p.email}
            onEditPress={() => router.push('/edit-profile')}
          />
        </FadeSlide>

        {/* ── Income Summary (read-only) ── */}
        <FadeSlide delay={100}>
          <View>
            <View style={s.sectionHeader}>
              <View style={s.sectionDot} />
              <Text style={s.sectionTitle}>Income</Text>
            </View>
            <View style={{
              backgroundColor: Semantic.surface,
              borderRadius: 16,
              padding: 16,
              gap: 10,
            }}>
              {[
                { label: 'Type',          value: p.incomeType  },
                { label: 'Cycle',         value: p.incomeCycle },
                { label: 'Amount',        value: `₱${(p.incomeAmount ?? 0).toLocaleString()}` },
                { label: 'Next Payday',   value: (profile as any)?.nextIncomeDate ?? '—' },
              ].map(({ label, value }) => (
                <View key={label} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ fontSize: 13, color: Semantic.textMuted }}>{label}</Text>
                  <Text style={{ fontSize: 13, fontWeight: '700', color: Semantic.text }}>{value}</Text>
                </View>
              ))}
              <TouchableOpacity
                onPress={() => router.push('/edit-profile')}
                activeOpacity={0.7}
                style={{
                  marginTop: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  paddingVertical: 10,
                  borderRadius: 12,
                  backgroundColor: Semantic.primaryBg,
                  borderWidth: 1,
                  borderColor: Semantic.primary,
                }}
              >
                <Ionicons name="pencil-outline" size={13} color={Semantic.primary} />
                <Text style={{ fontSize: 13, fontWeight: '700', color: Semantic.primary }}>
                  Edit Income Settings
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </FadeSlide>

        {/* ── Savings Goals ── */}
        {savingsGoals.length > 0 && (
          <FadeSlide delay={180}>
            <View>
              <View style={s.sectionHeader}>
                <View style={s.sectionDot} />
                <Text style={s.sectionTitle}>Savings</Text>
              </View>
              <SavingsGoals goals={savingsGoals} />
            </View>
          </FadeSlide>
        )}

        {/* ── Preferences ── */}
        <FadeSlide delay={240}>
          <View>
            <View style={s.sectionHeader}>
              <View style={s.sectionDotIndigo} />
              <Text style={s.sectionTitle}>Preferences</Text>
            </View>
            <NotificationSettings />
          </View>
        </FadeSlide>

        {/* ── Sign Out ── */}
        <FadeSlide delay={300}>
          <TouchableOpacity
            style={s.signOutBtn}
            onPress={() => setShowLogoutModal(true)}
            activeOpacity={0.8}
          >
            <Ionicons name="log-out-outline" size={18} color={Colors.error} />
            <Text style={s.signOutBtnText}>Sign Out</Text>
          </TouchableOpacity>
        </FadeSlide>

        {/* ── Footer ── */}
        <FadeSlide delay={340}>
          <View style={s.appFooter}>
            <Text style={s.appFooterName}>SPENDWISE AI</Text>
            <Text style={s.appFooterVersion}>Version 1.0.0 · IT323</Text>
          </View>
        </FadeSlide>
      </ScrollView>

      {/* ── Logout Modal ── */}
      <Modal
        visible={showLogoutModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View style={s.modalOverlay}>
          <View style={s.modalCard}>
            <View style={s.modalIconWrap}>
              <Ionicons name="log-out-outline" size={26} color={Colors.error} />
            </View>
            <Text style={s.modalTitle}>Sign Out</Text>
            <Text style={s.modalMessage}>
              Are you sure you want to sign out of SpendWise AI?
            </Text>
            <View style={s.modalBtnRow}>
              <TouchableOpacity
                style={s.modalCancelBtn}
                onPress={() => setShowLogoutModal(false)}
                activeOpacity={0.7}
              >
                <Text style={s.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={s.modalSignOutBtn}
                onPress={handleLogout}
                activeOpacity={0.8}
              >
                <Text style={s.modalSignOutText}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}