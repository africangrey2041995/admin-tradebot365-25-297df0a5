
import { useUser } from './use-user';

/**
 * Hook để kiểm tra xem người dùng hiện tại có phải là admin hay không
 */
export function useAdmin() {
  const { user, loading } = useUser();
  
  return {
    isAdmin: user?.isAdmin || false,
    loading
  };
}
