# nybotic.github.io

Personal GitHub Pages site for [github.com/nybotic](https://github.com/nybotic).

The site is intentionally simple: static HTML, CSS, and JavaScript with no framework or build step. It loads public GitHub profile and repository data from the GitHub API, then falls back to local placeholder content if the request fails.

## Features

- Displays profile information for the `nybotic` GitHub account.
- Lists public, non-archived, non-fork repositories.
- Adds short hand-written notes for known projects.
- Caches GitHub API results in `sessionStorage` for faster repeat views.
- Includes the DonutStats extension privacy policy page.

## Files

- `index.html` - page structure.
- `styles.css` - dark theme, responsive layout, and reveal animation.
- `script.js` - GitHub API loading, caching, and repository rendering.
- `donutstatsextension-privacy.html` - privacy policy for the browser extension.
- `assets/` - local images.

## Run Locally

Open `index.html` in a browser. No build command is needed.

## Deploy

Push changes to the repository's default branch and GitHub Pages will serve the updated static files.
