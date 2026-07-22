import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import theme from '../theme/Theme';
import {Ride} from '../types/ride';
import {getRideById} from '../services/rideService';
import {styles} from '../screens/RideDetailScreenStyles';
interface Props {
  route: any;
  navigation: any;
}

export default function RideDetailScreen({route, navigation}: Props) {
  const {rideId} = route.params;

  const [ride, setRide] = useState<Ride | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRide() {
      const result = await getRideById(rideId);
      setRide(result);
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


          {ride.observations ? (
            <View style={styles.vehicleCard}>
              <Text style={styles.smallTitle}>Observações</Text>

              <Text style={styles.vehicleText}>{ride.observations}</Text>
            </View>
          ) : null}

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Solicitar vaga</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
