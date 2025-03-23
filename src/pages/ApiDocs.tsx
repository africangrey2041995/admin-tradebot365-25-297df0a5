
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import MainLayout from "@/components/layout/MainLayout";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Search, ArrowRight, Code, RefreshCw, Key, Database, Shield, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const ApiDocs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('overview');
  const [openCollapsibles, setOpenCollapsibles] = useState<Record<string, boolean>>({});

  const toggleCollapsible = (id: string) => {
    setOpenCollapsibles(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Filter content based on search query
  const filterContent = (content: string) => {
    if (!searchQuery) return true;
    return content.toLowerCase().includes(searchQuery.toLowerCase());
  };

  return (
    <MainLayout title="API Documentation">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar - TOC */}
        <div className="lg:col-span-3">
          <Card className="sticky top-6">
            <CardHeader className="pb-3">
              <CardTitle>API Documentation</CardTitle>
              <CardDescription>TradeBot365 REST API</CardDescription>
              <div className="relative mt-2">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search documentation..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="pb-6">
              <ScrollArea className="h-[calc(100vh-280px)]">
                <div className="space-y-1">
                  <Command>
                    <CommandList>
                      <CommandGroup heading="Getting Started">
                        <CommandItem 
                          onSelect={() => setActiveSection('overview')}
                          className={cn(
                            activeSection === 'overview' ? 'bg-accent text-accent-foreground' : ''
                          )}
                        >
                          Overview
                        </CommandItem>
                        <CommandItem 
                          onSelect={() => setActiveSection('authentication')}
                          className={cn(
                            activeSection === 'authentication' ? 'bg-accent text-accent-foreground' : ''
                          )}
                        >
                          Authentication
                        </CommandItem>
                        <CommandItem 
                          onSelect={() => setActiveSection('errors')}
                          className={cn(
                            activeSection === 'errors' ? 'bg-accent text-accent-foreground' : ''
                          )}
                        >
                          Error Handling
                        </CommandItem>
                      </CommandGroup>
                      
                      <CommandGroup heading="User Resources">
                        <CommandItem 
                          onSelect={() => setActiveSection('user-profile')}
                          className={cn(
                            activeSection === 'user-profile' ? 'bg-accent text-accent-foreground' : ''
                          )}
                        >
                          User Profile
                        </CommandItem>
                        <CommandItem 
                          onSelect={() => setActiveSection('dashboard')}
                          className={cn(
                            activeSection === 'dashboard' ? 'bg-accent text-accent-foreground' : ''
                          )}
                        >
                          Dashboard
                        </CommandItem>
                        <CommandItem 
                          onSelect={() => setActiveSection('settings')}
                          className={cn(
                            activeSection === 'settings' ? 'bg-accent text-accent-foreground' : ''
                          )}
                        >
                          User Settings
                        </CommandItem>
                      </CommandGroup>
                      
                      <CommandGroup heading="Bot Management">
                        <CommandItem 
                          onSelect={() => setActiveSection('user-bots')}
                          className={cn(
                            activeSection === 'user-bots' ? 'bg-accent text-accent-foreground' : ''
                          )}
                        >
                          User Bots
                        </CommandItem>
                        <CommandItem 
                          onSelect={() => setActiveSection('premium-bots')}
                          className={cn(
                            activeSection === 'premium-bots' ? 'bg-accent text-accent-foreground' : ''
                          )}
                        >
                          Premium Bots
                        </CommandItem>
                        <CommandItem 
                          onSelect={() => setActiveSection('prop-bots')}
                          className={cn(
                            activeSection === 'prop-bots' ? 'bg-accent text-accent-foreground' : ''
                          )}
                        >
                          Prop Trading Bots
                        </CommandItem>
                        <CommandItem 
                          onSelect={() => setActiveSection('bot-errors')}
                          className={cn(
                            activeSection === 'bot-errors' ? 'bg-accent text-accent-foreground' : ''
                          )}
                        >
                          Bot Errors
                        </CommandItem>
                      </CommandGroup>
                      
                      <CommandGroup heading="Account Management">
                        <CommandItem 
                          onSelect={() => setActiveSection('accounts')}
                          className={cn(
                            activeSection === 'accounts' ? 'bg-accent text-accent-foreground' : ''
                          )}
                        >
                          Trading Accounts
                        </CommandItem>
                        <CommandItem 
                          onSelect={() => setActiveSection('connections')}
                          className={cn(
                            activeSection === 'connections' ? 'bg-accent text-accent-foreground' : ''
                          )}
                        >
                          Connections
                        </CommandItem>
                      </CommandGroup>
                      
                      <CommandGroup heading="Signals & Logs">
                        <CommandItem 
                          onSelect={() => setActiveSection('signals')}
                          className={cn(
                            activeSection === 'signals' ? 'bg-accent text-accent-foreground' : ''
                          )}
                        >
                          Trading Signals
                        </CommandItem>
                        <CommandItem 
                          onSelect={() => setActiveSection('logs')}
                          className={cn(
                            activeSection === 'logs' ? 'bg-accent text-accent-foreground' : ''
                          )}
                        >
                          Bot Logs
                        </CommandItem>
                      </CommandGroup>
                      
                      <CommandGroup heading="System">
                        <CommandItem 
                          onSelect={() => setActiveSection('system-status')}
                          className={cn(
                            activeSection === 'system-status' ? 'bg-accent text-accent-foreground' : ''
                          )}
                        >
                          System Status
                        </CommandItem>
                        <CommandItem 
                          onSelect={() => setActiveSection('notifications')}
                          className={cn(
                            activeSection === 'notifications' ? 'bg-accent text-accent-foreground' : ''
                          )}
                        >
                          Notifications
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                  </Command>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-9">
          <Tabs defaultValue="rest" className="mb-6">
            <TabsList>
              <TabsTrigger value="rest">REST API</TabsTrigger>
              <TabsTrigger value="graphql" disabled>GraphQL API (Coming Soon)</TabsTrigger>
            </TabsList>
            
            <TabsContent value="rest" className="space-y-6">
              {/* Overview Section */}
              {filterContent('overview') && activeSection === 'overview' && (
                <ApiDocSection
                  title="Overview"
                  icon={<Code className="h-5 w-5" />}
                  description="TradeBot365 REST API documentation for frontend and backend developers."
                >
                  <p className="text-muted-foreground mb-4">
                    This documentation provides a comprehensive guide to the TradeBot365 API. All API endpoints are designed to ensure secure and efficient communication between the frontend and backend systems.
                  </p>
                  
                  <h3 className="text-lg font-semibold mb-2">Base URL</h3>
                  <code className="bg-muted px-2 py-1 rounded text-sm block mb-4">
                    https://api.tradebot365.com/v1
                  </code>
                  
                  <h3 className="text-lg font-semibold mb-2">API Conventions</h3>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                    <li>All endpoints return data in JSON format</li>
                    <li>Timestamps are in ISO 8601 format (YYYY-MM-DDTHH:MM:SSZ)</li>
                    <li>All IDs follow standardized naming conventions</li>
                    <li>Error responses include detailed error messages and codes</li>
                    <li>Authentication is required for most endpoints</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold mb-2">ID Format Standards</h3>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li><strong>User IDs:</strong> Format <code>USR-XXX</code> or <code>user-XXX</code></li>
                    <li><strong>User Bot IDs:</strong> Format <code>BOT-XXX</code> or <code>ub-XXX</code></li>
                    <li><strong>Premium Bot IDs:</strong> Format <code>pb-XXX</code></li>
                    <li><strong>Prop Trading Bot IDs:</strong> Format <code>ptb-XXX</code></li>
                    <li><strong>Account IDs:</strong> Format <code>ACC-XXX</code></li>
                  </ul>
                </ApiDocSection>
              )}
              
              {/* Authentication Section */}
              {filterContent('authentication') && activeSection === 'authentication' && (
                <ApiDocSection
                  title="Authentication"
                  icon={<Key className="h-5 w-5" />}
                  description="Secure your API requests with authentication."
                >
                  <p className="text-muted-foreground mb-4">
                    All API requests must be authenticated using Bearer token authentication. Tokens are obtained through the authentication endpoints.
                  </p>
                  
                  <ApiEndpoint
                    method="POST"
                    path="/auth/login"
                    description="Authenticate a user and get an access token"
                    isOpen={openCollapsibles['auth-login']}
                    onToggle={() => toggleCollapsible('auth-login')}
                    request={{
                      body: {
                        email: "user@example.com",
                        password: "********"
                      }
                    }}
                    response={{
                      accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                      refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                      expiresIn: 3600,
                      userId: "USR-123"
                    }}
                  />
                  
                  <ApiEndpoint
                    method="POST"
                    path="/auth/refresh"
                    description="Refresh an access token"
                    isOpen={openCollapsibles['auth-refresh']}
                    onToggle={() => toggleCollapsible('auth-refresh')}
                    request={{
                      body: {
                        refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                      }
                    }}
                    response={{
                      accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                      expiresIn: 3600
                    }}
                  />
                  
                  <ApiEndpoint
                    method="POST"
                    path="/auth/register"
                    description="Register a new user"
                    isOpen={openCollapsibles['auth-register']}
                    onToggle={() => toggleCollapsible('auth-register')}
                    request={{
                      body: {
                        email: "newuser@example.com",
                        password: "********",
                        name: "New User",
                        country: "Vietnam",
                        acceptTerms: true
                      }
                    }}
                    response={{
                      userId: "USR-456",
                      email: "newuser@example.com",
                      name: "New User",
                      message: "User registered successfully"
                    }}
                  />
                  
                  <h3 className="text-lg font-semibold mt-6 mb-2">Using Authentication</h3>
                  <p className="text-muted-foreground mb-2">
                    Include the JWT token in the Authorization header:
                  </p>
                  <code className="bg-muted px-2 py-1 rounded text-sm block mb-4">
                    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
                  </code>
                </ApiDocSection>
              )}
              
              {/* Error Handling Section */}
              {filterContent('errors') && activeSection === 'errors' && (
                <ApiDocSection
                  title="Error Handling"
                  icon={<AlertCircle className="h-5 w-5" />}
                  description="Understanding API error responses and codes."
                >
                  <p className="text-muted-foreground mb-4">
                    The API uses conventional HTTP response codes to indicate the success or failure of a request. 
                    Codes in the 2xx range indicate success, codes in the 4xx range indicate an error with the 
                    provided information, and codes in the 5xx range indicate an error with the server.
                  </p>
                  
                  <h3 className="text-lg font-semibold mb-2">Error Response Format</h3>
                  <code className="bg-muted px-4 py-3 rounded text-sm block mb-4 whitespace-pre">
{`{
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "The provided credentials are invalid",
    "status": 401,
    "details": { ... }
  }
}`}
                  </code>
                  
                  <h3 className="text-lg font-semibold mb-2">Common Error Codes</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-4">Status Code</th>
                          <th className="text-left py-2 px-4">Error Code</th>
                          <th className="text-left py-2 px-4">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 px-4">400</td>
                          <td className="py-2 px-4">INVALID_REQUEST</td>
                          <td className="py-2 px-4">The request was malformed or invalid</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4">401</td>
                          <td className="py-2 px-4">UNAUTHORIZED</td>
                          <td className="py-2 px-4">Authentication is required or has failed</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4">403</td>
                          <td className="py-2 px-4">FORBIDDEN</td>
                          <td className="py-2 px-4">You don't have permission to access this resource</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4">404</td>
                          <td className="py-2 px-4">NOT_FOUND</td>
                          <td className="py-2 px-4">The requested resource was not found</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4">409</td>
                          <td className="py-2 px-4">CONFLICT</td>
                          <td className="py-2 px-4">The request conflicts with the current state of the resource</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4">422</td>
                          <td className="py-2 px-4">VALIDATION_ERROR</td>
                          <td className="py-2 px-4">The request data failed validation</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4">429</td>
                          <td className="py-2 px-4">RATE_LIMIT_EXCEEDED</td>
                          <td className="py-2 px-4">You've made too many requests</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4">500</td>
                          <td className="py-2 px-4">SERVER_ERROR</td>
                          <td className="py-2 px-4">An error occurred on the server</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </ApiDocSection>
              )}
              
              {/* User Profile Section */}
              {filterContent('user-profile') && activeSection === 'user-profile' && (
                <ApiDocSection
                  title="User Profile"
                  icon={<Database className="h-5 w-5" />}
                  description="API endpoints for managing user profile information."
                >
                  <ApiEndpoint
                    method="GET"
                    path="/user/profile"
                    description="Get current user's profile information"
                    isOpen={openCollapsibles['get-profile']}
                    onToggle={() => toggleCollapsible('get-profile')}
                    response={{
                      id: "USR-123",
                      email: "user@example.com",
                      name: "John Doe",
                      firstName: "John",
                      lastName: "Doe",
                      username: "johndoe",
                      phone: "+84123456789",
                      country: "Vietnam",
                      city: "Ho Chi Minh",
                      address: "123 Street",
                      postalCode: "70000",
                      avatar: "https://example.com/avatar.jpg",
                      role: "USER",
                      status: "ACTIVE",
                      plan: "PREMIUM",
                      createdAt: "2023-01-01T00:00:00Z",
                      updatedAt: "2023-02-01T00:00:00Z",
                      lastLogin: "2023-02-15T00:00:00Z",
                      emailVerified: true,
                      twoFactorEnabled: false,
                      preferences: {
                        theme: "dark",
                        language: "en",
                        notificationsEnabled: true,
                        emailNotificationsEnabled: true,
                        smsNotificationsEnabled: false
                      },
                      bots: 5,
                      joinDate: "2023-01-01T00:00:00Z",
                      botTypes: ["USER_BOT", "PREMIUM_BOT"],
                      activity: "active"
                    }}
                  />
                  
                  <ApiEndpoint
                    method="PUT"
                    path="/user/profile"
                    description="Update user profile information"
                    isOpen={openCollapsibles['update-profile']}
                    onToggle={() => toggleCollapsible('update-profile')}
                    request={{
                      body: {
                        name: "John Smith",
                        firstName: "John",
                        lastName: "Smith",
                        phone: "+84987654321",
                        city: "Hanoi",
                        address: "456 Street",
                        postalCode: "10000"
                      }
                    }}
                    response={{
                      id: "USR-123",
                      name: "John Smith",
                      firstName: "John",
                      lastName: "Smith",
                      phone: "+84987654321",
                      city: "Hanoi",
                      address: "456 Street",
                      postalCode: "10000",
                      updatedAt: "2023-03-01T00:00:00Z",
                      message: "Profile updated successfully"
                    }}
                  />
                  
                  <ApiEndpoint
                    method="PATCH"
                    path="/user/profile/avatar"
                    description="Update user avatar"
                    isOpen={openCollapsibles['update-avatar']}
                    onToggle={() => toggleCollapsible('update-avatar')}
                    request={{
                      formData: true,
                      body: {
                        avatar: "File upload"
                      }
                    }}
                    response={{
                      avatarUrl: "https://example.com/new-avatar.jpg",
                      message: "Avatar updated successfully"
                    }}
                  />
                  
                  <ApiEndpoint
                    method="PUT"
                    path="/user/profile/password"
                    description="Change user password"
                    isOpen={openCollapsibles['change-password']}
                    onToggle={() => toggleCollapsible('change-password')}
                    request={{
                      body: {
                        currentPassword: "********",
                        newPassword: "********",
                        confirmPassword: "********"
                      }
                    }}
                    response={{
                      message: "Password changed successfully"
                    }}
                  />
                  
                  <ApiEndpoint
                    method="PUT"
                    path="/user/profile/two-factor"
                    description="Enable/disable two-factor authentication"
                    isOpen={openCollapsibles['update-2fa']}
                    onToggle={() => toggleCollapsible('update-2fa')}
                    request={{
                      body: {
                        enable: true,
                        verificationCode: "123456"
                      }
                    }}
                    response={{
                      twoFactorEnabled: true,
                      message: "Two-factor authentication enabled"
                    }}
                  />
                </ApiDocSection>
              )}
              
              {/* Dashboard Section */}
              {filterContent('dashboard') && activeSection === 'dashboard' && (
                <ApiDocSection
                  title="Dashboard"
                  icon={<Database className="h-5 w-5" />}
                  description="API endpoints for dashboard data."
                >
                  <ApiEndpoint
                    method="GET"
                    path="/dashboard/overview"
                    description="Get dashboard overview data"
                    isOpen={openCollapsibles['dashboard-overview']}
                    onToggle={() => toggleCollapsible('dashboard-overview')}
                    response={{
                      totalBots: 5,
                      activeBots: 3,
                      totalAccounts: 8,
                      connectedAccounts: 6,
                      totalSignals: 150,
                      successfulSignals: 125,
                      failedSignals: 25,
                      overallPerformance: "+15.2%",
                      systemHealth: "healthy",
                      lastUpdated: "2023-03-15T12:30:45Z"
                    }}
                  />
                  
                  <ApiEndpoint
                    method="GET"
                    path="/dashboard/performance"
                    description="Get bot performance statistics"
                    isOpen={openCollapsibles['dashboard-performance']}
                    onToggle={() => toggleCollapsible('dashboard-performance')}
                    request={{
                      query: {
                        period: "30d",
                        botType: "all"
                      }
                    }}
                    response={{
                      period: "30d",
                      overallPerformance: "+12.5%",
                      chartData: [
                        { date: "2023-02-15", performance: 10.2 },
                        { date: "2023-03-01", performance: 11.5 },
                        { date: "2023-03-15", performance: 12.5 }
                      ],
                      botPerformance: [
                        {
                          botId: "BOT-123",
                          botName: "My Trading Bot",
                          performance: "+18.5%",
                          trades: 42,
                          winRate: "68%"
                        },
                        {
                          botId: "pb-456",
                          botName: "Premium Strategy",
                          performance: "+12.3%",
                          trades: 87,
                          winRate: "72%"
                        }
                      ]
                    }}
                  />
                  
                  <ApiEndpoint
                    method="GET"
                    path="/dashboard/activity"
                    description="Get recent activity"
                    isOpen={openCollapsibles['dashboard-activity']}
                    onToggle={() => toggleCollapsible('dashboard-activity')}
                    request={{
                      query: {
                        limit: 10,
                        page: 1
                      }
                    }}
                    response={{
                      activities: [
                        {
                          id: "act-123",
                          type: "bot_signal",
                          botId: "BOT-123",
                          botName: "My Trading Bot",
                          action: "BUY",
                          symbol: "BTCUSDT",
                          timestamp: "2023-03-15T10:45:30Z",
                          status: "success"
                        },
                        {
                          id: "act-124",
                          type: "bot_integration",
                          botId: "pb-456",
                          botName: "Premium Strategy",
                          action: "INTEGRATED",
                          timestamp: "2023-03-14T14:22:10Z",
                          status: "success"
                        }
                      ],
                      pagination: {
                        currentPage: 1,
                        totalPages: 5,
                        totalItems: 48,
                        limit: 10
                      }
                    }}
                  />
                </ApiDocSection>
              )}
              
              {/* User Bots Section */}
              {filterContent('user-bots') && activeSection === 'user-bots' && (
                <ApiDocSection
                  title="User Bots"
                  icon={<Database className="h-5 w-5" />}
                  description="API endpoints for managing user bots."
                >
                  <ApiEndpoint
                    method="GET"
                    path="/bots"
                    description="Get all user bots"
                    isOpen={openCollapsibles['get-bots']}
                    onToggle={() => toggleCollapsible('get-bots')}
                    request={{
                      query: {
                        page: 1,
                        limit: 10,
                        status: "active",
                        sortBy: "createdDate"
                      }
                    }}
                    response={{
                      bots: [
                        {
                          id: "BOT-123",
                          name: "My Trading Bot",
                          description: "My personal trading strategy",
                          status: "ACTIVE",
                          type: "USER_BOT",
                          createdDate: "2023-01-15T00:00:00Z",
                          lastUpdated: "2023-03-01T00:00:00Z",
                          risk: "MEDIUM",
                          owner: "John Doe",
                          ownerId: "USR-123",
                          accounts: 3,
                          strategy: "Momentum",
                          isActive: true
                        }
                      ],
                      pagination: {
                        currentPage: 1,
                        totalPages: 3,
                        totalItems: 25,
                        limit: 10
                      }
                    }}
                  />
                  
                  <ApiEndpoint
                    method="GET"
                    path="/bots/{botId}"
                    description="Get user bot details"
                    isOpen={openCollapsibles['get-bot-detail']}
                    onToggle={() => toggleCollapsible('get-bot-detail')}
                    request={{
                      path: {
                        botId: "BOT-123"
                      }
                    }}
                    response={{
                      id: "BOT-123",
                      name: "My Trading Bot",
                      description: "My personal trading strategy",
                      status: "ACTIVE",
                      type: "USER_BOT",
                      createdDate: "2023-01-15T00:00:00Z",
                      lastUpdated: "2023-03-01T00:00:00Z",
                      risk: "MEDIUM",
                      owner: "John Doe",
                      ownerId: "USR-123",
                      accounts: 3,
                      accountsList: [
                        {
                          id: "ACC-123",
                          name: "Binance Account",
                          status: "Connected",
                          apiName: "Binance",
                          tradingAccountBalance: "12500.75"
                        }
                      ],
                      strategy: "Momentum",
                      isActive: true,
                      settings: {
                        maxLoss: "5%",
                        maxRisk: "2%",
                        maxPositions: 5,
                        activeTradingHours: ["09:00-17:00", "19:00-22:00"],
                        excludedSymbols: ["SHIBUSDT"],
                        includedSymbols: ["BTCUSDT", "ETHUSDT", "ADAUSDT"],
                        stopLoss: "2%",
                        takeProfit: "5%",
                        lotSize: "0.1",
                        leverage: "10x"
                      },
                      performance: {
                        totalPnL: "+1250.50",
                        totalTrades: 125,
                        winRate: "68%",
                        avgProfit: "2.1%",
                        avgLoss: "1.2%",
                        maxDrawdown: "5.8%",
                        profitFactor: "1.75",
                        lastMonthPerformance: "+8.5%",
                        allTimePerformance: "+15.2%",
                        monthlyPerformance: [
                          {
                            month: "2023-01",
                            performance: "+3.2%",
                            trades: 42,
                            winRate: "65%"
                          },
                          {
                            month: "2023-02",
                            performance: "+5.1%",
                            trades: 38,
                            winRate: "68%"
                          },
                          {
                            month: "2023-03",
                            performance: "+8.5%",
                            trades: 45,
                            winRate: "71%"
                          }
                        ]
                      }
                    }}
                  />
                  
                  <ApiEndpoint
                    method="POST"
                    path="/bots"
                    description="Create a new user bot"
                    isOpen={openCollapsibles['create-bot']}
                    onToggle={() => toggleCollapsible('create-bot')}
                    request={{
                      body: {
                        name: "New Trading Bot",
                        description: "My new trading strategy",
                        risk: "MEDIUM",
                        strategy: "Swing Trading",
                        settings: {
                          maxLoss: "5%",
                          maxRisk: "2%",
                          maxPositions: 5,
                          activeTradingHours: ["09:00-17:00"],
                          includedSymbols: ["BTCUSDT", "ETHUSDT"],
                          stopLoss: "2%",
                          takeProfit: "5%",
                          lotSize: "0.1",
                          leverage: "10x"
                        }
                      }
                    }}
                    response={{
                      id: "BOT-789",
                      name: "New Trading Bot",
                      description: "My new trading strategy",
                      status: "INACTIVE",
                      type: "USER_BOT",
                      createdDate: "2023-03-15T15:30:45Z",
                      lastUpdated: "2023-03-15T15:30:45Z",
                      risk: "MEDIUM",
                      owner: "John Doe",
                      ownerId: "USR-123",
                      accounts: 0,
                      strategy: "Swing Trading",
                      isActive: false,
                      settings: {
                        maxLoss: "5%",
                        maxRisk: "2%",
                        maxPositions: 5,
                        activeTradingHours: ["09:00-17:00"],
                        includedSymbols: ["BTCUSDT", "ETHUSDT"],
                        stopLoss: "2%",
                        takeProfit: "5%",
                        lotSize: "0.1",
                        leverage: "10x"
                      },
                      message: "Bot created successfully"
                    }}
                  />
                  
                  <ApiEndpoint
                    method="PUT"
                    path="/bots/{botId}"
                    description="Update a user bot"
                    isOpen={openCollapsibles['update-bot']}
                    onToggle={() => toggleCollapsible('update-bot')}
                    request={{
                      path: {
                        botId: "BOT-123"
                      },
                      body: {
                        name: "Updated Bot Name",
                        description: "Updated strategy description",
                        settings: {
                          maxLoss: "4%",
                          maxRisk: "1.5%",
                          maxPositions: 3
                        }
                      }
                    }}
                    response={{
                      id: "BOT-123",
                      name: "Updated Bot Name",
                      description: "Updated strategy description",
                      lastUpdated: "2023-03-15T16:45:30Z",
                      settings: {
                        maxLoss: "4%",
                        maxRisk: "1.5%",
                        maxPositions: 3,
                        activeTradingHours: ["09:00-17:00", "19:00-22:00"],
                        excludedSymbols: ["SHIBUSDT"],
                        includedSymbols: ["BTCUSDT", "ETHUSDT", "ADAUSDT"],
                        stopLoss: "2%",
                        takeProfit: "5%",
                        lotSize: "0.1",
                        leverage: "10x"
                      },
                      message: "Bot updated successfully"
                    }}
                  />
                  
                  <ApiEndpoint
                    method="DELETE"
                    path="/bots/{botId}"
                    description="Delete a user bot"
                    isOpen={openCollapsibles['delete-bot']}
                    onToggle={() => toggleCollapsible('delete-bot')}
                    request={{
                      path: {
                        botId: "BOT-123"
                      }
                    }}
                    response={{
                      id: "BOT-123",
                      message: "Bot deleted successfully"
                    }}
                  />
                </ApiDocSection>
              )}
              
              {/* Premium Bots Section */}
              {filterContent('premium-bots') && activeSection === 'premium-bots' && (
                <ApiDocSection
                  title="Premium Bots"
                  icon={<Database className="h-5 w-5" />}
                  description="API endpoints for premium bots."
                >
                  <ApiEndpoint
                    method="GET"
                    path="/premium-bots"
                    description="Get available premium bots"
                    isOpen={openCollapsibles['get-premium-bots']}
                    onToggle={() => toggleCollapsible('get-premium-bots')}
                    request={{
                      query: {
                        page: 1,
                        limit: 10,
                        sortBy: "performance",
                        minCapital: "1000"
                      }
                    }}
                    response={{
                      bots: [
                        {
                          id: "pb-123",
                          name: "Alpha Strategy",
                          description: "High-performance algorithmic trading strategy",
                          status: "ACTIVE",
                          type: "PREMIUM_BOT",
                          createdDate: "2023-01-01T00:00:00Z",
                          lastUpdated: "2023-03-01T00:00:00Z",
                          risk: "MEDIUM",
                          exchange: "Binance",
                          performanceLastMonth: "+12.5%",
                          performanceAllTime: "+87.3%",
                          minCapital: "5000",
                          subscribers: 156,
                          colorScheme: "blue",
                          isIntegrated: false,
                          features: [
                            "24/7 Trading",
                            "Multi-pair Strategy",
                            "Risk Management"
                          ],
                          tradingStyle: "Swing Trading",
                          timeframe: "4h",
                          markets: ["Crypto"]
                        }
                      ],
                      pagination: {
                        currentPage: 1,
                        totalPages: 3,
                        totalItems: 25,
                        limit: 10
                      }
                    }}
                  />
                  
                  <ApiEndpoint
                    method="GET"
                    path="/premium-bots/{botId}"
                    description="Get premium bot details"
                    isOpen={openCollapsibles['get-premium-bot-detail']}
                    onToggle={() => toggleCollapsible('get-premium-bot-detail')}
                    request={{
                      path: {
                        botId: "pb-123"
                      }
                    }}
                    response={{
                      id: "pb-123",
                      name: "Alpha Strategy",
                      description: "High-performance algorithmic trading strategy",
                      status: "ACTIVE",
                      type: "PREMIUM_BOT",
                      createdDate: "2023-01-01T00:00:00Z",
                      lastUpdated: "2023-03-01T00:00:00Z",
                      risk: "MEDIUM",
                      exchange: "Binance",
                      performanceLastMonth: "+12.5%",
                      performanceAllTime: "+87.3%",
                      minCapital: "5000",
                      subscribers: 156,
                      colorScheme: "blue",
                      isIntegrated: false,
                      features: [
                        "24/7 Trading",
                        "Multi-pair Strategy",
                        "Risk Management"
                      ],
                      tradingStyle: "Swing Trading",
                      timeframe: "4h",
                      markets: ["Crypto"],
                      performance: {
                        totalPnL: "+8735.50",
                        totalTrades: 742,
                        winRate: "73%",
                        avgProfit: "2.8%",
                        avgLoss: "1.1%",
                        maxDrawdown: "12.3%",
                        profitFactor: "2.54",
                        lastMonthPerformance: "+12.5%",
                        allTimePerformance: "+87.3%",
                        monthlyPerformance: [
                          {
                            month: "2023-01",
                            performance: "+8.7%",
                            trades: 62,
                            winRate: "75%"
                          },
                          {
                            month: "2023-02",
                            performance: "+10.2%",
                            trades: 58,
                            winRate: "72%"
                          },
                          {
                            month: "2023-03",
                            performance: "+12.5%",
                            trades: 65,
                            winRate: "71%"
                          }
                        ]
                      }
                    }}
                  />
                  
                  <ApiEndpoint
                    method="GET"
                    path="/integrated-premium-bots"
                    description="Get user's integrated premium bots"
                    isOpen={openCollapsibles['get-integrated-premium-bots']}
                    onToggle={() => toggleCollapsible('get-integrated-premium-bots')}
                    request={{
                      query: {
                        page: 1,
                        limit: 10
                      }
                    }}
                    response={{
                      bots: [
                        {
                          id: "pb-456-integrated",
                          originalId: "pb-456",
                          name: "Beta Strategy",
                          description: "Balanced risk-reward trading strategy",
                          status: "ACTIVE",
                          type: "PREMIUM_BOT",
                          createdDate: "2023-02-15T00:00:00Z",
                          lastUpdated: "2023-03-10T00:00:00Z",
                          integratedDate: "2023-02-15T10:30:45Z",
                          risk: "LOW",
                          accounts: [
                            {
                              id: "ACC-123",
                              name: "Binance Account",
                              status: "Connected"
                            }
                          ],
                          performance: {
                            totalPnL: "+325.50",
                            totalTrades: 28,
                            winRate: "75%",
                            lastMonthPerformance: "+5.8%"
                          }
                        }
                      ],
                      pagination: {
                        currentPage: 1,
                        totalPages: 1,
                        totalItems: 3,
                        limit: 10
                      }
                    }}
                  />
                  
                  <ApiEndpoint
                    method="POST"
                    path="/premium-bots/{botId}/integrate"
                    description="Integrate a premium bot"
                    isOpen={openCollapsibles['integrate-premium-bot']}
                    onToggle={() => toggleCollapsible('integrate-premium-bot')}
                    request={{
                      path: {
                        botId: "pb-123"
                      },
                      body: {
                        accountIds: ["ACC-123", "ACC-456"]
                      }
                    }}
                    response={{
                      id: "pb-123-integrated",
                      originalId: "pb-123",
                      name: "Alpha Strategy",
                      integratedDate: "2023-03-15T16:45:30Z",
                      status: "ACTIVE",
                      accounts: [
                        {
                          id: "ACC-123",
                          name: "Binance Account",
                          status: "Connected"
                        },
                        {
                          id: "ACC-456",
                          name: "Bybit Account",
                          status: "Connected"
                        }
                      ],
                      message: "Bot integrated successfully"
                    }}
                  />
                  
                  <ApiEndpoint
                    method="DELETE"
                    path="/integrated-premium-bots/{botId}"
                    description="Remove an integrated premium bot"
                    isOpen={openCollapsibles['remove-integrated-premium-bot']}
                    onToggle={() => toggleCollapsible('remove-integrated-premium-bot')}
                    request={{
                      path: {
                        botId: "pb-456-integrated"
                      }
                    }}
                    response={{
                      id: "pb-456-integrated",
                      message: "Bot integration removed successfully"
                    }}
                  />
                </ApiDocSection>
              )}
              
              {/* Prop Trading Bots Section */}
              {filterContent('prop-bots') && activeSection === 'prop-bots' && (
                <ApiDocSection
                  title="Prop Trading Bots"
                  icon={<Database className="h-5 w-5" />}
                  description="API endpoints for prop trading bots."
                >
                  <ApiEndpoint
                    method="GET"
                    path="/prop-bots"
                    description="Get available prop trading bots"
                    isOpen={openCollapsibles['get-prop-bots']}
                    onToggle={() => toggleCollapsible('get-prop-bots')}
                    request={{
                      query: {
                        page: 1,
                        limit: 10,
                        sortBy: "performance",
                        propFirm: "FTMO"
                      }
                    }}
                    response={{
                      bots: [
                        {
                          id: "ptb-123",
                          name: "FTMO Challenge Bot",
                          description: "Designed to pass FTMO challenge",
                          status: "ACTIVE",
                          type: "PROP_BOT",
                          createdDate: "2023-01-10T00:00:00Z",
                          lastUpdated: "2023-03-05T00:00:00Z",
                          risk: "LOW",
                          exchange: "MT4/MT5",
                          performanceLastMonth: "+8.3%",
                          performanceAllTime: "+45.7%",
                          minCapital: "10000",
                          users: 78,
                          profit: "+45.7%",
                          maxDrawdown: "4.8%",
                          propFirm: "FTMO",
                          challengeDuration: "30 days",
                          accountSizes: ["10K", "25K", "50K", "100K"]
                        }
                      ],
                      pagination: {
                        currentPage: 1,
                        totalPages: 2,
                        totalItems: 15,
                        limit: 10
                      }
                    }}
                  />
                  
                  <ApiEndpoint
                    method="GET"
                    path="/prop-bots/{botId}"
                    description="Get prop trading bot details"
                    isOpen={openCollapsibles['get-prop-bot-detail']}
                    onToggle={() => toggleCollapsible('get-prop-bot-detail')}
                    request={{
                      path: {
                        botId: "ptb-123"
                      }
                    }}
                    response={{
                      id: "ptb-123",
                      name: "FTMO Challenge Bot",
                      description: "Designed to pass FTMO challenge",
                      status: "ACTIVE",
                      type: "PROP_BOT",
                      createdDate: "2023-01-10T00:00:00Z",
                      lastUpdated: "2023-03-05T00:00:00Z",
                      risk: "LOW",
                      exchange: "MT4/MT5",
                      performanceLastMonth: "+8.3%",
                      performanceAllTime: "+45.7%",
                      minCapital: "10000",
                      users: 78,
                      profit: "+45.7%",
                      maxDrawdown: "4.8%",
                      propFirm: "FTMO",
                      challengeDuration: "30 days",
                      accountSizes: ["10K", "25K", "50K", "100K"],
                      performance: {
                        totalPnL: "+4570.00",
                        totalTrades: 325,
                        winRate: "68%",
                        avgProfit: "1.8%",
                        avgLoss: "0.7%",
                        maxDrawdown: "4.8%",
                        profitFactor: "2.57",
                        lastMonthPerformance: "+8.3%",
                        allTimePerformance: "+45.7%",
                        monthlyPerformance: [
                          {
                            month: "2023-01",
                            performance: "+12.3%",
                            trades: 108,
                            winRate: "67%"
                          },
                          {
                            month: "2023-02",
                            performance: "+9.5%",
                            trades: 98,
                            winRate: "70%"
                          },
                          {
                            month: "2023-03",
                            performance: "+8.3%",
                            trades: 119,
                            winRate: "68%"
                          }
                        ]
                      }
                    }}
                  />
                  
                  <ApiEndpoint
                    method="GET"
                    path="/integrated-prop-bots"
                    description="Get user's integrated prop trading bots"
                    isOpen={openCollapsibles['get-integrated-prop-bots']}
                    onToggle={() => toggleCollapsible('get-integrated-prop-bots')}
                    request={{
                      query: {
                        page: 1,
                        limit: 10
                      }
                    }}
                    response={{
                      bots: [
                        {
                          id: "ptb-456-integrated",
                          originalId: "ptb-456",
                          name: "Forex Prop Trader",
                          description: "Specialized in forex prop challenges",
                          status: "ACTIVE",
                          type: "PROP_BOT",
                          createdDate: "2023-02-20T00:00:00Z",
                          lastUpdated: "2023-03-12T00:00:00Z",
                          integratedDate: "2023-02-20T14:22:15Z",
                          risk: "MEDIUM",
                          accounts: [
                            {
                              id: "ACC-789",
                              name: "MT5 Account",
                              status: "Connected"
                            }
                          ],
                          performance: {
                            totalPnL: "+583.25",
                            totalTrades: 35,
                            winRate: "71%",
                            lastMonthPerformance: "+7.2%"
                          }
                        }
                      ],
                      pagination: {
                        currentPage: 1,
                        totalPages: 1,
                        totalItems: 2,
                        limit: 10
                      }
                    }}
                  />
                  
                  <ApiEndpoint
                    method="POST"
                    path="/prop-bots/{botId}/integrate"
                    description="Integrate a prop trading bot"
                    isOpen={openCollapsibles['integrate-prop-bot']}
                    onToggle={() => toggleCollapsible('integrate-prop-bot')}
                    request={{
                      path: {
                        botId: "ptb-123"
                      },
                      body: {
                        accountIds: ["ACC-789"]
                      }
                    }}
                    response={{
                      id: "ptb-123-integrated",
                      originalId: "ptb-123",
                      name: "FTMO Challenge Bot",
                      integratedDate: "2023-03-15T16:45:30Z",
                      status: "ACTIVE",
                      accounts: [
                        {
                          id: "ACC-789",
                          name: "MT5 Account",
                          status: "Connected"
                        }
                      ],
                      message: "Bot integrated successfully"
                    }}
                  />
                  
                  <ApiEndpoint
                    method="DELETE"
                    path="/integrated-prop-bots/{botId}"
                    description="Remove an integrated prop trading bot"
                    isOpen={openCollapsibles['remove-integrated-prop-bot']}
                    onToggle={() => toggleCollapsible('remove-integrated-prop-bot')}
                    request={{
                      path: {
                        botId: "ptb-456-integrated"
                      }
                    }}
                    response={{
                      id: "ptb-456-integrated",
                      message: "Bot integration removed successfully"
                    }}
                  />
                </ApiDocSection>
              )}
              
              {/* Bot Errors Section */}
              {filterContent('bot-errors') && activeSection === 'bot-errors' && (
                <ApiDocSection
                  title="Bot Errors"
                  icon={<Database className="h-5 w-5" />}
                  description="API endpoints for managing bot errors."
                >
                  <ApiEndpoint
                    method="GET"
                    path="/bot-errors"
                    description="Get bot errors"
                    isOpen={openCollapsibles['get-bot-errors']}
                    onToggle={() => toggleCollapsible('get-bot-errors')}
                    request={{
                      query: {
                        page: 1,
                        limit: 10,
                        botId: "BOT-123",
                        severity: "high",
                        status: "unresolved"
                      }
                    }}
                    response={{
                      errors: [
                        {
                          id: "err-123",
                          botId: "BOT-123",
                          botName: "My Trading Bot",
                          botType: "USER_BOT",
                          errorMessage: "API connection failed",
                          errorCode: "API_CONNECTION_ERROR",
                          timestamp: "2023-03-15T10:45:30Z",
                          severity: "high",
                          status: "unresolved",
                          details: {
                            accountId: "ACC-123",
                            apiEndpoint: "https://api.exchange.com/v1/account",
                            responseCode: 401
                          },
                          suggestedFix: "Check API key permissions and expiration date."
                        }
                      ],
                      pagination: {
                        currentPage: 1,
                        totalPages: 2,
                        totalItems: 15,
                        limit: 10
                      }
                    }}
                  />
                  
                  <ApiEndpoint
                    method="GET"
                    path="/bot-errors/{errorId}"
                    description="Get bot error details"
                    isOpen={openCollapsibles['get-bot-error-detail']}
                    onToggle={() => toggleCollapsible('get-bot-error-detail')}
                    request={{
                      path: {
                        errorId: "err-123"
                      }
                    }}
                    response={{
                      id: "err-123",
                      botId: "BOT-123",
                      botName: "My Trading Bot",
                      botType: "USER_BOT",
                      errorMessage: "API connection failed",
                      errorCode: "API_CONNECTION_ERROR",
                      timestamp: "2023-03-15T10:45:30Z",
                      severity: "high",
                      status: "unresolved",
                      details: {
                        accountId: "ACC-123",
                        apiEndpoint: "https://api.exchange.com/v1/account",
                        responseCode: 401,
                        requestHeaders: {
                          "Authorization": "Bearer ****",
                          "Content-Type": "application/json"
                        },
                        responseBody: {
                          error: "Unauthorized",
                          message: "Invalid API key"
                        },
                        stackTrace: "Error: API connection failed\n    at ConnectAPI (/app/src/services/api.js:35:12)\n    at processTicksAndRejections (/app/node_modules/node/internal/process/task_queues.js:95:5)"
                      },
                      suggestedFix: "Check API key permissions and expiration date.",
                      relatedErrors: [
                        {
                          id: "err-122",
                          botId: "BOT-123",
                          timestamp: "2023-03-15T10:40:15Z",
                          errorCode: "API_CONNECTION_ERROR",
                          status: "resolved"
                        }
                      ]
                    }}
                  />
                  
                  <ApiEndpoint
                    method="PATCH"
                    path="/bot-errors/{errorId}"
                    description="Update bot error status"
                    isOpen={openCollapsibles['update-bot-error']}
                    onToggle={() => toggleCollapsible('update-bot-error')}
                    request={{
                      path: {
                        errorId: "err-123"
                      },
                      body: {
                        status: "resolved",
                        notes: "Fixed by updating API key permissions."
                      }
                    }}
                    response={{
                      id: "err-123",
                      status: "resolved",
                      updatedAt: "2023-03-15T16:45:30Z",
                      notes: "Fixed by updating API key permissions.",
                      message: "Error status updated successfully"
                    }}
                  />
                  
                  <ApiEndpoint
                    method="GET"
                    path="/bot-errors/summary"
                    description="Get bot errors summary"
                    isOpen={openCollapsibles['get-bot-errors-summary']}
                    onToggle={() => toggleCollapsible('get-bot-errors-summary')}
                    response={{
                      totalErrors: 25,
                      unresolvedErrors: 15,
                      highSeverityErrors: 5,
                      mediumSeverityErrors: 10,
                      lowSeverityErrors: 10,
                      errorsByBot: [
                        {
                          botId: "BOT-123",
                          botName: "My Trading Bot",
                          totalErrors: 8,
                          unresolvedErrors: 3
                        },
                        {
                          botId: "pb-456-integrated",
                          botName: "Beta Strategy",
                          totalErrors: 4,
                          unresolvedErrors: 2
                        }
                      ],
                      recentTrends: {
                        last24Hours: 5,
                        last7Days: 15,
                        last30Days: 25,
                        changePercentage: "+20%"
                      }
                    }}
                  />
                </ApiDocSection>
              )}
              
              {/* Accounts Section */}
              {filterContent('accounts') && activeSection === 'accounts' && (
                <ApiDocSection
                  title="Trading Accounts"
                  icon={<Database className="h-5 w-5" />}
                  description="API endpoints for managing trading accounts."
                >
                  <ApiEndpoint
                    method="GET"
                    path="/accounts"
                    description="Get all user trading accounts"
                    isOpen={openCollapsibles['get-accounts']}
                    onToggle={() => toggleCollapsible('get-accounts')}
                    request={{
                      query: {
                        page: 1,
                        limit: 10,
                        status: "Connected",
                        sortBy: "createdDate"
                      }
                    }}
                    response={{
                      accounts: [
                        {
                          id: "ACC-123",
                          name: "Binance Account",
                          status: "Connected",
                          createdDate: "2023-01-15T00:00:00Z",
                          lastUpdated: "2023-03-01T00:00:00Z",
                          userId: "USR-123",
                          apiName: "Binance",
                          apiId: "binance",
                          tradingAccount: "futures",
                          tradingAccountType: "Live",
                          tradingAccountBalance: "12500.75",
                          volumeMultiplier: "1.0"
                        }
                      ],
                      pagination: {
                        currentPage: 1,
                        totalPages: 2,
                        totalItems: 15,
                        limit: 10
                      }
                    }}
                  />
                  
                  <ApiEndpoint
                    method="GET"
                    path="/accounts/{accountId}"
                    description="Get trading account details"
                    isOpen={openCollapsibles['get-account-detail']}
                    onToggle={() => toggleCollapsible('get-account-detail')}
                    request={{
                      path: {
                        accountId: "ACC-123"
                      }
                    }}
                    response={{
                      id: "ACC-123",
                      name: "Binance Account",
                      status: "Connected",
                      createdDate: "2023-01-15T00:00:00Z",
                      lastUpdated: "2023-03-01T00:00:00Z",
                      userId: "USR-123",
                      apiName: "Binance",
                      apiId: "binance",
                      tradingAccount: "futures",
                      tradingAccountType: "Live",
                      tradingAccountBalance: "12500.75",
                      volumeMultiplier: "1.0",
                      connectedBots: [
                        {
                          botId: "BOT-123",
                          botName: "My Trading Bot",
                          botType: "USER_BOT",
                          status: "ACTIVE"
                        },
                        {
                          botId: "pb-456-integrated",
                          botName: "Beta Strategy",
                          botType: "PREMIUM_BOT",
                          status: "ACTIVE"
                        }
                      ],
                      performance: {
                        totalPnL: "+1250.50",
                        totalTrades: 125,
                        winRate: "68%",
                        lastMonthPerformance: "+8.5%"
                      }
                    }}
                  />
                  
                  <ApiEndpoint
                    method="POST"
                    path="/accounts"
                    description="Create a new trading account"
                    isOpen={openCollapsibles['create-account']}
                    onToggle={() => toggleCollapsible('create-account')}
                    request={{
                      body: {
                        name: "Bybit Account",
                        apiName: "Bybit",
                        apiId: "bybit",
                        tradingAccount: "futures",
                        tradingAccountType: "Live",
                        clientId: "api-key-****",
                        secretId: "api-secret-****",
                        volumeMultiplier: "1.0"
                      }
                    }}
                    response={{
                      id: "ACC-456",
                      name: "Bybit Account",
                      status: "Connected",
                      createdDate: "2023-03-15T15:30:45Z",
                      lastUpdated: "2023-03-15T15:30:45Z",
                      userId: "USR-123",
                      apiName: "Bybit",
                      apiId: "bybit",
                      tradingAccount: "futures",
                      tradingAccountType: "Live",
                      tradingAccountBalance: "8750.25",
                      volumeMultiplier: "1.0",
                      message: "Account created successfully"
                    }}
                  />
                  
                  <ApiEndpoint
                    method="PUT"
                    path="/accounts/{accountId}"
                    description="Update a trading account"
                    isOpen={openCollapsibles['update-account']}
                    onToggle={() => toggleCollapsible('update-account')}
                    request={{
                      path: {
                        accountId: "ACC-123"
                      },
                      body: {
                        name: "Updated Binance Account",
                        volumeMultiplier: "0.8",
                        clientId: "new-api-key-****",
                        secretId: "new-api-secret-****"
                      }
                    }}
                    response={{
                      id: "ACC-123",
                      name: "Updated Binance Account",
                      lastUpdated: "2023-03-15T16:45:30Z",
                      volumeMultiplier: "0.8",
                      message: "Account updated successfully"
                    }}
                  />
                  
                  <ApiEndpoint
                    method="DELETE"
                    path="/accounts/{accountId}"
                    description="Delete a trading account"
                    isOpen={openCollapsibles['delete-account']}
                    onToggle={() => toggleCollapsible('delete-account')}
                    request={{
                      path: {
                        accountId: "ACC-123"
                      }
                    }}
                    response={{
                      id: "ACC-123",
                      message: "Account deleted successfully"
                    }}
                  />
                </ApiDocSection>
              )}
              
              {/* Signals Section */}
              {filterContent('signals') && activeSection === 'signals' && (
                <ApiDocSection
                  title="Trading Signals"
                  icon={<Database className="h-5 w-5" />}
                  description="API endpoints for trading signals."
                >
                  <ApiEndpoint
                    method="GET"
                    path="/signals"
                    description="Get trading signals"
                    isOpen={openCollapsibles['get-signals']}
                    onToggle={() => toggleCollapsible('get-signals')}
                    request={{
                      query: {
                        page: 1,
                        limit: 10,
                        botId: "BOT-123",
                        status: "executed"
                      }
                    }}
                    response={{
                      signals: [
                        {
                          id: "sig-123",
                          botId: "BOT-123",
                          botName: "My Trading Bot",
                          accountId: "ACC-123",
                          symbol: "BTCUSDT",
                          action: "BUY",
                          quantity: "0.01",
                          price: "45650.75",
                          timestamp: "2023-03-15T10:45:30Z",
                          status: "executed",
                          pnl: "+125.50",
                          closePrice: "46250.25",
                          closeTimestamp: "2023-03-15T14:22:15Z"
                        }
                      ],
                      pagination: {
                        currentPage: 1,
                        totalPages: 8,
                        totalItems: 75,
                        limit: 10
                      }
                    }}
                  />
                  
                  <ApiEndpoint
                    method="GET"
                    path="/signals/{signalId}"
                    description="Get signal details"
                    isOpen={openCollapsibles['get-signal-detail']}
                    onToggle={() => toggleCollapsible('get-signal-detail')}
                    request={{
                      path: {
                        signalId: "sig-123"
                      }
                    }}
                    response={{
                      id: "sig-123",
                      botId: "BOT-123",
                      botName: "My Trading Bot",
                      accountId: "ACC-123",
                      accountName: "Binance Account",
                      symbol: "BTCUSDT",
                      action: "BUY",
                      quantity: "0.01",
                      price: "45650.75",
                      stopLoss: "45000.25",
                      takeProfit: "46500.50",
                      orderType: "MARKET",
                      leverage: "10x",
                      timestamp: "2023-03-15T10:45:30Z",
                      status: "executed",
                      pnl: "+125.50",
                      pnlPercentage: "+2.75%",
                      closePrice: "46250.25",
                      closeTimestamp: "2023-03-15T14:22:15Z",
                      duration: "3h 36m 45s",
                      fees: "1.25",
                      notes: "Momentum strategy signal",
                      isRisky: false,
                      executionDetails: {
                        orderId: "1234567890",
                        filledQuantity: "0.01",
                        executionTime: "45ms",
                        slippage: "0.01%"
                      }
                    }}
                  />
                  
                  <ApiEndpoint
                    method="POST"
                    path="/signals/{signalId}/manual-close"
                    description="Manually close a signal/position"
                    isOpen={openCollapsibles['manual-close-signal']}
                    onToggle={() => toggleCollapsible('manual-close-signal')}
                    request={{
                      path: {
                        signalId: "sig-456"
                      },
                      body: {
                        closePrice: "47250.50",
                        notes: "Manually closed position due to market conditions"
                      }
                    }}
                    response={{
                      id: "sig-456",
                      status: "executed",
                      closePrice: "47250.50",
                      closeTimestamp: "2023-03-15T16:45:30Z",
                      pnl: "+325.75",
                      pnlPercentage: "+7.12%",
                      notes: "Manually closed position due to market conditions",
                      message: "Signal closed successfully"
                    }}
                  />
                  
                  <ApiEndpoint
                    method="GET"
                    path="/signals/statistics"
                    description="Get signal statistics"
                    isOpen={openCollapsibles['get-signal-stats']}
                    onToggle={() => toggleCollapsible('get-signal-stats')}
                    request={{
                      query: {
                        botId: "BOT-123",
                        period: "30d"
                      }
                    }}
                    response={{
                      period: "30d",
                      totalSignals: 125,
                      executedSignals: 118,
                      failedSignals: 7,
                      winningTrades: 80,
                      losingTrades: 38,
                      winRate: "67.8%",
                      totalPnL: "+1250.50",
                      totalPnLPercentage: "+10.2%",
                      averageTradeProfit: "+2.1%",
                      averageTradeLoss: "-1.2%",
                      largestProfit: "+5.8%",
                      largestLoss: "-3.2%",
                      symbolBreakdown: [
                        {
                          symbol: "BTCUSDT",
                          trades: 42,
                          winRate: "71.4%",
                          pnL: "+650.25"
                        },
                        {
                          symbol: "ETHUSDT",
                          trades: 35,
                          winRate: "65.7%",
                          pnL: "+420.50"
                        }
                      ]
                    }}
                  />
                </ApiDocSection>
              )}
              
              {/* Logs Section */}
              {filterContent('logs') && activeSection === 'logs' && (
                <ApiDocSection
                  title="Bot Logs"
                  icon={<Database className="h-5 w-5" />}
                  description="API endpoints for bot logs."
                >
                  <ApiEndpoint
                    method="GET"
                    path="/bot-logs"
                    description="Get bot logs"
                    isOpen={openCollapsibles['get-bot-logs']}
                    onToggle={() => toggleCollapsible('get-bot-logs')}
                    request={{
                      query: {
                        page: 1,
                        limit: 10,
                        botId: "BOT-123",
                        level: "info",
                        startDate: "2023-03-01T00:00:00Z",
                        endDate: "2023-03-15T23:59:59Z"
                      }
                    }}
                    response={{
                      logs: [
                        {
                          id: "log-123",
                          botId: "BOT-123",
                          botName: "My Trading Bot",
                          level: "info",
                          message: "Signal generated for BTCUSDT",
                          timestamp: "2023-03-15T10:45:30Z",
                          context: {
                            signalId: "sig-123",
                            action: "BUY",
                            price: "45650.75"
                          }
                        }
                      ],
                      pagination: {
                        currentPage: 1,
                        totalPages: 15,
                        totalItems: 145,
                        limit: 10
                      }
                    }}
                  />
                  
                  <ApiEndpoint
                    method="GET"
                    path="/bot-logs/{logId}"
                    description="Get bot log details"
                    isOpen={openCollapsibles['get-bot-log-detail']}
                    onToggle={() => toggleCollapsible('get-bot-log-detail')}
                    request={{
                      path: {
                        logId: "log-123"
                      }
                    }}
                    response={{
                      id: "log-123",
                      botId: "BOT-123",
                      botName: "My Trading Bot",
                      level: "info",
                      message: "Signal generated for BTCUSDT",
                      timestamp: "2023-03-15T10:45:30Z",
                      details: "Technical analysis indicates strong buy signal with RSI at 32 and MACD crossover",
                      context: {
                        signalId: "sig-123",
                        symbol: "BTCUSDT",
                        action: "BUY",
                        price: "45650.75",
                        indicators: {
                          rsi: 32,
                          macd: "crossover",
                          ema": "bullish"
                        }
                      },
                      relatedLogs: [
                        {
                          id: "log-122",
                          message: "Technical analysis completed for BTCUSDT",
                          timestamp: "2023-03-15T10:45:25Z",
                          level: "debug"
                        },
                        {
                          id: "log-124",
                          message: "Signal execution initiated for BTCUSDT",
                          timestamp: "2023-03-15T10:45:35Z",
                          level: "info"
                        }
                      ]
                    }}
                  />
                  
                  <ApiEndpoint
                    method="GET"
                    path="/bot-logs/summary"
                    description="Get bot logs summary"
                    isOpen={openCollapsibles['get-bot-logs-summary']}
                    onToggle={() => toggleCollapsible('get-bot-logs-summary')}
                    request={{
                      query: {
                        botId: "BOT-123",
                        period: "7d"
                      }
                    }}
                    response={{
                      period: "7d",
                      totalLogs: 325,
                      logLevels: {
                        error: 12,
                        warning: 25,
                        info: 158,
                        debug: 130
                      },
                      topErrorMessages: [
                        {
                          message: "API connection failed",
                          count: 5
                        },
                        {
                          message: "Order execution timeout",
                          count: 3
                        }
                      ],
                      activityTrend: {
                        daily: [
                          {
                            date: "2023-03-09",
                            count: 42,
                            errors: 1
                          },
                          {
                            date: "2023-03-10",
                            count: 45,
                            errors: 2
                          }
                          // Additional dates would be included...
                        ]
                      }
                    }}
                  />
                </ApiDocSection>
              )}
              
              {/* Settings Section */}
              {filterContent('settings') && activeSection === 'settings' && (
                <ApiDocSection
                  title="User Settings"
                  icon={<Database className="h-5 w-5" />}
                  description="API endpoints for user settings."
                >
                  <ApiEndpoint
                    method="GET"
                    path="/user/settings"
                    description="Get user settings"
                    isOpen={openCollapsibles['get-settings']}
                    onToggle={() => toggleCollapsible('get-settings')}
                    response={{
                      preferences: {
                        theme: "dark",
                        language: "en",
                        notificationsEnabled: true,
                        emailNotificationsEnabled: true,
                        smsNotificationsEnabled: false
                      },
                      trading: {
                        defaultRisk: "MEDIUM",
                        defaultLeverage: "10x",
                        defaultStopLoss: "2%",
                        defaultTakeProfit: "5%",
                        autoClosePositions: true,
                        tradingHours: ["00:00-23:59"]
                      },
                      security: {
                        twoFactorEnabled: false,
                        loginNotifications: true,
                        tradeNotifications: true,
                        ipWhitelist: []
                      },
                      appearance: {
                        chartType: "candlestick",
                        defaultTimeframe: "4h",
                        showPnL: true,
                        compactView: false,
                        colorScheme: "default"
                      }
                    }}
                  />
                  
                  <ApiEndpoint
                    method="PUT"
                    path="/user/settings/preferences"
                    description="Update user preferences"
                    isOpen={openCollapsibles['update-preferences']}
                    onToggle={() => toggleCollapsible('update-preferences')}
                    request={{
                      body: {
                        theme: "light",
                        language: "vi",
                        notificationsEnabled: true,
                        emailNotificationsEnabled: false
                      }
                    }}
                    response={{
                      preferences: {
                        theme: "light",
                        language: "vi",
                        notificationsEnabled: true,
                        emailNotificationsEnabled: false,
                        smsNotificationsEnabled: false
                      },
                      message: "Preferences updated successfully"
                    }}
                  />
                  
                  <ApiEndpoint
                    method="PUT"
                    path="/user/settings/trading"
                    description="Update trading settings"
                    isOpen={openCollapsibles['update-trading-settings']}
                    onToggle={() => toggleCollapsible('update-trading-settings')}
                    request={{
                      body: {
                        defaultRisk: "LOW",
                        defaultLeverage: "5x",
                        defaultStopLoss: "3%",
                        defaultTakeProfit: "6%"
                      }
                    }}
                    response={{
                      trading: {
                        defaultRisk: "LOW",
                        defaultLeverage: "5x",
                        defaultStopLoss: "3%",
                        defaultTakeProfit: "6%",
                        autoClosePositions: true,
                        tradingHours: ["00:00-23:59"]
                      },
                      message: "Trading settings updated successfully"
                    }}
                  />
                  
                  <ApiEndpoint
                    method="PUT"
                    path="/user/settings/security"
                    description="Update security settings"
                    isOpen={openCollapsibles['update-security-settings']}
                    onToggle={() => toggleCollapsible('update-security-settings')}
                    request={{
                      body: {
                        loginNotifications: false,
                        tradeNotifications: true,
                        ipWhitelist: ["192.168.1.1", "10.0.0.1"]
                      }
                    }}
                    response={{
                      security: {
                        twoFactorEnabled: false,
                        loginNotifications: false,
                        tradeNotifications: true,
                        ipWhitelist: ["192.168.1.1", "10.0.0.1"]
                      },
                      message: "Security settings updated successfully"
                    }}
                  />
                  
                  <ApiEndpoint
                    method="PUT"
                    path="/user/settings/appearance"
                    description="Update appearance settings"
                    isOpen={openCollapsibles['update-appearance-settings']}
                    onToggle={() => toggleCollapsible('update-appearance-settings')}
                    request={{
                      body: {
                        chartType: "line",
                        defaultTimeframe: "1h",
                        compactView: true
                      }
                    }}
                    response={{
                      appearance: {
                        chartType: "line",
                        defaultTimeframe: "1h",
                        showPnL: true,
                        compactView: true,
                        colorScheme: "default"
                      },
                      message: "Appearance settings updated successfully"
                    }}
                  />
                </ApiDocSection>
              )}
              
              {/* Connections Section */}
              {filterContent('connections') && activeSection === 'connections' && (
                <ApiDocSection
                  title="Connections"
                  icon={<Database className="h-5 w-5" />}
                  description="API endpoints for account connections."
                >
                  <ApiEndpoint
                    method="GET"
                    path="/connections"
                    description="Get all connection statuses"
                    isOpen={openCollapsibles['get-connections']}
                    onToggle={() => toggleCollapsible('get-connections')}
                    response={{
                      connections: [
                        {
                          accountId: "ACC-123",
                          accountName: "Binance Account",
                          connectionStatus: "Connected",
                          lastConnectionTime: "2023-03-15T10:45:30Z",
                          healthStatus: "healthy",
                          successfulConnections: 542,
                          failedConnections: 3
                        }
                      ]
                    }}
                  />
                  
                  <ApiEndpoint
                    method="GET"
                    path="/connections/{accountId}"
                    description="Get connection status for a specific account"
                    isOpen={openCollapsibles['get-connection-detail']}
                    onToggle={() => toggleCollapsible('get-connection-detail')}
                    request={{
                      path: {
                        accountId: "ACC-123"
                      }
                    }}
                    response={{
                      accountId: "ACC-123",
                      accountName: "Binance Account",
                      connectionStatus: "Connected",
                      lastConnectionTime: "2023-03-15T10:45:30Z",
                      lastDisconnectionTime: "2023-03-14T22:15:45Z",
                      errorMessage: null,
                      reconnectAttempts: 0,
                      healthStatus: "healthy",
                      successfulConnections: 542,
                      failedConnections: 3,
                      connectionHistory: [
                        {
                          timestamp: "2023-03-14T22:15:45Z",
                          status: "Disconnected",
                          reason: "API server maintenance"
                        },
                        {
                          timestamp: "2023-03-15T08:30:15Z",
                          status: "Connected",
                          reason: "User initiated"
                        }
                      ]
                    }}
                  />
                  
                  <ApiEndpoint
                    method="POST"
                    path="/connections/{accountId}/reconnect"
                    description="Manually reconnect an account"
                    isOpen={openCollapsibles['reconnect-account']}
                    onToggle={() => toggleCollapsible('reconnect-account')}
                    request={{
                      path: {
                        accountId: "ACC-123"
                      }
                    }}
                    response={{
                      accountId: "ACC-123",
                      connectionStatus: "Connected",
                      lastConnectionTime: "2023-03-15T16:45:30Z",
                      message: "Account reconnected successfully"
                    }}
                  />
                  
                  <ApiEndpoint
                    method="POST"
                    path="/connections/{accountId}/test"
                    description="Test account connection"
                    isOpen={openCollapsibles['test-connection']}
                    onToggle={() => toggleCollapsible('test-connection')}
                    request={{
                      path: {
                        accountId: "ACC-123"
                      }
                    }}
                    response={{
                      accountId: "ACC-123",
                      isConnected: true,
                      permissions: ["READ", "TRADE", "TRANSFER"],
                      responseTime: "125ms",
                      balance: "12500.75",
                      message: "Connection test successful"
                    }}
                  />
                </ApiDocSection>
              )}
              
              {/* System Status Section */}
              {filterContent('system-status') && activeSection === 'system-status' && (
                <ApiDocSection
                  title="System Status"
                  icon={<RefreshCw className="h-5 w-5" />}
                  description="API endpoints for system status."
                >
                  <ApiEndpoint
                    method="GET"
                    path="/system/status"
                    description="Get system status"
                    isOpen={openCollapsibles['get-system-status']}
                    onToggle={() => toggleCollapsible('get-system-status')}
                    response={{
                      status: "operational",
                      components: [
                        {
                          name: "API",
                          status: "operational",
                          uptime: "99.99%"
                        },
                        {
                          name: "Trading Engine",
                          status: "operational",
                          uptime: "99.95%"
                        },
                        {
                          name: "Database",
                          status: "operational",
                          uptime: "100%"
                        },
                        {
                          name: "Authentication",
                          status: "operational",
                          uptime: "99.99%"
                        }
                      ],
                      lastIncident: "2023-02-15T08:30:15Z",
                      uptime: "99.98%",
                      version: "1.0.5",
                      lastUpdated: "2023-03-15T16:45:30Z"
                    }}
                  />
                  
                  <ApiEndpoint
                    method="GET"
                    path="/system/stats"
                    description="Get system statistics"
                    isOpen={openCollapsibles['get-system-stats']}
                    onToggle={() => toggleCollapsible('get-system-stats')}
                    request={{
                      query: {
                        includePrivate: false
                      }
                    }}
                    response={{
                      totalUsers: 1250,
                      activeUsers: 875,
                      totalBots: 3250,
                      activeBots: 2150,
                      totalAccounts: 1750,
                      connectedAccounts: 1625,
                      totalTrades: 156250,
                      successfulTrades: 135480,
                      failedTrades: 20770,
                      systemLoad: 42,
                      uptime: "45d 12h 30m",
                      lastUpdated: "2023-03-15T16:45:30Z"
                    }}
                  />
                  
                  <ApiEndpoint
                    method="GET"
                    path="/system/version"
                    description="Get system version information"
                    isOpen={openCollapsibles['get-system-version']}
                    onToggle={() => toggleCollapsible('get-system-version')}
                    response={{
                      version: "1.0.5",
                      buildNumber: "1055",
                      releaseDate: "2023-03-01T00:00:00Z",
                      environment: "production",
                      features: [
                        "Premium Bot Integration",
                        "Prop Trading Support",
                        "Enhanced Error Handling"
                      ],
                      changelog: [
                        "Added support for FTMO prop trading",
                        "Fixed API connection timeout issues",
                        "Improved signal performance tracking"
                      ]
                    }}
                  />
                </ApiDocSection>
              )}
              
              {/* Notifications Section */}
              {filterContent('notifications') && activeSection === 'notifications' && (
                <ApiDocSection
                  title="Notifications"
                  icon={<Database className="h-5 w-5" />}
                  description="API endpoints for user notifications."
                >
                  <ApiEndpoint
                    method="GET"
                    path="/notifications"
                    description="Get user notifications"
                    isOpen={openCollapsibles['get-notifications']}
                    onToggle={() => toggleCollapsible('get-notifications')}
                    request={{
                      query: {
                        page: 1,
                        limit: 10,
                        read: false,
                        type: "all"
                      }
                    }}
                    response={{
                      notifications: [
                        {
                          id: "notif-123",
                          userId: "USR-123",
                          title: "Signal Executed",
                          message: "BUY signal for BTCUSDT was executed successfully",
                          timestamp: "2023-03-15T10:45:30Z",
                          read: false,
                          type: "success",
                          source: "bot",
                          sourceId: "BOT-123",
                          link: "/signals/sig-123",
                          linkText: "View Signal"
                        }
                      ],
                      pagination: {
                        currentPage: 1,
                        totalPages: 5,
                        totalItems: 42,
                        limit: 10
                      },
                      unreadCount: 12
                    }}
                  />
                  
                  <ApiEndpoint
                    method="GET"
                    path="/notifications/{notificationId}"
                    description="Get notification details"
                    isOpen={openCollapsibles['get-notification-detail']}
                    onToggle={() => toggleCollapsible('get-notification-detail')}
                    request={{
                      path: {
                        notificationId: "notif-123"
                      }
                    }}
                    response={{
                      id: "notif-123",
                      userId: "USR-123",
                      title: "Signal Executed",
                      message: "BUY signal for BTCUSDT was executed successfully at $45,650.75",
                      timestamp: "2023-03-15T10:45:30Z",
                      read: false,
                      type: "success",
                      source: "bot",
                      sourceId: "BOT-123",
                      link: "/signals/sig-123",
                      linkText: "View Signal",
                      details: {
                        signal: {
                          id: "sig-123",
                          symbol: "BTCUSDT",
                          action: "BUY",
                          price: "45650.75"
                        },
                        bot: {
                          id: "BOT-123",
                          name: "My Trading Bot"
                        }
                      }
                    }}
                  />
                  
                  <ApiEndpoint
                    method="PATCH"
                    path="/notifications/{notificationId}"
                    description="Mark notification as read"
                    isOpen={openCollapsibles['mark-notification-read']}
                    onToggle={() => toggleCollapsible('mark-notification-read')}
                    request={{
                      path: {
                        notificationId: "notif-123"
                      },
                      body: {
                        read: true
                      }
                    }}
                    response={{
                      id: "notif-123",
                      read: true,
                      message: "Notification marked as read"
                    }}
                  />
                  
                  <ApiEndpoint
                    method="PATCH"
                    path="/notifications/read-all"
                    description="Mark all notifications as read"
                    isOpen={openCollapsibles['mark-all-notifications-read']}
                    onToggle={() => toggleCollapsible('mark-all-notifications-read')}
                    response={{
                      count: 12,
                      message: "All notifications marked as read"
                    }}
                  />
                  
                  <ApiEndpoint
                    method="DELETE"
                    path="/notifications/{notificationId}"
                    description="Delete a notification"
                    isOpen={openCollapsibles['delete-notification']}
                    onToggle={() => toggleCollapsible('delete-notification')}
                    request={{
                      path: {
                        notificationId: "notif-123"
                      }
                    }}
                    response={{
                      id: "notif-123",
                      message: "Notification deleted successfully"
                    }}
                  />
                </ApiDocSection>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

const ApiDocSection = ({ 
  title, 
  icon, 
  description, 
  children 
}: { 
  title: string; 
  icon: React.ReactNode; 
  description: string; 
  children: React.ReactNode;
}) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {children}
      </CardContent>
    </Card>
  );
};

interface RequestDetails {
  path?: Record<string, string>;
  query?: Record<string, string>;
  body?: Record<string, any>;
  formData?: boolean;
}

interface ApiEndpointProps {
  method: string;
  path: string;
  description: string;
  isOpen: boolean;
  onToggle: () => void;
  request?: RequestDetails;
  response: Record<string, any>;
}

const ApiEndpoint = ({ 
  method, 
  path, 
  description,
  isOpen,
  onToggle,
  request,
  response
}: ApiEndpointProps) => {
  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-blue-500/20 text-blue-500';
      case 'POST': return 'bg-green-500/20 text-green-500';
      case 'PUT': return 'bg-amber-500/20 text-amber-500';
      case 'PATCH': return 'bg-purple-500/20 text-purple-500';
      case 'DELETE': return 'bg-red-500/20 text-red-500';
      default: return 'bg-gray-500/20 text-gray-500';
    }
  };
  
  return (
    <div className="border rounded-md overflow-hidden mb-4">
      <Collapsible open={isOpen} onOpenChange={onToggle}>
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50">
            <div className="flex items-center gap-3">
              <span className={cn("px-2 py-1 rounded text-xs font-medium", getMethodColor(method))}>
                {method}
              </span>
              <code className="text-sm font-mono">
                {path}
              </code>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden md:inline-block">
                {description}
              </span>
              <ChevronDown 
                className={cn("h-5 w-5 text-muted-foreground transition-transform", 
                  isOpen ? "transform rotate-180" : "")} 
              />
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="border-t p-4 bg-muted/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Request Section */}
              <div>
                <h4 className="text-sm font-medium mb-2">Request</h4>
                
                {/* Path Parameters */}
                {request?.path && Object.keys(request.path).length > 0 && (
                  <div className="mb-3">
                    <h5 className="text-xs font-medium text-muted-foreground mb-1">Path Parameters</h5>
                    <code className="text-xs bg-muted p-2 rounded block whitespace-pre">
                      {JSON.stringify(request.path, null, 2)}
                    </code>
                  </div>
                )}
                
                {/* Query Parameters */}
                {request?.query && Object.keys(request.query).length > 0 && (
                  <div className="mb-3">
                    <h5 className="text-xs font-medium text-muted-foreground mb-1">Query Parameters</h5>
                    <code className="text-xs bg-muted p-2 rounded block whitespace-pre">
                      {JSON.stringify(request.query, null, 2)}
                    </code>
                  </div>
                )}
                
                {/* Request Body */}
                {request?.body && Object.keys(request.body).length > 0 && (
                  <div className="mb-3">
                    <h5 className="text-xs font-medium text-muted-foreground mb-1">
                      {request.formData ? 'Form Data' : 'Request Body'}
                    </h5>
                    <code className="text-xs bg-muted p-2 rounded block whitespace-pre">
                      {JSON.stringify(request.body, null, 2)}
                    </code>
                  </div>
                )}
                
                {/* If no request data */}
                {(!request || (
                  (!request.path || Object.keys(request.path).length === 0) && 
                  (!request.query || Object.keys(request.query).length === 0) && 
                  (!request.body || Object.keys(request.body).length === 0)
                )) && (
                  <div className="text-xs text-muted-foreground italic">No request parameters required</div>
                )}
              </div>
              
              {/* Response Section */}
              <div>
                <h4 className="text-sm font-medium mb-2">Response</h4>
                <code className="text-xs bg-muted p-2 rounded block whitespace-pre overflow-auto max-h-[300px]">
                  {JSON.stringify(response, null, 2)}
                </code>
              </div>
            </div>
            
            {/* Example cURL Command */}
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Example cURL</h4>
              <code className="text-xs bg-muted p-2 rounded block whitespace-pre overflow-x-auto">
                {`curl -X ${method} \\
  "https://api.tradebot365.com/v1${path}${request?.query ? '?' + Object.entries(request.query).map(([k, v]) => `${k}=${v}`).join('&') : ''}" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\${request?.body ? `
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(request.body)}'` : ''}`}
              </code>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default ApiDocs;
