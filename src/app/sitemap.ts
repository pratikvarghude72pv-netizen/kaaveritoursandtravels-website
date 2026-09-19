import type {MetadataRoute} from "next";
import {absoluteUrl} from "@/lib/seo";
import {englishPaths,languageAlternatePaths,localizedPath} from "@/lib/locale";

export default function sitemap():MetadataRoute.Sitemap{
  return englishPaths.flatMap(path=>["en","mr"].map(locale=>({
    url:absoluteUrl(localizedPath(path,locale as "en"|"mr")),
    alternates:{languages:Object.fromEntries(Object.entries(languageAlternatePaths(path)).map(([key,value])=>[key,absoluteUrl(value)]))}
  })));
}
