#!/bin/bash

# GitHub Repository Setup Script
# This script helps you create a GitHub repository and push your code

echo "WisdomNET Template Drafter - GitHub Setup"
echo "========================================="
echo ""
echo "This script will help you create a GitHub repository and push your code."
echo ""

# Check if GitHub CLI is installed
if command -v gh &> /dev/null; then
    echo "GitHub CLI is installed. Using it for repository creation."
    
    echo "Logging in to GitHub..."
    gh auth login
    
    echo "Creating repository..."
    gh repo create sev-32/WisdomNET-Template-Drafter --public --confirm
    
    echo "Pushing code..."
    git push -u origin main
else
    echo "GitHub CLI is not installed. We'll use the web flow instead."
    echo ""
    echo "Steps to complete:"
    echo "1. Go to https://github.com/new"
    echo "2. Create a new repository named 'WisdomNET-Template-Drafter'"
    echo "3. DO NOT initialize with README, .gitignore, or license"
    echo "4. Click 'Create repository'"
    echo ""
    echo "After you've created the repository, come back here and press Enter to continue..."
    read
    
    echo "Setting up the remote..."
    echo "Enter your GitHub personal access token (it will not be displayed):"
    read -s TOKEN
    
    # Setup the remote with the token
    git remote set-url origin https://sev-32:${TOKEN}@github.com/sev-32/WisdomNET-Template-Drafter.git
    
    echo "Pushing code to GitHub..."
    git push -u origin main
fi

echo ""
echo "Done! Your repository should now be available at:"
echo "https://github.com/sev-32/WisdomNET-Template-Drafter"
echo ""
echo "Next steps:"
echo "- Visit your repository on GitHub"
echo "- Add additional collaborators if needed"
echo "- Set up GitHub Pages if you want to showcase your project" 