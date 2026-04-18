import { Colors, Semantic } from '@constants/colors';
import { BorderRadius, Shadow, Spacing } from '@constants/spacing';
import { Typography } from '@constants/typography';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated, Image, KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../hooks/useAuth';
import { useUser } from '../hooks/useUser';

// ─── Options ─────────────────────────────────────────────────────────────────
const INCOME_TYPES: string[]  = ['salary', 'allowance', 'freelance', 'other'];
const INCOME_CYCLES: string[] = ['weekly', 'biweekly', 'monthly'];

// ─── Fade-slide (same pattern as profile.tsx) ────────────────────────────────
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

// ─── Screen ───────────────────────────────────────────────────────────────────
export default function EditProfileScreen() {
  const router       = useRouter();
  const { user }     = useAuth();
  const { profile, editProfile } = useUser();

  const src = profile ?? user;

  const [form, setForm] = useState({
    name:         src?.name         ?? '',
    email:        src?.email        ?? '',
    phone:        (src as any)?.phone ?? '',
    incomeType:   src?.incomeType   ?? 'salary',
    incomeCycle:  src?.incomeCycle  ?? 'monthly',
    incomeAmount: String(src?.incomeAmount ?? ''),
  });

  const [errors,          setErrors]          = useState<Record<string, string>>({});
  const [isSaving,        setIsSaving]        = useState(false);
  const [focusedField,    setFocusedField]    = useState<string | null>(null);
  const [showTypePicker,  setShowTypePicker]  = useState(false);
  const [showCyclePicker, setShowCyclePicker] = useState(false);
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const saveScale = useRef(new Animated.Value(1)).current;

  // ── Validation ──────────────────────────────────────────────────────────────
  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim())  e.name  = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (form.phone && !/^[+\d\s\-()\u00A0]{7,20}$/.test(form.phone)) e.phone = 'Enter a valid phone number';
    if (form.incomeAmount && isNaN(Number(form.incomeAmount))) e.incomeAmount = 'Must be a number';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Image picker (install expo-image-picker to enable) ─────────────────────
  const showPhotoOptions = () => {
  Alert.alert('Change Photo', 'Choose a source', [
    { text: 'Camera', onPress: openCamera },
    { text: 'Photo Library', onPress: openLibrary },
    { text: 'Cancel', style: 'cancel' },
  ]);
};

const openLibrary = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permission needed', 'Please allow access to your photo library in Settings.');
    return;
  }
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
  });
  if (!result.canceled) setAvatarUri(result.assets[0].uri);
};

