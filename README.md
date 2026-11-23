# StitchRush

Clothes that fit. Without the tailor trips.

Updated source package for stitchrushh.com. Built with React and Vite; deployable as static files on Netlify.

## Use the right ZIP

- **StitchRush_Netlify_Deploy_Final.zip**: prebuilt website. Extract it and upload the folder containing `index.html`, `_redirects` and `assets/` to the existing Netlify project's Deploys page. No local build is needed.
- **StitchRush_Source_Final.zip**: editable project for GitHub. Extract it; put the CONTENTS of `stitchrush/` at the repository root. The ZIP itself is not the website source layout.

For a Git-connected Netlify project: build command `npm run build`, publish directory `dist`, Node 22.12+ (Node 22 is configured). `netlify.toml` supplies these settings. Retain the current domain and DNS configuration.

## Run locally

```sh
npm ci
npm test
npm run dev
```

For a production build, run `npm run build`. The generated `dist/` folder is the uploadable website. Dependencies and generated output are excluded from the source ZIP.

## Updated experience

- Professional branded footer and the revised headline.
- Prices shown during garment/alteration selection and request review.
- ₹50 combined fitting, pickup and return fee per request, consistent across estimates and final quotes.
- Matching progress with automatically arriving provider cards; five illustrative providers for the four preset areas, subject to garment, material and deadline matching.
- Sorting by return time, estimated total or rating.
- No-availability alternatives and on-site availability alerts.
- Pickup request and separate confirmation, fitting assessment, instructions and final quote approval.
- UPI/card checkout simulation with no payment information or funds collected.
- Delivery tracking, 1–5 rating, separate fit and punctuality questions.
- Correction pickup routed to the original tailor, customer timing acknowledgement, confirmation and full correction tracking.
- `/inside` with consumer-behaviour reasoning and the planned CTA experiment. The A/B test is not running and no analytics are installed.

## What is live and what is illustrative

This package is a browser-local interactive preview. It has no supplier, support, email, push-notification or payment backend. Operational updates use the collapsible **Preview controls**. Notifications appear on this website only; they are not sent by email or SMS. Requests and reviews stay in this browser. Profiles, ratings, distances and availability are example data. All five tailor portraits are AI-generated fictional people and do not establish provider identity or real workmanship. Garment images are original vector illustrations.

The ₹50 service fee is a proposed interface price, not validated unit economics. Actual supplier onboarding, service area validation, booking infrastructure and commercial terms are separate work.

The previous classroom banner, repeated project wording, Delhi NCR footer label and student-project footer sentence were removed at the user's explicit request. The supplied course brief requires that sentence; this requested presentation change therefore differs from that requirement. Concise preview, privacy and payment disclosures remain at the relevant actions.

No real addresses, phone numbers, measurements or payment details should be entered. There is no live contact number because no actual provider contacts were supplied; profile enquiries are simulated on-device.

## Routing

`public/_redirects` contains `/* /index.html 200`. Vite copies it to `dist/_redirects`, so `/inside`, provider profiles and request URLs resolve to the app on Netlify when opened or refreshed directly. Private request detail requires the request to exist in this browser; another browser gets a helpful missing-request screen.

See `docs/UPDATE_GUIDE.md`, `docs/WALKTHROUGH.md`, `docs/VERIFICATION.md` and `docs/IMPLEMENTATION_PROMPT.md`.
