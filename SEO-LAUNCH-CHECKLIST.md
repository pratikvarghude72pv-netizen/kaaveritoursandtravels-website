# Kaaveri search launch checklist

This site is intentionally **noindex by default**. That prevents a Vercel preview, a typo domain, or a half-finished deployment from being indexed. Turn indexing on only after the correct domain is live.

## 1. Connect the correct domain

1. Buy `kaaveritoursandtravels.com` (not the earlier misspelling).
2. In Vercel, add both `kaaveritoursandtravels.com` and `www.kaaveritoursandtravels.com` to this project.
3. Make `www.kaaveritoursandtravels.com` the Production domain. Configure the apex domain to redirect to `www`.
4. At Hostinger DNS, enter the exact A and CNAME records Vercel displays. Do not reuse the records from the misspelled domain.
5. Wait until Vercel marks both domains **Valid Configuration**, then test both addresses in an incognito window. The apex must land on `https://www.kaaveritoursandtravels.com`.

## 2. Enable search indexing only after step 1 works

In Vercel: **Project → Settings → Environment Variables**:

1. Add `NEXT_PUBLIC_ALLOW_INDEXING` with value `true` for **Production**.
2. Redeploy Production.
3. Confirm `https://www.kaaveritoursandtravels.com/robots.txt` allows `/` and `https://www.kaaveritoursandtravels.com/sitemap.xml` opens.

## 3. Prove site ownership and submit it

1. Open Google Search Console and add a **Domain** property: `kaaveritoursandtravels.com` (no `https`, no `www`).
2. Google gives you a TXT DNS record. Add it at Hostinger and verify. Keep that TXT record permanently.
3. In Search Console → Sitemaps, submit `https://www.kaaveritoursandtravels.com/sitemap.xml`.
4. Open Bing Webmaster Tools. Import the verified Search Console property, then submit the same sitemap.

If either service asks for an HTML meta-tag rather than DNS, save only the verification value in Vercel as `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` or `NEXT_PUBLIC_BING_SITE_VERIFICATION`, then redeploy.

## 4. Local and AI-search readiness

The code already publishes accurate TravelAgency, address, phone, email, service, breadcrumb, canonical, Marathi/English alternate, robots and sitemap data. Do not add ratings, prices, fleet claims, testimonials, office hours or coordinates unless they are real and approved.

After the domain is live, create or claim a Google Business Profile. Use the exact same public business name, address, phone numbers and website URL as this site. Add real exterior/interior/team/fleet photos, actual hours, an accurate service area, and respond to real reviews. This is the highest-value manual step for local discovery and AI answers.

## 5. Make enquiries actually arrive

The contact form needs a real email sender before launch. In Resend, verify a sender domain (for example, a mailbox at the new domain), create an API key, and add `RESEND_API_KEY` and `ENQUIRY_FROM_EMAIL` in Vercel Production environment variables. Then redeploy and send a real test enquiry.

## Ongoing monthly routine

- Check Search Console for indexing, sitemap and mobile issues.
- Check Bing Webmaster Tools for crawl issues.
- Keep Google Business Profile details, holiday hours, services and photos current.
- Publish only factual destination/service updates; never manufacture reviews or location pages.
