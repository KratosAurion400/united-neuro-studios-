import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const COLORS = {
  background: '#000000',
  surface: '#0a0a0a',
  primary: '#00e5ff',
  secondary: '#7000ff',
  textLight: '#f0f0f0',
  textMuted: '#a0a0a0',
  border: '#1a1a1a',
};

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isDesktop = Platform.OS === 'web' && width >= 768;
  const isLargeDesktop = Platform.OS === 'web' && width >= 1024;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.content, 
        { paddingBottom: isDesktop ? 60 : insets.bottom + 100 }
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header - Mobile Only */}
      {!isDesktop && (
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://i.postimg.cc/NfzHXJhC/neurouniteddstudio2.gif' }}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.headerTitle}>UNITED NEURO STUDIOS</Text>
        </View>
      )}

      {/* Hero Section */}
      <View style={[styles.heroSection, isDesktop && styles.heroSectionDesktop]}>
        <View style={[styles.heroContent, isLargeDesktop && styles.heroContentLarge]}>
          <LinearGradient
            colors={[COLORS.secondary, COLORS.primary]}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={styles.gradientTextContainer}
          >
            <Text style={[styles.heroTitle, isDesktop && styles.heroTitleDesktop]}>
              NEURO-PRECISION
            </Text>
            <Text style={[styles.heroTitle, isDesktop && styles.heroTitleDesktop]}>
              MOTION DESIGN
            </Text>
          </LinearGradient>
          
          <Text style={[styles.heroSubtitle, isDesktop && styles.heroSubtitleDesktop]}>
            A veteran-owned digital art boutique specializing in liquid-motion style animations.
            Every frame drawn by human hands—no AI shortcuts.
          </Text>

          {/* Accent Line */}
          <LinearGradient
            colors={[COLORS.primary, COLORS.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.accentLine}
          />

          {/* CTA Buttons */}
          <View style={[styles.ctaContainer, isDesktop && styles.ctaContainerDesktop]}>
            <TouchableOpacity
              style={[styles.primaryButton, isDesktop && styles.primaryButtonDesktop]}
              onPress={() => router.push('/work')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={[COLORS.secondary, COLORS.primary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                <Text style={styles.buttonText}>VIEW PORTFOLIO</Text>
                <Ionicons name="arrow-forward" size={18} color={COLORS.textLight} />
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.secondaryButton, isDesktop && styles.secondaryButtonDesktop]}
              onPress={() => router.push('/contact')}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryButtonText}>GET IN TOUCH</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Features Section */}
      <View style={[styles.featuresSection, isDesktop && styles.featuresSectionDesktop]}>
        <View style={[styles.sectionInner, isLargeDesktop && styles.sectionInnerLarge]}>
          <Text style={styles.sectionLabel}>WHY CHOOSE US</Text>
          
          <View style={[styles.featuresGrid, isDesktop && styles.featuresGridDesktop]}>
            <FeatureCard
              icon="hand-left"
              title="Human Hand Mandate"
              description="Every frame is meticulously drawn by skilled artists. We reject generative AI entirely."
              isDesktop={isDesktop}
            />
            <FeatureCard
              icon="flag"
              title="Veteran Owned"
              description="Military discipline paired with neuro-divergent hyper-focus defines our signature style."
              isDesktop={isDesktop}
            />
            <FeatureCard
              icon="water"
              title="Liquid Motion Style"
              description="Smooth, flowing animations that bring brands to life with organic precision."
              isDesktop={isDesktop}
            />
          </View>
        </View>
      </View>

      {/* Services Preview */}
      <View style={[styles.servicesPreview, isDesktop && styles.servicesPreviewDesktop]}>
        <View style={[styles.sectionInner, isLargeDesktop && styles.sectionInnerLarge]}>
          <Text style={styles.sectionLabel}>COMMISSION TIERS</Text>
          <View style={[styles.tierRow, isDesktop && styles.tierRowDesktop]}>
            <View style={[styles.tierCard, isDesktop && styles.tierCardDesktop]}>
              <Text style={styles.tierName}>THE MORPH</Text>
              <Text style={[styles.tierPrice, isDesktop && styles.tierPriceDesktop]}>$250</Text>
              <Text style={styles.tierDesc}>Full liquid morphology animation package</Text>
            </View>
            <View style={[styles.tierCard, isDesktop && styles.tierCardDesktop]}>
              <Text style={styles.tierName}>THE CUT</Text>
              <Text style={[styles.tierPrice, isDesktop && styles.tierPriceDesktop]}>$75</Text>
              <Text style={styles.tierDesc}>Focused kinetic typography or single-element</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.viewServicesBtn}
            onPress={() => router.push('/services')}
          >
            <Text style={styles.viewServicesBtnText}>VIEW FULL SERVICES</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
      <View style={[styles.footer, isDesktop && styles.footerDesktop]}>
        <Text style={styles.footerText}>© 2026 United Neuro Studios. All Rights Reserved.</Text>
      </View>
    </ScrollView>
  );
}

