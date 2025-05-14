# GitHub Repository Setup Instructions

This guide will help you set up your WisdomNET Template Drafter repository on GitHub.

## Prerequisites

- A GitHub account
- Git installed on your computer

## Option 1: Using the Setup Script

The easiest way to set up your repository is to use the provided setup script:

1. Open a terminal in the project directory
2. Run the script:
   ```
   ./github_setup.sh
   ```
3. Follow the prompts in the script

## Option 2: Manual Setup

If you prefer to set up the repository manually:

1. Go to https://github.com/new
2. Name your repository "WisdomNET-Template-Drafter"
3. Set it to Public (or Private if you prefer)
4. Do NOT initialize it with a README, .gitignore, or license
5. Click "Create repository"
6. Follow the instructions on the page to push your existing repository from the command line:

```bash
git remote add origin https://github.com/YOUR-USERNAME/WisdomNET-Template-Drafter.git
git branch -M main
git push -u origin main
```

## Using a Personal Access Token (PAT)

If you have two-factor authentication enabled on GitHub, you'll need to use a Personal Access Token instead of your password:

1. Go to https://github.com/settings/tokens
2. Click "Generate new token"
3. Give it a name like "WisdomNET-Template-Drafter"
4. Select "repo" permissions
5. Click "Generate token"
6. Copy the token - you'll only see it once!
7. Use this token instead of your password when pushing to GitHub

## Security Note

Never commit your GitHub token or password to your repository.

## Next Steps After Repository Creation

1. Visit your repository on GitHub
2. Add collaborators if needed (Settings > Manage access)
3. Enable GitHub Pages if you want (Settings > Pages)
4. Set up branch protection if desired (Settings > Branches)

## Troubleshooting

- If you get an authentication error, make sure you're using the correct username and password or token
- If your push is rejected, ensure you've pulled the latest changes first with `git pull origin main` 