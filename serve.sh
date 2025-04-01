#!/bin/bash

# Load nvm (ensure this points to your nvm installation)
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Use the desired Node version
nvm use 20

# Start your application with PM2
pm2 start npm --name "aceit-webpack" -- run serve