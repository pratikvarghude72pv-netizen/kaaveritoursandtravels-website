"use client";

import {useEffect} from "react";
import {usePathname} from "next/navigation";

const registeredSelectors=[
  ".intro-strip",
  ".services-section",
  ".feature-section",
  ".places-section",
  ".home-cta",
  ".tour-intro",
  ".tour-destination",
  ".tour-process",
  ".contact-form-section",
  ".contact-faq",
].join(",");
const selector="[data-motion-reveal]";

export function MotionReveal(){
  const pathname=usePathname();

  useEffect(()=>{
    for(const element of document.querySelectorAll<HTMLElement>(registeredSelectors)){
      element.dataset.motionReveal="";
    }
    const media=window.matchMedia("(prefers-reduced-motion: reduce)");
    if(media.matches)return;
    const elements=Array.from(document.querySelectorAll<HTMLElement>(selector));
    const candidates=elements.filter(element=>{
      if(element.dataset.motionState==="revealed")return false;
      return element.getBoundingClientRect().top>window.innerHeight*.88;
    });
    if(!candidates.length)return;

    for(const element of candidates){
      element.dataset.motionState="prepared";
      element.classList.add("motion-reveal--prepared");
    }

    const observer=new IntersectionObserver(entries=>{
      for(const entry of entries){
        if(!entry.isIntersecting)continue;
        const element=entry.target as HTMLElement;
        element.dataset.motionState="revealed";
        element.classList.add("motion-reveal--revealed");
        element.classList.remove("motion-reveal--prepared");
        observer.unobserve(element);
      }
    },{rootMargin:"0px 0px 12% 0px",threshold:.04});

    for(const element of candidates)observer.observe(element);
    return()=>{
      observer.disconnect();
      for(const element of candidates){
        element.classList.remove("motion-reveal--prepared");
      }
    };
  },[pathname]);

  return null;
}
