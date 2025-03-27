
import { renderHook, act } from '@testing-library/react-hooks';
import { useSignalFilters } from '@/components/signals/hooks/useSignalFilters';

/**
 * Unit tests for the useSignalFilters hook
 */
export const runSignalFiltersTests = () => {
  describe('useSignalFilters Hook', () => {
    it('initializes with default filters', () => {
      const { result } = renderHook(() => useSignalFilters());
      
      expect(result.current.filters).toEqual({
        dateRange: {
          from: undefined,
          to: undefined
        },
        status: 'all',
        search: '',
        sortBy: 'timestamp',
        sortOrder: 'desc',
        signalSource: 'all',
        userId: ''
      });
    });
    
    it('updates a single filter', () => {
      const { result } = renderHook(() => useSignalFilters());
      
      act(() => {
        result.current.updateFilter('status', 'success');
      });
      
      expect(result.current.filters.status).toBe('success');
    });
    
    it('resets filters to default values', () => {
      const { result } = renderHook(() => useSignalFilters());
      
      // First update some filters
      act(() => {
        result.current.updateFilter('status', 'failed');
        result.current.updateFilter('search', 'test query');
      });
      
      // Then reset
      act(() => {
        result.current.resetFilters();
      });
      
      // Check that values are reset
      expect(result.current.filters).toEqual({
        dateRange: {
          from: undefined,
          to: undefined
        },
        status: 'all',
        search: '',
        sortBy: 'timestamp',
        sortOrder: 'desc',
        signalSource: 'all',
        userId: ''
      });
    });
    
    it('initializes with custom filter values', () => {
      const initialFilters = {
        status: 'pending',
        search: 'initial query'
      };
      
      const { result } = renderHook(() => useSignalFilters(initialFilters));
      
      expect(result.current.filters.status).toBe('pending');
      expect(result.current.filters.search).toBe('initial query');
    });
    
    it('updates date range filter', () => {
      const { result } = renderHook(() => useSignalFilters());
      
      const fromDate = new Date('2023-01-01');
      const toDate = new Date('2023-01-31');
      
      act(() => {
        result.current.updateFilter('dateRange', {
          from: fromDate,
          to: toDate
        });
      });
      
      expect(result.current.filters.dateRange).toEqual({
        from: fromDate,
        to: toDate
      });
    });
  });
};
