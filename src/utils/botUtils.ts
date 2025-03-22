
import { BotType, BOT_ID_PREFIXES, ID_PREFIX_TO_BOT_TYPE } from '@/constants/botTypes';

/**
 * Xác định loại bot dựa trên ID
 * @param botId ID của bot cần kiểm tra
 * @returns Loại bot tương ứng hoặc undefined nếu không xác định được
 */
export function determineBotType(botId: string): BotType | undefined {
  if (!botId) return undefined;
  
  // Kiểm tra từng prefix để xác định loại bot
  for (const [prefix, botType] of Object.entries(ID_PREFIX_TO_BOT_TYPE)) {
    if (botId.startsWith(prefix)) {
      return botType;
    }
  }
  
  // Nếu không tìm thấy prefix phù hợp, thử đoán dựa trên định dạng khác
  if (botId.includes('premium') || botId.includes('Premium')) {
    return BotType.PREMIUM_BOT;
  } else if (botId.includes('prop') || botId.includes('Prop')) {
    return BotType.PROP_BOT;
  }
  
  // Mặc định xem như user bot nếu không xác định được
  return BotType.USER_BOT;
}

/**
 * Chuẩn hóa ID bot theo định dạng mới
 * @param botId ID ban đầu của bot
 * @param type Loại bot (nếu đã biết)
 * @returns ID chuẩn hóa theo định dạng mới
 */
export function normalizeBotId(botId: string, type?: BotType): string {
  if (!botId) return '';
  
  // Nếu ID đã có tiền tố hợp lệ, giữ nguyên
  for (const prefix of Object.values(BOT_ID_PREFIXES)) {
    if (botId.startsWith(prefix)) {
      return botId;
    }
  }
  
  // Nếu không có tiền tố, thêm tiền tố dựa vào loại
  const botType = type || determineBotType(botId);
  if (!botType) return botId; // Không thể xác định loại, giữ nguyên ID
  
  // Loại bỏ các tiền tố cũ nếu có
  let cleanId = botId;
  for (const prefix of Object.keys(ID_PREFIX_TO_BOT_TYPE)) {
    if (cleanId.startsWith(prefix)) {
      cleanId = cleanId.substring(prefix.length);
      break;
    }
  }
  
  // Thêm tiền tố mới
  return `${BOT_ID_PREFIXES[botType]}${cleanId}`;
}

/**
 * Kiểm tra xem một ID có phải là ID hợp lệ cho loại bot cụ thể không
 * @param botId ID cần kiểm tra
 * @param expectedType Loại bot mong đợi
 * @returns true nếu ID phù hợp với loại bot mong đợi
 */
export function isValidBotId(botId: string, expectedType: BotType): boolean {
  if (!botId) return false;
  
  const actualType = determineBotType(botId);
  return actualType === expectedType;
}

/**
 * In log thông tin bot ID để debug
 * @param botId ID cần kiểm tra
 * @param context Thông tin bổ sung để debug
 */
export function logBotIdInfo(botId: string, context: string = ''): void {
  console.log(`[Bot ID Debug] ${context} - ID: ${botId}`);
  console.log(`  - Type: ${determineBotType(botId) || 'Unknown'}`);
  console.log(`  - Normalized: ${normalizeBotId(botId)}`);
}
