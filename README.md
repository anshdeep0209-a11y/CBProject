# StitchRush — Premium visual refresh

Release: 24 November 2026. The supplied logo replaces the previous mark. Existing website copy, prices, route destinations, form definitions, browser-local records and business model are preserved.

## Manual deployment on Netlify

Use the accompanying **StitchRush_Netlify_Deploy_Final.zip**. Extract it and upload its folder containing `index.html`, `_redirects`, `_headers` and `assets` to the Deploys area of your existing Netlify project. Use the same site/domain to keep browser-local requests on the same origin. Do not upload this source archive as a prebuilt deployment.

## Develop and build

Requires Node.js 22.12 or newer, as in the original project.

```sh
npm ci
npm run dev
npm test
npm run build
```

The production output is `dist/`. Requests and enquiries remain local to the visitor's browser. Provider responses, operational progress and checkout are simulated; no money or real booking is accepted. No analytics tag is configured.

## Handover

- [Complete redesign handover and deployment instructions](docs/REDESIGN_HANDOVER.md)
- [Current verification](docs/VERIFICATION.md)
- [Preservation audit](docs/PRESERVATION_AUDIT.json)
- [Feature coverage](docs/FEATURE_COVERAGE.md)

Earlier planning and walkthrough documents in `docs/` are retained as project background; REDESIGN_HANDOVER.md describes this release.
