# Paveesh M — Portfolio

A responsive React portfolio built around the AETHER project interface. ReactBits components provide the Gooey Nav, Pixel Blast backdrop, Jelly Radio skill categories, Halftone Reveal portrait, Star Border contact actions, and 3D Lanyard ID card. The page also includes project filters and detail dialogs, an education timeline, achievements, and responsive navigation.

## Run locally

To open the site on Windows, double-click `start-portfolio.bat`. It starts the local site and opens it in your browser. You can also open a terminal in this folder and run `npm run dev`, then visit the local address Vite prints (usually `http://localhost:5173`). Do not open `index.html` directly from File Explorer: React/Vite pages need to be served over a local web address. Run `npm run build` to create a production build. Google Fonts need an internet connection; system sans-serif fallbacks are provided.

## Personal details

The profile image is stored at `public/images/paveesh-profile.jpeg` and is used by both the Halftone Reveal portrait and the Lanyard card. Replace it to update both locations. Portfolio content is in `src/portfolio-template.html`; project details and skill groups are in `src/App.jsx`.
