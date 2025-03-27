
/**
 * Định nghĩa các loại bot và định dạng ID
 */

// Enum để quản lý các loại bot
export enum BotType {
  USER_BOT = 'USER_BOT',
  PREMIUM_BOT = 'PREMIUM_BOT',
  PROP_BOT = 'PROP_BOT',
  // Additional values used in the codebase
  MOMENTUM = 'momentum',
  GRID = 'grid',
  FTMO = 'FTMO',
  FUNDEDNEXT = 'FundedNext',
  COINSTRAT_PRO = 'Coinstrat Pro'
}

// Cấu trúc ID prefix cho mỗi loại bot
export const BOT_ID_PREFIXES = {
  [BotType.USER_BOT]: 'MY-', // Bot người dùng: MY-001, MY-002
  [BotType.PREMIUM_BOT]: 'PRE-', // Premium bots: PRE-001, PRE-002
  [BotType.PROP_BOT]: 'PROP-', // Prop trading bots: PROP-001, PROP-002
};

// Cấu trúc thể hiện mối quan hệ giữa tiền tố ID và loại bot
export const ID_PREFIX_TO_BOT_TYPE: Record<string, BotType> = {
  'MY-': BotType.USER_BOT,
  'PRE-': BotType.PREMIUM_BOT,
  'PROP-': BotType.PROP_BOT,
  'pb-': BotType.PREMIUM_BOT, // Xử lý cả các định dạng ID cũ
  'ptb-': BotType.PROP_BOT, // Xử lý cả các định dạng ID cũ
};

// Trạng thái hoạt động của bot
export enum BotStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  MAINTENANCE = 'maintenance',
  ERROR = 'error',
  SUSPENDED = 'suspended'
}

// Định dạng hiển thị trạng thái bot
export const BOT_STATUS_DISPLAY: Record<BotStatus, string> = {
  [BotStatus.ACTIVE]: 'Hoạt động',
  [BotStatus.INACTIVE]: 'Không hoạt động',
  [BotStatus.MAINTENANCE]: 'Bảo trì',
  [BotStatus.ERROR]: 'Lỗi',
  [BotStatus.SUSPENDED]: 'Đã khóa'
};

// Các loại rủi ro của bot
export enum BotRiskLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

// Định dạng hiển thị mức độ rủi ro
export const BOT_RISK_DISPLAY: Record<BotRiskLevel, string> = {
  [BotRiskLevel.LOW]: 'Thấp',
  [BotRiskLevel.MEDIUM]: 'Trung bình',
  [BotRiskLevel.HIGH]: 'Cao'
};

// Định dạng hiển thị loại bot
export const BOT_TYPE_DISPLAY: Record<BotType, string> = {
  [BotType.USER_BOT]: 'Bot Người Dùng',
  [BotType.PREMIUM_BOT]: 'Bot Premium',
  [BotType.PROP_BOT]: 'Bot Prop Trading',
  [BotType.MOMENTUM]: 'Momentum',
  [BotType.GRID]: 'Grid',
  [BotType.FTMO]: 'FTMO',
  [BotType.FUNDEDNEXT]: 'FundedNext',
  [BotType.COINSTRAT_PRO]: 'Coinstrat Pro'
};
