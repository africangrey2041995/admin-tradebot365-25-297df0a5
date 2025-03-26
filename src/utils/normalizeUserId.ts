
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
 * Validates if a botId is in the correct format (MY-XXX, PRE-XXX, PROP-XXX)
 * @param botId The bot ID to validate
 * @returns True if the format is valid, false otherwise
 */
export const validateBotId = (botId: string): boolean => {
  if (!botId) return false;
  
  // Check if it matches any of the supported bot ID patterns
  const pattern = /^(MY|PRE|PROP)-[A-Za-z0-9]+$/;
  return pattern.test(botId);
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

/**
 * Normalizes a botId to a consistent format based on bot type
 * 
 * @param botId The bot ID to normalize
 * @param botType Optional bot type to determine the prefix (my, premium, prop)
 * @returns Normalized bot ID
 */
export const normalizeBotId = (botId: string, botType?: 'my' | 'premium' | 'prop'): string => {
  if (!botId) return '';
  
  // If already in correct format, just return it
  if (validateBotId(botId)) {
    return botId;
  }
  
  // Determine prefix based on botType or existing prefix in the ID
  let prefix = 'MY-';
  
  if (botType) {
    if (botType === 'premium') prefix = 'PRE-';
    else if (botType === 'prop') prefix = 'PROP-';
  } else {
    // Try to detect from the ID
    if (botId.toLowerCase().includes('pre') || botId.toLowerCase().includes('premium')) {
      prefix = 'PRE-';
    } else if (botId.toLowerCase().includes('prop')) {
      prefix = 'PROP-';
    }
  }
  
  // Extract the ID part
  const match = botId.match(/[A-Za-z0-9]+$/);
  if (match) {
    return `${prefix}${match[0]}`;
  }
  
  // Fallback: remove non-alphanumeric characters and add prefix
  return `${prefix}${botId.replace(/[^A-Za-z0-9]/g, '')}`;
};
