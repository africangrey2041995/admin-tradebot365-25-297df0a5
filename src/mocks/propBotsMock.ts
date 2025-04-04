
import { PropBot } from '@/types/bot';
import { BotRiskLevel, BotStatus, BotType } from '@/constants/botTypes';

export const mockPropBots: PropBot[] = [
  {
    botId: 'PROP-001',
    name: 'Coinstrat Pro Challenge Master',
    description: 'Bot tối ưu chiến lược vượt qua thử thách Prop Trading',
    type: BotType.PROP_BOT,
    status: BotStatus.ACTIVE,
    risk: BotRiskLevel.MEDIUM,
    createdDate: '2023-09-15',
    lastUpdated: '2023-11-22',
    performanceLastMonth: '+12.5%',
    performanceAllTime: '+56.8%',
    minCapital: '$5,000',
    users: 78,
    profit: '+15.2%',
    maxDrawdown: '4.7%',
    propFirm: 'Coinstrat Pro',
    challengeDuration: '30 ngày',
    exchange: 'Binance',
    accountSizes: ['$5,000', '$10,000', '$25,000', '$50,000'],
    isFeatured: true,
    isNew: false,
    isBestSeller: true
  },
  {
    botId: 'PROP-002',
    name: 'Scalping Wizard Prop',
    description: 'Bot scalping tối ưu cho Prop Trading với tỷ lệ thắng cao',
    type: BotType.PROP_BOT,
    status: BotStatus.ACTIVE,
    risk: BotRiskLevel.HIGH,
    createdDate: '2023-10-05',
    lastUpdated: '2023-11-18',
    performanceLastMonth: '+9.3%',
    performanceAllTime: '+42.1%',
    minCapital: '$10,000',
    users: 45,
    profit: '+12.7%',
    maxDrawdown: '6.2%',
    propFirm: 'FTMO',
    challengeDuration: '25 ngày',
    exchange: 'Binance',
    accountSizes: ['$10,000', '$25,000', '$50,000', '$100,000'],
    isFeatured: false,
    isNew: true,
    isBestSeller: false
  },
  {
    botId: 'PROP-003',
    name: 'Low Risk Prop Trader',
    description: 'Bot giao dịch rủi ro thấp, tập trung vào bảo toàn vốn',
    type: BotType.PROP_BOT,
    status: BotStatus.MAINTENANCE,
    risk: BotRiskLevel.LOW,
    createdDate: '2023-08-20',
    lastUpdated: '2023-11-15',
    performanceLastMonth: '+5.8%',
    performanceAllTime: '+31.5%',
    minCapital: '$5,000',
    users: 92,
    profit: '+8.9%',
    maxDrawdown: '2.8%',
    propFirm: 'The 5%ers',
    challengeDuration: '60 ngày',
    exchange: 'Bybit',
    accountSizes: ['$5,000', '$10,000', '$20,000'],
    isFeatured: false,
    isNew: false,
    isBestSeller: false
  },
  {
    botId: 'PROP-004',
    name: 'Swing Trader Pro',
    description: 'Bot chuyên về giao dịch swing trading cho Prop Firms',
    type: BotType.PROP_BOT,
    status: BotStatus.ACTIVE,
    risk: BotRiskLevel.MEDIUM,
    createdDate: '2023-09-10',
    lastUpdated: '2023-11-20',
    performanceLastMonth: '+8.2%',
    performanceAllTime: '+37.4%',
    minCapital: '$10,000',
    users: 67,
    profit: '+11.3%',
    maxDrawdown: '5.1%',
    propFirm: 'Earn2Trade',
    challengeDuration: '45 ngày',
    exchange: 'Bybit',
    accountSizes: ['$10,000', '$25,000', '$50,000'],
    isFeatured: false,
    isNew: false,
    isBestSeller: false
  },
  {
    botId: 'PROP-005',
    name: 'Conservative Prop Bot',
    description: 'Bot với chiến lược bảo toàn vốn, rủi ro cực thấp',
    type: BotType.PROP_BOT,
    status: BotStatus.ACTIVE,
    risk: BotRiskLevel.LOW,
    createdDate: '2023-07-15',
    lastUpdated: '2023-11-10',
    performanceLastMonth: '+4.2%',
    performanceAllTime: '+28.6%',
    minCapital: '$5,000',
    users: 105,
    profit: '+7.5%',
    maxDrawdown: '2.3%',
    propFirm: 'The 5%ers',
    challengeDuration: '90 ngày',
    exchange: 'KuCoin',
    accountSizes: ['$5,000', '$10,000', '$15,000'],
    isFeatured: true,
    isNew: false,
    isBestSeller: false
  },
  {
    botId: 'PROP-006',
    name: 'TopstepTrader Ninja',
    description: 'Bot chuyên biệt cho nền tảng TopstepTrader',
    type: BotType.PROP_BOT,
    status: BotStatus.ERROR,
    risk: BotRiskLevel.HIGH,
    createdDate: '2023-10-01',
    lastUpdated: '2023-11-05',
    performanceLastMonth: '-2.3%',
    performanceAllTime: '+18.9%',
    minCapital: '$15,000',
    users: 32,
    profit: '-1.5%',
    maxDrawdown: '7.8%',
    propFirm: 'TopstepTrader',
    challengeDuration: '30 ngày',
    exchange: 'Binance',
    accountSizes: ['$15,000', '$30,000', '$50,000'],
    isFeatured: false,
    isNew: false,
    isBestSeller: false
  },
  {
    botId: 'PROP-007',
    name: 'Forex Prop Master',
    description: 'Bot chuyên dụng cho thị trường Forex trong Prop Trading',
    type: BotType.PROP_BOT,
    status: BotStatus.INACTIVE,
    risk: BotRiskLevel.MEDIUM,
    createdDate: '2023-08-05',
    lastUpdated: '2023-10-20',
    performanceLastMonth: '+6.7%',
    performanceAllTime: '+34.2%',
    minCapital: '$10,000',
    users: 58,
    profit: '+9.3%',
    maxDrawdown: '4.5%',
    propFirm: 'FTMO',
    challengeDuration: '45 ngày',
    exchange: 'OKX',
    accountSizes: ['$10,000', '$25,000', '$50,000', '$100,000'],
    isFeatured: false,
    isNew: true,
    isBestSeller: false
  }
];

