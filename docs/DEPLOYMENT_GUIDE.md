# StitchRush: deployment guide
Domain: **stitchrushh.com** | Registrar: GoDaddy | Checked 23 November 2026

## Your website, from files to .com

This guide is for <b>Anshdeep's StitchRush prototype</b>: <b>stitchrushh.com</b>, purchased through <b>GoDaddy</b>. Notice the two h's immediately before .com. The brand on the page remains StitchRush.

| Service | What it does |
| --- | --- |
| GitHub | Keeps your editable project files and change history. |
| Netlify | Builds those files and serves the public website. |
| GoDaddy | Keeps your domain registration and DNS records. |

### Which download goes where?

| Download | Use |
| --- | --- |
| StitchRush_Source.zip | Extract it. Upload the project CONTENTS to GitHub. This is your main route. |
| StitchRush_Netlify_Deploy.zip | Already built. Optional direct Netlify upload, with index.html at the ZIP root. Do not use it as the source repository. |
| This guide | Follow pages 2-5 for the first publication. Page 6 covers later updates; page 7 covers the demo. |

You do not need Node.js, Git or GitHub Desktop installed to follow the main browser-based route. The source includes package.json, a dependency lockfile, netlify.toml, the application and its local assets.

### What has and has not been done

The application was built and checked locally. A GitHub repository has <b>not</b> been created in your account. Netlify has <b>not</b> been connected and your GoDaddy DNS has <b>not</b> been changed. Those account steps are below.

The service flow is simulated. There are no real provider messages, payments, customer deliveries or live mailing-list subscriptions. This is separate from publishing the website itself.

<b>Follow in order:</b> extract source → create/upload to GitHub → import repository into Netlify → connect domain → test the public site.

## Create your GitHub repository

1. Download StitchRush_Source.zip. On Windows, right-click it and choose Extract All; on Mac, double-click it.

2. Open the extracted stitchrush folder. You should see package.json, package-lock.json, netlify.toml, index.html, src, public, tests and docs. That is the project root.

3. Sign in or create an account at github.com. Open <link href="https://github.com/new" color="#B45336">github.com/new</link>. Choose your personal account as Owner.

4. Repository name: <b>stitchrush</b>. Description: <b>StitchRush Consumer Behaviour prototype</b>. Choose <b>Private</b>. Leave template, README, .gitignore and licence initialization unset; the package already supplies the relevant files. Click Create repository.

Source: GitHub repository-creation documentation [1]. Private code can still power a public Netlify website; these are separate visibility settings.

### Upload the files - your first saved version

1. On the empty repository page, click <b>uploading an existing file</b>. If a file list already exists, use <b>Add file → Upload files</b>.

2. In the extracted project folder, select the files AND folders inside it. Drag them into GitHub's upload area. Do not upload the ZIP or the enclosing stitchrush folder as an extra layer.

3. Include src and public with their contents. Include .gitignore and .nvmrc if visible. The package has no node_modules or secret keys to upload.

4. Enter the message <b>Add StitchRush prototype</b>. Commit to the main branch if offered. Click Commit changes or Propose changes, depending on the screen. If GitHub creates a pull request, open it, then Merge pull request and Confirm merge.

5. Return to the Code tab. Confirm <b>package.json is visible at the top level</b> and src/public open as folders. Save the repository URL. You have now saved the code on GitHub; this browser upload replaces the need for a terminal push.

Source: GitHub file-upload documentation [2]. This small source package is within its normal browser-upload limits. For optional terminal push commands, see README.md.

<b>Checkpoint:</b> the repository contains individual project files, not one ZIP and not an extra stitchrush folder surrounding the files.

## Connect GitHub to Netlify

1. Sign in or create an account at <link href="https://app.netlify.com" color="#B45336">app.netlify.com</link>. On your team dashboard choose <b>Add new project → Import a Git repository</b>.

2. Choose GitHub. Follow the account authorization screen. When repository selection is offered, give access to the stitchrush repository. Select that repository in Netlify.

3. Use main as the production branch. Review the settings below, then choose Publish or Deploy. The source configuration already supplies the build command and output folder.

Source: Netlify repository-import documentation [3]. You complete account sign-in and authorization in your own browser.

| Setting | Value for this project |
| --- | --- |
| Framework | Vite / React |
| Production branch | main |
| Base directory | Leave blank: package.json is at repository root |
| Build command | npm run build |
| Publish directory | dist |
| Node version | 22 (configured in the project) |
| Environment variables | None required |

Build/publish settings: project configuration and Netlify Vite documentation [4]. Do not set the publish directory to src or public.

### Check the first working address

Wait for a successful Published/Production deploy. Open the generated address ending in <b>.netlify.app</b>. Keep this exact hostname: you need it for the www DNS record on page 4. It will be specific to your project; do not assume it is stitchrush.netlify.app.

