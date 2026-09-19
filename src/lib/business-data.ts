import {siteData} from "@/lib/site-data";
import {absoluteUrl} from "@/lib/seo";

export const businessData={
  name:siteData.name,
  url:absoluteUrl("/"),
  logo:absoluteUrl("/brand/kaaveri-logo-primary.png"),
  address:{
    streetAddress:"Shop No. 1, Jeevan Sneha Apartment, New SBH Colony, Jyoti Nagar, Near AMC Water Tank",
    addressLocality:"Chhatrapati Sambhajinagar",
    addressRegion:"Maharashtra",
    addressCountry:"IN"
  },
  telephone:[siteData.phone,siteData.secondaryPhone],
  email:siteData.email
} as const;
