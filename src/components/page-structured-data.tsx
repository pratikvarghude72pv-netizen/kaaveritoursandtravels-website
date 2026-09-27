"use client";

import {usePathname} from "next/navigation";
import {useLanguage} from "@/components/language";
import {Breadcrumbs} from "@/components/breadcrumbs";
import {StructuredData} from "@/components/structured-data";
import {canonicalPathFor} from "@/lib/locale";
import {breadcrumbGraph,destinationsGraph,faqGraph,serviceGraph} from "@/lib/structured-data";

const servicePaths=new Set(["/tourism","/one-way-travel","/corporate-travel"]);

export function PageStructuredData(){
  const pathname=usePathname();
  const {language}=useLanguage();
  const path=canonicalPathFor(pathname);
  const faq=faqGraph(path,language);
  return <>
    {servicePaths.has(path)&&<StructuredData data={serviceGraph(path as "/tourism"|"/one-way-travel"|"/corporate-travel",language)}/>}
    {faq&&<StructuredData data={faq}/>}
    {path==="/tourism"&&<StructuredData data={destinationsGraph(language)}/>}
    {path!=="/"&&<><StructuredData data={breadcrumbGraph(path,language)}/><Breadcrumbs path={path} locale={language}/></>}
  </>;
}
