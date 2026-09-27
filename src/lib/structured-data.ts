import {businessData} from "@/lib/business-data";
import {localizedPath,type Locale} from "@/lib/locale";
import {absoluteUrl,type CanonicalPath} from "@/lib/seo";
import {answerContent,type AnswerIntent} from "@/lib/answer-content";
import {destinations} from "@/lib/destinations";

const labels={en:{home:"Home",about:"About",tourism:"Tourism",oneWay:"One-way travel",corporate:"Employee transport",vehicles:"Vehicles",contact:"Contact"},mr:{home:"मुख्यपृष्ठ",about:"आमच्याबद्दल",tourism:"पर्यटन",oneWay:"एकमार्गी प्रवास",corporate:"कर्मचारी वाहतूक",vehicles:"वाहने",contact:"संपर्क"}} as const;
const pageLabels:Record<Exclude<CanonicalPath,"/">,keyof typeof labels.en> = {"/about":"about","/tourism":"tourism","/one-way-travel":"oneWay","/corporate-travel":"corporate","/vehicles":"vehicles","/contact":"contact"};

const serviceDescriptions={
  en:{tourism:"Trips from Chhatrapati Sambhajinagar to Ellora, Ghrishneshwar, Ajanta, Trimbakeshwar and Bhimashankar in a sedan or seven-seater SUV, planned around the visitor's date and group.",oneWay:"Point-to-point travel from Chhatrapati Sambhajinagar to another city, station or airport, in a sedan or seven-seater SUV.",corporate:"Regular employee pickup and drop, including shift work, for offices and plants in and around Chhatrapati Sambhajinagar."},
  mr:{tourism:"छत्रपती संभाजीनगरहून वेरूळ, घृष्णेश्वर, अजिंठा, त्र्यंबकेश्वर आणि भीमाशंकरच्या सहली, सेडान किंवा सात आसनी एसयूव्हीमध्ये, तारीख आणि गटानुसार आखलेल्या.",oneWay:"छत्रपती संभाजीनगरहून दुसऱ्या शहर, स्टेशन किंवा विमानतळापर्यंत सेडान किंवा सात आसनी एसयूव्हीने एकमार्गी प्रवास.",corporate:"छत्रपती संभाजीनगर आणि परिसरातील ऑफिस व प्लांटसाठी नियमित कर्मचारी पिकअप आणि ड्रॉप, शिफ्टच्या कामासह."}
} as const;
const services={
  "/tourism":{en:{name:"Heritage and temple trips",type:"Tour arrangement"},mr:{name:"वारसा आणि मंदिर सहली",type:"सहल आयोजन"},key:"tourism"},
  "/one-way-travel":{en:{name:"One-way travel",type:"Taxi service"},mr:{name:"एकमार्गी प्रवास",type:"टॅक्सी सेवा"},key:"oneWay"},
  "/corporate-travel":{en:{name:"Employee transport",type:"Employee transportation"},mr:{name:"कर्मचारी वाहतूक",type:"कर्मचारी वाहतूक"},key:"corporate"}
} as const;

/** Questions each page shows in its "Good to know" section. Keep in sync with <FaqSection/> / <AnswerPanel/> usage. */
export const pageAnswers:Partial<Record<CanonicalPath,AnswerIntent[]>>={"/":["home"],"/tourism":["distances","bestTime"],"/one-way-travel":["oneWay"],"/corporate-travel":["corporate"],"/vehicles":["vehicles"],"/contact":["contact"]};

const url=(path:CanonicalPath,locale:Locale)=>absoluteUrl(localizedPath(path,locale));
const areaServed=[{"@type":"City",name:"Chhatrapati Sambhajinagar"},{"@type":"State",name:"Maharashtra"}];

export function siteGraph(){
  return {"@context":"https://schema.org","@graph":[
    {"@type":"TravelAgency","@id":`${businessData.url}#business`,name:businessData.name,alternateName:businessData.alternateName,url:businessData.url,logo:businessData.logo,image:businessData.image,address:{"@type":"PostalAddress",...businessData.address},telephone:businessData.telephone,email:businessData.email,areaServed,knowsLanguage:["en","mr"],
      contactPoint:[
        {"@type":"ContactPoint",telephone:businessData.telephone,contactType:"customer service",areaServed:"IN",availableLanguage:["English","Marathi"]},
        {"@type":"ContactPoint",telephone:businessData.secondaryTelephone,contactType:"customer service",areaServed:"IN",availableLanguage:["English","Marathi"]}
      ],
      ...(businessData.sameAs.length?{sameAs:businessData.sameAs}:{})},
    {"@type":"WebSite","@id":`${businessData.url}#website`,url:businessData.url,name:businessData.name,inLanguage:["en-IN","mr-IN"],publisher:{"@id":`${businessData.url}#business`}}
  ]};
}

export function serviceGraph(path:keyof typeof services,locale:Locale){
  const service=services[path];
  return {"@context":"https://schema.org","@type":"Service","@id":`${url(path,locale)}#service`,url:url(path,locale),name:service[locale].name,serviceType:service[locale].type,description:serviceDescriptions[locale][service.key],areaServed,inLanguage:locale==="mr"?"mr-IN":"en-IN",provider:{"@id":`${businessData.url}#business`}};
}

export function faqGraph(path:CanonicalPath,locale:Locale){
  const intents=pageAnswers[path];
  if(!intents?.length)return null;
  return {"@context":"https://schema.org","@type":"FAQPage","@id":`${url(path,locale)}#faq`,inLanguage:locale==="mr"?"mr-IN":"en-IN",mainEntity:intents.map(intent=>{const answer=answerContent[intent][locale];return {"@type":"Question",name:answer.heading,acceptedAnswer:{"@type":"Answer",text:answer.body}}})};
}

export function breadcrumbItems(path:Exclude<CanonicalPath,"/">,locale:Locale){
  return [{name:labels[locale].home,url:url("/",locale)},{name:labels[locale][pageLabels[path]],url:url(path,locale)}];
}

export function breadcrumbGraph(path:Exclude<CanonicalPath,"/">,locale:Locale){
  return {"@context":"https://schema.org","@type":"BreadcrumbList","@id":`${url(path,locale)}#breadcrumb`,itemListElement:breadcrumbItems(path,locale).map((item,index)=>({"@type":"ListItem",position:index+1,name:item.name,item:item.url}))};
}

/** The five destinations as TouristAttraction items, for search and answer engines. */
export function destinationsGraph(locale:Locale){
  return {"@context":"https://schema.org","@type":"ItemList","@id":`${url("/tourism",locale)}#destinations`,name:locale==="mr"?"छत्रपती संभाजीनगरहून सहलीची स्थळे":"Trip destinations from Chhatrapati Sambhajinagar",itemListOrder:"https://schema.org/ItemListOrderAscending",
    itemListElement:destinations.map((d,i)=>({"@type":"ListItem",position:i+1,item:{"@type":"TouristAttraction",name:d.name[locale],description:`${d.copy[locale]} ${locale==="mr"?`शहरापासून ${d.distance.mr}.`:`About ${d.distance.en.replace("approx. ","")} from the city.`}`,url:`${url("/tourism",locale)}#${d.id}`,image:absoluteUrl(d.image.src as `/${string}`),containedInPlace:{"@type":"State",name:"Maharashtra"}}}))};
}
