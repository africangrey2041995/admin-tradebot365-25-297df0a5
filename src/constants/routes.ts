
/**
 * Định nghĩa các đường dẫn cho ứng dụng
 */

// User Routes
export const USER_ROUTES = {
  HOME: '/',
  BOTS: '/bots',
  BOT_DETAIL: (botId: string) => `/bots/${botId}`,
  PREMIUM_BOTS: '/premium-bots',
  PREMIUM_BOT_DETAIL: (botId: string) => `/premium-bots/${botId}`,
  INTEGRATED_PREMIUM_BOTS: '/integrated-premium-bots',
  INTEGRATED_PREMIUM_BOT_DETAIL: (botId: string) => `/integrated-premium-bots/${botId}`,
  PROP_BOTS: '/prop-trading-bots',
  PROP_BOT_DETAIL: (botId: string) => `/prop-trading-bots/${botId}`,
  INTEGRATED_PROP_BOTS: '/integrated-prop-bots',
  INTEGRATED_PROP_BOT_DETAIL: (botId: string) => `/integrated-prop-bots/${botId}`,
  BOT_ERRORS: '/bot-errors', // Add new route for Bot Errors
  ACCOUNTS: '/accounts',
  ACCOUNT_DETAIL: (accountId: string) => `/accounts/${accountId}`,
  SETTINGS: '/settings',
  PROFILE: '/profile',
  SIGNALS: '/signals',
  CONNECTIONS: '/connections',
};

// Admin Routes
export const ADMIN_ROUTES = {
  DASHBOARD: '/admin',
  USERS: '/admin/users',
  USER_DETAIL: (userId: string) => `/admin/users/${userId}`,
  BOTS: '/admin/bots',
  BOT_ERRORS: '/admin/bot-errors',
  PREMIUM_BOTS: '/admin/premium-bots',
  PREMIUM_BOT_DETAIL: (botId: string) => `/admin/premium-bots/${botId}`,
  PROP_BOTS: '/admin/prop-bots',
  PROP_BOT_DETAIL: (botId: string) => `/admin/prop-bots/${botId}`,
  USER_BOTS: '/admin/user-bots',
  USER_BOT_DETAIL: (botId: string) => `/admin/user-bots/${botId}`,
  ADMIN_MANAGEMENT: '/admin/admin-management',
  SYSTEM_LOGS: '/admin/logs',
  PACKAGES: '/admin/packages', // Add missing PACKAGES route
  LOGS: '/admin/logs', // Add missing LOGS route explicitly
  NOTIFICATIONS: '/admin/notifications',
  EMAIL: '/admin/email',
  DATABASE: '/admin/database',
  SETTINGS: '/admin/settings',
};

// Shared Routes (common routes with same structure for both admin and user)
export const SHARED_ROUTES = {
  BOT_DETAIL: (isAdmin: boolean, botType: string, botId: string) => {
    if (isAdmin) {
      switch (botType) {
        case 'premium': return ADMIN_ROUTES.PREMIUM_BOT_DETAIL(botId);
        case 'prop': return ADMIN_ROUTES.PROP_BOT_DETAIL(botId);
        default: return ADMIN_ROUTES.USER_BOT_DETAIL(botId);
      }
    } else {
      switch (botType) {
        case 'premium': return USER_ROUTES.PREMIUM_BOT_DETAIL(botId);
        case 'prop': return USER_ROUTES.PROP_BOT_DETAIL(botId);
        default: return USER_ROUTES.BOT_DETAIL(botId);
      }
    }
  },
  SETTINGS: (isAdmin: boolean) => isAdmin ? ADMIN_ROUTES.SETTINGS : USER_ROUTES.SETTINGS,
};
