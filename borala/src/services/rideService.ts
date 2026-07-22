import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  where,
  limit,
  getDocs,
  getDoc,
  doc,
  startAfter,
  QueryDocumentSnapshot,
  DocumentData
} from 'firebase/firestore';

import {db, auth} from '../firebase/FirebaseConfig';

import {CreateRideInput, Ride, RideStatus} from '../types/ride';

const PAGE_SIZE = 10;

export async function createRide(data: CreateRideInput) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  const ride = {
    driverId: user.uid,

    driverSnapshot: {
      name: user.displayName ?? '',
      photoUrl: user.photoURL ?? null,
      ratingAvg: null
    },

    origin: data.origin,
    destination: data.destination,
    meetingPoint: data.meetingPoint,
    departureAt: data.departureAt,
    capacity: data.capacity,
    approvedCount: 0,
    isFree: data.isFree,
    isRecurring: data.isRecurring,
    observations: data.observations ?? '',
    vehicleSnapshot: data.vehicleSnapshot,
    status: RideStatus.ACTIVE,
    createdAt: serverTimestamp()
  };

  const ref = await addDoc(collection(db, 'rides'), ride);

  return ref.id;
}

export async function getRides(lastDoc?: QueryDocumentSnapshot<DocumentData>) {
  const ridesRef = collection(db, 'rides');

  let q;

  if (lastDoc) {
    q = query(ridesRef, orderBy('createdAt', 'desc'), startAfter(lastDoc), limit(PAGE_SIZE));
  } else {
    q = query(ridesRef, orderBy('createdAt', 'desc'), limit(PAGE_SIZE));
  }

  const snapshot = await getDocs(q);

  const rides: Ride[] = snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,

        ...doc.data()
      }) as Ride
  );

  return {
    rides,

    lastDoc: snapshot.docs[snapshot.docs.length - 1] ?? null
  };
}

export async function getRideById(id: string): Promise<Ride | null> {
  const docRef = doc(db, 'rides', id);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data()
  } as Ride;
}

// Caronas oferecidas pelo usuário logado — usado na aba "Minhas caronas" > motorista,
// para ele ver e gerenciar as solicitações de cada uma.
export async function getMyRides(): Promise<Ride[]> {
  const user = auth.currentUser;

  if (!user) {
    return [];
  }

  const q = query(
    collection(db, 'rides'),
    where('driverId', '==', user.uid),
    orderBy('createdAt', 'desc')
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}) as Ride);
}
