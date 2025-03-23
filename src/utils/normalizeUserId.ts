
/**
 * Normalizes user IDs to a consistent format for comparison
 * This helps handle different ID formats across the application
 * 
 * @param userId The user ID to normalize
 * @returns The normalized user ID
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
 * Validates if a user ID follows the standardized format
 * 
 * @param userId The user ID to validate
 * @returns True if the ID follows the standardized format
 */
export function validateUserId(userId: string): boolean {
  return /^(USR-|user-)\w+$/i.test(userId);
}

/**
 * Validates if a bot ID follows the standardized format
 * 
 * @param botId The bot ID to validate
 * @returns True if the ID follows the standardized format
 */
export function validateBotId(botId: string): boolean {
  return /^(BOT|bot-|pb-|ub-|ptb-)\w+$/i.test(botId);
}

/**
 * Normalizes bot IDs to a consistent format
 * 
 * @param botId The bot ID to normalize
 * @returns The normalized bot ID
 */
export function normalizeBotId(botId: string | undefined): string {
  if (!botId) return '';
  
  // Handle premium bot IDs (pb-XXX)
  if (botId.toLowerCase().startsWith('pb-')) {
    return botId.toLowerCase();
  }
  
  // Handle user bot IDs (ub-XXX)
  if (botId.toLowerCase().startsWith('ub-')) {
    return botId.toLowerCase();
  }
  
  // Handle BOT prefix
  if (botId.toUpperCase().startsWith('BOT')) {
    return botId.toUpperCase();
  }
  
  return botId;
}
