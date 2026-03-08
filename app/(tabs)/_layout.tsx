import { Colors, Semantic } from '@constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

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
  // "Add" tab gets a special floating navy pill style
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
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
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

      {/* Centre Add tab — elevated navy pill */}
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

      {/* Hidden screens */}
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
    height: Platform.OS === 'ios' ? 80 : 65,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    paddingTop: 8,
    // Subtle top shadow so it lifts off the screen
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

  // Regular icon container
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 28,
  },

  // Teal dot under the active icon
  activeDot: {
    position: 'absolute',
    bottom: -4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.growthTeal,
  },

  // Centre "Add" floating navy pill
  addIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: Colors.trustNavy,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? 10 : 18,
    // Teal glow shadow
    shadowColor: Colors.trustNavy,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
});