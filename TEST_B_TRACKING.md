# StitchRush Test B — deployment and tracking

## Scope
This is a separate treatment build based on the latest GA4-enabled StitchRush source from this conversation. Test A and its existing ZIPs are unchanged.

The only visual change is hiding the starting price and doorstep-service line beneath each of the five homepage garment cards. The price span uses visibility:hidden and aria-hidden=true, retaining its exact layout footprint at each width. It adds no replacement text. This keeps card heights, text/image positions, section spacing and the Explore services link identical. The hidden information is excluded from screen readers. Pricing calculations and every price elsewhere remain untouched.

No CSS, image, font, animation, route, form, policy or business-model file was changed. The only existing source file modified is src/main.jsx, for the price visibility attributes, a section ref/effect and the existing link's analytics callback. src/testBAnalytics.mjs and tests/testBAnalytics.test.mjs are new tracking-only files.

## Deploy Test B without replacing Test A
1. Extract StitchRush_Test_B_Netlify.zip.
2. Create a SEPARATE Netlify project for Test B, or use a separately configured B deployment URL that does not overwrite the Test A production deployment.
3. Upload the extracted folder containing index.html, _redirects, _headers and assets.
4. Share that B URL with your treatment participants. Keep the existing Test A URL and deployment unchanged.

No automatic A/B random assignment, traffic splitting or Test A changes were added. This package is B-only.

StitchRush_Test_B_Source.zip contains the editable source and this guide. For a Git-based Netlify build use the existing npm run build / dist settings. The unchanged Google tag uses Measurement ID G-TKFV5R5BV0. Do not install the same tag a second time through Netlify snippet injection or Google Tag Manager.

## B-specific GA4 events
| Event name | Trigger | Unique-visitor metric |
|---|---|---|
| test_b_garment_cards_view | At least 50% of any one garment card is visible for one continuous second while the browser tab is visible. Excludes the sticky header and mobile bottom-navigation area. Once per homepage mount. | Total users for this event |
| test_b_explore_services_click | Clicking the existing Explore services link in the What needs altering? section. Destination stays /services. Other /services links do not emit this event. | Total users for this event |

Both events carry experiment_id=garment_price_visibility, experiment_variant=B, section_name=what_needs_altering and send_to=G-TKFV5R5BV0. The click also carries link_text and link_url. The view event uses exposure_rule=half_card_1_second.

The visitor's existing GA4 identity is used. No new visitor IDs, fingerprinting, personal data or custom tracking cookies are introduced by this implementation. Repeated events are deduplicated into unique users by GA4 when you use Total users; Event count measures actions, not unique visitors. Cross-device or cross-browser identity limitations still apply.

## See the unique counts
1. After deploying, open the B URL and scroll until the garment cards are clearly visible for at least one second.
2. Click Explore services. Confirm it opens the existing Services page.
3. In GA4 Realtime, check Event count by Event name for the two B events. This confirms arrival, not the final unique-visitor counts.
4. In GA4's Events report or a Free-form exploration, use Event name as the row dimension and Total users as the metric. Filter to the two exact B event names. Set the same date range you use for A.
5. You do not need custom dimensions to distinguish these two B event names. To report the custom experiment parameters separately, register their matching event-scoped custom dimensions in GA4.

Clicks and exposures are recorded separately. The heading/link can appear before the cards; a user who immediately clicks the link may legitimately have a click event without the one-second exposure event. If calculating conversion among exposed visitors, use an exposure-then-click funnel or user segment, rather than blindly dividing two independent totals.

No A events were injected or changed. Historical A data cannot be retroactively given card exposures or precise link-click events if it did not collect them. Compare like-for-like measures; /services page users alone also include users who reached that page through other links.

## Verification
- 18 existing business-model tests and 7 new tracking tests pass (25 total).
- Production build succeeds with the original non-blocking React Router bundler warnings.
- Side-by-side browser comparison at 360, 390, 768, 1024 and 1440 px confirms identical card, illustration, heading, description, plus-button, grid, section and Explore services link geometry. Font, background, image sources and link destination match.
- A shows all five prices; B shows none, and B's accessible card names exclude the price/fee text.
- Browser tests verify: no exposure before cards are viewed; the B view event after visible dwell; the B click event; unchanged navigation to Services; no B events in the A baseline; and unchanged garment selection plus focus on the alteration field.
- Stylesheets, assets, model, route definitions and existing HTML analytics tag are unchanged. Existing A archives retain their original SHA-256 values.
- Analytics was checked through an isolated local event log to avoid polluting your property during QA. Live receipt in your GA4 property must be confirmed after deployment. No production deployment was performed here.

## Google reference documentation
- https://developers.google.com/analytics/devguides/collection/ga4/events
- https://support.google.com/analytics/answer/12926615
- https://support.google.com/analytics/answer/12253918
