"use client";

import {createContext,useContext} from "react";

export type Language = "en"|"mr";

type LanguageContextValue = {
  language: Language;
};

const LanguageContext=createContext<LanguageContextValue|undefined>(undefined);

// <html lang> is now set on the server by each language's root layout.
export function LanguageProvider({children,language="en"}:{children:React.ReactNode;language?:Language}){
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

/** Plain-string version for attributes such as alt text, where a component cannot be used. */
export function useBilingual(){
  const {language}=useLanguage();
  return (value:string|{en:string;mr:string})=>typeof value==="string"?value:value[language];
}
