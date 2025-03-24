
import { ExtendedSignal } from '@/types';

// Current date
export const now = new Date();

// Helper to generate dates in the past
export const daysAgo = (days: number) => {
  const date = new Date(now);
  date.setDate(date.getDate() - days);
  return date.toISOString();
};

// Helper to generate random hours ago
export const hoursAgo = (hours: number) => {
  const date = new Date(now);
  date.setHours(date.getHours() - hours);
  return date.toISOString();
};

// Generate a random Coinstrat Log ID
export const generateCoinstratLogId = (prefix = 'CL') => {
  const randomPart = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  return `${prefix}-${randomPart}`;
};

// Generate random account ID
export const generateAccountId = () => {
  return Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
};
