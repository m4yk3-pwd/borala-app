export enum BookingStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED'
}

export interface PassengerSnapshot {
  name: string;
  photoUrl: string | null;
}

export interface RideSnapshotForBooking {
  origin: {name: string};
  destination: {name: string};
  departureAt: any;
  driverSnapshot: {name: string};
}

export interface Booking {
  id: string;
  rideId: string;
  passengerId: string;
  passengerSnapshot: PassengerSnapshot;
  rideSnapshot: RideSnapshotForBooking;
  status: BookingStatus;
  createdAt: any;
}
