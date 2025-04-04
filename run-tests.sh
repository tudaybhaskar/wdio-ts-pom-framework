#!/bin/bash

echo "Installing dependencies..."
npm install

# Clean previous test results
npm run clean

echo "Running WebdriverIO Tests..."
# Run tests
npm run test:ci || EXIT_CODE=$?

# Generate Allure report
echo "Generating report..."
if [ -d "allure-results" ]; then
    npm run report
else
    echo "No allure-results directory found - no tests likely ran"
fi

# Exit with the test status
exit ${EXIT_CODE}