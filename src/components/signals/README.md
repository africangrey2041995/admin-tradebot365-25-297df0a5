
# Signal Components Architecture

This directory contains all components related to trading signals in the application.

## Directory Structure

- `/core`: Core components and utilities used across all signal types
  - `/badges`: Signal status and action badges
  - `/components`: Reusable UI components for signal displays
- `/tradingview`: Components specific to TradingView signals
- `/coinstrat`: Components specific to Coinstrat signals
- `/errors`: Error handling and display components
- `/tracking`: Signal tracking components (future implementation)
- `/hooks`: Custom hooks for signal data and management

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
import { TradingViewActionBadge } from '@/components/signals/tradingview';
import { CoinstratStatusBadge } from '@/components/signals/coinstrat';
```

### Backward Compatibility

For backward compatibility, components are also accessible through legacy import paths.
However, new code should use the new import paths directly.

## Adding New Components

When adding new signal components:

1. Place them in the appropriate directory based on their purpose
2. Export them through the relevant index.ts file
3. Keep components small and focused on a single responsibility
4. Maintain TypeScript type safety throughout
5. Document props and usage in component files

## Future Improvements

- Consider adding storybook examples for each component
- Add unit tests for core components
- Further optimize bundle size through code splitting
