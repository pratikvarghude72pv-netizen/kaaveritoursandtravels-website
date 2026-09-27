import type {MetadataRoute} from "next";
import {siteData} from "@/lib/site-data";

export default function manifest():MetadataRoute.Manifest{
  return {
    name:siteData.name,
    short_name:"Kaaveri",
    description:"Heritage trips, one-way travel and employee transport from Chhatrapati Sambhajinagar, Maharashtra.",
    start_url:"/",
    display:"browser",
    background_color:"#f8f5ef",
    theme_color:"#17283d",
    icons:[
      {src:"/icons/icon-192.png",sizes:"192x192",type:"image/png"},
      {src:"/icons/icon-512.png",sizes:"512x512",type:"image/png"}
    ]
  };
}
