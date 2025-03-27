
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ChevronRight, Server, Shield, UserCircle } from 'lucide-react';
import { ExtendedSignal } from '@/types';

interface ErrorCategoryListProps {
  signals: ExtendedSignal[];
  onViewDetails: (errorId: string) => void;
}

const ErrorCategoryList: React.FC<ErrorCategoryListProps> = ({ 
  signals,
  onViewDetails
}) => {
  // Group signals by category
  const authErrors = signals.filter(s => 
    s.errorMessage?.toLowerCase().includes('auth') || 
    s.errorCode?.startsWith('AUTH')
  );
  
  const tradingErrors = signals.filter(s => 
    s.errorMessage?.toLowerCase().includes('trade') || 
    s.errorCode?.startsWith('TRADE')
  );
  
  const integrationErrors = signals.filter(s => 
    s.errorMessage?.toLowerCase().includes('connect') || 
    s.errorCode?.startsWith('CONN')
  );
  
  const systemErrors = signals.filter(s => 
    !s.errorMessage?.toLowerCase().includes('auth') && 
    !s.errorMessage?.toLowerCase().includes('trade') && 
    !s.errorMessage?.toLowerCase().includes('connect')
  );
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="border-red-100 dark:border-red-900/20">
        <CardHeader className="bg-red-50 dark:bg-red-900/10 pb-2">
          <CardTitle className="text-red-700 dark:text-red-400 flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Lỗi xác thực / ủy quyền
          </CardTitle>
          <CardDescription>
            Các lỗi liên quan đến đăng nhập, token, phân quyền
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          {authErrors.length > 0 ? (
            <ul className="space-y-2">
              {authErrors.slice(0, 5).map(error => (
                <li key={error.id} className="flex justify-between items-center p-2 hover:bg-red-50 dark:hover:bg-red-900/10 rounded">
                  <div>
                    <div className="font-medium text-red-600 dark:text-red-400">
                      {error.errorCode || 'AUTH-ERROR'}
                    </div>
                    <div className="text-sm text-muted-foreground line-clamp-1">
                      {error.errorMessage}
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onViewDetails(error.id)}
                    className="text-blue-600"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </li>
              ))}
              {authErrors.length > 5 && (
                <li className="text-center text-sm text-muted-foreground pt-2">
                  + {authErrors.length - 5} lỗi khác
                </li>
              )}
            </ul>
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              Không có lỗi xác thực
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card className="border-orange-100 dark:border-orange-900/20">
        <CardHeader className="bg-orange-50 dark:bg-orange-900/10 pb-2">
          <CardTitle className="text-orange-700 dark:text-orange-400 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Lỗi giao dịch
          </CardTitle>
          <CardDescription>
            Các lỗi liên quan đến thực thi lệnh giao dịch
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          {tradingErrors.length > 0 ? (
            <ul className="space-y-2">
              {tradingErrors.slice(0, 5).map(error => (
                <li key={error.id} className="flex justify-between items-center p-2 hover:bg-orange-50 dark:hover:bg-orange-900/10 rounded">
                  <div>
                    <div className="font-medium text-orange-600 dark:text-orange-400">
                      {error.errorCode || 'TRADE-ERROR'}
                    </div>
                    <div className="text-sm text-muted-foreground line-clamp-1">
                      {error.errorMessage}
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onViewDetails(error.id)}
                    className="text-blue-600"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </li>
              ))}
              {tradingErrors.length > 5 && (
                <li className="text-center text-sm text-muted-foreground pt-2">
                  + {tradingErrors.length - 5} lỗi khác
                </li>
              )}
            </ul>
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              Không có lỗi giao dịch
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card className="border-blue-100 dark:border-blue-900/20">
        <CardHeader className="bg-blue-50 dark:bg-blue-900/10 pb-2">
          <CardTitle className="text-blue-700 dark:text-blue-400 flex items-center">
            <Server className="h-5 w-5 mr-2" />
            Lỗi tích hợp
          </CardTitle>
          <CardDescription>
            Các lỗi liên quan đến kết nối API, webhook
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          {integrationErrors.length > 0 ? (
            <ul className="space-y-2">
              {integrationErrors.slice(0, 5).map(error => (
                <li key={error.id} className="flex justify-between items-center p-2 hover:bg-blue-50 dark:hover:bg-blue-900/10 rounded">
                  <div>
                    <div className="font-medium text-blue-600 dark:text-blue-400">
                      {error.errorCode || 'CONN-ERROR'}
                    </div>
                    <div className="text-sm text-muted-foreground line-clamp-1">
                      {error.errorMessage}
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onViewDetails(error.id)}
                    className="text-blue-600"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </li>
              ))}
              {integrationErrors.length > 5 && (
                <li className="text-center text-sm text-muted-foreground pt-2">
                  + {integrationErrors.length - 5} lỗi khác
                </li>
              )}
            </ul>
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              Không có lỗi tích hợp
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card className="border-gray-200 dark:border-gray-800">
        <CardHeader className="bg-gray-50 dark:bg-gray-800/30 pb-2">
          <CardTitle className="text-gray-700 dark:text-gray-400 flex items-center">
            <UserCircle className="h-5 w-5 mr-2" />
            Lỗi hệ thống
          </CardTitle>
          <CardDescription>
            Các lỗi hệ thống khác và lỗi chưa phân loại
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          {systemErrors.length > 0 ? (
            <ul className="space-y-2">
              {systemErrors.slice(0, 5).map(error => (
                <li key={error.id} className="flex justify-between items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-900/10 rounded">
                  <div>
                    <div className="font-medium text-gray-600 dark:text-gray-400">
                      {error.errorCode || 'SYSTEM-ERROR'}
                    </div>
                    <div className="text-sm text-muted-foreground line-clamp-1">
                      {error.errorMessage}
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onViewDetails(error.id)}
                    className="text-blue-600"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </li>
              ))}
              {systemErrors.length > 5 && (
                <li className="text-center text-sm text-muted-foreground pt-2">
                  + {systemErrors.length - 5} lỗi khác
                </li>
              )}
            </ul>
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              Không có lỗi hệ thống
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorCategoryList;
