
import React, { useState, useEffect } from 'react';
import { ExtendedSignal } from '@/types/signal';
import { BotType } from '@/constants/botTypes';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  LifeBuoy, 
  RefreshCw, 
  Search, 
  Server, 
  Shield,
  SlidersHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import ErrorGroupList from './ErrorGroupList';
import { mockErrorSignals } from '@/components/bots/error-signals/mockData';
import ErrorCategoryList from './ErrorCategoryList';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import ErrorDetailsTooltip from './ErrorDetailsTooltip';
import ErrorDetailsModal from '@/components/admin/monitoring/ErrorDetailsModal';

interface AdminErrorDisplayProps {
  botType: BotType; 
  onViewDetails: (errorId: string) => void;
}

type SortOrder = 'newest' | 'oldest' | 'severity-high' | 'severity-low';
type ViewMode = 'table' | 'categories' | 'grouped';

const AdminErrorDisplay: React.FC<AdminErrorDisplayProps> = ({
  botType,
  onViewDetails
}) => {
  const [signals, setSignals] = useState<ExtendedSignal[]>([]);
  const [filteredSignals, setFilteredSignals] = useState<ExtendedSignal[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedErrorId, setSelectedErrorId] = useState<string | null>(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    
    // Simulate API call to fetch error signals
    setTimeout(() => {
      const filtered = mockErrorSignals.filter(
        signal => botType === BotType.ALL_BOTS || signal.botType?.toLowerCase().includes(botType.toLowerCase())
      );
      setSignals(filtered);
      setFilteredSignals(filtered);
      setLoading(false);
    }, 500);
  }, [botType]);

  useEffect(() => {
    let results = [...signals];
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(signal => 
        signal.errorMessage?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        signal.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        signal.instrument?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        signal.botId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        signal.botName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        signal.userId?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply severity filter
    if (severityFilter !== 'all') {
      results = results.filter(signal => signal.errorSeverity === severityFilter);
    }
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      results = results.filter(signal => {
        if (selectedCategory === 'authentication') {
          return signal.errorMessage?.toLowerCase().includes('auth') || 
                 signal.errorCode?.startsWith('AUTH');
        } else if (selectedCategory === 'trading') {
          return signal.errorMessage?.toLowerCase().includes('trade') || 
                 signal.errorCode?.startsWith('TRADE');
        } else if (selectedCategory === 'integration') {
          return signal.errorMessage?.toLowerCase().includes('connect') || 
                 signal.errorCode?.startsWith('CONN');
        } else if (selectedCategory === 'system') {
          return !signal.errorMessage?.toLowerCase().includes('auth') && 
                 !signal.errorMessage?.toLowerCase().includes('trade') && 
                 !signal.errorMessage?.toLowerCase().includes('connect');
        }
        return true;
      });
    }
    
    // Apply sorting
    results = sortSignals(results, sortOrder);
    
    setFilteredSignals(results);
  }, [signals, searchTerm, severityFilter, sortOrder, selectedCategory]);

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
    console.log("Admin marked signal as read:", signalId);
  };

  const handleViewErrorDetails = (errorId: string) => {
    setSelectedErrorId(errorId);
    setIsErrorModalOpen(true);
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
    setSelectedErrorId(null);
  };

  const handleResolveError = (errorId: string) => {
    console.log("Admin resolved error:", errorId);
    // Remove the error from the signals and filtered signals
    const updatedSignals = signals.filter(signal => signal.id !== errorId);
    setSignals(updatedSignals);
    setFilteredSignals(filteredSignals.filter(signal => signal.id !== errorId));
    setIsErrorModalOpen(false);
    setSelectedErrorId(null);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy HH:mm');
    } catch (error) {
      console.error(`Error formatting date: ${dateString}`, error);
      return dateString;
    }
  };

  const renderSeverityBadge = (severity?: string) => {
    const severityMap = {
      'critical': { bg: 'bg-red-200 dark:bg-red-900/50', text: 'text-red-800 dark:text-red-200', label: 'Critical' },
      'high': { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300', label: 'High' },
      'medium': { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-300', label: 'Medium' },
      'low': { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-300', label: 'Low' }
    };
    
    const config = severityMap[severity as keyof typeof severityMap] || severityMap.medium;
    
    return (
      <Badge className={`${config.bg} ${config.text} border-none`}>
        <AlertTriangle className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    );
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
    return (
      <div className="text-center py-12 border rounded-lg bg-muted/10">
        <CheckCircle2 className="h-12 w-12 mx-auto text-green-500 mb-4" />
        <h3 className="text-xl font-medium mb-2">Không tìm thấy lỗi nào</h3>
        <p className="text-muted-foreground mb-4">Không có lỗi nào trên bots loại này.</p>
        <Button variant="outline" onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Làm mới
        </Button>
      </div>
    );
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
          
          <div className="flex border rounded-md overflow-hidden">
            <Button 
              variant={viewMode === 'table' ? 'secondary' : 'ghost'} 
              size="sm"
              onClick={() => setViewMode('table')}
              className="rounded-none border-0"
            >
              <Server className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === 'categories' ? 'secondary' : 'ghost'} 
              size="sm"
              onClick={() => setViewMode('categories')}
              className="rounded-none border-0"
            >
              <Shield className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === 'grouped' ? 'secondary' : 'ghost'} 
              size="sm"
              onClick={() => setViewMode('grouped')}
              className="rounded-none border-0"
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
          
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {viewMode === 'categories' && (
        <div className="flex overflow-x-auto py-2 space-x-2">
          <Badge 
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setSelectedCategory('all')}
          >
            Tất cả
          </Badge>
          <Badge 
            variant={selectedCategory === 'authentication' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setSelectedCategory('authentication')}
          >
            <Shield className="h-3 w-3 mr-1" />
            Xác thực / Uỷ quyền
          </Badge>
          <Badge 
            variant={selectedCategory === 'trading' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setSelectedCategory('trading')}
          >
            <LifeBuoy className="h-3 w-3 mr-1" />
            Giao dịch
          </Badge>
          <Badge 
            variant={selectedCategory === 'integration' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setSelectedCategory('integration')}
          >
            <Server className="h-3 w-3 mr-1" />
            Tích hợp
          </Badge>
          <Badge 
            variant={selectedCategory === 'system' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setSelectedCategory('system')}
          >
            <AlertTriangle className="h-3 w-3 mr-1" />
            Hệ thống
          </Badge>
        </div>
      )}

      {viewMode === 'table' && (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-red-50 dark:bg-red-900/20">
              <TableRow>
                <TableHead className="text-red-700 dark:text-red-400 w-[120px]">Mã lỗi</TableHead>
                <TableHead className="text-red-700 dark:text-red-400 w-[100px]">Mức độ</TableHead>
                <TableHead className="text-red-700 dark:text-red-400">Mô tả lỗi</TableHead>
                <TableHead className="text-red-700 dark:text-red-400 w-[140px]">Thời gian</TableHead>
                <TableHead className="text-red-700 dark:text-red-400 w-[120px]">Bot ID</TableHead>
                <TableHead className="text-red-700 dark:text-red-400 w-[100px]">Loại bot</TableHead>
                <TableHead className="text-red-700 dark:text-red-400 w-[120px]">Người dùng</TableHead>
                <TableHead className="text-red-700 dark:text-red-400 w-[100px]">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSignals.map((signal) => (
                <TableRow key={signal.id} className="hover:bg-muted/30">
                  <TableCell className="font-mono text-xs">
                    {signal.id}
                  </TableCell>
                  <TableCell>
                    {renderSeverityBadge(signal.errorSeverity)}
                  </TableCell>
                  <TableCell>
                    <ErrorDetailsTooltip errorMessage={signal.errorMessage || 'Không có thông tin'}>
                      <span className="text-red-500 cursor-help">
                        {signal.errorMessage 
                          ? (signal.errorMessage.length > 50 
                            ? `${signal.errorMessage.substring(0, 50)}...` 
                            : signal.errorMessage)
                          : 'Không có thông tin lỗi'
                        }
                      </span>
                    </ErrorDetailsTooltip>
                  </TableCell>
                  <TableCell className="text-sm whitespace-nowrap">
                    {formatDate(signal.timestamp)}
                  </TableCell>
                  <TableCell 
                    className="cursor-pointer text-blue-500 hover:text-blue-700 hover:underline font-mono text-xs"
                    onClick={() => onViewDetails(signal.id)}
                  >
                    {signal.botId || 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn(
                      signal.botType?.includes('premium') ? 'text-amber-500 border-amber-500' :
                      signal.botType?.includes('prop') ? 'text-blue-500 border-blue-500' :
                      'text-green-500 border-green-500'
                    )}>
                      {signal.botType?.includes('premium') ? 'Premium' :
                      signal.botType?.includes('prop') ? 'Prop' : 'User'}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {signal.userId || 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => handleViewErrorDetails(signal.id)}
                      className="h-8 px-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      Chi tiết
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {viewMode === 'categories' && (
        <ErrorCategoryList 
          signals={filteredSignals} 
          onViewDetails={handleViewErrorDetails}
        />
      )}

      {viewMode === 'grouped' && (
        <ErrorGroupList 
          signals={filteredSignals} 
          onViewDetails={handleViewErrorDetails}
        />
      )}

      <div className="text-sm text-muted-foreground flex justify-between items-center">
        <div>
          Hiển thị {filteredSignals.length} trong tổng số {signals.length} lỗi
        </div>
        <div className="flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          Cập nhật lần cuối: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Error Details Modal */}
      <ErrorDetailsModal
        errorId={selectedErrorId}
        open={isErrorModalOpen}
        onClose={handleCloseErrorModal}
        onResolve={handleResolveError}
      />
    </div>
  );
};

export default AdminErrorDisplay;