const openCamera = async () => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permission needed', 'Please allow camera access in Settings.');
    return;
  }
  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
  });
  if (!result.canceled) setAvatarUri(result.assets[0].uri);
};

  // ── Save ────────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!validate()) return;
    Animated.sequence([
      Animated.timing(saveScale, { toValue: 0.96, duration: 80, useNativeDriver: true }),
      Animated.timing(saveScale, { toValue: 1,    duration: 80, useNativeDriver: true }),
    ]).start();
    setIsSaving(true);
    try {
      await editProfile({
        name:         form.name,
        incomeAmount: Number(form.incomeAmount),
      });
      Alert.alert('Profile Updated', 'Your changes have been saved.', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch {
      Alert.alert('Error', 'Could not save your profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const set = (key: string) => (val: string) => {
    setForm(f => ({ ...f, [key]: val }));
    if (errors[key]) setErrors(e => ({ ...e, [key]: '' }));
  };

  const initials = form.name.trim().split(/\s+/).filter(n => n.length > 0).map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?';

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={s.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={Semantic.background} />

      {/* ── Header ── */}
      <FadeSlide delay={0}>
        <View style={s.header}>
          <TouchableOpacity onPress={() => router.back()} style={s.backBtn} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={20} color={Semantic.text} />
          </TouchableOpacity>
          <View>
            <Text style={s.headerEyebrow}>ACCOUNT</Text>
            <Text style={s.headerTitle}>Edit Profile</Text>
          </View>
          <TouchableOpacity onPress={handleSave} disabled={isSaving} style={s.headerSaveBtn}>
            {isSaving
              ? <ActivityIndicator size="small" color={Semantic.primary} />
              : <Text style={s.headerSaveText}>Save</Text>
            }
          </TouchableOpacity>
        </View>
      </FadeSlide>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
        <ScrollView
          style={s.scroll}
          contentContainerStyle={s.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustKeyboardInsets={true}
        >

          {/* ── Avatar ── */}
          <FadeSlide delay={40}>
            <View style={s.avatarSection}>
              <TouchableOpacity onPress={showPhotoOptions} activeOpacity={0.85} style={s.avatarWrap}>
                {avatarUri ? (
  <Image
    source={{ uri: avatarUri }}
    style={[s.avatarFallback, { borderWidth: 2.5, borderColor: Semantic.primary }]}
  />
) : (
  <View style={s.avatarFallback}>
    <Text style={s.avatarInitials}>{initials}</Text>
  </View>
)}
                <View style={s.cameraBadge}>
                  <Ionicons name="camera" size={12} color={Colors.white} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={showPhotoOptions} activeOpacity={0.7}>
                <Text style={s.changePhotoText}>Change Photo</Text>
              </TouchableOpacity>
            </View>
          </FadeSlide>

          {/* ── Personal Info ── */}
          <FadeSlide delay={80}>
            <View style={s.sectionHeader}>
              <View style={s.sectionDot} />
              <Text style={s.sectionTitle}>Personal Info</Text>
            </View>
            <View style={s.card}>
              <FieldRow
                icon="person-outline"
                label="Name"
                value={form.name}
                onChange={set('name')}
                placeholder="Your full name"
                focused={focusedField === 'name'}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                error={errors.name}
              />
              <View style={s.divider} />
              <FieldRow
                icon="mail-outline"
                label="Email"
                value={form.email}
                onChange={set('email')}
                placeholder="your@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                focused={focusedField === 'email'}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                error={errors.email}
              />
              <View style={s.divider} />
              <FieldRow
                icon="call-outline"
                label="Phone"
                value={form.phone}
                onChange={set('phone')}
                placeholder="+63 9XX XXX XXXX"
                keyboardType="phone-pad"
                autoCapitalize="none"
                focused={focusedField === 'phone'}
                onFocus={() => setFocusedField('phone')}
                onBlur={() => setFocusedField(null)}
                error={errors.phone}
              />
            </View>
          </FadeSlide>

          {/* ── Income ── */}
          <FadeSlide delay={120}>
            <View style={s.sectionHeader}>
              <View style={s.sectionDot} />
              <Text style={s.sectionTitle}>Income</Text>
            </View>
            <View style={s.card}>

              {/* Income Type */}
              <TouchableOpacity
                style={s.pickerRow}
                onPress={() => { setShowTypePicker(v => !v); setShowCyclePicker(false); }}
                activeOpacity={0.7}
              >
                <Ionicons name="briefcase-outline" size={15} color={Semantic.textMuted} style={s.rowIcon} />
                <Text style={s.rowLabel}>Type</Text>
                <Text style={s.pickerValue}>{form.incomeType}</Text>
                <Ionicons
                  name={showTypePicker ? 'chevron-up' : 'chevron-down'}
                  size={14}
                  color={Semantic.primary}
                />
              </TouchableOpacity>
              {showTypePicker && (
                <PickerDropdown
                  options={INCOME_TYPES}
                  selected={form.incomeType}
                  onSelect={v => { set('incomeType')(v); setShowTypePicker(false); }}
                />
              )}

              <View style={s.divider} />

              {/* Pay Cycle */}
              <TouchableOpacity
                style={s.pickerRow}
                onPress={() => { setShowCyclePicker(v => !v); setShowTypePicker(false); }}
                activeOpacity={0.7}
              >
                <Ionicons name="calendar-outline" size={15} color={Semantic.textMuted} style={s.rowIcon} />
                <Text style={s.rowLabel}>Pay Cycle</Text>
                <Text style={s.pickerValue}>{form.incomeCycle}</Text>
                <Ionicons
                  name={showCyclePicker ? 'chevron-up' : 'chevron-down'}
                  size={14}
                  color={Semantic.primary}
                />
              </TouchableOpacity>
              {showCyclePicker && (
                <PickerDropdown
                  options={INCOME_CYCLES}
                  selected={form.incomeCycle}
                  onSelect={v => { set('incomeCycle')(v); setShowCyclePicker(false); }}
                />
              )}

              <View style={s.divider} />

              {/* Monthly income */}
              <FieldRow
                icon="cash-outline"
                label="Monthly"
                value={form.incomeAmount}
                onChange={set('incomeAmount')}
                placeholder="e.g. 18000"
                keyboardType="numeric"
                autoCapitalize="none"
                focused={focusedField === 'incomeAmount'}
                onFocus={() => setFocusedField('incomeAmount')}
                onBlur={() => setFocusedField(null)}
                error={errors.incomeAmount}
                prefix="₱"
              />
            </View>
          </FadeSlide>

          {/* ── Account ── */}
          <FadeSlide delay={160}>
            <View style={s.sectionHeader}>
              <View style={s.sectionDotIndigo} />
              <Text style={s.sectionTitle}>Account</Text>
            </View>
            <View style={s.card}>
              <TouchableOpacity
                style={s.actionRow}
                onPress={() =>
                  Alert.alert('Change Password', 'A reset link will be sent to your email.', [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Send Link' },
                  ])
                }
                activeOpacity={0.7}
              >
                <Ionicons name="lock-closed-outline" size={15} color={Semantic.textMuted} style={s.rowIcon} />
                <Text style={s.actionLabel}>Change Password</Text>
                <Ionicons name="chevron-forward" size={14} color={Semantic.textMuted} />
              </TouchableOpacity>

              <View style={s.divider} />

              <TouchableOpacity
                style={s.actionRow}
                onPress={() =>
                  Alert.alert(
                    'Delete Account',
                    'This is permanent and cannot be undone.',
                    [
                      { text: 'Cancel', style: 'cancel' },
                      { text: 'Delete', style: 'destructive' },
                    ]
                  )
                }
                activeOpacity={0.7}
              >
                <Ionicons name="trash-outline" size={15} color={Colors.error} style={s.rowIcon} />
                <Text style={[s.actionLabel, { color: Colors.error }]}>Delete Account</Text>
                <Ionicons name="chevron-forward" size={14} color={Colors.error} />
              </TouchableOpacity>
            </View>
          </FadeSlide>

          {/* ── Save button ── */}
          <FadeSlide delay={200}>
            <Animated.View style={{ transform: [{ scale: saveScale }] }}>
              <TouchableOpacity
                style={[s.saveBtn, isSaving && { opacity: 0.7 }]}
                onPress={handleSave}
                disabled={isSaving}
                activeOpacity={0.88}
              >
                {isSaving
                  ? <ActivityIndicator color={Colors.white} size="small" />
                  : <>
                      <Ionicons name="checkmark-circle" size={18} color={Colors.white} />
                      <Text style={s.saveBtnText}>Save Changes</Text>
                    </>
                }
              </TouchableOpacity>
            </Animated.View>
          </FadeSlide>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function PickerDropdown({
  options, selected, onSelect,
}: { options: string[]; selected: string; onSelect: (v: string) => void }) {
  return (
    <View style={s.dropdown}>
      {options.map((o, i) => (
        <TouchableOpacity
          key={o}
          style={[s.dropdownRow, i < options.length - 1 && s.dropdownRowBorder]}
          onPress={() => onSelect(o)}
          activeOpacity={0.7}
        >
          <Text style={[s.dropdownText, o === selected && s.dropdownTextActive]}>{o}</Text>
          {o === selected && <Ionicons name="checkmark" size={14} color={Semantic.primary} />}
        </TouchableOpacity>
      ))}
    </View>
  );
}

interface FieldRowProps {
  icon: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  keyboardType?: any;
  autoCapitalize?: any;
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  error?: string;
  prefix?: string;
}

function FieldRow({
  icon, label, value, onChange, placeholder,
  keyboardType, autoCapitalize, focused, onFocus, onBlur, error, prefix,
}: FieldRowProps) {
  return (
    <View>
      <View style={[s.fieldRow, focused && s.fieldRowFocused]}>
        <Ionicons
          name={icon as any}
          size={15}
          color={focused ? Semantic.primary : Semantic.textMuted}
          style={s.rowIcon}
        />
        <Text style={s.rowLabel}>{label}</Text>
        <View style={s.fieldRight}>
          {prefix && <Text style={s.prefix}>{prefix}</Text>}
          <TextInput
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            placeholderTextColor={Semantic.textMuted}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize ?? 'words'}
            style={[s.fieldInput, !!error && { color: Colors.error }]}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </View>
      </View>
      {!!error && (
        <View style={s.errorRow}>
          <Ionicons name="alert-circle" size={11} color={Colors.error} />
          <Text style={s.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
}

// ─── Styles — all tokens from your existing constants ────────────────────────
const s = StyleSheet.create({
  screen:        { flex: 1, backgroundColor: Semantic.background },
  scroll:        { flex: 1 },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: 120,
    gap: Spacing.lg,
  },

  // Header — matches profileStyles pattern exactly
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
    backgroundColor: Semantic.background,
  },
  backBtn: {
    width: 34, height: 34,
    borderRadius: BorderRadius.md,
    backgroundColor: Semantic.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.sm,
  },
  headerEyebrow: {
    fontSize: Typography.sizes.xs,
    color: Semantic.textMuted,
    fontWeight: Typography.weights.medium,
    letterSpacing: Typography.letterSpacing.wide,
  },
  headerTitle: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.extrabold,
    color: Semantic.text,
    letterSpacing: Typography.letterSpacing.tight,
  },
  headerSaveBtn:  { paddingHorizontal: Spacing.xs, paddingVertical: 4 },
  headerSaveText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: Semantic.primary,
  },

  // Section headers — reuse exact same tokens as profileStyles
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  sectionDot: {
    width: 6, height: 6,
    borderRadius: BorderRadius.full,
    backgroundColor: Semantic.primary,
  },
  sectionDotIndigo: {
    width: 6, height: 6,
    borderRadius: BorderRadius.full,
    backgroundColor: Semantic.secondary,
  },
  sectionTitle: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: Semantic.text,
    letterSpacing: Typography.letterSpacing.wider,
    textTransform: 'uppercase',
  },

  // Avatar
  avatarSection: { alignItems: 'center', paddingVertical: Spacing.md },
  avatarWrap:    { position: 'relative', marginBottom: Spacing.sm },
  avatarFallback: {
    width: 72, height: 72,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.growthTeal,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2.5,
    borderColor: Semantic.primary,
  },
  avatarInitials: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.extrabold,
    color: Colors.white,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0, right: 0,
    backgroundColor: Semantic.primary,
    width: 24, height: 24,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Semantic.background,
  },
  changePhotoText: {
    fontSize: Typography.sizes.sm,
    color: Semantic.primary,
    fontWeight: Typography.weights.semibold,
  },

  // Card — matches incomeCard / goalsCard style
  card: {
    backgroundColor: Semantic.surface,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    ...Shadow.sm,
  },
  divider: {
    height: 1,
    backgroundColor: Semantic.divider,
    marginLeft: Spacing.lg + 15 + Spacing.sm, // icon width offset
  },

  // Field rows
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  fieldRowFocused: { backgroundColor: Semantic.primaryBg },
  rowIcon:         { marginRight: Spacing.sm },
  rowLabel: {
    fontSize: Typography.sizes.sm,
    color: Semantic.textSecondary,
    width: 72,
  },
  fieldRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  prefix: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: Semantic.primary,
    marginRight: 2,
  },
  fieldInput: {
    flex: 1,
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: Semantic.text,
    textAlign: 'right',
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.sm,
    marginLeft: 15 + Spacing.sm, // align under label
  },
  errorText: {
    fontSize: Typography.sizes.xs,
    color: Colors.error,
  },

  // Picker rows
  pickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  pickerValue: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: Semantic.primary,
    marginRight: Spacing.xs,
  },

  // Dropdown
  dropdown: {
    backgroundColor: Semantic.background,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Semantic.divider,
    overflow: 'hidden',
  },
  dropdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  dropdownRowBorder:  { borderBottomWidth: 1, borderBottomColor: Semantic.divider },
  dropdownText:       { fontSize: Typography.sizes.sm, color: Semantic.textSecondary },
  dropdownTextActive: { color: Semantic.primary, fontWeight: Typography.weights.bold },

  // Action rows
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  actionLabel: {
    flex: 1,
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.medium,
    color: Semantic.text,
  },

  // Save button — mirrors signOutBtn style
  saveBtn: {
    height: 54,
    borderRadius: BorderRadius.lg,
    backgroundColor: Semantic.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    ...Shadow.sm,
  },
  saveBtnText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
    color: Colors.white,
  },
});