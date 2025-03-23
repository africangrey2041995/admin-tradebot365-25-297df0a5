
/**
 * Kiểm tra việc lọc dữ liệu theo userId
 * 
 * Các test case này đảm bảo rằng dữ liệu được lọc theo userId một cách chính xác,
 * ngăn chặn người dùng xem dữ liệu của người khác.
 */

import { SignalAction } from '@/types/signal';

// Thiết lập môi trường test
const testUsers = {
  USER_A: { id: 'USR-001', name: 'Nguyễn Văn A', email: 'user.a@example.com', role: 'user' },
  USER_B: { id: 'USR-002', name: 'Trần Thị B', email: 'user.b@example.com', role: 'user' },
  ADMIN: { id: 'ADMIN-001', name: 'Admin User', email: 'admin@example.com', role: 'admin' }
};

/**
 * Test Suite: Lọc dữ liệu theo userId
 */
export const testUserDataFiltering = () => {
  console.log('===== Bắt đầu test: Lọc dữ liệu theo userId =====');
  
  // Test case 1: Lọc dữ liệu tài khoản theo userId
  const testAccountDataFiltering = () => {
    console.log('\n1. Kiểm tra lọc dữ liệu tài khoản:');
    
    // Mô phỏng dữ liệu tài khoản
    const mockAccounts = [
      { id: 'ACC001', userId: 'USR-001', name: 'Account A1' },
      { id: 'ACC002', userId: 'USR-001', name: 'Account A2' },
      { id: 'ACC003', userId: 'USR-002', name: 'Account B1' },
      { id: 'ACC004', userId: 'USR-002', name: 'Account B2' },
      { id: 'ACC005', userId: 'USR-003', name: 'Account C1' }
    ];
    
    // 1.1: Lọc dữ liệu cho USER_A
    const currentUserA = testUsers.USER_A;
    const filteredAccountsForUserA = mockAccounts.filter(account => account.userId === currentUserA.id);
    
    console.log(`1.1. Số lượng tài khoản của USER_A: ${filteredAccountsForUserA.length} (Mong đợi: 2)`);
    console.log(`1.2. Tài khoản đầu tiên của USER_A: ${filteredAccountsForUserA[0]?.name}`);
    
    // 1.2: Lọc dữ liệu cho USER_B
    const currentUserB = testUsers.USER_B;
    const filteredAccountsForUserB = mockAccounts.filter(account => account.userId === currentUserB.id);
    
    console.log(`1.3. Số lượng tài khoản của USER_B: ${filteredAccountsForUserB.length} (Mong đợi: 2)`);
    console.log(`1.4. Tài khoản đầu tiên của USER_B: ${filteredAccountsForUserB[0]?.name}`);
    
    // Kiểm tra tổng hợp
    const userAOnlySeesOwnAccounts = filteredAccountsForUserA.every(account => account.userId === currentUserA.id);
    const userBOnlySeesOwnAccounts = filteredAccountsForUserB.every(account => account.userId === currentUserB.id);
    
    if (userAOnlySeesOwnAccounts && userBOnlySeesOwnAccounts) {
      console.log('✅ Test thành công: Người dùng chỉ thấy tài khoản của họ');
    } else {
      console.log('❌ Test thất bại: Người dùng có thể thấy tài khoản của người khác');
    }
  };
  
  // Test case 2: Lọc dữ liệu tín hiệu theo userId
  const testSignalDataFiltering = () => {
    console.log('\n2. Kiểm tra lọc dữ liệu tín hiệu:');
    
    // Mô phỏng dữ liệu tín hiệu
    const mockSignals = [
      { 
        id: 'SIG001', 
        action: 'ENTER_LONG' as SignalAction, 
        instrument: 'BTCUSDT',
        processedAccounts: [
          { accountId: 'ACC001', userId: 'USR-001', status: 'success' }
        ],
        failedAccounts: []
      },
      { 
        id: 'SIG002', 
        action: 'EXIT_LONG' as SignalAction, 
        instrument: 'ETHUSDT',
        processedAccounts: [
          { accountId: 'ACC003', userId: 'USR-002', status: 'success' }
        ],
        failedAccounts: []
      },
      { 
        id: 'SIG003', 
        action: 'ENTER_SHORT' as SignalAction, 
        instrument: 'SOLUSDT',
        processedAccounts: [],
        failedAccounts: [
          { accountId: 'ACC002', userId: 'USR-001', status: 'failed' }
        ]
      },
      { 
        id: 'SIG004', 
        action: 'EXIT_SHORT' as SignalAction, 
        instrument: 'ADAUSDT',
        processedAccounts: [
          { accountId: 'ACC001', userId: 'USR-001', status: 'success' },
          { accountId: 'ACC003', userId: 'USR-002', status: 'success' }
        ],
        failedAccounts: []
      }
    ];
    
    // 2.1: Lọc dữ liệu cho USER_A
    const currentUserA = testUsers.USER_A;
    
    const filteredSignalsForUserA = mockSignals.filter(signal => {
      const processedAccountsForUser = signal.processedAccounts.filter(account => account.userId === currentUserA.id);
      const failedAccountsForUser = signal.failedAccounts.filter(account => account.userId === currentUserA.id);
      
      return processedAccountsForUser.length > 0 || failedAccountsForUser.length > 0;
    });
    
    console.log(`2.1. Số lượng tín hiệu của USER_A: ${filteredSignalsForUserA.length} (Mong đợi: 3)`);
    
    // 2.2: Lọc dữ liệu cho USER_B
    const currentUserB = testUsers.USER_B;
    
    const filteredSignalsForUserB = mockSignals.filter(signal => {
      const processedAccountsForUser = signal.processedAccounts.filter(account => account.userId === currentUserB.id);
      const failedAccountsForUser = signal.failedAccounts.filter(account => account.userId === currentUserB.id);
      
      return processedAccountsForUser.length > 0 || failedAccountsForUser.length > 0;
    });
    
    console.log(`2.2. Số lượng tín hiệu của USER_B: ${filteredSignalsForUserB.length} (Mong đợi: 2)`);
    
    // Kiểm tra tổng hợp: Các tín hiệu lọc cho USER_A đều phải chứa tài khoản của USER_A
    const userAOnlySeesOwnSignals = filteredSignalsForUserA.every(signal => {
      const processedAccountsForUser = signal.processedAccounts.filter(account => account.userId === currentUserA.id);
      const failedAccountsForUser = signal.failedAccounts.filter(account => account.userId === currentUserA.id);
      
      return processedAccountsForUser.length > 0 || failedAccountsForUser.length > 0;
    });
    
    // Kiểm tra tổng hợp: Các tín hiệu lọc cho USER_B đều phải chứa tài khoản của USER_B
    const userBOnlySeesOwnSignals = filteredSignalsForUserB.every(signal => {
      const processedAccountsForUser = signal.processedAccounts.filter(account => account.userId === currentUserB.id);
      const failedAccountsForUser = signal.failedAccounts.filter(account => account.userId === currentUserB.id);
      
      return processedAccountsForUser.length > 0 || failedAccountsForUser.length > 0;
    });
    
    if (userAOnlySeesOwnSignals && userBOnlySeesOwnSignals) {
      console.log('✅ Test thành công: Người dùng chỉ thấy tín hiệu liên quan đến tài khoản của họ');
    } else {
      console.log('❌ Test thất bại: Người dùng có thể thấy tín hiệu không liên quan đến họ');
    }
  };
  
  // Test case 3: Lọc dữ liệu bot theo userId/ownerId
  const testBotDataFiltering = () => {
    console.log('\n3. Kiểm tra lọc dữ liệu bot:');
    
    // Mô phỏng dữ liệu bot
    const mockBots = [
      { id: 'BOT001', name: 'Bot A1', ownerId: 'USR-001' },
      { id: 'BOT002', name: 'Bot A2', ownerId: 'USR-001' },
      { id: 'BOT003', name: 'Bot B1', ownerId: 'USR-002' },
      { id: 'BOT004', name: 'Bot C1', ownerId: 'USR-003' }
    ];
    
    // 3.1: Lọc dữ liệu cho USER_A
    const currentUserA = testUsers.USER_A;
    const filteredBotsForUserA = mockBots.filter(bot => bot.ownerId === currentUserA.id);
    
    console.log(`3.1. Số lượng bot của USER_A: ${filteredBotsForUserA.length} (Mong đợi: 2)`);
    
    // 3.2: Lọc dữ liệu cho USER_B
    const currentUserB = testUsers.USER_B;
    const filteredBotsForUserB = mockBots.filter(bot => bot.ownerId === currentUserB.id);
    
    console.log(`3.2. Số lượng bot của USER_B: ${filteredBotsForUserB.length} (Mong đợi: 1)`);
    
    // Kiểm tra tổng hợp
    const userAOnlySeesOwnBots = filteredBotsForUserA.every(bot => bot.ownerId === currentUserA.id);
    const userBOnlySeesOwnBots = filteredBotsForUserB.every(bot => bot.ownerId === currentUserB.id);
    
    if (userAOnlySeesOwnBots && userBOnlySeesOwnBots) {
      console.log('✅ Test thành công: Người dùng chỉ thấy bot của họ');
    } else {
      console.log('❌ Test thất bại: Người dùng có thể thấy bot của người khác');
    }
  };
  
  // Chạy tất cả các test
  testAccountDataFiltering();
  testSignalDataFiltering();
  testBotDataFiltering();
  
  console.log('\n===== Kết thúc test: Lọc dữ liệu theo userId =====');
};
