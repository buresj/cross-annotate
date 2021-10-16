#!/bin/bash

# Any subsequent(*) commands which fail will cause the shell script to exit immediately
set -e

# source .envrc

# if [ -z "$*" ]; then echo "ERROR: Missing parameter"; exit 1; fi

VER=$(jq ".version" --raw-output < package.json)
git add .
git commit -m "chore: bump v$VER :robot:"
git push origin master