import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
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

const SERVICES = [
  {
    id: 'morph',
    name: 'The Morph',
    price: '$250',
    description: 'Full liquid morphology animation package with professional brand integration.',
    features: [
      'Complete logo/brand reveal animation',
      'Liquid-motion transformation sequences',
      'Multiple revision rounds included',
      'High-fidelity 4K export',
      'Source files provided',
      'Priority delivery (5-7 business days)',
    ],
    popular: true,
  },
  {
    id: 'cut',
    name: 'The Cut',
    price: '$75',
    description: 'Focused kinetic typography or single-element motion design.',
    features: [
      'Single element or text animation',
      'Clean transition effects',
      'One revision round',
      '1080p HD export',
      'Quick turnaround (2-3 business days)',
    ],
    popular: false,
  },
];

export default function ServicesScreen() {
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
        { paddingBottom: isDesktop ? 60 : insets.bottom + 100 },
        isDesktop && styles.contentDesktop
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={[styles.header, isDesktop && styles.headerDesktop]}>
        <View style={[styles.headerInner, isLargeDesktop && styles.headerInnerLarge]}>
          <Text style={styles.pageLabel}>COMMISSIONS</Text>
          <Text style={[styles.pageTitle, isDesktop && styles.pageTitleDesktop]}>Service Tiers</Text>
          <Text style={[styles.pageSubtitle, isDesktop && styles.pageSubtitleDesktop]}>
            Hand-drawn precision. Every frame crafted with neuro-focused intent.
          </Text>
        </View>
      </View>

      {/* Service Cards */}
      <View style={[styles.servicesContainer, isLargeDesktop && styles.servicesContainerLarge]}>
        <View style={[styles.servicesGrid, isDesktop && styles.servicesGridDesktop]}>
          {SERVICES.map((service) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              onPress={() => router.push('/contact')} 
              isDesktop={isDesktop}
            />
          ))}
        </View>
      </View>

      {/* Human Hand Mandate Notice */}
      <View style={[styles.mandateContainer, isLargeDesktop && styles.mandateContainerLarge]}>
        <View style={styles.mandateNotice}>
          <LinearGradient
            colors={[COLORS.secondary + '20', COLORS.primary + '20']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.mandateGradient}
          >
            <Ionicons name="hand-left" size={24} color={COLORS.primary} />
            <Text style={styles.mandateTitle}>Human Hand Mandate</Text>
            <Text style={styles.mandateText}>
              We explicitly reject generative AI. Every frame we produce is drawn by a human hand, one transition at a time.
            </Text>
          </LinearGradient>
        </View>
      </View>

      {/* CTA */}
      <View style={[styles.ctaSection, isLargeDesktop && styles.ctaSectionLarge]}>
        <Text style={styles.ctaText}>Ready to bring your vision to life?</Text>
        <TouchableOpacity
          style={[styles.ctaButton, isDesktop && styles.ctaButtonDesktop]}
          onPress={() => router.push('/contact')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={[COLORS.secondary, COLORS.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.ctaGradient}
          >
            <Text style={styles.ctaButtonText}>START A COMMISSION</Text>
            <Ionicons name="arrow-forward" size={18} color={COLORS.textLight} />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={[styles.footer, isDesktop && styles.footerDesktop]}>
        <Text style={styles.footerText}>© 2026 United Neuro Studios. All Rights Reserved.</Text>
      </View>
    </ScrollView>
  );
}

