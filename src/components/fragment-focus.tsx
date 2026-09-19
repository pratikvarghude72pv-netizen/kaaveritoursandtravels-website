"use client";

import {usePathname} from "next/navigation";
import {useCallback,useEffect,useRef} from "react";

type PendingFragment={href:string;id:string;attempts:number};
const MAX_ATTEMPTS=16;

function readFragment(url:URL){
  if(!url.hash||url.hash==="#")return null;
  try{return decodeURIComponent(url.hash.slice(1))}catch{return null}
}

export function FragmentFocus(){
  const pathname=usePathname();
  const pending=useRef<PendingFragment|null>(null);
  const timer=useRef<number|null>(null);
  const resolveRef=useRef<()=>void>(()=>{});

  const cancel=useCallback(()=>{
    pending.current=null;
    if(timer.current!==null){window.clearTimeout(timer.current);timer.current=null}
  },[]);

  const resolve=useCallback(()=>{
    const activation=pending.current;
    if(!activation)return;
    const current=window.location.pathname+window.location.search+window.location.hash;
    if(current===activation.href){
      const target=document.getElementById(activation.id);
      if(target){
        pending.current=null;
        if(!target.hasAttribute("tabindex"))target.setAttribute("tabindex","-1");
        target.focus({preventScroll:true});
        return;
      }
    }
    activation.attempts+=1;
    if(activation.attempts>=MAX_ATTEMPTS){cancel();return}
    timer.current=window.setTimeout(()=>resolveRef.current(),50);
  },[cancel]);

  useEffect(()=>{
    resolveRef.current=resolve;
    return()=>{resolveRef.current=()=>{}};
  },[resolve]);

  useEffect(()=>{
    const activate=(event:MouseEvent)=>{
      if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
      const node=event.target;
      if(!(node instanceof Element))return;
      const anchor=node.closest("a[href]");
      if(!(anchor instanceof HTMLAnchorElement)||anchor.download)return;
      if(anchor.target&&anchor.target.toLowerCase()!=="_self")return;
      const url=new URL(anchor.href,window.location.href);
      if(url.origin!==window.location.origin)return;
      const id=readFragment(url);
      if(!id)return;
      cancel();
      pending.current={href:url.pathname+url.search+url.hash,id,attempts:0};
      window.dispatchEvent(new CustomEvent("kaaveri:fragment-activate"));
      timer.current=window.setTimeout(resolve,0);
    };
    const clearForHistory=()=>cancel();
    const retryAfterHashChange=()=>{if(pending.current)resolve()};
    document.addEventListener("click",activate,true);
    window.addEventListener("popstate",clearForHistory);
    window.addEventListener("hashchange",retryAfterHashChange);
    return()=>{
      document.removeEventListener("click",activate,true);
      window.removeEventListener("popstate",clearForHistory);
      window.removeEventListener("hashchange",retryAfterHashChange);
      cancel();
    };
  },[cancel,resolve]);

  useEffect(()=>{if(pending.current)resolve()},[pathname,resolve]);
  return null;
}
