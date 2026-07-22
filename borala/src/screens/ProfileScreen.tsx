import React from 'react';

import {View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import theme from '../theme/Theme';
import {useAuth} from '../contexts/AuthContext';

export default function ProfileScreen() {
  const {profile, logout} = useAuth();

  const isDriver = profile?.roles?.includes('DRIVER' as any);

  const hasRating = typeof profile?.ratingAvg === 'number' && (profile?.ratingCount ?? 0) > 0;

  function formatMemberSince(createdAt: any) {
    if (!createdAt) {
      return null;
    }

    const value = createdAt?.toDate ? createdAt.toDate() : new Date(createdAt);

    const formatted = value.toLocaleDateString('pt-BR', {month: 'long', year: 'numeric'});

    return `Membro desde ${formatted}`;
  }

  const memberSince = formatMemberSince(profile?.createdAt);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{profile?.name?.charAt(0).toUpperCase() ?? 'U'}</Text>
          </View>

          <Text style={styles.name}>{profile?.name ?? 'Usuário'}</Text>

          <Text style={styles.email}>{profile?.email}</Text>

          <View style={styles.roleBadge}>
            <Ionicons
              name={isDriver ? 'car-sport-outline' : 'person-outline'}
              size={14}
              color={theme.colors.primary}
            />

            <Text style={styles.roleBadgeText}>{isDriver ? 'Motorista' : 'Passageiro'}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.rowIcon}>
              <Ionicons name="call-outline" size={18} color={theme.colors.primary} />
            </View>

            <View style={styles.rowContent}>
              <Text style={styles.rowLabel}>Telefone</Text>
              <Text style={styles.rowValue}>{profile?.phone || 'Não informado'}</Text>
            </View>
          </View>

          <View style={styles.separator} />

          <View style={styles.row}>
            <View style={styles.rowIcon}>
              <Ionicons name="star" size={18} color="#F4B400" />
            </View>

            <View style={styles.rowContent}>
              <Text style={styles.rowLabel}>Avaliação</Text>

              <Text style={styles.rowValue}>
                {hasRating
                  ? `${profile!.ratingAvg!.toFixed(1)} · ${profile!.ratingCount} avaliação${
                      profile!.ratingCount === 1 ? '' : 'ões'
                    }`
                  : 'Sem avaliações ainda'}
              </Text>
            </View>
          </View>

          {memberSince && (
            <>
              <View style={styles.separator} />

              <View style={styles.row}>
                <View style={styles.rowIcon}>
                  <Ionicons name="calendar-outline" size={18} color={theme.colors.primary} />
                </View>

                <View style={styles.rowContent}>
                  <Text style={styles.rowLabel}>No Bora Lá desde</Text>
                  <Text style={styles.rowValue}>{memberSince}</Text>
                </View>
              </View>
            </>
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={logout}>
          <Ionicons name="log-out-outline" size={18} color={theme.colors.danger} />
          <Text style={styles.buttonText}>Sair da conta</Text>
        </TouchableOpacity>
      </ScrollView>
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
    alignItems: 'center',
    ...theme.shadow.card
  },

  avatarText: {
    fontSize: 40,
    color: theme.colors.textOnAccent,
    fontFamily: theme.typography.fontFamily.bold
  },

  name: {
    marginTop: theme.spacing.md,
    fontSize: theme.typography.size.xl,
    color: theme.colors.textOnPrimary,
    fontFamily: theme.typography.fontFamily.bold
  },

  email: {
    marginTop: theme.spacing.xs,
    color: '#E8D8D0',
    fontSize: theme.typography.size.sm,
    fontFamily: theme.typography.fontFamily.regular
  },

  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    marginTop: theme.spacing.md,
    backgroundColor: theme.colors.accentLight,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radius.pill
  },

  roleBadgeText: {
    color: theme.colors.primary,
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.size.xs
  },

  card: {
    margin: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    paddingHorizontal: theme.spacing.lg,
    ...theme.shadow.card
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.lg
  },

  rowIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.accentLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md
  },

  rowContent: {
    flex: 1
  },

  rowLabel: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.size.xs,
    fontFamily: theme.typography.fontFamily.regular
  },

  rowValue: {
    marginTop: 2,
    color: theme.colors.textPrimary,
    fontSize: theme.typography.size.md,
    fontFamily: theme.typography.fontFamily.medium
  },

  separator: {
    height: 1,
    backgroundColor: theme.colors.border
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    marginHorizontal: theme.spacing.xl,
    marginBottom: theme.spacing.xxl,
    backgroundColor: theme.colors.surface,
    borderWidth: 1.5,
    borderColor: theme.colors.danger,
    padding: theme.spacing.md,
    borderRadius: theme.radius.pill
  },

  buttonText: {
    color: theme.colors.danger,
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.size.md
  }
});
