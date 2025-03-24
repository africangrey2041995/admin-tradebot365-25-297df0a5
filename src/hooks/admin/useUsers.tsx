
import { useState, useEffect } from 'react';
import { User } from '@/types';
import { UserRole, UserStatus, UserPlan } from '@/constants/userConstants';

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

// Change the default export to a named export
export const useUsers = (): UseUsersReturn => {
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    // Simulate fetching users from an API
    const loadData = async (page: number = 1) => {
      setLoading(true);
      // const response = await fetch(`/api/users?page=${page}&limit=${pageSize}`);
      // const data = await response.json();

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

      setUsers(mockUsers);
      setTotalUsers(30); // Mock total number of users
      setLoading(false);
    };

    loadData(currentPage);
  }, [currentPage, pageSize]);

  const fetchUsers = (page: number = 1) => {
    setCurrentPage(page);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getUserDetails = async (userId: string) => {
    setLoading(true);
    // const response = await fetch(`/api/users/${userId}`);
    // const data = await response.json();

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
    setLoading(false);
  };

  const createUser = async (userData: Partial<User>) => {
    setLoading(true);
    // const response = await fetch('/api/users', {
    //   method: 'POST',
    //   body: JSON.stringify(userData),
    // });
    // const data = await response.json();

    // Mock data for demonstration
    const mockUser: User = {
      id: 'new-user',
      name: userData.name || 'New User',
      email: userData.email || 'new.user@example.com',
      role: UserRole.USER,
      status: UserStatus.ACTIVE,
      plan: UserPlan.FREE,
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
      emailVerified: false,
      twoFactorEnabled: false,
      bots: 0,
      joinDate: new Date().toISOString().split('T')[0]
    };

    setUsers([...users, mockUser]);
    setTotalUsers(totalUsers + 1);
    setLoading(false);
  };

  const updateUser = async (userId: string, userData: Partial<User>) => {
    setLoading(true);
    // const response = await fetch(`/api/users/${userId}`, {
    //   method: 'PUT',
    //   body: JSON.stringify(userData),
    // });
    // const data = await response.json();

    // Mock data for demonstration
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return { ...user, ...userData };
      }
      return user;
    });

    setUsers(updatedUsers);
    setLoading(false);
  };

  const deleteUser = async (userId: string) => {
    setLoading(true);
    // const response = await fetch(`/api/users/${userId}`, {
    //   method: 'DELETE',
    // });
    // const data = await response.json();

    // Mock data for demonstration
    const updatedUsers = users.filter((user) => user.id !== userId);

    setUsers(updatedUsers);
    setTotalUsers(totalUsers - 1);
    setLoading(false);
  };

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
