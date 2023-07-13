#!/bin/sh
# This scripts loops through src/talks/{date} and builds each talk on each directory

set -eu

# Change cwd to project root
cd "$(dirname "$0")/../.."

# Filter directories that match src/talks/YYYY-MM-DD
DIRS=$(find src/talks -mindepth 1 -maxdepth 1 -type d | grep -E 'src/talks/[0-9]{4}-[0-9]{2}-[0-9]{2}')

echo "Buidling talks..."

# Loop through directories
for DIR in $DIRS; do
  echo "Processing: $DIR"

  # Extract date from directory
  DATE=$(echo "$DIR" | grep -Eo '[0-9]{4}-[0-9]{2}-[0-9]{2}')

  # Build talk
  pnpm retry -n 10 -- slidev build --base "/talks/$DATE/" --out "../../../dist/talks/$DATE" --executable-path $CHROMIUM_PATH "src/talks/$DATE/slides.md"
done

echo "Done!"
