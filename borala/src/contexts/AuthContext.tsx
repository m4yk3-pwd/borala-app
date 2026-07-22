// src/contexts/AuthContext.tsx
import React, {createContext, useContext, useEffect, useState} from 'react';
import {onAuthStateChanged, User as FirebaseUser} from 'firebase/auth';
import {auth} from '../firebase/FirebaseConfig';
import {UserProfile, SignUpInput, LoginInput} from '../types/user';
import * as authService from '../services/authService';

interface AuthContextValue {
  firebaseUser: FirebaseUser | null;
  profile: UserProfile | null;
  initializing: boolean; // true enquanto checa se já existe sessão salva
  signUp: (input: SignUpInput) => Promise<void>;
  login: (input: LoginInput) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({children}: {children: React.ReactNode}) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      if (user) {
        const userProfile = await authService.fetchUserProfile(user.uid);
        setProfile(userProfile);
      } else {
        setProfile(null);
      }
      setInitializing(false);
    });

    return unsubscribe;
  }, []);

  async function handleSignUp(input: SignUpInput) {
    const userProfile = await authService.signUp(input);
    setProfile(userProfile);
  }

  async function handleLogin(input: LoginInput) {
    const userProfile = await authService.login(input);
    setProfile(userProfile);
  }

  async function handleLogout() {
    await authService.logout();

    setFirebaseUser(null);
    setProfile(null);
  }

  return (
    <AuthContext.Provider
      value={{
        firebaseUser,
        profile,
        initializing,
        signUp: handleSignUp,
        login: handleLogin,
        logout: handleLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth precisa ser usado dentro de um <AuthProvider>');
  }
  return context;
}
