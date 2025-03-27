
import { BotType, BOT_ID_PREFIXES } from '@/constants/botTypes';

/**
 * Standardizes a bot ID to ensure it follows the correct format for the given bot type
 * @param botId The original bot ID
 * @param botType The type of bot
 * @returns A standardized bot ID
 */
export function standardizeBotId(botId: string, botType: BotType | string): string {
  if (!botId) return '';
  
  // Get the prefix for the bot type
  const prefix = BOT_ID_PREFIXES[botType as BotType] || '';
  
  // If the ID already has the correct prefix, return it
  if (botId.startsWith(prefix)) {
    return botId;
  }
  
  // Remove any existing prefixes
  let cleanId = botId;
  const knownPrefixes = ['MY-', 'PRE-', 'PROP-', 'pb-', 'ptb-'];
  for (const knownPrefix of knownPrefixes) {
    if (botId.startsWith(knownPrefix)) {
      cleanId = botId.substring(knownPrefix.length);
      break;
    }
  }
  
  // Add the correct prefix
  return `${prefix}${cleanId}`;
}
