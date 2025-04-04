#!/bin/bash

echo "Installing dependencies..."
npm install

echo "Running WebdriverIO Tests..."
npx wdio ./config/wdio.ci.conf.ts

exist $?