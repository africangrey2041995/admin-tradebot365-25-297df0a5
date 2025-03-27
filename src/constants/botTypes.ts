
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
  SUSPENDED = 'suspended',
  MAINTENANCE = 'maintenance' // Added MAINTENANCE status
}

/**
 * Mapping BotStatus to display text
 */
export const BOT_STATUS_DISPLAY: Record<BotStatus, string> = {
  [BotStatus.ACTIVE]: 'Hoạt động',
  [BotStatus.INACTIVE]: 'Không hoạt động',
  [BotStatus.PENDING]: 'Đang chờ',
  [BotStatus.ERROR]: 'Lỗi',
  [BotStatus.SUSPENDED]: 'Tạm ngưng',
  [BotStatus.MAINTENANCE]: 'Bảo trì'
};

/**
 * Mapping BotRiskLevel to display text
 */
export const BOT_RISK_DISPLAY: Record<BotRiskLevel, string> = {
  [BotRiskLevel.LOW]: 'Thấp',
  [BotRiskLevel.MEDIUM]: 'Trung bình',
  [BotRiskLevel.HIGH]: 'Cao'
};

/**
 * Mapping Bot ID prefixes to BotType
 */
export const BOT_ID_PREFIXES: Record<BotType, string> = {
  [BotType.USER_BOT]: 'MY-',
  [BotType.PREMIUM_BOT]: 'PRE-',
  [BotType.PROP_BOT]: 'PROP-',
  [BotType.ALL_BOTS]: '' // Empty prefix for ALL_BOTS
};

/**
 * Mapping prefix to bot type
 */
export const ID_PREFIX_TO_BOT_TYPE: Record<string, BotType> = {
  'MY-': BotType.USER_BOT,
  'PRE-': BotType.PREMIUM_BOT,
  'PROP-': BotType.PROP_BOT
};
