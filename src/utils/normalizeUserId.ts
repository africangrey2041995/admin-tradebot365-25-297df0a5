
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

/**
 * Validates if a bot ID follows the standardized format
 * @param botId The bot ID to validate
 * @returns True if the ID is valid, false otherwise
 */
export function validateBotId(botId: string): boolean {
  // Check if botId follows the standardized format (e.g., 'BOT-XXX', 'pb-XXX', 'ptb-XXX', etc.)
  return /^(BOT-|pb-|ptb-|PROP-|PRE-|MY-)\w+$/i.test(botId);
}

/**
 * Normalizes a bot ID to a consistent format
 * @param botId The bot ID to normalize
 * @returns The normalized bot ID
 */
export function normalizeBotId(botId?: string): string {
  if (!botId) return '';
  
  // For 'BOT-XXX' format, simply return uppercase
  if (botId.toLowerCase().startsWith('bot-')) {
    return botId.toUpperCase();
  }
  
  // For premium bot 'pb-XXX' format, convert to 'PRE-XXX'
  if (botId.toLowerCase().startsWith('pb-')) {
    return 'PRE-' + botId.substring(3).toUpperCase();
  }
  
  // For prop trading bot 'ptb-XXX' format, convert to 'PROP-XXX'
  if (botId.toLowerCase().startsWith('ptb-')) {
    return 'PROP-' + botId.substring(4).toUpperCase();
  }
  
  // Return as is for other standard formats (PRE-, PROP-, MY-)
  return botId;
}
