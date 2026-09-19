"use client";

import {createContext,useContext,useEffect} from "react";
import {usePathname} from "next/navigation";
import {localeForPath} from "@/lib/locale";

export type Language = "en"|"mr";

type LanguageContextValue = {
  language: Language;
};

const LanguageContext=createContext<LanguageContextValue|undefined>(undefined);

export function LanguageProvider({children,language="en"}:{children:React.ReactNode;language?:Language}){
  const pathname=usePathname();
  useEffect(()=>{
    document.documentElement.lang=localeForPath(pathname);
  },[pathname]);

  return <LanguageContext.Provider value={{language}}>{children}</LanguageContext.Provider>;
}

export function useLanguage(){
  const context=useContext(LanguageContext);
  if(!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}

export function BilingualText({en,mr}:{en:string;mr:string}){
  const {language}=useLanguage();
  return <>{language==="mr"?mr:en}</>;
}
