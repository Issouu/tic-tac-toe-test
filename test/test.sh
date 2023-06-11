#!/bin/bash

# Kill all existing processes of server.js
pkill -f server.js

# Start the Node.js server and capture the port number
PORT=0
node server.js > server.log &
SERVER_PID=$!

# Function to kill the server process
function cleanup() {
  kill $SERVER_PID
}

# Trap the script exit and cleanup the server process
trap cleanup EXIT

# Wait until the server is up and running
while [ -z "$PORT" ] || [ "$PORT" -eq 0 ]; do
  sleep 1
  PORT=$(grep -oP '(?<=Server is running on port )\d+' server.log | tail -1 2>/dev/null)
  printf '.'
done

# Check if a valid port number is obtained
if [ -n "$PORT" ]; then
  echo "Server is up and running on port $PORT."
  echo "Running tests..."
fi

# Run Mocha tests
MOCHA_COMMAND="mocha -r ./test/setup-mocha.js --colors"
MOCHA_OUTPUT=$(eval $MOCHA_COMMAND)

# Check the exit code of the Mocha command
MOCHA_EXIT_CODE=$?
if [ $MOCHA_EXIT_CODE -eq 0 ]; then
  echo -e "\033[32mAll tests passed.\033[0m"
else
  echo -e "\033[31mSome tests failed. Mocha output:\033[0m"
  echo "$MOCHA_OUTPUT"
fi