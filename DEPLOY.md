# Deploying Paveesh's portfolio

This archive contains the Vite source project and a ready-built `dist/` site. It does not include `node_modules`.

## Vercel

1. Extract the ZIP and push the extracted project to a Git repository.
2. Import that repository in Vercel. Vercel detects Vite automatically; otherwise use `npm run build` as the build command and `dist` as the output directory.

## Render

1. Extract the ZIP and push the extracted project to a Git repository.
2. In Render, create a **Static Site** from that repository.
3. Set the build command to `npm ci && npm run build` and the publish directory to `dist`.

## Local preview

Run `npm ci`, then `npm run dev` for development. To preview the production build locally, run `npm run preview` after building.
