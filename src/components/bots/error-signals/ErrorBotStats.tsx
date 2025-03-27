
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, ArrowDown, PieChart } from 'lucide-react';
import { mockErrorSignals } from './mockData';
import { BotType } from '@/constants/botTypes';

const ErrorBotStats = () => {
  const [errorCount, setErrorCount] = useState({
    user: 0,
    premium: 0,
    prop: 0
  });
  
  const [errorsBySeverity, setErrorsBySeverity] = useState<Record<string, number>>({
    critical: 0,
    high: 0,
    medium: 0,
    low: 0
  });

  useEffect(() => {
    // Count errors by bot type
    const userErrors = mockErrorSignals.filter(
      err => err.botType?.toLowerCase().includes('user')
    ).length;
    
    const premiumErrors = mockErrorSignals.filter(
      err => err.botType?.toLowerCase().includes('premium')
    ).length;
    
    const propErrors = mockErrorSignals.filter(
      err => err.botType?.toLowerCase().includes('prop')
    ).length;
    
    setErrorCount({
      user: userErrors,
      premium: premiumErrors,
      prop: propErrors
    });

    // Calculate errors by severity
    const severityMap: Record<string, number> = {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0
    };

    // Process signals to categorize them by severity
    mockErrorSignals.forEach(signal => {
      if (signal.errorSeverity === 'critical') {
        severityMap.critical++;
      } else if (signal.errorSeverity === 'high') {
        severityMap.high++;
      } else if (signal.errorSeverity === 'medium') {
        severityMap.medium++;
      } else {
        severityMap.low++;
      }
    });

    setErrorsBySeverity(severityMap);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Bot Type Error Counts */}
      <div className="grid grid-cols-3 gap-4">
        <Card className={errorCount.user > 0 ? "border-red-400 dark:border-red-700" : ""}>
          <CardContent className="pt-6 px-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Bot Người Dùng
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  {errorCount.user} Lỗi
                </h3>
              </div>
              <div className={`p-2 rounded-full ${
                errorCount.user > 0 
                  ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" 
                  : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
              }`}>
                {errorCount.user > 0 
                  ? <AlertTriangle className="h-5 w-5" />
                  : <ArrowDown className="h-5 w-5" />
                }
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className={errorCount.premium > 0 ? "border-red-400 dark:border-red-700" : ""}>
          <CardContent className="pt-6 px-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Premium Bots
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  {errorCount.premium} Lỗi
                </h3>
              </div>
              <div className={`p-2 rounded-full ${
                errorCount.premium > 0 
                  ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" 
                  : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
              }`}>
                {errorCount.premium > 0 
                  ? <AlertTriangle className="h-5 w-5" />
                  : <ArrowDown className="h-5 w-5" />
                }
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className={errorCount.prop > 0 ? "border-red-400 dark:border-red-700" : ""}>
          <CardContent className="pt-6 px-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Prop Trading Bots
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  {errorCount.prop} Lỗi
                </h3>
              </div>
              <div className={`p-2 rounded-full ${
                errorCount.prop > 0 
                  ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" 
                  : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
              }`}>
                {errorCount.prop > 0 
                  ? <AlertTriangle className="h-5 w-5" />
                  : <ArrowDown className="h-5 w-5" />
                }
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Error Severity Distribution */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center mb-4">
            <PieChart className="h-5 w-5 mr-2 text-blue-500" />
            <h3 className="font-semibold">Lỗi Theo Mức Độ</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-red-600 dark:text-red-400">Nghiêm trọng</span>
              <div className="flex items-center">
                <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mr-2">
                  <div 
                    className="h-full bg-red-600" 
                    style={{ width: `${(errorsBySeverity.critical / mockErrorSignals.length) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">{errorsBySeverity.critical}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-orange-600 dark:text-orange-400">Cao</span>
              <div className="flex items-center">
                <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mr-2">
                  <div 
                    className="h-full bg-orange-600" 
                    style={{ width: `${(errorsBySeverity.high / mockErrorSignals.length) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">{errorsBySeverity.high}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-yellow-600 dark:text-yellow-400">Trung bình</span>
              <div className="flex items-center">
                <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mr-2">
                  <div 
                    className="h-full bg-yellow-600" 
                    style={{ width: `${(errorsBySeverity.medium / mockErrorSignals.length) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">{errorsBySeverity.medium}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-green-600 dark:text-green-400">Thấp</span>
              <div className="flex items-center">
                <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mr-2">
                  <div 
                    className="h-full bg-green-600" 
                    style={{ width: `${(errorsBySeverity.low / mockErrorSignals.length) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">{errorsBySeverity.low}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorBotStats;
