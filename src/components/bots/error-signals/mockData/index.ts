
import { ExtendedSignal } from '@/types';
import { userBotErrors } from './userBotErrors';
import { premiumBotErrors } from './premiumBotErrors';
import { propBotErrors } from './propBotErrors';
import { adminErrors } from './adminErrors';

// Combine all mock error signals into a single array
export const mockErrorSignals: ExtendedSignal[] = [
  ...userBotErrors,
  ...premiumBotErrors,
  ...propBotErrors,
  ...adminErrors
];

// Re-export error signals by type for more granular access
export { userBotErrors, premiumBotErrors, propBotErrors, adminErrors };

// Re-export utility functions
export * from './utils';

// Export interface for backwards compatibility
export interface ErrorSignalsProps {
  botId?: string;
  limit?: number;
}
