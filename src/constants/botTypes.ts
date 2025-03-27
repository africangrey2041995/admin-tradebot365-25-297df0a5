
/**
 * Định nghĩa các loại bot và định dạng ID
 */

// Enum để quản lý các loại bot
export type BotType = 'USER_BOT' | 'PREMIUM_BOT' | 'PROP_BOT' | 'user' | 'premium' | 'prop' | 'momentum' | 'grid' | 'FTMO' | 'FundedNext' | 'Coinstrat Pro';

// Legacy enum values for backward compatibility
export enum BotTypeEnum {
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
export const BOT_ID_PREFIXES: Record<string, string> = {
  'USER_BOT': 'MY-', // Bot người dùng: MY-001, MY-002
  'PREMIUM_BOT': 'PRE-', // Premium bots: PRE-001, PRE-002
  'PROP_BOT': 'PROP-', // Prop trading bots: PROP-001, PROP-002
  'user': 'MY-',
  'premium': 'PRE-',
  'prop': 'PROP-'
};

// Cấu trúc thể hiện mối quan hệ giữa tiền tố ID và loại bot
export const ID_PREFIX_TO_BOT_TYPE: Record<string, BotType> = {
  'MY-': 'USER_BOT',
  'PRE-': 'PREMIUM_BOT',
  'PROP-': 'PROP_BOT',
  'pb-': 'PREMIUM_BOT', // Xử lý cả các định dạng ID cũ
  'ptb-': 'PROP_BOT', // Xử lý cả các định dạng ID cũ
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
export const BOT_TYPE_DISPLAY: Record<string, string> = {
  'USER_BOT': 'Bot Người Dùng',
  'PREMIUM_BOT': 'Bot Premium',
  'PROP_BOT': 'Bot Prop Trading',
  'user': 'Bot Người Dùng',
  'premium': 'Bot Premium',
  'prop': 'Bot Prop Trading',
  'momentum': 'Momentum',
  'grid': 'Grid',
  'FTMO': 'FTMO',
  'FundedNext': 'FundedNext',
  'Coinstrat Pro': 'Coinstrat Pro'
};
