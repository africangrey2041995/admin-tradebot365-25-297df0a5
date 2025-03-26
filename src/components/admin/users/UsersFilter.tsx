
import React from 'react';
import { SearchInput } from './filters/SearchInput';
import { StatusFilterButtons } from './filters/StatusFilterButtons';
import { PlanFilterSelect } from './filters/PlanFilterSelect';

type UsersFilterProps = {
  searchTerm: string;
  filterStatus: string | null;
  planFilter: string | null;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterClick: (status: string | null) => void;
  onPlanFilterChange: (value: string | null) => void;
  searchPlaceholder?: string;
  statusOptions?: {
    value: string | null;
    label: string;
  }[];
  planOptions?: {
    value: string;
    label: string;
  }[];
  planPlaceholder?: string;
};

export const UsersFilter = ({
  searchTerm,
  filterStatus,
  planFilter,
  onSearchChange,
  onFilterClick,
  onPlanFilterChange,
  searchPlaceholder = "Tìm kiếm người dùng...",
  statusOptions,
  planOptions,
  planPlaceholder
}: UsersFilterProps) => {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <SearchInput 
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          placeholder={searchPlaceholder}
        />
        
        <StatusFilterButtons 
          filterStatus={filterStatus}
          onFilterClick={onFilterClick}
          options={statusOptions}
        />
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <PlanFilterSelect 
          planFilter={planFilter}
          onPlanFilterChange={onPlanFilterChange}
          options={planOptions}
          placeholder={planPlaceholder}
        />
      </div>
    </div>
  );
};
