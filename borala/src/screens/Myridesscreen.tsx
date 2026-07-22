import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  ActivityIndicator
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Ionicons} from '@expo/vector-icons';

import theme from '../theme/Theme';
import {Ride} from '../types/ride';
import {Booking, BookingStatus} from '../types/booking';
import {getMyRides} from '../services/rideService';
import {getRideBookings, approveBooking, rejectBooking} from '../services/bookingservice';
import EmptyState from './components/EmptyState';
import {styles} from './Myridesscreenstyles';

function toDate(date: any): Date {
  return date?.toDate ? date.toDate() : new Date(date);
}

function formatDateTime(date: any) {
  const value = toDate(date);

  return (
    value.toLocaleDateString('pt-BR', {day: '2-digit', month: '2-digit'}) +
    ' · ' +
    value.toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'})
  );
}

export default function MyRidesScreen() {
  const navigation = useNavigation<any>();

  const [loading, setLoading] = useState(true);
  const [myRides, setMyRides] = useState<Ride[]>([]);

  const [expandedRideId, setExpandedRideId] = useState<string | null>(null);
  const [requestsByRide, setRequestsByRide] = useState<Record<string, Booking[]>>({});
  const [loadingRequests, setLoadingRequests] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);

    try {
      const result = await getMyRides();
      setMyRides(result);
      setExpandedRideId(null);
      setRequestsByRide({});
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  async function toggleRequests(rideId: string) {
    if (expandedRideId === rideId) {
      setExpandedRideId(null);
      return;
    }

    setExpandedRideId(rideId);

    if (!requestsByRide[rideId]) {
      setLoadingRequests(rideId);

      try {
        const bookings = await getRideBookings(rideId);
        setRequestsByRide((prev) => ({...prev, [rideId]: bookings}));
      } catch (error: any) {
        Alert.alert('Erro', error.message ?? 'Não foi possível carregar as solicitações.');
      } finally {
        setLoadingRequests(null);
      }
    }
  }

  async function handleApprove(ride: Ride, booking: Booking) {
    try {
      await approveBooking(ride.id, booking.id);

      const bookings = await getRideBookings(ride.id);
      setRequestsByRide((prev) => ({...prev, [ride.id]: bookings}));

      setMyRides((prev) =>
        prev.map((r) => (r.id === ride.id ? {...r, approvedCount: r.approvedCount + 1} : r))
      );
    } catch (error: any) {
      Alert.alert('Não foi possível aprovar', error.message ?? 'Tente novamente.');
    }
  }

  async function handleReject(ride: Ride, booking: Booking) {
    try {
      await rejectBooking(ride.id, booking.id);

      const bookings = await getRideBookings(ride.id);
      setRequestsByRide((prev) => ({...prev, [ride.id]: bookings}));
    } catch (error: any) {
      Alert.alert('Não foi possível rejeitar', error.message ?? 'Tente novamente.');
    }
  }

  function renderContent() {
    if (myRides.length === 0) {
      return (
        <EmptyState
          title="Você ainda não ofereceu caronas"
          description='Crie uma carona na aba "Oferecer" para vê-la aqui.'
          buttonText="Oferecer carona"
          onPress={() => navigation.navigate('Oferecer')}
        />
      );
    }

    return myRides.map((ride) => {
      const isExpanded = expandedRideId === ride.id;
      const requests = requestsByRide[ride.id] ?? [];
      const pending = requests.filter((b) => b.status === BookingStatus.PENDING);

      return (
        <View key={ride.id} style={styles.card}>
          <TouchableOpacity onPress={() => toggleRequests(ride.id)}>
            <View style={styles.cardHeader}>
              <Text style={styles.route}>
                {ride.origin.name} → {ride.destination.name}
              </Text>

              <Ionicons
                name={isExpanded ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={theme.colors.textSecondary}
              />
            </View>

            <Text style={styles.meta}>{formatDateTime(ride.departureAt)}</Text>

            <Text style={styles.metaOrange}>
              {ride.approvedCount} de {ride.capacity} vagas ocupadas
            </Text>
          </TouchableOpacity>

          {isExpanded && (
            <View style={styles.requestsContainer}>
              {loadingRequests === ride.id ? (
                <ActivityIndicator
                  color={theme.colors.accent}
                  style={{marginVertical: theme.spacing.md}}
                />
              ) : pending.length === 0 ? (
                <Text style={styles.emptyRequests}>Nenhuma solicitação pendente.</Text>
              ) : (
                pending.map((booking) => (
                  <View key={booking.id} style={styles.requestRow}>
                    <Text style={styles.requestName}>{booking.passengerSnapshot.name}</Text>

                    <View style={styles.requestActions}>
                      <TouchableOpacity
                        style={styles.rejectButton}
                        onPress={() => handleReject(ride, booking)}
                      >
                        <Text style={styles.rejectButtonText}>Rejeitar</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.approveButton}
                        onPress={() => handleApprove(ride, booking)}
                      >
                        <Text style={styles.approveButtonText}>Aceitar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              )}
            </View>
          )}
        </View>
      );
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Minhas caronas oferecidas</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.accent} style={{marginTop: 40}} />
        ) : (
          renderContent()
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
