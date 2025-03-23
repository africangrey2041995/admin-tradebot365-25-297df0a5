
// Define types for our API documentation data
export interface ApiParameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
  authentication?: boolean;
  deprecated?: boolean;
  beta?: boolean;
  requestSchema?: string;
  responseSchema?: string;
  parameters?: ApiParameter[];
}

export interface ApiDocSubsection {
  id: string;
  title: string;
  content?: string;
  endpoints?: ApiEndpoint[];
}

export interface ApiDocSection {
  id: string;
  title: string;
  content?: string;
  endpoints?: ApiEndpoint[];
  subsections?: ApiDocSubsection[];
}

// API Documentation Data
export const apiDocSections: ApiDocSection[] = [
  {
    id: "authentication",
    title: "Xác thực & Phân quyền",
    content: "TradeBOT365 sử dụng JWT token để xác thực. Tất cả các API cần xác thực yêu cầu gửi kèm token trong header Authorization.",
    endpoints: [
      {
        method: "POST",
        path: "/api/auth/login",
        description: "Đăng nhập và lấy access token",
        authentication: false,
        requestSchema: `{
  "email": "user@example.com",
  "password": "password123"
}`,
        responseSchema: `{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "USR-12345",
    "email": "user@example.com",
    "name": "Nguyen Van A",
    "plan": "PREMIUM"
  }
}`
      },
      {
        method: "POST",
        path: "/api/auth/register",
        description: "Đăng ký tài khoản mới",
        authentication: false,
        requestSchema: `{
  "email": "user@example.com",
  "password": "password123",
  "name": "Nguyen Van A"
}`,
        responseSchema: `{
  "success": true,
  "message": "Đăng ký thành công",
  "userId": "USR-12345"
}`
      },
      {
        method: "POST",
        path: "/api/auth/refresh",
        description: "Làm mới access token",
        authentication: false,
        requestSchema: `{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}`,
        responseSchema: `{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}`
      },
      {
        method: "POST",
        path: "/api/auth/logout",
        description: "Đăng xuất và vô hiệu hóa token",
        authentication: true,
        responseSchema: `{
  "success": true,
  "message": "Đăng xuất thành công"
}`
      }
    ]
  },
  {
    id: "user-profile",
    title: "Quản lý Hồ sơ",
    endpoints: [
      {
        method: "GET",
        path: "/api/user/profile",
        description: "Lấy thông tin hồ sơ người dùng hiện tại",
        authentication: true,
        responseSchema: `{
  "id": "USR-12345",
  "email": "user@example.com",
  "name": "Nguyen Van A",
  "avatar": "https://example.com/avatar.jpg",
  "plan": "PREMIUM",
  "status": "ACTIVE",
  "createdAt": "2023-09-15T08:30:00Z",
  "lastLogin": "2023-11-10T14:25:00Z",
  "settings": {
    "notifications": {
      "email": true,
      "app": true
    },
    "theme": "dark"
  }
}`
      },
      {
        method: "PUT",
        path: "/api/user/profile",
        description: "Cập nhật thông tin hồ sơ người dùng",
        authentication: true,
        requestSchema: `{
  "name": "Nguyen Van A Updated",
  "avatar": "https://example.com/new-avatar.jpg"
}`,
        responseSchema: `{
  "success": true,
  "message": "Hồ sơ đã được cập nhật",
  "user": {
    "id": "USR-12345",
    "name": "Nguyen Van A Updated",
    "email": "user@example.com",
    "avatar": "https://example.com/new-avatar.jpg"
  }
}`
      },
      {
        method: "PUT",
        path: "/api/user/password",
        description: "Đổi mật khẩu người dùng",
        authentication: true,
        requestSchema: `{
  "currentPassword": "oldPassword123",
  "newPassword": "newPassword123",
  "confirmPassword": "newPassword123"
}`,
        responseSchema: `{
  "success": true,
  "message": "Mật khẩu đã được cập nhật"
}`
      }
    ]
  },
  {
    id: "dashboard",
    title: "Bảng điều khiển",
    endpoints: [
      {
        method: "GET",
        path: "/api/dashboard/overview",
        description: "Lấy tổng quan dữ liệu cho bảng điều khiển",
        authentication: true,
        responseSchema: `{
  "botsCount": {
    "total": 5,
    "active": 3
  },
  "accountsCount": {
    "total": 3,
    "connected": 2
  },
  "performance": {
    "totalProfit": "1250.75",
    "winRate": 65.8,
    "tradesCount": 125
  },
  "recentActivity": [
    {
      "id": "ACT-12345",
      "type": "bot_action",
      "description": "Bot BTCUSDT đã thực hiện giao dịch mua",
      "timestamp": "2023-11-15T12:30:00Z"
    }
  ]
}`
      },
      {
        method: "GET",
        path: "/api/dashboard/performance",
        description: "Lấy dữ liệu hiệu suất theo thời gian",
        authentication: true,
        parameters: [
          {
            name: "timeframe",
            type: "string",
            required: false,
            description: "Khung thời gian (day, week, month, year). Mặc định: week"
          },
          {
            name: "botId",
            type: "string",
            required: false,
            description: "Lọc theo Bot cụ thể"
          }
        ],
        responseSchema: `{
  "timeframe": "week",
  "data": [
    {
      "date": "2023-11-10",
      "profit": 125.5,
      "trades": 12
    },
    {
      "date": "2023-11-11",
      "profit": -50.25,
      "trades": 8
    }
  ],
  "summary": {
    "totalProfit": "225.50",
    "bestDay": "2023-11-10",
    "worstDay": "2023-11-11"
  }
}`
      }
    ]
  },
  {
    id: "bots",
    title: "Quản lý Bot",
    subsections: [
      {
        id: "user-bots",
        title: "Bot Người Dùng",
        endpoints: [
          {
            method: "GET",
            path: "/api/user-bots",
            description: "Lấy danh sách bot của người dùng",
            authentication: true,
            parameters: [
              {
                name: "page",
                type: "number",
                required: false,
                description: "Số trang, bắt đầu từ 1"
              },
              {
                name: "limit",
                type: "number",
                required: false,
                description: "Số lượng kết quả trên mỗi trang"
              },
              {
                name: "status",
                type: "string",
                required: false,
                description: "Lọc theo trạng thái (ACTIVE, PAUSED, ERROR)"
              },
              {
                name: "search",
                type: "string",
                required: false,
                description: "Tìm kiếm theo tên bot"
              }
            ],
            responseSchema: `{
  "data": [
    {
      "id": "BOT-12345",
      "name": "BTC Trend Bot",
      "status": "ACTIVE",
      "type": "TREND_FOLLOWING",
      "createdAt": "2023-10-15T08:30:00Z",
      "riskLevel": "MEDIUM",
      "performance": {
        "totalProfit": "250.75",
        "winRate": 68.5
      },
      "connectedAccounts": 2
    }
  ],
  "pagination": {
    "total": 5,
    "page": 1,
    "limit": 10,
    "pages": 1
  }
}`
          },
          {
            method: "POST",
            path: "/api/user-bots",
            description: "Tạo bot mới",
            authentication: true,
            requestSchema: `{
  "name": "ETH Scalping Bot",
  "type": "SCALPING",
  "symbol": "ETHUSDT",
  "riskLevel": "HIGH",
  "settings": {
    "timeframe": "5m",
    "stopLoss": 2.5,
    "takeProfit": 5.0
  },
  "description": "Bot giao dịch scalping cho ETH/USDT"
}`,
            responseSchema: `{
  "success": true,
  "message": "Bot đã được tạo thành công",
  "bot": {
    "id": "BOT-67890",
    "name": "ETH Scalping Bot",
    "status": "INACTIVE",
    "type": "SCALPING",
    "createdAt": "2023-11-15T10:30:00Z",
    "riskLevel": "HIGH"
  }
}`
          },
          {
            method: "GET",
            path: "/api/user-bots/:botId",
            description: "Lấy thông tin chi tiết của một bot",
            authentication: true,
            parameters: [
              {
                name: "botId",
                type: "string",
                required: true,
                description: "ID của bot cần xem"
              }
            ],
            responseSchema: `{
  "id": "BOT-12345",
  "name": "BTC Trend Bot",
  "status": "ACTIVE",
  "type": "TREND_FOLLOWING",
  "symbol": "BTCUSDT",
  "riskLevel": "MEDIUM",
  "createdAt": "2023-10-15T08:30:00Z",
  "updatedAt": "2023-11-10T14:25:00Z",
  "description": "Bot giao dịch theo xu hướng cho BTC/USDT",
  "settings": {
    "timeframe": "15m",
    "stopLoss": 2.0,
    "takeProfit": 4.0,
    "maxOpenPositions": 3
  },
  "performance": {
    "totalProfit": "250.75",
    "winRate": 68.5,
    "totalTrades": 124,
    "successfulTrades": 85,
    "failedTrades": 39
  },
  "connectedAccounts": [
    {
      "id": "ACC-12345",
      "name": "Binance Main",
      "exchange": "BINANCE",
      "status": "CONNECTED"
    }
  ]
}`
          },
          {
            method: "PUT",
            path: "/api/user-bots/:botId",
            description: "Cập nhật thông tin bot",
            authentication: true,
            parameters: [
              {
                name: "botId",
                type: "string",
                required: true,
                description: "ID của bot cần cập nhật"
              }
            ],
            requestSchema: `{
  "name": "BTC Trend Bot Updated",
  "riskLevel": "LOW",
  "settings": {
    "stopLoss": 1.5,
    "takeProfit": 3.0
  },
  "description": "Bot giao dịch theo xu hướng cho BTC/USDT đã cập nhật"
}`,
            responseSchema: `{
  "success": true,
  "message": "Bot đã được cập nhật",
  "bot": {
    "id": "BOT-12345",
    "name": "BTC Trend Bot Updated",
    "riskLevel": "LOW"
  }
}`
          },
          {
            method: "DELETE",
            path: "/api/user-bots/:botId",
            description: "Xóa bot",
            authentication: true,
            parameters: [
              {
                name: "botId",
                type: "string",
                required: true,
                description: "ID của bot cần xóa"
              }
            ],
            responseSchema: `{
  "success": true,
  "message": "Bot đã được xóa"
}`
          },
          {
            method: "PUT",
            path: "/api/user-bots/:botId/status",
            description: "Thay đổi trạng thái bot (kích hoạt/tạm dừng)",
            authentication: true,
            parameters: [
              {
                name: "botId",
                type: "string",
                required: true,
                description: "ID của bot cần thay đổi trạng thái"
              }
            ],
            requestSchema: `{
  "status": "ACTIVE"
}`,
            responseSchema: `{
  "success": true,
  "message": "Trạng thái bot đã được cập nhật",
  "status": "ACTIVE"
}`
          }
        ]
      },
      {
        id: "premium-bots",
        title: "Bot Premium",
        endpoints: [
          {
            method: "GET",
            path: "/api/premium-bots",
            description: "Lấy danh sách bot premium có sẵn",
            authentication: true,
            parameters: [
              {
                name: "page",
                type: "number",
                required: false,
                description: "Số trang, bắt đầu từ 1"
              },
              {
                name: "limit",
                type: "number",
                required: false,
                description: "Số lượng kết quả trên mỗi trang"
              },
              {
                name: "category",
                type: "string",
                required: false,
                description: "Lọc theo danh mục (TREND, SCALPING, GRID, etc)"
              }
            ],
            responseSchema: `{
  "data": [
    {
      "id": "PBOT-12345",
      "name": "Pro BTC Trend Master",
      "category": "TREND",
      "description": "Bot giao dịch theo xu hướng chuyên nghiệp cho BTC",
      "performance": {
        "monthly": "15.75%",
        "yearly": "125.5%",
        "winRate": 72.5
      },
      "price": {
        "monthly": 29.99,
        "yearly": 299.99
      },
      "stats": {
        "users": 125,
        "trades": 5420
      }
    }
  ],
  "pagination": {
    "total": 12,
    "page": 1,
    "limit": 10,
    "pages": 2
  }
}`
          },
          {
            method: "GET",
            path: "/api/premium-bots/:botId",
            description: "Lấy thông tin chi tiết của bot premium",
            authentication: true,
            parameters: [
              {
                name: "botId",
                type: "string",
                required: true,
                description: "ID của bot premium cần xem"
              }
            ],
            responseSchema: `{
  "id": "PBOT-12345",
  "name": "Pro BTC Trend Master",
  "category": "TREND",
  "description": "Bot giao dịch theo xu hướng chuyên nghiệp cho BTC",
  "longDescription": "Bot giao dịch chuyên nghiệp sử dụng thuật toán độc quyền để phân tích xu hướng BTC và đưa ra tín hiệu giao dịch chính xác.",
  "symbol": "BTCUSDT",
  "creator": "TradeBOT Team",
  "createdAt": "2023-05-15T08:30:00Z",
  "performance": {
    "daily": "0.5%",
    "weekly": "3.5%",
    "monthly": "15.75%",
    "yearly": "125.5%",
    "winRate": 72.5,
    "totalTrades": 5420,
    "successfulTrades": 3930,
    "failedTrades": 1490
  },
  "price": {
    "monthly": 29.99,
    "quarterly": 79.99,
    "yearly": 299.99,
    "currency": "USD"
  },
  "stats": {
    "users": 125,
    "rating": 4.8,
    "reviews": 45
  },
  "features": [
    "Điều chỉnh rủi ro tự động",
    "Tín hiệu giao dịch 24/7",
    "Phân tích thị trường thời gian thực"
  ],
  "requirements": {
    "minBalance": 100,
    "exchanges": ["BINANCE", "KUCOIN"]
  },
  "isSubscribed": false
}`
          },
          {
            method: "POST",
            path: "/api/premium-bots/:botId/subscribe",
            description: "Đăng ký sử dụng bot premium",
            authentication: true,
            parameters: [
              {
                name: "botId",
                type: "string",
                required: true,
                description: "ID của bot premium cần đăng ký"
              }
            ],
            requestSchema: `{
  "plan": "monthly",
  "paymentMethod": "credit_card"
}`,
            responseSchema: `{
  "success": true,
  "message": "Đăng ký bot premium thành công",
  "subscription": {
    "id": "SUB-12345",
    "botId": "PBOT-12345",
    "plan": "monthly",
    "startDate": "2023-11-15T10:30:00Z",
    "endDate": "2023-12-15T10:30:00Z",
    "autoRenew": true
  }
}`
          }
        ]
      },
      {
        id: "integrated-premium-bots",
        title: "Bot Premium Đã Tích Hợp",
        endpoints: [
          {
            method: "GET",
            path: "/api/integrated-premium-bots",
            description: "Lấy danh sách bot premium đã tích hợp",
            authentication: true,
            parameters: [
              {
                name: "page",
                type: "number",
                required: false,
                description: "Số trang, bắt đầu từ 1"
              },
              {
                name: "limit",
                type: "number",
                required: false,
                description: "Số lượng kết quả trên mỗi trang"
              },
              {
                name: "status",
                type: "string",
                required: false,
                description: "Lọc theo trạng thái (ACTIVE, PAUSED, ERROR)"
              }
            ],
            responseSchema: `{
  "data": [
    {
      "id": "IBOT-12345",
      "premiumBotId": "PBOT-12345",
      "name": "Pro BTC Trend Master",
      "status": "ACTIVE",
      "connectedAccounts": 1,
      "subscribedOn": "2023-10-15T08:30:00Z",
      "subscriptionEndDate": "2023-11-15T08:30:00Z",
      "performance": {
        "profit": "125.75",
        "winRate": 72.5
      }
    }
  ],
  "pagination": {
    "total": 3,
    "page": 1,
    "limit": 10,
    "pages": 1
  }
}`
          },
          {
            method: "GET",
            path: "/api/integrated-premium-bots/:botId",
            description: "Lấy thông tin chi tiết bot premium đã tích hợp",
            authentication: true,
            parameters: [
              {
                name: "botId",
                type: "string",
                required: true,
                description: "ID của bot premium đã tích hợp cần xem"
              }
            ],
            responseSchema: `{
  "id": "IBOT-12345",
  "premiumBotId": "PBOT-12345",
  "name": "Pro BTC Trend Master",
  "status": "ACTIVE",
  "subscribedOn": "2023-10-15T08:30:00Z",
  "subscriptionEndDate": "2023-11-15T08:30:00Z",
  "settings": {
    "riskLevel": "MEDIUM",
    "stopLoss": 2.0,
    "takeProfit": 4.0
  },
  "connectedAccounts": [
    {
      "id": "ACC-12345",
      "name": "Binance Main",
      "exchange": "BINANCE",
      "status": "CONNECTED"
    }
  ],
  "performance": {
    "totalProfit": "125.75",
    "winRate": 72.5,
    "totalTrades": 120,
    "successfulTrades": 87,
    "failedTrades": 33
  },
  "signals": [
    {
      "id": "SIG-12345",
      "timestamp": "2023-11-10T14:25:00Z",
      "action": "BUY",
      "price": "36250.50",
      "status": "EXECUTED"
    }
  ]
}`
          },
          {
            method: "PUT",
            path: "/api/integrated-premium-bots/:botId/settings",
            description: "Cập nhật cấu hình bot premium đã tích hợp",
            authentication: true,
            parameters: [
              {
                name: "botId",
                type: "string",
                required: true,
                description: "ID của bot premium đã tích hợp cần cập nhật"
              }
            ],
            requestSchema: `{
  "riskLevel": "LOW",
  "stopLoss": 1.5,
  "takeProfit": 3.0
}`,
            responseSchema: `{
  "success": true,
  "message": "Cấu hình bot đã được cập nhật",
  "settings": {
    "riskLevel": "LOW",
    "stopLoss": 1.5,
    "takeProfit": 3.0
  }
}`
          },
          {
            method: "PUT",
            path: "/api/integrated-premium-bots/:botId/status",
            description: "Thay đổi trạng thái bot premium đã tích hợp",
            authentication: true,
            parameters: [
              {
                name: "botId",
                type: "string",
                required: true,
                description: "ID của bot premium đã tích hợp cần thay đổi trạng thái"
              }
            ],
            requestSchema: `{
  "status": "PAUSED"
}`,
            responseSchema: `{
  "success": true,
  "message": "Trạng thái bot đã được cập nhật",
  "status": "PAUSED"
}`
          }
        ]
      },
      {
        id: "prop-trading-bots",
        title: "Bot Prop Trading",
        endpoints: [
          {
            method: "GET",
            path: "/api/prop-trading-bots",
            description: "Lấy danh sách bot prop trading có sẵn",
            authentication: true,
            parameters: [
              {
                name: "page",
                type: "number",
                required: false,
                description: "Số trang, bắt đầu từ 1"
              },
              {
                name: "limit",
                type: "number",
                required: false,
                description: "Số lượng kết quả trên mỗi trang"
              },
              {
                name: "firm",
                type: "string",
                required: false,
                description: "Lọc theo công ty prop (FTMO, MFF, etc)"
              }
            ],
            responseSchema: `{
  "data": [
    {
      "id": "PROP-12345",
      "name": "FTMO Challenge Master",
      "firm": "FTMO",
      "description": "Bot giúp vượt qua FTMO Challenge",
      "performance": {
        "monthly": "8.75%",
        "drawdown": "3.2%"
      },
      "price": {
        "monthly": 49.99,
        "yearly": 499.99
      },
      "stats": {
        "users": 85,
        "successRate": "75%"
      }
    }
  ],
  "pagination": {
    "total": 8,
    "page": 1,
    "limit": 10,
    "pages": 1
  }
}`
          },
          {
            method: "GET",
            path: "/api/prop-trading-bots/:botId",
            description: "Lấy thông tin chi tiết của bot prop trading",
            authentication: true,
            parameters: [
              {
                name: "botId",
                type: "string",
                required: true,
                description: "ID của bot prop trading cần xem"
              }
            ],
            responseSchema: `{
  "id": "PROP-12345",
  "name": "FTMO Challenge Master",
  "firm": "FTMO",
  "description": "Bot giúp vượt qua FTMO Challenge",
  "longDescription": "Bot được thiết kế đặc biệt để giúp traders vượt qua FTMO Challenge và Verification bằng chiến lược giao dịch tuân thủ các quy tắc của FTMO.",
  "creator": "TradeBOT Team",
  "createdAt": "2023-07-15T08:30:00Z",
  "challengeTypes": ["$10,000", "$25,000", "$50,000", "$100,000"],
  "performance": {
    "monthly": "8.75%",
    "drawdown": "3.2%",
    "winRate": 68.5,
    "totalChallenges": 120,
    "successfulChallenges": 90
  },
  "price": {
    "monthly": 49.99,
    "quarterly": 129.99,
    "yearly": 499.99,
    "currency": "USD"
  },
  "stats": {
    "users": 85,
    "rating": 4.7,
    "reviews": 35,
    "successRate": "75%"
  },
  "features": [
    "Quản lý rủi ro tự động theo quy tắc FTMO",
    "Giới hạn drawdown tối đa",
    "Chiến lược giao dịch theo mục tiêu lợi nhuận"
  ],
  "requirements": {
    "minBalance": 100,
    "exchanges": ["MT4", "MT5"]
  },
  "isSubscribed": false
}`
          }
        ]
      },
      {
        id: "integrated-prop-bots",
        title: "Bot Prop Trading Đã Tích Hợp",
        endpoints: [
          {
            method: "GET",
            path: "/api/integrated-prop-bots",
            description: "Lấy danh sách bot prop trading đã tích hợp",
            authentication: true,
            parameters: [
              {
                name: "page",
                type: "number",
                required: false,
                description: "Số trang, bắt đầu từ 1"
              },
              {
                name: "limit",
                type: "number",
                required: false,
                description: "Số lượng kết quả trên mỗi trang"
              },
              {
                name: "status",
                type: "string",
                required: false,
                description: "Lọc theo trạng thái (ACTIVE, PAUSED, ERROR)"
              }
            ],
            responseSchema: `{
  "data": [
    {
      "id": "IPROP-12345",
      "propBotId": "PROP-12345",
      "name": "FTMO Challenge Master",
      "firm": "FTMO",
      "status": "ACTIVE",
      "connectedAccounts": 1,
      "subscribedOn": "2023-10-15T08:30:00Z",
      "subscriptionEndDate": "2023-11-15T08:30:00Z",
      "challengeProgress": {
        "profitTarget": {
          "required": "8%",
          "current": "5.2%"
        },
        "maxDrawdown": {
          "limit": "5%",
          "current": "2.1%"
        },
        "daysRemaining": 12
      }
    }
  ],
  "pagination": {
    "total": 2,
    "page": 1,
    "limit": 10,
    "pages": 1
  }
}`
          },
          {
            method: "GET",
            path: "/api/integrated-prop-bots/:botId",
            description: "Lấy thông tin chi tiết bot prop trading đã tích hợp",
            authentication: true,
            parameters: [
              {
                name: "botId",
                type: "string",
                required: true,
                description: "ID của bot prop trading đã tích hợp cần xem"
              }
            ],
            responseSchema: `{
  "id": "IPROP-12345",
  "propBotId": "PROP-12345",
  "name": "FTMO Challenge Master",
  "firm": "FTMO",
  "status": "ACTIVE",
  "subscribedOn": "2023-10-15T08:30:00Z",
  "subscriptionEndDate": "2023-11-15T08:30:00Z",
  "settings": {
    "riskLevel": "MEDIUM",
    "dailyTarget": "1%",
    "maxDailyTrades": 5
  },
  "challengeType": "$25,000",
  "challengeProgress": {
    "profitTarget": {
      "required": "8%",
      "current": "5.2%"
    },
    "maxDrawdown": {
      "limit": "5%",
      "current": "2.1%"
    },
    "dailyDrawdown": {
      "limit": "2.5%",
      "current": "0.8%"
    },
    "tradingDays": {
      "required": 10,
      "completed": 8
    },
    "daysRemaining": 12,
    "overallProgress": "65%"
  },
  "connectedAccounts": [
    {
      "id": "ACC-12345",
      "name": "FTMO MT5",
      "platform": "MT5",
      "status": "CONNECTED"
    }
  ],
  "performance": {
    "totalProfit": "5.2%",
    "winRate": 70.5,
    "totalTrades": 85,
    "successfulTrades": 60,
    "failedTrades": 25
  },
  "trades": [
    {
      "id": "TRD-12345",
      "timestamp": "2023-11-10T14:25:00Z",
      "pair": "EURUSD",
      "action": "BUY",
      "openPrice": "1.0723",
      "closePrice": "1.0745",
      "profit": "0.21%",
      "status": "CLOSED"
    }
  ]
}`
          },
          {
            method: "PUT",
            path: "/api/integrated-prop-bots/:botId/settings",
            description: "Cập nhật cấu hình bot prop trading đã tích hợp",
            authentication: true,
            parameters: [
              {
                name: "botId",
                type: "string",
                required: true,
                description: "ID của bot prop trading đã tích hợp cần cập nhật"
              }
            ],
            requestSchema: `{
  "riskLevel": "LOW",
  "dailyTarget": "0.8%",
  "maxDailyTrades": 3
}`,
            responseSchema: `{
  "success": true,
  "message": "Cấu hình bot đã được cập nhật",
  "settings": {
    "riskLevel": "LOW",
    "dailyTarget": "0.8%",
    "maxDailyTrades": 3
  }
}`
          }
        ]
      }
    ]
  },
  {
    id: "accounts",
    title: "Quản lý Tài khoản",
    endpoints: [
      {
        method: "GET",
        path: "/api/accounts",
        description: "Lấy danh sách tài khoản giao dịch",
        authentication: true,
        parameters: [
          {
            name: "page",
            type: "number",
            required: false,
            description: "Số trang, bắt đầu từ 1"
          },
          {
            name: "limit",
            type: "number",
            required: false,
            description: "Số lượng kết quả trên mỗi trang"
          },
          {
            name: "exchange",
            type: "string",
            required: false,
            description: "Lọc theo sàn giao dịch (BINANCE, KUCOIN, etc)"
          },
          {
            name: "status",
            type: "string",
            required: false,
            description: "Lọc theo trạng thái (CONNECTED, DISCONNECTED, ERROR)"
          }
        ],
        responseSchema: `{
  "data": [
    {
      "id": "ACC-12345",
      "name": "Binance Main",
      "exchange": "BINANCE",
      "status": "CONNECTED",
      "balance": {
        "total": "5240.75",
        "available": "4120.50",
        "currency": "USDT"
      },
      "lastUpdated": "2023-11-10T14:25:00Z",
      "connectedBots": 2
    }
  ],
  "pagination": {
    "total": 3,
    "page": 1,
    "limit": 10,
    "pages": 1
  }
}`
      },
      {
        method: "POST",
        path: "/api/accounts",
        description: "Thêm tài khoản giao dịch mới",
        authentication: true,
        requestSchema: `{
  "name": "Binance Spot",
  "exchange": "BINANCE",
  "apiKey": "your-api-key",
  "apiSecret": "your-api-secret",
  "description": "Tài khoản Binance cho giao dịch spot"
}`,
        responseSchema: `{
  "success": true,
  "message": "Tài khoản đã được thêm thành công",
  "account": {
    "id": "ACC-67890",
    "name": "Binance Spot",
    "exchange": "BINANCE",
    "status": "CONNECTED",
    "createdAt": "2023-11-15T10:30:00Z"
  }
}`
      },
      {
        method: "GET",
        path: "/api/accounts/:accountId",
        description: "Lấy thông tin chi tiết tài khoản giao dịch",
        authentication: true,
        parameters: [
          {
            name: "accountId",
            type: "string",
            required: true,
            description: "ID của tài khoản cần xem"
          }
        ],
        responseSchema: `{
  "id": "ACC-12345",
  "name": "Binance Main",
  "exchange": "BINANCE",
  "status": "CONNECTED",
  "createdAt": "2023-10-15T08:30:00Z",
  "updatedAt": "2023-11-10T14:25:00Z",
  "description": "Tài khoản Binance chính",
  "balance": {
    "total": "5240.75",
    "available": "4120.50",
    "inOrders": "1120.25",
    "currency": "USDT"
  },
  "assets": [
    {
      "symbol": "BTC",
      "amount": "0.12",
      "valueInUSDT": "4350.75"
    },
    {
      "symbol": "ETH",
      "amount": "1.5",
      "valueInUSDT": "890.00"
    }
  ],
  "connectedBots": [
    {
      "id": "BOT-12345",
      "name": "BTC Trend Bot",
      "status": "ACTIVE"
    },
    {
      "id": "IBOT-12345",
      "name": "Pro BTC Trend Master",
      "status": "ACTIVE"
    }
  ],
  "apiPermissions": {
    "trading": true,
    "withdrawal": false,
    "reading": true
  },
  "lastSync": "2023-11-10T14:25:00Z"
}`
      },
      {
        method: "PUT",
        path: "/api/accounts/:accountId",
        description: "Cập nhật thông tin tài khoản giao dịch",
        authentication: true,
        parameters: [
          {
            name: "accountId",
            type: "string",
            required: true,
            description: "ID của tài khoản cần cập nhật"
          }
        ],
        requestSchema: `{
  "name": "Binance Main Updated",
  "description": "Tài khoản Binance chính đã cập nhật",
  "apiKey": "your-new-api-key",
  "apiSecret": "your-new-api-secret"
}`,
        responseSchema: `{
  "success": true,
  "message": "Tài khoản đã được cập nhật",
  "account": {
    "id": "ACC-12345",
    "name": "Binance Main Updated",
    "status": "CONNECTED"
  }
}`
      },
      {
        method: "DELETE",
        path: "/api/accounts/:accountId",
        description: "Xóa tài khoản giao dịch",
        authentication: true,
        parameters: [
          {
            name: "accountId",
            type: "string",
            required: true,
            description: "ID của tài khoản cần xóa"
          }
        ],
        responseSchema: `{
  "success": true,
  "message": "Tài khoản đã được xóa"
}`
      },
      {
        method: "POST",
        path: "/api/accounts/:accountId/sync",
        description: "Đồng bộ dữ liệu tài khoản từ sàn giao dịch",
        authentication: true,
        parameters: [
          {
            name: "accountId",
            type: "string",
            required: true,
            description: "ID của tài khoản cần đồng bộ"
          }
        ],
        responseSchema: `{
  "success": true,
  "message": "Đồng bộ tài khoản thành công",
  "lastSync": "2023-11-15T10:30:00Z",
  "balance": {
    "total": "5240.75",
    "available": "4120.50",
    "currency": "USDT"
  }
}`
      }
    ]
  },
  {
    id: "signals",
    title: "Quản lý Tín hiệu",
    endpoints: [
      {
        method: "GET",
        path: "/api/signals",
        description: "Lấy danh sách tín hiệu giao dịch",
        authentication: true,
        parameters: [
          {
            name: "page",
            type: "number",
            required: false,
            description: "Số trang, bắt đầu từ 1"
          },
          {
            name: "limit",
            type: "number",
            required: false,
            description: "Số lượng kết quả trên mỗi trang"
          },
          {
            name: "botId",
            type: "string",
            required: false,
            description: "Lọc theo ID bot"
          },
          {
            name: "status",
            type: "string",
            required: false,
            description: "Lọc theo trạng thái (PENDING, EXECUTED, FAILED, CANCELLED)"
          },
          {
            name: "action",
            type: "string",
            required: false,
            description: "Lọc theo hành động (BUY, SELL)"
          },
          {
            name: "from",
            type: "string",
            required: false,
            description: "Ngày bắt đầu (ISO 8601 format)"
          },
          {
            name: "to",
            type: "string",
            required: false,
            description: "Ngày kết thúc (ISO 8601 format)"
          }
        ],
        responseSchema: `{
  "data": [
    {
      "id": "SIG-12345",
      "botId": "BOT-12345",
      "botName": "BTC Trend Bot",
      "symbol": "BTCUSDT",
      "action": "BUY",
      "price": "36250.50",
      "quantity": "0.01",
      "status": "EXECUTED",
      "timestamp": "2023-11-10T14:25:00Z",
      "executedAt": "2023-11-10T14:25:05Z"
    }
  ],
  "pagination": {
    "total": 120,
    "page": 1,
    "limit": 10,
    "pages": 12
  }
}`
      },
      {
        method: "GET",
        path: "/api/signals/:signalId",
        description: "Lấy thông tin chi tiết của tín hiệu giao dịch",
        authentication: true,
        parameters: [
          {
            name: "signalId",
            type: "string",
            required: true,
            description: "ID của tín hiệu cần xem"
          }
        ],
        responseSchema: `{
  "id": "SIG-12345",
  "botId": "BOT-12345",
  "botName": "BTC Trend Bot",
  "accountId": "ACC-12345",
  "accountName": "Binance Main",
  "symbol": "BTCUSDT",
  "action": "BUY",
  "type": "LIMIT",
  "price": "36250.50",
  "quantity": "0.01",
  "status": "EXECUTED",
  "timestamp": "2023-11-10T14:25:00Z",
  "executedAt": "2023-11-10T14:25:05Z",
  "orderId": "ORD-67890",
  "exchange": "BINANCE",
  "params": {
    "stopLoss": "35500.00",
    "takeProfit": "37500.00",
    "timeInForce": "GTC"
  },
  "notes": "Tín hiệu giao dịch dựa trên đột phá kênh giá",
  "error": null
}`
      },
      {
        method: "PUT",
        path: "/api/signals/:signalId/cancel",
        description: "Hủy tín hiệu giao dịch đang chờ xử lý",
        authentication: true,
        parameters: [
          {
            name: "signalId",
            type: "string",
            required: true,
            description: "ID của tín hiệu cần hủy"
          }
        ],
        responseSchema: `{
  "success": true,
  "message": "Tín hiệu giao dịch đã được hủy",
  "signal": {
    "id": "SIG-12345",
    "status": "CANCELLED",
    "cancelledAt": "2023-11-15T10:30:00Z"
  }
}`
      }
    ]
  },
  {
    id: "bot-errors",
    title: "Quản lý Lỗi Bot",
    endpoints: [
      {
        method: "GET",
        path: "/api/bot-errors",
        description: "Lấy danh sách lỗi của bot",
        authentication: true,
        parameters: [
          {
            name: "page",
            type: "number",
            required: false,
            description: "Số trang, bắt đầu từ 1"
          },
          {
            name: "limit",
            type: "number",
            required: false,
            description: "Số lượng kết quả trên mỗi trang"
          },
          {
            name: "botId",
            type: "string",
            required: false,
            description: "Lọc theo ID bot"
          },
          {
            name: "status",
            type: "string",
            required: false,
            description: "Lọc theo trạng thái (NEW, RESOLVED, IGNORED)"
          },
          {
            name: "severity",
            type: "string",
            required: false,
            description: "Lọc theo mức độ nghiêm trọng (LOW, MEDIUM, HIGH, CRITICAL)"
          },
          {
            name: "from",
            type: "string",
            required: false,
            description: "Ngày bắt đầu (ISO 8601 format)"
          },
          {
            name: "to",
            type: "string",
            required: false,
            description: "Ngày kết thúc (ISO 8601 format)"
          }
        ],
        responseSchema: `{
  "data": [
    {
      "id": "ERR-12345",
      "botId": "BOT-12345",
      "botName": "BTC Trend Bot",
      "errorCode": "API_CONNECTION_ERROR",
      "message": "Không thể kết nối đến API Binance",
      "timestamp": "2023-11-10T14:25:00Z",
      "status": "NEW",
      "severity": "HIGH",
      "affectedSignals": 3
    }
  ],
  "pagination": {
    "total": 25,
    "page": 1,
    "limit": 10,
    "pages": 3
  }
}`
      },
      {
        method: "GET",
        path: "/api/bot-errors/:errorId",
        description: "Lấy thông tin chi tiết lỗi bot",
        authentication: true,
        parameters: [
          {
            name: "errorId",
            type: "string",
            required: true,
            description: "ID của lỗi cần xem"
          }
        ],
        responseSchema: `{
  "id": "ERR-12345",
  "botId": "BOT-12345",
  "botName": "BTC Trend Bot",
  "accountId": "ACC-12345",
  "accountName": "Binance Main",
  "errorCode": "API_CONNECTION_ERROR",
  "message": "Không thể kết nối đến API Binance",
  "details": "Timeout after 30s waiting for response from api.binance.com",
  "timestamp": "2023-11-10T14:25:00Z",
  "status": "NEW",
  "severity": "HIGH",
  "resolution": null,
  "affectedSignals": [
    {
      "id": "SIG-67890",
      "action": "BUY",
      "symbol": "BTCUSDT",
      "timestamp": "2023-11-10T14:24:55Z"
    }
  ],
  "logs": [
    {
      "level": "ERROR",
      "message": "Connection timeout: api.binance.com",
      "timestamp": "2023-11-10T14:25:00Z"
    },
    {
      "level": "INFO",
      "message": "Retrying connection...",
      "timestamp": "2023-11-10T14:25:10Z"
    },
    {
      "level": "ERROR",
      "message": "Max retries exceeded",
      "timestamp": "2023-11-10T14:25:40Z"
    }
  ]
}`
      },
      {
        method: "PUT",
        path: "/api/bot-errors/:errorId/status",
        description: "Cập nhật trạng thái lỗi bot",
        authentication: true,
        parameters: [
          {
            name: "errorId",
            type: "string",
            required: true,
            description: "ID của lỗi cần cập nhật"
          }
        ],
        requestSchema: `{
  "status": "RESOLVED",
  "resolution": "Đã cập nhật API key mới cho tài khoản Binance"
}`,
        responseSchema: `{
  "success": true,
  "message": "Trạng thái lỗi đã được cập nhật",
  "error": {
    "id": "ERR-12345",
    "status": "RESOLVED",
    "resolvedAt": "2023-11-15T10:30:00Z"
  }
}`
      }
    ]
  },
  {
    id: "user-settings",
    title: "Thiết lập Người dùng",
    endpoints: [
      {
        method: "GET",
        path: "/api/user/settings",
        description: "Lấy thiết lập người dùng",
        authentication: true,
        responseSchema: `{
  "notifications": {
    "email": {
      "tradingSignals": true,
      "botErrors": true,
      "accountAlerts": true,
      "newsletter": false
    },
    "app": {
      "tradingSignals": true,
      "botErrors": true,
      "accountAlerts": true,
      "systemAnnouncements": true
    }
  },
  "appearance": {
    "theme": "dark",
    "language": "vi",
    "timezone": "Asia/Ho_Chi_Minh",
    "dateFormat": "DD/MM/YYYY"
  },
  "trading": {
    "defaultRiskLevel": "MEDIUM",
    "confirmTrades": true,
    "autoSync": true,
    "syncInterval": 15
  },
  "privacy": {
    "shareUsageData": true,
    "publicProfile": false
  }
}`
      },
      {
        method: "PUT",
        path: "/api/user/settings/notifications",
        description: "Cập nhật thiết lập thông báo",
        authentication: true,
        requestSchema: `{
  "email": {
    "tradingSignals": true,
    "botErrors": true,
    "accountAlerts": false,
    "newsletter": false
  },
  "app": {
    "tradingSignals": true,
    "botErrors": true,
    "accountAlerts": true,
    "systemAnnouncements": false
  }
}`,
        responseSchema: `{
  "success": true,
  "message": "Thiết lập thông báo đã được cập nhật"
}`
      },
      {
        method: "PUT",
        path: "/api/user/settings/appearance",
        description: "Cập nhật thiết lập giao diện",
        authentication: true,
        requestSchema: `{
  "theme": "light",
  "language": "en",
  "timezone": "UTC",
  "dateFormat": "MM/DD/YYYY"
}`,
        responseSchema: `{
  "success": true,
  "message": "Thiết lập giao diện đã được cập nhật"
}`
      },
      {
        method: "PUT",
        path: "/api/user/settings/trading",
        description: "Cập nhật thiết lập giao dịch",
        authentication: true,
        requestSchema: `{
  "defaultRiskLevel": "LOW",
  "confirmTrades": true,
  "autoSync": true,
  "syncInterval": 30
}`,
        responseSchema: `{
  "success": true,
  "message": "Thiết lập giao dịch đã được cập nhật"
}`
      },
      {
        method: "PUT",
        path: "/api/user/settings/privacy",
        description: "Cập nhật thiết lập quyền riêng tư",
        authentication: true,
        requestSchema: `{
  "shareUsageData": false,
  "publicProfile": false
}`,
        responseSchema: `{
  "success": true,
  "message": "Thiết lập quyền riêng tư đã được cập nhật"
}`
      }
    ]
  },
  {
    id: "system",
    title: "Hệ thống & Thông báo",
    endpoints: [
      {
        method: "GET",
        path: "/api/notifications",
        description: "Lấy danh sách thông báo",
        authentication: true,
        parameters: [
          {
            name: "page",
            type: "number",
            required: false,
            description: "Số trang, bắt đầu từ 1"
          },
          {
            name: "limit",
            type: "number",
            required: false,
            description: "Số lượng kết quả trên mỗi trang"
          },
          {
            name: "read",
            type: "boolean",
            required: false,
            description: "Lọc theo trạng thái đã đọc (true/false)"
          },
          {
            name: "type",
            type: "string",
            required: false,
            description: "Lọc theo loại thông báo (info, warning, error, success)"
          }
        ],
        responseSchema: `{
  "data": [
    {
      "id": "NOTIF-12345",
      "title": "Bot BTC Trend đã thực hiện giao dịch mới",
      "message": "Bot đã thực hiện lệnh mua BTC với giá $36,250.50",
      "timestamp": "2023-11-10T14:25:00Z",
      "read": false,
      "type": "info",
      "source": "bot",
      "sourceId": "BOT-12345",
      "link": "/bots/BOT-12345"
    }
  ],
  "pagination": {
    "total": 35,
    "page": 1,
    "limit": 10,
    "pages": 4
  },
  "unreadCount": 8
}`
      },
      {
        method: "PUT",
        path: "/api/notifications/:notificationId/read",
        description: "Đánh dấu thông báo là đã đọc",
        authentication: true,
        parameters: [
          {
            name: "notificationId",
            type: "string",
            required: true,
            description: "ID của thông báo cần đánh dấu đã đọc"
          }
        ],
        responseSchema: `{
  "success": true,
  "message": "Thông báo đã được đánh dấu là đã đọc"
}`
      },
      {
        method: "PUT",
        path: "/api/notifications/read-all",
        description: "Đánh dấu tất cả thông báo là đã đọc",
        authentication: true,
        responseSchema: `{
  "success": true,
  "message": "Tất cả thông báo đã được đánh dấu là đã đọc",
  "count": 8
}`
      },
      {
        method: "GET",
        path: "/api/system/status",
        description: "Kiểm tra trạng thái hệ thống",
        authentication: false,
        responseSchema: `{
  "status": "operational",
  "services": {
    "api": "operational",
    "trading": "operational",
    "database": "operational",
    "auth": "operational"
  },
  "version": "1.5.2",
  "uptime": "99.98%",
  "lastUpdated": "2023-11-15T10:30:00Z"
}`
      }
    ]
  }
];

// Creating TOC data from sections for sidebar
export const createTocFromSections = (sections: ApiDocSection[]) => {
  return sections.map(section => {
    const sectionItem = {
      id: section.id,
      title: section.title,
      subsections: section.subsections?.map(sub => ({
        id: sub.id,
        title: sub.title
      }))
    };
    
    return sectionItem;
  });
};
