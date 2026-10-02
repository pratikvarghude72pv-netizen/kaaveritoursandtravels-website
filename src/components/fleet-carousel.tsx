"use client";

import Image from "next/image";
import {useCallback,useEffect,useRef,useState} from "react";
import {useLanguage} from "@/components/language";
import {Icon} from "@/components/icons";
import {fleetPhotos} from "@/lib/fleet";
import {fleetVideo} from "@/lib/media";

const INTERVAL=5500;
/** One extra slide at the end plays the walkthrough video; it does not auto-advance like the photo slides. */
const VIDEO_INDEX=fleetPhotos.length;
const SLIDE_COUNT=fleetPhotos.length+1;

/**
 * Vehicles page fleet showcase: Kaaveri's own Tempo Traveller, photographed by the owner (not licensed stock).
 * Autoplaying photo carousel with a slow parallax drift per slide, a thumbnail rail, swipe and full keyboard
 * support, built on the same pattern as the home page DestinationCarousel. The final slide is a short,
 * watermark-free video walkthrough the visitor presses play on; it never autoplays with sound.
 */
export function FleetCarousel(){
  const {language}=useLanguage();
  const t=(en:string,mr:string)=>language==="mr"?mr:en;
  const [index,setIndex]=useState(0);
  const [userPaused,setUserPaused]=useState(false);
  const [hover,setHover]=useState(false);
  const [focusWithin,setFocusWithin]=useState(false);
  const [visible,setVisible]=useState(false);
  const [reduced,setReduced]=useState(false);
  const [videoPlaying,setVideoPlaying]=useState(false);
  const root=useRef<HTMLElement>(null);
  const videoRef=useRef<HTMLVideoElement>(null);
  const swipe=useRef<{x:number;y:number}|null>(null);

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

  const go=useCallback((next:number)=>{
    videoRef.current?.pause();setVideoPlaying(false);
    setIndex(((next%SLIDE_COUNT)+SLIDE_COUNT)%SLIDE_COUNT);
  },[]);
  const onVideoSlide=index===VIDEO_INDEX;
  const playing=!userPaused&&!reduced&&!hover&&!focusWithin&&visible&&!onVideoSlide;

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
  const toggleVideo=()=>{
    const v=videoRef.current;if(!v)return;
    if(v.paused){v.play();setVideoPlaying(true)}else{v.pause();setVideoPlaying(false)}
  };

  return <section ref={root} tabIndex={0} className={`fleet-carousel${playing?" is-playing":""}${reduced?" is-reduced":""}`} aria-roledescription="carousel" aria-label={t("Kaaveri's Tempo Traveller","कावेरीची टेम्पो ट्रॅव्हलर")}
    onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
    onFocus={event=>{if((event.target as HTMLElement).matches(":focus-visible"))setFocusWithin(true)}} onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget as Node))setFocusWithin(false)}}
    onKeyDown={onKeyDown} style={{"--fc-interval":`${INTERVAL}ms`} as React.CSSProperties}>
    <div className="fc-stage" onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerCancel={()=>{swipe.current=null}}>
      <div className="fc-slides" aria-live={playing?"off":"polite"}>
        {fleetPhotos.map((photo,i)=><article key={photo.id} className={`fc-slide${i===index?" is-active":""}`} role="group" aria-roledescription={t("slide","स्लाइड")} aria-label={`${i+1} / ${SLIDE_COUNT}`} aria-hidden={i!==index} inert={i!==index}>
          <div className="fc-media"><Image src={photo.image} alt={photo.alt[language]} fill sizes="(max-width: 760px) 100vw, 68vw" placeholder="blur" loading={i===0?"eager":"lazy"}/></div>
          <p className="fc-caption">{photo.caption[language]}</p>
        </article>)}
        <article className={`fc-slide fc-slide--video${onVideoSlide?" is-active":""}`} role="group" aria-roledescription={t("slide","स्लाइड")} aria-label={`${SLIDE_COUNT} / ${SLIDE_COUNT}: ${t("video walkthrough","व्हिडिओ")}`} aria-hidden={!onVideoSlide} inert={!onVideoSlide}>
          <video ref={videoRef} className="fc-video" src={fleetVideo.src} poster={fleetVideo.poster.src} playsInline muted={false} controls={videoPlaying} onPause={()=>setVideoPlaying(false)} onEnded={()=>setVideoPlaying(false)}/>
          {!videoPlaying&&<button type="button" className="fc-play" onClick={toggleVideo} aria-label={t("Play the walkthrough video","व्हिडिओ सुरू करा")}><Icon name="play" size={28}/></button>}
          {!videoPlaying&&<p className="fc-caption">{t("A short walkthrough of the cabin","कक्षाचा छोटा व्हिडिओ")}</p>}
        </article>
      </div>
      {!(onVideoSlide&&videoPlaying)&&<div className="fc-controls">
        <button type="button" className="fc-btn" onClick={()=>go(index-1)} aria-label={t("Previous photo","मागील फोटो")}><Icon name="chevronLeft"/></button>
        <button type="button" className="fc-btn" onClick={()=>setUserPaused(p=>!p)} aria-label={userPaused||reduced?t("Play slideshow","स्लाइडशो सुरू करा"):t("Pause slideshow","स्लाइडशो थांबवा")} aria-pressed={userPaused} disabled={reduced||onVideoSlide}><Icon name={userPaused||reduced?"play":"pause"}/></button>
        <button type="button" className="fc-btn" onClick={()=>go(index+1)} aria-label={t("Next photo","पुढील फोटो")}><Icon name="chevronRight"/></button>
      </div>}
    </div>
    <ol className="fc-rail">
      {fleetPhotos.map((photo,i)=><li key={photo.id}>
        <button type="button" className={i===index?"is-active":""} aria-current={i===index?"true":undefined} onClick={()=>go(i)} aria-label={photo.caption[language]}>
          <span className="fc-thumb"><Image src={photo.image} alt="" fill sizes="64px"/></span>
          <span className="fc-progress" aria-hidden="true"><span key={i===index?`run-${index}`:"idle"} onAnimationEnd={()=>{if(i===index)go(index+1)}}/></span>
        </button>
      </li>)}
      <li>
        <button type="button" className={`fc-rail-video${onVideoSlide?" is-active":""}`} aria-current={onVideoSlide?"true":undefined} onClick={()=>go(VIDEO_INDEX)} aria-label={t("Video walkthrough","व्हिडिओ पाहा")}>
          <span className="fc-thumb"><Image src={fleetVideo.poster} alt="" fill sizes="64px"/><Icon name="play" size={16}/></span>
        </button>
      </li>
    </ol>
  </section>;
}
