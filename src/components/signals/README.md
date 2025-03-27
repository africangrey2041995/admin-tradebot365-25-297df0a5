
# Signal Components Documentation

This directory contains components, hooks, and utilities for working with trading signals in the application.

## Overview

The signals module provides:

- Badge components for displaying status, actions, and user states
- Loading state components for different types of bots
- Filter utilities for searching and filtering signal data
- Type definitions for signal-related data structures

## Directory Structure

- `/core` - Core components and badges used by all signal types
- `/tradingview` - Components specific to TradingView signals
- `/coinstrat` - Components specific to Coinstrat signals
- `/hooks` - Custom hooks for signal data management
- `/tracking` - Components for signal tracking and monitoring
- `/errors` - Error handling and display components
- `/examples` - Example implementations and showcase components

## Usage

### Basic Components

```tsx
import { StatusBadge, ActionBadge, SignalLoadingState } from '@/components/signals';

// Display a status badge
<StatusBadge status="success" />

// Display an action badge
<ActionBadge action="buy" />

// Show a loading state
<SignalLoadingState botType="premium" />
```

### Using Hooks

```tsx
import { useSignalFilters } from '@/components/signals';

function MyComponent() {
  const { filters, updateFilter, resetFilters } = useSignalFilters();
  
  // Update a filter
  const handleSearchChange = (e) => {
    updateFilter('search', e.target.value);
  };
  
  // Reset all filters
  const handleReset = () => {
    resetFilters();
  };
  
  return (
    // Component JSX
  );
}
```

## Documentation

For full documentation and examples, visit the [Signal Components Showcase](/docs/signals) in the application.

## Accessibility

All components are designed with accessibility in mind, including:

- Proper ARIA attributes where needed
- Keyboard navigation support
- Color contrast compliance
- Screen reader friendly content

## Internationalization

Text content in these components is kept minimal and can be easily replaced with translated content when needed.
