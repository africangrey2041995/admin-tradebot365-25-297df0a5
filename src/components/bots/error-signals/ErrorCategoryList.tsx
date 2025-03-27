
import React from 'react';
import { ExtendedSignal } from '@/types/signal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Shield, Server, LifeBuoy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ErrorCategoryListProps {
  signals: ExtendedSignal[];
  onViewDetails: (errorId: string) => void;
}

// Helper to categorize error signals
const categorizeSignals = (signals: ExtendedSignal[]) => {
  return {
    authentication: signals.filter(s => 
      (s.errorMessage?.toLowerCase().includes('auth') || 
       s.errorCode?.startsWith('AUTH'))
    ),
    trading: signals.filter(s => 
      (s.errorMessage?.toLowerCase().includes('trade') || 
       s.errorCode?.startsWith('TRADE'))
    ),
    integration: signals.filter(s => 
      (s.errorMessage?.toLowerCase().includes('connect') || 
       s.errorCode?.startsWith('CONN'))
    ),
    system: signals.filter(s => 
      !(s.errorMessage?.toLowerCase().includes('auth') || 
        s.errorMessage?.toLowerCase().includes('trade') || 
        s.errorMessage?.toLowerCase().includes('connect'))
    )
  };
};

const ErrorCategoryList: React.FC<ErrorCategoryListProps> = ({ signals, onViewDetails }) => {
  const categories = categorizeSignals(signals);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="bg-amber-50 dark:bg-amber-900/20 pb-2">
          <CardTitle className="text-base flex items-center justify-between">
            <span className="flex items-center">
              <Shield className="h-4 w-4 mr-2 text-amber-600" />
              Lỗi xác thực / uỷ quyền
            </span>
            <Badge variant="outline" className="bg-amber-100 dark:bg-amber-900/40">
              {categories.authentication.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-3">
          {categories.authentication.length > 0 ? (
            <ul className="space-y-1">
              {categories.authentication.slice(0, 5).map(signal => (
                <li 
                  key={signal.id}
                  className="text-sm p-2 hover:bg-amber-50 dark:hover:bg-amber-900/10 rounded cursor-pointer"
                  onClick={() => onViewDetails(signal.id)}
                >
                  {signal.errorMessage?.slice(0, 50) || signal.errorCode || 'Unknown error'}
                </li>
              ))}
              {categories.authentication.length > 5 && (
                <li className="text-xs text-center text-muted-foreground">
                  + {categories.authentication.length - 5} more errors
                </li>
              )}
            </ul>
          ) : (
            <div className="py-4 text-center text-muted-foreground text-sm">
              Không có lỗi xác thực
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="bg-blue-50 dark:bg-blue-900/20 pb-2">
          <CardTitle className="text-base flex items-center justify-between">
            <span className="flex items-center">
              <LifeBuoy className="h-4 w-4 mr-2 text-blue-600" />
              Lỗi giao dịch
            </span>
            <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900/40">
              {categories.trading.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-3">
          {categories.trading.length > 0 ? (
            <ul className="space-y-1">
              {categories.trading.slice(0, 5).map(signal => (
                <li 
                  key={signal.id}
                  className="text-sm p-2 hover:bg-blue-50 dark:hover:bg-blue-900/10 rounded cursor-pointer"
                  onClick={() => onViewDetails(signal.id)}
                >
                  {signal.errorMessage?.slice(0, 50) || signal.errorCode || 'Unknown error'}
                </li>
              ))}
              {categories.trading.length > 5 && (
                <li className="text-xs text-center text-muted-foreground">
                  + {categories.trading.length - 5} more errors
                </li>
              )}
            </ul>
          ) : (
            <div className="py-4 text-center text-muted-foreground text-sm">
              Không có lỗi giao dịch
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="bg-purple-50 dark:bg-purple-900/20 pb-2">
          <CardTitle className="text-base flex items-center justify-between">
            <span className="flex items-center">
              <Server className="h-4 w-4 mr-2 text-purple-600" />
              Lỗi tích hợp
            </span>
            <Badge variant="outline" className="bg-purple-100 dark:bg-purple-900/40">
              {categories.integration.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-3">
          {categories.integration.length > 0 ? (
            <ul className="space-y-1">
              {categories.integration.slice(0, 5).map(signal => (
                <li 
                  key={signal.id}
                  className="text-sm p-2 hover:bg-purple-50 dark:hover:bg-purple-900/10 rounded cursor-pointer"
                  onClick={() => onViewDetails(signal.id)}
                >
                  {signal.errorMessage?.slice(0, 50) || signal.errorCode || 'Unknown error'}
                </li>
              ))}
              {categories.integration.length > 5 && (
                <li className="text-xs text-center text-muted-foreground">
                  + {categories.integration.length - 5} more errors
                </li>
              )}
            </ul>
          ) : (
            <div className="py-4 text-center text-muted-foreground text-sm">
              Không có lỗi tích hợp
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="bg-red-50 dark:bg-red-900/20 pb-2">
          <CardTitle className="text-base flex items-center justify-between">
            <span className="flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2 text-red-600" />
              Lỗi hệ thống
            </span>
            <Badge variant="outline" className="bg-red-100 dark:bg-red-900/40">
              {categories.system.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-3">
          {categories.system.length > 0 ? (
            <ul className="space-y-1">
              {categories.system.slice(0, 5).map(signal => (
                <li 
                  key={signal.id}
                  className="text-sm p-2 hover:bg-red-50 dark:hover:bg-red-900/10 rounded cursor-pointer"
                  onClick={() => onViewDetails(signal.id)}
                >
                  {signal.errorMessage?.slice(0, 50) || signal.errorCode || 'Unknown error'}
                </li>
              ))}
              {categories.system.length > 5 && (
                <li className="text-xs text-center text-muted-foreground">
                  + {categories.system.length - 5} more errors
                </li>
              )}
            </ul>
          ) : (
            <div className="py-4 text-center text-muted-foreground text-sm">
              Không có lỗi hệ thống
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorCategoryList;
