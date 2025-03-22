
/**
 * Định nghĩa các loại bot và định dạng ID
 */

// Enum để quản lý các loại bot
export enum BotType {
  USER_BOT = 'USER_BOT',
  PREMIUM_BOT = 'PREMIUM_BOT',
  PROP_BOT = 'PROP_BOT',
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
