export enum UserRole {
  DRIVER = 'DRIVER',
  ADMIN = 'ADMIN',
  PASSENGER = 'PASSENGER',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  BLOCKED = 'BLOCKED',
}

export enum RideStatus {
  ACTIVE = 'ACTIVE',
  CANCELLED = 'CANCELLED',
  FINISHED = 'FINISHED',
}
 

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    phone: string;
    photoUrl: string | null;
    ratingAvg: number | null;
    ratingCount: number | null;
    status: UserStatus;
    roles: UserRole[];
    createdAt: number;
    updatedAt: number;
}
 
export interface SignUpInput {
  name: string;
  email: string;
  phone: string;
  password: string;
}
 
export interface LoginInput {
  email: string;
  password: string;
}
 