/**
 * Test Setup File
 * 
 * This file contains global setup for the test environment.
 * It adds necessary test extensions, mocks global objects,
 * and configures the testing framework.
 */

// Add DOM testing library matchers
import '@testing-library/jest-dom';

// Mock console methods to avoid cluttering test output
// but still capture any errors during tests
global.console = {
  ...console,
  // Keep error and warn, but make other methods no-ops during tests
  log: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
  // Keep error and warn for debugging test failures
  // error: jest.fn(),
  // warn: jest.fn(),
};

// Mock timers for testing
jest.useFakeTimers();

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
});

// Reset all mocks between tests
beforeEach(() => {
  jest.resetAllMocks();
});
