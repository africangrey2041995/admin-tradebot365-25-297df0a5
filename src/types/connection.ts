
/**
 * Định nghĩa các types liên quan đến kết nối
 */

// Trạng thái kết nối
export type ConnectionStatus = 'Connected' | 'Disconnected' | 'Pending';

// Loại tài khoản giao dịch
export type TradingAccountType = 'Live' | 'Demo' | 'Practice';

// Trạng thái sức khỏe kết nối
export type HealthStatus = 'healthy' | 'warning' | 'critical';

// Thông tin kết nối
export interface Connection {
  accountId: string;
  connectionStatus: ConnectionStatus;
  lastConnectionTime?: string;
  lastDisconnectionTime?: string;
  errorMessage?: string;
  reconnectAttempts?: number;
  healthStatus?: HealthStatus;
  successfulConnections?: number;
  failedConnections?: number;
}
