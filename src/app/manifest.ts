import type {MetadataRoute} from "next";
import {siteData} from "@/lib/site-data";

export default function manifest():MetadataRoute.Manifest{
  return {
    name:siteData.name,
    short_name:"Kaaveri",
    description:"Tourism, one-way and corporate transportation enquiries from Chhatrapati Sambhajinagar, Maharashtra.",
    start_url:"/",
    display:"browser",
    background_color:"#f5f0e6",
    theme_color:"#111312",
    icons:[
      {src:"/icons/icon-192.png",sizes:"192x192",type:"image/png"},
      {src:"/icons/icon-512.png",sizes:"512x512",type:"image/png"}
    ]
  };
}
