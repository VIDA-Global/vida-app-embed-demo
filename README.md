# Vida App Embed Demo

This project demonstrates how resellers of Vida can embed the [Vida](https://vida.io) web app inside a Next.js application. It walks through provisioning organizations under a reseller account, obtaining one-time authentication tokens and loading the Vida app within an iframe. A minimal email/password authentication flow is provided along with an example of triggering a phone call using Vida's embed script.

## Running the project

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Configuration

Copy `.env.example` to `.env.local` and provide your Vida credentials and settings:

- `VIDA_API_TOKEN` – API token with access to Vida's public API (server)
- `VIDA_RESELLER_ID` – your reseller ID used when creating organizations (servery)
- `VIDA_API_BASE_URL` – base URL for Vida's public API (server)
- `NEXT_PUBLIC_APP_NAME` – name shown in the UI (exposed to the client)
- `NEXT_PUBLIC_VIDA_EMBED_BASE_URL` – Vida web app base used for the iframe (client)
- `NEXT_PUBLIC_VIDA_BUTTON_SCRIPT_SRC` – Vida embed script URL (client)
- `NEXT_PUBLIC_VIDA_TARGET` – default target/username for the demo button (client)

These values are used by `app/api/vida/route.js` when calling Vida's API. They ensure that any organizations created through the demo are associated with your reseller account.

## How embedding works

1. When an authenticated user visits `/home`, the `ClientHome` component requests `/api/vida`. This endpoint uses `VIDA_API_TOKEN` and `VIDA_RESELLER_ID` to fetch or create an organization under your reseller account and to obtain a one‑time authentication token.
2. The token and the user's email are passed to an `<iframe>` pointing at the Vida web app (configured with `NEXT_PUBLIC_VIDA_EMBED_BASE_URL`). This automatically logs the user into Vida inside your application.
3. The landing page also contains a button with the `data-vida-button` attribute. Vida's embed script (loaded globally in `app/layout.js`) turns this into a clickable call button.

See comments in the source files for further details on how each piece works:

- `app/api/vida/route.js` – proxy route that interacts with Vida's API
- `lib/vida.js` – small helper for GET/POST requests to Vida
- `app/home/client-home.jsx` – embeds the Vida app iframe
- `app/modalDemo/client-home.jsx` – opens a Vida modal on button click

## Deploying

The app is a standard Next.js project and can be deployed anywhere Next.js is supported, for example [Vercel](https://vercel.com/). Ensure the environment variables above are configured in your hosting environment.
