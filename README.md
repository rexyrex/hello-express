# hello-express (Portainer GitOps)

Tiny Node.js Express app that returns `hello world` at `/hello`, containerized and auto-deployed via Portainer.

## What you edit before first push
1. In `docker-compose.yml`, replace `ghcr.io/OWNER/REPO:${IMAGE_TAG}` with **your** `ghcr.io/<github-username>/<repo-name>:${IMAGE_TAG}`.
   - Example: `ghcr.io/rexyrex/hello-express:${IMAGE_TAG}`
2. (Optional) If you want a Personal Access Token (PAT) for GHCR (for private images), add a repo secret named `GHCR_PAT` and switch the login step in `.github/workflows/cicd.yml` (see commented block). Not needed for public images.

## How it works
- Push to `main` → GitHub Actions builds/pushes Docker image to GHCR and writes the immutable commit SHA to `.portainer.env` on branch `deploy`.
- Portainer stack points at branch `deploy` with polling → sees `.portainer.env` change → pulls the new image tag and redeploys.
- Service is exposed on host port **2277**. Test: `http://192.168.0.20:2277/hello`.

## Portainer Stack (Git repo method)
In Portainer → Stacks → **Add stack** → **Repository**:
- Repository URL: `https://github.com/<OWNER>/<REPO>.git`
- Reference / branch: `deploy`
- Compose path: `docker-compose.yml`
- Environment variables file: `.portainer.env`
- GitOps updates: Polling (e.g., 5 minutes)

Then click **Deploy the stack**.

## Local development
```bash
npm install
npm start
# visit http://localhost:3000/hello
```
