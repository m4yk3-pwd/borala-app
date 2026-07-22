import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import theme from '../../theme/Theme';
import {Ride} from '../../types/ride';

interface Props {
  ride: Ride;
  onPress?: () => void;
}

export default function RideCard({ride, onPress}: Props) {
  function formatTime(date: any) {
    if (!date) return '--:--';

    const value = date?.toDate ? date.toDate() : new Date(date);

    return value.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  function getRideStatus(status: string) {
    switch (status) {
      case 'ACTIVE':
        return {
          label: 'Ativa',
          style: styles.activeStatus
        };

      case 'FULL':
        return {
          label: 'Lotada',
          style: styles.fullStatus
        };

      case 'FINISHED':
        return {
          label: 'Finalizada',
          style: styles.finishedStatus
        };

      case 'CANCELLED':
        return {
          label: 'Cancelada',
          style: styles.cancelledStatus
        };

      default:
        return {
          label: status,
          style: styles.defaultStatus
        };
    }
  }

  const status = getRideStatus(ride.status);

  const availableSeats = ride.capacity - ride.approvedCount;

  return (
    <TouchableOpacity style={styles.rideCard} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.routeRow}>
        <View>
          <Text style={styles.routeLabel}>Saída</Text>

          <Text style={styles.routeValue}>{ride.origin.name}</Text>
        </View>

        <Text style={styles.arrow}>→</Text>

        <View>
          <Text style={styles.routeLabel}>Destino</Text>

          <Text style={styles.routeValue}>{ride.destination.name}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.info}>🕒 {formatTime(ride.departureAt)}</Text>

        <Text style={styles.info}>👥 {availableSeats} vagas</Text>

        <View style={styles.badges}>
          <View style={[styles.tag, ride.isFree ? styles.freeTag : styles.paidTag]}>
            <Text style={styles.tagText}>{ride.isFree ? 'Gratuita' : 'Paga'}</Text>
          </View>

          <View style={[styles.tag, status.style]}>
            <Text style={styles.tagText}>{status.label}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  badges: {
    marginLeft: 'auto',
    flexDirection: 'row',
    gap: theme.spacing.sm
  },

  activeStatus: {
    backgroundColor: '#DCFCE7'
  },

  fullStatus: {
    backgroundColor: '#FEF3C7'
  },

  finishedStatus: {
    backgroundColor: '#DBEAFE'
  },

  cancelledStatus: {
    backgroundColor: '#FEE2E2'
  },

  defaultStatus: {
    backgroundColor: theme.colors.border
  },
  rideCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    marginHorizontal: theme.spacing.xl,
    marginBottom: theme.spacing.md,
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
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.size.md
  },

  arrow: {
    color: theme.colors.accent,
    fontSize: 26
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

  tag: {
    marginLeft: 'auto',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radius.pill
  },

  freeTag: {
    backgroundColor: theme.colors.accentLight
  },

  paidTag: {
    backgroundColor: theme.colors.border
  },

  tagText: {
    color: theme.colors.primary,
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.size.sm
  }
});
