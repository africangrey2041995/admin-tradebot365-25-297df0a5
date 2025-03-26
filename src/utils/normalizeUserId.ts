
/**
 * Normalize user ID by removing any non-alphanumeric characters
 * and converting to lowercase. This helps with consistent comparison
 * when IDs might have different formats (e.g., USR-001 vs USR001)
 * 
 * @param userId The user ID to normalize
 * @returns Normalized user ID
 */
export const normalizeUserId = (userId: string): string => {
  // Remove any non-alphanumeric characters and convert to lowercase
  return userId.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
};
