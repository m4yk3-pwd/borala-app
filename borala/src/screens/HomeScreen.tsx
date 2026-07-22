// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import theme from '../theme/Theme';
import { useAuth } from '../contexts/AuthContext';

export default function HomeScreen() {
  const { profile, logout } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Olá, {profile?.name ?? 'usuário'} 👋</Text>
      <Text style={styles.subtitle}>Você está logado no Bora Lá.</Text>

      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.xl,
    justifyContent: 'center',
  },
  title: {
    fontSize: theme.typography.size.xl,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.primary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: theme.typography.size.md,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.sm,
  },
  button: {
    backgroundColor: theme.colors.danger,
    borderRadius: theme.radius.pill,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    marginTop: theme.spacing.xxl,
  },
  buttonText: {
    color: theme.colors.textOnAccent,
    fontSize: theme.typography.size.md,
    fontFamily: theme.typography.fontFamily.bold,
  },
});