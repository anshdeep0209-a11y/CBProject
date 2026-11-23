# Update the existing StitchRush site

## Fastest option: upload the built website

1. Download and extract `StitchRush_Netlify_Deploy_Final.zip`.
2. Open your EXISTING StitchRush project in Netlify; go to **Deploys**.
3. Use its manual deploy/dropzone to upload the extracted website folder. That folder must contain `index.html`, `_redirects` and `assets/` immediately inside it.
4. Wait for the new production deployment to be published, then refresh your website.
5. Check the new headline, pricing, request journey and `/inside` directly.

Keep the current project and domain connection. Updating website files in that project does not require adding DNS records again. Do not create a second Netlify project for this update.

## If Netlify is already connected to GitHub

1. Extract `StitchRush_Source_Final.zip`.
2. Open the existing repository. Replace the source with the CONTENTS of its `stitchrush/` folder at the repository root. The root should show `package.json`, `netlify.toml`, `src/` and `public/`, not a ZIP or another `stitchrush/` wrapper.
3. Commit/push the files to the branch Netlify builds. Use a Git client for the complete folder if your browser omits `.gitignore` or `.nvmrc`.
4. Netlify should build the connected branch. Build command: `npm run build`; publish directory: `dist`; Node: `22`.
5. Check the resulting production deployment. Keep the existing domain association.

The source package includes the lockfile and assets. Do not upload `node_modules/`. Do not commit the prebuilt deployment ZIP as a replacement for the actual source.

## If you still need a repository

Create an empty GitHub repository named `stitchrush`, then upload the extracted source contents or use GitHub Desktop to add and publish that folder. Link the repository through the existing Netlify project's repository/build settings. Use the same build settings above. The earlier deployment guide covers first-time account and domain setup; those steps do not need repeating for a file update.

## Presentation path

Home → garment and alteration → review request → send → wait a few seconds → compare responding tailors → choose → pickup slot → request pickup → Preview controls: confirm pickup, complete fitting and collection, prepare quote → review and approve quote → simulated checkout → track → Preview controls: ready, dispatch, delivery → review → correction pickup if needed.

The preview controls are intentionally separate from customer decisions. They represent supplier/logistics events; they do not contact actual providers. For five responses, use a shirt, cotton or Not sure, one garment and a return deadline at least three days away. Tight deadlines or delicate materials may produce fewer or no matches.

## Official references

- https://docs.netlify.com/deploy/create-deploys/
- https://docs.netlify.com/start/quickstarts/netlify-drop-quickstart/
- https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository
