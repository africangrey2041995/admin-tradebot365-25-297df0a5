
/**
 * Test Runner Utility
 * 
 * A developer utility script to run tests from the command line.
 * This can be executed directly via Node.js or as an npm script.
 * 
 * Example usage:
 * - npm run test                      # Run all tests
 * - npm run test security             # Run security tests only
 * - npm run test bot-differentiation  # Run bot differentiation tests only
 * - npm run test signals              # Run signal component tests only
 */

import { runAllTests, runSpecificTest } from './index';

// Get command line arguments
const args = process.argv.slice(2);
const testName = args[0];

if (testName) {
  // Run a specific test suite if provided
  console.log(`Running test suite: ${testName}`);
  runSpecificTest(testName);
} else {
  // Run all tests if no specific test is provided
  console.log('Running all tests...');
  runAllTests();
}

// Future enhancement: Add ability to generate HTML or JSON reports
// Future enhancement: Add ability to run tests in parallel
// Future enhancement: Add ability to filter tests by tag
