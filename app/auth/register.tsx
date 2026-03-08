import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Animated,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { Colors, authStyles as s } from '../../styles/authStyles';

// ── Shake helper ──────────────────────────────────────────────────────────────
function useShake() {
  const anim = useRef(new Animated.Value(0)).current;
  const shake = useCallback(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    Animated.sequence([
      Animated.timing(anim, { toValue:  8, duration: 55, useNativeDriver: true }),
      Animated.timing(anim, { toValue: -8, duration: 55, useNativeDriver: true }),
      Animated.timing(anim, { toValue:  6, duration: 55, useNativeDriver: true }),
      Animated.timing(anim, { toValue: -6, duration: 55, useNativeDriver: true }),
      Animated.timing(anim, { toValue:  3, duration: 45, useNativeDriver: true }),
      Animated.timing(anim, { toValue:  0, duration: 45, useNativeDriver: true }),
    ]).start();
  }, [anim]);
  return { shakeStyle: { transform: [{ translateX: anim }] }, shake };
}

// ── Password strength ─────────────────────────────────────────────────────────
function getStrength(pw: string): { score: number; label: string; color: string } {
  if (!pw) return { score: 0, label: '', color: Colors.border };
  let score = 0;
  if (pw.length >= 8)           score++;
  if (/[A-Z]/.test(pw))         score++;
  if (/[0-9]/.test(pw))         score++;
  if (/[^A-Za-z0-9]/.test(pw))  score++;
  const levels = [
    { score: 1, label: 'Weak',   color: Colors.red },
    { score: 2, label: 'Fair',   color: Colors.amber },
    { score: 3, label: 'Good',   color: Colors.teal },
    { score: 4, label: 'Strong', color: '#22C55E' },
  ];
  return levels[score - 1] ?? { score: 0, label: '', color: Colors.border };
}

// ── Types ─────────────────────────────────────────────────────────────────────
type IncomeType  = 'allowance' | 'salary' | 'freelance' | 'other';
type IncomeCycle = 'weekly' | 'biweekly' | 'monthly';

const INCOME_TYPES: { value: IncomeType; label: string; icon: string }[] = [
  { value: 'allowance', label: 'Allowance', icon: 'school-outline' },
  { value: 'salary',    label: 'Salary',    icon: 'briefcase-outline' },
  { value: 'freelance', label: 'Freelance', icon: 'laptop-outline' },
  { value: 'other',     label: 'Other',     icon: 'ellipsis-horizontal-outline' },
];

const INCOME_CYCLES: { value: IncomeCycle; label: string }[] = [
  { value: 'weekly',   label: 'Weekly' },
  { value: 'biweekly', label: 'Bi-weekly' },
  { value: 'monthly',  label: 'Monthly' },
];

