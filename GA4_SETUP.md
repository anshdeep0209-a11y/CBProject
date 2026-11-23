# Google Analytics installation

Measurement ID: G-TKFV5R5BV0.

The exact requested Google tag is installed once, immediately after the opening <head> in index.html, with the Measurement ID in both the loader URL and the config call. The compiled production index.html retains the same installation.

This React single-page application has one HTML entry point shared by all its routes. Separate HTML copies per route are not required. Keep Enhanced measurement enabled for browser-history page changes if you want page-view reporting as visitors navigate within the app. No manual duplicate page-view tracking was added.

## Deploy

Extract StitchRush_Netlify_Deploy_GA4.zip and upload the extracted folder containing index.html, _redirects, _headers and assets to the Deploys area of your existing Netlify project. The source archive is for editing or a Git-based build; it is not the prebuilt manual upload.

Visit the deployed site, accept any applicable analytics consent prompt, and open Google Analytics > Reports > Realtime. Initial collection can take time. Data will only begin after deploying these files and receiving visits. Collection was not verified against your live Google Analytics property in this workspace.

The GA4 installation in this update supersedes the older statements in the redesign documentation and README saying no analytics tag is configured. No website design, content, business logic, forms, prices or browser-local request storage was modified. If the same Google Analytics tag was also installed through Netlify snippet injection or Google Tag Manager, remove the duplicate installation before testing.
