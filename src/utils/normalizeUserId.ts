
/**
 * Normalizes a user ID to a consistent format
 * @param userId The user ID to normalize
 * @returns The normalized user ID in USR-XXX format
 */
export function normalizeUserId(userId?: string): string {
  if (!userId) return '';
  
  // Convert to uppercase 'USR-XXX' format
  if (userId.toLowerCase().startsWith('usr-')) {
    return userId.toUpperCase();
  }
  
  // Convert 'user-XXX' to 'USR-XXX' format
  if (userId.toLowerCase().startsWith('user-')) {
    return 'USR-' + userId.substring(5).toUpperCase();
  }
  
  // If it doesn't match any known format, return as is
  return userId;
}

/**
 * Validates if a user ID follows the standardized format
 * @param userId The user ID to validate
 * @returns True if the ID is valid, false otherwise
 */
export function validateUserId(userId: string): boolean {
  // Check if userId follows the standardized format (e.g., 'USR-XXX', 'user-XXX', etc.)
  return /^(USR-|user-)\w+$/i.test(userId);
}
