
/**
 * Các utility function dùng chung trong ứng dụng
 */

/**
 * Tạo ID ngẫu nhiên
 * @param prefix Tiền tố cho ID (tùy chọn)
 * @param length Độ dài của phần ngẫu nhiên
 * @returns ID ngẫu nhiên
 */
export function generateId(prefix = '', length = 8): string {
  const randomPart = Math.random().toString(36).substring(2, 2 + length);
  return prefix ? `${prefix}-${randomPart}` : randomPart;
}

/**
 * Trì hoãn thực thi một hàm
 * @param callback Hàm cần thực thi
 * @param delay Thời gian trì hoãn (ms)
 * @returns Hàm đã được trì hoãn
 */
export function debounce<T extends (...args: any[]) => any>(
  callback: T,
  delay = 300
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return function(...args: Parameters<T>): void {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
  };
}

/**
 * Clone sâu một đối tượng
 * @param obj Đối tượng cần clone
 * @returns Đối tượng đã được clone
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (error) {
    console.error('Error deep cloning object:', error);
    return obj;
  }
}

/**
 * So sánh hai đối tượng có bằng nhau không
 * @param obj1 Đối tượng thứ nhất
 * @param obj2 Đối tượng thứ hai
 * @returns true nếu hai đối tượng bằng nhau
 */
export function isEqual(obj1: unknown, obj2: unknown): boolean {
  try {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  } catch (error) {
    console.error('Error comparing objects:', error);
    return false;
  }
}

/**
 * Rút gọn một chuỗi với dấu ba chấm ở cuối
 * @param str Chuỗi cần rút gọn
 * @param maxLength Độ dài tối đa
 * @returns Chuỗi đã được rút gọn
 */
export function truncateString(str: string, maxLength: number): string {
  if (!str) return '';
  if (str.length <= maxLength) return str;
  
  return `${str.substring(0, maxLength)}...`;
}

/**
 * Shuffle một mảng (thuật toán Fisher-Yates)
 * @param array Mảng cần xáo trộn
 * @returns Mảng đã được xáo trộn
 */
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

/**
 * Chuyển đổi một đối tượng thành query string
 * @param params Đối tượng chứa các tham số
 * @returns Query string
 */
export function objectToQueryString(params: Record<string, any>): string {
  const parts = [];
  
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;
    
    if (Array.isArray(value)) {
      // Handle arrays
      for (const item of value) {
        parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(item)}`);
      }
    } else {
      parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  }
  
  return parts.length > 0 ? `?${parts.join('&')}` : '';
}

/**
 * Lấy giá trị của một query parameter từ URL
 * @param paramName Tên của query parameter
 * @returns Giá trị của query parameter hoặc null
 */
export function getQueryParam(paramName: string): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get(paramName);
}

/**
 * Loại bỏ các phần tử trùng lặp từ một mảng
 * @param array Mảng cần xử lý
 * @returns Mảng không có phần tử trùng lặp
 */
export function uniqueArray<T>(array: T[]): T[] {
  return [...new Set(array)];
}

/**
 * Nhóm các phần tử của mảng theo một tiêu chí
 * @param array Mảng cần nhóm
 * @param keySelector Hàm trả về khóa để nhóm
 * @returns Mảng đã được nhóm
 */
export function groupBy<T, K extends string | number | symbol>(
  array: T[],
  keySelector: (item: T) => K
): Record<K, T[]> {
  return array.reduce((result, item) => {
    const key = keySelector(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
    return result;
  }, {} as Record<K, T[]>);
}
