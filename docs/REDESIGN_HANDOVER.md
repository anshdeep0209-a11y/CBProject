# StitchRush redesign handover
24 November 2026

## What changed
A visual refresh of the existing React application, keeping the original pages, copy, prices, services, section order and booking model. The supplied navy/orange S-and-needle mark replaces the previous logo, as explicitly requested. The rest of the interface retains Ink Navy #263B46, Burnt Terracotta #B45336, Warm Ivory #F7F5F0, Sand #C7A582 and white.

The homepage now uses editorial serif headings, a large fashion composition, a clear terracotta CTA, coordinated garment cards, a photographic process panel, a restrained textile backdrop in the existing CTA section, refined FAQ panels and a stitched footer border. Forms, pricing, profiles, tracking and policy pages share the updated surfaces, spacing, buttons and focus treatment. No new marketing sections or claims were added.

## Deploying the final ZIP
1. Download and extract StitchRush_Netlify_Deploy_Final.zip.
2. Open your EXISTING StitchRush project in Netlify.
3. Open its Deploys area and drag the extracted folder containing index.html, _redirects, _headers and assets into the manual deployment area.
4. Keep using the existing project and domain. Opening or refreshing /services, /pricing and other routes is supported by the SPA fallback.

Use the deployment archive for manual upload; the source archive is for future development. Files require a web server and will not work by double-clicking index.html locally. No production deployment was performed here.

## Source files and components modified
| File | Changes |
|---|---|
| src/main.jsx | Logo markup in Shell; decorative ThreadLine and usePageMotion; visual wrappers and editorial images in Home, Pilot and Services; selected-card feedback; reduced-motion-aware category scrolling; mobile Escape support; field error associations. |
| src/premium.css | New presentation layer, responsive layouts, type scale, cards, buttons, input states, footer and lightweight CSS animation. |
| index.html | Theme color and supplied-logo favicon reference. Existing title and description are retained. |
| public/assets/stitchrush-brand.jpeg | Exact uploaded logo image, unmodified; CSS frames its original margins. |
| public/assets/brand-favicon.svg | Browser icon frames the same supplied image in an SVG viewport. |
| public/assets/editorial/ | Seven supplied WebP images, listed below. |
| public/_headers | Carries the original netlify.toml security headers into manual deploys. |
| docs/ and README.md | Current release notes, asset mapping, preservation audit and verification. |

The original src/styles.css remains intact. src/model.mjs, tests, package dependencies, lockfile, netlify.toml and public/_redirects are unchanged. No additional runtime dependency was installed.

## Exact uploaded-image placement
All photographic imagery is illustrative decoration, not evidence of completed StitchRush work. The original five garment illustrations and existing provider work-reference illustrations remain.

| Uploaded asset | Placement |
|---|---|
| 01_editorial_hero_flatlay.webp | Existing homepage hero image container; high fetch priority and explicit dimensions. |
| 02_tailor_workbench.webp | Decorative main photograph within the existing “A simpler way to get it sorted.” section. |
| 03_needle_stitch_macro.webp | Faint decorative background within the existing “A better fit starts here.” section; detail strip for Trousers & Jeans on Services. |
| 05_craftsmanship_hero.webp | Decorative detail strip for Blouses & Ethnic Wear on Services. |
| 06_stitch_detail.webp | Small overlapping detail in the existing process section; detail strip for Dresses & Skirts on Services. |
| 08_shirt_cuff_alteration.webp | Decorative detail strip for Shirts & Tops on Services. |
| 10_button_repair_detail.webp | Decorative detail strip for Minor Repairs on Services. |

Assets 04 and 07 (before/after concepts) and 09 (sewing machine) were intentionally not placed. This avoids implying real customer outcomes and avoids overcrowding. The live site uses only the supplied WebP versions, with lazy loading below the fold. New decorative photographs use empty alt text; the hero has an illustrative description. The original image files were not redrawn or generated again.

