
import { render, screen } from '@testing-library/react';
import StatusBadge from '@/components/signals/core/badges/StatusBadge';

/**
 * Unit tests for the StatusBadge component
 */
export const runStatusBadgeTests = () => {
  describe('StatusBadge Component', () => {
    it('renders with the correct status text', () => {
      render(<StatusBadge status="Processed" />);
      expect(screen.getByText('Processed')).toBeInTheDocument();
    });
    
    it('renders with icon', () => {
      const { container } = render(<StatusBadge status="Processed" showIcon />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
    
    it('renders without icon when showIcon is false', () => {
      const { container } = render(<StatusBadge status="Processed" showIcon={false} />);
      expect(container.querySelector('svg')).not.toBeInTheDocument();
    });
    
    it('renders icon only when iconOnly is true', () => {
      const { container } = render(<StatusBadge status="Processed" iconOnly />);
      expect(container.querySelector('svg')).toBeInTheDocument();
      expect(screen.queryByText('Processed')).not.toBeInTheDocument();
    });
    
    it('normalizes status text for display', () => {
      render(<StatusBadge status="processed" />);
      expect(screen.getByText('Processed')).toBeInTheDocument();
    });
    
    it('handles various status types correctly', () => {
      const { rerender } = render(<StatusBadge status="Success" />);
      expect(screen.getByText('Success')).toBeInTheDocument();
      
      rerender(<StatusBadge status="Failed" />);
      expect(screen.getByText('Failed')).toBeInTheDocument();
      
      rerender(<StatusBadge status="Pending" />);
      expect(screen.getByText('Pending')).toBeInTheDocument();
    });
    
    it('applies correct size classes', () => {
      const { rerender, container } = render(<StatusBadge status="Processed" size="sm" />);
      expect(container.firstChild).toHaveClass('px-2 py-0.5 text-xs');
      
      rerender(<StatusBadge status="Processed" size="md" />);
      expect(container.firstChild).toHaveClass('px-3 py-1 text-sm');
      
      rerender(<StatusBadge status="Processed" size="lg" />);
      expect(container.firstChild).toHaveClass('px-4 py-1.5 text-sm font-medium');
    });
  });
};
