import React, {useCallback, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import theme from '../theme/Theme';
import {useAuth} from '../contexts/AuthContext';
import {Ride} from '../types/ride';
import {getRides} from '../services/rideService';
import RideCard from '../screens/components/RideCard';
import EmptyState from './components/EmptyState';
import {CompositeNavigationProp, useFocusEffect, useNavigation} from '@react-navigation/native';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

import {MainTabParamList} from '../navigation/MainTabs';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';
type NavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList>,
  NativeStackNavigationProp<RootStackParamList>
>;
export default function HomeScreen() {
  const {profile} = useAuth();
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProps>();

  async function loadRides() {
    try {
      const result = await getRides();

      setRides(result.rides);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadRides();
    }, [])
  );

  const renderRidesContent = () => {
    if (loading) {
      return <Text style={styles.loading}>Carregando caronas...</Text>;
    }

    if (rides.length > 0) {
      return rides.map((ride) => (
        <RideCard
          key={ride.id}
          ride={ride}
          onPress={() =>
            navigation.navigate('RideDetails', {
              rideId: ride.id
            })
          }
        />
      ));
    }

    return (
      <EmptyState
        title="Nenhuma carona encontrada"
        description="Ainda não existem caronas disponíveis."
        buttonText="Oferecer carona"
        onPress={() => {
          navigation.navigate('Oferecer');
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Olá, {profile?.name?.split(' ')[0] ?? 'usuário'}</Text>

            <Text style={styles.headerSubtitle}>Para onde vamos hoje?</Text>
          </View>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{profile?.name?.charAt(0).toUpperCase() ?? 'U'}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Próximas caronas</Text>

        {renderRidesContent()}
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
    padding: theme.spacing.xl,
    paddingTop: theme.spacing.xxxl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: theme.radius.xl,
    borderBottomRightRadius: theme.radius.xl
  },
  loading: {
    textAlign: 'center',
    marginTop: theme.spacing.lg,
    color: theme.colors.textSecondary,
    fontSize: theme.typography.size.md,
    fontFamily: theme.typography.fontFamily.medium
  },

  greeting: {
    color: theme.colors.textOnPrimary,
    fontSize: theme.typography.size.xl,
    fontFamily: theme.typography.fontFamily.bold
  },

  headerSubtitle: {
    marginTop: theme.spacing.xs,
    color: '#E8D8D0',
    fontSize: theme.typography.size.md,
    fontFamily: theme.typography.fontFamily.regular
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.accent,
    alignItems: 'center',
    justifyContent: 'center'
  },

  avatarText: {
    color: theme.colors.textOnAccent,
    fontSize: theme.typography.size.lg,
    fontFamily: theme.typography.fontFamily.bold
  },

  searchCard: {
    margin: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    ...theme.shadow.card
  },

  searchIcon: {
    fontSize: 28,
    marginRight: theme.spacing.md
  },

  searchTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.size.lg,
    fontFamily: theme.typography.fontFamily.bold
  },

  searchSubtitle: {
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
    fontSize: theme.typography.size.sm
  },

  sectionTitle: {
    marginHorizontal: theme.spacing.xl,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    color: theme.colors.textPrimary,
    fontSize: theme.typography.size.lg,
    fontFamily: theme.typography.fontFamily.bold
  },

  actionsContainer: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl
  },

  actionCard: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    ...theme.shadow.card
  },

  actionIcon: {
    fontSize: 28,
    marginBottom: theme.spacing.md
  },

  actionTitle: {
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.size.md
  },

  actionSubtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.size.sm,
    marginTop: theme.spacing.xs
  },

  rideCard: {
    marginHorizontal: theme.spacing.xl,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    ...theme.shadow.card
  },

  routeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  routeLabel: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.size.sm
  },

  routeValue: {
    marginTop: theme.spacing.xs,
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily.bold
  },

  arrow: {
    color: theme.colors.accent,
    fontSize: 24
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md
  },

  info: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.size.sm
  },

  freeTag: {
    marginLeft: 'auto',
    backgroundColor: theme.colors.accentLight,
    color: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radius.pill,
    fontSize: theme.typography.size.sm,
    fontFamily: theme.typography.fontFamily.bold
  },

  mainButton: {
    margin: theme.spacing.xl,
    marginTop: theme.spacing.xxl,
    backgroundColor: theme.colors.accent,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    borderRadius: theme.radius.pill
  },

  mainButtonText: {
    color: theme.colors.textOnAccent,
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.size.md
  }
});
