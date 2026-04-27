# nybotic.github.io

Simple GitHub Pages site for my GitHub profile.

It shows my profile info and a list of my public repos with short notes about what each one does. The site is intentionally plain: dark theme, no framework, no build step.

## Files

- `index.html` - page structure
- `styles.css` - dark theme and layout
- `script.js` - loads profile/repo data from the GitHub API
- `assets/` - local images

## Run locally

Open `index.html` in a browser.

## Updating

After editing files:

```powershell
git status
git add .
git commit -m "Update site"
git push
```
