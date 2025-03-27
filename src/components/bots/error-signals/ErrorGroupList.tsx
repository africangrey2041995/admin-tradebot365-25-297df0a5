
import React, { useMemo } from 'react';
import { ExtendedSignal } from '@/types/signal';
import { AlertCircle, Bot, Clock, ExternalLink, ShieldAlert, UserCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

interface ErrorGroupListProps {
  signals: ExtendedSignal[];
  onViewDetails: (errorId: string) => void;
}

type GroupedSignals = {
  [botId: string]: {
    botName?: string;
    botType?: string;
    signals: ExtendedSignal[];
    userId?: string;
  }
};

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

// Helper function to get bot icon based on bot type
const getBotIcon = (botType?: string) => {
  switch (botType?.toLowerCase()) {
    case 'premium_bot':
      return <ShieldAlert className="h-5 w-5 text-amber-500" />;
    case 'prop_bot':
      return <AlertCircle className="h-5 w-5 text-blue-500" />;
    case 'user_bot':
      return <UserCircle className="h-5 w-5 text-green-500" />;
    default:
      return <Bot className="h-5 w-5 text-gray-500" />;
  }
};

const ErrorGroupList: React.FC<ErrorGroupListProps> = ({
  signals,
  onViewDetails
}) => {
  // Group signals by bot ID
  const groupedSignals = useMemo(() => {
    const result: GroupedSignals = {};
    
    signals.forEach(signal => {
      if (signal.botId) {
        if (!result[signal.botId]) {
          result[signal.botId] = {
            botName: signal.botName,
            botType: signal.botType,
            signals: [],
            userId: signal.userId
          };
        }
        result[signal.botId].signals.push(signal);
      }
    });
    
    return result;
  }, [signals]);

  return (
    <div className="space-y-4">
      {Object.entries(groupedSignals).length > 0 ? (
        Object.entries(groupedSignals).map(([botId, group]) => (
          <Card key={botId} className="overflow-hidden">
            <CardHeader className="pb-3 flex flex-row items-center justify-between bg-muted/30">
              <div className="flex items-center">
                {getBotIcon(group.botType)}
                <CardTitle className="ml-2 text-lg">{group.botName || botId}</CardTitle>
                <Badge variant="outline" className="ml-2">
                  {group.signals.length}
                </Badge>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-xs"
                onClick={() => window.open(`/admin/bots/${botId}`, '_blank')}
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Xem Bot
              </Button>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                {group.signals.map(signal => (
                  <div 
                    key={signal.id} 
                    className="p-3 border rounded-md bg-background hover:border-primary transition-colors cursor-pointer"
                    onClick={() => onViewDetails(signal.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-sm font-medium line-clamp-1">
                        {signal.errorMessage || 'Lỗi không xác định'}
                      </h4>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 text-muted-foreground mr-1" />
                        <span className="text-xs text-muted-foreground">
                          {formatTime(signal.timestamp)}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-xs">
                        <span className="text-muted-foreground">Mã: </span>
                        <span>{signal.errorCode || 'N/A'}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-7 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewDetails(signal.id);
                        }}
                      >
                        Xem chi tiết
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          Không tìm thấy lỗi nào để nhóm
        </div>
      )}
    </div>
  );
};

export default ErrorGroupList;
