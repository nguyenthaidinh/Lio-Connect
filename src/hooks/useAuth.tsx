"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/lib/firebase";

// Tạm thời profile chưa dùng Firestore, để tránh lỗi vòng vòng
export interface UserProfile {
  displayName?: string;
  avatarUrl?: string;
  role?: "user" | "admin";
}

interface AuthContextValue {
  user: User | null;
  profile: UserProfile | null;
  loadingAuth: boolean;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  profile: null,
  loadingAuth: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthContextValue>({
    user: null,
    profile: null,
    loadingAuth: true,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        setState({
          user: null,
          profile: null,
          loadingAuth: false,
        });
        return;
      }

      // Tạm: profile chỉ lấy displayName từ Firebase Auth
      const profile: UserProfile = {
        displayName: firebaseUser.displayName ?? "Người dùng",
      };

      setState({
        user: firebaseUser,
        profile,
        loadingAuth: false,
      });
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={state}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
