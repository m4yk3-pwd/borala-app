import React from 'react';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import type {ComponentProps} from 'react';

import theme from '../../theme/Theme';

type IconName = ComponentProps<typeof Ionicons>['name'];

interface Props {
  title: string;

  description: string;

  buttonText?: string;

  onPress?: () => void;

  // Permite escolher um ícone mais adequado ao contexto (ex.: "search-outline"
  // pra "nenhuma carona encontrada", "clipboard-outline" pra "nenhuma solicitação").
  // Se não passar nada, usa "car-outline".
  icon?: IconName;
}

export default function EmptyState({
  title,

  description,

  buttonText,

  onPress,

  icon = 'car-outline'
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={36} color={theme.colors.accent} />
      </View>

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.description}>{description}</Text>

      {buttonText && (
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',

    justifyContent: 'center',

    paddingVertical: theme.spacing.xxxl,

    paddingHorizontal: theme.spacing.xl
  },

  iconContainer: {
    width: 80,

    height: 80,

    borderRadius: 40,

    backgroundColor: theme.colors.accentLight,

    alignItems: 'center',

    justifyContent: 'center',

    marginBottom: theme.spacing.lg
  },

  title: {
    color: theme.colors.textPrimary,

    fontSize: theme.typography.size.lg,

    fontFamily: theme.typography.fontFamily.bold,

    textAlign: 'center'
  },

  description: {
    marginTop: theme.spacing.sm,

    color: theme.colors.textSecondary,

    fontSize: theme.typography.size.md,

    fontFamily: theme.typography.fontFamily.regular,

    textAlign: 'center',

    lineHeight: 22
  },

  button: {
    marginTop: theme.spacing.xl,

    backgroundColor: theme.colors.accent,

    paddingHorizontal: theme.spacing.xl,

    paddingVertical: theme.spacing.md,

    borderRadius: theme.radius.pill
  },

  buttonText: {
    color: theme.colors.textOnAccent,

    fontFamily: theme.typography.fontFamily.bold,

    fontSize: theme.typography.size.md
  }
});
