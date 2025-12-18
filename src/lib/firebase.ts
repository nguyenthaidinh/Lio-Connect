// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ⬅ thêm Firestore
import { getStorage } from "firebase/storage"; // ⬅ thêm Storage

// ❗️Không import analytics ở đây

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Singleton cho Next.js (đỡ tạo nhiều instance)
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
console.log("FIREBASE PROJECT:", app.options.projectId);

// Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

// 🔥 ADD FIRESTORE & STORAGE
export const db = getFirestore(app);       // <--- Đây chính là "db" cần dùng
export const storage = getStorage(app);    // <--- Dùng để upload ảnh bài viết

/**
 * Analytics client-only
 */
export async function initAnalytics() {
  if (typeof window === "undefined") return null;
  const { isSupported, getAnalytics } = await import("firebase/analytics");
  const ok = await isSupported();
  return ok ? getAnalytics(app) : null;
}
