# Render scripts (demo product imagery)

Placeholder product images were rendered with Blender Cycles via the `bpy` Python module.

1. `node engrave.js` — renders Arabic engraving masks (white on transparent) to `tex/` with Playwright.
2. `python scenes.py <scene> [...]` — builds and renders scenes to `out/` (`pip install bpy`).
   Env: `PCT=40 QUICK=1` for fast previews, `SAMPLES=110` for final quality.
3. `node ../../scripts/import-renders.mjs out/` then `npm run images`.

Replace with real product photography when available (see main README).
