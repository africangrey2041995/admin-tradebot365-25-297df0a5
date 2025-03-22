
/**
 * Các utility function cho quản lý người dùng
 */
import { UserStatus, UserPlan, UserRole, USER_ID_PREFIX, USER_ID_REGEX } from '@/constants/userConstants';
import { User } from '@/types/admin-types';

/**
 * Kiểm tra xem một userId có hợp lệ không
 * @param userId ID người dùng cần kiểm tra
 * @returns true nếu ID hợp lệ
 */
export function isValidUserId(userId: string): boolean {
  if (!userId) return false;
  
  return USER_ID_REGEX.test(userId);
}

/**
 * Tạo mới một ID người dùng
 * @param sequence Số thứ tự (nếu không cung cấp sẽ tạo ngẫu nhiên)
 * @returns ID người dùng mới
 */
export function generateUserId(sequence?: number): string {
  const seq = sequence || Math.floor(10000 + Math.random() * 90000);
  return `${USER_ID_PREFIX}${seq}`;
}

/**
 * Đếm số lượng người dùng theo trạng thái
 * @param users Danh sách người dùng
 * @param status Trạng thái cần đếm
 * @returns Số lượng người dùng có trạng thái chỉ định
 */
export function countUsersByStatus(users: User[], status: UserStatus): number {
  return users.filter(user => user.status === status).length;
}

/**
 * Đếm số lượng người dùng theo gói dịch vụ
 * @param users Danh sách người dùng
 * @param plan Gói dịch vụ cần đếm
 * @returns Số lượng người dùng có gói dịch vụ chỉ định
 */
export function countUsersByPlan(users: User[], plan: UserPlan): number {
  return users.filter(user => user.plan === plan).length;
}

/**
 * Lọc người dùng theo nhiều tiêu chí
 * @param users Danh sách người dùng
 * @param filters Các tiêu chí lọc
 * @returns Danh sách người dùng đã lọc
 */
export function filterUsers(users: User[], filters: {
  searchTerm?: string;
  status?: UserStatus | null;
  plan?: UserPlan | null;
}): User[] {
  const { searchTerm, status, plan } = filters;
  
  return users.filter(user => {
    // Lọc theo từ khóa tìm kiếm
    const matchesSearch = !searchTerm || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Lọc theo trạng thái
    const matchesStatus = !status || user.status === status;
    
    // Lọc theo gói dịch vụ
    const matchesPlan = !plan || user.plan === plan;
    
    return matchesSearch && matchesStatus && matchesPlan;
  });
}

/**
 * Kiểm tra xem một người dùng có phải là admin không
 * @param user Người dùng cần kiểm tra
 * @returns true nếu người dùng là admin
 */
export function isAdmin(user: User): boolean {
  return user.role === UserRole.ADMIN;
}

/**
 * Kiểm tra xem một người dùng có đang hoạt động không
 * @param user Người dùng cần kiểm tra
 * @returns true nếu người dùng đang hoạt động
 */
export function isActiveUser(user: User): boolean {
  return user.status === UserStatus.ACTIVE;
}

/**
 * Kiểm tra xem một người dùng có đang bị khóa không
 * @param user Người dùng cần kiểm tra
 * @returns true nếu người dùng đang bị khóa
 */
export function isSuspendedUser(user: User): boolean {
  return user.status === UserStatus.SUSPENDED;
}
