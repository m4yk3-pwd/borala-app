import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import theme from '../theme/Theme';
import {Ride} from '../types/ride';
import {Booking, BookingStatus} from '../types/booking';
import {getRideById} from '../services/rideService';
import {createBooking, getMyBookingForRide} from '../services/bookingservice';
import {useAuth} from '../contexts/AuthContext';
import {styles} from '../screens/RideDetailScreenStyles';
interface Props {
  route: any;
  navigation: any;
}

export default function RideDetailScreen({route, navigation}: Props) {
  const {rideId} = route.params;
  const {firebaseUser} = useAuth();

  const [ride, setRide] = useState<Ride | null>(null);
  const [myBooking, setMyBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [requesting, setRequesting] = useState(false);

  useEffect(() => {
    async function loadRide() {
      const result = await getRideById(rideId);
      setRide(result);

      // Se o usuário não é o dono da carona, verifica se ele já tem
      // uma solicitação pra ela (pra já mostrar o botão no estado certo).
      if (result && result.driverId !== firebaseUser?.uid) {
        const existing = await getMyBookingForRide(rideId);
        setMyBooking(existing);
      }

      setLoading(false);
    }

    loadRide();
  }, [rideId]);

  function toDate(date: any): Date {
    return date?.toDate ? date.toDate() : new Date(date);
  }

  function formatDate(date: any) {
    const value = toDate(date);

    return value.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  function formatTime(date: any) {
    const value = toDate(date);

    return value.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  async function handleRequestRide() {
    setRequesting(true);

    try {
      await createBooking(rideId);


      setMyBooking({
        id: 'pending-local',
        rideId,
        passengerId: firebaseUser?.uid ?? '',
        passengerSnapshot: {
          name: firebaseUser?.displayName ?? '',
          photoUrl: firebaseUser?.photoURL ?? null
        },
        rideSnapshot: {} as any,
        status: BookingStatus.PENDING,
        createdAt: new Date()
      });

      Alert.alert('Solicitação enviada', 'Aguarde a aprovação do motorista em "Minhas caronas".');
    } catch (error: any) {
      Alert.alert('Não foi possível solicitar', error.message ?? 'Tente novamente.');
    } finally {
      setRequesting(false);
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={theme.colors.accent} style={{marginTop: 60}} />
      </SafeAreaView>
    );
  }

  if (!ride) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{textAlign: 'center', marginTop: 40}}>Carona não encontrada.</Text>
      </SafeAreaView>
    );
  }

  const initials = ride.driverSnapshot.name
    ?.split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  function getStatusLabel(status: string) {
    switch (status) {
      case 'ACTIVE':
        return 'Ativa';

      case 'IN_PROGRESS':
        return 'Em andamento';

      case 'COMPLETED':
        return 'Concluída';

      case 'CANCELLED':
        return 'Cancelada';

      default:
        return status;
    }
  }

  const isOwner = ride.driverId === firebaseUser?.uid;
  const isFull = ride.approvedCount >= ride.capacity;
  const isRideClosed = ride.status !== 'ACTIVE';

  function getButtonState() {
    if (myBooking?.status === BookingStatus.PENDING) {
      return {label: 'Solicitação enviada', disabled: true};
    }

    if (myBooking?.status === BookingStatus.APPROVED) {
      return {label: 'Vaga confirmada', disabled: true};
    }

    if (isRideClosed) {
      return {label: 'Carona indisponível', disabled: true};
    }

    if (isFull) {
      return {label: 'Carona lotada', disabled: true};
    }

    return {label: 'Solicitar vaga', disabled: false};
  }

  const buttonState = getButtonState();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}

        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={theme.colors.textOnPrimary} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Detalhes da carona</Text>

          <View style={styles.routeContainer}>
            <View style={styles.routeItem}>
              <View style={styles.originDot} />

              <Text style={styles.routeText}>{ride.origin.name}</Text>
            </View>

            <View style={styles.routeLine} />

            <View style={styles.routeItem}>
              <View style={styles.destinationDot} />

              <Text style={styles.routeText}>{ride.destination.name}</Text>
            </View>
          </View>
        </View>

        <View style={styles.mainCard}>
          <View style={styles.driverRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>

            <View style={{flex: 1}}>
              <Text style={styles.driverName}>{ride.driverSnapshot.name}</Text>

              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#F4B400" />

                <Text style={styles.driverRating}>{ride.driverSnapshot.ratingAvg ?? ' Novo'}</Text>
              </View>
              <Text style={styles.status}>Status: {getStatusLabel(ride.status)}</Text>
            </View>

            <View style={styles.badge}>
              <Text style={styles.badgeText}>{ride.isFree ? 'Gratuita' : 'Paga'}</Text>
            </View>
          </View>

          <View style={styles.separator} />

          {/* DATA + VAGAS */}

          <View style={styles.infoRow}>
            <View style={styles.smallCard}>
              <Text style={styles.smallTitle}>Data e hora</Text>

              <Text style={styles.smallValue}>{formatDate(ride.departureAt)}</Text>

              <Text style={styles.smallValueOrange}>{formatTime(ride.departureAt)}</Text>
            </View>

            <View style={styles.smallCard}>
              <Text style={styles.smallTitle}>Vagas</Text>

              <Text style={styles.smallValueOrange}>
                {ride.approvedCount} de {ride.capacity} ocupadas
              </Text>
            </View>
          </View>

          {/* VEÍCULO */}

          <View style={styles.vehicleCard}>
            <Text style={styles.smallTitle}>Veículo</Text>

            <Text style={styles.vehicleText}>
              {ride.vehicleSnapshot.brand || 'Não informado'} {ride.vehicleSnapshot.model}
            </Text>

            {ride.vehicleSnapshot.color ? (
              <Text style={styles.vehicleColor}>Cor: {ride.vehicleSnapshot.color}</Text>
            ) : null}
          </View>

          {/* PONTO */}

          <View style={styles.vehicleCard}>
            <Text style={styles.smallTitle}>Ponto de encontro</Text>

            <Text style={styles.vehicleText}>{ride.meetingPoint.name}</Text>
          </View>

          {/* OBS */}

          {ride.observations ? (
            <View style={styles.vehicleCard}>
              <Text style={styles.smallTitle}>Observações</Text>

              <Text style={styles.vehicleText}>{ride.observations}</Text>
            </View>
          ) : null}

          {isOwner ? (
            <View style={styles.vehicleCard}>
              <Text style={styles.vehicleText}>
                Esta é a sua carona. Veja as solicitações em "Minhas caronas".
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              style={[styles.button, buttonState.disabled && {opacity: 0.5}]}
              disabled={buttonState.disabled || requesting}
              onPress={handleRequestRide}
            >
              {requesting ? (
                <ActivityIndicator color={theme.colors.textOnAccent} />
              ) : (
                <Text style={styles.buttonText}>{buttonState.label}</Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
