
/**
 * Các utility function cho việc validate dữ liệu
 */

/**
 * Kiểm tra địa chỉ email hợp lệ
 * @param email Địa chỉ email cần kiểm tra
 * @returns true nếu email hợp lệ
 */
export function isValidEmail(email: string): boolean {
  if (!email) return false;
  
  // Regex cơ bản kiểm tra email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

/**
 * Kiểm tra định dạng số điện thoại Việt Nam
 * @param phone Số điện thoại cần kiểm tra
 * @returns true nếu số điện thoại hợp lệ
 */
export function isValidVietnamesePhone(phone: string): boolean {
  if (!phone) return false;
  
  // Regex cho số điện thoại Việt Nam
  const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
  return phoneRegex.test(phone);
}

/**
 * Kiểm tra mật khẩu đáp ứng yêu cầu bảo mật
 * @param password Mật khẩu cần kiểm tra
 * @returns Đối tượng kết quả với isValid và lỗi
 */
export function validatePassword(password: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!password) {
    errors.push('Mật khẩu không được để trống');
    return { isValid: false, errors };
  }
  
  if (password.length < 8) {
    errors.push('Mật khẩu phải có ít nhất 8 ký tự');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Mật khẩu phải có ít nhất 1 chữ hoa');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Mật khẩu phải có ít nhất 1 chữ thường');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Mật khẩu phải có ít nhất 1 chữ số');
  }
  
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    errors.push('Mật khẩu phải có ít nhất 1 ký tự đặc biệt');
  }
  
  return { isValid: errors.length === 0, errors };
}

/**
 * Kiểm tra hai mật khẩu có khớp nhau không
 * @param password Mật khẩu chính
 * @param confirmPassword Mật khẩu xác nhận
 * @returns true nếu hai mật khẩu khớp nhau
 */
export function doPasswordsMatch(password: string, confirmPassword: string): boolean {
  return password === confirmPassword;
}

/**
 * Validate URL
 * @param url URL cần kiểm tra
 * @returns true nếu URL hợp lệ
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Kiểm tra xem một giá trị có phải là số hợp lệ không
 * @param value Giá trị cần kiểm tra
 * @returns true nếu là số hợp lệ
 */
export function isValidNumber(value: string | number): boolean {
  if (typeof value === 'number') return !isNaN(value);
  
  return !isNaN(Number(value));
}

/**
 * Kiểm tra xem một ngày có hợp lệ không
 * @param date Ngày cần kiểm tra (chuỗi hoặc Date object)
 * @returns true nếu ngày hợp lệ
 */
export function isValidDate(date: string | Date): boolean {
  if (date instanceof Date) {
    return !isNaN(date.getTime());
  }
  
  // Thử chuyển đổi từ chuỗi
  const dateObj = new Date(date);
  if (!isNaN(dateObj.getTime())) {
    return true;
  }
  
  // Kiểm tra định dạng dd/mm/yyyy
  if (date.includes('/')) {
    const parts = date.split('/');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      const parsedDate = new Date(year, month, day);
      return !isNaN(parsedDate.getTime());
    }
  }
  
  return false;
}
