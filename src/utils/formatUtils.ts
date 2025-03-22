
/**
 * Các utility function cho việc format dữ liệu
 */

/**
 * Format số tiền sang định dạng VND
 * @param amount Số tiền cần format
 * @returns Chuỗi đã format theo định dạng VND
 */
export function formatCurrency(amount: number | string): string {
  // Chuyển sang số nếu là chuỗi
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  // Kiểm tra giá trị hợp lệ
  if (isNaN(numericAmount)) return '0 ₫';
  
  // Format theo định dạng tiền Việt Nam
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(numericAmount);
}

/**
 * Format phần trăm
 * @param value Giá trị cần format
 * @param decimalPlaces Số chữ số thập phân
 * @returns Chuỗi đã format theo định dạng phần trăm
 */
export function formatPercentage(value: number | string, decimalPlaces = 2): string {
  // Chuyển sang số nếu là chuỗi
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  
  // Kiểm tra giá trị hợp lệ
  if (isNaN(numericValue)) return '0%';
  
  // Format theo định dạng phần trăm
  return `${numericValue.toFixed(decimalPlaces)}%`;
}

/**
 * Format ngày tháng
 * @param dateStr Chuỗi ngày hoặc Date object
 * @param format Định dạng mong muốn ('short', 'medium', 'long')
 * @returns Chuỗi ngày đã format
 */
export function formatDate(dateStr: string | Date, format: 'short' | 'medium' | 'long' = 'medium'): string {
  try {
    const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
    
    // Kiểm tra ngày hợp lệ
    if (isNaN(date.getTime())) {
      // Thử chuyển đổi dd/mm/yyyy sang Date
      if (typeof dateStr === 'string' && dateStr.includes('/')) {
        const parts = dateStr.split('/');
        if (parts.length === 3) {
          const day = parseInt(parts[0], 10);
          const month = parseInt(parts[1], 10) - 1;
          const year = parseInt(parts[2], 10);
          const newDate = new Date(year, month, day);
          if (!isNaN(newDate.getTime())) {
            return formatDateByType(newDate, format);
          }
        }
      }
      return 'Ngày không hợp lệ';
    }
    
    return formatDateByType(date, format);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Ngày không hợp lệ';
  }
}

/**
 * Hàm trợ giúp format ngày theo loại
 */
function formatDateByType(date: Date, format: 'short' | 'medium' | 'long'): string {
  const options: Intl.DateTimeFormatOptions = { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  };
  
  if (format === 'medium' || format === 'long') {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }
  
  if (format === 'long') {
    options.second = '2-digit';
    options.weekday = 'long';
  }
  
  return new Intl.DateTimeFormat('vi-VN', options).format(date);
}

/**
 * Chuyển đổi chuỗi thời gian từ định dạng DD/MM/YYYY sang Date object
 * @param dateStr Chuỗi ngày định dạng DD/MM/YYYY
 * @returns Date object hoặc null nếu không hợp lệ
 */
export function parseVietnameseDateString(dateStr: string): Date | null {
  if (!dateStr) return null;
  
  try {
    const parts = dateStr.split('/');
    if (parts.length !== 3) return null;
    
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Tháng trong JS bắt đầu từ 0
    const year = parseInt(parts[2], 10);
    
    const date = new Date(year, month, day);
    
    // Kiểm tra ngày hợp lệ
    if (isNaN(date.getTime())) return null;
    
    return date;
  } catch (error) {
    console.error('Error parsing date:', error);
    return null;
  }
}

/**
 * Format số lượng lớn thành dạng rút gọn (1K, 1M, etc.)
 * @param value Giá trị cần format
 * @returns Chuỗi đã format
 */
export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat('vi-VN', {
    notation: 'compact',
    compactDisplay: 'short'
  }).format(value);
}

/**
 * Định dạng thời gian tương đối (ví dụ: "2 phút trước")
 * @param dateStr Chuỗi ngày hoặc Date object
 * @returns Chuỗi thời gian tương đối
 */
export function formatRelativeTime(dateStr: string | Date): string {
  try {
    const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
    
    // Kiểm tra ngày hợp lệ
    if (isNaN(date.getTime())) {
      // Thử chuyển đổi dd/mm/yyyy sang Date
      if (typeof dateStr === 'string' && dateStr.includes('/')) {
        const parts = dateStr.split('/');
        if (parts.length === 3) {
          const day = parseInt(parts[0], 10);
          const month = parseInt(parts[1], 10) - 1;
          const year = parseInt(parts[2], 10);
          const newDate = new Date(year, month, day);
          if (!isNaN(newDate.getTime())) {
            return calculateRelativeTime(newDate);
          }
        }
      }
      return 'Thời gian không hợp lệ';
    }
    
    return calculateRelativeTime(date);
  } catch (error) {
    console.error('Error formatting relative time:', error);
    return 'Thời gian không hợp lệ';
  }
}

/**
 * Hàm trợ giúp tính toán thời gian tương đối
 */
function calculateRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHour = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHour / 24);
  const diffMonth = Math.round(diffDay / 30);
  const diffYear = Math.round(diffMonth / 12);
  
  if (diffSec < 60) return 'Vừa xong';
  if (diffMin < 60) return `${diffMin} phút trước`;
  if (diffHour < 24) return `${diffHour} giờ trước`;
  if (diffDay < 30) return `${diffDay} ngày trước`;
  if (diffMonth < 12) return `${diffMonth} tháng trước`;
  return `${diffYear} năm trước`;
}
