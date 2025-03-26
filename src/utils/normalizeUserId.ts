
/**
 * Normalize user ID by removing any non-alphanumeric characters
 * and converting to lowercase. This helps with consistent comparison
 * when IDs might have different formats (e.g., USR-001 vs USR001)
 * 
 * @param userId The user ID to normalize
 * @returns Normalized user ID
 */
export const normalizeUserId = (userId: string): string => {
  // Check for null or undefined, return empty string
  if (!userId) return '';
  
  // Remove any non-alphanumeric characters and convert to lowercase
  return userId.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
};

/**
 * Validate a user ID format
 * 
 * @param userId User ID to validate
 * @returns boolean indicating if the format is valid
 */
export const validateUserId = (userId: string): boolean => {
  if (!userId) return false;
  
  // Basic validation - check if the ID follows expected format after normalization
  const normalized = normalizeUserId(userId);
  
  // Check if it has at least one letter (usr) followed by at least one digit
  return /^[a-z]+\d+$/.test(normalized);
};

/**
 * Validate a bot ID format
 * 
 * @param botId Bot ID to validate
 * @returns boolean indicating if the format is valid
 */
export const validateBotId = (botId: string): boolean => {
  if (!botId) return false;
  
  // Basic validation for bot IDs
  // Accepts formats like BOT-123, PB-123, PRE-123, etc.
  return /^([a-zA-Z]+-\d+|[a-zA-Z]+\d+)$/.test(botId);
};
