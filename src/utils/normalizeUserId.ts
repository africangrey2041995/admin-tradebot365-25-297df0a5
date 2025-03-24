/**
 * Utility functions for handling user IDs in the application
 * 
 * These functions ensure consistent formatting and validation of user IDs
 * across the entire application, preventing issues with data filtering and comparison.
 */

/**
 * Normalizes a user ID for consistent comparison
 * 
 * This function standardizes user IDs to a consistent format (USR-XXX with dash)
 * to ensure proper data filtering and comparisons throughout the application.
 * 
 * @param userId The user ID to normalize
 * @returns Normalized user ID string in the format USR-XXX
 */
export const normalizeUserId = (userId: string): string => {
  if (!userId) return '';
  
  // Strip any whitespace
  const trimmed = userId.trim();
  
  // Already in standard format
  if (/^USR-\d{3,}$/i.test(trimmed)) {
    // Just ensure consistent case (USR- prefix)
    return trimmed.replace(/^usr-/i, 'USR-');
  }
  
  // Handle format without dash (USR123 -> USR-123)
  if (/^USR\d{3,}$/i.test(trimmed)) {
    const numeric = trimmed.replace(/^USR/i, '');
    return `USR-${numeric}`;
  }
  
  // If it's just a numeric ID, add prefix
  if (/^\d{3,}$/.test(trimmed)) {
    return `USR-${trimmed}`;
  }
  
  // For other formats, return the trimmed value with standardized prefix
  // This ensures we preserve the original ID but with consistent formatting
  if (/^USR/i.test(trimmed)) {
    // Format is already like USR but with possibly different structure
    return trimmed.replace(/^usr/i, 'USR-').replace(/-+/, '-');
  }
  
  // If nothing matches, assume it's a raw ID that needs USR- prefix
  return `USR-${trimmed}`;
};

/**
 * Validates if a user ID follows the expected format
 * 
 * The expected format is USR-XXX where XXX is a numeric sequence.
 * This function helps ensure data consistency and proper filtering.
 * 
 * @param userId The user ID to validate
 * @returns Boolean indicating if the user ID is valid
 */
export const validateUserId = (userId: string): boolean => {
  if (!userId) return false;
  
  // Normalize the user ID first
  const normalizedId = normalizeUserId(userId);
  
  // Check if the ID follows the expected pattern (USR-XXX format)
  return /^USR-\d{3,}$/i.test(normalizedId);
};

/**
 * Validates if a bot ID follows the expected format
 * 
 * Bot IDs can follow different patterns based on bot type: BOT-XXX, PREMIUM-XXX, PROP-XXX, etc.
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
