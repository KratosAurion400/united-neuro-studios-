import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, Platform, useWindowDimensions, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, usePathname } from 'expo-router';

const COLORS = {
  background: '#000000',
  surface: '#0a0a0a',
  primary: '#00e5ff',
  secondary: '#7000ff',
  textLight: '#f0f0f0',
  textMuted: '#a0a0a0',
  border: '#1a1a1a',
};

const NAV_ITEMS = [
  { name: 'index', label: 'HOME', path: '/' },
  { name: 'work', label: 'WORK', path: '/work' },
  { name: 'services', label: 'SERVICES', path: '/services' },
  { name: 'about', label: 'ABOUT', path: '/about' },
  { name: 'contact', label: 'CONTACT', path: '/contact' },
];

function DesktopHeader() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <View style={styles.desktopHeader}>
      <View style={styles.desktopHeaderInner}>
        <TouchableOpacity 
          style={styles.logoContainer}
          onPress={() => router.push('/')}
        >
          <View style={styles.logoIcon}>
            <Ionicons name="cube" size={24} color={COLORS.background} />
          </View>
          <Text style={styles.logoText}>
            UNITED NEURO <Text style={styles.logoAccent}>STUDIOS</Text>
          </Text>
        </TouchableOpacity>

        <View style={styles.desktopNav}>
          {NAV_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.name}
              style={styles.desktopNavItem}
              onPress={() => router.push(item.path as any)}
            >
              <Text style={[
                styles.desktopNavText,
                isActive(item.path) && styles.desktopNavTextActive
              ]}>
                {item.label}
              </Text>
              {isActive(item.path) && <View style={styles.navIndicator} />}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  // Show desktop header only on web with width >= 900px
  const isDesktop = Platform.OS === 'web' && width >= 900;

  if (isDesktop) {
    return (
      <View style={styles.container}>
        <DesktopHeader />
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: { display: 'none' },
          }}
        >
          <Tabs.Screen name="index" />
          <Tabs.Screen name="work" />
          <Tabs.Screen name="services" />
          <Tabs.Screen name="about" />
          <Tabs.Screen name="contact" />
        </Tabs>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: COLORS.surface,
            borderTopColor: COLORS.border,
            borderTopWidth: 1,
            height: Platform.OS === 'ios' ? 85 : 65,
            paddingBottom: Platform.OS === 'ios' ? 25 : 10,
            paddingTop: 10,
          },
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.textMuted,
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="work"
          options={{
            title: 'Work',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="grid" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="services"
          options={{
            title: 'Services',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="pricetag" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="about"
          options={{
            title: 'About',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="people" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="contact"
          options={{
            title: 'Contact',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="mail" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  desktopHeader: {
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    position: 'sticky' as any,
    top: 0,
    zIndex: 100,
  },
  desktopHeaderInner: {
    maxWidth: 1280,
    marginHorizontal: 'auto',
    paddingHorizontal: 40,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logoText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textLight,
    letterSpacing: 1,
  },
  logoAccent: {
    color: COLORS.primary,
  },
  desktopNav: {
    flexDirection: 'row',
    gap: 32,
  },
  desktopNavItem: {
    paddingVertical: 8,
    position: 'relative',
  },
  desktopNavText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMuted,
    letterSpacing: 1.5,
  },
  desktopNavTextActive: {
    color: COLORS.primary,
  },
  navIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: COLORS.primary,
    borderRadius: 1,
  },
});
