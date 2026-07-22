export enum RideStatus {
  ACTIVE = 'ACTIVE',
  CANCELLED = 'CANCELLED',
  FINISHED = 'FINISHED'
}

export interface LocationPoint {
  name: string;
  lat: number;
  lng: number;
}

export interface DriverSnapshot {
  name: string;
  photoUrl: string | null;
  ratingAvg: number | null;
}

export interface VehicleSnapshot {
  brand: string;
  model: string;
  color: string;
  capacity: number;
}

export interface CreateRideInput {
  origin: LocationPoint;

  destination: LocationPoint;

  meetingPoint: LocationPoint;

  departureAt: Date;

  capacity: number;

  isFree: boolean;

  isRecurring: boolean;

  observations?: string;

  vehicleSnapshot: VehicleSnapshot;
}

export interface Ride extends CreateRideInput {
  id: string;

  driverId: string;

  driverSnapshot: DriverSnapshot;

  approvedCount: number;

  status: RideStatus;

  createdAt: Date;
}
