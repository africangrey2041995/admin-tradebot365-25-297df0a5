
import { useState, useEffect, useCallback } from 'react';
import { User } from '@/types';
import { UserRole, UserStatus, UserPlan } from '@/constants/userConstants';

// Mock data for demonstration
const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: UserRole.USER,
    status: UserStatus.ACTIVE,
    plan: UserPlan.BASIC,
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
    emailVerified: true,
    twoFactorEnabled: false,
    bots: 3,
    joinDate: '2023-01-01'
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: UserRole.ADMIN,
    status: UserStatus.INACTIVE,
    plan: UserPlan.PREMIUM,
    createdAt: '2023-02-15T00:00:00.000Z',
    updatedAt: '2023-02-15T00:00:00.000Z',
    emailVerified: true,
    twoFactorEnabled: true,
    bots: 5,
    joinDate: '2023-02-15'
  },
  {
    id: 'user-3',
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    role: UserRole.SUPPORT,
    status: UserStatus.SUSPENDED,
    plan: UserPlan.TRIAL,
    createdAt: '2023-03-10T00:00:00.000Z',
    updatedAt: '2023-03-10T00:00:00.000Z',
    emailVerified: false,
    twoFactorEnabled: false,
    bots: 0,
    joinDate: '2023-03-10'
  },
];

export interface UseUsersReturn {
  users: User[];
  totalUsers: number;
  currentPage: number;
  pageSize: number;
  loading: boolean;
  selectedUser: User | null;
  fetchUsers: (page?: number) => void;
  handlePageChange: (page: number) => void;
  getUserDetails: (userId: string) => void;
  createUser: (userData: Partial<User>) => void;
  updateUser: (userId: string, userData: Partial<User>) => void;
  deleteUser: (userId: string) => void;
}

/**
 * Hook for managing user data in admin interface
 * Provides functions for fetching, creating, updating, and deleting users
 */
export const useUsers = (): UseUsersReturn => {
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Fetch users with pagination
  const fetchUsers = useCallback((page: number = 1) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setUsers(mockUsers);
      setTotalUsers(30); // Mock total number of users
      setCurrentPage(page);
      setLoading(false);
    }, 500);
  }, []);

  // Initial data load
  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage, pageSize, fetchUsers]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Get user details by ID
  const getUserDetails = useCallback((userId: string) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Find user in existing data if possible
      const existingUser = users.find(user => user.id === userId);
      
      if (existingUser) {
        setSelectedUser(existingUser);
      } else {
        // Mock data for demonstration
        const mockUser: User = {
          id: userId,
          name: 'John Doe',
          email: 'john.doe@example.com',
          role: UserRole.USER,
          status: UserStatus.ACTIVE,
          plan: UserPlan.BASIC,
          createdAt: '2023-01-01T00:00:00.000Z',
          updatedAt: '2023-01-01T00:00:00.000Z',
          emailVerified: true,
          twoFactorEnabled: false,
          bots: 3,
          joinDate: '2023-01-01'
        };
        
        setSelectedUser(mockUser);
      }
      
      setLoading(false);
    }, 300);
  }, [users]);

  // Create a new user
  const createUser = useCallback((userData: Partial<User>) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Create mock user with provided data
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: userData.name || 'New User',
        email: userData.email || 'new.user@example.com',
        role: userData.role || UserRole.USER,
        status: userData.status || UserStatus.ACTIVE,
        plan: userData.plan || UserPlan.FREE,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        emailVerified: userData.emailVerified || false,
        twoFactorEnabled: userData.twoFactorEnabled || false,
        bots: userData.bots || 0,
        joinDate: new Date().toISOString().split('T')[0]
      };
      
      setUsers([...users, newUser]);
      setTotalUsers(totalUsers + 1);
      setLoading(false);
    }, 500);
  }, [users, totalUsers]);

  // Update an existing user
  const updateUser = useCallback((userId: string, userData: Partial<User>) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedUsers = users.map((user) => {
        if (user.id === userId) {
          return { ...user, ...userData, updatedAt: new Date().toISOString() };
        }
        return user;
      });
      
      setUsers(updatedUsers);
      
      // Update selectedUser if it's the one being modified
      if (selectedUser && selectedUser.id === userId) {
        setSelectedUser({ ...selectedUser, ...userData, updatedAt: new Date().toISOString() });
      }
      
      setLoading(false);
    }, 500);
  }, [users, selectedUser]);

  // Delete a user
  const deleteUser = useCallback((userId: string) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedUsers = users.filter((user) => user.id !== userId);
      
      setUsers(updatedUsers);
      setTotalUsers(totalUsers - 1);
      
      // Clear selectedUser if it's the one being deleted
      if (selectedUser && selectedUser.id === userId) {
        setSelectedUser(null);
      }
      
      setLoading(false);
    }, 500);
  }, [users, totalUsers, selectedUser]);

  return {
    users,
    totalUsers,
    currentPage,
    pageSize,
    loading,
    selectedUser,
    fetchUsers,
    handlePageChange,
    getUserDetails,
    createUser,
    updateUser,
    deleteUser,
  };
};
