
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExtendedSignal } from '@/types';
import { AlertTriangle, BarChart, Calendar, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

interface ErrorGroupListProps {
  signals: ExtendedSignal[];
  onViewDetails: (errorId: string) => void;
}

// Group signals by same error message/code
const groupSignalsByError = (signals: ExtendedSignal[]) => {
  const groups: Record<string, ExtendedSignal[]> = {};
  
  signals.forEach(signal => {
    // Create a key based on error message or code
    const key = signal.errorCode || signal.errorMessage?.substring(0, 50) || 'unknown';
    
    if (!groups[key]) {
      groups[key] = [];
    }
    
    groups[key].push(signal);
  });
  
  // Convert to array and sort by count
  return Object.entries(groups)
    .map(([key, signals]) => ({
      key,
      signals,
      count: signals.length,
      mostRecent: signals.reduce((latest, current) => 
        new Date(current.timestamp) > new Date(latest.timestamp) ? current : latest, 
        signals[0]
      )
    }))
    .sort((a, b) => b.count - a.count);
};

// Group signals by day
const groupSignalsByDay = (signals: ExtendedSignal[]) => {
  const groups: Record<string, ExtendedSignal[]> = {};
  
  signals.forEach(signal => {
    try {
      // Use just the date part as the key
      const date = new Date(signal.timestamp);
      const key = format(date, 'yyyy-MM-dd');
      
      if (!groups[key]) {
        groups[key] = [];
      }
      
      groups[key].push(signal);
    } catch (e) {
      console.error('Error parsing date', e);
    }
  });
  
  // Convert to array and sort by date (newest first)
  return Object.entries(groups)
    .map(([key, signals]) => ({
      key,
      date: new Date(key),
      signals,
      count: signals.length
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime());
};

// Group signals by bot
const groupSignalsByBot = (signals: ExtendedSignal[]) => {
  const groups: Record<string, ExtendedSignal[]> = {};
  
  signals.forEach(signal => {
    const key = signal.botId || 'unknown';
    
    if (!groups[key]) {
      groups[key] = [];
    }
    
    groups[key].push(signal);
  });
  
  // Convert to array and sort by count
  return Object.entries(groups)
    .map(([key, signals]) => ({
      key,
      botId: key,
      botName: signals[0].botName || key,
      botType: signals[0].botType || 'unknown',
      signals,
      count: signals.length,
      mostRecent: signals.reduce((latest, current) => 
        new Date(current.timestamp) > new Date(latest.timestamp) ? current : latest, 
        signals[0]
      )
    }))
    .sort((a, b) => b.count - a.count);
};

const renderLastOccurrence = (timestamp: string) => {
  try {
    return format(new Date(timestamp), 'dd/MM/yyyy HH:mm');
  } catch (e) {
    return 'Unknown date';
  }
};

const ErrorGroupList: React.FC<ErrorGroupListProps> = ({ signals, onViewDetails }) => {
  const errorGroups = groupSignalsByError(signals);
  const dayGroups = groupSignalsByDay(signals);
  const botGroups = groupSignalsByBot(signals);
  
  return (
    <div className="space-y-8">
      {/* Grouped by Error Type */}
      <Card>
        <CardHeader className="bg-red-50 dark:bg-red-900/20 pb-2">
          <CardTitle className="text-red-700 dark:text-red-400 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Lỗi phân theo loại
          </CardTitle>
          <CardDescription>
            Các lỗi được nhóm theo loại lỗi giống nhau
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-3">
            {errorGroups.map((group, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 rounded border hover:bg-red-50 dark:hover:bg-red-900/10"
              >
                <div className="flex-1">
                  <div className="font-medium">
                    {group.key.length > 50 ? `${group.key.substring(0, 50)}...` : group.key}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {group.count} lần xuất hiện - Gần nhất: {renderLastOccurrence(group.mostRecent.timestamp)}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-2xl font-bold text-red-600">
                    {group.count}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onViewDetails(group.mostRecent.id)}
                    className="text-blue-600"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Grouped by Date */}
      <Card>
        <CardHeader className="bg-blue-50 dark:bg-blue-900/20 pb-2">
          <CardTitle className="text-blue-700 dark:text-blue-400 flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Lỗi phân theo ngày
          </CardTitle>
          <CardDescription>
            Các lỗi được nhóm theo ngày xảy ra
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-3">
            {dayGroups.map((group, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 rounded border hover:bg-blue-50 dark:hover:bg-blue-900/10"
              >
                <div className="flex-1">
                  <div className="font-medium">
                    {format(group.date, 'dd/MM/yyyy')}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {group.count} lỗi được ghi nhận
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-2xl font-bold text-blue-600">
                    {group.count}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onViewDetails(group.signals[0].id)}
                    className="text-blue-600"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Grouped by Bot */}
      <Card>
        <CardHeader className="bg-green-50 dark:bg-green-900/20 pb-2">
          <CardTitle className="text-green-700 dark:text-green-400 flex items-center">
            <BarChart className="h-5 w-5 mr-2" />
            Lỗi phân theo Bot
          </CardTitle>
          <CardDescription>
            Các lỗi được nhóm theo Bot gặp phải
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-3">
            {botGroups.map((group, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 rounded border hover:bg-green-50 dark:hover:bg-green-900/10"
              >
                <div className="flex-1">
                  <div className="font-medium">
                    {group.botName || group.botId}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {group.botType} - {group.count} lỗi được ghi nhận
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Gần nhất: {renderLastOccurrence(group.mostRecent.timestamp)}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-2xl font-bold text-green-600">
                    {group.count}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onViewDetails(group.mostRecent.id)}
                    className="text-blue-600"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorGroupList;
