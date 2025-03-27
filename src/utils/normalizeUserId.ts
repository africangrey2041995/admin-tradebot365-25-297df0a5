
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

/**
 * Validates if a string matches the expected userId format
 * @param userId User ID to validate
 * @returns boolean indicating if the userId is valid
 */
export function validateUserId(userId: string): boolean {
  // Check if userId follows the standardized format (e.g., 'USR-XXX', 'user-XXX', etc.)
  return /^(USR-|user-)\w+$/i.test(userId);
}

/**
 * Validates if a string matches the expected botId format
 * @param botId Bot ID to validate
 * @returns boolean indicating if the botId is valid
 */
export function validateBotId(botId: string): boolean {
  // Check if botId follows the standardized format
  return /^(MY-|PRE-|PROP-|pb-|ptb-)\w+$/i.test(botId);
}
