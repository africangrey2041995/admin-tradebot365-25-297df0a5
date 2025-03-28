
/**
 * Định nghĩa các types liên quan đến Signal
 * 
 * File này chứa tất cả các loại dữ liệu liên quan đến tín hiệu giao dịch,
 * bao gồm cả các tín hiệu từ TradingView và Coinstrat.
 */

// Loại hành động tín hiệu
export type SignalAction = 'ENTER_LONG' | 'EXIT_LONG' | 'ENTER_SHORT' | 'EXIT_SHORT';

// Trạng thái tín hiệu
export type SignalStatus = 'Pending' | 'Processed' | 'Failed' | 'Expired' | 'Sent';

/**
 * Interface cơ sở cho tất cả các loại tín hiệu với các thuộc tính chung
 * 
 * @property id Định danh duy nhất của tín hiệu
 * @property action Loại hành động của tín hiệu (mua/bán/v.v.)
 * @property instrument Cặp tiền tệ hoặc tài sản được giao dịch
 * @property timestamp Thời điểm tạo tín hiệu theo định dạng ISO
 * @property signalToken Token xác thực cho tín hiệu
 * @property maxLag Độ trễ tối đa cho phép (ví dụ: "5s")
 * @property investmentType Loại tài sản ("crypto", "forex", v.v.)
 * @property amount Lượng giao dịch
 * @property status Trạng thái hiện tại của tín hiệu
 * @property errorMessage Thông báo lỗi nếu có
 * @property userId ID của người dùng sở hữu tín hiệu, format chuẩn USR-XXX
 */
export interface BaseSignal {
  id: string;
  action: SignalAction;
  instrument: string;
  timestamp: string;
  signalToken: string;
  maxLag: string;
  investmentType: string;
  amount: string;
  status: string | SignalStatus;
  errorMessage?: string;
  userId?: string; // ID của người dùng sở hữu tín hiệu, format chuẩn USR-XXX
}

/**
 * Tín hiệu từ hệ thống TradingView
 * 
 * @extends BaseSignal
 * @property source Nguồn gốc của tín hiệu
 * @property processingTime Thời gian xử lý tín hiệu
 * @property accountId ID của tài khoản giao dịch
 * @property accountName Tên của tài khoản giao dịch
 * @property coinstratSignalId ID của tín hiệu tương ứng trong hệ thống Coinstrat
 * @property coinstratLogId ID của bản ghi Coinstrat Pro
 * @property botId ID của bot tạo ra tín hiệu, định dạng chuẩn MY-XXX, PRE-XXX, PROP-XXX
 */
export interface TradingViewSignal extends BaseSignal {
  source?: string;
  processingTime?: string;
  accountId?: string;
  accountName?: string;
  coinstratSignalId?: string;
  coinstratLogId?: string; // ID của bản ghi Coinstrat Pro
  botId?: string; // Adding the botId property that was missing
}

/**
 * Trạng thái xử lý tín hiệu cho từng tài khoản
 * 
 * @property accountId ID của tài khoản, nên theo format ACC-XXX
 * @property userId ID của người dùng sở hữu tài khoản, format chuẩn USR-XXX
 * @property name Tên của tài khoản
 * @property timestamp Thời điểm cập nhật trạng thái
 * @property reason Lý do thất bại (nếu có)
 * @property errorCode Mã lỗi (nếu có)
 * @property status Trạng thái xử lý: thành công, thất bại, hoặc đang xử lý
 */
export interface AccountSignalStatus {
  accountId: string;
  userId?: string;
  name: string;
  timestamp: string;
  reason?: string;
  errorCode?: string;
  status: 'success' | 'failed' | 'pending';
}

