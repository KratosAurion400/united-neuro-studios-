import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
  Platform,
  useWindowDimensions,
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

const PORTFOLIO_ITEMS = [
  {
    id: '1',
    icon: '💠',
    title: 'Company Logos',
    description: 'Liquid morphology and professional brand reveals.',
    link: 'https://postimg.cc/gallery/VLRfZb9',
  },
  {
    id: '2',
    icon: '🖍️',
    title: 'Personal Projects',
    description: 'Experimental kinetic typography and character motion.',
    link: 'https://postimg.cc/gallery/9MMFyXx',
  },
  {
    id: '3',
    icon: '📢',
    title: 'Campaign & Advocacy',
    description: 'Impactful visual assets for non-profits and social movements.',
    link: 'https://postimg.cc/gallery/bNhqLv3',
  },
];

export default function WorkScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isDesktop = Platform.OS === 'web' && width >= 768;
  const isLargeDesktop = Platform.OS === 'web' && width >= 1024;

  const handleOpenLink = async (url: string, title: string) => {
    try {
      if (Platform.OS === 'web') {
        window.open(url, '_blank');
      } else {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
        } else {
          Alert.alert('Error', `Cannot open link for ${title}`);
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open gallery');
    }
  };

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
          <Text style={styles.pageLabel}>PORTFOLIO</Text>
          <LinearGradient
            colors={[COLORS.primary, COLORS.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.gradientBorder}
          >
            <View style={styles.titleContainer}>
              <Text style={[styles.pageTitle, isDesktop && styles.pageTitleDesktop]}>The Galleries</Text>
            </View>
          </LinearGradient>
          <Text style={[styles.pageSubtitle, isDesktop && styles.pageSubtitleDesktop]}>
            Frame-by-frame artistry drawn with intent. No AI shortcuts.
          </Text>
        </View>
      </View>

      {/* Gallery Cards */}
      <View style={[styles.galleryContainer, isLargeDesktop && styles.galleryContainerLarge]}>
        <View style={[styles.galleryGrid, isDesktop && styles.galleryGridDesktop]}>
          {PORTFOLIO_ITEMS.map((item) => (
            <PortfolioCard
              key={item.id}
              item={item}
              onPress={() => handleOpenLink(item.link, item.title)}
              isDesktop={isDesktop}
            />
          ))}
        </View>
      </View>

      {/* Footer Note */}
      <View style={styles.footerNote}>
        <Ionicons name="information-circle-outline" size={20} color={COLORS.textMuted} />
        <Text style={styles.footerNoteText}>
          Tap any card to view the full gallery collection
        </Text>
      </View>

      {/* Footer */}
      <View style={[styles.footer, isDesktop && styles.footerDesktop]}>
        <Text style={styles.footerText}>© 2026 United Neuro Studios. All Rights Reserved.</Text>
      </View>
    </ScrollView>
  );
}

function PortfolioCard({ item, onPress, isDesktop }: { 
  item: typeof PORTFOLIO_ITEMS[0]; 
  onPress: () => void;
  isDesktop?: boolean;
}) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <TouchableOpacity
      style={[
        styles.portfolioCard,
        isDesktop && styles.portfolioCardDesktop,
        isHovered && styles.portfolioCardHovered,
      ]}
      onPress={onPress}
      onPressIn={() => setIsHovered(true)}
      onPressOut={() => setIsHovered(false)}
      {...(Platform.OS === 'web' ? {
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
      } : {})}
      activeOpacity={1}
    >
      <View style={styles.cardHeader}>
        <Text style={[styles.cardIcon, isDesktop && styles.cardIconDesktop]}>{item.icon}</Text>
        <Ionicons name="open-outline" size={20} color={COLORS.primary} />
      </View>
      
      <Text style={[styles.cardTitle, isDesktop && styles.cardTitleDesktop]}>{item.title}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
      
      <View style={styles.cardFooter}>
        <LinearGradient
          colors={[COLORS.secondary, COLORS.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.cardAccent}
        />
        <Text style={styles.viewGalleryText}>VIEW GALLERY</Text>
      </View>
    </TouchableOpacity>
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
    marginBottom: 12,
  },
  gradientBorder: {
    borderRadius: 8,
    padding: 2,
    marginBottom: 16,
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
    textAlign: 'center',
  },
  pageTitleDesktop: {
    fontSize: 48,
  },
  pageSubtitle: {
    fontSize: 16,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 24,
  },
  pageSubtitleDesktop: {
    fontSize: 18,
    maxWidth: 500,
  },
  galleryContainer: {
    width: '100%',
  },
  galleryContainerLarge: {
    maxWidth: 1200,
    alignSelf: 'center',
  },
  galleryGrid: {
    gap: 16,
  },
  galleryGridDesktop: {
    flexDirection: 'row',
    gap: 24,
  },
  portfolioCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  portfolioCardDesktop: {
    flex: 1,
    padding: 32,
  },
  portfolioCardHovered: {
    borderColor: COLORS.primary,
    transform: [{ translateY: -4 }],
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardIcon: {
    fontSize: 32,
  },
  cardIconDesktop: {
    fontSize: 48,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textLight,
    marginBottom: 8,
  },
  cardTitleDesktop: {
    fontSize: 24,
  },
  cardDescription: {
    fontSize: 14,
    color: COLORS.textMuted,
    lineHeight: 22,
    marginBottom: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardAccent: {
    width: 40,
    height: 3,
    borderRadius: 2,
  },
  viewGalleryText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  footerNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 32,
    paddingVertical: 16,
  },
  footerNoteText: {
    fontSize: 13,
    color: COLORS.textMuted,
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
