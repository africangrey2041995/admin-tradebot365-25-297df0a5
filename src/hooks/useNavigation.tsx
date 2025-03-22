
import { useLocation, useNavigate } from 'react-router-dom';
import { ADMIN_ROUTES, USER_ROUTES } from '@/constants/routes';
import { BotType, determineBotType } from '@/constants/botTypes';
import { logBotIdInfo, normalizeBotId } from '@/utils/botUtils';

/**
 * Hook tùy chỉnh để xử lý điều hướng thông minh trong ứng dụng
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
            navigate(USER_ROUTES.BOTS);
        }
      }
    } catch (error) {
      console.error(`Navigation error for bot ID ${botId}:`, error);
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
      navigate(isAdminContext ? ADMIN_ROUTES.DASHBOARD : USER_ROUTES.HOME);
    }
  };
  
  /**
   * Quay lại trang trước đó
   */
  const goBack = () => {
    navigate(-1);
  };
  
  return {
    navigateToBotDetail,
    navigateToAccountDetail,
    goBack,
    isAdminContext
  };
}
