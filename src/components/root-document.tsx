import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource-variable/montserrat";
import "@/app/globals.css";
import {LanguageProvider} from "@/components/language";
import {FragmentFocus} from "@/components/fragment-focus";
import {MotionReveal} from "@/components/motion-reveal";
import {SiteStructuredData} from "@/components/site-structured-data";
import type {Locale} from "@/lib/locale";

/** Shared <html> shell for the English and Marathi root layouts, so each serves the right lang attribute from the server. */
export function RootDocument({lang,children}:{lang:Locale;children:React.ReactNode}){
  return <html lang={lang} data-scroll-behavior="smooth"><body suppressHydrationWarning><SiteStructuredData/><LanguageProvider language={lang}><FragmentFocus/><MotionReveal/>{children}</LanguageProvider></body></html>;
}
