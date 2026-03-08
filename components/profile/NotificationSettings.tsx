import { Colors, Semantic } from '@constants/colors';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Switch, Text, View } from 'react-native';
import { ProfileStyles as s } from '../../styles/profileStyles';

interface NotificationSettingsProps {
  onChange?: (key: string, value: boolean) => void;
}

const defaultSettings = {
  pushNotifications: true,
  budgetAlerts:      true,
  weeklyReports:     false,
  spendingReminders: true,
};

type SettingKey = keyof typeof defaultSettings;

const NOTIF_ITEMS: {
  key:  SettingKey;
  label: string;
  desc:  string;
  icon:  React.ComponentProps<typeof Ionicons>['name'];
}[] = [
  { key: 'pushNotifications', label: 'Push Notifications', desc: 'Receive alerts on your device',     icon: 'notifications-outline'  },
  { key: 'budgetAlerts',      label: 'Budget Alerts',      desc: 'Warn when nearing budget limits',   icon: 'warning-outline'        },
  { key: 'weeklyReports',     label: 'Weekly Reports',     desc: 'Get a weekly spending summary',     icon: 'bar-chart-outline'      },
  { key: 'spendingReminders', label: 'Spending Reminders', desc: 'Daily reminders to log expenses',   icon: 'alarm-outline'          },
];

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({ onChange }) => {
  const [settings, setSettings] = useState(defaultSettings);

  const toggle = (key: SettingKey) => {
    const updated = { ...settings, [key]: !settings[key] };
    setSettings(updated);
    onChange?.(key, updated[key]);
  };

  return (
    <View style={s.notifCard}>
      {/* ── Card header ── */}
      <View style={s.notifCardHeader}>
        <Ionicons name="settings-outline" size={16} color={Semantic.secondary} />
        <Text style={s.notifCardTitle}>Notifications</Text>
      </View>

      {/* ── Toggle rows ── */}
      {NOTIF_ITEMS.map((item, idx) => {
        const isLast  = idx === NOTIF_ITEMS.length - 1;
        const rowStyle = isLast ? s.notifRowLast : s.notifRow;
        const isOn     = settings[item.key];

        return (
          <View key={item.key} style={rowStyle}>
            <View style={s.notifRowLeft}>
              <View style={[
                s.notifIconWrap,
                isOn && { backgroundColor: Semantic.primaryBg },
              ]}>
                <Ionicons
                  name={item.icon}
                  size={16}
                  color={isOn ? Semantic.primary : Semantic.textMuted}
                />
              </View>
              <View style={s.notifTextCol}>
                <Text style={s.notifLabel}>{item.label}</Text>
                <Text style={s.notifDesc}>{item.desc}</Text>
              </View>
            </View>
            <Switch
              value={isOn}
              onValueChange={() => toggle(item.key)}
              trackColor={{ false: Semantic.border, true: Colors.growthTeal }}
              thumbColor={isOn ? Colors.white : Semantic.textMuted}
            />
          </View>
        );
      })}
    </View>
  );
};