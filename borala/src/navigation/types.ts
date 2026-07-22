import {Ride} from '../types/ride';

export type MainTabParamList = {
  Home: undefined;
  Oferecer: undefined;
  MinhasCaronas: undefined;
  Notificações: undefined;
  Perfil: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  MainTabs: undefined;
  RideDetails: {
    rideId: string;
  };
};
