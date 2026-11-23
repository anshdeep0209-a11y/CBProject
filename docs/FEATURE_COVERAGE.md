# Feature coverage and implementation choices

## Pages and routes

- `/`: compact request entry, category shortcuts, journey, comparison rationale, simulated interest action, FAQs.
- `/request`: request review or editing through `?edit=REQUEST_ID`.
- `/requests`: device-local request history and empty state.
- `/requests/:id`: tracking, next actions, delay acknowledgement and demo controls.
- `/requests/:id/offers`: valid responding providers and price/rating/return sorting.
- `/tailors/:providerId`: shareable demo profile; request-specific offer only when a matching local request is supplied.
- `/requests/:id/pickup`: future slot selection and pending confirmation.
- `/requests/:id/quote`: final instructions, charges, approval, instruction revision and decline.
- `/requests/:id/feedback`: separate fit/timing feedback and correction requests.
- `/services`, `/how-it-works`, `/pricing`, `/privacy`, `/inside`.

## Interaction safeguards

- Material, capability and return deadline filter responses. Unknown material is flagged for assessment.
- Pickup/return examples use daytime IST hours; no same-day guarantee is implied.
- One selected offer closes others. Switching requires fresh availability.
- Editing earlier requirements invalidates prior offers and pickup.
- An unapproved quote cannot advance to alteration.
- A cancelled/declined request cannot be advanced as an active job.
- Revised return proposal retains the original approved commitment.
- Fit feedback and correction are only available after simulated delivery.
- Demo feedback is private device data, not a public testimonial.
- Required values, missing selections, past times, quantity and unsupported locality are validated.
- Submission failure simulation preserves input and allows retry.
- Policy/help dialogs support Escape and restore focus to the triggering control.

## Design

Navy #243B53 for logo, primary buttons and text; white cards; ivory supporting surfaces; terracotta accents. Original garment illustrations instead of third-party customer photos. No external fonts, runtime image URLs or tracking services are required. Mobile layouts include a bottom navigation and stacked forms/cards. Work images enlarge in a dialog. Provider sharing uses native sharing or clipboard where supported.

## Academic content

12 ledger entries cover motivation, perception, attitudes, social/family influence, decision process and learning. Research understanding is distinguished from the newer doorstep/request-response hypotheses. The A/B experiment is a plan only, with no fake result counters.

## Deliberate prototype boundaries

No real provider messages, address/measurement collection, live email signup, payment, transport dispatch, support messaging or authentication. All state is on the current device. A live multi-user business would require a backend and operational processes. The current matching durations, fees and provider counts are demo assumptions and not commercial validation.
