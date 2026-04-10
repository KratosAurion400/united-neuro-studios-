import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Linking,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const EXPO_PUBLIC_BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

const COLORS = {
  background: '#000000',
  surface: '#0a0a0a',
  primary: '#00e5ff',
  secondary: '#7000ff',
  textLight: '#f0f0f0',
  textMuted: '#a0a0a0',
  border: '#1a1a1a',
  inputBg: '#050505',
};

const COMMISSION_OPTIONS = [
  { label: 'Select a commission type...', value: '' },
  { label: 'The Morph ($250)', value: 'The Morph ($250)' },
  { label: 'The Cut ($75)', value: 'The Cut ($75)' },
];

export default function ContactScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isDesktop = Platform.OS === 'web' && width >= 768;
  const isLargeDesktop = Platform.OS === 'web' && width >= 1024;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    commission: '',
    brief: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showCommissionPicker, setShowCommissionPicker] = useState(false);

  const handleSubmit = async () => {
    // Validate form
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email');
      return;
    }
    if (!formData.commission) {
      Alert.alert('Error', 'Please select a commission type');
      return;
    }
    if (!formData.brief.trim()) {
      Alert.alert('Error', 'Please describe your project');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${EXPO_PUBLIC_BACKEND_URL}/api/inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', commission: '', brief: '' });
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to submit inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailPress = () => {
    Linking.openURL('mailto:info@thecomputingalchemists.com');
  };

  const resetForm = () => {
    setIsSubmitted(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content, 
          { paddingBottom: isDesktop ? 60 : insets.bottom + 100 },
          isDesktop && styles.contentDesktop
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={[styles.header, isDesktop && styles.headerDesktop]}>
          <View style={[styles.headerInner, isLargeDesktop && styles.headerInnerLarge]}>
            <Text style={styles.pageLabel}>CONTACT</Text>
            <Text style={[styles.pageTitle, isDesktop && styles.pageTitleDesktop]}>Inquiry</Text>
          </View>
        </View>

        {/* Main Content */}
        <View style={[styles.mainContent, isLargeDesktop && styles.mainContentLarge]}>
          <View style={[styles.contentGrid, isDesktop && styles.contentGridDesktop]}>
            {/* Contact Info */}
            <View style={[styles.infoSection, isDesktop && styles.infoSectionDesktop]}>
              <Text style={[styles.infoTitle, isDesktop && styles.infoTitleDesktop]}>Get In Touch</Text>
              <Text style={styles.infoText}>Connect with management for commissions.</Text>
              
              <View style={styles.infoCard}>
                <View style={styles.infoRow}>
                  <View style={styles.infoIconContainer}>
                    <Ionicons name="person" size={20} color={COLORS.primary} />
                  </View>
                  <View>
                    <Text style={styles.infoLabel}>Management</Text>
                    <Text style={styles.infoValue}>LaborActivist420</Text>
                  </View>
                </View>
                
                <TouchableOpacity style={styles.emailRow} onPress={handleEmailPress}>
                  <View style={styles.infoIconContainer}>
                    <Ionicons name="mail" size={20} color={COLORS.primary} />
                  </View>
                  <View>
                    <Text style={styles.infoLabel}>Email</Text>
                    <Text style={styles.emailText}>info@thecomputingalchemists.com</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* Form Card */}
            <View style={[styles.formCard, isDesktop && styles.formCardDesktop]}>
              <LinearGradient
                colors={[COLORS.secondary, COLORS.primary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.formAccent}
              />

              {isSubmitted ? (
                <View style={styles.successContainer}>
                  <View style={styles.successIconContainer}>
                    <Ionicons name="checkmark-circle" size={64} color={COLORS.primary} />
                  </View>
                  <Text style={styles.successTitle}>Message Sent!</Text>
                  <Text style={styles.successText}>
                    Your inquiry has been received. We'll get back to you within 24-48 hours.
                  </Text>
                  <TouchableOpacity style={styles.newInquiryButton} onPress={resetForm}>
                    <Text style={styles.newInquiryButtonText}>SEND ANOTHER</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.form}>
                  <View style={[styles.formRow, isDesktop && styles.formRowDesktop]}>
                    {/* Name Input */}
                    <View style={[styles.inputGroup, isDesktop && styles.inputGroupHalf]}>
                      <Text style={styles.inputLabel}>NAME</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Your full name"
                        placeholderTextColor={COLORS.textMuted}
                        value={formData.name}
                        onChangeText={(text) => setFormData({ ...formData, name: text })}
                        autoCapitalize="words"
                      />
                    </View>

                    {/* Email Input */}
                    <View style={[styles.inputGroup, isDesktop && styles.inputGroupHalf]}>
                      <Text style={styles.inputLabel}>EMAIL</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="your@email.com"
                        placeholderTextColor={COLORS.textMuted}
                        value={formData.email}
                        onChangeText={(text) => setFormData({ ...formData, email: text })}
                        keyboardType="email-address"
                        autoCapitalize="none"
                      />
                    </View>
                  </View>

                  {/* Commission Select */}
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>COMMISSION</Text>
                    <TouchableOpacity
                      style={styles.selectButton}
                      onPress={() => setShowCommissionPicker(!showCommissionPicker)}
                    >
                      <Text style={[
                        styles.selectText,
                        !formData.commission && styles.selectPlaceholder
                      ]}>
                        {formData.commission || 'Select a commission type...'}
                      </Text>
                      <Ionicons
                        name={showCommissionPicker ? 'chevron-up' : 'chevron-down'}
                        size={20}
                        color={COLORS.textMuted}
                      />
                    </TouchableOpacity>
                    {showCommissionPicker && (
                      <View style={styles.optionsContainer}>
                        {COMMISSION_OPTIONS.slice(1).map((option) => (
                          <TouchableOpacity
                            key={option.value}
                            style={[
                              styles.option,
                              formData.commission === option.value && styles.optionSelected
                            ]}
                            onPress={() => {
                              setFormData({ ...formData, commission: option.value });
                              setShowCommissionPicker(false);
                            }}
                          >
                            <Text style={[
                              styles.optionText,
                              formData.commission === option.value && styles.optionTextSelected
                            ]}>
                              {option.label}
                            </Text>
                            {formData.commission === option.value && (
                              <Ionicons name="checkmark" size={18} color={COLORS.primary} />
                            )}
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View>

                  {/* Brief Textarea */}
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>BRIEF</Text>
                    <TextInput
                      style={[styles.input, styles.textarea]}
                      placeholder="Describe your project, vision, and any specific requirements..."
                      placeholderTextColor={COLORS.textMuted}
                      value={formData.brief}
                      onChangeText={(text) => setFormData({ ...formData, brief: text })}
                      multiline
                      numberOfLines={5}
                      textAlignVertical="top"
                    />
                  </View>

                  {/* Submit Button */}
                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmit}
                    disabled={isSubmitting}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={[COLORS.secondary, COLORS.primary]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.submitGradient}
                    >
                      {isSubmitting ? (
                        <ActivityIndicator color={COLORS.textLight} />
                      ) : (
                        <>
                          <Ionicons name="send" size={18} color={COLORS.textLight} />
                          <Text style={styles.submitText}>SEND MESSAGE</Text>
                        </>
                      )}
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={[styles.footer, isDesktop && styles.footerDesktop]}>
          <Text style={styles.footerText}>© 2026 United Neuro Studios. All Rights Reserved.</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
  },
  contentDesktop: {
    paddingHorizontal: 40,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: 24,
  },
  headerDesktop: {
    paddingTop: 60,
    paddingBottom: 40,
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
  },
  pageTitleDesktop: {
    fontSize: 48,
  },
  mainContent: {
    width: '100%',
  },
  mainContentLarge: {
    maxWidth: 1000,
    alignSelf: 'center',
  },
  contentGrid: {
    gap: 24,
  },
  contentGridDesktop: {
    flexDirection: 'row',
    gap: 40,
  },
  infoSection: {
    marginBottom: 24,
  },
  infoSectionDesktop: {
    flex: 1,
    maxWidth: 350,
    marginBottom: 0,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textLight,
    marginBottom: 8,
  },
  infoTitleDesktop: {
    fontSize: 24,
  },
  infoText: {
    fontSize: 16,
    color: COLORS.textMuted,
    marginBottom: 24,
  },
  infoCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  infoIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  emailText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
  },
  formCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  formCardDesktop: {
    flex: 1,
  },
  formAccent: {
    height: 4,
  },
  form: {
    padding: 24,
  },
  formRow: {
    gap: 20,
  },
  formRowDesktop: {
    flexDirection: 'row',
    gap: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputGroupHalf: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMuted,
    letterSpacing: 1,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.inputBg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: COLORS.textLight,
  },
  textarea: {
    minHeight: 120,
    paddingTop: 14,
  },
  selectButton: {
    backgroundColor: COLORS.inputBg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectText: {
    fontSize: 16,
    color: COLORS.textLight,
  },
  selectPlaceholder: {
    color: COLORS.textMuted,
  },
  optionsContainer: {
    marginTop: 8,
    backgroundColor: COLORS.inputBg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  optionSelected: {
    backgroundColor: COLORS.primary + '15',
  },
  optionText: {
    fontSize: 16,
    color: COLORS.textLight,
  },
  optionTextSelected: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  submitButton: {
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 8,
  },
  submitGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 10,
  },
  submitText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textLight,
    letterSpacing: 1,
  },
  successContainer: {
    padding: 40,
    alignItems: 'center',
  },
  successIconContainer: {
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textLight,
    marginBottom: 12,
  },
  successText: {
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  newInquiryButton: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  newInquiryButtonText: {
    fontSize: 12,
    fontWeight: '700',
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
