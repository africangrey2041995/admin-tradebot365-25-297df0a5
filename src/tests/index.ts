
/**
 * Master Test Runner
 * 
 * A comprehensive test suite that imports and runs all testing modules
 * for the application. This allows running all tests from a single entry point.
 */

// Import security tests
import { runAllSecurityTests } from './security/index';

// Import new test modules
import runBotDifferentiationTests from './bot-differentiation.test';
import runUserIdNormalizationTests from './user-id-normalization.test';
import runComponentIntegrationTests from './component-integration.test';
import runLoadingStatesTests from './loading-states.test';

/**
 * Run all tests in the application
 */
export const runAllTests = () => {
  console.log('==================================================');
  console.log('==== TradeBot UI Automated Test Suite v1.0.0 =====');
  console.log('==================================================\n');
  
  // Run security tests
  console.log('\n----- RUNNING SECURITY TESTS -----\n');
  runAllSecurityTests();
  
  // Run bot differentiation tests
  console.log('\n----- RUNNING BOT DIFFERENTIATION TESTS -----\n');
  runBotDifferentiationTests();
  
  // Run userId normalization tests
  console.log('\n----- RUNNING USER ID NORMALIZATION TESTS -----\n');
  runUserIdNormalizationTests();
  
  // Run component integration tests
  console.log('\n----- RUNNING COMPONENT INTEGRATION TESTS -----\n');
  runComponentIntegrationTests();
  
  // Run loading states tests
  console.log('\n----- RUNNING LOADING STATES TESTS -----\n');
  runLoadingStatesTests();
  
  console.log('\n==================================================');
  console.log('============= ALL TESTS COMPLETED ===============');
  console.log('==================================================\n');
  
  // Placeholder for future test report summary
  console.log('Test Report Summary:');
  console.log('- Security Tests: COMPLETED');
  console.log('- Bot Differentiation Tests: COMPLETED');
  console.log('- UserId Normalization Tests: COMPLETED');
  console.log('- Component Integration Tests: COMPLETED');
  console.log('- Loading States Tests: COMPLETED');
  console.log('\nNote: For detailed test results, review the console output above.');
};

/**
 * Developer helper to run a specific test suite
 */
export const runSpecificTest = (testName: string) => {
  console.log(`Running specific test suite: ${testName}`);
  
  switch (testName.toLowerCase()) {
    case 'security':
      runAllSecurityTests();
      break;
    case 'bot-differentiation':
    case 'botdifferentiation':
      runBotDifferentiationTests();
      break;
    case 'user-id':
    case 'userid':
    case 'normalization':
      runUserIdNormalizationTests();
      break;
    case 'component':
    case 'integration':
      runComponentIntegrationTests();
      break;
    case 'loading':
    case 'states':
      runLoadingStatesTests();
      break;
    default:
      console.error(`Unknown test suite: ${testName}`);
      console.log('Available test suites:');
      console.log('- security');
      console.log('- bot-differentiation');
      console.log('- user-id');
      console.log('- component');
      console.log('- loading');
  }
};

// Default export for convenient importing
export default runAllTests;
