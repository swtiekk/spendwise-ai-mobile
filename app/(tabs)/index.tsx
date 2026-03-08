import { Redirect } from 'expo-router';

// (tabs)/index.tsx — redirect to dashboard tab
// This prevents "missing default export" warning for the hidden index route
export default function TabIndex() {
  return <Redirect href="/(tabs)/dashboard" />;
}
