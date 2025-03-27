import { renderHook, act } from '@testing-library/react';
import { useSignalFilters } from '@/hooks/signals/useSignalFilters';

/**
 * Unit tests for the useSignalFilters hook
 */
export const runSignalFiltersTests = () => {
  describe('useSignalFilters Hook', () => {
    it('returns initial filter values', () => {
      const { result } = renderHook(() => useSignalFilters());
      
      expect(result.current.filters).toEqual({
        search: '',
        signalSource: 'all',
        status: 'all',
        dateRange: {
          from: undefined,
          to: undefined
        },
        userId: ''
      });
    });
    
    it('accepts and merges initial values', () => {
      const initialFilters = {
        search: 'test query',
        status: 'processed' as const
      };
      
      const { result } = renderHook(() => useSignalFilters(initialFilters));
      
      expect(result.current.filters).toEqual({
        search: 'test query',
        signalSource: 'all',
        status: 'processed',
        dateRange: {
          from: undefined,
          to: undefined
        },
        userId: ''
      });
    });
    
    it('updates a single filter when updateFilter is called', () => {
      const { result } = renderHook(() => useSignalFilters());
      
      act(() => {
        result.current.updateFilter('search', 'new search');
      });
      
      expect(result.current.filters.search).toBe('new search');
      
      // Other filters remain unchanged
      expect(result.current.filters.signalSource).toBe('all');
    });
    
    it('updates multiple filters with setFilters', () => {
      const { result } = renderHook(() => useSignalFilters());
      
      act(() => {
        result.current.setFilters({
          ...result.current.filters,
          search: 'updated search',
          status: 'failed'
        });
      });
      
      expect(result.current.filters).toEqual({
        search: 'updated search',
        signalSource: 'all',
        status: 'failed',
        dateRange: {
          from: undefined,
          to: undefined
        },
        userId: ''
      });
    });
    
    it('resets all filters to defaults when resetFilters is called', () => {
      const initialFilters = {
        search: 'test query',
        status: 'processed' as const,
        userId: 'user-123'
      };
      
      const { result } = renderHook(() => useSignalFilters(initialFilters));
      
      act(() => {
        result.current.resetFilters();
      });
      
      expect(result.current.filters).toEqual({
        search: '',
        signalSource: 'all',
        status: 'all',
        dateRange: {
          from: undefined,
          to: undefined
        },
        userId: ''
      });
    });
  });
};
