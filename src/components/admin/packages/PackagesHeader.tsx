
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Package, 
  Plus,
  Search
} from 'lucide-react';

interface PackagesHeaderProps {
  onAddPackage: () => void;
  onSearch: (searchTerm: string) => void;
}

export const PackagesHeader: React.FC<PackagesHeaderProps> = ({
  onAddPackage,
  onSearch
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
        <Package className="h-6 w-6 mr-2 text-primary" />
        <h1 className="text-2xl font-semibold text-white">Quản lý gói dịch vụ</h1>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Tìm kiếm gói dịch vụ..."
            className="pl-8 bg-zinc-800 border-zinc-700 w-full sm:w-[250px]"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        
        <Button 
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
          onClick={onAddPackage}
        >
          <Plus className="mr-1 h-4 w-4" />
          Thêm gói mới
        </Button>
      </div>
    </div>
  );
};
