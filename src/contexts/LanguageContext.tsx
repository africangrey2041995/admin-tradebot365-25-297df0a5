
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define available languages
export type Language = 'vi' | 'en' | 'zh';

// Define context type
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'vi',
  setLanguage: () => {},
  t: (key: string) => key,
});

// Language provider props
interface LanguageProviderProps {
  children: ReactNode;
}

// Create the provider component
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Initialize with stored language or default to Vietnamese
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'vi';
  });

  // Update language in localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Function to set language
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  // Translation function
  const t = (key: string): string => {
    if (!translations[language]) {
      return key; // Fallback to key if language not found
    }
    
    return translations[language][key] || translations['vi'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

// Translations object
const translations: Record<Language, Record<string, string>> = {
  vi: {
    // Dashboard
    'Dashboard': 'Bảng Điều Khiển',
    'System Stats': 'Thống Kê Hệ Thống',
    'Total Bots': 'Tổng Bot',
    'active': 'đang hoạt động',
    'Total Accounts': 'Tổng Tài Khoản',
    'connected': 'đã kết nối',
    'Total Orders': 'Tổng Lệnh',
    'This month': 'Tháng này',
    'Recent Activity': 'Hoạt Động Gần Đây',
    'signals today': 'tín hiệu hôm nay',
    'Processed': 'Đã xử lý',
    'Pending': 'Đang chờ',
    'Failed': 'Lỗi',
    
    // Premium bots
    'Premium Bots': 'Bot Cao Cấp',
    'Premium Trading Bots': 'Bot Giao Dịch Cao Cấp',
    'Trade Bot 365 provides Premium Bots developed by experts with high performance and superior stability.': 'Trade Bot 365 cung cấp các Premium Bot giao dịch do đội ngũ chuyên gia phát triển với hiệu suất cao và độ ổn định vượt trội.',
    'Explore Premium Bots': 'Khám Phá Premium Bots',
    
    // Navigation
    'Search...': 'Tìm kiếm...',
    'Language': 'Ngôn ngữ',
    'Notifications': 'Thông báo',
    'Mark all as read': 'Đánh dấu tất cả đã đọc',
    'No notifications': 'Không có thông báo',
    
    // Bot management
    'BOT LIST': 'DANH SÁCH BOT',
    'Add New BOT': 'Thêm BOT Mới',
    'Edit Bot': 'Chỉnh Sửa Bot',
    'Update your trading bot settings. Make changes below.': 'Cập nhật cài đặt bot giao dịch của bạn. Thực hiện các thay đổi bên dưới.',
    'Bot Name': 'Tên Bot',
    'This is how your bot will be identified in the system.': 'Đây là cách bot của bạn sẽ được nhận dạng trong hệ thống.',
    'Exchange': 'Sàn Giao Dịch',
    'Only Coinstart Pro available in this version.': 'Chỉ Coinstart Pro khả dụng trong phiên bản này.',
    'Bot Type': 'Loại Bot',
    'Only Trading View available in this version.': 'Chỉ Trading View khả dụng trong phiên bản này.',
    'Color Scheme': 'Giao Diện Màu',
    'Default': 'Mặc Định',
    'Red': 'Đỏ',
    'Blue': 'Xanh Dương',
    'Green': 'Xanh Lá',
    'Purple': 'Tím',
    'Bot Icon': 'Biểu Tượng Bot',
    'Description': 'Mô Tả',
    'A brief description of what this bot does.': 'Mô tả ngắn gọn về chức năng của bot này.',
    'Cancel': 'Hủy',
    'Save Changes': 'Lưu Thay Đổi',
    
    // Settings
    'Display Language': 'Ngôn ngữ hiển thị',
    'Select language': 'Chọn ngôn ngữ',
    'Timezone': 'Múi giờ',
    'Select timezone': 'Chọn múi giờ',
    'Date Format': 'Định dạng ngày',
    'Select date format': 'Chọn định dạng ngày',
    'Time Format': 'Định dạng giờ',
    'Select time format': 'Chọn định dạng giờ',
    '12-hour (AM/PM)': '12 giờ (AM/PM)',
    '24-hour': '24 giờ',
  },
  
  en: {
    // Dashboard
    'Dashboard': 'Dashboard',
    'System Stats': 'System Stats',
    'Total Bots': 'Total Bots',
    'active': 'active',
    'Total Accounts': 'Total Accounts',
    'connected': 'connected',
    'Total Orders': 'Total Orders',
    'This month': 'This month',
    'Recent Activity': 'Recent Activity',
    'signals today': 'signals today',
    'Processed': 'Processed',
    'Pending': 'Pending',
    'Failed': 'Failed',
    
    // Premium bots
    'Premium Bots': 'Premium Bots',
    'Premium Trading Bots': 'Premium Trading Bots',
    'Trade Bot 365 provides Premium Bots developed by experts with high performance and superior stability.': 'Trade Bot 365 provides Premium Bots developed by experts with high performance and superior stability.',
    'Explore Premium Bots': 'Explore Premium Bots',
    
    // Navigation
    'Search...': 'Search...',
    'Language': 'Language',
    'Notifications': 'Notifications',
    'Mark all as read': 'Mark all as read',
    'No notifications': 'No notifications',
    
    // Bot management
    'BOT LIST': 'BOT LIST',
    'Add New BOT': 'Add New BOT',
    'Edit Bot': 'Edit Bot',
    'Update your trading bot settings. Make changes below.': 'Update your trading bot settings. Make changes below.',
    'Bot Name': 'Bot Name',
    'This is how your bot will be identified in the system.': 'This is how your bot will be identified in the system.',
    'Exchange': 'Exchange',
    'Only Coinstart Pro available in this version.': 'Only Coinstart Pro available in this version.',
    'Bot Type': 'Bot Type',
    'Only Trading View available in this version.': 'Only Trading View available in this version.',
    'Color Scheme': 'Color Scheme',
    'Default': 'Default',
    'Red': 'Red',
    'Blue': 'Blue',
    'Green': 'Green',
    'Purple': 'Purple',
    'Bot Icon': 'Bot Icon',
    'Description': 'Description',
    'A brief description of what this bot does.': 'A brief description of what this bot does.',
    'Cancel': 'Cancel',
    'Save Changes': 'Save Changes',
    
    // Settings
    'Display Language': 'Display Language',
    'Select language': 'Select language',
    'Timezone': 'Timezone',
    'Select timezone': 'Select timezone',
    'Date Format': 'Date Format',
    'Select date format': 'Select date format',
    'Time Format': 'Time Format',
    'Select time format': 'Select time format',
    '12-hour (AM/PM)': '12-hour (AM/PM)',
    '24-hour': '24-hour',
  },
  
  zh: {
    // Dashboard
    'Dashboard': '仪表板',
    'System Stats': '系统统计',
    'Total Bots': '机器人总数',
    'active': '活跃',
    'Total Accounts': '账户总数',
    'connected': '已连接',
    'Total Orders': '订单总数',
    'This month': '本月',
    'Recent Activity': '最近活动',
    'signals today': '今日信号',
    'Processed': '已处理',
    'Pending': '待处理',
    'Failed': '失败',
    
    // Premium bots
    'Premium Bots': '高级机器人',
    'Premium Trading Bots': '高级交易机器人',
    'Trade Bot 365 provides Premium Bots developed by experts with high performance and superior stability.': 'Trade Bot 365 提供由专家开发的高性能和卓越稳定性的高级机器人。',
    'Explore Premium Bots': '探索高级机器人',
    
    // Navigation
    'Search...': '搜索...',
    'Language': '语言',
    'Notifications': '通知',
    'Mark all as read': '标记所有为已读',
    'No notifications': '没有通知',
    
    // Bot management
    'BOT LIST': '机器人列表',
    'Add New BOT': '添加新机器人',
    'Edit Bot': '编辑机器人',
    'Update your trading bot settings. Make changes below.': '更新您的交易机器人设置。在下面进行更改。',
    'Bot Name': '机器人名称',
    'This is how your bot will be identified in the system.': '这是您的机器人在系统中的识别方式。',
    'Exchange': '交易所',
    'Only Coinstart Pro available in this version.': '此版本仅支持 Coinstart Pro。',
    'Bot Type': '机器人类型',
    'Only Trading View available in this version.': '此版本仅支持 Trading View。',
    'Color Scheme': '颜色方案',
    'Default': '默认',
    'Red': '红色',
    'Blue': '蓝色',
    'Green': '绿色',
    'Purple': '紫色',
    'Bot Icon': '机器人图标',
    'Description': '描述',
    'A brief description of what this bot does.': '机器人功能的简要描述。',
    'Cancel': '取消',
    'Save Changes': '保存更改',
    
    // Settings
    'Display Language': '显示语言',
    'Select language': '选择语言',
    'Timezone': '时区',
    'Select timezone': '选择时区',
    'Date Format': '日期格式',
    'Select date format': '选择日期格式',
    'Time Format': '时间格式',
    'Select time format': '选择时间格式',
    '12-hour (AM/PM)': '12小时制 (上午/下午)',
    '24-hour': '24小时制',
  }
};
