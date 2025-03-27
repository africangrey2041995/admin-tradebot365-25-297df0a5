
import { useUser } from "@clerk/clerk-react";

export function useAdmin() {
  const { user } = useUser();
  
  // For testing purposes, always return true to ensure admin features are visible
  // In production, would check actual admin metadata
  const isAdmin = true; // Force true for testing
  // const isAdmin = user?.publicMetadata?.role === "admin" || user?.publicMetadata?.role === "superadmin";
  
  // Check if user is a super admin
  const isSuperAdmin = true; // Force true for testing
  // const isSuperAdmin = user?.publicMetadata?.role === "superadmin";
  
  // Return a boolean indicating if the user is an admin
  return {
    isAdmin,
    isSuperAdmin
  };
}
