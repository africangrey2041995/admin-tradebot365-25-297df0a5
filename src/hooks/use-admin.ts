
import { useUser } from "@clerk/clerk-react";

export function useAdmin() {
  const { user } = useUser();
  
  // Check if the user has the admin metadata
  // In Clerk, we can store custom metadata on the user object
  const isAdmin = user?.publicMetadata?.role === "admin" || user?.publicMetadata?.role === "superadmin";
  
  // Return a boolean indicating if the user is an admin
  return {
    isAdmin,
    // If we need more granular control later
    isSuperAdmin: user?.publicMetadata?.role === "superadmin"
  };
}
