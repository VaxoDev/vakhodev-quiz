import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCXOnJaQLKzZLXQEkSWMmrQwlpQGhBi0Xg",
  authDomain: "quiz-7f57c.firebaseapp.com",
  projectId: "quiz-7f57c",
  storageBucket: "quiz-7f57c.firebasestorage.app",
  messagingSenderId: "337326155270",
  appId: "1:337326155270:web:908ca5a5729e6134a6c587"
};

// Initialize Firebase only if it hasn't been initialized yet
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);