If visitors see a login screen, check Netlify project access settings and make the website publicly viewable for your professor and testers. Your GitHub repository can remain private. Test the link in an incognito window.

### Optional direct upload

If you need a quick alternate publication, extract the <b>deploy ZIP</b> and drag its built folder into Netlify Drop while signed in. This does not create the GitHub connection. Use repository import as your main route so future source updates rebuild automatically. Avoid creating two competing Netlify projects for the same domain.

<b>Checkpoint:</b> the Netlify address works before you change anything at GoDaddy.

## Connect stitchrushh.com at GoDaddy

1. In the working Netlify project, open <b>Domain management → Production domains → Add a domain → Add a domain you already own</b>. Enter <b>stitchrushh.com</b>. Check that www.stitchrushh.com is included too.

2. Open Pending DNS verification to see Netlify's exact required records. Keep the domain registered at GoDaddy and use external DNS for this guide. Do not transfer it or change nameservers as an additional step.

3. In GoDaddy, open Domain Portfolio, select <b>stitchrushh.com</b>, then open <b>DNS</b>. Record the current values before making changes. This guide assumes GoDaddy is the active DNS provider; if it says DNS is managed elsewhere, edit the records at that provider instead.

### Records to enter

| Type | Name / Host | Value / Points to |
| --- | --- | --- |
| A | @ | 75.2.60.5 — standard Netlify apex fallback; use the value in your Netlify verification panel if different. |
| CNAME | www | Your EXACT Netlify hostname, e.g. YOUR-PROJECT.netlify.app. Replace the example; do not include https:// or a path. |

Edit the existing @ website A record and existing www CNAME, or add the required record when absent. Use the default TTL (typically one hour). Save and complete GoDaddy verification if requested. Keep unrelated email MX/TXT and other service records intact. Remove an old parking/website target only when it conflicts with this intended website connection; do not clear the whole DNS zone.

Records and order: Netlify external-DNS documentation [5]. GoDaddy DNS editing: [6] and [7]. DNS changes can take time to appear globally; repeatedly changing the same values does not speed them up.

### Primary address

Back in Netlify, verify DNS. For external DNS, Netlify recommends a subdomain such as <b>www.stitchrushh.com</b> as the primary address. The bare <b>stitchrushh.com</b> should redirect to it after both are configured. Either way, test both hostnames.

<b>Checkpoint:</b> GoDaddy holds the domain; Netlify serves the site. You do not need GoDaddy Website Builder for this setup.

## Enable HTTPS and check the public site

1. In Netlify Domain management, confirm domain verification and check HTTPS/certificate status. Netlify normally provisions and renews a free managed certificate once domain DNS is correct. Use Verify DNS configuration or the certificate retry option if offered.

2. Wait for an active certificate, then open <b>https://stitchrushh.com</b> and <b>https://www.stitchrushh.com</b>. Both should reach the prototype, with one redirecting to the chosen primary address.

3. Open <b>https://www.stitchrushh.com/inside</b> directly. Refresh the page. Repeat for /pricing and /services. The bundled _redirects file supports these clean URLs.

4. Open the site on your phone and in an incognito window. Confirm no Netlify-owner login is required. Run a sample request through to feedback using the demo controls.

HTTPS: Netlify managed-certificate documentation [8]. Clean-route fallback: Netlify SPA rewrites documentation [9].

### Expected behaviour after launch

| What you observe | What it means |
| --- | --- |
| A new phone shows no saved requests | Normal. Demo state stays on each browser/device. |
| The .netlify.app URL has different saved requests | Normal. Browser storage is separate for each hostname. |
| Photos look like illustrations | Original sample drawings are bundled; these are not genuine workmanship photographs. |
| Tailor responses do not arrive automatically | Use the labelled Demo controls panel. There is no live tailor backend. |
| No payment button or actual mailing list | Intentional classroom-prototype scope. |

### What success looks like

Your domain opens publicly; the home form and categories work; responses can be simulated and compared; pickup and final approval remain separate; approved totals stay consistent; delivery unlocks feedback; the footer disclosure and /inside page are visible.

<b>Checkpoint:</b> save the final public URL for submission. Do not describe domain connection as complete merely because the Netlify deploy succeeded.

## Make changes and update the same website

### Simple browser edits

1. Open the stitchrush repository on GitHub. Open the file you want to change, then use its pencil/Edit control.

2. For wording and pages, look in <b>src/main.jsx</b>. For colours and layouts, use <b>src/styles.css</b>. For sample providers, timing or prices, use <b>src/model.mjs</b>. These files are code: ask for a targeted update if you are unsure.

3. Commit the change to main, or merge the proposed pull request into main. For an updated source package, upload its changed files into the matching paths rather than nesting a new project folder.

4. Netlify should start a new production build from the connected branch. Open Deploys, wait for success and check the public domain. You do not need to repeat the GoDaddy DNS connection for normal content changes.

### If something does not work

