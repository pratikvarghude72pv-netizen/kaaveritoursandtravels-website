# Kaaveri Tours and Travels

Production website for **Kaaveri Tours and Travels**, built with Next.js.

## Local development

```bash
npm install
npm run dev
```

Production verification:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Enquiry delivery

The form returns a truthful unavailable state until these server-only environment variables are configured:

- `RESEND_API_KEY`
- `ENQUIRY_FROM_EMAIL`

Never expose either value through a `NEXT_PUBLIC_` variable or commit secrets to the repository.

## Production domain

Canonical origin: `https://www.kaaveritoursandtravels.com`

The apex domain should permanently redirect to the canonical `www` origin after deployment.
