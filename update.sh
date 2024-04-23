#!/bin/bash

git checkout production

# Fetch the latest changes from the remote repository
git fetch

# Stash any local changes
git stash

# Pull the latest changes from the remote repository with rebase
git pull --rebase

# Navigate to the frontend directory and build the app
cd webapp-frontend/lms-app-frontend
npm run build

# Navigate back to the main directory
cd ../..

# Add all changes to the staging area
git add .

# Commit the changes with a message
git commit -m "added"

# Push the changes to the production branch
git push -u origin production
