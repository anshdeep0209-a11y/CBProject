# Verification record

Checked locally on 23 November 2026. No GitHub repository, Netlify production deployment or GoDaddy DNS change was made in the user's accounts.

## Automated

`npm test`: 15 passing behavioural tests for validation, deadline/material matching, unknown-material flags, selection exclusivity, withdrawn offers, requirement revisions, provider switching, pickup confirmation, approval gates, price arithmetic, declined quotes, delays, delivery/correction gates, persistence parsing and IST date boundaries.

`npm run build`: successful Vite production build. Dependencies and versions are pinned in package.json and package-lock.json. The Node engine requirement is compatible with configured Node 22. Local commands used Node 24; Node 22 installation itself was not separately exercised.

Build output includes index.html, bundled JS/CSS, original SVG assets and _redirects. SPA fallback syntax is configured for Netlify. Actual Netlify routing and SSL must be checked after importing/deploying the project.

## Browser interaction

- Desktop: submitted a shirt request, generated responses, opened a provider, selected a pickup, separately confirmed pickup, simulated collection/assessment, checked approval was disabled before consent, approved the Rs 220 quote, advanced to delivery, saved separate fit/timing feedback and requested a correction.
- Reloaded the feedback route and observed saved feedback and correction state.
- Narrow responsive layout: exercised a second full journey through feedback at approximately 454 CSS px browser width (desktop zoom), including stacked forms/cards and mobile navigation. DOM checks found no horizontal page overflow on the checked home/profile/quote/feedback layouts.
- Used keyboard Enter to advance demo stages. Opened a policy dialog and closed with Escape; focus returned to the triggering button.
- Opened /inside and reloaded it directly in the local preview successfully.

This is not a physical-phone test, an accessibility certification, a live service pilot or a production load/security assessment. Additional public-domain/incognito/phone checks are in the deployment guide.

## Remaining account steps

User creates/uploads the GitHub repository, imports it into Netlify, confirms public visibility, connects stitchrushh.com and www, verifies DNS/HTTPS, and repeats the full flow on the published domain. The guide explains these steps.
