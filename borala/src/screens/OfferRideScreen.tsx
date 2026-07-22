import React, {useState} from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView
} from 'react-native';
import Snackbar from '../screens/components/Snackbar';
import theme from '../theme/Theme';
import {useAuth} from '../contexts/AuthContext';
import {createRide} from '../services/rideService';

export default function OfferRideScreen() {
  const {profile} = useAuth();
  const [snackbar, setSnackbar] = useState(false);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [meeting, setMeeting] = useState('');
  const [capacity, setCapacity] = useState('');

  
  async function handleCreate() {
    await createRide({
      origin: {
        name: origin,
        lat: 0,
        lng: 0
      },
      destination: {
        name: destination,
        lat: 0,
        lng: 0
      },
      meetingPoint: {
        name: meeting,
        lat: 0,
        lng: 0
      },
      departureAt: new Date(),
      capacity: Number(capacity),
      isFree: true,
      isRecurring: false,
      observations: '',
      vehicleSnapshot: {
        brand: '',
        model: '',
        color: '',
        capacity: Number(capacity)
      }
    });

    setOrigin('');
    setDestination('');
    setMeeting('');
    setCapacity('');

    setSnackbar(true);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Olá, {profile?.name?.split(' ')[0] ?? 'usuário'}</Text>

            <Text style={styles.headerSubtitle}>Ofereça uma carona hoje</Text>
          </View>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{profile?.name?.charAt(0).toUpperCase() ?? 'U'}</Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Oferecer carona</Text>

          <Text style={styles.subtitle}>Informe os detalhes do trajeto</Text>

          <View style={styles.card}>
            <Input
              label="Origem"
              placeholder="Ex: Belo Horizonte"
              value={origin}
              onChangeText={setOrigin}
            />

            <Input
              label="Destino"
              placeholder="Ex: Sabará"
              value={destination}
              onChangeText={setDestination}
            />

            <Input
              label="Ponto de encontro"
              placeholder="Ex: Praça da Estação"
              value={meeting}
              onChangeText={setMeeting}
            />

            <Input
              label="Quantidade de vagas"
              placeholder="Ex: 3"
              keyboardType="numeric"
              value={capacity}
              onChangeText={setCapacity}
            />

            <TouchableOpacity style={styles.button} onPress={handleCreate}>
              <Text style={styles.buttonText}>Criar carona</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Snackbar visible={snackbar} message="Carona criada com sucesso!" type="success" />
    </SafeAreaView>
  );
}

function Input(props: any) {
  return (
    <View>
      <Text style={styles.label}>{props.label}</Text>

      <TextInput
        style={styles.input}
        placeholderTextColor={theme.colors.textSecondary}
        {...props}
      />
    </View>
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

  greeting: {
    color: theme.colors.textOnPrimary,
    fontSize: theme.typography.size.xl,
    fontFamily: theme.typography.fontFamily.bold
  },

  headerSubtitle: {
    marginTop: theme.spacing.xs,
    color: '#E8D8D0',
    fontSize: theme.typography.size.md
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

  content: {
    padding: theme.spacing.xl
  },

  title: {
    fontSize: theme.typography.size.xxl,
    color: theme.colors.primary,
    fontFamily: theme.typography.fontFamily.bold
  },

  subtitle: {
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.lg,
    color: theme.colors.textSecondary
  },

  card: {
    backgroundColor: theme.colors.surface,

    borderRadius: theme.radius.lg,

    padding: theme.spacing.xl,

    ...theme.shadow.card
  },

  label: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs,

    color: theme.colors.textPrimary,

    fontFamily: theme.typography.fontFamily.medium,

    fontSize: theme.typography.size.sm
  },

  input: {
    backgroundColor: theme.colors.background,

    borderWidth: 1,

    borderColor: theme.colors.border,

    borderRadius: theme.radius.md,

    paddingHorizontal: theme.spacing.md,

    paddingVertical: theme.spacing.md,

    color: theme.colors.textPrimary,

    fontFamily: theme.typography.fontFamily.regular
  },

  button: {
    marginTop: theme.spacing.xl,

    backgroundColor: theme.colors.accent,

    paddingVertical: theme.spacing.md,

    borderRadius: theme.radius.pill,

    alignItems: 'center'
  },

  buttonText: {
    color: theme.colors.textOnAccent,

    fontSize: theme.typography.size.md,

    fontFamily: theme.typography.fontFamily.bold
  }
});
