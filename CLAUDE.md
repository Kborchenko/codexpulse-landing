# CodexPulse landing — Claude handoff

## Project

- Production: https://codexpulse.ru
- Repository: https://github.com/Kborchenko/codexpulse-landing
- Default branch: `main`
- Stack: React 19, Vite 6, plain CSS, Lucide React icons
- Package manager: pnpm

## Run and verify

```powershell
pnpm install
pnpm dev
pnpm build
```

The local development URL is normally `http://127.0.0.1:5173/`. Always run `pnpm build` before considering a change complete.

## File map

- `src/App.jsx` — page structure, copy, interactions, and data used by the visualizations.
- `src/styles.css` — the complete visual system and responsive layout.
- `src/main.jsx` — React entry point.
- `public/CNAME` — the production custom domain. Keep it set to `codexpulse.ru`.
- `.github/workflows/deploy-pages.yml` — GitHub Pages build and deployment.
- `.openai/hosting.json` — legacy hosting metadata; do not add credentials or tokens here.

## Product and design direction

CodexPulse is a dark, premium landing page for a design-led digital product studio. Preserve the established dark visual language, deliberate typography, restrained green accents, generous spacing, and data-rich feel. Avoid generic SaaS card grids, decorative clutter, fake customer claims, invented contacts, and placeholder copy.

Interactions must remain useful rather than decorative. Process controls and charts should be keyboard accessible, clearly clickable, and synchronized with the visible content. Keep the layout polished at desktop and mobile widths, especially around 390 px, with no horizontal overflow.

## Working rules

1. Read `src/App.jsx` and `src/styles.css` before changing the interface.
2. Preserve the current custom domain and GitHub Pages workflow unless the user explicitly asks for hosting changes.
3. Do not print, copy, request, or commit GitHub passwords, personal access tokens, browser cookies, DNS credentials, or other secrets. Use the existing local Git credential manager for authorized Git operations.
4. Do not commit generated `dist/` changes unless the user explicitly asks for them; GitHub Actions builds production automatically.
5. Check desktop and mobile behavior after UI changes, then run `pnpm build`.
6. Commit or push only when the user directly asks Claude to do so. Do not rewrite history or force-push.

## Current state

The live domain is connected to GitHub Pages and HTTPS is active. The latest baseline before this handoff is commit `154715d` (`Polish interactive process and mobile layout`).
