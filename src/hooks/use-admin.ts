
import { useUser } from '@clerk/clerk-react';

/**
 * A simple hook to determine if the current user is an admin
 * In a real application, this would check roles from your authentication system
 */
export function useAdmin() {
  const { user, isSignedIn } = useUser();
  
  // Check if user is signed in and has admin role
  // For demo purposes, we'll assume certain email patterns indicate admin status
  const isAdmin = isSignedIn && user?.primaryEmailAddress?.emailAddress?.includes('admin');
  
  return { isAdmin };
}
