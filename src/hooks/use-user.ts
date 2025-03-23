
import { useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  isAdmin: boolean;
}

/**
 * Hook để lấy thông tin người dùng hiện tại
 * Trong môi trường thực tế, điều này sẽ lấy từ một API hoặc hệ thống xác thực
 */
export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mô phỏng việc lấy thông tin người dùng
    setTimeout(() => {
      // Trong môi trường thực tế, điều này sẽ lấy từ một API
      const mockUser: User = {
        id: 'USR-001',
        name: 'Nguyễn Văn A',
        email: 'user.a@example.com',
        role: 'user',
        isAdmin: false
      };
      
      setUser(mockUser);
      setLoading(false);
    }, 500);
  }, []);

  return {
    user,
    loading,
    isAuthenticated: !!user
  };
}
