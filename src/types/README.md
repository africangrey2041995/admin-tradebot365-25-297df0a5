
# Type System Documentation

This document explains the organization and conventions used in the TradeBot365 type system.

## Type Hierarchy

The type system follows a hierarchical structure:

```
BaseTypes (bot.ts, user.ts, etc.)
└── Extended Types (admin-types.ts)
```

### Core Types

- **User**: Defined in `user.ts` - represents a user in the system
- **Bot**: Defined in `bot.ts` - represents different bot types
- **Account**: Defined in `account.ts` - represents a trading account
- **Signal**: Defined in `signal.ts` - represents trading signals

### Admin Types

Admin-specific extensions are defined in `admin-types.ts`. These extend the base types
with additional properties needed in the admin context.

## Type Guards

Type guard functions are provided to safely check types at runtime:

```typescript
if (isUserBot(bot)) {
  // TypeScript now knows bot is a UserBot
  console.log(bot.owner);
}
```

## ID Standardization

We follow these standardized ID formats:

- **User IDs**: `USR-XXX` or `user-XXX` 
- **Bot IDs**: 
  - User Bots: `BOT-XXX` or `ub-XXX`
  - Premium Bots: `pb-XXX`
  - Prop Trading Bots: `ptb-XXX`

## Utility Functions

Helper functions for type validation:

- **normalizeUserId**: Converts user IDs to a consistent format
- **validateUserId**: Checks if a user ID follows the standardized format
- **isValidUser**, **isValidBot**, etc.: Runtime type validation

## Best Practices

1. **Import Types Directly**: Import types from their source files: 
   ```typescript
   import { User } from '@/types/user';
   ```

2. **Use Type Guards**: Always use type guards when working with union types:
   ```typescript
   if (isPremiumBot(bot)) {
    // Safe to access PremiumBot properties
   }
   ```

3. **Normalize IDs**: Use the normalization utilities when comparing IDs:
   ```typescript
   if (normalizeUserId(user.id) === normalizeUserId(ownerId)) {
     // IDs match regardless of format
   }
   ```

4. **Runtime Validation**: Use validation utilities when processing external data:
   ```typescript
   if (!isValidUser(userData)) {
     throw new Error('Invalid user data');
   }
   ```
