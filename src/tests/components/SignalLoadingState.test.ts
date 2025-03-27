
import { render, screen } from '@testing-library/react';
import SignalLoadingState from '@/components/signals/core/components/SignalLoadingState';

/**
 * Unit tests for the SignalLoadingState component
 */
export const runSignalLoadingStateTests = () => {
  describe('SignalLoadingState Component', () => {
    it('renders with default message', () => {
      render(<SignalLoadingState />);
      expect(screen.getByText('Loading signals...')).toBeInTheDocument();
    });
    
    it('renders with custom message', () => {
      const customMessage = 'Custom loading message';
      render(<SignalLoadingState message={customMessage} />);
      expect(screen.getByText(customMessage)).toBeInTheDocument();
    });
    
    it('renders progress bar when showProgress is true', () => {
      const { container } = render(<SignalLoadingState showProgress />);
      expect(container.querySelector('[role="progressbar"]')).toBeInTheDocument();
    });
    
    it('renders progress with value when isDeterminate is true', () => {
      const progressValue = 75;
      const { container } = render(
        <SignalLoadingState 
          showProgress 
          progressValue={progressValue} 
          isDeterminate 
        />
      );
      
      const progressElement = container.querySelector('[role="progressbar"]');
      expect(progressElement).toHaveAttribute('aria-valuenow', progressValue.toString());
    });
    
    it('renders in simple mode when isSimple is true', () => {
      const { container } = render(<SignalLoadingState isSimple />);
      
      // Should not contain the heading element
      expect(container.querySelector('h3')).not.toBeInTheDocument();
      
      // Should contain a simpler loading indicator
      expect(screen.getByRole('status')).toHaveClass('flex items-center justify-center p-4');
    });
    
    it('renders different icon based on botType', () => {
      const { rerender, container } = render(<SignalLoadingState botType="user" />);
      expect(container.querySelector('.text-blue-500')).toBeInTheDocument();
      
      rerender(<SignalLoadingState botType="premium" />);
      expect(container.querySelector('.text-purple-500')).toBeInTheDocument();
      
      rerender(<SignalLoadingState botType="prop" />);
      expect(container.querySelector('.text-green-500')).toBeInTheDocument();
      
      rerender(<SignalLoadingState botType="default" />);
      expect(container.querySelector('.text-gray-500')).toBeInTheDocument();
    });
  });
};
