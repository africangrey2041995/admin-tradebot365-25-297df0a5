
/**
 * Định nghĩa các loại response trả về từ API
 */

// Cấu trúc response chuẩn
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  statusCode?: number;
}

// Cấu trúc phân trang
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;
}

// Cấu trúc lọc và sắp xếp
export interface FilterSortOptions {
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  search?: string;
  filters?: Record<string, any>;
  page?: number;
  pageSize?: number;
}

// Cấu trúc đếm thống kê
export interface StatsResponse {
  totalCount: number;
  activeCount: number;
  inactiveCount: number;
  pendingCount?: number;
  errorCount?: number;
  lastUpdated: string;
}

// Cấu trúc logout response
export interface LogoutResponse {
  success: boolean;
  message: string;
}

// Cấu trúc response cho các thao tác CRUD
export interface CreateResponse<T> {
  success: boolean;
  data?: T;
  message: string;
  id?: string | number;
}

export interface UpdateResponse<T> {
  success: boolean;
  data?: T;
  message: string;
  updated: boolean;
}

export interface DeleteResponse {
  success: boolean;
  message: string;
  deleted: boolean;
}
