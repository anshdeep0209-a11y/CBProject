# Release verification — 23 November 2026

## Automated checks

18 model tests pass, including capability/deadline matching, five suitable fixtures, invalid and withdrawn offers, one-provider selection, requirements invalidation, reopened availability, future pickup slots, separate pickup confirmation, instruction revisions and quote approval, consistent totals, checkout consent and duplicate prevention, retained return commitments, post-delivery feedback, original-tailor correction through return delivery, incremental responses, local alert state, persistence and Indian date boundaries.

Production build: `npm run build` completes successfully. Framework bundler notices about dependency `use client` directives do not stop the static build.

## Browser checks

- Home → request review → submit → automatic incremental responses → five profiles → selection → pickup request/confirmation → collection/assessment → approved quote → simulated UPI checkout → ready/dispatch/delivery → star review and separate fit/timing feedback.
- Correction request remains assigned to the original provider; pickup request/confirmation and correction tracking reviewed. Subsequent correction collection/work/return transitions are covered by the model tests.
- No-availability screen offers editing, recheck and device-level alert. Rechecking a feasible request shows the availability notice.
- Pricing card action opens the request form with garment selected. ₹50 service fee and the example ₹190 approved total checked.
- Privacy and service-terms footer links render correctly.
- `/inside` was refreshed directly. A rendering issue found during QA was fixed and the page was rechecked successfully.
- Narrow browser viewport checked using browser zoom, 449 CSS px. Request content width equalled viewport width; no horizontal overflow observed. Pricing layout and mobile navigation reviewed. This is responsive browser QA, not a physical-phone certification.
- Saved requests remained available after page refresh.

## Packaging

Prebuilt ZIP has index.html and _redirects at its root, with all compiled and image assets. Source ZIP contains the editable project, lockfile, Netlify settings and updated instructions, without node_modules or generated dist. Netlify SPA fallback is included for direct/refresh navigation.

## Limits

No production deployment was performed for this release. No actual tailoring, live support, payment, email or SMS delivery was tested or represented. No A/B experiment or real customer usability study has been run on this release. No real provider contact details were supplied. Operational events and checkout are simulated; generated portraits and fixture ratings are illustrative.
