
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, ArrowLeft, Bot, Check, Edit, RefreshCw, Trash2, AlertCircle } from 'lucide-react';
import ErrorSignals from '@/components/bots/ErrorSignals';

// Mock data for prop trading bots
const propBots = [
  {
    id: 'PROP-001',
    name: 'Prop Master Strategy',
    description: 'Advanced prop trading strategy for Coinstrat Pro',
    status: 'active',
    exchange: 'Coinstrat Pro',
    type: 'prop',
    performanceLastMonth: '+12.5%',
    performanceAllTime: '+45.7%',
    minCapital: '$1,000',
    risk: 'medium',
    createdAt: '2023-09-15',
    features: [
      'Optimized for Prop Trading Challenges',
      'Low drawdown strategy',
      'Consistent profit taking',
      'Risk management built-in'
    ],
    subscribers: 348
  },
  {
    id: 'PROP-002',
    name: 'Risk Manager Pro',
    description: 'Low risk prop trading strategy focused on capital preservation',
    status: 'active',
    exchange: 'Coinstrat Pro',
    type: 'prop',
    performanceLastMonth: '+8.3%',
    performanceAllTime: '+32.1%',
    minCapital: '$500',
    risk: 'low',
    createdAt: '2023-10-05',
    features: [
      'Ultra low drawdown',
      'Consistent small wins',
      'Automatic position sizing',
      'Designed for FTMO'
    ],
    subscribers: 215
  }
];

const AdminPropBotDetail = () => {
  const { botId } = useParams<{ botId: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [bot, setBot] = useState<any>(null);
  const [unreadErrorCount, setUnreadErrorCount] = useState(3);
  
  useEffect(() => {
    // Simulate data loading
    setIsLoading(true);
    setTimeout(() => {
      const foundBot = propBots.find(b => b.id === botId);
      setBot(foundBot || null);
      setIsLoading(false);
    }, 500);
  }, [botId]);
  
  const goBack = () => {
    navigate('/admin/prop-bots');
  };
  
  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <RefreshCw className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-lg">Loading prop bot details...</span>
        </div>
      </AdminLayout>
    );
  }
  
  if (!bot) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <AlertCircle className="h-16 w-16 text-destructive mb-4" />
          <h1 className="text-2xl font-bold mb-2">Bot Not Found</h1>
          <p className="text-muted-foreground mb-6">The prop trading bot you're looking for doesn't exist.</p>
          <Button onClick={goBack}>Go Back to Prop Bots</Button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" onClick={goBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">Prop Trading Bot Details</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit Bot
            </Button>
            <Button variant="destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Bot
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{bot.name}</CardTitle>
                <CardDescription className="mt-1">{bot.description}</CardDescription>
              </div>
              <Badge className={bot.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                {bot.status === 'active' ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Bot ID</div>
                <div className="font-medium">{bot.id}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Exchange</div>
                <div className="font-medium">{bot.exchange}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Type</div>
                <div className="font-medium">{bot.type === 'prop' ? 'Prop Trading' : 'Standard'}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Performance (Last Month)</div>
                <div className="font-medium text-green-600">{bot.performanceLastMonth}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Performance (All Time)</div>
                <div className="font-medium text-green-600">{bot.performanceAllTime}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Min. Capital</div>
                <div className="font-medium">{bot.minCapital}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Risk Level</div>
                <div className="font-medium">
                  <Badge className={
                    bot.risk === 'low' ? 'bg-green-100 text-green-700' : 
                    bot.risk === 'medium' ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-red-100 text-red-700'
                  }>
                    {bot.risk === 'low' ? 'Low' : bot.risk === 'medium' ? 'Medium' : 'High'}
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Created At</div>
                <div className="font-medium">{bot.createdAt}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Subscribers</div>
                <div className="font-medium">{bot.subscribers}</div>
              </div>
            </div>

            <Tabs defaultValue="features">
              <TabsList>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger 
                  value="errors" 
                  className="flex items-center gap-1 relative"
                >
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  Error Signals
                  {unreadErrorCount > 0 && (
                    <Badge 
                      className="absolute -top-1.5 -right-1.5 h-5 min-w-5 flex items-center justify-center p-0 text-[10px] bg-red-500 text-white rounded-full"
                    >
                      {unreadErrorCount}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="features" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Bot Features</CardTitle>
                    <CardDescription>Key features of this prop trading bot</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-none">
                      {bot.features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="subscribers" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Subscribers</CardTitle>
                    <CardDescription>Users who have subscribed to this bot</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">Subscriber details table would appear here</p>
                      <Button variant="outline">View All Subscribers</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="performance" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Performance Stats</CardTitle>
                    <CardDescription>Historical performance data for this bot</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">Performance chart would appear here</p>
                      <Button variant="outline">View Detailed Stats</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="errors" className="mt-4">
                <Card className="border-red-200 dark:border-red-800/30 bg-red-50/20 dark:bg-red-900/10">
                  <CardHeader>
                    <CardTitle className="text-red-600 dark:text-red-400 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      Error Signals to Fix
                      {unreadErrorCount > 0 && (
                        <Badge className="bg-red-500 text-white">
                          {unreadErrorCount} new
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="text-red-600/80 dark:text-red-400/80">
                      Critical signals that require immediate attention for this prop trading bot
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ErrorSignals botId={botId || ''} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminPropBotDetail;
