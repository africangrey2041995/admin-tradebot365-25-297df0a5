
import React from 'react';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Filter } from 'lucide-react';

interface IntegratedBotsSearchProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  riskFilter: string;
  onRiskFilterChange: (value: string) => void;
}

const IntegratedBotsSearch: React.FC<IntegratedBotsSearchProps> = ({
  searchTerm,
  onSearchChange,
  riskFilter,
  onRiskFilterChange
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2">
        <Input
          placeholder="Tìm kiếm bot đã tích hợp..."
          value={searchTerm}
          onChange={onSearchChange}
          className="w-full"
        />
      </div>
      <Select value={riskFilter} onValueChange={onRiskFilterChange}>
        <SelectTrigger>
          <Filter className="h-4 w-4 mr-2" />
          <SelectValue placeholder="Mức độ rủi ro" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả</SelectItem>
          <SelectItem value="low">Thấp</SelectItem>
          <SelectItem value="medium">Trung bình</SelectItem>
          <SelectItem value="high">Cao</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default IntegratedBotsSearch;
