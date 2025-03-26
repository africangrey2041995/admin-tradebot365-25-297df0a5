
import React, { useState, useCallback, useEffect } from 'react';
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
import { useAdmin } from '@/hooks/use-admin';

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
  // Get admin status
  const { isAdmin } = useAdmin();
  
  // State for filters with default values
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
  const filteredData = React.useMemo(() => {
    console.log("Applying filters to hierarchical data:", filters);
    return filterAccountData(hierarchicalData, filters);
  }, [hierarchicalData, filters]);

  // Calculate total accounts (memoized)
  const counts: AccountsCount = React.useMemo(() => 
    getTotalCounts(hierarchicalData), 
  [hierarchicalData]);

  // Calculate pagination data
  const totalUsers = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalUsers / pageSize));
  
  // Reset to first page when filters change
  useEffect(() => {
    console.log("Filters changed, resetting to page 1");
    setCurrentPage(1);
  }, [filters]);

  // Apply pagination to the filtered data
  const paginatedData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const result = filteredData.slice(startIndex, endIndex);
    console.log(`Pagination: showing items ${startIndex}-${endIndex} of ${filteredData.length}`);
    return result;
  }, [filteredData, currentPage, pageSize]);

  // Handler for filter changes
  const handleFilterChange = useCallback((key: keyof AccountsFilterParams, value: string) => {
    console.log(`Filter changed: ${key} = ${value}`);
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  // Handler for page changes
  const handlePageChange = useCallback((page: number) => {
    console.log(`Page changed to: ${page}`);
    setCurrentPage(page);
  }, []);

  // Generate array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers: number[] = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      
      if (startPage > 2) {
        pageNumbers.push(-1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      if (endPage < totalPages - 1) {
        pageNumbers.push(-2);
      }
      
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  // Log filter and pagination state changes for debugging
  useEffect(() => {
    console.log("Current filter state:", filters);
    console.log(`Current pagination: Page ${currentPage} of ${totalPages}, showing ${paginatedData.length} items`);
  }, [filters, currentPage, totalPages, paginatedData.length]);

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
      
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
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
      
      {totalPages > 1 && (
        <div className="text-center text-sm text-gray-500">
          Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, totalUsers)} of {totalUsers} accounts
        </div>
      )}

      {isAdmin && (
        <div className="text-center text-sm text-green-500 mt-2">
          Admin view: Showing all accounts.
        </div>
      )}
    </div>
  );
};

export default HierarchicalAccountsTable;
