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

/**
 * Validates if a user ID follows the expected format
 * 
 * @param userId The user ID to validate
 * @returns Boolean indicating if the user ID is valid
 */
export const validateUserId = (userId: string): boolean => {
  if (!userId) return false;
  
  // Normalize the user ID first
  const normalizedId = normalizeUserId(userId);
  
  // Check if the ID follows one of the expected patterns
  // e.g., USR-XXX or ADMIN-XXX format
  return /^(USR|USER|ADMIN)-\d{3,}$/i.test(normalizedId);
};

/**
 * Validates if a bot ID follows the expected format
 * 
 * @param botId The bot ID to validate
 * @returns Boolean indicating if the bot ID is valid
 */
export const validateBotId = (botId: string): boolean => {
  if (!botId) return false;
  
  // Strip any whitespace
  const trimmed = botId.trim();
  
  // Check if the ID follows one of the expected patterns
  // Bot IDs can be in different formats: BOT-XXX, USER-BOTS, PREMIUM-BOTS, etc.
  return /^(BOT-|USER-|PREMIUM-|PROP-)[\w-]+$/i.test(trimmed);
};

/**
 * Normalizes a bot ID for consistent comparison
 * 
 * @param botId The bot ID to normalize
 * @returns Normalized bot ID string
 */
export const normalizeBotId = (botId: string): string => {
  if (!botId) return '';
  
  // Strip any whitespace
  const trimmed = botId.trim();
  
  // We keep the original case for bot IDs
  return trimmed;
};
