#!/bin/bash
set -Eeuo pipefail

COZE_WORKSPACE_PATH="${COZE_WORKSPACE_PATH:-$(pwd)}"

cd "${COZE_WORKSPACE_PATH}"

echo "=== Build Script Starting ==="
echo "Workspace: ${COZE_WORKSPACE_PATH}"

# Clean only .next, keep node_modules for cache
echo "Cleaning previous build..."
rm -rf .next

# Check if dependencies are already installed
if [ ! -d "node_modules" ] || [ ! -f "node_modules/.modules.yaml" ]; then
    echo "Installing dependencies (using frozen lockfile for speed)..."
    # Use frozen-lockfile for reproducible and faster installs
    # This relies on pnpm's global cache
    pnpm install --frozen-lockfile --prefer-offline
else
    echo "Using cached dependencies..."
fi

echo "Building the Next.js project..."
export NODE_ENV=production
export NEXT_TELEMETRY_DISABLED=1

pnpm next build

echo "=== Build completed successfully! ==="
