
import React from 'react';
import { render, screen } from '@testing-library/react';
import StatusBadge from '@/components/signals/core/badges/StatusBadge';

describe('StatusBadge Component', () => {
  // Test basic rendering
  test('renders with basic status text', () => {
    render(<StatusBadge status="success" />);
    expect(screen.getByText('Success')).toBeInTheDocument();
  });

  // Test status variations
  test('renders success status correctly', () => {
    const { container } = render(<StatusBadge status="success" />);
    const badge = container.firstChild;
    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(badge).toHaveClass('bg-green-100');
    expect(badge).toHaveClass('text-green-800');
  });

  test('renders failed status correctly', () => {
    const { container } = render(<StatusBadge status="failed" />);
    const badge = container.firstChild;
    expect(screen.getByText('Failed')).toBeInTheDocument();
    expect(badge).toHaveClass('bg-red-100');
    expect(badge).toHaveClass('text-red-800');
  });

  test('renders pending status correctly', () => {
    const { container } = render(<StatusBadge status="pending" />);
    const badge = container.firstChild;
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(badge).toHaveClass('bg-yellow-100');
    expect(badge).toHaveClass('text-yellow-800');
  });

  test('renders warning status correctly', () => {
    const { container } = render(<StatusBadge status="warning" />);
    const badge = container.firstChild;
    expect(screen.getByText('Warning')).toBeInTheDocument();
    expect(badge).toHaveClass('bg-orange-100');
    expect(badge).toHaveClass('text-orange-800');
  });

  test('renders unknown status with default styling', () => {
    const { container } = render(<StatusBadge status="unknown-status" />);
    const badge = container.firstChild;
    expect(screen.getByText('unknown-status')).toBeInTheDocument();
    expect(badge).toHaveClass('bg-gray-100');
    expect(badge).toHaveClass('text-gray-800');
  });

  // Test size variations
  test('renders different sizes correctly', () => {
    const { rerender, container } = render(<StatusBadge status="success" size="sm" />);
    expect(container.firstChild).toHaveClass('px-1.5');
    
    rerender(<StatusBadge status="success" size="md" />);
    expect(container.firstChild).toHaveClass('px-2');
    
    rerender(<StatusBadge status="success" size="lg" />);
    expect(container.firstChild).toHaveClass('px-2.5');
  });

  // Test className prop
  test('applies custom className correctly', () => {
    const { container } = render(<StatusBadge status="success" className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  // Test case insensitivity
  test('handles case-insensitive status text', () => {
    render(<StatusBadge status="SUCCESS" />);
    expect(screen.getByText('Success')).toBeInTheDocument();
    
    const { rerender } = render(<StatusBadge status="failed" />);
    expect(screen.getByText('Failed')).toBeInTheDocument();
    
    rerender(<StatusBadge status="FAILED" />);
    expect(screen.getByText('Failed')).toBeInTheDocument();
  });
});
