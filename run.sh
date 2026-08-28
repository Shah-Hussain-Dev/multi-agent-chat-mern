#!/usr/bin/env bash

# Multi-Agent System (MERN) - Master Run Script
# Directory of this script
ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$ROOT_DIR" || exit 1

echo "=================================================="
echo "   🚀 Starting Multi-Agent System Services"
echo "=================================================="

# Function to check and install dependencies if missing
check_and_install() {
    local dir=$1
    local name=$2
    if [ -d "$dir" ] && [ -f "$dir/package.json" ]; then
        if [ ! -d "$dir/node_modules" ]; then
            echo "📦 Installing dependencies for $name..."
            (cd "$dir" && npm install)
        fi
    fi
}

# Ensure node_modules exist for core services
check_and_install "backend/services/auth" "Auth Service"
check_and_install "backend/gateway" "API Gateway"
check_and_install "frontend" "Frontend App"

# Setup service definitions
COMMANDS=()
NAMES=()
COLORS=()

# 1. Auth Service
if [ -d "backend/services/auth" ]; then
    NAMES+=("AUTH")
    COMMANDS+=("cd backend/services/auth && npm run dev")
    COLORS+=("blue")
fi

# 2. Gateway Service
if [ -d "backend/gateway" ]; then
    NAMES+=("GATEWAY")
    COMMANDS+=("cd backend/gateway && npm run dev")
    COLORS+=("magenta")
fi

# 3. Additional microservices in backend/services/
for s_dir in backend/services/*; do
    if [ -d "$s_dir" ]; then
        s_name=$(basename "$s_dir")
        if [ "$s_name" != "auth" ] && [ -f "$s_dir/package.json" ]; then
            check_and_install "$s_dir" "$(echo "$s_name" | tr '[:lower:]' '[:upper:]') Service"
            NAMES+=("$(echo "$s_name" | tr '[:lower:]' '[:upper:]')")
            COMMANDS+=("cd $s_dir && npm run dev")
            COLORS+=("cyan")
        fi
    fi
done

# 4. Frontend Application
if [ -d "frontend" ]; then
    NAMES+=("FRONTEND")
    COMMANDS+=("cd frontend && npm run dev")
    COLORS+=("green")
fi

# Join arrays into comma-separated strings for concurrently
NAMES_STR=$(IFS=,; echo "${NAMES[*]}")
COLORS_STR=$(IFS=,; echo "${COLORS[*]}")

# Execute using npx concurrently for formatted logs & clean process management
if command -v npx >/dev/null 2>&1; then
    echo "⚡ Launching services with concurrently..."
    npx -y concurrently \
        -k \
        --names "$NAMES_STR" \
        --prefix-colors "$COLORS_STR" \
        "${COMMANDS[@]}"
else
    # Fallback to bash background processes if npx is not available
    echo "⚡ Launching services with native bash processes..."
    cleanup() {
        echo -e "\n🛑 Shutting down all services..."
        kill 0
    }
    trap cleanup INT TERM EXIT

    for i in "${!COMMANDS[@]}"; do
        echo "Starting [${NAMES[$i]}]..."
        eval "${COMMANDS[$i]}" &
    done

    wait
fi
