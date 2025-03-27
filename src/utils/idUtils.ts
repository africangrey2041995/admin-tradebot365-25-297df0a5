
/**
 * ID standardization utility functions for the Trade Bot 365 system.
 * This file contains helpers for standardizing entity IDs throughout the application.
 * 
 * IMPORTANT: The standard format for user IDs is USR-XXX (e.g., USR-001)
 * IMPORTANT: The standard format for account IDs is ACC-XXX (e.g., ACC-001)
 * IMPORTANT: Bot IDs follow type-specific formats (BOT-XXX, PREMIUM-XXX, PROP-XXX)
 */

import { normalizeUserId } from './normalizeUserId';
import { BotType } from '@/constants/botTypes';

/**
 * Standardize and normalize a user ID to the proper format (USR-XXXX)
 * 
 * @param userId The user ID to normalize
 * @returns Normalized user ID in standard format
 */
export function standardizeUserId(userId: string): string {
  return normalizeUserId(userId); // Use our central normalization function
}

/**
 * Standardize and normalize an account ID to the proper format (ACC-XXXX)
 * 
 * @param accountId The account ID to normalize
 * @returns Normalized account ID in standard format
 */
export function standardizeAccountId(accountId: string): string {
  if (!accountId) return '';
  
  // If already in correct format, return as is
  if (accountId.startsWith('ACC-')) return accountId;
  
  // If it has some other prefix, remove it
  const numericPart = accountId.replace(/^[A-Za-z]+-?/, '').replace(/^0+/, '');
  
  // Format with leading zeros
  const formattedId = numericPart.padStart(3, '0');
  
  return `ACC-${formattedId}`;
}

/**
 * Standardize and normalize a bot ID to the proper format based on bot type
 * 
 * @param botId The bot ID to normalize
 * @param botType The type of bot
 * @returns Normalized bot ID in standard format
 */
export function standardizeBotId(botId: string, botType: BotType): string {
  if (!botId) return '';
  
  let prefix: string;
  
  switch (botType) {
    case BotType.USER_BOT:
      prefix = 'MY-';
      break;
    case BotType.PREMIUM_BOT:
      prefix = 'PRE-';
      break;
    case BotType.PROP_BOT:
      prefix = 'PROP-';
      break;
    default:
      prefix = 'BOT-';
  }
  
  // If already in correct format, return as is
  if (botId.startsWith(prefix)) return botId;
  
  // Remove any existing prefix and get numeric part
  const numericMatch = botId.match(/\d+/);
  if (!numericMatch) return `${prefix}001`; // Default if no numeric part found
  
  const numericPart = numericMatch[0];
  
  // Format with leading zeros (3 digits)
  const formattedId = numericPart.padStart(3, '0');
  
  return `${prefix}${formattedId}`;
}
