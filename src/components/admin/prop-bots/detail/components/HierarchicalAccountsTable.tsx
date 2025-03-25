
import React, { useState, useCallback } from 'react';
import { Accordion } from '@/components/ui/accordion';
import { Account } from '@/types';
import { toast } from 'sonner';
import { UserAccount, AccountsFilterParams, AccountsCount } from '../types/account-types';
import { 
  organizeAccountsHierarchically, 
  filterAccountData, 
  getTotalCounts 
} from '../utils/account-utils';
import UserAccountItem from './accounts/UserAccountItem';
import AccountsFilter from './accounts/AccountsFilter';
import AccountsStatsDisplay from './accounts/AccountsStatsDisplay';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

interface HierarchicalAccountsTableProps {
  accounts: Account[];
  onRefresh: () => void;
  onEdit?: (account: Account) => void;
  onDelete?: (accountId: string) => void;
  onToggleConnection?: (accountId: string) => void;
}

const HierarchicalAccountsTable: React.FC<HierarchicalAccountsTableProps> = ({ 
  accounts,
  onRefresh,
  onEdit = () => toast.info("Edit functionality will be implemented"),
  onDelete = (id) => toast.info(`Delete account ${id} functionality will be implemented`),
  onToggleConnection = (id) => toast.info(`Toggle connection for ${id} functionality will be implemented`)
}) => {
  // State for filters
  const [filters, setFilters] = useState<AccountsFilterParams>({
    searchQuery: '',
    filterStatus: 'all',
    filterLiveDemo: 'all'
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Number of user accounts per page

  // Transform flat account list into hierarchical structure (memoized)
  const hierarchicalData = React.useMemo(() => 
    organizeAccountsHierarchically(accounts), 
  [accounts]);

  // Apply filtering (memoized)
  const filteredData = React.useMemo(() => 
    filterAccountData(hierarchicalData, filters), 
  [hierarchicalData, filters]);

  // Calculate total accounts (memoized)
  const counts: AccountsCount = React.useMemo(() => 
    getTotalCounts(hierarchicalData), 
  [hierarchicalData]);

  // Calculate pagination data
  const totalUsers = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalUsers / pageSize));
  
  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Apply pagination to the filtered data
  const paginatedData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, pageSize]);

  // Handler for filter changes
  const handleFilterChange = useCallback((key: keyof AccountsFilterParams, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  // Handler for page changes
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  // Generate array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers: number[] = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // If there are not many pages, show all
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);
      
      // Calculate the middle range
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pageNumbers.push(-1); // -1 represents ellipsis
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push(-2); // -2 represents ellipsis
      }
      
      // Always include last page
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <AccountsFilter 
          filters={filters}
          onFilterChange={handleFilterChange}
        />
        
        <AccountsStatsDisplay 
          counts={counts}
          onRefresh={onRefresh}
        />
      </div>
      
      <div className="border rounded-md">
        <Accordion type="multiple" className="w-full">
          {paginatedData.map((user) => (
            <UserAccountItem
              key={`user-${user.userId}`}
              user={user}
              accounts={accounts}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleConnection={onToggleConnection}
            />
          ))}
        </Accordion>
        
        {filteredData.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No accounts found with the current filters.
          </div>
        )}
      </div>
      
      {/* Pagination controls - only show if there's more than one page */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <Pagination>
            <PaginationContent>
              {/* Previous page button */}
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {/* Page numbers */}
              {getPageNumbers().map((pageNum, index) => (
                <PaginationItem key={`page-${pageNum}-${index}`}>
                  {pageNum < 0 ? (
                    <span className="px-4 py-2">...</span>
                  ) : (
                    <PaginationLink
                      isActive={pageNum === currentPage}
                      onClick={() => handlePageChange(pageNum)}
                      className="cursor-pointer"
                    >
                      {pageNum}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}
              
              {/* Next page button */}
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
      
      {/* Display pagination info */}
      {totalPages > 1 && (
        <div className="text-center text-sm text-gray-500">
          Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, totalUsers)} of {totalUsers} accounts
        </div>
      )}
    </div>
  );
};

export default HierarchicalAccountsTable;
