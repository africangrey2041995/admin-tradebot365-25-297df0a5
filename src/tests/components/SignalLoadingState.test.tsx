
import React from 'react';
import { render, screen } from '@testing-library/react';
import { SignalLoadingState } from '@/components/signals/core/components/SignalLoadingState';

// Export the test suite function for running through the test runner
export function runSignalLoadingStateTests() {
  describe('SignalLoadingState Component', () => {
    // Test basic rendering
    test('renders with default props', () => {
      render(<SignalLoadingState />);
      expect(screen.getByText('Loading signals...')).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /loading/i })).toBeInTheDocument();
    });

    // Test custom message
    test('renders with custom message', () => {
      const customMessage = 'Custom loading message';
      render(<SignalLoadingState message={customMessage} />);
      expect(screen.getByText(customMessage)).toBeInTheDocument();
    });

    // Test progress indicator
    test('renders progress bar when showProgress is true', () => {
      const { container } = render(<SignalLoadingState showProgress={true} />);
      expect(container.querySelector('.bg-gray-200')).toBeInTheDocument();
      expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
    });

    // Test bot type styling
    test('applies premium bot styling correctly', () => {
      const { container } = render(<SignalLoadingState botType="premium" />);
      const loader = container.querySelector('.animate-spin');
      expect(loader).toHaveClass('text-amber-600');
    });

    test('applies prop bot styling correctly', () => {
      const { container } = render(<SignalLoadingState botType="prop" />);
      const loader = container.querySelector('.animate-spin');
      expect(loader).toHaveClass('text-emerald-600');
    });

    test('applies user bot styling correctly', () => {
      const { container } = render(<SignalLoadingState botType="user" />);
      const loader = container.querySelector('.animate-spin');
      expect(loader).toHaveClass('text-primary');
    });

    // Test simple mode
    test('renders in simple mode with reduced height', () => {
      const { container } = render(<SignalLoadingState isSimple={true} />);
      const loadingContainer = container.firstChild;
      expect(loadingContainer).toHaveClass('min-h-[100px]');
      expect(loadingContainer).not.toHaveClass('min-h-[200px]');
    });

    // Test custom className
    test('applies custom className correctly', () => {
      const customClass = 'my-custom-class';
      const { container } = render(<SignalLoadingState className={customClass} />);
      expect(container.firstChild).toHaveClass(customClass);
    });
  });
}

export default runSignalLoadingStateTests;
