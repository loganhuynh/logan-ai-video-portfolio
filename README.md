# Logan Huynh — AI Video Portfolio

Source snapshot of Logan Huynh's cinematic AI video portfolio.

## Current site

- Live URL: https://logan-ai-video-portfolio.loganhuynh.chatgpt.site
- Snapshot: V41
- Site type: static HTML, CSS and JavaScript
- Languages: English and Vietnamese
- Role: AI Video Director & Creator

## Repository structure

```text
dist/                  Production-ready website
  assets/              Project thumbnails and profile media
  projects/            Individual case studies
  work/                Project archive
  about/               About page
  contact/             Contact page
docs/                  Editorial and handoff documentation
.openai/hosting.json   ChatGPT Sites deployment manifest
```

The website is already built. The deployable directory is `dist` and does not require a build command.

## Local preview

Run a static server from the repository root:

```bash
python3 -m http.server 4173 --directory dist
```

Then open `http://localhost:4173`.

Do not preview by opening `dist/index.html` directly because browser routing and relative assets are more reliable through a local server.

## Deploy to Vercel

1. Import this GitHub repository into Vercel.
2. Set **Framework Preset** to `Other`.
3. Leave **Build Command** empty.
4. Set **Output Directory** to `dist`.
5. Deploy, then add the custom domain in the Vercel project settings.

## Deploy to Cloudflare Pages

1. Create a Pages project from this GitHub repository.
2. Leave **Build command** empty.
3. Set **Build output directory** to `dist`.
4. Deploy, then add the custom domain in Pages.

## Editing guidance

- Preserve the current cinematic scrollytelling direction and bilingual behavior.
- Keep project archive data, filters and project order synchronized when adding a project.
- Every project case must remain reversible while scrolling and must not trap the user at a scene.
- Display headlines should not end with a period.
- Do not claim client results, performance metrics or production facts that were not supplied by Logan.
- Optimize large images before committing; use WebP where practical.
- Test desktop, laptop and mobile layouts before deployment.

## Current project order

1. Luxury Fashion
2. MoMo — History of Currency
3. Earned — Not Given
4. Chasing the Raw Light
5. Fragments of Freedom
6. Beyond the Race. Within Your Grace

See [docs/PROJECT-HANDOFF.md](docs/PROJECT-HANDOFF.md) for content and maintenance notes.

