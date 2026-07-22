import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import theme from '../../theme/Theme';
import {useAuth} from '../../contexts/AuthContext';
import {translateAuthError} from '../../utils/authErrors';

// Ajuste a tipagem de navigation conforme seu Stack.Navigator
interface Props {
  navigation: any;
}

export default function LoginScreen({navigation}: Props) {
  const {login} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function validate(): string | null {
    if (!email.trim()) return 'Informe seu e-mail.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return 'E-mail inválido.';
    if (!password) return 'Informe sua senha.';
    return null;
  }

  async function handleLogin() {
    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setLoading(true);

    try {
      await login({
        email,
        password
      });
    } catch (err) {
      setError(translateAuthError(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.flex}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <View style={styles.logoBadge}>
              <Ionicons name="car-sport" size={32} color={theme.colors.textOnAccent} />
            </View>

            <Text style={styles.logo}>Bora Lá</Text>
            <Text style={styles.tagline}>
              Caronas entre universitários, com praticidade e economia
            </Text>
          </View>

          <View style={styles.body}>
            <Text style={styles.sectionTitle}>Entre na sua conta</Text>
            <Text style={styles.sectionSubtitle}>
              Encontre caronas de outros estudantes da sua universidade
            </Text>

            <View style={styles.form}>
              <Text style={styles.label}>E-mail</Text>

              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={18} color={theme.colors.textSecondary} />

                <TextInput
                  style={styles.input}
                  placeholder="seuemail@universidade.edu.br"
                  placeholderTextColor={theme.colors.textSecondary}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <Text style={styles.label}>Senha</Text>

              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={18} color={theme.colors.textSecondary} />

                <TextInput
                  style={styles.input}
                  placeholder="Sua senha"
                  placeholderTextColor={theme.colors.textSecondary}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />

                <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)} hitSlop={8}>
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={18}
                    color={theme.colors.textSecondary}
                  />
                </TouchableOpacity>
              </View>

              {error && (
                <View style={styles.errorBox}>
                  <Ionicons name="alert-circle-outline" size={16} color={theme.colors.danger} />
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )}

              <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={theme.colors.textOnAccent} />
                ) : (
                  <Text style={styles.buttonText}>Entrar</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.link}>
                  Não tem uma conta? <Text style={styles.linkBold}>Cadastre-se</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: theme.colors.background
  },

  scrollContent: {
    flexGrow: 1
  },

  header: {
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    paddingTop: theme.spacing.xxl,
    paddingBottom: theme.spacing.xxl,
    paddingHorizontal: theme.spacing.xl,
    borderBottomLeftRadius: theme.radius.xl,
    borderBottomRightRadius: theme.radius.xl
  },

  logoBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md
  },

  logo: {
    fontSize: theme.typography.size.xxl,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.textOnPrimary
  },

  tagline: {
    marginTop: theme.spacing.xs,
    fontSize: theme.typography.size.sm,
    fontFamily: theme.typography.fontFamily.regular,
    color: '#E8D8D0',
    textAlign: 'center',
    maxWidth: 260
  },

  body: {
    flex: 1,
    padding: theme.spacing.xl
  },

  sectionTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.size.lg,
    fontFamily: theme.typography.fontFamily.bold
  },

  sectionSubtitle: {
    marginTop: theme.spacing.xs,
    color: theme.colors.textSecondary,
    fontSize: theme.typography.size.sm,
    fontFamily: theme.typography.fontFamily.regular
  },

  form: {
    marginTop: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.xl,
    ...theme.shadow.card
  },

  label: {
    fontSize: theme.typography.size.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
    marginTop: theme.spacing.md
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.sm,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.background
  },

  input: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    fontSize: theme.typography.size.md,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.textPrimary
  },

  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    backgroundColor: '#F7DCD8',
    borderRadius: theme.radius.sm,
    padding: theme.spacing.sm,
    marginTop: theme.spacing.md
  },

  errorText: {
    flex: 1,
    color: theme.colors.danger,
    fontSize: theme.typography.size.sm,
    fontFamily: theme.typography.fontFamily.regular
  },

  button: {
    backgroundColor: theme.colors.accent,
    borderRadius: theme.radius.pill,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    marginTop: theme.spacing.xl
  },

  buttonDisabled: {
    opacity: 0.7
  },

  buttonText: {
    color: theme.colors.textOnAccent,
    fontSize: theme.typography.size.md,
    fontFamily: theme.typography.fontFamily.bold
  },

  link: {
    textAlign: 'center',
    marginTop: theme.spacing.lg,
    color: theme.colors.textSecondary,
    fontSize: theme.typography.size.sm,
    fontFamily: theme.typography.fontFamily.regular
  },

  linkBold: {
    color: theme.colors.primary,
    fontFamily: theme.typography.fontFamily.bold
  }
});
