
# Signal Components Architecture

This directory contains all components related to trading signals in the application.

## Directory Structure

- `/core`: Core components and utilities used across all signal types
  - `/badges`: Signal status and action badges
  - `/components`: Reusable UI components for signal displays
- `/tradingview`: Components specific to TradingView signals
- `/coinstrat`: Components specific to Coinstrat signals
- `/errors`: Error handling and display components
- `/tracking`: Signal tracking components
- `/hooks`: Custom hooks for signal data and management

## Core Components

The core components are designed to be reused across the application. They include:

- **Badges**: Visual indicators of signal states and actions
  - `StatusBadge`: Shows the current status of a signal (processed, failed, etc.)
  - `ActionBadge`: Displays the action type (buy, sell, etc.)
  - `UserStatusBadge`: Indicates user/account status

- **Components**: UI building blocks for signals
  - `SignalLoadingState`: Loading indicators
  - `SignalEmptyState`: Empty state message
  - `SignalErrorState`: Error state display
  - `CopyableField`: Field with copy capability
  - `FormatDateTime`: Date/time formatter
  - `TimestampSection`: Standard timestamp display

## Signal-Specific Components

Each signal source has its own components:

- **TradingView**:
  - `TradingViewLogItem`: Individual TradingView signal item
  - Signal-specific badges and formatting

- **Coinstrat**:
  - `CoinstratSignalItem`: Individual Coinstrat signal item
  - `AccountSection`: Shows accounts that processed a signal
  - Signal-specific badges and formatting

## Tracking Components

Components for tracking and monitoring signals:

- `AdvancedSignalFilter`: Filter interface for signals with multiple criteria
- Unified signal views and displays

## Hooks

Custom hooks for signal management:

- `useSignalFilters`: Manages filter state for signal displays
- `useSafeLoading`: Provides safe loading state with timeouts

## Usage Guidelines

### Core Components

Core components should be used directly from their specific locations:

```tsx
import { FormatDateTime, TimestampSection } from '@/components/signals/core/components';
import { ActionBadge, StatusBadge } from '@/components/signals/core/badges';
```

### Signal Type Specific Components

Each signal type has its own directory with specific components:

```tsx
import { TradingViewLogItem } from '@/components/signals/tradingview/components';
import { CoinstratSignalItem, AccountSection } from '@/components/signals/coinstrat/components';
```

### Tracking Components

For signal tracking and filtering:

```tsx
import { AdvancedSignalFilter } from '@/components/signals/tracking';
```

### Hooks

Use the signal-specific hooks:

```tsx
import { useSignalFilters } from '@/components/signals/hooks/useSignalFilters';
import { useSafeLoading } from '@/hooks/signals/useSafeLoading';
```

## Backward Compatibility

To maintain backward compatibility during the transition, components are also accessible through their original import paths. However, new code should use the new import paths directly.

## Best Practices

- Use the appropriate component for the signal type
- Leverage the core components for consistency
- Use the hooks to manage state
- Follow the established patterns for new components
