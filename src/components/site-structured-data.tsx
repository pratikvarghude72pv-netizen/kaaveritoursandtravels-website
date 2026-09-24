import {StructuredData} from "@/components/structured-data";
import {siteGraph} from "@/lib/structured-data";

/** A single server-rendered identity graph for search engines and AI crawlers. */
export function SiteStructuredData(){
  return <StructuredData data={siteGraph()}/>;
}
