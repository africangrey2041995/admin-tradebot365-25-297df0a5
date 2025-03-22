
import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "support";
  image?: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>({
    id: "user-1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
  });

  const signIn = async (email: string, password: string) => {
    // Mock authentication
    const mockUser = {
      id: "user-1",
      name: "Admin User",
      email: email,
      role: email.includes("admin") ? "admin" : "user" as "admin" | "user" | "support",
    };
    setUser(mockUser);
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
