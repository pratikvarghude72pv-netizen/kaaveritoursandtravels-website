import {siteData} from "@/lib/site-data";
import {absoluteUrl} from "@/lib/seo";

export const businessData={
  name:siteData.name,
  alternateName:"कावेरी टूर्स अँड ट्रॅव्हल्स",
  url:absoluteUrl("/"),
  logo:absoluteUrl("/brand/kaaveri-logo.png"),
  image:absoluteUrl("/social/kaaveri-share.png"),
  address:{
    streetAddress:"Shop No. 1, Jeevan Sneha Apartment, New SBH Colony, Jyoti Nagar, Near AMC Water Tank",
    addressLocality:"Chhatrapati Sambhajinagar",
    addressRegion:"Maharashtra",
    // postalCode deliberately omitted until the owner confirms it (the public address has none).
    addressCountry:"IN"
  },
  telephone:siteData.phone,
  secondaryTelephone:siteData.secondaryPhone,
  email:siteData.email,
  // Social / Google Business Profile URLs go here once the owner supplies them.
  sameAs:[] as string[]
} as const;
