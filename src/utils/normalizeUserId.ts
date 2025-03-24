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
 * Validates a user ID
 * @param userId User identifier to validate
 * @returns True if the user ID is valid
 */
export const validateUserId = (userId: string): boolean => {
  // Simple validation: user ID must be at least 3 characters
  // and follow certain format patterns
  if (!userId || userId.length < 3) {
    return false;
  }
  
  // USR-XXX format validation
  const usrPattern = /^USR-\d{3}$/;
  if (usrPattern.test(userId)) {
    return true;
  }
  
  // user-XXX format validation
  const userDashPattern = /^user-\d{3}$/;
  if (userDashPattern.test(userId)) {
    return true;
  }
  
  // user_XXX format validation
  const userUnderscorePattern = /^user_\d{3}$/;
  if (userUnderscorePattern.test(userId)) {
    return true;
  }
  
  // user:XXX format validation
  const userColonPattern = /^user:\d{3}$/;
  if (userColonPattern.test(userId)) {
    return true;
  }
  
  // Other user ID formats can be added here
  const alphanumericPattern = /^[a-zA-Z0-9-_:]{3,}$/;
  return alphanumericPattern.test(userId);
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
