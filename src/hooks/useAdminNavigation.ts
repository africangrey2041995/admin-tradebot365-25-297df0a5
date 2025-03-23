
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

/**
 * Hook cung cấp các chức năng điều hướng dành riêng cho phần Admin
 */
export function useAdminNavigation() {
  const navigate = useNavigate();
  
  /**
   * Điều hướng đến trang quản trị admin
   * @param path Đường dẫn cụ thể trong admin (không bao gồm /admin)
   */
  const navigateToAdmin = (path: string = '') => {
    console.log("Navigating to admin path:", path ? `/admin/${path}` : '/admin');
    
    try {
      // Điều hướng đến trang admin với path được chỉ định
      const targetPath = path ? `/admin/${path}` : '/admin';
      navigate(targetPath, { replace: true });
      
      // Thông báo cho người dùng
      toast("Đã chuyển đến trang quản trị viên");
    } catch (error) {
      console.error("Error navigating to admin:", error);
      toast.error("Có lỗi khi chuyển đến trang quản trị. Hãy thử tải lại trang.");
    }
  };

  /**
   * Điều hướng đến bảng điều khiển quản trị
   */
  const goToAdminDashboard = () => navigateToAdmin();
  
  /**
   * Điều hướng đến trang quản lý người dùng
   */
  const goToAdminUsers = () => navigateToAdmin('users');
  
  /**
   * Điều hướng đến trang quản lý bots
   */
  const goToAdminBots = () => navigateToAdmin('bots');
  
  /**
   * Quay lại trang chính từ trang admin
   */
  const exitAdminMode = () => {
    console.log("Exiting admin mode");
    navigate('/', { replace: true });
    toast("Đã quay lại ứng dụng chính");
  };
  
  return {
    navigateToAdmin,
    goToAdminDashboard,
    goToAdminUsers,
    goToAdminBots,
    exitAdminMode
  };
}
