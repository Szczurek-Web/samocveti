This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Deployment notes (Vercel / Render / Neon)

### Current architecture

- This project is a **Next.js App Router storefront**.
- Product catalog and blog content are currently stored in local TypeScript files:
  - `src/data/products.ts`
  - `src/data/blog.ts`
- Cart/favorites state is client-side in Zustand with browser persistence (`localStorage`).
- There are no API routes, no server actions, and no database adapter in the current codebase.

### Do you need Neon database now?

**Short answer:** not for the current version.

You only need Neon (or any DB) if you plan to add:
- admin panel / CMS for editing catalog and blog;
- real checkout/orders/users;
- inventory/stock sync;
- analytics or event storage on the backend.

For a static/demo storefront, Vercel or Render works without a database.

### Deploy to Vercel (recommended for Next.js)

1. Push repository to GitHub/GitLab/Bitbucket.
2. In Vercel: **New Project** -> import repository.
3. Build settings (usually auto-detected):
   - Build command: `npm run build`
   - Output: Next.js default
4. Set Node version to modern LTS (20+ recommended).
5. Deploy.

Notes:
- Vercel is the native platform for Next.js and gives best DX for App Router features.
- If builds fail on Google Fonts fetch, consider self-hosting fonts via `next/font/local`.

### Deploy to Render

Use a **Web Service** (not Static Site), because this app is rendered by Next.js runtime.

Suggested settings:
- Environment: Node
- Build command: `npm ci && npm run build`
- Start command: `npm run start`
- Node version: 20+

Render can run this app successfully, but Next.js-specific platform optimizations are generally better on Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
