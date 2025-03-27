
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExtendedSignal } from '@/types/signal';
import { ErrorCategory } from './HierarchicalErrorView';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, Cell, Pie, PieChart } from 'recharts';
import { 
  AlertTriangle, 
  ArrowUp, 
  Clock,
  Database, 
  Key, 
  ServerCrash, 
  DollarSign, 
  Webhook 
} from 'lucide-react';

interface ErrorPatternAnalyticsProps {
  errors: ExtendedSignal[];
  timeRange?: 'day' | 'week' | 'month';
  loading?: boolean;
}

interface ErrorStat {
  category: ErrorCategory;
  count: number;
  name: string;
  color: string;
}

interface SeverityStat {
  name: string;
  value: number;
  color: string;
}

interface TimelinePoint {
  time: string;
  count: number;
  AUTH?: number;
  TRADING?: number;
  INTEGRATION?: number;
  SYSTEM?: number;
  TIME?: number;
  CONN?: number;
  UNK?: number;
}

const ErrorPatternAnalytics: React.FC<ErrorPatternAnalyticsProps> = ({ 
  errors, 
  timeRange = 'week',
  loading = false
}) => {
  // Function to determine error category
  const getErrorCategory = (errorMsg: string): ErrorCategory => {
    const lowerMsg = errorMsg.toLowerCase();
    
    if (lowerMsg.includes('auth') || lowerMsg.includes('token') || lowerMsg.includes('permission') || 
        lowerMsg.includes('key') || lowerMsg.includes('login') || lowerMsg.includes('credential')) {
      return 'AUTH';
    } else if (lowerMsg.includes('trade') || lowerMsg.includes('order') || lowerMsg.includes('position') || 
              lowerMsg.includes('balance') || lowerMsg.includes('fund') || lowerMsg.includes('margin') ||
              lowerMsg.includes('liquidation')) {
      return 'TRADING';
    } else if (lowerMsg.includes('api') || lowerMsg.includes('request') || lowerMsg.includes('response') || 
              lowerMsg.includes('webhook') || lowerMsg.includes('format') || lowerMsg.includes('payload')) {
      return 'INTEGRATION';
    } else if (lowerMsg.includes('time') || lowerMsg.includes('timeout') || lowerMsg.includes('delay') ||
              lowerMsg.includes('expired')) {
      return 'TIME';
    } else if (lowerMsg.includes('connect') || lowerMsg.includes('network') || lowerMsg.includes('server') ||
              lowerMsg.includes('unavailable') || lowerMsg.includes('unreachable')) {
      return 'CONN';
    } else if (lowerMsg.includes('system') || lowerMsg.includes('internal') || lowerMsg.includes('crash') ||
              lowerMsg.includes('error') || lowerMsg.includes('exception')) {
      return 'SYSTEM';
    }
    
    return 'UNK';
  };
  
  // Calculate error stats by category
  const calculateErrorStats = (): ErrorStat[] => {
    const stats: Record<ErrorCategory, number> = {
      AUTH: 0,
      TRADING: 0,
      INTEGRATION: 0,
      SYSTEM: 0,
      TIME: 0,
      CONN: 0,
      UNK: 0
    };
    
    errors.forEach(error => {
      const category = getErrorCategory(error.errorMessage || '');
      stats[category]++;
    });
    
    const categoryNames: Record<ErrorCategory, string> = {
      AUTH: 'Authentication',
      TRADING: 'Trading',
      INTEGRATION: 'Integration',
      SYSTEM: 'System',
      TIME: 'Timeout',
      CONN: 'Connection',
      UNK: 'Unknown'
    };
    
    const categoryColors: Record<ErrorCategory, string> = {
      AUTH: '#8B5CF6', // Purple
      TRADING: '#3B82F6', // Blue
      INTEGRATION: '#10B981', // Green
      SYSTEM: '#EF4444', // Red
      TIME: '#F59E0B', // Amber
      CONN: '#6366F1', // Indigo
      UNK: '#9CA3AF' // Gray
    };
    
    return Object.entries(stats).map(([category, count]) => ({
      category: category as ErrorCategory,
      count,
      name: categoryNames[category as ErrorCategory],
      color: categoryColors[category as ErrorCategory]
    })).sort((a, b) => b.count - a.count);
  };
  
  // Calculate severity stats
  const calculateSeverityStats = (): SeverityStat[] => {
    const stats: Record<string, number> = {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0
    };
    
    errors.forEach(error => {
      const severity = error.errorSeverity || 'medium';
      stats[severity]++;
    });
    
    const severityColors: Record<string, string> = {
      critical: '#EF4444', // Red
      high: '#F97316', // Orange
      medium: '#F59E0B', // Amber
      low: '#FBBF24' // Yellow
    };
    
    return Object.entries(stats).map(([severity, value]) => ({
      name: severity.charAt(0).toUpperCase() + severity.slice(1),
      value,
      color: severityColors[severity]
    }));
  };
  
  // Generate timeline data
  const generateTimelineData = (): TimelinePoint[] => {
    const now = new Date();
    const points: TimelinePoint[] = [];
    const dataPoints = timeRange === 'day' ? 24 : timeRange === 'week' ? 7 : 30;
    const categoryData: Record<ErrorCategory, Record<string, number>> = {
      AUTH: {},
      TRADING: {},
      INTEGRATION: {},
      SYSTEM: {},
      TIME: {},
      CONN: {},
      UNK: {}
    };
    
    // Create time points
    for (let i = 0; i < dataPoints; i++) {
      const date = new Date();
      if (timeRange === 'day') {
        date.setHours(now.getHours() - (dataPoints - 1 - i));
        const timeStr = `${date.getHours()}:00`;
        points.push({ time: timeStr, count: 0 });
      } else if (timeRange === 'week') {
        date.setDate(now.getDate() - (dataPoints - 1 - i));
        const timeStr = date.toLocaleDateString('en-US', { weekday: 'short' });
        points.push({ time: timeStr, count: 0 });
      } else {
        date.setDate(now.getDate() - (dataPoints - 1 - i));
        const timeStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        points.push({ time: timeStr, count: 0 });
      }
    }

    // Count errors per time point
    errors.forEach(error => {
      const errorDate = new Date(error.timestamp);
      const category = getErrorCategory(error.errorMessage || '');
      
      let index = -1;
      
      if (timeRange === 'day') {
        index = points.findIndex(p => 
          parseInt(p.time.split(':')[0]) === errorDate.getHours()
        );
      } else if (timeRange === 'week') {
        const dayStr = errorDate.toLocaleDateString('en-US', { weekday: 'short' });
        index = points.findIndex(p => p.time === dayStr);
      } else {
        const dateStr = errorDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        index = points.findIndex(p => p.time === dateStr);
      }
      
      if (index >= 0) {
        points[index].count++;
        
        // Increment category count
        points[index][category] = (points[index][category] || 0) + 1;
        
        // Track categories for recurring pattern detection
        const timeKey = points[index].time;
        if (!categoryData[category][timeKey]) {
          categoryData[category][timeKey] = 0;
        }
        categoryData[category][timeKey]++;
      }
    });
    
    return points;
  };
  
  // Find recurring patterns
  const findRecurringPatterns = () => {
    const patterns: { category: ErrorCategory; message: string; count: number; }[] = [];
    const errorMessages: Record<string, { count: number; category: ErrorCategory; }> = {};
    
    errors.forEach(error => {
      const message = error.errorMessage || 'Unknown error';
      const category = getErrorCategory(message);
      
      if (!errorMessages[message]) {
        errorMessages[message] = { count: 0, category };
      }
      
      errorMessages[message].count++;
    });
    
    Object.entries(errorMessages)
      .filter(([_, data]) => data.count > 1) // Only include messages with multiple occurrences
      .sort((a, b) => b[1].count - a[1].count) // Sort by count, descending
      .slice(0, 3) // Take top 3
      .forEach(([message, data]) => {
        patterns.push({
          category: data.category,
          message: message.length > 70 ? message.substring(0, 70) + '...' : message,
          count: data.count
        });
      });
    
    return patterns;
  };

  // Get category icon
  const getCategoryIcon = (category: ErrorCategory) => {
    switch (category) {
      case 'AUTH':
        return <Key className="h-4 w-4" />;
      case 'TRADING':
        return <DollarSign className="h-4 w-4" />;
      case 'INTEGRATION':
        return <Webhook className="h-4 w-4" />;
      case 'SYSTEM':
        return <ServerCrash className="h-4 w-4" />;
      case 'TIME':
        return <Clock className="h-4 w-4" />;
      case 'CONN':
        return <Database className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };
  
  const errorStats = calculateErrorStats();
  const severityStats = calculateSeverityStats();
  const timelineData = generateTimelineData();
  const recurringPatterns = findRecurringPatterns();
  
  const totalErrors = errors.length;
  const criticalErrors = errors.filter(e => e.errorSeverity === 'critical').length;
  const errorTrend = totalErrors > 0 ? 
    Math.round((timelineData[timelineData.length - 1].count - timelineData[0].count) / totalErrors * 100) : 0;
  
  const chartConfig = {
    AUTH: { color: '#8B5CF6' },
    TRADING: { color: '#3B82F6' },
    INTEGRATION: { color: '#10B981' },
    SYSTEM: { color: '#EF4444' },
    TIME: { color: '#F59E0B' },
    CONN: { color: '#6366F1' },
    UNK: { color: '#9CA3AF' }
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center justify-between">
          <span>Error Pattern Analysis</span>
          <div className="flex items-center gap-2">
            <Badge variant={errorTrend > 0 ? "destructive" : "success"} className="flex items-center">
              {errorTrend > 0 ? 
                <ArrowUp className="h-3 w-3 mr-1" /> : 
                <ArrowUp className="h-3 w-3 mr-1 rotate-180" />
              }
              {Math.abs(errorTrend)}% {errorTrend > 0 ? 'Increase' : 'Decrease'}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-white/50 dark:bg-zinc-800/50">
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">Total Errors</div>
              <div className="text-2xl font-bold mt-1">{totalErrors}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/50 dark:bg-zinc-800/50">
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">Critical Errors</div>
              <div className="text-2xl font-bold mt-1 text-red-500">{criticalErrors}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/50 dark:bg-zinc-800/50">
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">Most Common</div>
              <div className="text-2xl font-bold mt-1 flex items-center">
                {errorStats.length > 0 && (
                  <>
                    {getCategoryIcon(errorStats[0].category)}
                    <span className="ml-1">{errorStats[0].name}</span>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/50 dark:bg-zinc-800/50">
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">Frequent Targets</div>
              <div className="text-lg font-medium mt-1 truncate">
                {errors.length > 0 ? errors[0].instrument : 'None'}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Error Distribution by Category */}
          <Card className="col-span-2 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Error Distribution by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ChartContainer config={chartConfig}>
                  <BarChart data={errorStats}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="count" name="Count">
                      {errorStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          {/* Error Distribution by Severity */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Error Severity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ChartContainer config={chartConfig}>
                  <PieChart>
                    <Pie
                      data={severityStats}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {severityStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                  </PieChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Error Timeline */}
        <Card className="shadow-sm mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Error Trend ({timeRange === 'day' ? 'Last 24 Hours' : timeRange === 'week' ? 'Last 7 Days' : 'Last 30 Days'})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ChartContainer config={chartConfig}>
                <BarChart data={timelineData}>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="AUTH" stackId="a" name="Authentication" fill="#8B5CF6" />
                  <Bar dataKey="TRADING" stackId="a" name="Trading" fill="#3B82F6" />
                  <Bar dataKey="INTEGRATION" stackId="a" name="Integration" fill="#10B981" />
                  <Bar dataKey="SYSTEM" stackId="a" name="System" fill="#EF4444" />
                  <Bar dataKey="TIME" stackId="a" name="Timeout" fill="#F59E0B" />
                  <Bar dataKey="CONN" stackId="a" name="Connection" fill="#6366F1" />
                  <Bar dataKey="UNK" stackId="a" name="Unknown" fill="#9CA3AF" />
                  <Legend />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recurring Patterns */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Recurring Error Patterns</CardTitle>
          </CardHeader>
          <CardContent>
            {recurringPatterns.length > 0 ? (
              <div className="space-y-3">
                {recurringPatterns.map((pattern, index) => (
                  <div key={index} className="p-3 border rounded-md">
                    <div className="flex items-center gap-2 mb-1">
                      {getCategoryIcon(pattern.category)}
                      <span className="font-medium">{pattern.category}</span>
                      <Badge className="ml-auto">{pattern.count} occurrences</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{pattern.message}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                No recurring patterns detected
              </div>
            )}
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default ErrorPatternAnalytics;
