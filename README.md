# StitchRush

A responsive Consumer Behaviour classroom prototype for **stitchrushh.com**.

## Start here — no terminal required

Read `docs/DEPLOYMENT_GUIDE.md`. It explains how to create a private GitHub repository, upload the source through the browser, import it into Netlify and connect the GoDaddy domain.

- **Source ZIP**: extract and upload its contents to GitHub. `package.json`, `netlify.toml`, `src` and `public` must be at the repository root.
- **Netlify deploy ZIP**: prebuilt files for optional drag-and-drop deployment. It is not the source repository.
- Domain: `stitchrushh.com` (two h's before `.com`). Keep domain registration/DNS at GoDaddy.

## Local development (optional)

Install Node.js 22.12+ (current Node 22 LTS), open a terminal in this folder, then run:

```sh
npm ci
npm run dev
```

Open the Local URL printed by Vite. Do not double-click `index.html` as a file.

```sh
npm test
npm run build
npm run preview
```

- React 19 + Vite 8 + React Router.
- Netlify build command: `npm run build`.
- Publish directory: `dist`.
- Node version: `22` (configured in `.nvmrc` and `netlify.toml`).
- No environment variables, paid APIs, server functions or database required.
- `public/_redirects` is copied to the build and contains `/* /index.html 200`; this allows refreshing `/inside` and other client routes.

## Implemented

Home, Services, How It Works, Pricing, Privacy, My Requests and `/inside`; validated request review; capability/material/deadline matching; labelled sample offers and ratings; sorting; provider profiles and share links; pickup selection and confirmation; assessment; final quote approval; stage tracking and delays; feedback and correction requests; policy/help dialogs; deterministic demo controls; device-local persistence; empty/error states; simulated pilot-interest form.

## Presentation flow

See `docs/DEMO_GUIDE.md`. Open a request's **Demo controls — simulated operations** panel to generate responses and advance physical service stages. Final quote approval is a separate customer action. Use sample information only.

## Evidence and limitations

The site is a classroom prototype. No real tailor is contacted, no physical service is booked and no money is collected. Ratings, reviews, provider identities, distances and prices are sample data. Original SVG illustrations are bundled locally; they are not real workmanship photographs.

Requests and feedback stay in browser local storage. Draft selections stay in session storage. The email-interest action discards its input and does not subscribe anyone. No real addresses, contact details, measurements or personal photos should be entered. Clear demo data from Privacy or Demo controls.

The `/inside` page has 12 CB decision entries, research boundaries, ethics and AI disclosure, and a planned A/B experiment. It does not collect experiment data or claim results. Real provider integration, payments, logistics, authentication and live customer messaging are not included.

## Source map

- `src/main.jsx`: routes, pages and shared interface components.
- `src/model.mjs`: validation, matching, prices and guarded stage transitions.
- `src/styles.css`: branding, components and responsive layouts.
- `public/assets`: original vector garment illustrations and favicon.
- `tests/model.test.mjs`: behavioural workflow tests.
- `docs`: deployment, demo, feature coverage and verification notes.

## Git push (optional alternative to browser upload)

Create an empty repository called `stitchrush` under your GitHub account first. In this source folder, replace YOUR_USERNAME in the remote URL:

```sh
git init -b main
git add .
git commit -m "Add StitchRush prototype"
git remote add origin https://github.com/YOUR_USERNAME/stitchrush.git
git push -u origin main
```

Authenticate using GitHub's supported sign-in/credential flow. Do not paste passwords or access tokens into source files. `node_modules`, `dist` and local secrets are excluded by `.gitignore`.

For later local updates:

```sh
git add .
git commit -m "Update StitchRush"
git push
```

A connected Netlify project rebuilds from updates to its production branch. Use the same Netlify project; the domain connection does not need to be repeated after each edit.
