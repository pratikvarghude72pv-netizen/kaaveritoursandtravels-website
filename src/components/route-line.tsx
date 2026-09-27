"use client";

import {useEffect,useRef} from "react";

// Five stops sit over the five destination cards (grid column centres), nearest destination first.
const STOPS=[{x:100,y:34},{x:300,y:20},{x:500,y:36},{x:700,y:18},{x:900,y:30}];
const START={x:0,y:26};
const END={x:1000,y:24};

/** Smooth curve through the stops (Catmull-Rom converted to cubic Bezier), echoing the wave in the logo. */
function buildPath(){
  const points=[START,...STOPS,END];
  let d=`M${points[0].x} ${points[0].y}`;
  for(let i=0;i<points.length-1;i++){
    const p0=points[i-1]??points[i],p1=points[i],p2=points[i+1],p3=points[i+2]??p2;
    const c1x=p1.x+(p2.x-p0.x)/6,c1y=p1.y+(p2.y-p0.y)/6;
    const c2x=p2.x-(p3.x-p1.x)/6,c2y=p2.y-(p3.y-p1.y)/6;
    d+=` C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2.x} ${p2.y}`;
  }
  return d;
}
const PATH=buildPath();

/** Scroll-linked route line: draws across the band as the visitor scrolls and lights each stop in turn. Decorative only. */
export function RouteLine(){
  const root=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const el=root.current;
    if(!el)return;
    const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
    const setProgress=(p:number)=>{
      el.style.setProperty("--route-progress",String(1-p));
      el.querySelectorAll<HTMLElement>(".route-stop").forEach((stop,i)=>stop.classList.toggle("is-reached",p>=STOPS[i].x/1000-0.02));
    };
    if(reduce){setProgress(1);return}
    const band=el.closest("section")??el;
    let frame=0,active=false;
    const update=()=>{
      frame=0;
      const rect=band.getBoundingClientRect();
      const vh=window.innerHeight;
      // 0 when the band enters from below, 1 once most of it has scrolled into view.
      const p=Math.min(1,Math.max(0,(vh*0.9-rect.top)/(rect.height*0.75)));
      setProgress(p);
    };
    const onScroll=()=>{if(active&&!frame)frame=requestAnimationFrame(update)};
    const observer=new IntersectionObserver(([entry])=>{active=entry.isIntersecting;if(active)onScroll()},{rootMargin:"100px 0px"});
    observer.observe(band);
    window.addEventListener("scroll",onScroll,{passive:true});
    window.addEventListener("resize",onScroll,{passive:true});
    update();
    return()=>{observer.disconnect();window.removeEventListener("scroll",onScroll);window.removeEventListener("resize",onScroll);if(frame)cancelAnimationFrame(frame)};
  },[]);
  return <div ref={root} className="route-line" aria-hidden="true">
    <svg viewBox="0 0 1000 56" preserveAspectRatio="none" focusable="false">
      <path className="route-track" d={PATH} pathLength={1}/>
      <path className="route-progress" d={PATH} pathLength={1}/>
    </svg>
    {STOPS.map(stop=><span key={stop.x} className="route-stop" style={{left:`${stop.x/10}%`,top:`${(stop.y/56)*100}%`}}/>)}
  </div>;
}
