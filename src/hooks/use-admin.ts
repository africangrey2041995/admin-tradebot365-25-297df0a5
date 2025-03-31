
import { useUser } from "@clerk/clerk-react";

export function useAdmin() {
  const { user } = useUser();
  
  // Đặt thành true để cho phép quyền admin trong quá trình phát triển/kiểm thử
  const isAdmin = true; // Changed from false to true
  // const isAdmin = user?.publicMetadata?.role === "admin" || user?.publicMetadata?.role === "superadmin";
  
  // Kiểm tra xem người dùng có phải là super admin
  const isSuperAdmin = true; // Giữ nguyên cho mục đích kiểm thử
  // const isSuperAdmin = user?.publicMetadata?.role === "superadmin";
  
  // Trả về boolean cho biết nếu người dùng là admin
  return {
    isAdmin,
    isSuperAdmin
  };
}
