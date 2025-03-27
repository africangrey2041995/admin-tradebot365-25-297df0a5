
/**
 * Signal Components Test Suite
 * 
 * Comprehensive tests for the signal components, badges, and hooks.
 * These tests verify the correct functionality of our signal tracking
 * and display components across the application.
 */

// Re-export all signal-related tests for simpler import in the test runner
export { default as runStatusBadgeTests } from '../components/StatusBadge.test';
export { default as runSignalLoadingStateTests } from '../components/SignalLoadingState.test';
export { default as runSignalFiltersTests } from '../hooks/useSignalFilters.test';
export { default as runSafeLoadingTests } from '../hooks/useSafeLoading.test';

/**
 * Run all signal component tests
 */
export const runAllSignalTests = () => {
  console.log('\n----- RUNNING STATUS BADGE TESTS -----\n');
  runStatusBadgeTests();
  
  console.log('\n----- RUNNING SIGNAL LOADING STATE TESTS -----\n');
  runSignalLoadingStateTests();
  
  console.log('\n----- RUNNING SIGNAL FILTERS HOOK TESTS -----\n');
  runSignalFiltersTests();
  
  console.log('\n----- RUNNING SAFE LOADING HOOK TESTS -----\n');
  runSafeLoadingTests();
};

export default runAllSignalTests;