function FeatureCard({ icon, title, description, isDesktop }: { 
  icon: string; 
  title: string; 
  description: string;
  isDesktop?: boolean;
}) {
  return (
    <View style={[styles.featureCard, isDesktop && styles.featureCardDesktop]}>
      <View style={styles.featureIconContainer}>
        <Ionicons name={icon as any} size={24} color={COLORS.primary} />
      </View>
      <View style={styles.featureContent}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textLight,
    marginLeft: 12,
    letterSpacing: 1,
  },
  heroSection: {
    paddingTop: 40,
    paddingBottom: 40,
  },
  heroSectionDesktop: {
    paddingTop: 80,
    paddingBottom: 80,
    alignItems: 'center',
  },
  heroContent: {
    width: '100%',
  },
  heroContentLarge: {
    maxWidth: 800,
  },
  gradientTextContainer: {
    borderRadius: 8,
    padding: 2,
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.textLight,
    letterSpacing: 2,
    textAlign: 'center',
    backgroundColor: COLORS.background,
    paddingVertical: 4,
  },
  heroTitleDesktop: {
    fontSize: 56,
    letterSpacing: 4,
  },
  heroSubtitle: {
    fontSize: 16,
    color: COLORS.textMuted,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
  heroSubtitleDesktop: {
    fontSize: 20,
    lineHeight: 32,
    maxWidth: 600,
    alignSelf: 'center',
  },
  accentLine: {
    height: 3,
    width: 80,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 32,
  },
  ctaContainer: {
    gap: 12,
  },
  ctaContainerDesktop: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  primaryButton: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  primaryButtonDesktop: {
    minWidth: 200,
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    gap: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textLight,
    letterSpacing: 1,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  secondaryButtonDesktop: {
    minWidth: 200,
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  featuresSection: {
    paddingVertical: 32,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  featuresSectionDesktop: {
    paddingVertical: 60,
    alignItems: 'center',
  },
  sectionInner: {
    width: '100%',
  },
  sectionInnerLarge: {
    maxWidth: 1200,
    paddingHorizontal: 40,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
    letterSpacing: 2,
    marginBottom: 20,
  },
  featuresGrid: {
    gap: 12,
  },
  featuresGridDesktop: {
    flexDirection: 'row',
    gap: 24,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  featureCardDesktop: {
    flex: 1,
    flexDirection: 'column',
    padding: 32,
    alignItems: 'center',
    textAlign: 'center',
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  featureContent: {
    flex: 1,
    marginLeft: 16,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textLight,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: COLORS.textMuted,
    lineHeight: 20,
  },
  servicesPreview: {
    paddingVertical: 32,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  servicesPreviewDesktop: {
    paddingVertical: 60,
    alignItems: 'center',
  },
  tierRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  tierRowDesktop: {
    gap: 24,
    maxWidth: 600,
  },
  tierCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tierCardDesktop: {
    padding: 40,
  },
  tierName: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMuted,
    letterSpacing: 1,
    marginBottom: 8,
  },
  tierPrice: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.primary,
  },
  tierPriceDesktop: {
    fontSize: 40,
  },
  tierDesc: {
    fontSize: 12,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: 8,
  },
  viewServicesBtn: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  viewServicesBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  footer: {
    marginTop: 32,
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    alignItems: 'center',
  },
  footerDesktop: {
    marginTop: 60,
    paddingVertical: 40,
  },
  footerText: {
    fontSize: 12,
    color: COLORS.textMuted,
    letterSpacing: 0.5,
  },
});
