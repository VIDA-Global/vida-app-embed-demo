This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Environment Variables

Create a `.env.local` file based on `.env.example` and add your Vida API token
and reseller ID. The variables `VIDA_API_TOKEN` and `VIDA_RESELLER_ID` are used
by the `/api/vida` route to call Vida's APIs for fetching and creating
organizations. The reseller ID identifies the reseller account under which new
organizations are created when an account is missing in Vida.

## Vida integration API route

The endpoint at `/api/vida` shows how to embed Vida into your own
application. It performs the following steps:

1. Look up the user's account in Vida based on the `externalAccountId`.
2. Create a new organization in Vida when the account does not exist.
3. Request a one‑time authentication token that can be passed to the Vida
   embed script.

See `app/api/vida/route.js` for the full implementation and the helper
functions in `lib/vida.js`.