/**
 * Tín hiệu Coinstrat - mở rộng từ BaseSignal, sử dụng cho xử lý tích hợp
 * 
 * @extends BaseSignal
 * @property originalSignalId ID của tín hiệu gốc (từ TradingView hoặc nguồn khác)
 * @property processedAccounts Danh sách các tài khoản đã xử lý thành công
 * @property failedAccounts Danh sách các tài khoản xử lý thất bại
 * @property botId ID của bot tạo tín hiệu
 * @property botName Tên của bot
 * @property coinstratLogId ID của bản ghi Coinstrat Pro
 */
export interface CoinstratSignal extends BaseSignal {
  originalSignalId: string;
  processedAccounts: AccountSignalStatus[];
  failedAccounts: AccountSignalStatus[];
  botId?: string;
  botName?: string;
  coinstratLogId?: string; // ID của bản ghi Coinstrat Pro
}

/**
 * Tín hiệu mở rộng với thông tin người dùng và tài khoản
 * Sử dụng cho hiển thị chi tiết và quản lý lỗi
 * 
 * @extends TradingViewSignal
 * @property userId ID của người dùng, format chuẩn USR-XXX
 * @property tradingAccount Thông tin tài khoản giao dịch
 * @property tradingAccountType Loại tài khoản giao dịch
 * @property tradingAccountBalance Số dư tài khoản
 * @property tradingAccountId ID của tài khoản giao dịch
 * @property botId ID của bot
 * @property botType Loại bot
 * @property botName Tên của bot
 * @property exchange Sàn giao dịch
 * @property errorCode Mã lỗi (nếu có)
 * @property errorSeverity Mức độ nghiêm trọng của lỗi
 * @property coinstratLogId ID của bản ghi Coinstrat Pro
 * @property connectedUserIds Danh sách ID người dùng có tài khoản giao dịch kết nối với bot này
 */
export interface ExtendedSignal extends TradingViewSignal {
  userId?: string;
  tradingAccount?: string;
  tradingAccountType?: string;
  tradingAccountBalance?: string;
  tradingAccountId?: string; // ID của tài khoản giao dịch
  botId?: string;
  botType?: string;
  botName?: string;
  exchange?: string;
  errorCode?: string;
  errorSeverity?: 'low' | 'medium' | 'high' | 'critical';
  coinstratLogId?: string; // ID của bản ghi Coinstrat Pro
  connectedUserIds?: string[]; // Array of user IDs that have trading accounts connected to this bot
}

/**
 * Lịch sử giao dịch
 * 
 * @property id ID của giao dịch
 * @property signalId ID của tín hiệu gây ra giao dịch
 * @property botId ID của bot thực hiện giao dịch
 * @property accountId ID của tài khoản giao dịch
 * @property action Loại hành động
 * @property instrument Cặp tiền tệ hoặc tài sản
 * @property entryPrice Giá vào lệnh
 * @property exitPrice Giá thoát lệnh
 * @property quantity Lượng giao dịch
 * @property timestamp Thời điểm giao dịch
 * @property pnl Lãi/Lỗ (Profit and Loss)
 * @property status Trạng thái giao dịch
 * @property duration Thời gian giữ lệnh
 */
export interface TradeHistory {
  id: string;
  signalId: string;
  botId: string;
  accountId: string;
  action: SignalAction;
  instrument: string;
  entryPrice?: string;
  exitPrice?: string;
  quantity: string;
  timestamp: string;
  pnl?: string;
  status: 'open' | 'closed' | 'cancelled';
  duration?: string;
}

/**
 * Kỹ thuật giao dịch
 * 
 * @property id ID của chiến lược
 * @property name Tên chiến lược
 * @property description Mô tả
 * @property timeframe Khung thời gian
 * @property indicators Chỉ báo sử dụng
 * @property entryConditions Điều kiện vào lệnh
 * @property exitConditions Điều kiện thoát lệnh
 * @property riskManagement Quản lý rủi ro
 */
export interface TradingStrategy {
  id: string;
  name: string;
  description: string;
  timeframe: string;
  indicators: string[];
  entryConditions: string[];
  exitConditions: string[];
  riskManagement: string[];
}
