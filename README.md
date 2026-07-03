# lingi-app

Lingi is a mobile-first vocabulary capture PWA prototype for intermediate English learners.

Repo rename
1. On GitHub, open the repository Settings → Rename, and change the name to `lingi-app`.
2. Locally, update the remote URL if needed and run:

```bash
git remote set-url origin https://github.com/<your-username>/lingi-app.git
git fetch origin
git branch -u origin/main main
```

Vercel deploy
1. Create a project on Vercel and connect your GitHub repo.
2. In GitHub Actions, set the following secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` to enable automatic deploys from `main` branch.
