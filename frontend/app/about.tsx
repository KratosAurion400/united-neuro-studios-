import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
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

export default function AboutScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 100 }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.pageLabel}>ABOUT US</Text>
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradientBorder}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.pageTitle}>The Collective</Text>
          </View>
        </LinearGradient>
        <Text style={styles.highlightText}>
          United Neuro Studios is a veteran-owned digital art boutique specializing in neuro-precision motion design.
        </Text>
      </View>

      {/* Content Sections */}
      <View style={styles.sectionsContainer}>
        {/* Veteran Founded */}
        <AboutSection
          icon="flag"
          title="Veteran Founded"
          iconColor={COLORS.primary}
        >
          <Text style={styles.sectionText}>
            Lead Artist <Text style={styles.highlight}>ArtMagic</Text> is a Navy Veteran and Senior Concept Artist. Military discipline, paired with a neuro-divergent perspective (Autism/ADHD), allows for a level of hyper-focus that defines our signature liquid-motion style.
          </Text>
        </AboutSection>

        {/* Sheltered Operations */}
        <AboutSection
          icon="shield-checkmark"
          title="Sheltered Operations"
          iconColor={COLORS.secondary}
        >
          <Text style={styles.sectionText}>
            <Text style={styles.highlight}>LaborActivist420</Text> manages all studio logistics and client relations, ensuring the Lead Artist remains in a "sheltered" environment, focusing entirely on high-fidelity production.
          </Text>
        </AboutSection>

        {/* Human Hand Mandate */}
        <View style={styles.mandateSection}>
          <LinearGradient
            colors={[COLORS.secondary, COLORS.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.mandateGradient}
          >
            <View style={styles.mandateInner}>
              <View style={styles.mandateHeader}>
                <Ionicons name="hand-left" size={32} color={COLORS.primary} />
                <Text style={styles.mandateTitle}>Human Hand Mandate</Text>
              </View>
              <Text style={styles.mandateText}>
                We explicitly reject generative AI. Every frame we produce is drawn by a human hand, one transition at a time.
              </Text>
              <View style={styles.mandateDivider} />
              <View style={styles.mandateStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>100%</Text>
                  <Text style={styles.statLabel}>HUMAN CRAFTED</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>0%</Text>
                  <Text style={styles.statLabel}>AI GENERATED</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>
      </View>

      {/* Values */}
      <View style={styles.valuesSection}>
        <Text style={styles.valuesSectionTitle}>OUR VALUES</Text>
        <View style={styles.valuesGrid}>
          <ValueCard icon="eye" label="Precision" />
          <ValueCard icon="heart" label="Passion" />
          <ValueCard icon="flash" label="Focus" />
          <ValueCard icon="diamond" label="Quality" />
        </View>
      </View>
    </ScrollView>
  );
}

function AboutSection({ icon, title, children, iconColor }: {
  icon: string;
  title: string;
  children: React.ReactNode;
  iconColor: string;
}) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={[styles.sectionIcon, { borderColor: iconColor }]}>
          <Ionicons name={icon as any} size={24} color={iconColor} />
        </View>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

function ValueCard({ icon, label }: { icon: string; label: string }) {
  return (
    <View style={styles.valueCard}>
      <Ionicons name={icon as any} size={24} color={COLORS.primary} />
      <Text style={styles.valueLabel}>{label}</Text>
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
    paddingTop: 20,
    paddingBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: 24,
  },
  pageLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
    letterSpacing: 2,
    marginBottom: 12,
  },
  gradientBorder: {
    borderRadius: 8,
    padding: 2,
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  titleContainer: {
    backgroundColor: COLORS.background,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.textLight,
  },
  highlightText: {
    fontSize: 16,
    color: COLORS.primary,
    lineHeight: 26,
    fontWeight: '500',
  },
  sectionsContainer: {
    gap: 24,
  },
  section: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  sectionText: {
    fontSize: 15,
    color: COLORS.textMuted,
    lineHeight: 24,
  },
  highlight: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  mandateSection: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  mandateGradient: {
    padding: 2,
    borderRadius: 16,
  },
  mandateInner: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 24,
  },
  mandateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  mandateTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  mandateText: {
    fontSize: 15,
    color: COLORS.textMuted,
    lineHeight: 24,
  },
  mandateDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 20,
  },
  mandateStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.textMuted,
    letterSpacing: 1,
    marginTop: 4,
  },
  valuesSection: {
    marginTop: 32,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  valuesSectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
    letterSpacing: 2,
    marginBottom: 16,
  },
  valuesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  valueCard: {
    width: '47%',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  valueLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textLight,
    marginTop: 8,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
