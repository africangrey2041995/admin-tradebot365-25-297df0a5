
/**
 * Normalizes a user ID for consistent comparison
 * Handles different formats of user IDs that might be used in the application
 * 
 * @param userId The user ID to normalize
 * @returns Normalized user ID string
 */
export const normalizeUserId = (userId: string): string => {
  if (!userId) return '';
  
  // Strip any whitespace
  const trimmed = userId.trim();
  
  // Convert to uppercase for case-insensitive comparison
  return trimmed.toUpperCase();
};
