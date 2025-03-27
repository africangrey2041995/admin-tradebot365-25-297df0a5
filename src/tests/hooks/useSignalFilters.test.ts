import { renderHook, act } from '@testing-library/react-hooks';
import { useSignalFilters } from '@/hooks/signals/useSignalFilters';

// Export the test suite function for running through the test runner
export function runSignalFiltersTests() {
  describe('useSignalFilters Hook', () => {
    // Test initial state
    test('initializes with default filters', () => {
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

    // Test filter updates
    test('updates filters correctly', () => {
      const { result } = renderHook(() => useSignalFilters());
      
      act(() => {
        result.current.updateFilter('search', 'test query');
        result.current.updateFilter('status', 'success');
        result.current.updateFilter('signalSource', 'tradingview');
      });
      
      expect(result.current.filters.search).toBe('test query');
      expect(result.current.filters.status).toBe('success');
      expect(result.current.filters.signalSource).toBe('tradingview');
      
      // Other properties should remain unchanged
      expect(result.current.filters.dateRange.from).toBeUndefined();
      expect(result.current.filters.userId).toBe('');
    });

    // Test multiple sequential updates
    test('handles multiple sequential updates correctly', () => {
      const { result } = renderHook(() => useSignalFilters());
      
      act(() => {
        result.current.updateFilter('search', 'query 1');
      });
      
      act(() => {
        result.current.updateFilter('status', 'failed');
      });
      
      act(() => {
        result.current.updateFilter('userId', 'user-123');
      });
      
      expect(result.current.filters).toEqual({
        search: 'query 1',
        signalSource: 'all',
        status: 'failed',
        dateRange: {
          from: undefined,
          to: undefined
        },
        userId: 'user-123'
      });
    });

    // Test reset functionality
    test('resets filters to default values', () => {
      const { result } = renderHook(() => useSignalFilters());
      
      act(() => {
        result.current.updateFilter('search', 'test query');
        result.current.updateFilter('status', 'success');
        result.current.updateFilter('userId', 'user-123');
      });
      
      // Verify filters were updated
      expect(result.current.filters.search).toBe('test query');
      
      // Reset filters
      act(() => {
        result.current.resetFilters();
      });
      
      // Verify filters were reset
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

    // Test date range filter specifically
    test('handles date range updates correctly', () => {
      const { result } = renderHook(() => useSignalFilters());
      
      const startDate = new Date('2023-01-01');
      const endDate = new Date('2023-01-31');
      
      act(() => {
        result.current.updateFilter('dateRange', {
          from: startDate,
          to: endDate
        });
      });
      
      expect(result.current.filters.dateRange).toEqual({
        from: startDate,
        to: endDate
      });
    });
  });
}

export default runSignalFiltersTests;
