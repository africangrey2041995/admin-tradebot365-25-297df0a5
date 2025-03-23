
import React, { useState, useEffect, useRef } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { 
  Input, 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger, 
  ScrollArea,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent  
} from '@/components/ui';
import { Search, ArrowRight, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const ApiDocs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState('auth');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    auth: true,
    users: false,
    dashboard: false,
    bots: false,
    premium_bots: false,
    prop_bots: false,
    accounts: false,
    signals: false,
    settings: false
  });
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);
  
  const sectionRefs = {
    auth: useRef<HTMLDivElement>(null),
    users: useRef<HTMLDivElement>(null),
    dashboard: useRef<HTMLDivElement>(null),
    bots: useRef<HTMLDivElement>(null),
    premium_bots: useRef<HTMLDivElement>(null),
    prop_bots: useRef<HTMLDivElement>(null),
    accounts: useRef<HTMLDivElement>(null),
    signals: useRef<HTMLDivElement>(null),
    settings: useRef<HTMLDivElement>(null),
  };

  // Scroll to section when activeSection changes
  useEffect(() => {
    if (activeSection && sectionRefs[activeSection as keyof typeof sectionRefs]?.current) {
      sectionRefs[activeSection as keyof typeof sectionRefs].current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [activeSection]);

  // Filter documentation based on search term
  const filterDocs = (content: string) => {
    if (!searchTerm) return true;
    return content.toLowerCase().includes(searchTerm.toLowerCase());
  };

  // Toggle section expansion
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Copy endpoint to clipboard
  const copyToClipboard = (endpoint: string) => {
    navigator.clipboard.writeText(endpoint);
    setCopiedEndpoint(endpoint);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar - Table of Contents */}
            <div className="md:w-1/4 lg:w-1/5">
              <div className="sticky top-24">
                <Card className="bg-[#111111] border-zinc-800">
                  <CardHeader className="pb-3">
                    <CardTitle>API Reference</CardTitle>
                    <CardDescription>
                      Documentation for TradeBOT365 API
                    </CardDescription>
                    <div className="relative mt-2">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search documentation..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 bg-zinc-900 border-zinc-700"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="px-0 py-0">
                    <ScrollArea className="h-[calc(100vh-280px)]">
                      <div className="px-6 py-2">
                        <ul className="space-y-2">
                          <li>
                            <Button
                              variant="ghost"
                              className={cn(
                                "w-full justify-start font-medium text-sm",
                                activeSection === 'auth' ? "text-[#04ce91] bg-zinc-800/50" : "text-zinc-400"
                              )}
                              onClick={() => setActiveSection('auth')}
                            >
                              Authentication
                            </Button>
                          </li>
                          <li>
                            <Button
                              variant="ghost"
                              className={cn(
                                "w-full justify-start font-medium text-sm",
                                activeSection === 'users' ? "text-[#04ce91] bg-zinc-800/50" : "text-zinc-400"
                              )}
                              onClick={() => setActiveSection('users')}
                            >
                              User Profile
                            </Button>
                          </li>
                          <li>
                            <Button
                              variant="ghost"
                              className={cn(
                                "w-full justify-start font-medium text-sm",
                                activeSection === 'dashboard' ? "text-[#04ce91] bg-zinc-800/50" : "text-zinc-400"
                              )}
                              onClick={() => setActiveSection('dashboard')}
                            >
                              Dashboard
                            </Button>
                          </li>
                          <li>
                            <Button
                              variant="ghost"
                              className={cn(
                                "w-full justify-start font-medium text-sm",
                                activeSection === 'bots' ? "text-[#04ce91] bg-zinc-800/50" : "text-zinc-400"
                              )}
                              onClick={() => setActiveSection('bots')}
                            >
                              User Bots
                            </Button>
                          </li>
                          <li>
                            <Button
                              variant="ghost"
                              className={cn(
                                "w-full justify-start font-medium text-sm",
                                activeSection === 'premium_bots' ? "text-[#04ce91] bg-zinc-800/50" : "text-zinc-400"
                              )}
                              onClick={() => setActiveSection('premium_bots')}
                            >
                              Premium Bots
                            </Button>
                          </li>
                          <li>
                            <Button
                              variant="ghost"
                              className={cn(
                                "w-full justify-start font-medium text-sm",
                                activeSection === 'prop_bots' ? "text-[#04ce91] bg-zinc-800/50" : "text-zinc-400"
                              )}
                              onClick={() => setActiveSection('prop_bots')}
                            >
                              Prop Trading Bots
                            </Button>
                          </li>
                          <li>
                            <Button
                              variant="ghost"
                              className={cn(
                                "w-full justify-start font-medium text-sm",
                                activeSection === 'accounts' ? "text-[#04ce91] bg-zinc-800/50" : "text-zinc-400"
                              )}
                              onClick={() => setActiveSection('accounts')}
                            >
                              Trading Accounts
                            </Button>
                          </li>
                          <li>
                            <Button
                              variant="ghost"
                              className={cn(
                                "w-full justify-start font-medium text-sm",
                                activeSection === 'signals' ? "text-[#04ce91] bg-zinc-800/50" : "text-zinc-400"
                              )}
                              onClick={() => setActiveSection('signals')}
                            >
                              Signals & Logs
                            </Button>
                          </li>
                          <li>
                            <Button
                              variant="ghost"
                              className={cn(
                                "w-full justify-start font-medium text-sm",
                                activeSection === 'settings' ? "text-[#04ce91] bg-zinc-800/50" : "text-zinc-400"
                              )}
                              onClick={() => setActiveSection('settings')}
                            >
                              User Settings
                            </Button>
                          </li>
                        </ul>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:w-3/4 lg:w-4/5">
              <Tabs defaultValue="rest" className="w-full">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-3xl font-bold">TradeBOT365 API Documentation</h1>
                  <TabsList className="bg-zinc-900">
                    <TabsTrigger value="rest">RESTful API</TabsTrigger>
                    <TabsTrigger value="graphql" disabled>GraphQL</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="rest" className="mt-0">
                  <div className="space-y-12">
                    {/* API Overview */}
                    <Card className="bg-[#111111] border-zinc-800">
                      <CardHeader>
                        <CardTitle>API Overview</CardTitle>
                        <CardDescription>
                          Base URL: <code className="bg-zinc-800 p-1 rounded text-[#04ce91]">https://api.tradebot365.com/v1</code>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-zinc-400 mb-4">
                          All API requests require authentication using a JWT token in the Authorization header. 
                          The token is obtained through the authentication endpoints.
                        </p>
                        <div className="bg-zinc-900 p-4 rounded-md">
                          <code className="text-sm text-zinc-300">
                            <div>Authorization: Bearer {'{your_jwt_token}'}</div>
                          </code>
                        </div>
                        <div className="mt-6">
                          <h3 className="text-lg font-medium mb-2">Response Format</h3>
                          <p className="text-zinc-400 mb-2">
                            All responses follow a standard format:
                          </p>
                          <div className="bg-zinc-900 p-4 rounded-md">
                            <pre className="text-sm text-zinc-300">
{`{
  "success": true|false,
  "data": { /* response data */ },
  "message": "Success or error message",
  "errors": [] // Array of errors if success is false
}`}
                            </pre>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Authentication Section */}
                    {filterDocs('Authentication login register token refresh') && (
                      <div ref={sectionRefs.auth}>
                        <Card className="bg-[#111111] border-zinc-800">
                          <CardHeader className="flex flex-row items-center justify-between cursor-pointer" onClick={() => toggleSection('auth')}>
                            <div>
                              <CardTitle>Authentication</CardTitle>
                              <CardDescription>Endpoints for user authentication and session management</CardDescription>
                            </div>
                            {expandedSections.auth ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                          </CardHeader>
                          
                          {expandedSections.auth && (
                            <CardContent>
                              <div className="space-y-8">
                                {/* Login Endpoint */}
                                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                                  <div className="flex justify-between items-center bg-zinc-900 px-4 py-2">
                                    <div className="flex items-center">
                                      <span className="bg-emerald-600 text-white px-2 py-1 rounded text-xs font-bold mr-3">POST</span>
                                      <span className="text-zinc-300 font-mono">/auth/login</span>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => copyToClipboard('/auth/login')}
                                    >
                                      {copiedEndpoint === '/auth/login' ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="p-4 bg-zinc-950">
                                    <h4 className="text-sm font-medium mb-2">Request Body</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "email": "user@example.com",
  "password": "securePassword123"
}`}
                                    </pre>
                                    
                                    <h4 className="text-sm font-medium mt-4 mb-2">Response</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "name": "User Name",
      "role": "user",
      "createdAt": "2023-09-15T10:30:00Z"
    }
  },
  "message": "Login successful"
}`}
                                    </pre>
                                  </div>
                                </div>
                                
                                {/* Register Endpoint */}
                                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                                  <div className="flex justify-between items-center bg-zinc-900 px-4 py-2">
                                    <div className="flex items-center">
                                      <span className="bg-emerald-600 text-white px-2 py-1 rounded text-xs font-bold mr-3">POST</span>
                                      <span className="text-zinc-300 font-mono">/auth/register</span>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => copyToClipboard('/auth/register')}
                                    >
                                      {copiedEndpoint === '/auth/register' ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="p-4 bg-zinc-950">
                                    <h4 className="text-sm font-medium mb-2">Request Body</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "User Name"
}`}
                                    </pre>
                                    
                                    <h4 className="text-sm font-medium mt-4 mb-2">Response</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "name": "User Name",
      "role": "user",
      "createdAt": "2023-09-15T10:30:00Z"
    }
  },
  "message": "User registered successfully"
}`}
                                    </pre>
                                  </div>
                                </div>
                                
                                {/* Refresh Token Endpoint */}
                                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                                  <div className="flex justify-between items-center bg-zinc-900 px-4 py-2">
                                    <div className="flex items-center">
                                      <span className="bg-emerald-600 text-white px-2 py-1 rounded text-xs font-bold mr-3">POST</span>
                                      <span className="text-zinc-300 font-mono">/auth/refresh</span>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => copyToClipboard('/auth/refresh')}
                                    >
                                      {copiedEndpoint === '/auth/refresh' ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="p-4 bg-zinc-950">
                                    <h4 className="text-sm font-medium mb-2">Request Body</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}`}
                                    </pre>
                                    
                                    <h4 className="text-sm font-medium mt-4 mb-2">Response</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Token refreshed successfully"
}`}
                                    </pre>
                                  </div>
                                </div>
                                
                                {/* Logout Endpoint */}
                                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                                  <div className="flex justify-between items-center bg-zinc-900 px-4 py-2">
                                    <div className="flex items-center">
                                      <span className="bg-emerald-600 text-white px-2 py-1 rounded text-xs font-bold mr-3">POST</span>
                                      <span className="text-zinc-300 font-mono">/auth/logout</span>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => copyToClipboard('/auth/logout')}
                                    >
                                      {copiedEndpoint === '/auth/logout' ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="p-4 bg-zinc-950">
                                    <h4 className="text-sm font-medium mt-4 mb-2">Response</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "message": "Logged out successfully"
}`}
                                    </pre>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          )}
                        </Card>
                      </div>
                    )}

                    {/* User Profile Section */}
                    {filterDocs('User Profile details update') && (
                      <div ref={sectionRefs.users}>
                        <Card className="bg-[#111111] border-zinc-800">
                          <CardHeader className="flex flex-row items-center justify-between cursor-pointer" onClick={() => toggleSection('users')}>
                            <div>
                              <CardTitle>User Profile</CardTitle>
                              <CardDescription>Endpoints for managing user profile information</CardDescription>
                            </div>
                            {expandedSections.users ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                          </CardHeader>
                          
                          {expandedSections.users && (
                            <CardContent>
                              <div className="space-y-8">
                                {/* Get User Profile */}
                                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                                  <div className="flex justify-between items-center bg-zinc-900 px-4 py-2">
                                    <div className="flex items-center">
                                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold mr-3">GET</span>
                                      <span className="text-zinc-300 font-mono">/users/profile</span>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => copyToClipboard('/users/profile')}
                                    >
                                      {copiedEndpoint === '/users/profile' ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="p-4 bg-zinc-950">
                                    <h4 className="text-sm font-medium mb-2">Description</h4>
                                    <p className="text-zinc-400 text-sm mb-4">
                                      Returns the current user's profile information.
                                    </p>
                                    
                                    <h4 className="text-sm font-medium mt-4 mb-2">Response</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "User Name",
    "profilePicture": "https://example.com/profile.jpg",
    "role": "user",
    "planType": "premium",
    "planExpiry": "2023-12-31T23:59:59Z",
    "createdAt": "2023-09-15T10:30:00Z",
    "updatedAt": "2023-09-15T10:30:00Z"
  },
  "message": "User profile retrieved successfully"
}`}
                                    </pre>
                                  </div>
                                </div>
                                
                                {/* Update User Profile */}
                                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                                  <div className="flex justify-between items-center bg-zinc-900 px-4 py-2">
                                    <div className="flex items-center">
                                      <span className="bg-amber-500 text-white px-2 py-1 rounded text-xs font-bold mr-3">PUT</span>
                                      <span className="text-zinc-300 font-mono">/users/profile</span>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => copyToClipboard('/users/profile')}
                                    >
                                      {copiedEndpoint === '/users/profile' ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="p-4 bg-zinc-950">
                                    <h4 className="text-sm font-medium mb-2">Request Body</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "name": "Updated User Name",
  "profilePicture": "https://example.com/new-profile.jpg"
}`}
                                    </pre>
                                    
                                    <h4 className="text-sm font-medium mt-4 mb-2">Response</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "Updated User Name",
    "profilePicture": "https://example.com/new-profile.jpg",
    "role": "user",
    "planType": "premium",
    "planExpiry": "2023-12-31T23:59:59Z",
    "createdAt": "2023-09-15T10:30:00Z",
    "updatedAt": "2023-09-16T14:22:00Z"
  },
  "message": "User profile updated successfully"
}`}
                                    </pre>
                                  </div>
                                </div>
                                
                                {/* Change Password */}
                                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                                  <div className="flex justify-between items-center bg-zinc-900 px-4 py-2">
                                    <div className="flex items-center">
                                      <span className="bg-amber-500 text-white px-2 py-1 rounded text-xs font-bold mr-3">PUT</span>
                                      <span className="text-zinc-300 font-mono">/users/change-password</span>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => copyToClipboard('/users/change-password')}
                                    >
                                      {copiedEndpoint === '/users/change-password' ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="p-4 bg-zinc-950">
                                    <h4 className="text-sm font-medium mb-2">Request Body</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "currentPassword": "currentSecurePassword",
  "newPassword": "newSecurePassword"
}`}
                                    </pre>
                                    
                                    <h4 className="text-sm font-medium mt-4 mb-2">Response</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "message": "Password changed successfully"
}`}
                                    </pre>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          )}
                        </Card>
                      </div>
                    )}
                    
                    {/* Dashboard Section */}
                    {filterDocs('Dashboard stats overview') && (
                      <div ref={sectionRefs.dashboard}>
                        <Card className="bg-[#111111] border-zinc-800">
                          <CardHeader className="flex flex-row items-center justify-between cursor-pointer" onClick={() => toggleSection('dashboard')}>
                            <div>
                              <CardTitle>Dashboard</CardTitle>
                              <CardDescription>Endpoints for dashboard data and statistics</CardDescription>
                            </div>
                            {expandedSections.dashboard ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                          </CardHeader>
                          
                          {expandedSections.dashboard && (
                            <CardContent>
                              <div className="space-y-8">
                                {/* Dashboard Overview */}
                                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                                  <div className="flex justify-between items-center bg-zinc-900 px-4 py-2">
                                    <div className="flex items-center">
                                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold mr-3">GET</span>
                                      <span className="text-zinc-300 font-mono">/dashboard/overview</span>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => copyToClipboard('/dashboard/overview')}
                                    >
                                      {copiedEndpoint === '/dashboard/overview' ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="p-4 bg-zinc-950">
                                    <h4 className="text-sm font-medium mb-2">Description</h4>
                                    <p className="text-zinc-400 text-sm mb-4">
                                      Returns overview statistics for the user's dashboard.
                                    </p>
                                    
                                    <h4 className="text-sm font-medium mt-4 mb-2">Response</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "activeBots": 5,
    "totalAccounts": 8,
    "tradingVolume": 15243.78,
    "totalProfitLoss": 824.35,
    "recentActivity": [
      {
        "type": "BOT_STARTED",
        "botId": "bot_456",
        "botName": "ETH Trend Follower",
        "timestamp": "2023-09-16T12:30:00Z"
      },
      {
        "type": "ACCOUNT_ADDED",
        "accountId": "acc_789",
        "accountName": "Binance #2",
        "timestamp": "2023-09-15T10:15:00Z"
      }
    ]
  },
  "message": "Dashboard overview retrieved successfully"
}`}
                                    </pre>
                                  </div>
                                </div>
                                
                                {/* Performance Metrics */}
                                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                                  <div className="flex justify-between items-center bg-zinc-900 px-4 py-2">
                                    <div className="flex items-center">
                                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold mr-3">GET</span>
                                      <span className="text-zinc-300 font-mono">/dashboard/performance</span>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => copyToClipboard('/dashboard/performance')}
                                    >
                                      {copiedEndpoint === '/dashboard/performance' ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="p-4 bg-zinc-950">
                                    <h4 className="text-sm font-medium mb-2">Query Parameters</h4>
                                    <table className="w-full text-sm mb-4">
                                      <thead>
                                        <tr className="border-b border-zinc-800">
                                          <th className="text-left pb-2 text-zinc-400">Parameter</th>
                                          <th className="text-left pb-2 text-zinc-400">Type</th>
                                          <th className="text-left pb-2 text-zinc-400">Description</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td className="py-2 pr-4">timeframe</td>
                                          <td className="py-2 pr-4 text-zinc-400">string</td>
                                          <td className="py-2 text-zinc-400">Timeframe for metrics (day, week, month, year)</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    
                                    <h4 className="text-sm font-medium mt-4 mb-2">Response</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "timeframe": "month",
    "profitLossTimeline": [
      { "date": "2023-09-01", "value": 120.45 },
      { "date": "2023-09-02", "value": 95.22 },
      // Additional timeline data...
    ],
    "botPerformance": [
      {
        "botId": "bot_456",
        "botName": "ETH Trend Follower",
        "profitLoss": 324.56,
        "tradesWon": 15,
        "tradesLost": 7
      },
      // Additional bot performance data...
    ],
    "summary": {
      "totalProfitLoss": 824.35,
      "winRate": 68.2,
      "averageTradeProfit": 12.45
    }
  },
  "message": "Performance metrics retrieved successfully"
}`}
                                    </pre>
                                  </div>
                                </div>
                                
                                {/* System Status */}
                                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                                  <div className="flex justify-between items-center bg-zinc-900 px-4 py-2">
                                    <div className="flex items-center">
                                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold mr-3">GET</span>
                                      <span className="text-zinc-300 font-mono">/dashboard/system-status</span>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => copyToClipboard('/dashboard/system-status')}
                                    >
                                      {copiedEndpoint === '/dashboard/system-status' ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="p-4 bg-zinc-950">
                                    <h4 className="text-sm font-medium mb-2">Description</h4>
                                    <p className="text-zinc-400 text-sm mb-4">
                                      Returns the current system status and maintenance information.
                                    </p>
                                    
                                    <h4 className="text-sm font-medium mt-4 mb-2">Response</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "status": "operational",
    "components": [
      {
        "name": "Trading API",
        "status": "operational"
      },
      {
        "name": "Signal Processing",
        "status": "operational"
      },
      {
        "name": "Account Connections",
        "status": "operational"
      }
    ],
    "plannedMaintenance": {
      "scheduled": false,
      "startTime": null,
      "endTime": null,
      "description": null
    },
    "incidents": []
  },
  "message": "System status retrieved successfully"
}`}
                                    </pre>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          )}
                        </Card>
                      </div>
                    )}
                    
                    {/* User Bots Section */}
                    {filterDocs('Bots create list delete update') && (
                      <div ref={sectionRefs.bots}>
                        <Card className="bg-[#111111] border-zinc-800">
                          <CardHeader className="flex flex-row items-center justify-between cursor-pointer" onClick={() => toggleSection('bots')}>
                            <div>
                              <CardTitle>User Bots</CardTitle>
                              <CardDescription>Endpoints for managing user-created bots</CardDescription>
                            </div>
                            {expandedSections.bots ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                          </CardHeader>
                          
                          {expandedSections.bots && (
                            <CardContent>
                              <div className="space-y-8">
                                {/* List User Bots */}
                                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                                  <div className="flex justify-between items-center bg-zinc-900 px-4 py-2">
                                    <div className="flex items-center">
                                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold mr-3">GET</span>
                                      <span className="text-zinc-300 font-mono">/bots</span>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => copyToClipboard('/bots')}
                                    >
                                      {copiedEndpoint === '/bots' ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="p-4 bg-zinc-950">
                                    <h4 className="text-sm font-medium mb-2">Query Parameters</h4>
                                    <table className="w-full text-sm mb-4">
                                      <thead>
                                        <tr className="border-b border-zinc-800">
                                          <th className="text-left pb-2 text-zinc-400">Parameter</th>
                                          <th className="text-left pb-2 text-zinc-400">Type</th>
                                          <th className="text-left pb-2 text-zinc-400">Description</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td className="py-2 pr-4">page</td>
                                          <td className="py-2 pr-4 text-zinc-400">number</td>
                                          <td className="py-2 text-zinc-400">Page number for pagination (default: 1)</td>
                                        </tr>
                                        <tr>
                                          <td className="py-2 pr-4">limit</td>
                                          <td className="py-2 pr-4 text-zinc-400">number</td>
                                          <td className="py-2 text-zinc-400">Number of items per page (default: 10)</td>
                                        </tr>
                                        <tr>
                                          <td className="py-2 pr-4">status</td>
                                          <td className="py-2 pr-4 text-zinc-400">string</td>
                                          <td className="py-2 text-zinc-400">Filter by bot status (active, inactive, error)</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    
                                    <h4 className="text-sm font-medium mt-4 mb-2">Response</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "bots": [
      {
        "id": "bot_123",
        "name": "BTC Trend Follower",
        "description": "Follows BTC trends and executes trades",
        "status": "active",
        "tradingPair": "BTC/USDT",
        "strategy": "trend_following",
        "createdAt": "2023-09-15T10:30:00Z",
        "updatedAt": "2023-09-15T10:30:00Z",
        "performance": {
          "profitLoss": 245.67,
          "tradesExecuted": 18,
          "winRate": 72.2
        }
      },
      // Additional bots...
    ],
    "pagination": {
      "total": 25,
      "page": 1,
      "limit": 10,
      "totalPages": 3
    }
  },
  "message": "Bots retrieved successfully"
}`}
                                    </pre>
                                  </div>
                                </div>
                                
                                {/* Get Single Bot */}
                                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                                  <div className="flex justify-between items-center bg-zinc-900 px-4 py-2">
                                    <div className="flex items-center">
                                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold mr-3">GET</span>
                                      <span className="text-zinc-300 font-mono">/bots/:botId</span>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => copyToClipboard('/bots/:botId')}
                                    >
                                      {copiedEndpoint === '/bots/:botId' ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="p-4 bg-zinc-950">
                                    <h4 className="text-sm font-medium mb-2">Path Parameters</h4>
                                    <table className="w-full text-sm mb-4">
                                      <thead>
                                        <tr className="border-b border-zinc-800">
                                          <th className="text-left pb-2 text-zinc-400">Parameter</th>
                                          <th className="text-left pb-2 text-zinc-400">Type</th>
                                          <th className="text-left pb-2 text-zinc-400">Description</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td className="py-2 pr-4">botId</td>
                                          <td className="py-2 pr-4 text-zinc-400">string</td>
                                          <td className="py-2 text-zinc-400">ID of the bot to retrieve</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    
                                    <h4 className="text-sm font-medium mt-4 mb-2">Response</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "id": "bot_123",
    "name": "BTC Trend Follower",
    "description": "Follows BTC trends and executes trades",
    "status": "active",
    "tradingPair": "BTC/USDT",
    "strategy": "trend_following",
    "createdAt": "2023-09-15T10:30:00Z",
    "updatedAt": "2023-09-15T10:30:00Z",
    "settings": {
      "timeframe": "1h",
      "entryConditions": {
        "indicator": "RSI",
        "condition": "crossAbove",
        "value": 30
      },
      "exitConditions": {
        "indicator": "RSI",
        "condition": "crossBelow",
        "value": 70
      },
      "riskManagement": {
        "stopLoss": 5,
        "takeProfit": 10,
        "maxPositionSize": 0.1
      }
    },
    "performance": {
      "profitLoss": 245.67,
      "tradesExecuted": 18,
      "winRate": 72.2,
      "trades": [
        {
          "id": "trade_456",
          "timestamp": "2023-09-15T12:30:00Z",
          "type": "buy",
          "price": 26540.75,
          "amount": 0.05,
          "status": "closed",
          "profitLoss": 32.45
        },
        // Additional trades...
      ]
    },
    "connectedAccounts": [
      {
        "id": "acc_789",
        "name": "Binance Account",
        "exchange": "binance"
      }
    ]
  },
  "message": "Bot retrieved successfully"
}`}
                                    </pre>
                                  </div>
                                </div>
                                
                                {/* Create Bot */}
                                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                                  <div className="flex justify-between items-center bg-zinc-900 px-4 py-2">
                                    <div className="flex items-center">
                                      <span className="bg-emerald-600 text-white px-2 py-1 rounded text-xs font-bold mr-3">POST</span>
                                      <span className="text-zinc-300 font-mono">/bots</span>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => copyToClipboard('/bots')}
                                    >
                                      {copiedEndpoint === '/bots' ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="p-4 bg-zinc-950">
                                    <h4 className="text-sm font-medium mb-2">Request Body</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "name": "New Trading Bot",
  "description": "My new trading bot description",
  "tradingPair": "ETH/USDT",
  "strategy": "trend_following",
  "settings": {
    "timeframe": "1h",
    "entryConditions": {
      "indicator": "RSI",
      "condition": "crossAbove",
      "value": 30
    },
    "exitConditions": {
      "indicator": "RSI",
      "condition": "crossBelow",
      "value": 70
    },
    "riskManagement": {
      "stopLoss": 5,
      "takeProfit": 10,
      "maxPositionSize": 0.1
    }
  },
  "accountIds": ["acc_789"]
}`}
                                    </pre>
                                    
                                    <h4 className="text-sm font-medium mt-4 mb-2">Response</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "id": "bot_123",
    "name": "New Trading Bot",
    "description": "My new trading bot description",
    "status": "inactive",
    "tradingPair": "ETH/USDT",
    "strategy": "trend_following",
    "createdAt": "2023-09-16T15:30:00Z",
    "updatedAt": "2023-09-16T15:30:00Z",
    "settings": {
      "timeframe": "1h",
      "entryConditions": {
        "indicator": "RSI",
        "condition": "crossAbove",
        "value": 30
      },
      "exitConditions": {
        "indicator": "RSI",
        "condition": "crossBelow",
        "value": 70
      },
      "riskManagement": {
        "stopLoss": 5,
        "takeProfit": 10,
        "maxPositionSize": 0.1
      }
    },
    "connectedAccounts": [
      {
        "id": "acc_789",
        "name": "Binance Account",
        "exchange": "binance"
      }
    ]
  },
  "message": "Bot created successfully"
}`}
                                    </pre>
                                  </div>
                                </div>
                                
                                {/* Update Bot */}
                                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                                  <div className="flex justify-between items-center bg-zinc-900 px-4 py-2">
                                    <div className="flex items-center">
                                      <span className="bg-amber-500 text-white px-2 py-1 rounded text-xs font-bold mr-3">PUT</span>
                                      <span className="text-zinc-300 font-mono">/bots/:botId</span>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => copyToClipboard('/bots/:botId')}
                                    >
                                      {copiedEndpoint === '/bots/:botId' ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="p-4 bg-zinc-950">
                                    <h4 className="text-sm font-medium mb-2">Path Parameters</h4>
                                    <table className="w-full text-sm mb-4">
                                      <thead>
                                        <tr className="border-b border-zinc-800">
                                          <th className="text-left pb-2 text-zinc-400">Parameter</th>
                                          <th className="text-left pb-2 text-zinc-400">Type</th>
                                          <th className="text-left pb-2 text-zinc-400">Description</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td className="py-2 pr-4">botId</td>
                                          <td className="py-2 pr-4 text-zinc-400">string</td>
                                          <td className="py-2 text-zinc-400">ID of the bot to update</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    
                                    <h4 className="text-sm font-medium mb-2">Request Body</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "name": "Updated Bot Name",
  "description": "Updated description",
  "settings": {
    "timeframe": "4h",
    "entryConditions": {
      "indicator": "RSI",
      "condition": "crossAbove",
      "value": 25
    },
    "exitConditions": {
      "indicator": "RSI",
      "condition": "crossBelow",
      "value": 75
    },
    "riskManagement": {
      "stopLoss": 3,
      "takeProfit": 12,
      "maxPositionSize": 0.15
    }
  }
}`}
                                    </pre>
                                    
                                    <h4 className="text-sm font-medium mt-4 mb-2">Response</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "id": "bot_123",
    "name": "Updated Bot Name",
    "description": "Updated description",
    "status": "inactive",
    "tradingPair": "ETH/USDT",
    "strategy": "trend_following",
    "createdAt": "2023-09-16T15:30:00Z",
    "updatedAt": "2023-09-16T16:45:00Z",
    "settings": {
      "timeframe": "4h",
      "entryConditions": {
        "indicator": "RSI",
        "condition": "crossAbove",
        "value": 25
      },
      "exitConditions": {
        "indicator": "RSI",
        "condition": "crossBelow",
        "value": 75
      },
      "riskManagement": {
        "stopLoss": 3,
        "takeProfit": 12,
        "maxPositionSize": 0.15
      }
    },
    "connectedAccounts": [
      {
        "id": "acc_789",
        "name": "Binance Account",
        "exchange": "binance"
      }
    ]
  },
  "message": "Bot updated successfully"
}`}
                                    </pre>
                                  </div>
                                </div>
                                
                                {/* Delete Bot */}
                                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                                  <div className="flex justify-between items-center bg-zinc-900 px-4 py-2">
                                    <div className="flex items-center">
                                      <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold mr-3">DELETE</span>
                                      <span className="text-zinc-300 font-mono">/bots/:botId</span>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => copyToClipboard('/bots/:botId')}
                                    >
                                      {copiedEndpoint === '/bots/:botId' ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="p-4 bg-zinc-950">
                                    <h4 className="text-sm font-medium mb-2">Path Parameters</h4>
                                    <table className="w-full text-sm mb-4">
                                      <thead>
                                        <tr className="border-b border-zinc-800">
                                          <th className="text-left pb-2 text-zinc-400">Parameter</th>
                                          <th className="text-left pb-2 text-zinc-400">Type</th>
                                          <th className="text-left pb-2 text-zinc-400">Description</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td className="py-2 pr-4">botId</td>
                                          <td className="py-2 pr-4 text-zinc-400">string</td>
                                          <td className="py-2 text-zinc-400">ID of the bot to delete</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    
                                    <h4 className="text-sm font-medium mt-4 mb-2">Response</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "message": "Bot deleted successfully"
}`}
                                    </pre>
                                  </div>
                                </div>
                                
                                {/* Start/Stop Bot */}
                                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                                  <div className="flex justify-between items-center bg-zinc-900 px-4 py-2">
                                    <div className="flex items-center">
                                      <span className="bg-emerald-600 text-white px-2 py-1 rounded text-xs font-bold mr-3">POST</span>
                                      <span className="text-zinc-300 font-mono">/bots/:botId/toggle</span>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => copyToClipboard('/bots/:botId/toggle')}
                                    >
                                      {copiedEndpoint === '/bots/:botId/toggle' ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="p-4 bg-zinc-950">
                                    <h4 className="text-sm font-medium mb-2">Path Parameters</h4>
                                    <table className="w-full text-sm mb-4">
                                      <thead>
                                        <tr className="border-b border-zinc-800">
                                          <th className="text-left pb-2 text-zinc-400">Parameter</th>
                                          <th className="text-left pb-2 text-zinc-400">Type</th>
                                          <th className="text-left pb-2 text-zinc-400">Description</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td className="py-2 pr-4">botId</td>
                                          <td className="py-2 pr-4 text-zinc-400">string</td>
                                          <td className="py-2 text-zinc-400">ID of the bot to toggle</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    
                                    <h4 className="text-sm font-medium mb-2">Request Body</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "action": "start" // or "stop"
}`}
                                    </pre>
                                    
                                    <h4 className="text-sm font-medium mt-4 mb-2">Response</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "id": "bot_123",
    "status": "active", // or "inactive"
    "updatedAt": "2023-09-16T17:30:00Z"
  },
  "message": "Bot started successfully" // or "Bot stopped successfully"
}`}
                                    </pre>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          )}
                        </Card>
                      </div>
                    )}

                    {/* Premium Bots Section */}
                    {filterDocs('Premium bots subscribe integrate') && (
                      <div ref={sectionRefs.premium_bots}>
                        <Card className="bg-[#111111] border-zinc-800">
                          <CardHeader className="flex flex-row items-center justify-between cursor-pointer" onClick={() => toggleSection('premium_bots')}>
                            <div>
                              <CardTitle>Premium Bots</CardTitle>
                              <CardDescription>Endpoints for premium bot management</CardDescription>
                            </div>
                            {expandedSections.premium_bots ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                          </CardHeader>
                          
                          {expandedSections.premium_bots && (
                            <CardContent>
                              <div className="space-y-8">
                                {/* List Premium Bots */}
                                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                                  <div className="flex justify-between items-center bg-zinc-900 px-4 py-2">
                                    <div className="flex items-center">
                                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold mr-3">GET</span>
                                      <span className="text-zinc-300 font-mono">/premium-bots</span>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => copyToClipboard('/premium-bots')}
                                    >
                                      {copiedEndpoint === '/premium-bots' ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="p-4 bg-zinc-950">
                                    <h4 className="text-sm font-medium mb-2">Query Parameters</h4>
                                    <table className="w-full text-sm mb-4">
                                      <thead>
                                        <tr className="border-b border-zinc-800">
                                          <th className="text-left pb-2 text-zinc-400">Parameter</th>
                                          <th className="text-left pb-2 text-zinc-400">Type</th>
                                          <th className="text-left pb-2 text-zinc-400">Description</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td className="py-2 pr-4">page</td>
                                          <td className="py-2 pr-4 text-zinc-400">number</td>
                                          <td className="py-2 text-zinc-400">Page number for pagination (default: 1)</td>
                                        </tr>
                                        <tr>
                                          <td className="py-2 pr-4">limit</td>
                                          <td className="py-2 pr-4 text-zinc-400">number</td>
                                          <td className="py-2 text-zinc-400">Number of items per page (default: 10)</td>
                                        </tr>
                                        <tr>
                                          <td className="py-2 pr-4">category</td>
                                          <td className="py-2 pr-4 text-zinc-400">string</td>
                                          <td className="py-2 text-zinc-400">Filter by bot category</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    
                                    <h4 className="text-sm font-medium mt-4 mb-2">Response</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "premiumBots": [
      {
        "id": "pbot_123",
        "name": "Alpha BTC Predictor",
        "description": "Advanced BTC price prediction model",
        "category": "cryptocurrency",
        "tradingPairs": ["BTC/USDT"],
        "monthlyPrice": 29.99,
        "performance": {
          "lastMonth": 12.5,
          "lastQuarter": 38.2,
          "lastYear": 142.6
        },
        "rating": 4.8,
        "reviewCount": 124,
        "isPopular": true,
        "isSubscribed": false
      },
      // Additional premium bots...
    ],
    "pagination": {
      "total": 25,
      "page": 1,
      "limit": 10,
      "totalPages": 3
    }
  },
  "message": "Premium bots retrieved successfully"
}`}
                                    </pre>
                                  </div>
                                </div>
                                
                                {/* Get Premium Bot Details */}
                                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                                  <div className="flex justify-between items-center bg-zinc-900 px-4 py-2">
                                    <div className="flex items-center">
                                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold mr-3">GET</span>
                                      <span className="text-zinc-300 font-mono">/premium-bots/:botId</span>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => copyToClipboard('/premium-bots/:botId')}
                                    >
                                      {copiedEndpoint === '/premium-bots/:botId' ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="p-4 bg-zinc-950">
                                    <h4 className="text-sm font-medium mb-2">Path Parameters</h4>
                                    <table className="w-full text-sm mb-4">
                                      <thead>
                                        <tr className="border-b border-zinc-800">
                                          <th className="text-left pb-2 text-zinc-400">Parameter</th>
                                          <th className="text-left pb-2 text-zinc-400">Type</th>
                                          <th className="text-left pb-2 text-zinc-400">Description</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td className="py-2 pr-4">botId</td>
                                          <td className="py-2 pr-4 text-zinc-400">string</td>
                                          <td className="py-2 text-zinc-400">ID of the premium bot to retrieve</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    
                                    <h4 className="text-sm font-medium mt-4 mb-2">Response</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "id": "pbot_123",
    "name": "Alpha BTC Predictor",
    "description": "Advanced BTC price prediction model using machine learning and on-chain data analysis",
    "category": "cryptocurrency",
    "tradingPairs": ["BTC/USDT"],
    "monthlyPrice": 29.99,
    "yearlyPrice": 299.99,
    "features": [
      "Advanced technical analysis",
      "Market sentiment analysis",
      "Whale tracking",
      "Customizable alerts"
    ],
    "performance": {
      "lastMonth": 12.5,
      "lastQuarter": 38.2,
      "lastYear": 142.6,
      "monthlyHistory": [
        {"month": "2023-08", "return": 5.2},
        {"month": "2023-07", "return": 7.3},
        // Additional history...
      ]
    },
    "rating": 4.8,
    "reviewCount": 124,
    "reviews": [
      {
        "userId": "user_456",
        "userName": "John D.",
        "rating": 5,
        "comment": "Fantastic performance over the last 3 months!",
        "date": "2023-09-10T14:30:00Z"
      },
      // Additional reviews...
    ],
    "isPopular": true,
    "isSubscribed": false,
    "trialAvailable": true,
    "trialDays": 7
  },
  "message": "Premium bot details retrieved successfully"
}`}
                                    </pre>
                                  </div>
                                </div>
                                
                                {/* Subscribe to Premium Bot */}
                                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                                  <div className="flex justify-between items-center bg-zinc-900 px-4 py-2">
                                    <div className="flex items-center">
                                      <span className="bg-emerald-600 text-white px-2 py-1 rounded text-xs font-bold mr-3">POST</span>
                                      <span className="text-zinc-300 font-mono">/premium-bots/:botId/subscribe</span>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => copyToClipboard('/premium-bots/:botId/subscribe')}
                                    >
                                      {copiedEndpoint === '/premium-bots/:botId/subscribe' ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="p-4 bg-zinc-950">
                                    <h4 className="text-sm font-medium mb-2">Path Parameters</h4>
                                    <table className="w-full text-sm mb-4">
                                      <thead>
                                        <tr className="border-b border-zinc-800">
                                          <th className="text-left pb-2 text-zinc-400">Parameter</th>
                                          <th className="text-left pb-2 text-zinc-400">Type</th>
                                          <th className="text-left pb-2 text-zinc-400">Description</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td className="py-2 pr-4">botId</td>
                                          <td className="py-2 pr-4 text-zinc-400">string</td>
                                          <td className="py-2 text-zinc-400">ID of the premium bot to subscribe to</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    
                                    <h4 className="text-sm font-medium mb-2">Request Body</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "billingPeriod": "monthly", // or "yearly"
  "paymentMethodId": "pm_123456789",
  "isTrial": false // true for trial subscription
}`}
                                    </pre>
                                    
                                    <h4 className="text-sm font-medium mt-4 mb-2">Response</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "subscriptionId": "sub_123456",
    "premiumBotId": "pbot_123",
    "status": "active",
    "startDate": "2023-09-16T18:30:00Z",
    "endDate": "2023-10-16T18:30:00Z",
    "billingPeriod": "monthly",
    "price": 29.99,
    "nextBillingDate": "2023-10-16T18:30:00Z",
    "isTrial": false
  },
  "message": "Successfully subscribed to premium bot"
}`}
                                    </pre>
                                  </div>
                                </div>
                                
                                {/* Cancel Premium Bot Subscription */}
                                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                                  <div className="flex justify-between items-center bg-zinc-900 px-4 py-2">
                                    <div className="flex items-center">
                                      <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold mr-3">DELETE</span>
                                      <span className="text-zinc-300 font-mono">/premium-bots/:botId/subscription</span>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => copyToClipboard('/premium-bots/:botId/subscription')}
                                    >
                                      {copiedEndpoint === '/premium-bots/:botId/subscription' ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="p-4 bg-zinc-950">
                                    <h4 className="text-sm font-medium mb-2">Path Parameters</h4>
                                    <table className="w-full text-sm mb-4">
                                      <thead>
                                        <tr className="border-b border-zinc-800">
                                          <th className="text-left pb-2 text-zinc-400">Parameter</th>
                                          <th className="text-left pb-2 text-zinc-400">Type</th>
                                          <th className="text-left pb-2 text-zinc-400">Description</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td className="py-2 pr-4">botId</td>
                                          <td className="py-2 pr-4 text-zinc-400">string</td>
                                          <td className="py-2 text-zinc-400">ID of the premium bot subscription to cancel</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    
                                    <h4 className="text-sm font-medium mt-4 mb-2">Response</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "subscriptionId": "sub_123456",
    "status": "cancelled",
    "cancelledAt": "2023-09-16T19:45:00Z",
    "endDate": "2023-10-16T18:30:00Z"
  },
  "message": "Subscription cancelled successfully"
}`}
                                    </pre>
                                  </div>
                                </div>
                                
                                {/* List User's Premium Bot Subscriptions */}
                                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                                  <div className="flex justify-between items-center bg-zinc-900 px-4 py-2">
                                    <div className="flex items-center">
                                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold mr-3">GET</span>
                                      <span className="text-zinc-300 font-mono">/premium-bots/subscriptions</span>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => copyToClipboard('/premium-bots/subscriptions')}
                                    >
                                      {copiedEndpoint === '/premium-bots/subscriptions' ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="p-4 bg-zinc-950">
                                    <h4 className="text-sm font-medium mt-4 mb-2">Response</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "subscriptions": [
      {
        "subscriptionId": "sub_123456",
        "premiumBot": {
          "id": "pbot_123",
          "name": "Alpha BTC Predictor",
          "description": "Advanced BTC price prediction model",
          "category": "cryptocurrency"
        },
        "status": "active",
        "startDate": "2023-09-16T18:30:00Z",
        "endDate": "2023-10-16T18:30:00Z",
        "billingPeriod": "monthly",
        "price": 29.99,
        "nextBillingDate": "2023-10-16T18:30:00Z",
        "isTrial": false
      },
      // Additional subscriptions...
    ]
  },
  "message": "Premium bot subscriptions retrieved successfully"
}`}
                                    </pre>
                                  </div>
                                </div>
                                
                                {/* Integrate Premium Bot with Trading Account */}
                                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                                  <div className="flex justify-between items-center bg-zinc-900 px-4 py-2">
                                    <div className="flex items-center">
                                      <span className="bg-emerald-600 text-white px-2 py-1 rounded text-xs font-bold mr-3">POST</span>
                                      <span className="text-zinc-300 font-mono">/premium-bots/:botId/integrate</span>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => copyToClipboard('/premium-bots/:botId/integrate')}
                                    >
                                      {copiedEndpoint === '/premium-bots/:botId/integrate' ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="p-4 bg-zinc-950">
                                    <h4 className="text-sm font-medium mb-2">Path Parameters</h4>
                                    <table className="w-full text-sm mb-4">
                                      <thead>
                                        <tr className="border-b border-zinc-800">
                                          <th className="text-left pb-2 text-zinc-400">Parameter</th>
                                          <th className="text-left pb-2 text-zinc-400">Type</th>
                                          <th className="text-left pb-2 text-zinc-400">Description</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td className="py-2 pr-4">botId</td>
                                          <td className="py-2 pr-4 text-zinc-400">string</td>
                                          <td className="py-2 text-zinc-400">ID of the premium bot to integrate</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    
                                    <h4 className="text-sm font-medium mb-2">Request Body</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "accountIds": ["acc_789"],
  "settings": {
    "tradingPair": "BTC/USDT",
    "riskLevel": "medium", // low, medium, high
    "positionSizePercentage": 10,
    "enableNotifications": true
  }
}`}
                                    </pre>
                                    
                                    <h4 className="text-sm font-medium mt-4 mb-2">Response</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "integrationId": "int_123456",
    "premiumBotId": "pbot_123",
    "status": "active",
    "settings": {
      "tradingPair": "BTC/USDT",
      "riskLevel": "medium",
      "positionSizePercentage": 10,
      "enableNotifications": true
    },
    "connectedAccounts": [
      {
        "id": "acc_789",
        "name": "Binance Account",
        "exchange": "binance"
      }
    ],
    "createdAt": "2023-09-16T20:15:00Z"
  },
  "message": "Premium bot integrated successfully"
}`}
                                    </pre>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          )}
                        </Card>
                      </div>
                    )}
                    
                    {/* Prop Trading Bots Section */}
                    {filterDocs('Prop trading bots challenge') && (
                      <div ref={sectionRefs.prop_bots}>
                        <Card className="bg-[#111111] border-zinc-800">
                          <CardHeader className="flex flex-row items-center justify-between cursor-pointer" onClick={() => toggleSection('prop_bots')}>
                            <div>
                              <CardTitle>Prop Trading Bots</CardTitle>
                              <CardDescription>Endpoints for prop trading bot management</CardDescription>
                            </div>
                            {expandedSections.prop_bots ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                          </CardHeader>
                          
                          {expandedSections.prop_bots && (
                            <CardContent>
                              <div className="space-y-8">
                                {/* List Prop Trading Bots */}
                                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                                  <div className="flex justify-between items-center bg-zinc-900 px-4 py-2">
                                    <div className="flex items-center">
                                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold mr-3">GET</span>
                                      <span className="text-zinc-300 font-mono">/prop-trading-bots</span>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => copyToClipboard('/prop-trading-bots')}
                                    >
                                      {copiedEndpoint === '/prop-trading-bots' ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="p-4 bg-zinc-950">
                                    <h4 className="text-sm font-medium mb-2">Query Parameters</h4>
                                    <table className="w-full text-sm mb-4">
                                      <thead>
                                        <tr className="border-b border-zinc-800">
                                          <th className="text-left pb-2 text-zinc-400">Parameter</th>
                                          <th className="text-left pb-2 text-zinc-400">Type</th>
                                          <th className="text-left pb-2 text-zinc-400">Description</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td className="py-2 pr-4">page</td>
                                          <td className="py-2 pr-4 text-zinc-400">number</td>
                                          <td className="py-2 text-zinc-400">Page number for pagination (default: 1)</td>
                                        </tr>
                                        <tr>
                                          <td className="py-2 pr-4">limit</td>
                                          <td className="py-2 pr-4 text-zinc-400">number</td>
                                          <td className="py-2 text-zinc-400">Number of items per page (default: 10)</td>
                                        </tr>
                                        <tr>
                                          <td className="py-2 pr-4">category</td>
                                          <td className="py-2 pr-4 text-zinc-400">string</td>
                                          <td className="py-2 text-zinc-400">Filter by bot category</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    
                                    <h4 className="text-sm font-medium mt-4 mb-2">Response</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "propTradingBots": [
      {
        "id": "ptbot_123",
        "name": "Forex Master Challenge",
        "description": "Complete our Forex trading challenge to earn a funded account",
        "category": "forex",
        "challengeFee": 299,
        "accountSize": 100000,
        "challengeRules": {
          "profitTarget": 10,
          "maxDrawdown": 5,
          "minTradingDays": 10,
          "maxDailyDrawdown": 2
        },
        "successRate": 35,
        "startedCount": 1245,
        "fundedCount": 436,
        "rating": 4.7,
        "reviewCount": 89
      },
      // Additional prop trading bots...
    ],
    "pagination": {
      "total": 12,
      "page": 1,
      "limit": 10,
      "totalPages": 2
    }
  },
  "message": "Prop trading bots retrieved successfully"
}`}
                                    </pre>
                                  </div>
                                </div>
                                
                                {/* Get Prop Trading Bot Details */}
                                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                                  <div className="flex justify-between items-center bg-zinc-900 px-4 py-2">
                                    <div className="flex items-center">
                                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold mr-3">GET</span>
                                      <span className="text-zinc-300 font-mono">/prop-trading-bots/:botId</span>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => copyToClipboard('/prop-trading-bots/:botId')}
                                    >
                                      {copiedEndpoint === '/prop-trading-bots/:botId' ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="p-4 bg-zinc-950">
                                    <h4 className="text-sm font-medium mb-2">Path Parameters</h4>
                                    <table className="w-full text-sm mb-4">
                                      <thead>
                                        <tr className="border-b border-zinc-800">
                                          <th className="text-left pb-2 text-zinc-400">Parameter</th>
                                          <th className="text-left pb-2 text-zinc-400">Type</th>
                                          <th className="text-left pb-2 text-zinc-400">Description</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td className="py-2 pr-4">botId</td>
                                          <td className="py-2 pr-4 text-zinc-400">string</td>
                                          <td className="py-2 text-zinc-400">ID of the prop trading bot to retrieve</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    
                                    <h4 className="text-sm font-medium mt-4 mb-2">Response</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "id": "ptbot_123",
    "name": "Forex Master Challenge",
    "description": "Complete our Forex trading challenge to earn a funded account with up to $100,000 capital",
    "category": "forex",
    "challengeFee": 299,
    "accountSize": 100000,
    "challengeTiers": [
      {
        "name": "Phase 1",
        "duration": 30,
        "profitTarget": 8,
        "maxDrawdown": 5
      },
      {
        "name": "Phase 2",
        "duration": 60,
        "profitTarget": 5,
        "maxDrawdown": 5
      }
    ],
    "challengeRules": {
      "profitTarget": 10,
      "maxDrawdown": 5,
      "minTradingDays": 10,
      "maxDailyDrawdown": 2,
      "minimumTrades": 20,
      "maximumRiskPerTrade": 1,
      "tradingHours": "24/5",
      "allowedInstruments": ["FOREX", "INDICES", "COMMODITIES"]
    },
    "profitSplit": 80,
    "successRate": 35,
    "startedCount": 1245,
    "fundedCount": 436,
    "features": [
      "Unlimited time to complete challenge",
      "One-time fee",
      "Bi-weekly payouts",
      "Scale up to $400,000"
    ],
    "rating": 4.7,
    "reviewCount": 89,
    "reviews": [
      {
        "userId": "user_456",
        "userName": "Jane T.",
        "rating": 5,
        "comment": "Challenging but fair rules. Got funded in 45 days!",
        "date": "2023-09-05T14:30:00Z"
      },
      // Additional reviews...
    ]
  },
  "message": "Prop trading bot details retrieved successfully"
}`}
                                    </pre>
                                  </div>
                                </div>
                                
                                {/* Start Prop Trading Challenge */}
                                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                                  <div className="flex justify-between items-center bg-zinc-900 px-4 py-2">
                                    <div className="flex items-center">
                                      <span className="bg-emerald-600 text-white px-2 py-1 rounded text-xs font-bold mr-3">POST</span>
                                      <span className="text-zinc-300 font-mono">/prop-trading-bots/:botId/start-challenge</span>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => copyToClipboard('/prop-trading-bots/:botId/start-challenge')}
                                    >
                                      {copiedEndpoint === '/prop-trading-bots/:botId/start-challenge' ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="p-4 bg-zinc-950">
                                    <h4 className="text-sm font-medium mb-2">Path Parameters</h4>
                                    <table className="w-full text-sm mb-4">
                                      <thead>
                                        <tr className="border-b border-zinc-800">
                                          <th className="text-left pb-2 text-zinc-400">Parameter</th>
                                          <th className="text-left pb-2 text-zinc-400">Type</th>
                                          <th className="text-left pb-2 text-zinc-400">Description</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td className="py-2 pr-4">botId</td>
                                          <td className="py-2 pr-4 text-zinc-400">string</td>
                                          <td className="py-2 text-zinc-400">ID of the prop trading bot to start challenge</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    
                                    <h4 className="text-sm font-medium mb-2">Request Body</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "accountSize": 100000,
  "paymentMethodId": "pm_123456789",
  "tradingPreferences": {
    "instruments": ["EURUSD", "GBPUSD", "USDJPY"],
    "tradingStyle": "swing" // day, scalp, swing
  }
}`}
                                    </pre>
                                    
                                    <h4 className="text-sm font-medium mt-4 mb-2">Response</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "challengeId": "chal_123456",
    "propBotId": "ptbot_123",
    "status": "active",
    "phase": 1,
    "startDate": "2023-09-16T21:00:00Z",
    "endDate": "2023-10-16T21:00:00Z",
    "accountSize": 100000,
    "currentBalance": 100000,
    "highWatermark": 100000,
    "profitTarget": {
      "required": 8000,
      "current": 0,
      "percentage": 0
    },
    "maxDrawdown": {
      "limit": 5000,
      "current": 0,
      "percentage": 0
    },
    "credentials": {
      "loginId": "12345678",
      "password": "temp_pwd_xyz",
      "serverName": "ChallengeTrader-Live",
      "platform": "MetaTrader 5"
    }
  },
  "message": "Challenge started successfully"
}`}
                                    </pre>
                                  </div>
                                </div>
                                
                                {/* Get Challenge Status */}
                                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                                  <div className="flex justify-between items-center bg-zinc-900 px-4 py-2">
                                    <div className="flex items-center">
                                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold mr-3">GET</span>
                                      <span className="text-zinc-300 font-mono">/prop-trading-bots/challenges/:challengeId</span>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => copyToClipboard('/prop-trading-bots/challenges/:challengeId')}
                                    >
                                      {copiedEndpoint === '/prop-trading-bots/challenges/:challengeId' ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="p-4 bg-zinc-950">
                                    <h4 className="text-sm font-medium mb-2">Path Parameters</h4>
                                    <table className="w-full text-sm mb-4">
                                      <thead>
                                        <tr className="border-b border-zinc-800">
                                          <th className="text-left pb-2 text-zinc-400">Parameter</th>
                                          <th className="text-left pb-2 text-zinc-400">Type</th>
                                          <th className="text-left pb-2 text-zinc-400">Description</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td className="py-2 pr-4">challengeId</td>
                                          <td className="py-2 pr-4 text-zinc-400">string</td>
                                          <td className="py-2 text-zinc-400">ID of the challenge to retrieve</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    
                                    <h4 className="text-sm font-medium mt-4 mb-2">Response</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "challengeId": "chal_123456",
    "propBotId": "ptbot_123",
    "propBot": {
      "id": "ptbot_123",
      "name": "Forex Master Challenge"
    },
    "status": "active",
    "phase": 1,
    "startDate": "2023-09-16T21:00:00Z",
    "endDate": "2023-10-16T21:00:00Z",
    "accountSize": 100000,
    "currentBalance": 103500,
    "highWatermark": 104200,
    "profitTarget": {
      "required": 8000,
      "current": 3500,
      "percentage": 43.75
    },
    "maxDrawdown": {
      "limit": 5000,
      "current": 700,
      "percentage": 14
    },
    "tradingStats": {
      "totalTrades": 12,
      "winningTrades": 8,
      "losingTrades": 4,
      "winRate": 66.67,
      "averageWin": 875,
      "averageLoss": 350,
      "largestWin": 1450,
      "largestLoss": 700
    },
    "tradingDays": {
      "required": 10,
      "completed": 5
    },
    "trades": [
      {
        "id": "trade_123",
        "instrument": "EURUSD",
        "type": "buy",
        "openTime": "2023-09-17T10:30:00Z",
        "closeTime": "2023-09-17T16:45:00Z",
        "openPrice": 1.07245,
        "closePrice": 1.07825,
        "size": 1,
        "profitLoss": 580,
        "status": "closed"
      },
      // Additional trades...
    ],
    "dailyPerformance": [
      {
        "date": "2023-09-17",
        "startBalance": 100000,
        "endBalance": 100580,
        "profitLoss": 580,
        "profitLossPercentage": 0.58,
        "trades": 1
      },
      // Additional daily performance...
    ]
  },
  "message": "Challenge status retrieved successfully"
}`}
                                    </pre>
                                  </div>
                                </div>
                                
                                {/* List User's Challenges */}
                                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                                  <div className="flex justify-between items-center bg-zinc-900 px-4 py-2">
                                    <div className="flex items-center">
                                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold mr-3">GET</span>
                                      <span className="text-zinc-300 font-mono">/prop-trading-bots/challenges</span>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => copyToClipboard('/prop-trading-bots/challenges')}
                                    >
                                      {copiedEndpoint === '/prop-trading-bots/challenges' ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="p-4 bg-zinc-950">
                                    <h4 className="text-sm font-medium mb-2">Query Parameters</h4>
                                    <table className="w-full text-sm mb-4">
                                      <thead>
                                        <tr className="border-b border-zinc-800">
                                          <th className="text-left pb-2 text-zinc-400">Parameter</th>
                                          <th className="text-left pb-2 text-zinc-400">Type</th>
                                          <th className="text-left pb-2 text-zinc-400">Description</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td className="py-2 pr-4">status</td>
                                          <td className="py-2 pr-4 text-zinc-400">string</td>
                                          <td className="py-2 text-zinc-400">Filter by status (active, completed, failed)</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    
                                    <h4 className="text-sm font-medium mt-4 mb-2">Response</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "challenges": [
      {
        "challengeId": "chal_123456",
        "propBotId": "ptbot_123",
        "propBotName": "Forex Master Challenge",
        "status": "active",
        "phase": 1,
        "startDate": "2023-09-16T21:00:00Z",
        "endDate": "2023-10-16T21:00:00Z",
        "accountSize": 100000,
        "currentBalance": 103500,
        "profitTargetPercentage": 43.75,
        "maxDrawdownPercentage": 14
      },
      // Additional challenges...
    ]
  },
  "message": "Challenges retrieved successfully"
}`}
                                    </pre>
                                  </div>
                                </div>
                                
                                {/* Integrate Prop Bot Trading Strategy */}
                                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                                  <div className="flex justify-between items-center bg-zinc-900 px-4 py-2">
                                    <div className="flex items-center">
                                      <span className="bg-emerald-600 text-white px-2 py-1 rounded text-xs font-bold mr-3">POST</span>
                                      <span className="text-zinc-300 font-mono">/prop-trading-bots/challenges/:challengeId/integrate</span>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => copyToClipboard('/prop-trading-bots/challenges/:challengeId/integrate')}
                                    >
                                      {copiedEndpoint === '/prop-trading-bots/challenges/:challengeId/integrate' ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="p-4 bg-zinc-950">
                                    <h4 className="text-sm font-medium mb-2">Path Parameters</h4>
                                    <table className="w-full text-sm mb-4">
                                      <thead>
                                        <tr className="border-b border-zinc-800">
                                          <th className="text-left pb-2 text-zinc-400">Parameter</th>
                                          <th className="text-left pb-2 text-zinc-400">Type</th>
                                          <th className="text-left pb-2 text-zinc-400">Description</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td className="py-2 pr-4">challengeId</td>
                                          <td className="py-2 pr-4 text-zinc-400">string</td>
                                          <td className="py-2 text-zinc-400">ID of the challenge to integrate trading strategy</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    
                                    <h4 className="text-sm font-medium mb-2">Request Body</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "strategyId": "strat_123",
  "settings": {
    "riskPerTrade": 0.5,
    "maxOpenPositions": 3,
    "instruments": ["EURUSD", "GBPUSD"],
    "tradingHours": {
      "start": "08:00",
      "end": "16:00",
      "timezone": "UTC"
    }
  }
}`}
                                    </pre>
                                    
                                    <h4 className="text-sm font-medium mt-4 mb-2">Response</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "integrationId": "int_456789",
    "challengeId": "chal_123456",
    "strategyId": "strat_123",
    "status": "active",
    "settings": {
      "riskPerTrade": 0.5,
      "maxOpenPositions": 3,
      "instruments": ["EURUSD", "GBPUSD"],
      "tradingHours": {
        "start": "08:00",
        "end": "16:00",
        "timezone": "UTC"
      }
    },
    "createdAt": "2023-09-16T22:00:00Z"
  },
  "message": "Trading strategy integrated successfully"
}`}
                                    </pre>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          )}
                        </Card>
                      </div>
                    )}
                    
                    {/* Trading Accounts Section */}
                    {filterDocs('Accounts create list delete update') && (
                      <div ref={sectionRefs.accounts}>
                        <Card className="bg-[#111111] border-zinc-800">
                          <CardHeader className="flex flex-row items-center justify-between cursor-pointer" onClick={() => toggleSection('accounts')}>
                            <div>
                              <CardTitle>Trading Accounts</CardTitle>
                              <CardDescription>Endpoints for managing trading accounts</CardDescription>
                            </div>
                            {expandedSections.accounts ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                          </CardHeader>
                          
                          {expandedSections.accounts && (
                            <CardContent>
                              <div className="space-y-8">
                                {/* List Accounts */}
                                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                                  <div className="flex justify-between items-center bg-zinc-900 px-4 py-2">
                                    <div className="flex items-center">
                                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold mr-3">GET</span>
                                      <span className="text-zinc-300 font-mono">/accounts</span>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => copyToClipboard('/accounts')}
                                    >
                                      {copiedEndpoint === '/accounts' ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="p-4 bg-zinc-950">
                                    <h4 className="text-sm font-medium mb-2">Query Parameters</h4>
                                    <table className="w-full text-sm mb-4">
                                      <thead>
                                        <tr className="border-b border-zinc-800">
                                          <th className="text-left pb-2 text-zinc-400">Parameter</th>
                                          <th className="text-left pb-2 text-zinc-400">Type</th>
                                          <th className="text-left pb-2 text-zinc-400">Description</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td className="py-2 pr-4">exchange</td>
                                          <td className="py-2 pr-4 text-zinc-400">string</td>
                                          <td className="py-2 text-zinc-400">Filter by exchange (binance, coinbase, etc.)</td>
                                        </tr>
                                        <tr>
                                          <td className="py-2 pr-4">status</td>
                                          <td className="py-2 pr-4 text-zinc-400">string</td>
                                          <td className="py-2 text-zinc-400">Filter by status (active, inactive, error)</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    
                                    <h4 className="text-sm font-medium mt-4 mb-2">Response</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "accounts": [
      {
        "id": "acc_123",
        "name": "Binance Main Account",
        "exchange": "binance",
        "status": "active",
        "balance": {
          "total": 15420.75,
          "available": 12500.50,
          "inTrade": 2920.25,
          "currency": "USDT"
        },
        "credentials": {
          "isValid": true,
          "lastValidated": "2023-09-16T10:30:00Z"
        },
        "connectedBots": 3,
        "createdAt": "2023-09-01T10:30:00Z",
        "updatedAt": "2023-09-16T10:30:00Z"
      },
      // Additional accounts...
    ]
  },
  "message": "Accounts retrieved successfully"
}`}
                                    </pre>
                                  </div>
                                </div>
                                
                                {/* Get Account Details */}
                                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                                  <div className="flex justify-between items-center bg-zinc-900 px-4 py-2">
                                    <div className="flex items-center">
                                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold mr-3">GET</span>
                                      <span className="text-zinc-300 font-mono">/accounts/:accountId</span>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => copyToClipboard('/accounts/:accountId')}
                                    >
                                      {copiedEndpoint === '/accounts/:accountId' ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="p-4 bg-zinc-950">
                                    <h4 className="text-sm font-medium mb-2">Path Parameters</h4>
                                    <table className="w-full text-sm mb-4">
                                      <thead>
                                        <tr className="border-b border-zinc-800">
                                          <th className="text-left pb-2 text-zinc-400">Parameter</th>
                                          <th className="text-left pb-2 text-zinc-400">Type</th>
                                          <th className="text-left pb-2 text-zinc-400">Description</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td className="py-2 pr-4">accountId</td>
                                          <td className="py-2 pr-4 text-zinc-400">string</td>
                                          <td className="py-2 text-zinc-400">ID of the account to retrieve</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    
                                    <h4 className="text-sm font-medium mt-4 mb-2">Response</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "id": "acc_123",
    "name": "Binance Main Account",
    "exchange": "binance",
    "status": "active",
    "balance": {
      "total": 15420.75,
      "available": 12500.50,
      "inTrade": 2920.25,
      "currency": "USDT",
      "assets": [
        {
          "asset": "BTC",
          "free": 0.12,
          "locked": 0.05,
          "total": 0.17,
          "valueUSD": 4250.80
        },
        {
          "asset": "ETH",
          "free": 2.5,
          "locked": 1.0,
          "total": 3.5,
          "valueUSD": 6300.75
        },
        // Additional assets...
      ]
    },
    "credentials": {
      "isValid": true,
      "lastValidated": "2023-09-16T10:30:00Z",
      "permissions": ["spot", "futures", "margin"]
    },
    "connectedBots": [
      {
        "id": "bot_456",
        "name": "ETH Trend Follower",
        "status": "active"
      },
      // Additional bots...
    ],
    "tradingHistory": {
      "totalTrades": 45,
      "successfulTrades": 32,
      "winRate": 71.1,
      "totalVolume": 28750.50,
      "profitLoss": 1245.80
    },
    "createdAt": "2023-09-01T10:30:00Z",
    "updatedAt": "2023-09-16T10:30:00Z"
  },
  "message": "Account details retrieved successfully"
}`}
                                    </pre>
                                  </div>
                                </div>
                                
                                {/* Create Account */}
                                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                                  <div className="flex justify-between items-center bg-zinc-900 px-4 py-2">
                                    <div className="flex items-center">
                                      <span className="bg-emerald-600 text-white px-2 py-1 rounded text-xs font-bold mr-3">POST</span>
                                      <span className="text-zinc-300 font-mono">/accounts</span>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => copyToClipboard('/accounts')}
                                    >
                                      {copiedEndpoint === '/accounts' ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="p-4 bg-zinc-950">
                                    <h4 className="text-sm font-medium mb-2">Request Body</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "name": "My Binance Account",
  "exchange": "binance",
  "credentials": {
    "apiKey": "your_api_key",
    "secretKey": "your_secret_key"
  },
  "tradingType": "spot" // spot, futures, margin
}`}
                                    </pre>
                                    
                                    <h4 className="text-sm font-medium mt-4 mb-2">Response</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "id": "acc_123",
    "name": "My Binance Account",
    "exchange": "binance",
    "status": "active",
    "balance": {
      "total": 15420.75,
      "available": 15420.75,
      "inTrade": 0,
      "currency": "USDT"
    },
    "credentials": {
      "isValid": true,
      "lastValidated": "2023-09-16T23:15:00Z",
      "permissions": ["spot"]
    },
    "createdAt": "2023-09-16T23:15:00Z",
    "updatedAt": "2023-09-16T23:15:00Z"
  },
  "message": "Account created successfully"
}`}
                                    </pre>
                                  </div>
                                </div>
                                
                                {/* Update Account */}
                                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                                  <div className="flex justify-between items-center bg-zinc-900 px-4 py-2">
                                    <div className="flex items-center">
                                      <span className="bg-amber-500 text-white px-2 py-1 rounded text-xs font-bold mr-3">PUT</span>
                                      <span className="text-zinc-300 font-mono">/accounts/:accountId</span>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => copyToClipboard('/accounts/:accountId')}
                                    >
                                      {copiedEndpoint === '/accounts/:accountId' ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="p-4 bg-zinc-950">
                                    <h4 className="text-sm font-medium mb-2">Path Parameters</h4>
                                    <table className="w-full text-sm mb-4">
                                      <thead>
                                        <tr className="border-b border-zinc-800">
                                          <th className="text-left pb-2 text-zinc-400">Parameter</th>
                                          <th className="text-left pb-2 text-zinc-400">Type</th>
                                          <th className="text-left pb-2 text-zinc-400">Description</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td className="py-2 pr-4">accountId</td>
                                          <td className="py-2 pr-4 text-zinc-400">string</td>
                                          <td className="py-2 text-zinc-400">ID of the account to update</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    
                                    <h4 className="text-sm font-medium mb-2">Request Body</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "name": "Updated Binance Account",
  "credentials": {
    "apiKey": "new_api_key",
    "secretKey": "new_secret_key"
  }
}`}
                                    </pre>
                                    
                                    <h4 className="text-sm font-medium mt-4 mb-2">Response</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "id": "acc_123",
    "name": "Updated Binance Account",
    "exchange": "binance",
    "status": "active",
    "credentials": {
      "isValid": true,
      "lastValidated": "2023-09-17T00:30:00Z"
    },
    "updatedAt": "2023-09-17T00:30:00Z"
  },
  "message": "Account updated successfully"
}`}
                                    </pre>
                                  </div>
                                </div>
                                
                                {/* Delete Account */}
                                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                                  <div className="flex justify-between items-center bg-zinc-900 px-4 py-2">
                                    <div className="flex items-center">
                                      <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold mr-3">DELETE</span>
                                      <span className="text-zinc-300 font-mono">/accounts/:accountId</span>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => copyToClipboard('/accounts/:accountId')}
                                    >
                                      {copiedEndpoint === '/accounts/:accountId' ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="p-4 bg-zinc-950">
                                    <h4 className="text-sm font-medium mb-2">Path Parameters</h4>
                                    <table className="w-full text-sm mb-4">
                                      <thead>
                                        <tr className="border-b border-zinc-800">
                                          <th className="text-left pb-2 text-zinc-400">Parameter</th>
                                          <th className="text-left pb-2 text-zinc-400">Type</th>
                                          <th className="text-left pb-2 text-zinc-400">Description</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td className="py-2 pr-4">accountId</td>
                                          <td className="py-2 pr-4 text-zinc-400">string</td>
                                          <td className="py-2 text-zinc-400">ID of the account to delete</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    
                                    <h4 className="text-sm font-medium mt-4 mb-2">Response</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "message": "Account deleted successfully"
}`}
                                    </pre>
                                  </div>
                                </div>
                                
                                {/* Validate Account Credentials */}
                                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                                  <div className="flex justify-between items-center bg-zinc-900 px-4 py-2">
                                    <div className="flex items-center">
                                      <span className="bg-emerald-600 text-white px-2 py-1 rounded text-xs font-bold mr-3">POST</span>
                                      <span className="text-zinc-300 font-mono">/accounts/:accountId/validate</span>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => copyToClipboard('/accounts/:accountId/validate')}
                                    >
                                      {copiedEndpoint === '/accounts/:accountId/validate' ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="p-4 bg-zinc-950">
                                    <h4 className="text-sm font-medium mb-2">Path Parameters</h4>
                                    <table className="w-full text-sm mb-4">
                                      <thead>
                                        <tr className="border-b border-zinc-800">
                                          <th className="text-left pb-2 text-zinc-400">Parameter</th>
                                          <th className="text-left pb-2 text-zinc-400">Type</th>
                                          <th className="text-left pb-2 text-zinc-400">Description</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td className="py-2 pr-4">accountId</td>
                                          <td className="py-2 pr-4 text-zinc-400">string</td>
                                          <td className="py-2 text-zinc-400">ID of the account to validate</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    
                                    <h4 className="text-sm font-medium mt-4 mb-2">Response</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "isValid": true,
    "permissions": ["spot", "futures", "margin"],
    "errors": []
  },
  "message": "Account credentials validated successfully"
}`}
                                    </pre>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          )}
                        </Card>
                      </div>
                    )}
                    
                    {/* Signals Section */}
                    {filterDocs('Signals logs history') && (
                      <div ref={sectionRefs.signals}>
                        <Card className="bg-[#111111] border-zinc-800">
                          <CardHeader className="flex flex-row items-center justify-between cursor-pointer" onClick={() => toggleSection('signals')}>
                            <div>
                              <CardTitle>Signals & Logs</CardTitle>
                              <CardDescription>Endpoints for trading signals and logs</CardDescription>
                            </div>
                            {expandedSections.signals ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                          </CardHeader>
                          
                          {expandedSections.signals && (
                            <CardContent>
                              <div className="space-y-8">
                                {/* List Signal Logs */}
                                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                                  <div className="flex justify-between items-center bg-zinc-900 px-4 py-2">
                                    <div className="flex items-center">
                                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold mr-3">GET</span>
                                      <span className="text-zinc-300 font-mono">/signals/logs</span>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => copyToClipboard('/signals/logs')}
                                    >
                                      {copiedEndpoint === '/signals/logs' ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="p-4 bg-zinc-950">
                                    <h4 className="text-sm font-medium mb-2">Query Parameters</h4>
                                    <table className="w-full text-sm mb-4">
                                      <thead>
                                        <tr className="border-b border-zinc-800">
                                          <th className="text-left pb-2 text-zinc-400">Parameter</th>
                                          <th className="text-left pb-2 text-zinc-400">Type</th>
                                          <th className="text-left pb-2 text-zinc-400">Description</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td className="py-2 pr-4">botId</td>
                                          <td className="py-2 pr-4 text-zinc-400">string</td>
                                          <td className="py-2 text-zinc-400">Filter by bot ID</td>
                                        </tr>
                                        <tr>
                                          <td className="py-2 pr-4">accountId</td>
                                          <td className="py-2 pr-4 text-zinc-400">string</td>
                                          <td className="py-2 text-zinc-400">Filter by account ID</td>
                                        </tr>
                                        <tr>
                                          <td className="py-2 pr-4">startDate</td>
                                          <td className="py-2 pr-4 text-zinc-400">string</td>
                                          <td className="py-2 text-zinc-400">Start date (ISO format)</td>
                                        </tr>
                                        <tr>
                                          <td className="py-2 pr-4">endDate</td>
                                          <td className="py-2 pr-4 text-zinc-400">string</td>
                                          <td className="py-2 text-zinc-400">End date (ISO format)</td>
                                        </tr>
                                        <tr>
                                          <td className="py-2 pr-4">page</td>
                                          <td className="py-2 pr-4 text-zinc-400">number</td>
                                          <td className="py-2 text-zinc-400">Page number for pagination (default: 1)</td>
                                        </tr>
                                        <tr>
                                          <td className="py-2 pr-4">limit</td>
                                          <td className="py-2 pr-4 text-zinc-400">number</td>
                                          <td className="py-2 text-zinc-400">Number of items per page (default: 50)</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    
                                    <h4 className="text-sm font-medium mt-4 mb-2">Response</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "logs": [
      {
        "id": "log_123",
        "timestamp": "2023-09-16T15:30:00Z",
        "botId": "bot_456",
        "botName": "ETH Trend Follower",
        "accountId": "acc_789",
        "accountName": "Binance Account",
        "type": "SIGNAL",
        "action": "BUY",
        "symbol": "ETH/USDT",
        "price": 1650.75,
        "quantity": 0.5,
        "status": "EXECUTED",
        "message": "Buy signal executed successfully",
        "details": {
          "orderType": "MARKET",
          "filledPrice": 1651.20,
          "fee": 0.825,
          "feeCurrency": "USDT"
        }
      },
      // Additional logs...
    ],
    "pagination": {
      "total": 245,
      "page": 1,
      "limit": 50,
      "totalPages": 5
    }
  },
  "message": "Signal logs retrieved successfully"
}`}
                                    </pre>
                                  </div>
                                </div>
                                
                                {/* Get Signal Log Details */}
                                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                                  <div className="flex justify-between items-center bg-zinc-900 px-4 py-2">
                                    <div className="flex items-center">
                                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold mr-3">GET</span>
                                      <span className="text-zinc-300 font-mono">/signals/logs/:logId</span>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => copyToClipboard('/signals/logs/:logId')}
                                    >
                                      {copiedEndpoint === '/signals/logs/:logId' ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="p-4 bg-zinc-950">
                                    <h4 className="text-sm font-medium mb-2">Path Parameters</h4>
                                    <table className="w-full text-sm mb-4">
                                      <thead>
                                        <tr className="border-b border-zinc-800">
                                          <th className="text-left pb-2 text-zinc-400">Parameter</th>
                                          <th className="text-left pb-2 text-zinc-400">Type</th>
                                          <th className="text-left pb-2 text-zinc-400">Description</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td className="py-2 pr-4">logId</td>
                                          <td className="py-2 pr-4 text-zinc-400">string</td>
                                          <td className="py-2 text-zinc-400">ID of the log to retrieve</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    
                                    <h4 className="text-sm font-medium mt-4 mb-2">Response</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "id": "log_123",
    "timestamp": "2023-09-16T15:30:00Z",
    "botId": "bot_456",
    "botName": "ETH Trend Follower",
    "accountId": "acc_789",
    "accountName": "Binance Account",
    "type": "SIGNAL",
    "action": "BUY",
    "symbol": "ETH/USDT",
    "price": 1650.75,
    "quantity": 0.5,
    "status": "EXECUTED",
    "message": "Buy signal executed successfully",
    "details": {
      "orderType": "MARKET",
      "filledPrice": 1651.20,
      "fee": 0.825,
      "feeCurrency": "USDT",
      "orderId": "1234567890",
      "exchangeTimestamp": "2023-09-16T15:30:02Z"
    },
    "indicators": {
      "rsi": 32.5,
      "macd": {
        "macd": 1.25,
        "signal": 0.75,
        "histogram": 0.5
      },
      "ema": {
        "ema9": 1640.25,
        "ema21": 1625.50
      }
    },
    "relatedTrades": [
      {
        "id": "trade_456",
        "type": "ENTRY",
        "timestamp": "2023-09-16T15:30:02Z"
      }
    ]
  },
  "message": "Signal log details retrieved successfully"
}`}
                                    </pre>
                                  </div>
                                </div>
                                
                                {/* List Bot Error Signals */}
                                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                                  <div className="flex justify-between items-center bg-zinc-900 px-4 py-2">
                                    <div className="flex items-center">
                                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold mr-3">GET</span>
                                      <span className="text-zinc-300 font-mono">/signals/errors</span>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => copyToClipboard('/signals/errors')}
                                    >
                                      {copiedEndpoint === '/signals/errors' ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="p-4 bg-zinc-950">
                                    <h4 className="text-sm font-medium mb-2">Query Parameters</h4>
                                    <table className="w-full text-sm mb-4">
                                      <thead>
                                        <tr className="border-b border-zinc-800">
                                          <th className="text-left pb-2 text-zinc-400">Parameter</th>
                                          <th className="text-left pb-2 text-zinc-400">Type</th>
                                          <th className="text-left pb-2 text-zinc-400">Description</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td className="py-2 pr-4">botId</td>
                                          <td className="py-2 pr-4 text-zinc-400">string</td>
                                          <td className="py-2 text-zinc-400">Filter by bot ID</td>
                                        </tr>
                                        <tr>
                                          <td className="py-2 pr-4">severity</td>
                                          <td className="py-2 pr-4 text-zinc-400">string</td>
                                          <td className="py-2 text-zinc-400">Filter by severity (low, medium, high, critical)</td>
                                        </tr>
                                        <tr>
                                          <td className="py-2 pr-4">status</td>
                                          <td className="py-2 pr-4 text-zinc-400">string</td>
                                          <td className="py-2 text-zinc-400">Filter by status (new, acknowledged, resolved)</td>
                                        </tr>
                                        <tr>
                                          <td className="py-2 pr-4">page</td>
                                          <td className="py-2 pr-4 text-zinc-400">number</td>
                                          <td className="py-2 text-zinc-400">Page number for pagination (default: 1)</td>
                                        </tr>
                                        <tr>
                                          <td className="py-2 pr-4">limit</td>
                                          <td className="py-2 pr-4 text-zinc-400">number</td>
                                          <td className="py-2 text-zinc-400">Number of items per page (default: 20)</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    
                                    <h4 className="text-sm font-medium mt-4 mb-2">Response</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "errors": [
      {
        "id": "err_123",
        "timestamp": "2023-09-16T18:45:00Z",
        "botId": "bot_456",
        "botName": "ETH Trend Follower",
        "accountId": "acc_789",
        "accountName": "Binance Account",
        "type": "API_ERROR",
        "severity": "high",
        "status": "new",
        "message": "API connection timeout",
        "details": "Connection to Binance API timed out after 30 seconds",
        "affectedOperations": ["TRADE_EXECUTION", "BALANCE_CHECK"],
        "recommendedAction": "Check exchange status and API key permissions"
      },
      // Additional errors...
    ],
    "pagination": {
      "total": 28,
      "page": 1,
      "limit": 20,
      "totalPages": 2
    },
    "summary": {
      "totalErrors": 28,
      "byStatus": {
        "new": 15,
        "acknowledged": 8,
        "resolved": 5
      },
      "bySeverity": {
        "low": 10,
        "medium": 12,
        "high": 5,
        "critical": 1
      }
    }
  },
  "message": "Error signals retrieved successfully"
}`}
                                    </pre>
                                  </div>
                                </div>
                                
                                {/* Update Error Signal Status */}
                                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                                  <div className="flex justify-between items-center bg-zinc-900 px-4 py-2">
                                    <div className="flex items-center">
                                      <span className="bg-amber-500 text-white px-2 py-1 rounded text-xs font-bold mr-3">PUT</span>
                                      <span className="text-zinc-300 font-mono">/signals/errors/:errorId/status</span>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => copyToClipboard('/signals/errors/:errorId/status')}
                                    >
                                      {copiedEndpoint === '/signals/errors/:errorId/status' ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="p-4 bg-zinc-950">
                                    <h4 className="text-sm font-medium mb-2">Path Parameters</h4>
                                    <table className="w-full text-sm mb-4">
                                      <thead>
                                        <tr className="border-b border-zinc-800">
                                          <th className="text-left pb-2 text-zinc-400">Parameter</th>
                                          <th className="text-left pb-2 text-zinc-400">Type</th>
                                          <th className="text-left pb-2 text-zinc-400">Description</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td className="py-2 pr-4">errorId</td>
                                          <td className="py-2 pr-4 text-zinc-400">string</td>
                                          <td className="py-2 text-zinc-400">ID of the error to update</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    
                                    <h4 className="text-sm font-medium mb-2">Request Body</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "status": "acknowledged", // or "resolved"
  "notes": "Working on fixing API connectivity issue"
}`}
                                    </pre>
                                    
                                    <h4 className="text-sm font-medium mt-4 mb-2">Response</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "id": "err_123",
    "status": "acknowledged",
    "updatedAt": "2023-09-17T09:15:00Z",
    "notes": "Working on fixing API connectivity issue"
  },
  "message": "Error status updated successfully"
}`}
                                    </pre>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          )}
                        </Card>
                      </div>
                    )}
                    
                    {/* Settings Section */}
                    {filterDocs('Settings preferences notifications') && (
                      <div ref={sectionRefs.settings}>
                        <Card className="bg-[#111111] border-zinc-800">
                          <CardHeader className="flex flex-row items-center justify-between cursor-pointer" onClick={() => toggleSection('settings')}>
                            <div>
                              <CardTitle>User Settings</CardTitle>
                              <CardDescription>Endpoints for user preferences and settings</CardDescription>
                            </div>
                            {expandedSections.settings ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                          </CardHeader>
                          
                          {expandedSections.settings && (
                            <CardContent>
                              <div className="space-y-8">
                                {/* Get User Settings */}
                                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                                  <div className="flex justify-between items-center bg-zinc-900 px-4 py-2">
                                    <div className="flex items-center">
                                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold mr-3">GET</span>
                                      <span className="text-zinc-300 font-mono">/settings</span>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => copyToClipboard('/settings')}
                                    >
                                      {copiedEndpoint === '/settings' ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="p-4 bg-zinc-950">
                                    <h4 className="text-sm font-medium mt-4 mb-2">Response</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "notifications": {
      "email": {
        "enabled": true,
        "tradingAlerts": true,
        "systemAlerts": true,
        "marketingEmails": false
      },
      "push": {
        "enabled": true,
        "tradingAlerts": true,
        "systemAlerts": true,
        "profitLossAlerts": true
      },
      "sms": {
        "enabled": false,
        "phoneNumber": null
      }
    },
    "appearance": {
      "theme": "dark",
      "compactMode": false,
      "chartPreferences": {
        "defaultTimeframe": "1d",
        "defaultIndicators": ["RSI", "MACD", "EMA"]
      }
    },
    "trading": {
      "defaultRiskPercentage": 2,
      "confirmationRequired": true,
      "defaultLeverage": 1,
      "timeZone": "UTC",
      "defaultCurrency": "USD"
    },
    "privacy": {
      "profileVisibility": "public",
      "showProfitLoss": true,
      "showTradingHistory": false,
      "shareDataWithPartners": false
    },
    "language": "en-US"
  },
  "message": "Settings retrieved successfully"
}`}
                                    </pre>
                                  </div>
                                </div>
                                
                                {/* Update Notification Settings */}
                                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                                  <div className="flex justify-between items-center bg-zinc-900 px-4 py-2">
                                    <div className="flex items-center">
                                      <span className="bg-amber-500 text-white px-2 py-1 rounded text-xs font-bold mr-3">PUT</span>
                                      <span className="text-zinc-300 font-mono">/settings/notifications</span>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => copyToClipboard('/settings/notifications')}
                                    >
                                      {copiedEndpoint === '/settings/notifications' ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="p-4 bg-zinc-950">
                                    <h4 className="text-sm font-medium mb-2">Request Body</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "email": {
    "enabled": true,
    "tradingAlerts": true,
    "systemAlerts": false,
    "marketingEmails": false
  },
  "push": {
    "enabled": true,
    "tradingAlerts": true,
    "systemAlerts": true,
    "profitLossAlerts": true
  },
  "sms": {
    "enabled": true,
    "phoneNumber": "+1234567890"
  }
}`}
                                    </pre>
                                    
                                    <h4 className="text-sm font-medium mt-4 mb-2">Response</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "notifications": {
      "email": {
        "enabled": true,
        "tradingAlerts": true,
        "systemAlerts": false,
        "marketingEmails": false
      },
      "push": {
        "enabled": true,
        "tradingAlerts": true,
        "systemAlerts": true,
        "profitLossAlerts": true
      },
      "sms": {
        "enabled": true,
        "phoneNumber": "+1234567890"
      }
    },
    "updatedAt": "2023-09-17T10:30:00Z"
  },
  "message": "Notification settings updated successfully"
}`}
                                    </pre>
                                  </div>
                                </div>
                                
                                {/* Update Appearance Settings */}
                                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                                  <div className="flex justify-between items-center bg-zinc-900 px-4 py-2">
                                    <div className="flex items-center">
                                      <span className="bg-amber-500 text-white px-2 py-1 rounded text-xs font-bold mr-3">PUT</span>
                                      <span className="text-zinc-300 font-mono">/settings/appearance</span>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => copyToClipboard('/settings/appearance')}
                                    >
                                      {copiedEndpoint === '/settings/appearance' ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="p-4 bg-zinc-950">
                                    <h4 className="text-sm font-medium mb-2">Request Body</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "theme": "light",
  "compactMode": true,
  "chartPreferences": {
    "defaultTimeframe": "4h",
    "defaultIndicators": ["RSI", "Bollinger", "Volume"]
  }
}`}
                                    </pre>
                                    
                                    <h4 className="text-sm font-medium mt-4 mb-2">Response</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "appearance": {
      "theme": "light",
      "compactMode": true,
      "chartPreferences": {
        "defaultTimeframe": "4h",
        "defaultIndicators": ["RSI", "Bollinger", "Volume"]
      }
    },
    "updatedAt": "2023-09-17T10:40:00Z"
  },
  "message": "Appearance settings updated successfully"
}`}
                                    </pre>
                                  </div>
                                </div>
                                
                                {/* Update Trading Settings */}
                                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                                  <div className="flex justify-between items-center bg-zinc-900 px-4 py-2">
                                    <div className="flex items-center">
                                      <span className="bg-amber-500 text-white px-2 py-1 rounded text-xs font-bold mr-3">PUT</span>
                                      <span className="text-zinc-300 font-mono">/settings/trading</span>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => copyToClipboard('/settings/trading')}
                                    >
                                      {copiedEndpoint === '/settings/trading' ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="p-4 bg-zinc-950">
                                    <h4 className="text-sm font-medium mb-2">Request Body</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "defaultRiskPercentage": 1.5,
  "confirmationRequired": false,
  "defaultLeverage": 2,
  "timeZone": "America/New_York",
  "defaultCurrency": "EUR"
}`}
                                    </pre>
                                    
                                    <h4 className="text-sm font-medium mt-4 mb-2">Response</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "trading": {
      "defaultRiskPercentage": 1.5,
      "confirmationRequired": false,
      "defaultLeverage": 2,
      "timeZone": "America/New_York",
      "defaultCurrency": "EUR"
    },
    "updatedAt": "2023-09-17T10:45:00Z"
  },
  "message": "Trading settings updated successfully"
}`}
                                    </pre>
                                  </div>
                                </div>
                                
                                {/* Update Privacy Settings */}
                                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                                  <div className="flex justify-between items-center bg-zinc-900 px-4 py-2">
                                    <div className="flex items-center">
                                      <span className="bg-amber-500 text-white px-2 py-1 rounded text-xs font-bold mr-3">PUT</span>
                                      <span className="text-zinc-300 font-mono">/settings/privacy</span>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => copyToClipboard('/settings/privacy')}
                                    >
                                      {copiedEndpoint === '/settings/privacy' ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="p-4 bg-zinc-950">
                                    <h4 className="text-sm font-medium mb-2">Request Body</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "profileVisibility": "private",
  "showProfitLoss": false,
  "showTradingHistory": false,
  "shareDataWithPartners": false
}`}
                                    </pre>
                                    
                                    <h4 className="text-sm font-medium mt-4 mb-2">Response</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "privacy": {
      "profileVisibility": "private",
      "showProfitLoss": false,
      "showTradingHistory": false,
      "shareDataWithPartners": false
    },
    "updatedAt": "2023-09-17T10:50:00Z"
  },
  "message": "Privacy settings updated successfully"
}`}
                                    </pre>
                                  </div>
                                </div>
                                
                                {/* Update Language Setting */}
                                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                                  <div className="flex justify-between items-center bg-zinc-900 px-4 py-2">
                                    <div className="flex items-center">
                                      <span className="bg-amber-500 text-white px-2 py-1 rounded text-xs font-bold mr-3">PUT</span>
                                      <span className="text-zinc-300 font-mono">/settings/language</span>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => copyToClipboard('/settings/language')}
                                    >
                                      {copiedEndpoint === '/settings/language' ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="p-4 bg-zinc-950">
                                    <h4 className="text-sm font-medium mb-2">Request Body</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "language": "vi-VN"
}`}
                                    </pre>
                                    
                                    <h4 className="text-sm font-medium mt-4 mb-2">Response</h4>
                                    <pre className="bg-zinc-900 p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "language": "vi-VN",
    "updatedAt": "2023-09-17T10:55:00Z"
  },
  "message": "Language setting updated successfully"
}`}
                                    </pre>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          )}
                        </Card>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="graphql" className="mt-0">
                  <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <h3 className="text-xl font-medium mb-2">GraphQL Documentation Coming Soon</h3>
                      <p className="text-zinc-400">
                        We're working on our GraphQL API implementation and documentation.
                        <br />Check back later for updates.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default ApiDocs;
