
/**
 * Enum định nghĩa các loại bot
 */
export enum BotType {
  USER_BOT = 'user_bot',
  PREMIUM_BOT = 'premium_bot',
  PROP_BOT = 'prop_bot',
  ALL_BOTS = 'all_bots' // New type for filtering all bots
}

/**
 * Enum định nghĩa mức độ rủi ro của bot
 */
export enum BotRiskLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

/**
 * Enum định nghĩa trạng thái hoạt động của bot
 */
export enum BotStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  ERROR = 'error',
  SUSPENDED = 'suspended'
}
