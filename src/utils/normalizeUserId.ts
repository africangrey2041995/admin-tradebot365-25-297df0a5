
/**
 * Validates if a userId follows the standardized format
 * @param userId - User ID to validate
 * @returns boolean indicating whether the userId is valid
 */
export function validateUserId(userId: string): boolean {
  // Check if userId follows the standardized format (e.g., 'USR-XXX', 'user-XXX', etc.)
  return /^(USR-|user-)\w+$/i.test(userId);
}

/**
 * Validates if a botId follows the standardized format
 * @param botId - Bot ID to validate
 * @returns boolean indicating whether the botId is valid
 */
export function validateBotId(botId: string): boolean {
  // Check if botId follows the standardized format (e.g., 'BOT-XXX', 'pb-XXX', etc.)
  return /^(BOT-|pb-|PROP-)\w+$/i.test(botId);
}

/**
 * Normalizes user IDs to a consistent format
 * @param userId - User ID to normalize
 * @returns Normalized user ID string
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
