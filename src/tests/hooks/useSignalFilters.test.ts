import { renderHook, act } from '@testing-library/react-hooks';
import { useSignalFilters } from '@/components/signals/hooks/useSignalFilters';

describe('useSignalFilters Hook', () => {
  // Test initial state
  test('initializes with default filters', () => {
    const { result } = renderHook(() => useSignalFilters());
    
    expect(result.current.filters).toEqual({
      dateRange: [null, null],
      status: [],
      actions: [],
      instruments: [],
      search: '',
      sortBy: 'timestamp',
      sortOrder: 'desc',
      signalSource: 'all'
    });
  });

  // Test filter updates
  test('updates filters correctly', () => {
    const { result } = renderHook(() => useSignalFilters());
    
    act(() => {
      result.current.updateFilters({
        search: 'test query',
        status: ['success'],
        signalSource: 'tradingview'
      });
    });
    
    expect(result.current.filters.search).toBe('test query');
    expect(result.current.filters.status).toEqual(['success']);
    expect(result.current.filters.signalSource).toBe('tradingview');
    
    // Other properties should remain unchanged
    expect(result.current.filters.actions).toEqual([]);
    expect(result.current.filters.sortBy).toBe('timestamp');
  });

  // Test multiple sequential updates
  test('handles multiple sequential updates correctly', () => {
    const { result } = renderHook(() => useSignalFilters());
    
    act(() => {
      result.current.updateFilters({ search: 'query 1' });
    });
    
    act(() => {
      result.current.updateFilters({ status: ['success'] });
    });
    
    act(() => {
      result.current.updateFilters({ sortBy: 'action' });
    });
    
    expect(result.current.filters).toEqual({
      dateRange: [null, null],
      status: ['success'],
      actions: [],
      instruments: [],
      search: 'query 1',
      sortBy: 'action',
      sortOrder: 'desc',
      signalSource: 'all'
    });
  });

  // Test reset functionality
  test('resets filters to default values', () => {
    const { result } = renderHook(() => useSignalFilters());
    
    act(() => {
      result.current.updateFilters({
        search: 'test query',
        status: ['success'],
        actions: ['buy'],
        sortOrder: 'asc'
      });
    });
    
    // Verify filters were updated
    expect(result.current.filters.search).toBe('test query');
    
    // Reset filters
    act(() => {
      result.current.resetFilters();
    });
    
    // Verify filters were reset
    expect(result.current.filters).toEqual({
      dateRange: [null, null],
      status: [],
      actions: [],
      instruments: [],
      search: '',
      sortBy: 'timestamp',
      sortOrder: 'desc',
      signalSource: 'all'
    });
  });

  // Test date range filter specifically
  test('handles date range updates correctly', () => {
    const { result } = renderHook(() => useSignalFilters());
    
    const startDate = new Date('2023-01-01');
    const endDate = new Date('2023-01-31');
    
    act(() => {
      result.current.updateFilters({
        dateRange: [startDate, endDate]
      });
    });
    
    expect(result.current.filters.dateRange).toEqual([startDate, endDate]);
  });
});
