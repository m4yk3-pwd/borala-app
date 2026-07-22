import {
  addDoc,
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  where
} from 'firebase/firestore';

import {db, auth} from '../firebase/FirebaseConfig';
import {Booking, BookingStatus} from '../types/booking';
import {RideStatus} from '../types/ride';

function bookingsRef(rideId: string) {
  return collection(db, 'rides', rideId, 'bookings');
}

// Passageiro solicita uma vaga. Só cria o pedido como PENDING —
// a capacidade só é afetada quando o motorista aprova.
export async function createBooking(rideId: string) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  const rideRef = doc(db, 'rides', rideId);
  const rideSnap = await getDoc(rideRef);

  if (!rideSnap.exists()) {
    throw new Error('Carona não encontrada');
  }

  const ride = rideSnap.data();

  if (ride.driverId === user.uid) {
    throw new Error('Você não pode solicitar vaga na própria carona');
  }

  if (ride.status !== RideStatus.ACTIVE) {
    throw new Error('Esta carona não está mais disponível');
  }

  if (ride.approvedCount >= ride.capacity) {
    throw new Error('Não há mais vagas nessa carona');
  }

  const existing = await getMyBookingForRide(rideId);

  if (existing && [BookingStatus.PENDING, BookingStatus.APPROVED].includes(existing.status)) {
    throw new Error('Você já tem uma solicitação para esta carona');
  }

  await addDoc(bookingsRef(rideId), {
    passengerId: user.uid,

    passengerSnapshot: {
      name: user.displayName ?? '',
      photoUrl: user.photoURL ?? null
    },

    rideSnapshot: {
      origin: ride.origin,
      destination: ride.destination,
      departureAt: ride.departureAt,
      driverSnapshot: ride.driverSnapshot
    },

    status: BookingStatus.PENDING,
    createdAt: serverTimestamp()
  });
}

// Verifica se o usuário logado já tem uma reserva para essa carona
// (usado pra decidir o estado do botão "Solicitar vaga").
export async function getMyBookingForRide(rideId: string): Promise<Booking | null> {
  const user = auth.currentUser;

  if (!user) {
    return null;
  }

  const q = query(bookingsRef(rideId), where('passengerId', '==', user.uid));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  const docSnap = snapshot.docs[0];

  return {id: docSnap.id, ...docSnap.data()} as Booking;
}

// Todas as solicitações de uma carona (usado pelo motorista em "Minhas caronas").
export async function getRideBookings(rideId: string): Promise<Booking[]> {
  const q = query(bookingsRef(rideId), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => ({id: d.id, rideId, ...d.data()}) as Booking);
}

// Todas as reservas do usuário logado, em qualquer carona (aba "Minhas caronas" > passageiro).
// Precisa de collection group query porque "bookings" é subcoleção de cada carona.
export async function getMyBookings(): Promise<Booking[]> {
  const user = auth.currentUser;

  if (!user) {
    return [];
  }

  const q = query(
    collectionGroup(db, 'bookings'),
    where('passengerId', '==', user.uid),
    orderBy('createdAt', 'desc')
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(
    (d) =>
      ({
        id: d.id,
        rideId: d.ref.parent.parent!.id,
        ...d.data()
      }) as Booking
  );
}

// Aprovação: só acontece dentro de uma transação, porque precisa ler e
// atualizar approvedCount de forma atômica — é isso que garante que a
// carona nunca fica com mais reservas aprovadas do que a capacidade,
// mesmo se dois cliques de aprovação acontecerem ao mesmo tempo.
export async function approveBooking(rideId: string, bookingId: string) {
  const rideRef = doc(db, 'rides', rideId);
  const bookingRef = doc(db, 'rides', rideId, 'bookings', bookingId);

  await runTransaction(db, async (tx) => {
    const rideSnap = await tx.get(rideRef);
    const bookingSnap = await tx.get(bookingRef);

    if (!rideSnap.exists() || !bookingSnap.exists()) {
      throw new Error('Carona ou reserva não encontrada');
    }

    const ride = rideSnap.data();
    const booking = bookingSnap.data();

    if (booking.status !== BookingStatus.PENDING) {
      throw new Error('Esta solicitação já foi respondida');
    }

    if (ride.approvedCount >= ride.capacity) {
      throw new Error('A carona já está lotada');
    }

    tx.update(rideRef, {approvedCount: ride.approvedCount + 1});
    tx.update(bookingRef, {status: BookingStatus.APPROVED});
  });
}

export async function rejectBooking(rideId: string, bookingId: string) {
  const bookingRef = doc(db, 'rides', rideId, 'bookings', bookingId);

  await runTransaction(db, async (tx) => {
    const bookingSnap = await tx.get(bookingRef);

    if (!bookingSnap.exists()) {
      throw new Error('Reserva não encontrada');
    }

    if (bookingSnap.data().status !== BookingStatus.PENDING) {
      throw new Error('Esta solicitação já foi respondida');
    }

    tx.update(bookingRef, {status: BookingStatus.REJECTED});
  });
}

// Cancelamento — usado tanto pelo passageiro (desiste da vaga) quanto,
// no futuro, pelo motorista ao cancelar a carona toda. Se a reserva já
// estava APPROVED, libera a vaga decrementando approvedCount.
export async function cancelBooking(rideId: string, bookingId: string) {
  const rideRef = doc(db, 'rides', rideId);
  const bookingRef = doc(db, 'rides', rideId, 'bookings', bookingId);

  await runTransaction(db, async (tx) => {
    const rideSnap = await tx.get(rideRef);
    const bookingSnap = await tx.get(bookingRef);

    if (!rideSnap.exists() || !bookingSnap.exists()) {
      throw new Error('Carona ou reserva não encontrada');
    }

    const ride = rideSnap.data();
    const booking = bookingSnap.data();

    if (booking.status === BookingStatus.APPROVED) {
      tx.update(rideRef, {approvedCount: Math.max(0, ride.approvedCount - 1)});
    }

    tx.update(bookingRef, {status: BookingStatus.CANCELLED});
  });
}
