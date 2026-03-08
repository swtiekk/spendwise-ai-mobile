import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    FlatList,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewToken,
} from 'react-native';
import { Colors } from '../../styles/authStyles';

const { width } = Dimensions.get('window');

// ── Slide data ────────────────────────────────────────────────────────────────
const SLIDES = [
  {
    key: '1',
    icon:       'wallet-outline'      as const,
    iconColor:  Colors.teal,
    iconBg:     '#E6FAF8',
    accentColor: Colors.teal,
    title:      'Track Every Peso',
    subtitle:   'Log your income and expenses in seconds. Know exactly where your money goes — every day.',
    feature1:   { icon: 'add-circle-outline' as const, text: 'Quick expense logging' },
    feature2:   { icon: 'stats-chart-outline' as const, text: 'Real-time balance overview' },
  },
  {
    key: '2',
    icon:       'analytics-outline'   as const,
    iconColor:  Colors.indigo,
    iconBg:     '#EEF2FF',
    accentColor: Colors.indigo,
    title:      'AI-Powered Insights',
    subtitle:   'Our machine learning engine studies your spending patterns and classifies your financial behavior.',
    feature1:   { icon: 'people-outline' as const, text: 'Spending behavior clusters' },
    feature2:   { icon: 'trending-up-outline' as const, text: 'Income sustainability forecast' },
  },
  {
    key: '3',
    icon:       'checkmark-circle-outline' as const,
    iconColor:  '#22C55E',
    iconBg:     '#F0FDF4',
    accentColor: '#22C55E',
    title:      'Decide with Confidence',
    subtitle:   'Before a big purchase, ask SpendWise. Get an instant AI verdict on whether you can afford it.',
    feature1:   { icon: 'shield-checkmark-outline' as const, text: 'Smart purchase advisor' },
    feature2:   { icon: 'notifications-outline' as const, text: 'Proactive budget alerts' },
  },
];

type Slide = typeof SLIDES[0];

