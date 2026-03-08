import { Redirect } from 'expo-router';

// Entry point — AuthGuard in _layout.tsx handles where to send the user.
// This just prevents the "missing default export" warning.
export default function Index() {
  return <Redirect href="/auth/login" />;
}