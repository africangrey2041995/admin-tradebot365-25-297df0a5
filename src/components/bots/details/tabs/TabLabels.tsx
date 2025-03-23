
type TabLabelSet = {
  overview: string;
  accounts: string;
  logs: string;
  accountsDescription: string;
  logsDescription: string;
};

export const getTabLabels = (botType: 'premium' | 'prop' | 'user'): TabLabelSet => {
  switch (botType) {
    case 'premium':
      return {
        overview: "Tổng quan",
        accounts: "Tài khoản kết nối",
        logs: "Premium Bot Logs",
        accountsDescription: "Quản lý các tài khoản được kết nối với Premium Bot",
        logsDescription: "Xem lịch sử các tín hiệu đã được xử lý bởi Premium Bot"
      };
    case 'prop':
      return {
        overview: "Tổng quan",
        accounts: "Tài khoản kết nối",
        logs: "Coinstrat Pro Logs",
        accountsDescription: "Quản lý các tài khoản được kết nối với Prop Trading Bot",
        logsDescription: "Xem lịch sử các tín hiệu đã được xử lý bởi Prop Trading Bot"
      };
    case 'user':
    default:
      return {
        overview: "Tổng quan",
        accounts: "Tài khoản kết nối",
        logs: "Coinstrat Pro Logs",
        accountsDescription: "Quản lý các tài khoản được kết nối với bot này",
        logsDescription: "Xem lịch sử các tín hiệu đã được xử lý bởi Coinstrat Pro"
      };
  }
};
