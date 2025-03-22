
import { useState, useEffect, useCallback } from 'react';
import { User } from '@/types';
import { UserRole, UserStatus, UserPlan } from '@/constants/userConstants';

interface UseUsersOptions {
  initialPage?: number;
  pageSize?: number;
}

export const useUsers = (options: UseUsersOptions = {}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(options.initialPage || 1);
  const [pageSize] = useState(options.pageSize || 10);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  // Fetch users (mock data for now)
  const fetchUsers = useCallback((page: number = currentPage) => {
    setLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      const mockUsers: User[] = [
        {
          id: 'USR-001',
          email: 'john.doe@example.com',
          name: 'John Doe',
          role: UserRole.USER,
          status: UserStatus.ACTIVE,
          plan: UserPlan.PREMIUM,
          createdAt: '2023-05-10T08:30:00Z',
          updatedAt: '2023-11-15T14:22:30Z',
          lastLogin: '2024-03-20T09:15:45Z',
          emailVerified: true,
          twoFactorEnabled: false,
        },
        {
          id: 'USR-002',
          email: 'jane.smith@example.com',
          name: 'Jane Smith',
          role: UserRole.USER,
          status: UserStatus.ACTIVE,
          plan: UserPlan.BASIC,
          createdAt: '2023-06-20T10:15:00Z',
          updatedAt: '2023-10-05T16:40:20Z',
          lastLogin: '2024-03-19T11:30:15Z',
          emailVerified: true,
          twoFactorEnabled: true,
        },
        {
          id: 'USR-003',
          email: 'robert.johnson@example.com',
          name: 'Robert Johnson',
          role: UserRole.USER,
          status: UserStatus.INACTIVE,
          plan: UserPlan.BASIC,
          createdAt: '2023-07-15T14:45:00Z',
          updatedAt: '2023-09-10T12:30:45Z',
          lastLogin: '2024-02-28T08:20:30Z',
          emailVerified: true,
          twoFactorEnabled: false,
        },
        {
          id: 'USR-004',
          email: 'emily.davis@example.com',
          name: 'Emily Davis',
          role: UserRole.USER,
          status: UserStatus.ACTIVE,
          plan: UserPlan.PREMIUM,
          createdAt: '2023-08-05T09:20:00Z',
          updatedAt: '2023-12-12T10:15:30Z',
          lastLogin: '2024-03-21T07:45:10Z',
          emailVerified: true,
          twoFactorEnabled: true,
        },
        {
          id: 'USR-005',
          email: 'michael.brown@example.com',
          name: 'Michael Brown',
          role: UserRole.USER,
          status: UserStatus.SUSPENDED,
          plan: UserPlan.BASIC,
          createdAt: '2023-09-25T16:30:00Z',
          updatedAt: '2024-01-20T15:10:45Z',
          lastLogin: '2024-02-10T13:25:50Z',
          emailVerified: false,
          twoFactorEnabled: false,
        },
        {
          id: 'USR-006',
          email: 'sarah.wilson@example.com',
          name: 'Sarah Wilson',
          role: UserRole.USER,
          status: UserStatus.ACTIVE,
          plan: UserPlan.TRIAL,
          createdAt: '2023-10-15T11:45:00Z',
          updatedAt: '2024-02-05T09:30:15Z',
          lastLogin: '2024-03-18T16:40:25Z',
          emailVerified: true,
          twoFactorEnabled: false,
        },
      ];
      
      setUsers(mockUsers);
      setTotalUsers(mockUsers.length);
      setLoading(false);
    }, 1000);
  }, [currentPage, pageSize]);
  
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchUsers(page);
  };
  
  // Get user details
  const getUserDetails = useCallback((userId: string) => {
    setLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      const user = users.find(u => u.id === userId);
      
      if (user) {
        setSelectedUser(user);
      } else {
        setSelectedUser(null);
      }
      
      setLoading(false);
    }, 500);
  }, [users]);
  
  // Create new user
  const createUser = useCallback((userData: Partial<User>) => {
    setLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      const newUser: User = {
        id: `USR-${Math.floor(Math.random() * 1000)}`,
        email: userData.email || 'new.user@example.com',
        name: userData.name || 'New User',
        role: userData.role || UserRole.USER,
        status: userData.status || UserStatus.ACTIVE,
        plan: userData.plan || UserPlan.BASIC,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        emailVerified: false,
        twoFactorEnabled: false,
      };
      
      setUsers([...users, newUser]);
      setTotalUsers(totalUsers + 1);
      setLoading(false);
      
      return newUser;
    }, 800);
  }, [users, totalUsers]);
  
  // Update user
  const updateUser = useCallback((userId: string, userData: Partial<User>) => {
    setLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      const updatedUsers = users.map(user => {
        if (user.id === userId) {
          return {
            ...user,
            ...userData,
            updatedAt: new Date().toISOString()
          };
        }
        return user;
      });
      
      setUsers(updatedUsers);
      
      if (selectedUser && selectedUser.id === userId) {
        setSelectedUser({
          ...selectedUser,
          ...userData,
          updatedAt: new Date().toISOString()
        });
      }
      
      setLoading(false);
    }, 800);
  }, [users, selectedUser]);
  
  // Delete user
  const deleteUser = useCallback((userId: string) => {
    setLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      const remainingUsers = users.filter(user => user.id !== userId);
      
      setUsers(remainingUsers);
      setTotalUsers(totalUsers - 1);
      
      if (selectedUser && selectedUser.id === userId) {
        setSelectedUser(null);
      }
      
      setLoading(false);
    }, 800);
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
    deleteUser
  };
};
