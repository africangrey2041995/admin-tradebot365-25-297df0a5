
/**
 * Helper to normalize user IDs to consistent format
 * @param userId User ID to normalize
 * @returns Normalized user ID
 */
export function normalizeUserId(userId: string | undefined): string {
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
