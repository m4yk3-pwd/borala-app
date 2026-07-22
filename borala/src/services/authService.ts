import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/FirebaseConfig';
import { SignUpInput, LoginInput, UserProfile, UserRole, UserStatus } from '../types/user';
 
export async function signUp({ name, email, phone, password }: SignUpInput): Promise<UserProfile> {
  const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
  const { user } = credential;
 
  await updateProfile(user, { displayName: name.trim() });
 
  const now = Date.now();
  const profile: UserProfile = {
    id: user.uid,
    name: name.trim(),
    email: email.trim(),
    ratingAvg: null,
    ratingCount: 0,
    phone: phone.trim(),
    photoUrl: null,
    status: UserStatus.ACTIVE,
    roles: [UserRole.PASSENGER],
    createdAt: now,
    updatedAt: now,
  };
 
  await setDoc(doc(db, 'users', user.uid), profile);
 
  return profile;
}
 
export async function login({ email, password }: LoginInput): Promise<UserProfile | null> {
  const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
  return fetchUserProfile(credential.user.uid);
}
 
export async function logout(): Promise<void> {
  await signOut(auth);
}
 
export async function fetchUserProfile(uid: string): Promise<UserProfile | null> {
  const snapshot = await getDoc(doc(db, 'users', uid));
  if (!snapshot.exists()) return null;
  return snapshot.data() as UserProfile;
}
 