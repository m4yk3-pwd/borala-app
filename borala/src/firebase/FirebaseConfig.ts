import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBeHIfuKfrQPdL60vst9zII1heBYymoObA',
  authDomain: 'bora-la-d7c42.firebaseapp.com',
  projectId: 'bora-la-d7c42',
  storageBucket: 'bora-la-d7c42.firebasestorage.app',
  messagingSenderId: '843483414454',
  appId: '1:843483414454:web:2c193237f9cfa5ce258b17',
};

// Evita reinicialização no Fast Refresh
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const auth: Auth = getAuth(app);

const db = getFirestore(app);

export { app, auth, db };