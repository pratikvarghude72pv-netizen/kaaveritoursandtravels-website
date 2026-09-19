import Link from "next/link";
import {breadcrumbItems} from "@/lib/structured-data";
import type {Locale} from "@/lib/locale";
import type {CanonicalPath} from "@/lib/seo";

export function Breadcrumbs({path,locale}:{path:Exclude<CanonicalPath,"/">;locale:Locale}){
  const items=breadcrumbItems(path,locale);
  return <nav className="breadcrumbs shell" aria-label={locale==="mr"?"ब्रेडक्रंब":"Breadcrumb"}><ol>{items.map((item,index)=><li key={item.url}>{index<items.length-1?<Link href={new URL(item.url).pathname}>{item.name}</Link>:<span aria-current="page">{item.name}</span>}</li>)}</ol></nav>;
}
