# HoopIQ 🏀

Basketball Intelligence PWA — powered by Claude AI.

## Deploy to GitHub Pages

### 1. Push this repo to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/hoopiq-app.git
git push -u origin main
```

### 2. Add your Anthropic API key as a secret

1. Go to your repo on GitHub
2. **Settings → Secrets and variables → Actions**
3. Click **New repository secret**
4. Name: `ANTHROPIC_API_KEY`
5. Value: your key (starts with `sk-ant-...`)
6. Click **Add secret**

### 3. Enable GitHub Pages

1. Go to **Settings → Pages**
2. Under **Source**, select **GitHub Actions**
3. Save

### 4. Trigger a deploy

The workflow runs automatically on every push to `main`.  
You can also trigger it manually via **Actions → Deploy HoopIQ to GitHub Pages → Run workflow**.

Your app will be live at:  
`https://YOUR_USERNAME.github.io/hoopiq-app/`

---

> **Security note:** The API key is injected at build time by GitHub Actions and never stored in the repository. The deployed HTML will contain your key — make sure the repo is **private** if you don't want others to extract it from the page source.
