import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, FlatList} from 'react-native';

import theme from '../theme/Theme';

const notifications = [
  {
    id: '1',
    title: 'Sua carona foi aceita',
    message: 'João confirmou sua vaga.'
  },
  {
    id: '2',
    title: 'Nova carona próxima',
    message: 'Existe uma carona disponível para BH.'
  }
];

export default function NotificationsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notificações</Text>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          padding: theme.spacing.xl
        }}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>

            <Text style={styles.message}>{item.message}</Text>
          </View>
        )}
      />
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
    padding: theme.spacing.xl,
    paddingTop: theme.spacing.xxxl,
    borderBottomLeftRadius: theme.radius.xl,
    borderBottomRightRadius: theme.radius.xl
  },

  title: {
    color: theme.colors.textOnPrimary,
    fontSize: theme.typography.size.xxl,
    fontFamily: theme.typography.fontFamily.bold
  },

  card: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    borderRadius: theme.radius.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadow.card
  },

  cardTitle: {
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.size.md
  },

  message: {
    marginTop: theme.spacing.xs,
    color: theme.colors.textSecondary
  }
});