// ── Slide card ────────────────────────────────────────────────────────────────
function SlideCard({ item }: { item: Slide }) {
  return (
    <View style={[s.slide, { width }]}>
      {/* Icon */}
      <View style={[s.iconWrap, { backgroundColor: item.iconBg }]}>
        <Ionicons name={item.icon} size={52} color={item.iconColor} />
      </View>

      <Text style={s.slideTitle}>{item.title}</Text>
      <Text style={s.slideSubtitle}>{item.subtitle}</Text>

      {/* Feature pills */}
      <View style={s.featureList}>
        <View style={s.featurePill}>
          <Ionicons name={item.feature1.icon} size={15} color={item.accentColor} />
          <Text style={s.featureText}>{item.feature1.text}</Text>
        </View>
        <View style={s.featurePill}>
          <Ionicons name={item.feature2.icon} size={15} color={item.accentColor} />
          <Text style={s.featureText}>{item.feature2.text}</Text>
        </View>
      </View>
    </View>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function OnboardingScreen() {
  const router   = useRouter();
  const flatRef  = useRef<FlatList>(null);
  const [current, setCurrent] = useState(0);

  // Progress bar animation
  const progressAnim = useRef(new Animated.Value(0)).current;

  const animateProgress = (index: number) => {
    Animated.timing(progressAnim, {
      toValue: (index + 1) / SLIDES.length,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const onViewRef = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      const idx = viewableItems[0].index ?? 0;
      setCurrent(idx);
      animateProgress(idx);
    }
  });

  const goNext = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (current < SLIDES.length - 1) {
      flatRef.current?.scrollToIndex({ index: current + 1, animated: true });
    } else {
      router.replace('/auth/login');
    }
  };

  const skip = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.replace('/auth/login');
  };

  const isLast = current === SLIDES.length - 1;

  return (
    <View style={s.root}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.slate} />

      {/* Top bar */}
      <View style={s.topBar}>
        {/* Brand */}
        <View style={s.topBrand}>
          <View style={s.topBrandIcon}>
            <Ionicons name="wallet-outline" size={14} color={Colors.teal} />
          </View>
          <Text style={s.topBrandName}>SpendWise</Text>
        </View>

        {/* Skip */}
        {!isLast && (
          <TouchableOpacity onPress={skip} style={s.skipBtn}>
            <Text style={s.skipText}>Skip</Text>
            <Ionicons name="chevron-forward" size={13} color={Colors.subtle} />
          </TouchableOpacity>
        )}
      </View>

      {/* Progress bar */}
      <View style={s.progressTrack}>
        <Animated.View
          style={[
            s.progressFill,
            {
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
              backgroundColor: SLIDES[current].accentColor,
            },
          ]}
        />
      </View>

      {/* Slides */}
      <FlatList
        ref={flatRef}
        data={SLIDES}
        keyExtractor={item => item.key}
        renderItem={({ item }) => <SlideCard item={item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        style={{ flex: 1 }}
      />

      {/* Bottom controls */}
      <View style={s.bottomControls}>
        {/* Dot indicators */}
        <View style={s.dots}>
          {SLIDES.map((slide, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => {
                flatRef.current?.scrollToIndex({ index: i, animated: true });
                Haptics.selectionAsync();
              }}
            >
              <Animated.View
                style={[
                  s.dot,
                  i === current && { backgroundColor: SLIDES[current].accentColor, width: 20 },
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Next / Get Started */}
        <TouchableOpacity
          style={[s.nextBtn, { backgroundColor: SLIDES[current].accentColor }]}
          onPress={goNext}
          activeOpacity={0.85}
        >
          <Text style={s.nextText}>{isLast ? 'Get Started' : 'Next'}</Text>
          <Ionicons
            name={isLast ? 'arrow-forward-circle-outline' : 'chevron-forward'}
            size={18}
            color={Colors.white}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.slate },

  // Top
  topBar: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22, paddingTop: 20, paddingBottom: 12,
  },
  topBrand:     { flexDirection: 'row', alignItems: 'center', gap: 8 },
  topBrandIcon: {
    width: 28, height: 28, borderRadius: 8,
    backgroundColor: Colors.navy,
    justifyContent: 'center', alignItems: 'center',
  },
  topBrandName: { fontSize: 15, fontWeight: '800', color: Colors.navy },
  skipBtn:      { flexDirection: 'row', alignItems: 'center', gap: 2, paddingVertical: 4 },
  skipText:     { fontSize: 13, color: Colors.subtle, fontWeight: '500' },

  // Progress
  progressTrack: { height: 3, backgroundColor: Colors.border, marginHorizontal: 22, borderRadius: 2 },
  progressFill:  { height: 3, borderRadius: 2 },

  // Slide
  slide: {
    paddingTop: 52, paddingBottom: 24,
    paddingHorizontal: 32, alignItems: 'center',
  },
  iconWrap: {
    width: 110, height: 110, borderRadius: 32,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 36,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06, shadowRadius: 12, elevation: 3,
  },
  slideTitle: {
    fontSize: 26, fontWeight: '800',
    color: Colors.navy, textAlign: 'center',
    marginBottom: 14, letterSpacing: 0.2,
  },
  slideSubtitle: {
    fontSize: 15, color: Colors.muted,
    textAlign: 'center', lineHeight: 24,
    marginBottom: 32, paddingHorizontal: 8,
  },
  featureList: { gap: 10, width: '100%' },
  featurePill: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: Colors.white, borderRadius: 12,
    paddingHorizontal: 16, paddingVertical: 13,
    shadowColor: Colors.navy, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
    borderWidth: 1, borderColor: Colors.border,
  },
  featureText: { fontSize: 13.5, color: Colors.navy, fontWeight: '500' },

  // Bottom
  bottomControls: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24, paddingBottom: 36, paddingTop: 16,
  },
  dots: { flexDirection: 'row', gap: 6, alignItems: 'center' },
  dot: {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: Colors.border,
  },
  nextBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 24, paddingVertical: 14,
    borderRadius: 14,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25, shadowRadius: 8, elevation: 4,
  },
  nextText: { fontSize: 15, fontWeight: '700', color: Colors.white },
});