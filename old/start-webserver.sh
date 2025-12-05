#!/bin/bash

echo "Starting local server"

if command -v python3 &>/dev/null; then
    python3 -m http.server 8000
else
    echo "Python is not installed..."
fi
