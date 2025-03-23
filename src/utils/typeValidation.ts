
/**
 * Type validation utilities for runtime type checking
 * These utilities help ensure data objects conform to expected types
 */

import { User, Bot, Account, ExtendedSignal } from '@/types';
import { validateUserId, validateBotId } from './normalizeUserId';

/**
 * Validates if an object is a valid User
 */
export function isValidUser(obj: any): obj is User {
  if (!obj) return false;
  
  // Check required properties
  return (
    typeof obj.id === 'string' &&
    typeof obj.email === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.role === 'string' &&
    typeof obj.status === 'string' &&
    typeof obj.plan === 'string' &&
    typeof obj.createdAt === 'string' &&
    typeof obj.updatedAt === 'string' &&
    typeof obj.emailVerified === 'boolean' &&
    typeof obj.twoFactorEnabled === 'boolean' &&
    typeof obj.bots === 'number' &&
    typeof obj.joinDate === 'string'
  );
}

/**
 * Validates if an object is a valid Bot
 */
export function isValidBot(obj: any): obj is Bot {
  if (!obj) return false;
  
  // Check required properties
  return (
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.description === 'string' &&
    typeof obj.status === 'string' &&
    typeof obj.type === 'string' &&
    typeof obj.createdDate === 'string' &&
    typeof obj.lastUpdated === 'string'
  );
}

/**
 * Validates if an object is a valid Account
 */
export function isValidAccount(obj: any): obj is Account {
  if (!obj) return false;
  
  // Check required properties
  return (
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.status === 'string' &&
    typeof obj.createdDate === 'string' &&
    typeof obj.lastUpdated === 'string' &&
    typeof obj.userId === 'string' &&
    typeof obj.apiName === 'string' &&
    typeof obj.apiId === 'string' &&
    typeof obj.tradingAccount === 'string' &&
    typeof obj.tradingAccountType === 'string' &&
    typeof obj.tradingAccountBalance === 'string'
  );
}

/**
 * Validates if an object is a valid ExtendedSignal
 */
export function isValidExtendedSignal(obj: any): obj is ExtendedSignal {
  if (!obj) return false;
  
  // Check required properties
  return (
    typeof obj.id === 'string' &&
    typeof obj.action === 'string' &&
    typeof obj.instrument === 'string' &&
    typeof obj.timestamp === 'string' &&
    typeof obj.signalToken === 'string' &&
    typeof obj.maxLag === 'string' &&
    typeof obj.investmentType === 'string' &&
    typeof obj.amount === 'string' &&
    typeof obj.status === 'string'
  );
}

/**
 * Validates an ID and generates a diagnostic message
 */
export function validateId(id: string, type: 'user' | 'bot'): { valid: boolean; message: string } {
  if (!id) {
    return { valid: false, message: `${type} ID is empty` };
  }
  
  const isValid = type === 'user' ? validateUserId(id) : validateBotId(id);
  
  return {
    valid: isValid,
    message: isValid 
      ? `Valid ${type} ID format` 
      : `Invalid ${type} ID format: ${id} (should match pattern: ${type === 'user' ? 'USR-XXX or user-XXX' : 'BOT-XXX, pb-XXX, etc.'})`
  };
}
