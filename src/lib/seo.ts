import type {Metadata,Viewport} from "next";
import {siteData} from "@/lib/site-data";
import {languageAlternatePaths,localizedPath,type Locale} from "@/lib/locale";

// Vercel serves the apex as the production domain; www currently has no valid certificate.
export const SITE_ORIGIN=siteData.origin;
export const SOCIAL_IMAGE_PATH="/social/kaaveri-share.png" as const;

const brand={en:siteData.name,mr:"कावेरी टूर्स अँड ट्रॅव्हल्स"} as const;

type RouteCopy={title:string;description:string};

export const canonicalRoutes={
  "/":{
    en:{title:"Kaaveri Tours and Travels, Chhatrapati Sambhajinagar",description:"Tours to Ajanta, Ellora and Jyotirlinga temples, one-way travel and employee transport from Chhatrapati Sambhajinagar (Aurangabad). Enquire on WhatsApp."},
    mr:{title:"कावेरी टूर्स अँड ट्रॅव्हल्स, छत्रपती संभाजीनगर",description:"छत्रपती संभाजीनगरहून अजिंठा, वेरूळ आणि ज्योतिर्लिंग सहली, एकमार्गी प्रवास आणि कर्मचारी वाहतूक. व्हॉट्सॲपवर चौकशी करा."}
  },
  "/about":{
    en:{title:"About Us",description:"Kaaveri Tours and Travels is a travel desk in Jyoti Nagar, Chhatrapati Sambhajinagar, arranging heritage trips, one-way travel and employee transport."},
    mr:{title:"आमच्याबद्दल",description:"कावेरी टूर्स अँड ट्रॅव्हल्स हे ज्योती नगर, छत्रपती संभाजीनगर येथील प्रवास कार्यालय आहे. वारसा सहली, एकमार्गी प्रवास आणि कर्मचारी वाहतुकीची व्यवस्था."}
  },
  "/tourism":{
    en:{title:"Ajanta, Ellora and Temple Trips",description:"Trips from Chhatrapati Sambhajinagar to Ellora, Ghrishneshwar, Ajanta, Trimbakeshwar and Bhimashankar. Send your date and group size."},
    mr:{title:"अजिंठा, वेरूळ, ज्योतिर्लिंग सहली",description:"छत्रपती संभाजीनगरहून अजिंठा, वेरूळ, घृष्णेश्वर, त्र्यंबकेश्वर आणि भीमाशंकर सहली. तारीख आणि प्रवाशांची संख्या पाठवा."}
  },
  "/one-way-travel":{
    en:{title:"One-Way Travel by Car",description:"Point-to-point travel from Chhatrapati Sambhajinagar by sedan or SUV. Send your pickup, drop, date and passenger count."},
    mr:{title:"एकमार्गी टॅक्सी प्रवास",description:"छत्रपती संभाजीनगरहून सेडान किंवा एसयूव्हीने एकमार्गी प्रवास. पिकअप, ड्रॉप, तारीख आणि प्रवासी संख्या पाठवा."}
  },
  "/corporate-travel":{
    en:{title:"Employee Transport for Companies",description:"Employee pickup, drop and shift transport for companies in Chhatrapati Sambhajinagar. Share your route, shift timings and headcount."},
    mr:{title:"कंपन्यांसाठी कर्मचारी वाहतूक",description:"छत्रपती संभाजीनगरमधील कंपन्यांसाठी कर्मचारी पिकअप, ड्रॉप आणि शिफ्ट वाहतूक. मार्ग, शिफ्टच्या वेळा आणि कर्मचारी संख्या सांगा."}
  },
  "/vehicles":{
    en:{title:"Sedan, SUV and Minibus Travel",description:"A sedan for up to four, a seven-seater SUV, or Kaaveri's own Tempo Traveller minibus for large groups travelling from Chhatrapati Sambhajinagar."},
    mr:{title:"सेडान, एसयूव्ही आणि मिनीबस प्रवास",description:"चार जणांसाठी सेडान, सात आसनी एसयूव्ही, किंवा मोठ्या गटांसाठी कावेरीची स्वतःची टेम्पो ट्रॅव्हलर मिनीबस. छत्रपती संभाजीनगरहून प्रवास."}
  },
  "/contact":{
    en:{title:"Contact and Travel Enquiry",description:`Send a travel enquiry or reach Kaaveri on WhatsApp at ${siteData.phone}, by phone or by email. Jyoti Nagar, Chhatrapati Sambhajinagar.`},
    mr:{title:"संपर्क आणि प्रवास चौकशी",description:`प्रवासाची चौकशी पाठवा किंवा ${siteData.phone} वर व्हॉट्सॲप, फोन किंवा ईमेलने कावेरीशी संपर्क करा. ज्योती नगर, छत्रपती संभाजीनगर.`}
  }
} as const satisfies Record<string,Record<Locale,RouteCopy>>;

