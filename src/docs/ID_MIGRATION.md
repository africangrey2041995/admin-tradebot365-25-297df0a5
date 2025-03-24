
# ID Standardization Migration Guide

This document provides guidance on the ID standardization process for the Trade Bot 365 system.

## Overview

We are standardizing all entity IDs throughout the application to improve consistency and reduce bugs:

- Replacing generic `id` fields with specific entity identifiers:
  - `botId` for bots
  - `userId` for users 
  - `accountId` for accounts

## ID Format Standards

- User IDs: `USR-XXX` (e.g., `USR-001`)
- Bot IDs:
  - User Bots: `MY-XXX` (e.g., `MY-1234`)
  - Premium Bots: `PRE-XXX` (e.g., `PRE-1234`)
  - Prop Trading Bots: `PROP-XXX` (e.g., `PROP-1234`)
- Account IDs: `ACC-XXX` (e.g., `ACC-001`)

## Migration Process

1. Updated all base interfaces in type files to replace 'id' with specific entity IDs
2. Updated components to use entity-specific IDs consistently
3. Updated utility functions to work with the new ID format
4. Created migration utilities to help transition data

## Utilities Available

The following utility functions are available to assist with the migration:

- `migrateIdToBotId()`: Converts objects with 'id' to use 'botId'
- `standardizeUserId()`: Ensures user IDs follow the `USR-XXX` format
- `standardizeAccountId()`: Ensures account IDs follow the `ACC-XXX` format
- `standardizeAllIds()`: General utility to standardize all IDs in a data object

## Example Usage

```typescript
// Converting a bot object
const legacyBot = { id: '001', name: 'Trading Bot' };
const migratedBot = migrateIdToBotId(legacyBot);
// Result: { botId: '001', name: 'Trading Bot' }

// Standardizing an array of data
const legacyData = [
  { id: '001', type: 'USER_BOT', name: 'My Bot' },
  { id: '002', type: 'PREMIUM_BOT', name: 'Premium Bot' }
];
const standardizedData = standardizeAllIds(legacyData);
// Result: [
//   { botId: '001', type: 'USER_BOT', name: 'My Bot' },
//   { botId: '002', type: 'PREMIUM_BOT', name: 'Premium Bot' }
// ]
```

## When Working with APIs

When fetching or sending data to APIs that still use generic 'id' fields:

1. For incoming data:
   ```typescript
   const apiResponse = await fetch('/api/bots');
   const rawData = await apiResponse.json();
   const standardizedData = migrateIdToBotId(rawData);
   ```

2. For outgoing data:
   ```typescript
   // If the API expects 'id', transform before sending
   const apiReadyData = { ...botData, id: botData.botId };
   delete apiReadyData.botId;
   await fetch('/api/bots', { method: 'POST', body: JSON.stringify(apiReadyData) });
   ```

## Troubleshooting

If you encounter issues with the migration:

1. Check the console for any ID-related warnings or errors
2. Use the `logBotIdInfo()` utility to debug ID issues
3. Review the interfaces in the types directory to confirm the expected ID format
