import type {MetadataRoute} from "next";
import {SITE_ORIGIN,isProductionIndexable} from "@/lib/seo";

export default function robots():MetadataRoute.Robots{
  if(!isProductionIndexable()) return {rules:{userAgent:"*",disallow:"/"}};
  return {rules:[{userAgent:"*",allow:"/"},{userAgent:"OAI-SearchBot",allow:"/"}],sitemap:`${SITE_ORIGIN}/sitemap.xml`,host:SITE_ORIGIN};
}