## Interactions and animation
- Existing full-card garment selection retained, with a subtle hover lift, image scaling, plus-icon movement and a terracotta selected state.
- aria-pressed communicates which garment is selected; selection still updates the same dropdown and focuses the alteration field.
- Navigation underline and active states, gentle button hover lift and pressed states, visible keyboard focus.
- Approximately 200 ms control transitions; 400 ms soft card and section reveals with short stagger delays.
- One decorative terracotta thread draws alongside the existing hero image; no looping animation, sound, parallax or scroll interception was introduced.
- Native FAQ disclosures retain their existing wording and behavior, with decorative plus/minus icons.
- Existing loading labels and disabled submit states remain.
- Mobile menu supports Escape and returns focus to its toggle; links retain their existing destinations.
- Reduced-motion CSS removes animation, transitions and smooth scrolling. The reveal hook also checks and follows the preference, keeping content visible.

## Accessibility improvements
- Main text generally 16–18 px; secondary fees and metadata generally 14 px.
- Input text uses 16 px, with larger labels, spacing, touch areas and focus rings.
- Main controls target approximately 44–54 px. The area selector remains readable in a two-row phone header.
- Validation messages are associated using aria-describedby and fields report aria-invalid, without changing validation rules.
- Native buttons, links, selects, checkboxes, radios and disclosure controls remain keyboard operable.
- Existing dialog focus containment and Escape behavior retained and checked. Skip-to-content retained.
- Decorative images and stitching do not add redundant screen-reader content.
- Light pricing-banner text was adjusted to dark ink/muted colors to retain readable contrast.

These changes aim toward WCAG 2.2 AA. This release is not a formal accessibility certification or a complete screen-reader/device lab audit.

## Responsive verification
| Requested iframe viewport | Pages tested | Horizontal overflow |
|---|---|---|
| 360 px | Home, Services, How it works, Pricing, Request, My Requests, Privacy, Terms, Inside StitchRush | None |
| 390 px | Same nine pages | None |
| 768 px | Same nine pages | None |
| 1024 px | Same nine pages | None |
| 1440 px | Same nine pages | None |

45 exact-width browser layout checks passed. Desktop scrollbar widths make the available document widths 15 px smaller than the iframe viewport. Five additional screens — tailor profile, tracking, quote, completed checkout and feedback — were checked at a 360 px viewport with no overflow. These are responsive browser checks, not tests on physical phones. Representative desktop hero, garment cards, process section, mobile header/menu and mobile pricing were visually reviewed.

## Functionality verification
- All 18 pre-existing model tests pass.
- Production Vite build succeeds. The existing React Router “use client” bundler warnings are non-blocking.
- Browser-tested flow: garment selection → request review → submit → five incremental responding tailor profiles → choose tailor → select pickup slot and acknowledge → request pickup → separate confirmation → fitting/collection → final quote → approval → simulated checkout → ready → dispatch → delivery → feedback page.
- Example final total remains ₹140 alteration + ₹50 service = ₹190. No real payment was made or payment details collected.
- Completed checkout survives a page refresh.
- Help dialog opens; Escape closes it. Mobile menu opens and closes with Escape.
- An invalid garment selection correctly exposes aria-invalid and its matching error description.
- The selected garment card stays visible across subsequent state updates and keeps its active border.
- No original saved request was cleared during QA; the browser's test request is not embedded in either archive.

## Preservation confirmation
A syntax-tree audit confirms every original JSX text segment is retained in the same order (excluding the newly rendered StitchRush wordmark, which previously lived inside an SVG). All 17 route declarations and existing form attributes are unchanged. The homepage visible text was also compared against the original before interaction and matched after whitespace normalization. Dynamic labels, service names, provider fixtures, fee logic and business messages remain in the unchanged model or unchanged components. See PRESERVATION_AUDIT.json.

All existing prices, FAQs, policies, terms, disclaimers and enquiry behavior are retained. The logo replacement is the one explicit exception to the uploaded brief's preservation instruction, as requested in chat.

## Existing application boundaries
The supplied project has no live backend or database: it stores requests and interest on the visitor's browser/device. Provider responses, operations and checkout are simulated. No live server records were accessed or changed. Existing browser storage keys and data structures are unchanged, so redeploying to the same origin preserves existing local records. A different domain or browser has separate storage.

No analytics tag or A/B assignment mechanism was present in the supplied source. None was added or altered in this visual-only update. A GA4 Measurement ID would be needed for a separate analytics setup.

No new functionality or further approval is required for these packaged visual changes. Live service operations, real payments, public reviews and production analytics remain outside this release.
