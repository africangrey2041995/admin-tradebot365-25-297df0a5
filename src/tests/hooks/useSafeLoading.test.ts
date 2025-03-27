
import { renderHook, act } from '@testing-library/react-hooks';
import { useSafeLoading } from '@/hooks/useSafeLoading';

// Mock timer functions
jest.useFakeTimers();

/**
 * Unit tests for the useSafeLoading hook
 */
export const runSafeLoadingTests = () => {
  describe('useSafeLoading Hook', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    
    it('initializes with isLoading=false', () => {
      const { result } = renderHook(() => useSafeLoading());
      
      expect(result.current.isLoading).toBe(false);
    });
    
    it('startLoading sets isLoading to true', () => {
      const { result } = renderHook(() => useSafeLoading());
      
      act(() => {
        result.current.startLoading();
      });
      
      expect(result.current.isLoading).toBe(true);
    });
    
    it('endLoading sets isLoading to false', () => {
      const { result } = renderHook(() => useSafeLoading());
      
      // Start loading first
      act(() => {
        result.current.startLoading();
      });
      
      expect(result.current.isLoading).toBe(true);
      
      // Then end loading
      act(() => {
        result.current.endLoading();
      });
      
      expect(result.current.isLoading).toBe(false);
    });
    
    it('enforces minimum loading time', () => {
      const minLoadingTime = 500; // 500ms
      
      const { result } = renderHook(() => 
        useSafeLoading({ minLoadingTime })
      );
      
      // Start loading
      act(() => {
        result.current.startLoading();
      });
      
      expect(result.current.isLoading).toBe(true);
      
      // Try to end loading immediately
      act(() => {
        result.current.endLoading();
      });
      
      // Should still be loading due to minimum time enforcement
      expect(result.current.isLoading).toBe(true);
      
      // Advance time past minimum loading time
      act(() => {
        jest.advanceTimersByTime(minLoadingTime + 10);
      });
      
      // Now should no longer be loading
      expect(result.current.isLoading).toBe(false);
    });
    
    it('enforces maximum loading time with safety timeout', () => {
      const safetyTimeoutMs = 1000; // 1000ms
      
      const { result } = renderHook(() => 
        useSafeLoading({ safetyTimeoutMs })
      );
      
      // Start loading
      act(() => {
        result.current.startLoading();
      });
      
      expect(result.current.isLoading).toBe(true);
      
      // Advance time past safety timeout
      act(() => {
        jest.advanceTimersByTime(safetyTimeoutMs + 10);
      });
      
      // Should no longer be loading due to safety timeout
      expect(result.current.isLoading).toBe(false);
    });
    
    it('resets safety timeout when loading is explicitly ended', () => {
      const safetyTimeoutMs = 1000; // 1000ms
      
      const { result } = renderHook(() => 
        useSafeLoading({ safetyTimeoutMs })
      );
      
      const mockConsoleWarn = jest.spyOn(console, 'warn').mockImplementation();
      
      // Start loading
      act(() => {
        result.current.startLoading();
      });
      
      // End loading properly
      act(() => {
        result.current.endLoading();
      });
      
      // Advance time past safety timeout
      act(() => {
        jest.advanceTimersByTime(safetyTimeoutMs + 10);
      });
      
      // Safety timeout warning should not have been called
      expect(mockConsoleWarn).not.toHaveBeenCalled();
      
      // Cleanup
      mockConsoleWarn.mockRestore();
    });
  });
};
