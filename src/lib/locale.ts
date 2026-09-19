import type {CanonicalPath} from "@/lib/seo";

export type Locale="en"|"mr";
export const locales=["en","mr"] as const;
export const englishPaths=["/","/about","/tourism","/one-way-travel","/corporate-travel","/contact"] as const satisfies readonly CanonicalPath[];

export function localizedPath(path:CanonicalPath,locale:Locale):`/${string}`{
  if(locale==="en")return path;
  return path==="/"?"/mr":`/mr${path}`;
}

export function localeForPath(pathname:string):Locale{
  return pathname==="/mr"||pathname.startsWith("/mr/")?"mr":"en";
}

export function canonicalPathFor(pathname:string):CanonicalPath{
  const normalized=pathname==="/mr"?"/":pathname.startsWith("/mr/")?pathname.slice(3):pathname;
  if((englishPaths as readonly string[]).includes(normalized))return normalized as CanonicalPath;
  throw new Error(`Unknown localized path: ${pathname}`);
}

export function languageAlternatePaths(path:CanonicalPath):Record<"en-IN"|"mr-IN"|"x-default",`/${string}`>{
  return {
    "en-IN":localizedPath(path,"en"),
    "mr-IN":localizedPath(path,"mr"),
    "x-default":localizedPath(path,"en")
  };
}
