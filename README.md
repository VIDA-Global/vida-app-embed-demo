# Vida App Embed Demo

This project demonstrates how to embed the [Vida](https://vida.io) web app inside a Next.js application. It also includes a simple email/password authentication flow and shows how to trigger a demo phone call using Vida's embed script.

## Running the project

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Configuration

Copy `.env.example` to `.env.local` and provide your Vida credentials:

- `VIDA_API_TOKEN` – API token with access to Vida's public API
- `VIDA_RESELLER_ID` – reseller ID used when creating organizations

These values are used by `app/api/vida/route.js` when calling Vida's API.

## How embedding works

1. When an authenticated user visits `/home`, the `ClientHome` component requests `/api/vida` to fetch or create the user's organization in Vida. The endpoint also requests a one‑time authentication token.
2. The one‑time token and the user's email are passed to an `<iframe>` pointing at the Vida web app (`VIDA_EMBED_BASE_URL`). This logs the user into Vida automatically.
3. The landing page contains a button with the `data-vida-button` attribute. Vida's embed script (loaded globally in `app/layout.js`) turns this into a clickable call button.

See comments in the source files for further details on how each piece works:

- `app/api/vida/route.js` – proxy route that interacts with Vida's API
- `lib/vida.js` – small helper for GET/POST requests to Vida
- `app/home/client-home.jsx` – embeds the Vida app iframe

## Deploying

The app is a standard Next.js project and can be deployed anywhere Next.js is supported, for example [Vercel](https://vercel.com/). Ensure the environment variables above are configured in your hosting environment.
