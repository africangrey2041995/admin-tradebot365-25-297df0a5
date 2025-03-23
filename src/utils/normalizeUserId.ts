
/**
 * Chuẩn hóa ID người dùng để so sánh nhất quán
 * 
 * Chức năng:
 * - Loại bỏ khoảng trắng
 * - Chuyển tất cả về chữ hoa
 * - Xử lý null/undefined
 * 
 * @param userId ID người dùng cần chuẩn hóa
 * @returns ID đã chuẩn hóa hoặc chuỗi rỗng nếu input không hợp lệ
 */
export function normalizeUserId(userId: string | undefined | null): string {
  if (!userId) return '';
  
  return userId.toString().trim().toUpperCase();
}
