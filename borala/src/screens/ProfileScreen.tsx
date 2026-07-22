// src/screens/ProfileScreen.tsx

import React from 'react';

import {View, Text, TouchableOpacity, StyleSheet, SafeAreaView} from 'react-native';

import theme from '../theme/Theme';
import {useAuth} from '../contexts/AuthContext';

export default function ProfileScreen() {
  const {profile, logout} = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{profile?.name?.charAt(0)}</Text>
        </View>

        <Text style={styles.name}>{profile?.name ?? 'Usuário'}</Text>

        <Text style={styles.email}>{profile?.email}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.item}> {profile?.phone}</Text>

        <Text style={styles.item}> {profile?.ratingAvg ?? 'Sem avaliações'}</Text>

        <Text style={styles.item}> Passageiro</Text>

        <TouchableOpacity style={styles.button} onPress={logout}>
          <Text style={styles.buttonText}>Sair da conta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },

  header: {
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    paddingTop: theme.spacing.xxxl,
    paddingBottom: theme.spacing.xxl,
    borderBottomLeftRadius: theme.radius.xl,
    borderBottomRightRadius: theme.radius.xl
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: theme.colors.accent,
    justifyContent: 'center',
    alignItems: 'center'
  },

  avatarText: {
    fontSize: 40,
    color: '#fff',
    fontFamily: theme.typography.fontFamily.bold
  },

  name: {
    marginTop: theme.spacing.md,
    fontSize: theme.typography.size.xl,
    color: '#fff',
    fontFamily: theme.typography.fontFamily.bold
  },

  email: {
    color: '#E8D8D0'
  },

  card: {
    margin: theme.spacing.xl,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.xl,
    ...theme.shadow.card
  },

  item: {
    fontSize: theme.typography.size.md,
    marginBottom: theme.spacing.lg,
    color: theme.colors.textPrimary
  },

  button: {
    backgroundColor: theme.colors.danger,
    padding: theme.spacing.md,
    borderRadius: theme.radius.pill,
    alignItems: 'center'
  },

  buttonText: {
    color: '#fff',
    fontFamily: theme.typography.fontFamily.bold
  }
});
