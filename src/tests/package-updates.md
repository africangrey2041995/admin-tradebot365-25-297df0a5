
# Package.json Updates

The following updates should be made to package.json to support the new testing capabilities:

```json
{
  "scripts": {
    "test": "ts-node src/tests/run-tests.ts",
    "test:security": "ts-node src/tests/run-tests.ts security",
    "test:bot": "ts-node src/tests/run-tests.ts bot-differentiation",
    "test:user": "ts-node src/tests/run-tests.ts user-id",
    "test:component": "ts-node src/tests/run-tests.ts component", 
    "test:loading": "ts-node src/tests/run-tests.ts loading"
  }
}
```

## Manual Setup Instructions

Since we can't directly modify package.json, you can manually add these scripts:

1. Open your project's package.json file
2. Find the "scripts" section
3. Add the test scripts as shown above
4. Save the file

## Running Tests

After setting up the scripts, you can run tests using:

```bash
npm run test
# or
npm run test:security
# etc.
```

## Dependencies

These tests use TypeScript and ts-node. If not already installed, you can add them with:

```bash
npm install --save-dev ts-node typescript
```
