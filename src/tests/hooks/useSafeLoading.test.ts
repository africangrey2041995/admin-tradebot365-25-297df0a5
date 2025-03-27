
import { renderHook, act } from '@testing-library/react-hooks';
import { useSafeLoading } from '@/hooks/signals/useSafeLoading';

// Mock timers for testing timeouts and delays
jest.useFakeTimers();

// Export the test suite function for running through the test runner
export function runSafeLoadingTests() {
  describe('useSafeLoading Hook', () => {
    // Test initial state
    test('initializes with loading set to false', () => {
      const { result } = renderHook(() => useSafeLoading());
      expect(result.current.loading).toBe(false);
    });

    // Test basic loading state management
    test('sets loading state to true and false correctly', () => {
      const { result } = renderHook(() => useSafeLoading());
      
      act(() => {
        result.current.startLoading();
      });
      
      expect(result.current.loading).toBe(true);
      
      act(() => {
        result.current.stopLoading();
      });
      
      expect(result.current.loading).toBe(false);
    });

    // Test timeout prevention
    test('prevents infinite loading with automatic timeout', () => {
      const timeoutMs = 1000;
      const { result } = renderHook(() => useSafeLoading({ timeoutMs }));
      
      act(() => {
        result.current.startLoading();
      });
      
      expect(result.current.loading).toBe(true);
      
      // Fast-forward past the timeout
      act(() => {
        jest.advanceTimersByTime(timeoutMs + 100);
      });
      
      // Loading should be automatically set to false
      expect(result.current.loading).toBe(false);
    });

    // Test minimum loading duration
    test('maintains minimum loading duration', () => {
      const minLoadingDurationMs = 500;
      const { result } = renderHook(() => useSafeLoading({ minLoadingDurationMs }));
      
      act(() => {
        result.current.startLoading();
      });
      
      expect(result.current.loading).toBe(true);
      
      // Try to stop loading immediately
      act(() => {
        result.current.stopLoading();
      });
      
      // Loading should still be true due to minimum duration
      expect(result.current.loading).toBe(true);
      
      // Fast-forward past the minimum duration
      act(() => {
        jest.advanceTimersByTime(minLoadingDurationMs + 100);
      });
      
      // Loading should now be false
      expect(result.current.loading).toBe(false);
    });

    // Test skipLoadingState option
    test('honors skipLoadingState option', () => {
      const { result } = renderHook(() => useSafeLoading({ skipLoadingState: true }));
      
      act(() => {
        result.current.startLoading();
      });
      
      // Loading should remain false since we're skipping loading state
      expect(result.current.loading).toBe(false);
      
      act(() => {
        result.current.stopLoading();
      });
      
      expect(result.current.loading).toBe(false);
    });

    // Test cleanup on unmount
    test('cleans up timeouts on unmount', () => {
      const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
      
      const { unmount } = renderHook(() => useSafeLoading());
      
      unmount();
      
      expect(clearTimeoutSpy).toHaveBeenCalled();
      
      clearTimeoutSpy.mockRestore();
    });

    // Test multiple start/stop calls in quick succession
    test('handles multiple calls gracefully', () => {
      const { result } = renderHook(() => useSafeLoading());
      
      // Start/stop multiple times in quick succession
      act(() => {
        result.current.startLoading();
        result.current.startLoading();
        result.current.stopLoading();
        result.current.startLoading();
      });
      
      // Should respect the last call and be in loading state
      expect(result.current.loading).toBe(true);
    });
  });
}

export default runSafeLoadingTests;
