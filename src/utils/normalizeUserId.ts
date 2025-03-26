
/**
 * Validates if a userId is in the correct format (USR-XXX)
 * @param userId The user ID to validate
 * @returns True if the format is valid, false otherwise
 */
export const validateUserId = (userId: string): boolean => {
  if (!userId) return false;
  
  // Check if it matches the USR-XXX pattern (where XXX is any alphanumeric)
  const pattern = /^USR-[A-Za-z0-9]+$/;
  return pattern.test(userId);
};

/**
 * Normalizes a userId to a consistent format
 * This handles various input formats and converts them to a standard format
 * 
 * @param userId The user ID to normalize
 * @returns Normalized user ID
 */
export const normalizeUserId = (userId: string): string => {
  if (!userId) return '';
  
  // If already in correct format, just return it
  if (validateUserId(userId)) {
    return userId;
  }
  
  // If it's a numeric ID, convert to USR-format
  if (/^\d+$/.test(userId)) {
    return `USR-${userId}`;
  }
  
  // If it contains USR but in wrong format, try to extract the ID
  if (userId.toLowerCase().includes('usr')) {
    const match = userId.match(/[A-Za-z0-9]+$/);
    if (match) {
      return `USR-${match[0]}`;
    }
  }
  
  // For other formats, just prefix with USR-
  return `USR-${userId.replace(/[^A-Za-z0-9]/g, '')}`;
};