| Problem | First thing to check |
| --- | --- |
| Netlify cannot find package.json | The repository root must contain it. Remove the extra enclosing folder or correct the base directory. |
| Build fails | Open the first useful error in the deploy log. Confirm package-lock.json, Node 22 and all src/public files were uploaded. |
| Home works; /inside refresh gives 404 | Confirm public/_redirects exists in source and _redirects exists in the deployed output. Publish a new build. |
| GoDaddy parking page still appears | Check @ and www records against the Netlify verification panel; confirm the active DNS provider. |
| Domain works only for you | Check project visibility, incognito access and DNS propagation. |
| New edits do not appear | Confirm the change reached main and its matching production deploy succeeded; try a hard refresh. |
| HTTPS is pending | Verify both domain records first, then inspect Netlify certificate status. |

### Getting help

Share the repository/project URL and visible error. For DNS help, show the @ and www rows with account details hidden. Keep passwords, verification codes and tokens private.

## Show the professor the complete journey

1. Home: select Shirts & Tops, Shorten sleeves and a demo locality. Choose a required return date at least three days ahead.

2. Review: choose Cotton and quantity 1. Check the required time, then Send request to suitable tailors. Point out that no tailor has been selected yet.

3. Open Demo controls and Simulate suitable responses. Click Compare responding tailors. Show task capability, sample rating/count, total charges and proposed return.

4. Open Thread & Form, review its work examples and Choose this tailor. Select a future pickup slot, tick the acknowledgement and Request pickup and fitting.

5. Tracking: show Pickup awaiting confirmation. In Demo controls: Confirm demo pickup → Simulate fitting & collection → Prepare demo final quote.

6. Review final quote. The standard one-shirt example changes from an estimate of Rs 180-230 to an approved sample total of Rs 220. Tick the approval acknowledgement and Approve alteration.

7. Demo controls: Mark alteration ready → Simulate return dispatch → Simulate delivery. Then Check fit & give feedback. Answer quality and timing separately.

8. Try a fit issue and Request a correction. The screen says request received, not correction booked. Refresh to demonstrate device-local persistence.

9. Footer → Inside the design. Show the need, barrier and motivation; the 12 CB decisions; evidence boundaries; ethics; AI disclosure; and the planned A/B experiment.

### Two useful alternate demonstrations

<b>No response:</b> create a fresh request and choose Simulate no response. Edit the requirements and resend; earlier offers are invalidated.

<b>Delay:</b> while alteration is in progress, simulate a delay. The original commitment is retained, with a proposed revised time requiring acknowledgement.

### Explain the prototype accurately

“The interface works, while provider responses and physical fulfilment are simulated. We are testing how customers search, compare, approve and evaluate the service. Actual logistics feasibility, full-service willingness to pay and real adoption still require testing.”

Reset from Privacy or Demo controls when you need a clean run. Do not present the demonstration as fulfilment to actual customers or as a completed A/B experiment.

## Your final checklist and reference links

| Checkpoint | Done? |
| --- | --- |
| Source extracted; package.json at project root |  |
| GitHub repository created and source uploaded |  |
| Netlify imported from that repository; main branch |  |
| npm run build / dist / Node 22 confirmed |  |
| Netlify URL works publicly in incognito |  |
| stitchrushh.com and www added to the same project |  |
| GoDaddy @ and www entries match Netlify instructions |  |
| HTTPS active and both hostnames work |  |
| /inside opens directly and survives refresh |  |
| Full desktop and phone demo checked |  |

### Official references checked on 23 November 2026

[1] GitHub: <link href="https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository" color="#B45336">Creating a new repository</link>

[2] GitHub: <link href="https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository" color="#B45336">Adding files through the browser</link>

[3] Netlify: <link href="https://docs.netlify.com/start/quickstarts/deploy-from-repository/" color="#B45336">Deploy from a repository</link>

[4] Netlify: <link href="https://docs.netlify.com/build/frameworks/framework-setup-guides/vite/" color="#B45336">Vite build and publish settings</link>

[5] Netlify: <link href="https://docs.netlify.com/manage/domains/configure-domains/configure-external-dns/" color="#B45336">External DNS configuration</link>

[6] GoDaddy: <link href="https://www.godaddy.com/help/edit-an-a-record-19239" color="#B45336">Edit an A record</link>

[7] GoDaddy: <link href="https://www.godaddy.com/en-in/help/edit-a-cname-record-19237" color="#B45336">Edit a CNAME record</link>

[8] Netlify: <link href="https://docs.netlify.com/manage/domains/secure-domains-with-https/https-ssl/" color="#B45336">HTTPS and managed certificates</link>

[9] Netlify: <link href="https://docs.netlify.com/manage/routing/redirects/rewrites-proxies/" color="#B45336">Single-page application rewrites</link>

Interfaces can change. Where a button name differs, look for the equivalent action. For DNS values, use the verification instructions of your actual Netlify project. This guide does not assert that your account or domain has already been configured.
