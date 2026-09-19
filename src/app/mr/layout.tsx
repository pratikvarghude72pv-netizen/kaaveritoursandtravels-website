import {LanguageProvider} from "@/components/language";

export default function MarathiLayout({children}:{children:React.ReactNode}){
  return <LanguageProvider language="mr"><div lang="mr">{children}</div></LanguageProvider>;
}
