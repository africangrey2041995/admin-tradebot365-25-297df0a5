
/**
 * Normalizes a user ID by removing dashes and standardizing format
 * This helps avoid comparison issues due to format differences
 * 
 * @param userId The userId string to normalize
 * @returns Normalized userId
 */
export const normalizeUserId = (userId: string): string => {
  if (!userId) {
    console.warn('Received empty userId for normalization');
    return '';
  }
  
  // Remove all dashes and convert to uppercase for consistent comparison
  return userId.replace(/-/g, '').toUpperCase();
};
