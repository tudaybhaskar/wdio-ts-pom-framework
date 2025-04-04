#!/bin/bash

echo "Installing dependencies..."
npm install

# Clean previous test results
npm run clean

echo "Running WebdriverIO Tests..."
# Run tests
npm run test:ci || EXIT_CODE=$?

# Generate Allure report
npm run report

# Exit with the test status
exit ${EXIT_CODE}