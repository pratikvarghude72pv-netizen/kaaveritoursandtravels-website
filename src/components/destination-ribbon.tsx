"use client";
import {useLanguage} from "@/components/language";
import {destinations} from "@/lib/destinations";

/** Slow marquee of the five destinations with their distances. Decorative; the same links exist in the page body. */
export function DestinationRibbon(){
  const {language}=useLanguage();
  return <div className="destination-ribbon" aria-hidden="true"><div className="ribbon-track">
    {[0,1,2].flatMap(copy=>destinations.map(d=><span key={`${copy}-${d.id}`} className="ribbon-item"><b>{d.name[language]}</b><small>{d.distance[language]}</small><i/></span>))}
  </div></div>;
}
