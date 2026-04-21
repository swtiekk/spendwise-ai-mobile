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
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { Colors } from '../../styles/authStyles';

// ── Shake helper ─────────────────────────────────────────────────────────────
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

export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuth();

  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused]         = useState(false);
  const [passwordFocused, setPasswordFocused]   = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    email?: string; password?: string;
  }>({});

  const emailShake    = useShake();
  const passwordShake = useShake();

  // ── Entrance animations ───────────────────────────────────────────────────
  const logoFade  = useRef(new Animated.Value(0)).current;
  const logoSlide = useRef(new Animated.Value(16)).current;
  const cardFade  = useRef(new Animated.Value(0)).current;
  const cardSlide = useRef(new Animated.Value(28)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoFade,  { toValue: 1, duration: 480, useNativeDriver: true }),
        Animated.timing(logoSlide, { toValue: 0, duration: 480, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(cardFade,  { toValue: 1, duration: 380, useNativeDriver: true }),
        Animated.timing(cardSlide, { toValue: 0, duration: 380, useNativeDriver: true }),
      ]),
    ]).start();
  }, []);

  // ── Validation + shake ────────────────────────────────────────────────────
  const validateForm = (): boolean => {
    const errors: typeof validationErrors = {};
    if (!email) {
      errors.email = 'Email is required';
      emailShake.shake();
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Invalid email format';
      emailShake.shake();
    }
    if (!password) {
      errors.password = 'Password is required';
      passwordShake.shake();
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      passwordShake.shake();
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    try {
      await login({ 
        username: email,  // ← map email field to username
        password 
      });
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const clearField = (field: 'email' | 'password') =>
    setValidationErrors(prev => ({ ...prev, [field]: undefined }));

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
        {/* ── Brand ── */}
        <Animated.View
          style={[s.brand, { opacity: logoFade, transform: [{ translateY: logoSlide }] }]}
        >
          <View style={s.brandIcon}>
            <Ionicons name="wallet-outline" size={24} color={Colors.teal} />
          </View>
          <Text style={s.brandName}>SpendWise</Text>
          <Text style={s.brandTagline}>AI-POWERED FINANCE</Text>
        </Animated.View>

        {/* ── Card ── */}
        <Animated.View
          style={[s.card, { opacity: cardFade, transform: [{ translateY: cardSlide }] }]}
        >
          <Text style={s.cardTitle}>Welcome Back</Text>
          <Text style={s.cardSubtitle}>Sign in to continue managing your finances.</Text>

          {/* Auth error */}
          {error && (
            <View style={s.errorBox}>
              <Ionicons name="alert-circle-outline" size={15} color={Colors.red} />
              <Text style={s.errorText}>{error}</Text>
              <TouchableOpacity onPress={clearError} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Ionicons name="close" size={15} color={Colors.red} />
              </TouchableOpacity>
            </View>
          )}

          {/* Form — dims while loading */}
          <Animated.View style={isLoading && s.formDimmed} pointerEvents={isLoading ? 'none' : 'auto'}>

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
                  value={email}
                  onChangeText={v => { setEmail(v); clearField('email'); }}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                />
              </View>
              {validationErrors.email && (
                <Text style={s.fieldError}>{validationErrors.email}</Text>
              )}
            </Animated.View>

            {/* Password */}
            <Animated.View style={[s.fieldGroup, passwordShake.shakeStyle]}>
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
                  placeholder="Enter your password"
                  placeholderTextColor={Colors.subtle}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={v => { setPassword(v); clearField('password'); }}
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
              {validationErrors.password && (
                <Text style={s.fieldError}>{validationErrors.password}</Text>
              )}
            </Animated.View>

          </Animated.View>

          {/* Forgot */}
          <TouchableOpacity style={s.forgotRow}>
            <Text style={s.forgotText}>Forgot password?</Text>
          </TouchableOpacity>

          {/* CTA */}
          <TouchableOpacity
            style={[s.cta, isLoading && s.ctaDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
            activeOpacity={0.82}
          >
            {isLoading
              ? <ActivityIndicator color={Colors.white} size="small" />
              : <>
                  <Text style={s.ctaText}>Sign In</Text>
                  <Ionicons name="arrow-forward" size={17} color={Colors.white} />
                </>
            }
          </TouchableOpacity>

          {/* Divider */}
          <View style={s.dividerRow}>
            <View style={s.dividerLine} />
            <Text style={s.dividerLabel}>OR</Text>
            <View style={s.dividerLine} />
          </View>

          {/* Register */}
          <View style={s.registerRow}>
            <Text style={s.registerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/auth/register')}>
              <Text style={s.registerLink}>Create one now</Text>
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

const s = StyleSheet.create({
  root:       { flex: 1, backgroundColor: Colors.slate },
  accentBar:  { width: '100%', height: 3, backgroundColor: Colors.teal },
  scroll:     { flexGrow: 1, paddingBottom: 44 },
  formDimmed: { opacity: 0.5 },

  brand:     { alignItems: 'center', paddingTop: 48, paddingBottom: 32 },
  brandIcon: {
    width: 54, height: 54, borderRadius: 16,
    backgroundColor: Colors.navy,
    justifyContent: 'center', alignItems: 'center', marginBottom: 14,
    shadowColor: Colors.navy, shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18, shadowRadius: 10, elevation: 6,
  },
  brandName:    { fontSize: 26, fontWeight: '800', color: Colors.navy, letterSpacing: 0.3 },
  brandTagline: { fontSize: 10, fontWeight: '700', color: Colors.indigo, letterSpacing: 2.5, marginTop: 4 },

  card: {
    backgroundColor: Colors.white, borderRadius: 20,
    marginHorizontal: 20, paddingHorizontal: 26, paddingVertical: 30,
    shadowColor: Colors.navy, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07, shadowRadius: 20, elevation: 3,
  },
  cardTitle:    { fontSize: 22, fontWeight: '800', color: Colors.navy, letterSpacing: 0.1, marginBottom: 6 },
  cardSubtitle: { fontSize: 13.5, color: Colors.muted, lineHeight: 21, marginBottom: 24 },

  errorBox: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.redBg, borderRadius: 10,
    borderLeftWidth: 3, borderLeftColor: Colors.red,
    paddingHorizontal: 13, paddingVertical: 11, marginBottom: 20, gap: 9,
  },
  errorText: { flex: 1, fontSize: 13, color: Colors.redText, lineHeight: 19 },

  fieldGroup: { marginBottom: 16 },
  label:      { fontSize: 12.5, fontWeight: '600', color: Colors.label, marginBottom: 7, letterSpacing: 0.1 },
  inputRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.inputBg, borderRadius: 11,
    borderWidth: 1.5, borderColor: Colors.border,
    paddingHorizontal: 13, height: 50,
  },
  inputFocused: { borderColor: Colors.teal, backgroundColor: Colors.tealBg },
  inputErr:     { borderColor: Colors.red, backgroundColor: '#FFF8F8' },
  inputIcon:    { marginRight: 10 },
  inputText:    { flex: 1, fontSize: 15, color: Colors.navy, height: '100%' },
  fieldError:   { fontSize: 11.5, color: Colors.red, marginTop: 5, marginLeft: 2 },

  forgotRow:  { alignSelf: 'flex-end', marginBottom: 24, marginTop: -4, paddingVertical: 2 },
  forgotText: { fontSize: 13, color: Colors.indigo, fontWeight: '600' },

  cta: {
    height: 52, borderRadius: 13, backgroundColor: Colors.teal,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    shadowColor: Colors.teal, shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.28, shadowRadius: 10, elevation: 5,
  },
  ctaDisabled: { opacity: 0.6, shadowOpacity: 0, elevation: 0 },
  ctaText:     { fontSize: 15.5, fontWeight: '700', color: Colors.white, letterSpacing: 0.3 },

  dividerRow:   { flexDirection: 'row', alignItems: 'center', marginVertical: 22, gap: 12 },
  dividerLine:  { flex: 1, height: 1, backgroundColor: Colors.border },
  dividerLabel: { fontSize: 11, color: Colors.subtle, fontWeight: '600', letterSpacing: 1.5 },

  registerRow:  { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  registerText: { fontSize: 13.5, color: Colors.muted },
  registerLink: { fontSize: 13.5, fontWeight: '700', color: Colors.teal },

  secureRow:  { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, marginTop: 26 },
  secureNote: { fontSize: 11.5, color: Colors.subtle, letterSpacing: 0.3 },
});