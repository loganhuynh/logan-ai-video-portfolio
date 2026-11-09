# Project handoff

## Brand foundation

- Name: Logan Huynh
- Positioning: AI Video Director & Creator
- Primary email: loganhuynh2516@gmail.com
- Upwork: https://www.upwork.com/freelancers/~01f2a6fd0cd8527775?mp_source=share
- Visual direction: cinematic, editorial, premium, dimensional and scroll-driven
- Motion principle: consistent enough to feel authored, surprising enough to remain memorable

## Main pages

- `/` — Home and cinematic introduction
- `/work/` — Project archive and branch filters
- `/about/` — Profile, capabilities and method
- `/contact/` — Contact and Upwork CTA
- `/projects/<slug>/` — Individual case study

## Project branches

- AI Video Ads
- Cinematic Short
- Cinematic Storytelling
- Pixar 3D Animation Storytelling

The archive defaults to all projects. Choosing a branch should filter the archive without changing its core scroll interaction.

## Case-study content order

1. Hero: title, classification, release year, short description and Watch the Film CTA
2. Intent: why the project exists and the problem or creative question
3. Creative direction: world, character and brand/story system
4. Role and process: Logan's contribution and production flow
5. Outcome: what was produced or learned, without invented metrics
6. Tools and media
7. Previous/Next Project navigation

## Adding a project

Use `docs/PROJECT-INPUT-TEMPLATE.md` to collect the raw facts first. After the copy is approved:

1. Add the thumbnail to `dist/assets/`.
2. Add the project to the archive data in `dist/work.js` and any matching markup in `dist/work/index.html`.
3. Create `dist/projects/<slug>/index.html` using an existing case study as the structural reference.
4. Update project counters, previous/next links and branch filters.
5. Add the final video URL when available.
6. Test EN and VI copy, forward and reverse scrolling, CTA behavior and responsive layout.

## Analytics

The site contains `dist/analytics.js`. Keep the GA4 measurement ID and event naming centralized there. Useful events include:

- project_open
- project_filter
- watch_film
- contact_email
- upwork_click
- language_change
- case_scene_view

Never commit API secrets or private credentials. A public GA4 measurement ID is not a secret, but administrative keys are.

