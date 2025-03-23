
/**
 * User ID Normalization Tests
 * 
 * Tests to ensure userId normalization works consistently across different formats
 * and is correctly applied in data filtering operations.
 */

import { normalizeUserId } from '@/utils/normalizeUserId';

/**
 * Test basic normalization functionality
 */
export const testBasicNormalization = () => {
  console.log('\nTesting Basic UserId Normalization:');
  
  const testCases = [
    { input: 'USR-001', expected: 'USR001' },
    { input: 'USR001', expected: 'USR001' },
    { input: 'usr-001', expected: 'USR001' },
    { input: 'usr001', expected: 'USR001' },
    { input: 'U-S-R-0-0-1', expected: 'USR001' },
    { input: 'User-ID-123', expected: 'USERID123' },
    { input: '', expected: '' }, // Empty string test
  ];
  
  testCases.forEach(test => {
    const result = normalizeUserId(test.input);
    console.log(`  Input: "${test.input}" → Output: "${result}"`);
    
    if (result === test.expected) {
      console.log(`  ✅ Passed: "${test.input}" correctly normalized to "${result}"`);
    } else {
      console.error(`  ❌ Failed: "${test.input}" should normalize to "${test.expected}" but got "${result}"`);
    }
  });
};

/**
 * Test edge cases
 */
export const testEdgeCases = () => {
  console.log('\nTesting UserId Normalization Edge Cases:');
  
  // Test with null/undefined (should handle gracefully)
  try {
    // @ts-ignore - Testing with null for robustness
    const nullResult = normalizeUserId(null);
    console.log(`  ⚠️ Null input → "${nullResult}"`);
    console.log(`  ✅ Passed: Function handled null without crashing`);
  } catch (error) {
    console.error(`  ❌ Failed: Function threw error with null input: ${error}`);
  }
  
  try {
    // @ts-ignore - Testing with undefined for robustness
    const undefinedResult = normalizeUserId(undefined);
    console.log(`  ⚠️ Undefined input → "${undefinedResult}"`);
    console.log(`  ✅ Passed: Function handled undefined without crashing`);
  } catch (error) {
    console.error(`  ❌ Failed: Function threw error with undefined input: ${error}`);
  }
  
  // Test with special characters
  const specialChars = normalizeUserId('USR-001!@#$%^&*()');
  console.log(`  Special characters: "USR-001!@#$%^&*()" → "${specialChars}"`);
  
  // Test with very long input
  const longInput = 'USR-' + '0'.repeat(1000);
  const longResult = normalizeUserId(longInput);
  console.log(`  Long input (${longInput.length} chars) → Output (${longResult.length} chars)`);
};

/**
 * Test filtering with normalized IDs
 */
export const testFilteringWithNormalizedIds = () => {
  console.log('\nTesting Data Filtering with Normalized UserIds:');
  
  // Mock data with mixed ID formats
  const mockData = [
    { id: 1, name: 'Item 1', userId: 'USR-001' },
    { id: 2, name: 'Item 2', userId: 'USR001' },
    { id: 3, name: 'Item 3', userId: 'usr-001' },
    { id: 4, name: 'Item 4', userId: 'usr001' },
    { id: 5, name: 'Item 5', userId: 'USR-002' },
    { id: 6, name: 'Item 6', userId: 'USR002' },
  ];
  
  // Different search input formats
  const testSearches = ['USR-001', 'USR001', 'usr-001', 'usr001'];
  
  testSearches.forEach(searchId => {
    console.log(`  Searching with ID: "${searchId}"`);
    
    // Filter without normalization
    const directFilterResults = mockData.filter(item => item.userId === searchId);
    console.log(`  Direct comparison found ${directFilterResults.length} items`);
    
    // Filter with normalization
    const normalizedFilterResults = mockData.filter(
      item => normalizeUserId(item.userId) === normalizeUserId(searchId)
    );
    console.log(`  Normalized comparison found ${normalizedFilterResults.length} items`);
    
    if (normalizedFilterResults.length === 4) {
      console.log(`  ✅ Passed: Normalized filtering correctly found 4 matching items for "${searchId}"`);
    } else {
      console.error(`  ❌ Failed: Normalized filtering should find 4 items but found ${normalizedFilterResults.length}`);
    }
  });
  
  // Test with a different user ID
  const differentId = 'USR-002';
  const differentResults = mockData.filter(
    item => normalizeUserId(item.userId) === normalizeUserId(differentId)
  );
  
  if (differentResults.length === 2) {
    console.log(`  ✅ Passed: Normalized filtering correctly found 2 matching items for "${differentId}"`);
  } else {
    console.error(`  ❌ Failed: Normalized filtering should find 2 items but found ${differentResults.length}`);
  }
};

/**
 * Run all userId normalization tests
 */
export const runUserIdNormalizationTests = () => {
  console.log('======= UserId Normalization Tests =======');
  
  testBasicNormalization();
  testEdgeCases();
  testFilteringWithNormalizedIds();
  
  console.log('======= UserId Normalization Tests Complete =======\n');
};

export default runUserIdNormalizationTests;