// ── Screen ────────────────────────────────────────────────────────────────────
export default function RegisterScreen() {
  const router = useRouter();
  const { register, isLoading, error, clearError } = useAuth();

  const [formData, setFormData] = useState({
    name:            '',
    email:           '',
    password:        '',
    confirmPassword: '',
    incomeType:      'salary'  as IncomeType,
    incomeCycle:     'monthly' as IncomeCycle,
  });

  const [showPassword, setShowPassword]               = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [nameFocused, setNameFocused]                 = useState(false);
  const [emailFocused, setEmailFocused]               = useState(false);
  const [passwordFocused, setPasswordFocused]         = useState(false);
  const [confirmFocused, setConfirmFocused]           = useState(false);
  const [validationErrors, setValidationErrors]       = useState<Record<string, string | undefined>>({});

  const nameShake    = useShake();
  const emailShake   = useShake();
  const passShake    = useShake();
  const confirmShake = useShake();

  const strength = getStrength(formData.password);

  // ── Entrance animation ────────────────────────────────────────────────────
  const fadeIn  = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeIn,  { toValue: 1, duration: 420, useNativeDriver: true }),
      Animated.timing(slideUp, { toValue: 0, duration: 420, useNativeDriver: true }),
    ]).start();
  }, []);

  // ── Helpers ───────────────────────────────────────────────────────────────
  const update = (key: keyof typeof formData) => (value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setValidationErrors(prev => ({ ...prev, [key]: undefined }));
  };

  // ── Validation ────────────────────────────────────────────────────────────
  const validateForm = (): boolean => {
    const errors: Record<string, string | undefined> = {};
    let hadError = false;

    if (!formData.name) {
      errors.name = 'Full name is required';
      nameShake.shake(); hadError = true;
    }
    if (!formData.email) {
      errors.email = 'Email is required';
      emailShake.shake(); hadError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
      emailShake.shake(); hadError = true;
    }
    if (!formData.password) {
      errors.password = 'Password is required';
      passShake.shake(); hadError = true;
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      passShake.shake(); hadError = true;
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      confirmShake.shake(); hadError = true;
    }

    setValidationErrors(errors);
    return !hadError;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    try {
      await register({
        name:        formData.name,
        email:       formData.email,
        password:    formData.password,
        incomeType:  formData.incomeType,
        incomeCycle: formData.incomeCycle,
      });
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <KeyboardAvoidingView
      style={s.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="dark-content" backgroundColor={Colors.slate} />
      <View style={s.accentBar} />

      <ScrollView
        contentContainerStyle={s.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        {/* ── Header row ── */}
        <View style={s.regHeaderRow}>
          <TouchableOpacity
            style={s.regBackBtn}
            onPress={() => router.back()}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="arrow-back" size={20} color={Colors.navy} />
          </TouchableOpacity>

          <View style={s.regHeaderBrand}>
            <View style={s.regBrandIconSmall}>
              <Ionicons name="wallet-outline" size={16} color={Colors.teal} />
            </View>
            <Text style={s.regBrandNameSmall}>SpendWise</Text>
          </View>

          {/* Spacer to balance the back button */}
          <View style={{ width: 36 }} />
        </View>

        {/* ── Page heading ── */}
        <Animated.View
          style={[s.regHeading, { opacity: fadeIn, transform: [{ translateY: slideUp }] }]}
        >
          <Text style={s.regHeadingTitle}>Create Account</Text>
          <Text style={s.regHeadingSubtitle}>
            Set up your profile to start tracking smarter.
          </Text>
        </Animated.View>

        {/* ── Card ── */}
        <Animated.View
          style={[s.regCard, { opacity: fadeIn, transform: [{ translateY: slideUp }] }]}
        >

          {/* Auth-level error */}
          {error && (
            <View style={s.errorBox}>
              <Ionicons name="alert-circle-outline" size={15} color={Colors.red} />
              <Text style={s.errorText}>{error}</Text>
              <TouchableOpacity
                onPress={clearError}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Ionicons name="close" size={15} color={Colors.red} />
              </TouchableOpacity>
            </View>
          )}

          {/* Form dims while loading */}
          <Animated.View
            style={isLoading ? s.formDimmed : undefined}
            pointerEvents={isLoading ? 'none' : 'auto'}
          >

            {/* ── Section: Personal Info ── */}
            <View style={s.sectionHeader}>
              <View style={s.sectionDot} />
              <Text style={s.sectionTitle}>Personal Info</Text>
            </View>

            {/* Full Name */}
            <Animated.View style={[s.fieldGroup, nameShake.shakeStyle]}>
              <Text style={s.label}>Full Name</Text>
              <View style={[
                s.inputRow,
                nameFocused           && s.inputFocused,
                validationErrors.name && s.inputErr,
              ]}>
                <Ionicons
                  name="person-outline" size={17}
                  color={nameFocused ? Colors.teal : Colors.subtle}
                  style={s.inputIcon}
                />
                <TextInput
                  style={s.inputText}
                  placeholder="Enter your full name"
                  placeholderTextColor={Colors.subtle}
                  value={formData.name}
                  onChangeText={update('name')}
                  onFocus={() => setNameFocused(true)}
                  onBlur={() => setNameFocused(false)}
                />
              </View>
              {validationErrors.name && (
                <Text style={s.fieldError}>{validationErrors.name}</Text>
              )}
            </Animated.View>

            {/* Email */}
            <Animated.View style={[s.fieldGroup, emailShake.shakeStyle]}>
              <Text style={s.label}>Email Address</Text>
              <View style={[
                s.inputRow,
                emailFocused           && s.inputFocused,
                validationErrors.email && s.inputErr,
              ]}>
                <Ionicons
                  name="mail-outline" size={17}
                  color={emailFocused ? Colors.teal : Colors.subtle}
                  style={s.inputIcon}
                />
                <TextInput
                  style={s.inputText}
                  placeholder="you@example.com"
                  placeholderTextColor={Colors.subtle}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={formData.email}
                  onChangeText={update('email')}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                />
              </View>
              {validationErrors.email && (
                <Text style={s.fieldError}>{validationErrors.email}</Text>
              )}
            </Animated.View>

            {/* Password */}
            <Animated.View style={[s.fieldGroup, passShake.shakeStyle]}>
              <Text style={s.label}>Password</Text>
              <View style={[
                s.inputRow,
                passwordFocused           && s.inputFocused,
                validationErrors.password && s.inputErr,
              ]}>
                <Ionicons
                  name="lock-closed-outline" size={17}
                  color={passwordFocused ? Colors.teal : Colors.subtle}
                  style={s.inputIcon}
                />
                <TextInput
                  style={s.inputText}
                  placeholder="Create a password"
                  placeholderTextColor={Colors.subtle}
                  secureTextEntry={!showPassword}
                  value={formData.password}
                  onChangeText={update('password')}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(p => !p)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Ionicons
                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={17} color={Colors.subtle}
                  />
                </TouchableOpacity>
              </View>

              {/* Password strength bar */}
              {formData.password.length > 0 && (
                <View style={s.strengthRow}>
                  {[1, 2, 3, 4].map(i => (
                    <View
                      key={i}
                      style={[
                        s.strengthBar,
                        { backgroundColor: i <= strength.score ? strength.color : Colors.border },
                      ]}
                    />
                  ))}
                  <Text style={[s.strengthLabel, { color: strength.color }]}>
                    {strength.label}
                  </Text>
                </View>
              )}

              {validationErrors.password && (
                <Text style={s.fieldError}>{validationErrors.password}</Text>
              )}
            </Animated.View>

            {/* Confirm Password */}
            <Animated.View style={[s.fieldGroup, confirmShake.shakeStyle]}>
              <Text style={s.label}>Confirm Password</Text>
              <View style={[
                s.inputRow,
                confirmFocused                    && s.inputFocused,
                validationErrors.confirmPassword  && s.inputErr,
              ]}>
                <Ionicons
                  name="lock-open-outline" size={17}
                  color={confirmFocused ? Colors.teal : Colors.subtle}
                  style={s.inputIcon}
                />
                <TextInput
                  style={s.inputText}
                  placeholder="Confirm your password"
                  placeholderTextColor={Colors.subtle}
                  secureTextEntry={!showConfirmPassword}
                  value={formData.confirmPassword}
                  onChangeText={update('confirmPassword')}
                  onFocus={() => setConfirmFocused(true)}
                  onBlur={() => setConfirmFocused(false)}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(p => !p)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Ionicons
                    name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={17} color={Colors.subtle}
                  />
                </TouchableOpacity>
              </View>
              {validationErrors.confirmPassword && (
                <Text style={s.fieldError}>{validationErrors.confirmPassword}</Text>
              )}
            </Animated.View>

            {/* ── Section: Income Setup ── */}
            <View style={s.sectionHeaderSpaced}>
              <View style={s.sectionDotAI} />
              <Text style={s.sectionTitle}>Income Setup</Text>
            </View>
            <Text style={s.sectionNote}>
              This helps the AI personalize your financial recommendations.
            </Text>

            {/* Income Type chips */}
            <View style={s.fieldGroup}>
              <Text style={s.label}>Income Type</Text>
              <View style={s.chipRow}>
                {INCOME_TYPES.map(({ value, label, icon }) => {
                  const active = formData.incomeType === value;
                  return (
                    <TouchableOpacity
                      key={value}
                      style={[s.chip, active && s.chipActive]}
                      onPress={() => {
                        setFormData(p => ({ ...p, incomeType: value }));
                        Haptics.selectionAsync();
                      }}
                      activeOpacity={0.75}
                    >
                      <Ionicons
                        name={icon as any} size={15}
                        color={active ? Colors.white : Colors.muted}
                      />
                      <Text style={[s.chipText, active && s.chipTextActive]}>{label}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Income Cycle chips */}
            <View style={s.fieldGroup}>
              <Text style={s.label}>Income Cycle</Text>
              <View style={s.chipRow}>
                {INCOME_CYCLES.map(({ value, label }) => {
                  const active = formData.incomeCycle === value;
                  return (
                    <TouchableOpacity
                      key={value}
                      style={[s.chip, active && s.chipActive]}
                      onPress={() => {
                        setFormData(p => ({ ...p, incomeCycle: value }));
                        Haptics.selectionAsync();
                      }}
                      activeOpacity={0.75}
                    >
                      <Text style={[s.chipText, active && s.chipTextActive]}>{label}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

          </Animated.View>

          {/* ── Create Account CTA ── */}
          <TouchableOpacity
            style={[s.regCta, isLoading && s.ctaDisabled]}
            onPress={handleRegister}
            disabled={isLoading}
            activeOpacity={0.82}
          >
            {isLoading
              ? <ActivityIndicator color={Colors.white} size="small" />
              : <>
                  <Text style={s.ctaText}>Create Account</Text>
                  <Ionicons name="arrow-forward" size={17} color={Colors.white} />
                </>
            }
          </TouchableOpacity>

          {/* Sign in link */}
          <View style={[s.registerRow, { marginTop: 20 }]}>
            <Text style={s.registerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/auth/login')}>
              <Text style={s.registerLink}>Sign in</Text>
            </TouchableOpacity>
          </View>

        </Animated.View>

        {/* Secure note */}
        <View style={s.secureRow}>
          <Ionicons name="shield-checkmark-outline" size={13} color={Colors.subtle} />
          <Text style={s.secureNote}>Your data is encrypted and secure</Text>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}