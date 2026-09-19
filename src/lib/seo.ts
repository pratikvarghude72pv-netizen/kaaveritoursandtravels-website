import type {Metadata} from "next";
import {siteData} from "@/lib/site-data";
import {languageAlternatePaths,localizedPath,type Locale} from "@/lib/locale";

export const SITE_ORIGIN="https://www.kaaveritoursandtravels.com" as const;
export const SOCIAL_IMAGE_PATH="/social/kaaveri-share.png" as const;

export const canonicalRoutes={
  "/":{title:"Kaaveri Tours and Travels",description:"Tourism, one-way and corporate transportation enquiries from Chhatrapati Sambhajinagar, Maharashtra."},
  "/about":{title:"About Kaaveri Tours and Travels",description:"Learn how Kaaveri handles tourism, one-way and corporate transportation enquiries through clear, direct conversations."},
  "/tourism":{title:"Maharashtra Tourism Travel Enquiries",description:"Explore Ajanta, Ellora, Ghrishneshwar, Trimbakeshwar and Bhimashankar, then send your travel requirement."},
  "/one-way-travel":{title:"One-Way Travel Enquiries",description:"Send your route, travel date and passenger details for a one-way travel enquiry with Kaaveri."},
  "/corporate-travel":{title:"Corporate Transportation Enquiries",description:"Discuss employee, team and business transportation requirements with Kaaveri Tours and Travels."},
  "/contact":{title:"Contact Kaaveri Tours and Travels",description:"Send a travel enquiry or contact Kaaveri by WhatsApp, phone or email in Chhatrapati Sambhajinagar."}
} as const;

export type CanonicalPath=keyof typeof canonicalRoutes;

export function absoluteUrl(path:CanonicalPath|`/${string}`){
  const url=new URL(path,SITE_ORIGIN);
  if(url.origin!==SITE_ORIGIN||url.search||url.hash) throw new Error(`Invalid canonical path: ${path}`);
  if(url.pathname!=="/"&&url.pathname.endsWith("/")) url.pathname=url.pathname.replace(/\/+$/,"");
  return url.toString();
}

export function isProductionIndexable(env:string|undefined=process.env.VERCEL_ENV){
  return env==="production";
}

export function robotsPolicy(env?:string):Metadata["robots"]{
  return isProductionIndexable(env)
    ? {index:true,follow:true}
    : {index:false,follow:false,noarchive:true};
}

export function createRouteMetadata(path:CanonicalPath,locale:Locale="en"):Metadata{
  const route=canonicalRoutes[path];
  const canonical=absoluteUrl(localizedPath(path,locale));
  const image=absoluteUrl(SOCIAL_IMAGE_PATH);
  return {
    title:route.title,
    description:route.description,
    alternates:{canonical,languages:Object.fromEntries(Object.entries(languageAlternatePaths(path)).map(([key,value])=>[key,absoluteUrl(value)]))},
    robots:robotsPolicy(),
    openGraph:{type:"website",siteName:siteData.name,url:canonical,title:route.title,description:route.description,images:[{url:image,width:1200,height:630,alt:siteData.name}]},
    twitter:{card:"summary_large_image",title:route.title,description:route.description,images:[image]}
  };
}
