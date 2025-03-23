
/**
 * Điểm vào cho tất cả các test case bảo mật
 */

import { testUserDataFiltering } from './data-filtering.test';
import { testBotAccessControl } from './bot-access-control.test';
import { testAdminRouteProtection } from './admin-route-protection.test';
import { testSensitiveInformationLeakage } from './sensitive-info-leakage.test';

// Chạy tất cả các test case bảo mật
export const runAllSecurityTests = () => {
  console.log('======= Bắt đầu chạy các test case bảo mật =======');
  
  console.log('\n1. Kiểm tra lọc dữ liệu theo userId:');
  testUserDataFiltering();
  
  console.log('\n2. Kiểm tra kiểm soát truy cập Bot:');
  testBotAccessControl();
  
  console.log('\n3. Kiểm tra bảo vệ route admin:');
  testAdminRouteProtection();
  
  console.log('\n4. Kiểm tra rò rỉ thông tin nhạy cảm:');
  testSensitiveInformationLeakage();
  
  console.log('\n======= Hoàn thành các test case bảo mật =======');
};

export default runAllSecurityTests;
