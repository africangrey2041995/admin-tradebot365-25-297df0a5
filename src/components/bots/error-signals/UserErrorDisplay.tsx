import React, { useState, useEffect } from 'react';
import { ExtendedSignal } from '@/types/signal';
import { BotType } from '@/constants/botTypes';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, RefreshCw, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockErrorSignals } from '@/components/bots/error-signals/mockData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import ErrorSignalRow from './ErrorSignalRow';
import NoErrorsState from './NoErrorsState';

interface UserErrorDisplayProps {
  botType: BotType;
  userId: string;
  onViewDetails: (errorId: string) => void;
  specificBotId?: string;
}

type SortOrder = 'newest' | 'oldest' | 'severity-high' | 'severity-low';

export const UserErrorDisplay: React.FC<UserErrorDisplayProps> = ({
  botType,
  userId,
  onViewDetails,
  specificBotId
}) => {
  const [signals, setSignals] = useState<ExtendedSignal[]>([]);
  const [filteredSignals, setFilteredSignals] = useState<ExtendedSignal[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const [unreadSignals, setUnreadSignals] = useState<Set<string>>(new Set());

  useEffect(() => {
    setLoading(true);
    
    setTimeout(() => {
      const filtered = mockErrorSignals.filter(signal => {
        const matchesBotType = signal.botType?.toLowerCase().includes(botType.toLowerCase()) || botType === BotType.ALL_BOTS;
        const matchesBotId = !specificBotId || signal.botId === specificBotId;
        
        let userHasAccess = false;
        
        if (signal.botType === BotType.USER_BOT) {
          userHasAccess = signal.userId === userId;
        } else if (signal.botType === BotType.PREMIUM_BOT || signal.botType === BotType.PROP_BOT) {
          const connectedUsers = signal.connectedUserIds || [];
          userHasAccess = connectedUsers.includes(userId) || false;
        }
        
        console.log(`Filtering signal ${signal.id} - Bot Type: ${signal.botType}, User Access: ${userHasAccess}, Matches Bot Type: ${matchesBotType}, Matches Bot ID: ${matchesBotId}`);
        
        return matchesBotType && matchesBotId && userHasAccess;
      });
      
      console.log(`Filtered ${filtered.length} signals for user ${userId} and bot type ${botType}`);
      
      setSignals(filtered);
      setFilteredSignals(filtered);
      
      const newUnreadSet = new Set<string>();
      filtered.slice(0, 3).forEach(signal => {
        newUnreadSet.add(signal.id);
      });
      setUnreadSignals(newUnreadSet);
      
      setLoading(false);
    }, 500);
  }, [botType, userId, specificBotId]);

  useEffect(() => {
    let results = [...signals];
    
    if (searchTerm) {
      results = results.filter(signal => 
        signal.errorMessage?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        signal.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        signal.instrument?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        signal.botId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        signal.botName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (severityFilter !== 'all') {
      results = results.filter(signal => signal.errorSeverity === severityFilter);
    }
    
    results = sortSignals(results, sortOrder);
    
    setFilteredSignals(results);
  }, [signals, searchTerm, severityFilter, sortOrder]);

  const sortSignals = (signalList: ExtendedSignal[], order: SortOrder): ExtendedSignal[] => {
    return [...signalList].sort((a, b) => {
      switch (order) {
        case 'newest':
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        case 'oldest':
          return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        case 'severity-high':
          const severityOrder = { 'critical': 4, 'high': 3, 'medium': 2, 'low': 1, undefined: 0 };
          return (severityOrder[b.errorSeverity as keyof typeof severityOrder] || 0) - 
                 (severityOrder[a.errorSeverity as keyof typeof severityOrder] || 0);
        case 'severity-low':
          const severityOrderReverse = { 'critical': 1, 'high': 2, 'medium': 3, 'low': 4, undefined: 5 };
          return (severityOrderReverse[a.errorSeverity as keyof typeof severityOrderReverse] || 0) - 
                 (severityOrderReverse[b.errorSeverity as keyof typeof severityOrderReverse] || 0);
        default:
          return 0;
      }
    });
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const handleMarkAsRead = (signalId: string) => {
    setUnreadSignals(prev => {
      const newSet = new Set(prev);
      newSet.delete(signalId);
      return newSet;
    });
  };

  const handleMarkAllAsRead = () => {
    setUnreadSignals(new Set());
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
        <span className="ml-2 text-muted-foreground">Đang tải dữ liệu...</span>
      </div>
    );
  }

  if (filteredSignals.length === 0) {
    return <NoErrorsState />;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
        <div className="flex flex-1 gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm lỗi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={severityFilter} onValueChange={(value) => setSeverityFilter(value)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Mức độ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả mức độ</SelectItem>
              <SelectItem value="critical">Nghiêm trọng</SelectItem>
              <SelectItem value="high">Cao</SelectItem>
              <SelectItem value="medium">Trung bình</SelectItem>
              <SelectItem value="low">Thấp</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2">
          <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as SortOrder)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Sắp xếp theo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Mới nhất</SelectItem>
              <SelectItem value="oldest">Cũ nhất</SelectItem>
              <SelectItem value="severity-high">Mức độ (Cao→Thấp)</SelectItem>
              <SelectItem value="severity-low">Mức độ (Thấp→Cao)</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-red-50 dark:bg-red-900/20">
            <TableHead className="text-red-700 dark:text-red-400">ID</TableHead>
            <TableHead className="text-red-700 dark:text-red-400">Mức độ</TableHead>
            <TableHead className="text-red-700 dark:text-red-400">Mô tả lỗi</TableHead>
            <TableHead className="text-red-700 dark:text-red-400">Thời gian</TableHead>
            <TableHead className="text-red-700 dark:text-red-400">Bot</TableHead>
            <TableHead className="text-red-700 dark:text-red-400">Loại Bot</TableHead>
            <TableHead className="text-red-700 dark:text-red-400">Người dùng</TableHead>
            <TableHead className="text-red-700 dark:text-red-400">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSignals.map((signal) => (
            <ErrorSignalRow 
              key={signal.id} 
              signal={signal}
              onMarkAsRead={handleMarkAsRead}
              isUnread={unreadSignals.has(signal.id)}
              onViewDetails={onViewDetails}
            />
          ))}
        </TableBody>
      </Table>

      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md dark:bg-red-900/20 dark:border-red-800/30">
        <p className="text-sm text-red-700 dark:text-red-400 flex items-center">
          <AlertTriangle className="h-4 w-4 mr-2" />
          <strong>Lưu ý:</strong> Các lỗi này cần được xử lý ngay để đảm bảo hệ thống của bạn hoạt động ổn định.
        </p>
        <div className="mt-2 flex justify-end gap-2">
          {unreadSignals.size > 0 && (
            <Button variant="outline" size="sm" onClick={handleMarkAllAsRead} className="text-xs">
              Đánh dấu tất cả đã đọc
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={handleRefresh} className="text-xs">
            <RefreshCw className="h-3 w-3 mr-1" />
            Làm mới dữ liệu
          </Button>
        </div>
      </div>
    </div>
  );
};
