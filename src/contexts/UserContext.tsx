
import React, { createContext, useContext, ReactNode } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useAdmin } from '@/hooks/use-admin';
import { UserPlan } from '@/constants/userConstants';
import { User } from '@/types/user';

interface UserContextType {
  userId: string;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isPremiumUser: boolean;
  user: User | null;
  clerkUser: any; // clerk user object
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user: clerkUser } = useUser();
  const { isAdmin, isSuperAdmin } = useAdmin();

  // Get plan from user metadata
  const userPlan = clerkUser?.publicMetadata?.plan as UserPlan | undefined;
  
  // Create context value with properly typed values
  const contextValue: UserContextType = {
    userId: clerkUser?.id || '',
    isAdmin,
    isSuperAdmin,
    isPremiumUser: userPlan === UserPlan.PREMIUM || userPlan === UserPlan.ENTERPRISE,
    user: clerkUser ? {
      id: clerkUser.id,
      email: clerkUser.primaryEmailAddress?.emailAddress || '',
      name: clerkUser.fullName || '',
      firstName: clerkUser.firstName || '',
      lastName: clerkUser.lastName || '',
      username: clerkUser.username || '',
      phone: clerkUser.primaryPhoneNumber?.phoneNumber || '',
      avatar: clerkUser.imageUrl || '',
      role: isAdmin ? 'admin' : 'user',
      status: 'active',
      plan: userPlan || UserPlan.FREE,
      createdAt: clerkUser.createdAt || new Date().toISOString(),
      updatedAt: clerkUser.updatedAt || new Date().toISOString(),
      emailVerified: clerkUser.emailAddresses?.[0]?.verification?.status === 'verified',
      twoFactorEnabled: clerkUser.twoFactorEnabled || false,
      bots: 0, // Default value
      joinDate: clerkUser.createdAt || new Date().toISOString(),
    } as User : null,
    clerkUser,
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

// Type guard helpers
export const isAdminUser = (user: User | null): boolean => {
  if (!user) return false;
  return user.role === 'admin' || user.role === 'superadmin';
};

export const isSuperAdminUser = (user: User | null): boolean => {
  if (!user) return false;
  return user.role === 'superadmin';
};

export const isPremiumUser = (user: User | null): boolean => {
  if (!user) return false;
  return user.plan === UserPlan.PREMIUM || user.plan === UserPlan.ENTERPRISE;
};