function ServiceCard({ service, onPress, isDesktop }: { 
  service: typeof SERVICES[0]; 
  onPress: () => void;
  isDesktop?: boolean;
}) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <View style={[
      styles.serviceCard, 
      service.popular && styles.popularCard,
      isDesktop && styles.serviceCardDesktop,
      isHovered && styles.serviceCardHovered,
    ]}>
      {service.popular && (
        <View style={styles.popularBadge}>
          <LinearGradient
            colors={[COLORS.secondary, COLORS.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.popularGradient}
          >
            <Text style={styles.popularText}>POPULAR</Text>
          </LinearGradient>
        </View>
      )}

      <Text style={styles.serviceName}>{service.name}</Text>
      <Text style={[styles.servicePrice, isDesktop && styles.servicePriceDesktop]}>{service.price}</Text>
      <Text style={styles.serviceDescription}>{service.description}</Text>

      <View style={styles.divider} />

      <View style={styles.featuresList}>
        {service.features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={18} color={COLORS.primary} />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[
          styles.selectButton,
          service.popular && styles.selectButtonPopular,
        ]}
        onPress={onPress}
        activeOpacity={0.8}
        {...(Platform.OS === 'web' ? {
          onMouseEnter: () => setIsHovered(true),
          onMouseLeave: () => setIsHovered(false),
        } : {})}
      >
        {service.popular ? (
          <LinearGradient
            colors={[COLORS.secondary, COLORS.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.selectButtonGradient}
          >
            <Text style={styles.selectButtonTextLight}>SELECT</Text>
          </LinearGradient>
        ) : (
          <Text style={styles.selectButtonText}>SELECT</Text>
        )}
      </TouchableOpacity>
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
  contentDesktop: {
    paddingHorizontal: 40,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: 24,
  },
  headerDesktop: {
    paddingTop: 60,
    paddingBottom: 60,
    alignItems: 'center',
  },
  headerInner: {
    width: '100%',
  },
  headerInnerLarge: {
    maxWidth: 1200,
    alignItems: 'center',
  },
  pageLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
    letterSpacing: 2,
    marginBottom: 8,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.textLight,
    marginBottom: 8,
  },
  pageTitleDesktop: {
    fontSize: 48,
    marginBottom: 16,
  },
  pageSubtitle: {
    fontSize: 16,
    color: COLORS.textMuted,
    lineHeight: 24,
  },
  pageSubtitleDesktop: {
    fontSize: 18,
    textAlign: 'center',
  },
  servicesContainer: {
    width: '100%',
  },
  servicesContainerLarge: {
    maxWidth: 900,
    alignSelf: 'center',
  },
  servicesGrid: {
    gap: 20,
  },
  servicesGridDesktop: {
    flexDirection: 'row',
    gap: 32,
  },
  serviceCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  serviceCardDesktop: {
    flex: 1,
    padding: 32,
  },
  serviceCardHovered: {
    borderColor: COLORS.primary,
  },
  popularCard: {
    borderColor: COLORS.primary,
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    right: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  popularGradient: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  popularText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textLight,
    letterSpacing: 1,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textMuted,
    letterSpacing: 1,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  servicePrice: {
    fontSize: 48,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 12,
  },
  servicePriceDesktop: {
    fontSize: 56,
  },
  serviceDescription: {
    fontSize: 14,
    color: COLORS.textMuted,
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 20,
  },
  featuresList: {
    gap: 12,
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  featureText: {
    fontSize: 14,
    color: COLORS.textLight,
    flex: 1,
    lineHeight: 20,
  },
  selectButton: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingVertical: 14,
    alignItems: 'center',
  },
  selectButtonPopular: {
    borderWidth: 0,
    overflow: 'hidden',
  },
  selectButtonGradient: {
    width: '100%',
    paddingVertical: 14,
    alignItems: 'center',
  },
  selectButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  selectButtonTextLight: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textLight,
    letterSpacing: 1,
  },
  mandateContainer: {
    width: '100%',
    marginTop: 32,
  },
  mandateContainerLarge: {
    maxWidth: 600,
    alignSelf: 'center',
  },
  mandateNotice: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  mandateGradient: {
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
  },
  mandateTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textLight,
    marginTop: 12,
    marginBottom: 8,
  },
  mandateText: {
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
  ctaSection: {
    marginTop: 32,
    alignItems: 'center',
  },
  ctaSectionLarge: {
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  ctaText: {
    fontSize: 16,
    color: COLORS.textMuted,
    marginBottom: 16,
  },
  ctaButton: {
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  ctaButtonDesktop: {
    maxWidth: 300,
  },
  ctaGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  ctaButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textLight,
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
