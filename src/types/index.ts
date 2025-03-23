
// Re-export all type definitions for convenient access
export * from './user';
export * from './bot';
export * from './account';
export * from './signal';
export * from './connection';
export * from './admin-types';

// Re-export bot-related enums from constants for convenience
export { BotRiskLevel, BotType, BotStatus } from '@/constants/botTypes';
export { UserRole, UserStatus, UserPlan } from '@/constants/userConstants';

/**
 * System-wide types
 */

// Log hoạt động hệ thống
export interface ActivityLog {
  id: string;
  type: 'user_registration' | 'user_login' | 'admin_login' | 'admin_action' | 'bot_action' | 'system';
  action: string;
  userId?: string;
  userName?: string;
  userEmail?: string;
  botId?: string;
  ipAddress?: string;
  timestamp: string;
  details: string;
  severity: 'info' | 'warning' | 'error';
}

// Thông báo hệ thống
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'warning' | 'error' | 'success';
  link?: string;
  linkText?: string;
  source: 'system' | 'bot' | 'user' | 'admin';
  sourceId?: string;
}

// Thống kê hệ thống
export interface SystemStats {
  totalUsers: number;
  activeUsers: number;
  totalBots: number;
  activeBots: number;
  totalAccounts: number;
  connectedAccounts: number;
  totalTrades: number;
  successfulTrades: number;
  failedTrades: number;
  systemLoad: number;
  uptime: string;
  lastUpdated: string;
}

// Thông tin phiên bản
export interface VersionInfo {
  version: string;
  buildNumber: string;
  releaseDate: string;
  environment: 'development' | 'staging' | 'production';
  features: string[];
  changelog: string[];
}

// Package definition - based on existing UserPlan and USER_PLAN_LIMITS
export interface Package {
  id: string;
  planId: UserPlan;
  name: string;
  description: string;
  features: string[];
  limits: {
    bots: number;
    accounts: number;
  };
  pricing: {
    monthly: number;
    quarterly: number;
    yearly: number;
    currency: string;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  isPopular?: boolean;
  isEnterprise?: boolean;
}

// Type validation utility
export function validateUserId(userId: string): boolean {
  // Check if userId follows the standardized format (e.g., 'USR-XXX', 'user-XXX', etc.)
  return /^(USR-|user-)\w+$/i.test(userId);
}

// Helper to normalize user IDs to consistent format
export function normalizeUserId(userId: string | undefined): string {
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
