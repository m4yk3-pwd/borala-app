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
  ScrollView
} from 'react-native';
import theme from '../../theme/Theme';
import {useAuth} from '../../contexts/AuthContext';
import {translateAuthError} from '../../utils/authErrors';

interface Props {
  navigation: any;
}

export default function SignUpScreen({navigation}: Props) {
  const {signUp} = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function validate(): string | null {
    if (!name.trim()) return 'Informe seu nome.';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return 'Informe um e-mail válido.';
    }
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 11) {
      return 'Informe um telefone válido, com DDD.';
    }
    if (password.length < 6) return 'A senha precisa ter pelo menos 6 caracteres.';
    if (password !== confirmPassword) return 'As senhas não coincidem.';
    return null;
  }

  async function handleSignUp() {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setLoading(true);
    try {
      await signUp({
        name,
        email,
        phone,
        password
      });
    } catch (err) {
      console.log('ERRO FIREBASE:', err);

      setError(translateAuthError(err));
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.logo}>Bora Lá</Text>
          <Text style={styles.subtitle}>Crie sua conta de passageiro</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Nome completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Seu nome"
            placeholderTextColor={theme.colors.textSecondary}
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="seuemail@exemplo.com"
            placeholderTextColor={theme.colors.textSecondary}
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Telefone</Text>
          <TextInput
            style={styles.input}
            placeholder="(31) 91234-5678"
            placeholderTextColor={theme.colors.textSecondary}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Mínimo 6 caracteres"
            placeholderTextColor={theme.colors.textSecondary}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Text style={styles.label}>Confirmar senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Repita a senha"
            placeholderTextColor={theme.colors.textSecondary}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          {error && <Text style={styles.error}>{error}</Text>}

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSignUp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={theme.colors.textOnAccent} />
            ) : (
              <Text style={styles.buttonText}>Cadastrar</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>
              Já tem uma conta? <Text style={styles.linkBold}>Entrar</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: theme.colors.background},
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: theme.spacing.xl
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl
  },
  logo: {
    fontSize: theme.typography.size.xxl,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.primary
  },
  subtitle: {
    fontSize: theme.typography.size.md,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs
  },
  form: {
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
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.sm,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    fontSize: theme.typography.size.md,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.background
  },
  error: {
    color: theme.colors.danger,
    fontSize: theme.typography.size.sm,
    fontFamily: theme.typography.fontFamily.regular,
    marginTop: theme.spacing.md
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
