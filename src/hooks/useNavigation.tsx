
import { useLocation, useNavigate } from 'react-router-dom';
import { ADMIN_ROUTES, USER_ROUTES } from '@/constants/routes';
import { BotType } from '@/constants/botTypes';
import { determineBotType, normalizeBotId, logBotIdInfo } from '@/utils/botUtils';
import { toast } from 'sonner';

/**
 * Hook tùy chỉnh để xử lý điều hướng thông minh trong ứng dụng
 * với cơ chế xử lý lỗi được cải thiện
 */
export function useNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Kiểm tra xem đang ở trong context admin hay không
  const isAdminContext = location.pathname.startsWith('/admin');
  
  /**
   * Điều hướng đến trang chi tiết bot dựa vào ID
   * @param botId ID của bot cần điều hướng đến
   */
  const navigateToBotDetail = (botId: string) => {
    if (!botId) {
      console.error('Cannot navigate: Bot ID is empty');
      toast.error('Không thể điều hướng: ID bot không hợp lệ');
      return;
    }
    
    // Ghi log để debug
    logBotIdInfo(botId, 'navigateToBotDetail');
    
    try {
      const botType = determineBotType(botId);
      const normalizedId = normalizeBotId(botId, botType);
      
      if (isAdminContext) {
        // Định tuyến trong context admin
        switch (botType) {
          case BotType.PREMIUM_BOT:
            navigate(ADMIN_ROUTES.PREMIUM_BOT_DETAIL(normalizedId));
            break;
          case BotType.PROP_BOT:
            navigate(ADMIN_ROUTES.PROP_BOT_DETAIL(normalizedId));
            break;
          case BotType.USER_BOT:
            navigate(ADMIN_ROUTES.USER_BOT_DETAIL(normalizedId));
            break;
          default:
            // Fallback cho trường hợp không xác định được loại bot
            console.warn(`Unknown bot type for ID: ${botId}. Navigating to admin bots.`);
            toast.warning('Không thể xác định loại bot. Chuyển hướng đến trang Bots');
            navigate(ADMIN_ROUTES.BOTS);
        }
      } else {
        // Định tuyến trong context user
        switch (botType) {
          case BotType.PREMIUM_BOT:
            navigate(USER_ROUTES.PREMIUM_BOT_DETAIL(normalizedId));
            break;
          case BotType.PROP_BOT:
            navigate(USER_ROUTES.PROP_BOT_DETAIL(normalizedId));
            break;
          case BotType.USER_BOT:
            navigate(USER_ROUTES.BOT_DETAIL(normalizedId));
            break;
          default:
            // Fallback cho trường hợp không xác định được loại bot
            console.warn(`Unknown bot type for ID: ${botId}. Navigating to user bots.`);
            toast.warning('Không thể xác định loại bot. Chuyển hướng đến trang Bots');
            navigate(USER_ROUTES.BOTS);
        }
      }
    } catch (error) {
      console.error(`Navigation error for bot ID ${botId}:`, error);
      toast.error('Đã xảy ra lỗi khi chuyển hướng. Vui lòng thử lại sau.');
      // Fallback an toàn - chuyển đến trang bots chung
      navigate(isAdminContext ? ADMIN_ROUTES.BOTS : USER_ROUTES.BOTS);
    }
  };
  
  /**
   * Điều hướng đến trang chi tiết tài khoản
   * @param accountId ID của tài khoản
   */
  const navigateToAccountDetail = (accountId: string) => {
    if (!accountId) {
      console.error('Cannot navigate: Account ID is empty');
      toast.error('Không thể điều hướng: ID tài khoản không hợp lệ');
      return;
    }
    
    try {
      if (isAdminContext) {
        // Trong tương lai có thể thêm trang chi tiết tài khoản trong admin
        navigate(ADMIN_ROUTES.USERS);
      } else {
        navigate(USER_ROUTES.ACCOUNT_DETAIL(accountId));
      }
    } catch (error) {
      console.error(`Navigation error for account ID ${accountId}:`, error);
      toast.error('Đã xảy ra lỗi khi chuyển hướng. Vui lòng thử lại sau.');
      navigate(isAdminContext ? ADMIN_ROUTES.DASHBOARD : USER_ROUTES.HOME);
    }
  };
  
  /**
   * Quay lại trang trước đó
   * @param fallbackRoute Đường dẫn dự phòng nếu không thể quay lại
   */
  const goBack = (fallbackRoute?: string) => {
    try {
      navigate(-1);
    } catch (error) {
      console.error('Error navigating back:', error);
      const defaultFallback = isAdminContext ? ADMIN_ROUTES.DASHBOARD : USER_ROUTES.HOME;
      navigate(fallbackRoute || defaultFallback);
      toast.info('Không thể quay lại trang trước. Đã chuyển hướng về trang chính.');
    }
  };

  /**
   * Điều hướng tới trang lỗi bot
   */
  const navigateToBotErrors = () => {
    try {
      if (isAdminContext) {
        navigate(ADMIN_ROUTES.BOT_ERRORS);
      } else {
        // Trong context user, có thể không có trang riêng về lỗi bot
        toast.info('Tính năng này chỉ có sẵn trong trang quản trị.');
      }
    } catch (error) {
      console.error('Error navigating to bot errors:', error);
      toast.error('Đã xảy ra lỗi khi chuyển hướng. Vui lòng thử lại sau.');
    }
  };

  /**
   * Điều hướng đến một đường dẫn cụ thể với xử lý lỗi
   * @param path Đường dẫn cần điều hướng đến
   * @param options Tùy chọn điều hướng
   */
  const navigateTo = (path: string, options?: { replace?: boolean; state?: any }) => {
    try {
      navigate(path, options);
    } catch (error) {
      console.error(`Error navigating to ${path}:`, error);
      toast.error('Đã xảy ra lỗi khi chuyển hướng. Vui lòng thử lại sau.');
      navigate(isAdminContext ? ADMIN_ROUTES.DASHBOARD : USER_ROUTES.HOME);
    }
  };
  
  return {
    navigateToBotDetail,
    navigateToAccountDetail,
    navigateToBotErrors,
    navigateTo,
    goBack,
    isAdminContext
  };
}
