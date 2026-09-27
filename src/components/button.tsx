"use client";

import {LocalizedLink} from "@/components/localized-link";
import {Icon,type IconName} from "@/components/icons";
import {useBilingual} from "@/components/language";

type Variant="primary"|"navy"|"light"|"ghost"|"whatsapp";
type Copy=string|{en:string;mr:string};
type Common={icon:IconName;variant?:Variant;size?:"md"|"sm";className?:string;label?:Copy;children:React.ReactNode};

/**
 * The one button style on the site: a short label and an icon in a pill.
 * `label` gives screen readers the full context when the visible text is short; it must start with the visible words
 * (e.g. visible "Enquire", label "Enquire about the sedan").
 * Internal hrefs go through LocalizedLink so they stay in the current language; http(s), tel: and mailto: render as <a>.
 */
export function Btn({href,icon,variant="primary",size="md",className="",label,children,newTab}:Common&{href:string;newTab?:boolean}){
  const text=useBilingual();
  const cls=`btn btn-${variant}${size==="sm"?" btn-sm":""} ${className}`.trim();
  const aria=label?text(label):undefined;
  const inner=<><span className="btn-label">{children}</span><span className="btn-icon"><Icon name={icon} size={size==="sm"?15:17}/></span></>;
  if(href.startsWith("/"))return <LocalizedLink className={cls} href={href} aria-label={aria}>{inner}</LocalizedLink>;
  const external=newTab??href.startsWith("http");
  return <a className={cls} href={href} aria-label={aria} {...(external?{target:"_blank",rel:"noreferrer"}:{})}>{inner}</a>;
}
