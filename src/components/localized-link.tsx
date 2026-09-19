"use client";

import Link,{type LinkProps} from "next/link";
import {useLanguage} from "@/components/language";
import {localizedPath,type Locale} from "@/lib/locale";
import type {CanonicalPath} from "@/lib/seo";

function localizeHref(href:string,locale:Locale){
  const match=href.match(/^(\/|\/about|\/tourism|\/one-way-travel|\/corporate-travel|\/contact)(?=\?|#|$)/);
  if(!match)return href;
  return `${localizedPath(match[1] as CanonicalPath,locale)}${href.slice(match[1].length)}`;
}

export function LocalizedLink({href,...props}:Omit<React.ComponentProps<typeof Link>,"href">&{href:string}){
  const {language}=useLanguage();
  return <Link href={localizeHref(href,language) as LinkProps["href"]} {...props}/>;
}
