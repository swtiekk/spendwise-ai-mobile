import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';

function AuthGuard() {
  const router          = useRouter();
  const segments        = useSegments();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [isReady, setIsReady] = useState(false);

  // ✅ Wait one tick for the Root Layout navigator to fully mount
  // before attempting any navigation — fixes "navigate before mounting" error
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const inAuthGroup = segments[0] === 'auth';

    if (isAuthenticated && inAuthGroup) {
      router.replace('/(tabs)/dashboard');
    } else if (!isAuthenticated && !inAuthGroup) {
      router.replace('/auth/login');
    }
  }, [isReady, isAuthenticated, segments]);

  return null;
}

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="auth" />
        <Stack.Screen name="(tabs)" />
        {/* AuthGuard must be INSIDE Stack so the navigator is mounted first */}
      </Stack>
      <AuthGuard />
    </>
  );
}