#!/bin/sh
# This script loops through src/talks/{date}/slides.md and extracts the
# frontmatter to src/content/talks/{date}.yml

set -eu

# Change cwd to project root
cd "$(dirname "$0")/../.."

# Temporary remove src/content/talks/*
rm -rf src/content/talks
mkdir src/content/talks

# Filter directories that match src/talks/YYYY-MM-DD
DIRS=$(find src/talks -mindepth 1 -maxdepth 1 -type d | grep -E 'src/talks/[0-9]{4}-[0-9]{2}-[0-9]{2}')

echo "Syncing talks..."

# Loop through directories
for DIR in $DIRS; do
  echo "Processing: $DIR"

  # Extract date from directory
  DATE=$(echo "$DIR" | grep -Eo '[0-9]{4}-[0-9]{2}-[0-9]{2}')

  # Extract frontmatter from src/talks/{date}/slides.md
  START_FLAG=0
  FRONTMATTER=$(
    while read -r LINE; do
      if [ "$LINE" = "---" ] && [ "$START_FLAG" = 0 ]; then
        START_FLAG=1
        continue
      fi

      if [ "$LINE" = "---" ]; then
        break
      fi

      echo "$LINE"
    done < "$DIR/slides.md"
  )

  # Write frontmatter to src/content/talks/{date}.yml
  echo "$FRONTMATTER" > "src/content/talks/$DATE.yml"
done

echo "Done!"
