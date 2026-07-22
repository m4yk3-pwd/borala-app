import React from 'react';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import theme from '../../theme/Theme';

interface Props {
  title: string;

  description: string;

  buttonText?: string;

  onPress?: () => void;
}

export default function EmptyState({
  title,

  description,

  buttonText,

  onPress
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>🚗</Text>
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

  icon: {
    fontSize: 36
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
