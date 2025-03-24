
/**
 * ID standardization utility functions for the Trade Bot 365 system.
 * This file contains helpers for standardizing entity IDs throughout the application.
 */

/**
 * Standardize and normalize a user ID to the proper format (USR-XXXX)
 * @param userId The user ID to normalize
 * @returns Normalized user ID
 */
export function standardizeUserId(userId: string): string {
  if (!userId) return '';
  
  // If already in standard format, return as is
  if (userId.startsWith('USR-')) {
    return userId;
  }
  
  // Remove any existing prefixes if present
  let cleanId = userId;
  const knownPrefixes = ['user-', 'user_', 'u-', 'u_'];
  
  for (const prefix of knownPrefixes) {
    if (cleanId.toLowerCase().startsWith(prefix)) {
      cleanId = cleanId.substring(prefix.length);
      break;
    }
  }
  
  // Add standard prefix
  return `USR-${cleanId}`;
}

/**
 * Standardize and normalize an account ID to the proper format (ACC-XXXX)
 * @param accountId The account ID to normalize
 * @returns Normalized account ID
 */
export function standardizeAccountId(accountId: string): string {
  if (!accountId) return '';
  
  // If already in standard format, return as is
  if (accountId.startsWith('ACC-')) {
    return accountId;
  }
  
  // Remove any existing prefixes if present
  let cleanId = accountId;
  const knownPrefixes = ['acc-', 'account-', 'account_', 'a-', 'a_'];
  
  for (const prefix of knownPrefixes) {
    if (cleanId.toLowerCase().startsWith(prefix)) {
      cleanId = cleanId.substring(prefix.length);
      break;
    }
  }
  
  // Add standard prefix
  return `ACC-${cleanId}`;
}

/**
 * Convert legacy ID formats to standardized IDs throughout the application
 * @param data The data object or array to standardize
 * @returns The same data with standardized IDs
 */
export function standardizeAllIds<T extends Record<string, any>>(data: T): T;
export function standardizeAllIds<T extends Record<string, any>>(data: T[]): T[];
export function standardizeAllIds<T extends Record<string, any>>(data: T | T[]): T | T[] {
  if (Array.isArray(data)) {
    return data.map(item => standardizeAllIds(item));
  }
  
  const result = { ...data };
  
  // Convert id to appropriate entity ID if entity type can be determined
  if ('id' in result) {
    // Determine entity type and convert accordingly
    if ('type' in result && typeof result.type === 'string') {
      if (result.type.includes('BOT') || result.type.includes('bot')) {
        // This is a bot entity - use botId
        if (!result.botId) {
          // @ts-ignore
          result.botId = result.id;
        }
        // @ts-ignore
        delete result.id;
      } else if (result.type.includes('USER') || result.type.includes('user')) {
        // This is a user entity - use userId
        if (!result.userId) {
          // @ts-ignore
          result.userId = standardizeUserId(result.id);
        }
        // @ts-ignore
        delete result.id;
      } else if (result.type.includes('ACCOUNT') || result.type.includes('account')) {
        // This is an account entity - use accountId
        if (!result.accountId) {
          // @ts-ignore
          result.accountId = standardizeAccountId(result.id);
        }
        // @ts-ignore
        delete result.id;
      }
    }
  }
  
  // Standardize all IDs in nested objects
  for (const key in result) {
    if (typeof result[key] === 'object' && result[key] !== null) {
      result[key] = standardizeAllIds(result[key]);
    }
  }
  
  return result;
}

/**
 * Migration function to help transition from using generic 'id' to specific entity IDs
 * @param dataArray Array of entities to migrate
 * @param entityType Type of entity to perform the migration for
 * @returns Migrated data with standardized IDs
 */
export function migrateGenericIdToSpecificId<T extends Record<string, any>>(
  dataArray: T[],
  entityType: 'bot' | 'user' | 'account'
): T[] {
  return dataArray.map(item => {
    const result = { ...item };
    
    if ('id' in result) {
      switch (entityType) {
        case 'bot':
          if (!result.botId) {
            // @ts-ignore
            result.botId = result.id;
          }
          break;
        case 'user':
          if (!result.userId) {
            // @ts-ignore
            result.userId = standardizeUserId(result.id);
          }
          break;
        case 'account':
          if (!result.accountId) {
            // @ts-ignore
            result.accountId = standardizeAccountId(result.id);
          }
          break;
      }
      
      // Remove the original id field
      // @ts-ignore
      delete result.id;
    }
    
    return result;
  });
}