export type CanonicalPath=keyof typeof canonicalRoutes;

export function absoluteUrl(path:CanonicalPath|`/${string}`){
  const url=new URL(path,SITE_ORIGIN);
  if(url.origin!==SITE_ORIGIN||url.search||url.hash) throw new Error(`Invalid canonical path: ${path}`);
  if(url.pathname!=="/"&&url.pathname.endsWith("/")) url.pathname=url.pathname.replace(/\/+$/,"");
  return url.toString();
}

export function isProductionIndexable(
  env:string|undefined=process.env.VERCEL_ENV,
  allowIndexing:string|undefined=process.env.NEXT_PUBLIC_ALLOW_INDEXING
){
  // A deployment can be public long before its final domain is ready. Keep every
  // preview (and an accidental production deployment) out of search until the
  // owner deliberately enables indexing after the canonical domain works.
  return env==="production"&&allowIndexing==="true";
}

export function robotsPolicy(env?:string):Metadata["robots"]{
  return isProductionIndexable(env)
    ? {index:true,follow:true}
    : {index:false,follow:false,noarchive:true};
}

const googleVerification=process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();
const bingVerification=process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION?.trim();

export function rootMetadata(locale:Locale):Metadata{
  const home=canonicalRoutes["/"][locale];
  return {
    metadataBase:new URL(SITE_ORIGIN),
    title:{default:home.title,template:`%s | ${brand[locale]}`},
    description:home.description,
    applicationName:siteData.name,
    creator:siteData.name,
    publisher:siteData.name,
    manifest:"/manifest.webmanifest",
    formatDetection:{telephone:false,email:false,address:false},
    robots:robotsPolicy(),
    verification:googleVerification||bingVerification?{
      ...(googleVerification?{google:googleVerification}:{}),
      ...(bingVerification?{other:{"msvalidate.01":bingVerification}}:{})
    }:undefined
  };
}

export const rootViewport:Viewport={width:"device-width",initialScale:1,viewportFit:"cover",themeColor:siteData.themeColor};

export function createRouteMetadata(path:CanonicalPath,locale:Locale="en"):Metadata{
  const route=canonicalRoutes[path][locale];
  const canonical=absoluteUrl(localizedPath(path,locale));
  const image=absoluteUrl(SOCIAL_IMAGE_PATH);
  const fullTitle=path==="/"?route.title:`${route.title} | ${brand[locale]}`;
  return {
    title:path==="/"?{absolute:route.title}:route.title,
    description:route.description,
    alternates:{canonical,languages:Object.fromEntries(Object.entries(languageAlternatePaths(path)).map(([key,value])=>[key,absoluteUrl(value)]))},
    robots:robotsPolicy(),
    openGraph:{type:"website",siteName:brand[locale],locale:locale==="mr"?"mr_IN":"en_IN",alternateLocale:locale==="mr"?["en_IN"]:["mr_IN"],url:canonical,title:fullTitle,description:route.description,images:[{url:image,width:1200,height:630,alt:brand[locale]}]},
    twitter:{card:"summary_large_image",title:fullTitle,description:route.description,images:[image]}
  };
}
