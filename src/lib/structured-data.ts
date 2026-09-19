import {businessData} from "@/lib/business-data";
import {localizedPath,type Locale} from "@/lib/locale";
import {absoluteUrl,type CanonicalPath} from "@/lib/seo";
import {answerContent} from "@/lib/answer-content";

const labels={en:{home:"Home",about:"About",tourism:"Tourism",oneWay:"One-way Travel",corporate:"Corporate Transportation",contact:"Contact"},mr:{home:"मुख्यपृष्ठ",about:"आमच्याबद्दल",tourism:"पर्यटन",oneWay:"एकमार्गी प्रवास",corporate:"कॉर्पोरेट वाहतूक",contact:"संपर्क"}} as const;
const pageLabels:Record<Exclude<CanonicalPath,"/">,keyof typeof labels.en>={"/about":"about","/tourism":"tourism","/one-way-travel":"oneWay","/corporate-travel":"corporate","/contact":"contact"};
const services={
  "/tourism":answerContent.tourism,
  "/one-way-travel":answerContent.oneWay,
  "/corporate-travel":answerContent.corporate
} as const;

const url=(path:CanonicalPath,locale:Locale)=>absoluteUrl(localizedPath(path,locale));

export function siteGraph(locale:Locale){
  return {"@context":"https://schema.org","@graph":[
    {"@type":"TravelAgency","@id":`${businessData.url}#business`,name:businessData.name,url:businessData.url,logo:businessData.logo,address:{"@type":"PostalAddress",...businessData.address},telephone:businessData.telephone,email:businessData.email},
    {"@type":"WebSite","@id":`${businessData.url}#website`,url:businessData.url,name:businessData.name,inLanguage:locale==="mr"?"mr-IN":"en-IN",publisher:{"@id":`${businessData.url}#business`}}
  ]};
}

export function serviceGraph(path:keyof typeof services,locale:Locale){
  const content=services[path][locale];
  return {"@context":"https://schema.org","@type":"Service","@id":`${url(path,locale)}#service`,url:url(path,locale),name:content.heading,description:content.body,inLanguage:locale==="mr"?"mr-IN":"en-IN",provider:{"@id":`${businessData.url}#business`}};
}

export function breadcrumbItems(path:Exclude<CanonicalPath,"/">,locale:Locale){
  return [{name:labels[locale].home,url:url("/",locale)},{name:labels[locale][pageLabels[path]],url:url(path,locale)}];
}

export function breadcrumbGraph(path:Exclude<CanonicalPath,"/">,locale:Locale){
  return {"@context":"https://schema.org","@type":"BreadcrumbList","@id":`${url(path,locale)}#breadcrumb`,itemListElement:breadcrumbItems(path,locale).map((item,index)=>({"@type":"ListItem",position:index+1,name:item.name,item:item.url}))};
}
