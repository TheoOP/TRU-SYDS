# TRU-SYDS — GitHub Pages deploy branch

This branch (`gh-pages`) contains **only the compiled static site**. It is served by
GitHub Pages from the branch root at https://theoop.github.io/TRU-SYDS/

Do not edit files here by hand — they are build output and will be overwritten.
All source lives on the `main` branch.

## Layout

```
index.html            entry point (must stay at the branch root)
404.html              copy of index.html so unknown paths still render the app
                      (works for one-level paths like /TRU-SYDS/foo; deeper paths
                      resolve ./static/ against the wrong base. The app has no
                      router, so no real route is affected.)
asset-manifest.json   CRA build manifest
static/               hashed js/css bundles
.nojekyll             disables Jekyll so paths like _* are served verbatim
```

## Redeploying

From `main`:

```bash
cd frontend
yarn install
yarn build          # craco build -> frontend/build/
```

Then publish the **contents** of `frontend/build/` to the root of this branch:

```bash
git checkout gh-pages
cp -R frontend/build/. .
touch .nojekyll
cp index.html 404.html
git add -A && git commit -m "Deploy static build" && git push origin gh-pages
```

The contents of `build/` go at the root — not the `build` folder itself. Nesting the
site one level down is what causes a 404 from Pages.

## Why asset paths are relative

`frontend/package.json` sets `"homepage": "."`, so the build emits `./static/...`
references. That is required here because the site is served from the `/TRU-SYDS/`
sub-path rather than a domain root. If `homepage` is ever removed, CRA emits
absolute `/static/...` paths that resolve to `theoop.github.io/static/...` and every
asset 404s — keep it as `"."`.
