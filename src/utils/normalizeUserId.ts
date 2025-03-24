/**
 * Normalizes user ID format across the application
 * @param userId Raw user identifier 
 * @returns Normalized user ID
 */
export const normalizeUserId = (userId: string): string => {
  // If the ID includes a colon (e.g., "user:123"), extract the part after the colon
  if (userId.includes(':')) {
    return userId.split(':')[1];
  }
  
  // If starts with "user_", remove that prefix
  if (userId.startsWith('user_')) {
    return userId.substring(5);
  }
  
  return userId;
};

/**
 * Validates a bot ID
 * @param botId Bot identifier to validate
 * @returns True if the bot ID is valid
 */
export const validateBotId = (botId: string): boolean => {
  // Simple validation: bot ID must be at least 5 characters
  // and follow certain format patterns
  if (!botId || botId.length < 5) {
    return false;
  }
  
  // PROP-XXX format validation
  const propBotPattern = /^PROP-\d{3}$/;
  if (propBotPattern.test(botId)) {
    return true;
  }
  
  // Other bot ID formats can be added here
  const alphanumericPattern = /^[a-zA-Z0-9-_]{5,}$/;
  return alphanumericPattern.test(botId);
};
