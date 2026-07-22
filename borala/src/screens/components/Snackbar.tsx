import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';

import theme from '../../theme/Theme';

interface Props {
  visible: boolean;
  message: string;
  type?: 'success' | 'error';
  duration?: number;
}

export default function Snackbar({visible, message, type = 'success', duration = 3000}: Props) {
  const translateY = new Animated.Value(100);
  const opacity = new Animated.Value(0);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true
        }),

        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        })
      ]).start();

      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: 100,
            duration: 300,
            useNativeDriver: true
          }),

          Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
          })
        ]).start();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        type === 'success' ? styles.success : styles.error,

        {
          transform: [
            {
              translateY
            }
          ],

          opacity
        }
      ]}
    >
      <View style={styles.dot} />

      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',

    bottom: 30,

    left: theme.spacing.xl,

    right: theme.spacing.xl,

    flexDirection: 'row',

    alignItems: 'center',

    padding: theme.spacing.lg,

    borderRadius: theme.radius.lg,

    ...theme.shadow.card
  },

  success: {
    backgroundColor: theme.colors.success
  },

  error: {
    backgroundColor: theme.colors.danger
  },

  dot: {
    width: 10,

    height: 10,

    borderRadius: 5,

    backgroundColor: '#fff',

    marginRight: theme.spacing.md
  },

  message: {
    color: '#fff',

    fontSize: theme.typography.size.md,

    fontFamily: theme.typography.fontFamily.medium
  }
});
