"use client";

import Image from "next/image";
import {useCallback,useEffect,useRef,useState} from "react";
import {useLanguage} from "@/components/language";
import {Btn} from "@/components/button";
import {Icon} from "@/components/icons";
import {destinations} from "@/lib/destinations";

const INTERVAL=6500;

/**
 * Home page destinations carousel, nearest first.
 * Advances when the active thumbnail's progress bar finishes, so the bar and the slide change never drift apart.
 * Pauses on hover, keyboard focus, when scrolled out of view or the tab is hidden, and when the visitor presses pause.
 * With reduced motion it starts paused and slides change without zoom.
 */
export function DestinationCarousel(){
  const {language}=useLanguage();
  const t=(en:string,mr:string)=>language==="mr"?mr:en;
  const [index,setIndex]=useState(0);
  const [userPaused,setUserPaused]=useState(false);
  const [hover,setHover]=useState(false);
  const [focusWithin,setFocusWithin]=useState(false);
  const [visible,setVisible]=useState(false);
  const [reduced,setReduced]=useState(false);
  const root=useRef<HTMLElement>(null);
  const swipe=useRef<{x:number;y:number}|null>(null);
  const count=destinations.length;
  const num=(n:number)=>new Intl.NumberFormat(language==="mr"?"mr-IN":"en-IN",{minimumIntegerDigits:2}).format(n);

  useEffect(()=>{
    const media=matchMedia("(prefers-reduced-motion: reduce)");
    const apply=()=>setReduced(media.matches);
    apply();
    media.addEventListener("change",apply);
    const el=root.current;
    const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting&&!document.hidden),{threshold:.35});
    if(el)observer.observe(el);
    const onVisibility=()=>{if(document.hidden)setVisible(false);else if(el){const r=el.getBoundingClientRect();setVisible(r.top<innerHeight&&r.bottom>0)}};
    document.addEventListener("visibilitychange",onVisibility);
    return()=>{media.removeEventListener("change",apply);observer.disconnect();document.removeEventListener("visibilitychange",onVisibility)};
  },[]);

  const go=useCallback((next:number)=>setIndex(((next%count)+count)%count),[count]);
  const playing=!userPaused&&!reduced&&!hover&&!focusWithin&&visible;

  const onKeyDown=(event:React.KeyboardEvent)=>{
    if(event.key==="ArrowRight"){event.preventDefault();go(index+1)}
    if(event.key==="ArrowLeft"){event.preventDefault();go(index-1)}
  };
  const onPointerDown=(event:React.PointerEvent)=>{swipe.current={x:event.clientX,y:event.clientY}};
  const onPointerUp=(event:React.PointerEvent)=>{
    const start=swipe.current;swipe.current=null;
    if(!start)return;
    const dx=event.clientX-start.x,dy=event.clientY-start.y;
    if(Math.abs(dx)>48&&Math.abs(dx)>Math.abs(dy)*1.4)go(index+(dx<0?1:-1));
  };

  return <section ref={root} tabIndex={0} className={`dest-carousel${playing?" is-playing":""}${reduced?" is-reduced":""}`} aria-roledescription="carousel" aria-label={t("Destinations","स्थळे")}
    onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
    onFocus={event=>{if((event.target as HTMLElement).matches(":focus-visible"))setFocusWithin(true)}} onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget as Node))setFocusWithin(false)}}
    onKeyDown={onKeyDown} style={{"--dc-interval":`${INTERVAL}ms`} as React.CSSProperties}>
    <div className="dc-stage" onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerCancel={()=>{swipe.current=null}}>
      <div className="dc-slides" aria-live={playing?"off":"polite"}>
        {destinations.map((d,i)=><article key={d.id} className={`dc-slide${i===index?" is-active":""}`} role="group" aria-roledescription={t("slide","स्लाइड")} aria-label={`${i+1} / ${count}: ${d.name[language]}`} aria-hidden={i!==index} inert={i!==index}>
          <div className="dc-media"><Image src={d.image} alt={d.alt[language]} fill sizes="(max-width: 760px) 100vw, 68vw" placeholder="blur" loading={i===0?"eager":"lazy"}/></div>
          <div className="dc-copy">
            <p className="dc-count"><span>{num(i+1)}</span> / {num(count)}</p>
            <p className="dc-tag">{d.tag[language]}</p>
            <h3>{d.name[language]}</h3>
            <ul className="dc-meta">
              <li><Icon name="route" size={15}/>{d.distance[language]}</li>
              <li><Icon name="clock" size={15}/>{d.drive[language]}</li>
              {d.closed&&<li className="is-warn"><Icon name="calendar" size={15}/>{d.closed.note[language]}</li>}
            </ul>
            <Btn href={`/tourism#${d.id}`} icon="arrow" variant="light" label={{en:`Details: ${d.name.en}`,mr:`तपशील: ${d.name.mr}`}}>{t("Details","तपशील")}</Btn>
          </div>
        </article>)}
      </div>
      <div className="dc-controls">
        <button type="button" className="dc-btn" onClick={()=>go(index-1)} aria-label={t("Previous destination","मागील स्थळ")}><Icon name="chevronLeft"/></button>
        <button type="button" className="dc-btn" onClick={()=>setUserPaused(p=>!p)} aria-label={userPaused||reduced?t("Play slideshow","स्लाइडशो सुरू करा"):t("Pause slideshow","स्लाइडशो थांबवा")} aria-pressed={userPaused} disabled={reduced}><Icon name={userPaused||reduced?"play":"pause"}/></button>
        <button type="button" className="dc-btn" onClick={()=>go(index+1)} aria-label={t("Next destination","पुढील स्थळ")}><Icon name="chevronRight"/></button>
      </div>
    </div>
    <ol className="dc-rail">
      {destinations.map((d,i)=><li key={d.id}>
        <button type="button" className={i===index?"is-active":""} aria-current={i===index?"true":undefined} onClick={()=>go(i)} aria-label={`${d.name[language]}, ${d.distance[language]}`}>
          <span className="dc-thumb"><Image src={d.image} alt="" fill sizes="80px"/></span>
          <span className="dc-rail-text"><strong>{d.name[language]}</strong><small>{d.distance[language]}</small></span>
          <span className="dc-progress" aria-hidden="true"><span key={i===index?`run-${index}`:"idle"} onAnimationEnd={()=>{if(i===index)go(index+1)}}/></span>
        </button>
      </li>)}
    </ol>
  </section>;
}
