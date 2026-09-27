import type {Metadata,Viewport} from "next";
import {RootDocument} from "@/components/root-document";
import {rootMetadata,rootViewport} from "@/lib/seo";

export const metadata:Metadata=rootMetadata("en");
export const viewport:Viewport=rootViewport;

export default function EnglishRootLayout({children}:{children:React.ReactNode}){
  return <RootDocument lang="en">{children}</RootDocument>;
}
