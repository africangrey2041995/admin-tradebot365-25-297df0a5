
/**
 * Định nghĩa các endpoint API
 */

// Base URL - có thể thay đổi dựa trên môi trường
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.tradebot365.com';

// User Endpoints
export const USER_API = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  PROFILE: `${API_BASE_URL}/auth/profile`,
  UPDATE_PROFILE: `${API_BASE_URL}/users/profile`,
  CHANGE_PASSWORD: `${API_BASE_URL}/users/change-password`,
  RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
  VERIFY_EMAIL: `${API_BASE_URL}/auth/verify-email`,
};

// Bot Endpoints
export const BOT_API = {
  USER_BOTS: `${API_BASE_URL}/bots/user`,
  PREMIUM_BOTS: `${API_BASE_URL}/bots/premium`,
  PROP_BOTS: `${API_BASE_URL}/bots/prop`,
  BOT_DETAIL: (botId: string) => `${API_BASE_URL}/bots/${botId}`,
  CREATE_BOT: `${API_BASE_URL}/bots`,
  UPDATE_BOT: (botId: string) => `${API_BASE_URL}/bots/${botId}`,
  DELETE_BOT: (botId: string) => `${API_BASE_URL}/bots/${botId}`,
};

// Account Endpoints
export const ACCOUNT_API = {
  LIST: `${API_BASE_URL}/accounts`,
  DETAIL: (accountId: string) => `${API_BASE_URL}/accounts/${accountId}`,
  CREATE: `${API_BASE_URL}/accounts`,
  UPDATE: (accountId: string) => `${API_BASE_URL}/accounts/${accountId}`,
  DELETE: (accountId: string) => `${API_BASE_URL}/accounts/${accountId}`,
  CONNECT: (accountId: string) => `${API_BASE_URL}/accounts/${accountId}/connect`,
  DISCONNECT: (accountId: string) => `${API_BASE_URL}/accounts/${accountId}/disconnect`,
};

// Signals Endpoints
export const SIGNAL_API = {
  LIST: `${API_BASE_URL}/signals`,
  DETAIL: (signalId: string) => `${API_BASE_URL}/signals/${signalId}`,
  ERROR_SIGNALS: `${API_BASE_URL}/signals/errors`,
};

// Admin Endpoints
export const ADMIN_API = {
  USERS: {
    LIST: `${API_BASE_URL}/admin/users`,
    DETAIL: (userId: string) => `${API_BASE_URL}/admin/users/${userId}`,
    CREATE: `${API_BASE_URL}/admin/users`,
    UPDATE: (userId: string) => `${API_BASE_URL}/admin/users/${userId}`,
    DELETE: (userId: string) => `${API_BASE_URL}/admin/users/${userId}`,
    SUSPEND: (userId: string) => `${API_BASE_URL}/admin/users/${userId}/suspend`,
    ACTIVATE: (userId: string) => `${API_BASE_URL}/admin/users/${userId}/activate`,
  },
  BOTS: {
    PREMIUM: `${API_BASE_URL}/admin/bots/premium`,
    PROP: `${API_BASE_URL}/admin/bots/prop`,
    USER: `${API_BASE_URL}/admin/bots/user`,
    DETAIL: (botId: string) => `${API_BASE_URL}/admin/bots/${botId}`,
    CREATE: `${API_BASE_URL}/admin/bots`,
    UPDATE: (botId: string) => `${API_BASE_URL}/admin/bots/${botId}`,
    DELETE: (botId: string) => `${API_BASE_URL}/admin/bots/${botId}`,
  },
  PACKAGES: {
    LIST: `${API_BASE_URL}/admin/packages`,
    DETAIL: (packageId: string) => `${API_BASE_URL}/admin/packages/${packageId}`,
    CREATE: `${API_BASE_URL}/admin/packages`,
    UPDATE: (packageId: string) => `${API_BASE_URL}/admin/packages/${packageId}`,
    DELETE: (packageId: string) => `${API_BASE_URL}/admin/packages/${packageId}`,
    ACTIVATE: (packageId: string) => `${API_BASE_URL}/admin/packages/${packageId}/activate`,
    DEACTIVATE: (packageId: string) => `${API_BASE_URL}/admin/packages/${packageId}/deactivate`,
  },
  LOGS: `${API_BASE_URL}/admin/logs`,
  DASHBOARD: `${API_BASE_URL}/admin/dashboard`,
  ERROR_SIGNALS: `${API_BASE_URL}/admin/signals/errors`,
};
