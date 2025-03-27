
/**
 * Test Utilities
 * 
 * Helper functions and utilities for testing components and hooks.
 * These utilities help reduce test boilerplate and make tests more concise.
 */

import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

// Define a custom render function that wraps components with necessary providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  return render(ui, { ...options });
};

// Mock timers helper
const setupMockTimers = () => {
  jest.useFakeTimers();
  return {
    cleanup: () => {
      jest.useRealTimers();
    },
    advanceTime: (ms: number) => {
      jest.advanceTimersByTime(ms);
    }
  };
};

// Helper to create a test signal object
const createTestSignal = (overrides = {}) => {
  return {
    id: 'SIG-123',
    instrument: 'BTC/USD',
    action: 'buy',
    timestamp: new Date().toISOString(),
    status: 'processed',
    ...overrides
  };
};

// Helper to create a test date range
const createDateRange = (startDaysAgo: number, endDaysAgo: number) => {
  const now = new Date();
  const start = new Date(now);
  start.setDate(now.getDate() - startDaysAgo);
  
  const end = new Date(now);
  end.setDate(now.getDate() - endDaysAgo);
  
  return [start, end];
};

export {
  customRender as render,
  setupMockTimers,
  createTestSignal,
  createDateRange
};
