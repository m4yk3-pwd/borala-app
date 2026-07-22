import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const colors = {
  nightRoute: '#14163A',
  goGreen: '#1FAE7A',
  goGreenDark: '#158A61',
  coralSpark: '#FF6F4C',
  cloud: '#F6F7FB',
  surface: '#FFFFFF',
  ink: '#1B1D2A',
  inkSoft: '#3C3F52',
  mist: '#8A8FA0',
  mistLight: '#E3E5EE',
  error: '#E24B4A',
};

const initialForm = {
  nome: '',
  email: '',
  telefone: '',
  senha: '',
  confirmarSenha: '',
};

export default function SignUpScreen() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [aceitouTermos, setAceitouTermos] = useState(false);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const validate = () => {
    const next = {};
    if (!form.nome.trim()) next.nome = 'Informe seu nome completo';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'E-mail inválido';
    if (!form.telefone.trim()) next.telefone = 'Informe um telefone de contato';
    if (form.senha.length < 6) next.senha = 'A senha precisa ter ao menos 6 caracteres';
    if (form.confirmarSenha !== form.senha) next.confirmarSenha = 'As senhas não coincidem';
    if (!aceitouTermos) next.termos = 'É preciso aceitar os termos para continuar';

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleCreateAccount = () => {
    if (!validate()) return;
    // TODO: chamar o endpoint de cadastro (POST /users)
    // O usuário é sempre criado com a role de passageiro por padrão.
    console.log('Conta criada:', form);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity
            onPress={() => console.log('Voltar')}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>{'←'}</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Criar conta</Text>
          <Text style={styles.subtitle}>
            Você começa como passageiro. Quer oferecer caronas? Depois é só
            ativar o modo motorista no seu perfil.
          </Text>

          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>Nome completo</Text>
            <TextInput
              style={[styles.input, errors.nome && styles.inputError]}
              placeholder="Maria Oliveira"
              placeholderTextColor={colors.mist}
              value={form.nome}
              onChangeText={(v) => updateField('nome', v)}
            />
            {errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}
          </View>

          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>E-mail institucional</Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="maria.oliveira@aluno.ufop.edu.br"
              placeholderTextColor={colors.mist}
              value={form.email}
              onChangeText={(v) => updateField('email', v)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>

          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>Telefone</Text>
            <TextInput
              style={[styles.input, errors.telefone && styles.inputError]}
              placeholder="(31) 99999-0000"
              placeholderTextColor={colors.mist}
              value={form.telefone}
              onChangeText={(v) => updateField('telefone', v)}
              keyboardType="phone-pad"
            />
            {errors.telefone && <Text style={styles.errorText}>{errors.telefone}</Text>}
          </View>

          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>Senha</Text>
            <TextInput
              style={[styles.input, errors.senha && styles.inputError]}
              placeholder="Mínimo de 6 caracteres"
              placeholderTextColor={colors.mist}
              value={form.senha}
              onChangeText={(v) => updateField('senha', v)}
              secureTextEntry
            />
            {errors.senha && <Text style={styles.errorText}>{errors.senha}</Text>}
          </View>

          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>Confirmar senha</Text>
            <TextInput
              style={[styles.input, errors.confirmarSenha && styles.inputError]}
              placeholder="Repita a senha"
              placeholderTextColor={colors.mist}
              value={form.confirmarSenha}
              onChangeText={(v) => updateField('confirmarSenha', v)}
              secureTextEntry
            />
            {errors.confirmarSenha && (
              <Text style={styles.errorText}>{errors.confirmarSenha}</Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.termsRow}
            onPress={() => {
              setAceitouTermos((prev) => !prev);
              setErrors((prev) => ({ ...prev, termos: null }));
            }}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, aceitouTermos && styles.checkboxChecked]}>
              {aceitouTermos && <Text style={styles.checkboxMark}>✓</Text>}
            </View>
            <Text style={styles.termsText}>
              Li e aceito os Termos de uso e a Política de privacidade
            </Text>
          </TouchableOpacity>
          {errors.termos && <Text style={styles.errorText}>{errors.termos}</Text>}

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleCreateAccount}
            activeOpacity={0.85}
          >
            <Text style={styles.submitButtonText}>Criar conta</Text>
          </TouchableOpacity>

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Já tem conta? </Text>
            <TouchableOpacity onPress={() => console.log('Ir para Login')}>
              <Text style={styles.loginLink}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cloud,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 48,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.mistLight,
  },
  backButtonText: {
    fontSize: 18,
    color: colors.ink,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: colors.ink,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.inkSoft,
    marginBottom: 24,
  },
  fieldWrap: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.ink,
    marginBottom: 6,
  },
  input: {
    fontSize: 15,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.mistLight,
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 50,
    color: colors.ink,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    fontSize: 13,
    color: colors.error,
    marginTop: 4,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 24,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: colors.mist,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.goGreen,
    borderColor: colors.goGreen,
  },
  checkboxMark: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: '600',
  },
  termsText: {
    fontSize: 13,
    color: colors.inkSoft,
    flex: 1,
  },
  submitButton: {
    backgroundColor: colors.goGreen,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 16,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.surface,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 15,
    color: colors.inkSoft,
  },
  loginLink: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.goGreenDark,
  },
});