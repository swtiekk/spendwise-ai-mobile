import { Colors, Semantic } from '@constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// ─── Tab icon with active indicator dot ──────────────────────────────────────
function TabIcon({
  name,
  focused,
  isAdd = false,
}: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  focused: boolean;
  isAdd?: boolean;
}) {
  if (isAdd) {
    return (
      <View style={styles.addIconWrap}>
        <Ionicons name={name} size={22} color={Colors.white} />
      </View>
    );
  }

  return (
    <View style={styles.iconWrap}>
      <Ionicons
        name={name}
        size={22}
        color={focused ? Colors.trustNavy : Semantic.textMuted}
      />
      {focused && <View style={styles.activeDot} />}
    </View>
  );
}

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  // Base tab bar height + system gesture bar inset
  const tabBarHeight  = Platform.OS === 'ios' ? 50 : 70;
  const paddingBottom = Platform.OS === 'ios'
    ? insets.bottom + 4
    : insets.bottom + 10;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: [
          styles.tabBar,
          {
            height:        tabBarHeight + insets.bottom,
            paddingBottom: paddingBottom,
          },
        ],
        tabBarActiveTintColor:   Colors.trustNavy,
        tabBarInactiveTintColor: Semantic.textMuted,
        tabBarLabelStyle:        styles.label,
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ focused }) => (
            <TabIcon name={focused ? 'grid' : 'grid-outline'} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ focused }) => (
            <TabIcon name={focused ? 'time' : 'time-outline'} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="add-expense"
        options={{
          title: '',
          tabBarIcon: () => <TabIcon name="add" focused={false} isAdd />,
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: 'Insights',
          tabBarIcon: ({ focused }) => (
            <TabIcon name={focused ? 'bar-chart' : 'bar-chart-outline'} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabIcon name={focused ? 'person' : 'person-outline'} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen name="index"   options={{ href: null }} />
      <Tabs.Screen name="explore" options={{ href: null }} />
    </Tabs>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Semantic.divider,
    paddingTop: 8,
    shadowColor: Colors.trustNavy,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 12,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 28,
  },
  activeDot: {
    position: 'absolute',
    bottom: -4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.growthTeal,
  },
  addIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: Colors.trustNavy,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? 8 : 4,
    shadowColor: Colors.trustNavy,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
});