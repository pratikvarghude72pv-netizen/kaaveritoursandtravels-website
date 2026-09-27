import type {Metadata,Viewport} from "next";
import {RootDocument} from "@/components/root-document";
import {rootMetadata,rootViewport} from "@/lib/seo";

export const metadata:Metadata=rootMetadata("mr");
export const viewport:Viewport=rootViewport;

export default function MarathiRootLayout({children}:{children:React.ReactNode}){
  return <RootDocument lang="mr">{children}</RootDocument>;
}
