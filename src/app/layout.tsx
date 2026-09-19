import type {Metadata,Viewport} from "next";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/playfair-display/500.css";
import "./globals.css";
import {LanguageProvider} from "@/components/language";
import {FragmentFocus} from "@/components/fragment-focus";
import {MotionReveal} from "@/components/motion-reveal";
import {SITE_ORIGIN,robotsPolicy} from "@/lib/seo";
import {siteData} from "@/lib/site-data";

export const metadata:Metadata={
  metadataBase:new URL(SITE_ORIGIN),
  title:siteData.name,
  description:"Tourism, one-way and corporate transportation enquiries from Chhatrapati Sambhajinagar, Maharashtra.",
  applicationName:siteData.name,
  creator:siteData.name,
  publisher:siteData.name,
  manifest:"/manifest.webmanifest",
  icons:{icon:[{url:"/icons/favicon-16x16.png",sizes:"16x16",type:"image/png"},{url:"/icons/favicon-32x32.png",sizes:"32x32",type:"image/png"}],apple:[{url:"/icons/apple-touch-icon.png",sizes:"180x180",type:"image/png"}]},
  formatDetection:{telephone:false,email:false,address:false},
  robots:robotsPolicy()
};

export const viewport:Viewport={
  width:"device-width",
  initialScale:1,
  viewportFit:"cover"
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="en" data-scroll-behavior="smooth"><body suppressHydrationWarning><LanguageProvider><FragmentFocus/><MotionReveal/>{children}</LanguageProvider></body></html>;
}
