import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import OfferRideScreen from '../screens/OfferRideScreen';
import MyRidesScreen from '../screens/Myridesscreen';

import theme from '../theme/Theme';

export type MainTabParamList = {
  Home: undefined;
  Oferecer: undefined;
  MinhasCaronas: undefined;
  Notificações: undefined;
  Perfil: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          height: 70,
          backgroundColor: theme.colors.surface,
          borderTopWidth: 0,
          elevation: 10
        },

        tabBarActiveTintColor: theme.colors.accent,

        tabBarInactiveTintColor: theme.colors.textSecondary,

        tabBarLabelStyle: {
          fontFamily: theme.typography.fontFamily.medium,
          fontSize: 12
        }
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => <Ionicons name="home-outline" size={size} color={color} />
        }}
      />

      <Tab.Screen
        name="Oferecer"
        component={OfferRideScreen}
        options={{
          tabBarIcon: ({color, size}) => <Ionicons name="car-outline" size={size} color={color} />
        }}
      />

      <Tab.Screen
        name="MinhasCaronas"
        component={MyRidesScreen}
        options={{
          title: 'Minhas caronas',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="clipboard-outline" size={size} color={color} />
          )
        }}
      />

      <Tab.Screen
        name="Notificações"
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="notifications-outline" size={size} color={color} />
          )
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person-outline" size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
}
