import { onAuthStateChanged, type User } from "firebase/auth";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { auth } from "../config/firebase";
import { logout as logoutUser } from "../services/authService";
import { getUserProfile } from "../services/firestoreService";
import type { BaseProfile, UserRole } from "../types/firestore";

interface AuthContextValue {
  currentUser: User | null;
  profile: BaseProfile | null;
  loading: boolean;
  refreshProfile: () => Promise<BaseProfile | null>;
  logout: () => Promise<void>;
  roleHomePath: string;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<BaseProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setProfile(user ? await getUserProfile(user.uid) : null);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const roleHomePath = getRoleHomePath(profile?.role);

  async function refreshProfile() {
    if (!auth.currentUser) {
      setProfile(null);
      return null;
    }

    const nextProfile = await getUserProfile(auth.currentUser.uid);
    setProfile(nextProfile);
    return nextProfile;
  }

  const value = useMemo(
    () => ({
      currentUser,
      profile,
      loading,
      refreshProfile,
      logout: logoutUser,
      roleHomePath,
    }),
    [currentUser, loading, profile, roleHomePath],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function getRoleHomePath(role?: UserRole) {
  if (role === "admin") return "/admin";
  if (role === "cooker") return "/cooker";
  if (role === "delivery") return "/delivery";
  return "/consumer";
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
