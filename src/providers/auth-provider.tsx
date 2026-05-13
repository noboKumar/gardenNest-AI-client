"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import axios from "axios";

interface AuthContextType {
  user: User | null;
  role: string | null;
  status: string | null;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setUser: (user: User | null) => void;
  createUser: (email: string, password: string) => Promise<any>;
  updateUser: (userData: { displayName?: string; photoURL?: string }) => Promise<void>;
  googleLogIn: () => Promise<any>;
  logInUser: (email: string, password: string) => Promise<any>;
  LogOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Sync with backend
        try {
          await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`, {
            name: currentUser.displayName,
            email: currentUser.email,
            photoURL: currentUser.photoURL,
          });

          const roleRes = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/role/${currentUser.email}`);
          setRole(roleRes.data.role);
          setStatus(roleRes.data.status);
        } catch (error) {
          console.error("Error syncing user with backend:", error);
        }
      } else {
        setRole(null);
        setStatus(null);
      }
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const createUser = (email: string, password: string) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (userData: { displayName?: string; photoURL?: string }) => {
    if (!auth.currentUser) return Promise.reject("No user logged in");
    return updateProfile(auth.currentUser, userData);
  };

  const googleLogIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logInUser = (email: string, password: string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const LogOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  const userInfo = {
    createUser,
    updateUser,
    user,
    role,
    status,
    loading,
    setLoading,
    setUser,
    googleLogIn,
    logInUser,
    LogOutUser,
  };

  return <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
