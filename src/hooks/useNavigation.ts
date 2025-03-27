
import { useNavigate } from 'react-router-dom';
import { SHARED_ROUTES } from '@/constants/routes';
import { useAdmin } from './use-admin';

export function useNavigation() {
  const navigate = useNavigate();
  const { isAdmin } = useAdmin();
  
  const navigateToBotDetail = (botId: string, botType: string = 'user') => {
    navigate(SHARED_ROUTES.BOT_DETAIL(isAdmin, botType, botId));
  };
  
  const navigateToSettings = () => {
    navigate(SHARED_ROUTES.SETTINGS(isAdmin));
  };
  
  const navigateToErrorDetail = (errorId: string) => {
    navigate(SHARED_ROUTES.BOT_ERROR_DETAIL(isAdmin, errorId));
  };
  
  const goBack = () => {
    navigate(-1);
  };
  
  // Add navigateTo method for backward compatibility
  const navigateTo = (path: string) => {
    navigate(path);
  };
  
  return { 
    navigateToBotDetail, 
    navigateToSettings, 
    navigateToErrorDetail, 
    goBack,
    navigateTo 
  };
}
