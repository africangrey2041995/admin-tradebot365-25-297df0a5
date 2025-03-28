
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Receipt, 
  RefreshCw,
  Search
} from 'lucide-react';

interface SubscriptionsHeaderProps {
  onSearch: (searchTerm: string) => void;
  onRefresh: () => void;
  isLoading: boolean;
}

export const SubscriptionsHeader: React.FC<SubscriptionsHeaderProps> = ({
  onSearch,
  onRefresh,
  isLoading
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center">
        <Receipt className="h-6 w-6 mr-2 text-primary" />
        <h1 className="text-2xl font-semibold text-white">Quản lý Đăng Ký Gói Dịch Vụ</h1>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Tìm kiếm đăng ký..."
            className="pl-8 bg-zinc-800 border-zinc-700 w-full sm:w-[250px]"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        
        <Button 
          variant="outline"
          className="border-zinc-700"
          onClick={onRefresh}
          disabled={isLoading}
        >
          <RefreshCw className={`mr-1 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Làm mới
        </Button>
      </div>
    </div>
  );
};
