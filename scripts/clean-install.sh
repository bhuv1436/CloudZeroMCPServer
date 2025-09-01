#!/bin/bash
# Clean installation script for CloudZero MCP Server
# This removes generated files and performs a fresh install

echo "🧹 Cleaning generated files..."
rm -rf .api/
rm -rf node_modules/
rm -f package-lock.json

echo "📦 Installing dependencies..."
npm install

echo "⚙️  Installing CloudZero SDK..."
npx api install "@cloudzero/v2.0.0-main#1dpb61pmea4h1ld"

echo "✅ Clean installation complete!"
echo "📝 Don't forget to configure your .env file with your CloudZero API key"