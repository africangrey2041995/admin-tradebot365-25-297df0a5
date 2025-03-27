
import React, { useMemo } from 'react';
import { ExtendedSignal } from '@/types/signal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CircleAlert, Database, MailWarning, AlertTriangle, BookX, Unplug } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

interface ErrorGroupListProps {
  signals: ExtendedSignal[];
  onViewDetails: (errorId: string) => void;
}

// Helper function to format time
const formatTime = (timestamp?: string) => {
  if (!timestamp) return '';
  
  try {
    return formatDistanceToNow(new Date(timestamp), { 
      addSuffix: true,
      locale: vi
    });
  } catch (err) {
    return timestamp;
  }
};

const ErrorGroupList: React.FC<ErrorGroupListProps> = ({
  signals,
  onViewDetails
}) => {
  const groupedErrors = useMemo(() => {
    // First, group by error code/pattern
    const errorCodeGroups: Record<string, ExtendedSignal[]> = {};
    
    signals.forEach(signal => {
      const errorKey = signal.errorCode || 
                     (signal.errorMessage?.slice(0, 30).replace(/[^a-zA-Z0-9]/g, '_') || 
                     'unknown_error');
      
      if (!errorCodeGroups[errorKey]) {
        errorCodeGroups[errorKey] = [];
      }
      
      errorCodeGroups[errorKey].push(signal);
    });
    
    // Convert to array and sort by count (largest groups first)
    return Object.entries(errorCodeGroups)
      .map(([key, groupSignals]) => ({
        key,
        title: groupSignals[0].errorMessage || 'Lỗi không xác định',
        icon: getErrorIcon(key, groupSignals[0].errorMessage),
        count: groupSignals.length,
        signals: groupSignals,
        latestTimestamp: groupSignals.reduce((latest, signal) => {
          if (!latest || (signal.timestamp && new Date(signal.timestamp) > new Date(latest))) {
            return signal.timestamp;
          }
          return latest;
        }, ''),
        mostCommonBot: getMostCommonValue(groupSignals.map(s => s.botName || s.botId || 'unknown')),
        mostCommonUser: getMostCommonValue(groupSignals.map(s => s.userId || 'unknown')),
        severity: getSeverityForGroup(groupSignals)
      }))
      .sort((a, b) => b.count - a.count);
  }, [signals]);

  // Helper to get the most common value in an array
  function getMostCommonValue(arr: string[]): string {
    const counts: Record<string, number> = {};
    let maxCount = 0;
    let mostCommon = arr[0] || '';
    
    for (const item of arr) {
      counts[item] = (counts[item] || 0) + 1;
      if (counts[item] > maxCount) {
        maxCount = counts[item];
        mostCommon = item;
      }
    }
    
    return mostCommon;
  }

  // Helper to get appropriate icon based on error pattern
  function getErrorIcon(errorKey: string, errorMessage?: string): React.ReactNode {
    if (errorKey.includes('AUTH') || errorMessage?.includes('authorization')) {
      return <MailWarning className="h-5 w-5 text-orange-500" />;
    } else if (errorKey.includes('CONN') || errorMessage?.includes('connection')) {
      return <Unplug className="h-5 w-5 text-purple-500" />;
    } else if (errorKey.includes('TRADE') || errorMessage?.includes('trade')) {
      return <BookX className="h-5 w-5 text-blue-500" />;
    } else if (errorKey.includes('DB') || errorMessage?.includes('database')) {
      return <Database className="h-5 w-5 text-green-500" />;
    } else {
      return <CircleAlert className="h-5 w-5 text-red-500" />;
    }
  }

  // Helper to determine group severity
  function getSeverityForGroup(groupSignals: ExtendedSignal[]): string {
    // Count occurrences of each severity
    const counts: Record<string, number> = {};
    
    groupSignals.forEach(signal => {
      const severity = signal.errorSeverity || 'unknown';
      counts[severity] = (counts[severity] || 0) + 1;
    });
    
    // Check for critical first, then high, etc.
    if (counts['critical'] && counts['critical'] > 0) return 'critical';
    if (counts['high'] && counts['high'] > 0) return 'high';
    if (counts['medium'] && counts['medium'] > 0) return 'medium';
    if (counts['low'] && counts['low'] > 0) return 'low';
    
    return 'unknown';
  }

  // Helper to get severity badge class
  function getSeverityClass(severity: string): string {
    switch (severity) {
      case 'critical':
        return 'bg-red-500';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  }

  return (
    <div className="space-y-4">
      {groupedErrors.map(group => (
        <Card key={group.key} className="overflow-hidden">
          <div className={`h-1 w-full ${getSeverityClass(group.severity)}`}></div>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {group.icon}
                <CardTitle className="ml-2 text-base line-clamp-1 flex-1">{group.title}</CardTitle>
              </div>
              <Badge className={getSeverityClass(group.severity)}>
                {group.count} lỗi
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
              <div>
                <p className="text-muted-foreground text-xs">Bot phổ biến nhất</p>
                <p className="font-medium">{group.mostCommonBot}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Người dùng phổ biến nhất</p>
                <p className="font-medium">{group.mostCommonUser}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Lần xuất hiện gần nhất</p>
                <p className="font-medium">{formatTime(group.latestTimestamp)}</p>
              </div>
            </div>
            
            <div className="border-t pt-3">
              <div className="text-sm mb-2 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-muted-foreground">Lỗi gần đây</span>
              </div>
              
              <div className="space-y-2 max-h-[150px] overflow-y-auto pr-1">
                {group.signals.slice(0, 3).map(signal => (
                  <div 
                    key={signal.id}
                    className="flex justify-between items-center p-2 rounded bg-muted/30 text-sm"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{signal.botName || signal.botId || 'N/A'}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(signal.timestamp)}
                      </span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 text-xs"
                      onClick={() => onViewDetails(signal.id)}
                    >
                      Xem chi tiết
                    </Button>
                  </div>
                ))}
                
                {group.count > 3 && (
                  <div className="text-center text-sm text-muted-foreground py-1">
                    + {group.count - 3} lỗi khác
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-3 flex justify-end">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onViewDetails(group.signals[0].id)}
              >
                Xem chi tiết nhóm
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {groupedErrors.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          Không tìm thấy nhóm lỗi nào phù hợp với bộ lọc hiện tại
        </div>
      )}
    </div>
  );
};

export default ErrorGroupList;
