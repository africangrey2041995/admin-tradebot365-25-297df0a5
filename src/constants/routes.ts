
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
  ACCOUNTS: '/accounts',
  ACCOUNT_DETAIL: (accountId: string) => `/accounts/${accountId}`,
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
};
