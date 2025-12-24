import React, { useState } from 'react';
import type { IconName } from "../components/icon";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import GlassCard from '../components/GlassCard';
import HoverButton from '../components/HoverButton';
import Icon from '../components/icon';

interface LoginSignupPageProps {
  // Props will be handled by expo-router navigation
}

interface AuthFormData {
  email: string;
  password: string;
  name?: string;
  phone?: string;
  confirmPassword?: string;
}

const LoginSignupPage: React.FC<LoginSignupPageProps> = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    name: '',
    phone: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof AuthFormData, string>>>({});

  const primaryColor = '#4361EE';
  const secondaryColor = 'rgba(67, 97, 238, 0.1)';

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof AuthFormData, string>> = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Please enter your password';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Signup specific validations
    if (!isLogin) {
      if (!formData.name?.trim()) {
        newErrors.name = 'Please enter your full name';
      } else if (formData.name.length < 2) {
        newErrors.name = 'Name must be at least 2 characters';
      }

      if (!formData.phone?.trim()) {
        newErrors.phone = 'Please enter your phone number';
      } else if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = 'Phone must be 10 digits';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.confirmPassword !== formData.password) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAuth = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log(`${isLogin ? 'Login' : 'Register'} attempt with:`, {
        email: formData.email,
        name: formData.name,
      });

      // For demo purposes - hardcoded admin detection
      const isAdminEmail = formData.email.toLowerCase().endsWith('@admin.com');

      // Simulated successful response
      const userData = {
        email: formData.email,
        user_name: formData.name || 'User',
        is_admin: isAdminEmail,
      };

      console.log('Auth successful:', userData);

      // In a real app, this would navigate via expo-router
      // router.replace(isAdminEmail ? '/admin' : '/dashboard');

      // For now, just show success state
      alert(`${isLogin ? 'Login' : 'Registration'} successful!`);

    } catch (error) {
      console.error('Auth error:', error);
      alert('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field: keyof AuthFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    // Reset errors when switching modes
    setErrors({});
  };

  const handleForgotPassword = () => {
    alert('Forgot password feature coming soon!');
  };

  const renderFormField = (
    field: keyof AuthFormData,
    label: string,
    iconName: IconName,  // Change from string to IconName
    options: {
      secureTextEntry?: boolean;
      keyboardType?: 'default' | 'email-address' | 'phone-pad';
      showOnlyInSignup?: boolean;
    } = {}
  ) => {
    const { secureTextEntry = false, keyboardType = 'default', showOnlyInSignup = false } = options;

    if (showOnlyInSignup && isLogin) return null;

    return (
      <View style={styles.formFieldContainer}>
        <Text style={styles.inputLabel}>{label}</Text>
        <View style={[
          styles.inputContainer,
          errors[field] ? styles.inputError : styles.inputNormal
        ]}>
          <Icon name={iconName} size={20} color={primaryColor} style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            value={formData[field] || ''}
            onChangeText={(text) => updateFormData(field, text)}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            placeholder={`Enter your ${label.toLowerCase()}`}
            placeholderTextColor="#9CA3AF"
            editable={!isLoading}
          />
        </View>
        {errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#F9FAFB" barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <GlassCard style={styles.mainCard}>
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <View style={[styles.logoCircle, { backgroundColor: secondaryColor }]}>
              <Icon name="apartment" size={50} color={primaryColor} />
            </View>
            <Text style={styles.logoTitle}>UrbanSim AI</Text>
            <Text style={styles.logoSubtitle}>
              AI-powered smart civic issue management
            </Text>
          </View>

          {/* Toggle Tabs */}
          <View style={styles.tabContainer}>
            <View style={styles.tabBackground}>
              <TouchableOpacity
                style={[
                  styles.tabButton,
                  isLogin ? styles.tabButtonActive : styles.tabButtonInactive,
                  { backgroundColor: isLogin ? primaryColor : 'transparent' }
                ]}
                onPress={isLogin ? undefined : toggleAuthMode}
                disabled={isLoading}
              >
                <Text style={[
                  styles.tabText,
                  { color: isLogin ? '#FFFFFF' : '#6B7280' }
                ]}>
                  Sign In
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.tabButton,
                  !isLogin ? styles.tabButtonActive : styles.tabButtonInactive,
                  { backgroundColor: !isLogin ? primaryColor : 'transparent' }
                ]}
                onPress={!isLogin ? undefined : toggleAuthMode}
                disabled={isLoading}
              >
                <Text style={[
                  styles.tabText,
                  { color: !isLogin ? '#FFFFFF' : '#6B7280' }
                ]}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Form Card */}
          <GlassCard style={styles.formCard}>
            <Text style={styles.formTitle}>
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </Text>
            <Text style={styles.formSubtitle}>
              {isLogin
                ? 'Sign in to access the civic issue management system'
                : 'Join the smart civic issue management system'}
            </Text>

            {/* Form Fields */}
            <View style={styles.formFields}>
              {renderFormField('name', 'Full Name', 'person-outline', { showOnlyInSignup: true })}
              {renderFormField('phone', 'Phone Number', 'phone-outlined', {
                keyboardType: 'phone-pad',
                showOnlyInSignup: true
              })}
              {renderFormField('email', 'Email', 'email-outlined', {
                keyboardType: 'email-address'
              })}
              {renderFormField('password', 'Password', 'lock-outline', {
                secureTextEntry: true
              })}
              {renderFormField('confirmPassword', 'Confirm Password', 'lock-person-outlined', {
                secureTextEntry: true,
                showOnlyInSignup: true
              })}
            </View>

            {/* Submit Button */}
            <HoverButton
              title={isLogin ? 'Sign In' : 'Create Account'}
              onPress={handleAuth}
              loading={isLoading}
              style={styles.submitButton}
              icon={isLoading ? undefined : (isLogin ? 'login' : 'person-add')}
            />

            {/* Forgot Password */}
            {isLogin && (
              <TouchableOpacity
                style={styles.forgotPasswordButton}
                onPress={handleForgotPassword}
                disabled={isLoading}
              >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            )}
          </GlassCard>
        </GlassCard>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  mainCard: {
    width: '100%',
    maxWidth: 420,
    padding: 32,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#4361EE',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  logoSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  tabContainer: {
    marginBottom: 32,
  },
  tabBackground: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 15,
    padding: 6,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  tabButtonActive: {
    elevation: 3,
    shadowColor: '#4361EE',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  tabButtonInactive: {
    backgroundColor: 'transparent',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
  },
  formCard: {
    padding: 24,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(67, 97, 238, 0.1)',
  },
  formTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#4361EE',
    textAlign: 'center',
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  formFields: {
    marginBottom: 24,
  },
  formFieldContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: '#F9FAFB',
  },
  inputNormal: {
    borderColor: '#D1D5DB',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    height: 48,
    fontSize: 14,
    color: '#111827',
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
    marginLeft: 4,
  },
  submitButton: {
    backgroundColor: '#4361EE',
    borderRadius: 14,
    height: 56,
    shadowColor: 'rgba(67, 97, 238, 0.4)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  forgotPasswordButton: {
    alignItems: 'center',
    marginTop: 16,
    padding: 8,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4361EE',
  },
});

const LoginScreen = LoginSignupPage;
export default LoginScreen;