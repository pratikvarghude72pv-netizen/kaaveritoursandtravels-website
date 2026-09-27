"use client";

import Image from "next/image";
import {useEffect,useRef,useState} from "react";
import {Btn} from "@/components/button";
import {Icon} from "@/components/icons";
import {useLanguage} from "@/components/language";
import {destinations} from "@/lib/destinations";

/** Tourism scroll story: the photo stays pinned while each destination's text scrolls past (desktop); stacked cards on mobile. */
export function DestinationStory(){
  const {language}=useLanguage();
  const [active,setActive]=useState(0);
  const steps=useRef<(HTMLElement|null)[]>([]);

  useEffect(()=>{
    const observer=new IntersectionObserver(entries=>{
      for(const entry of entries){
        if(entry.isIntersecting)setActive(Number((entry.target as HTMLElement).dataset.index));
      }
    },{rootMargin:"-45% 0px -45% 0px"});
    steps.current.forEach(step=>step&&observer.observe(step));
    return()=>observer.disconnect();
  },[]);

  const t=(en:string,mr:string)=>language==="mr"?mr:en;
  const num=(n:number)=>new Intl.NumberFormat(language==="mr"?"mr-IN":"en-IN",{minimumIntegerDigits:2}).format(n);
  return <section className={`destination-story tone-${active%2?"blue":"sand"}`} aria-label={t("Destinations","स्थळे")}>
    <div className="shell destination-story-grid">
      <div className="story-media" aria-hidden="true">
        <div className="story-media-frame">
          {destinations.map((d,i)=><div key={d.id} className={`story-media-item${i===active?" is-active":""}`}>
            <Image src={d.image} alt="" fill sizes="(max-width: 960px) 100vw, 50vw" placeholder="blur"/>
          </div>)}
          <div className="story-media-caption"><span>{num(active+1)} / {num(destinations.length)}</span><span>{destinations[active].name[language]}</span></div>
        </div>
        <ol className="story-progress">{destinations.map((d,i)=><li key={d.id} className={i<=active?"is-reached":""}/>)}</ol>
      </div>
      <div className="story-steps">
        {destinations.map((d,i)=>{
          return <article key={d.id} id={d.id} data-index={i} ref={el=>{steps.current[i]=el}} className={`story-step${i===active?" is-active":""}`} aria-labelledby={`${d.id}-heading`}>
            <div className="story-step-photo"><Image src={d.image} alt={d.alt[language]} fill sizes="100vw" placeholder="blur"/></div>
            <span className="story-step-index">{num(i+1)}</span>
            <p className="eyebrow">{d.tag[language]}</p>
            <h2 id={`${d.id}-heading`}>{d.name[language]}</h2>
            <div className="story-meta"><span className="meta-pill"><Icon name="route" size={15}/>{d.distance[language]}</span><span className="meta-pill"><Icon name="clock" size={15}/>{d.drive[language]}</span><span className="meta-pill"><Icon name="calendar" size={15}/>{d.duration[language]}</span>{d.closed&&<span className="meta-pill meta-warn">{d.closed.note[language]}</span>}</div>
            <p className="story-step-copy">{d.copy[language]}</p>
            <div className="story-step-actions"><Btn href={`/contact?service=tourism&destination=${encodeURIComponent(d.name.en)}#enquiry`} icon="arrow" label={{en:`Enquire about ${d.name.en}`,mr:`चौकशी करा: ${d.name.mr}`}}>{t("Enquire","चौकशी करा")}</Btn></div>
          </article>;
        })}
      </div>
    </div>
  </section>;
}
