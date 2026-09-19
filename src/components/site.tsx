"use client";

import Image from "next/image";
import Link from "next/link";
import {usePathname,useRouter} from "next/navigation";
import {useEffect,useRef,useState} from "react";
import {useLanguage} from "@/components/language";
import {canonicalPathFor,localizedPath} from "@/lib/locale";

export function Header(){
  const {language}=useLanguage();
  const pathname=usePathname();
  const router=useRouter();
  const [open,setOpen]=useState(false);
  const [hidden,setHidden]=useState(false);
  const [onDark,setOnDark]=useState(false);
  const headerRef=useRef<HTMLElement>(null);
  const triggerRef=useRef<HTMLButtonElement>(null);
  const firstLinkRef=useRef<HTMLAnchorElement>(null);
  const openedByKeyboard=useRef(false);
  const previousPathname=useRef(pathname);

  useEffect(()=>{
    let last=window.scrollY;
    const onScroll=()=>{
      const current=window.scrollY;
      setHidden(open?false:current>last&&current>90);
      last=current;
      const header=headerRef.current;
      if(!header) return;
      header.style.pointerEvents="none";
      const y=Math.min(header.offsetHeight+8,window.innerHeight-1);
      const under=document.elementFromPoint(window.innerWidth*.78,y);
      header.style.pointerEvents="";
      setOnDark(!!under?.closest(".feature-section,.workday-band,.contact-form-section,.home-cta,.hero-visual,.inner-visual,.feature-visual"));
    };
    onScroll();
    window.addEventListener("scroll",onScroll,{passive:true});
    return()=>window.removeEventListener("scroll",onScroll);
  },[open]);

  useEffect(()=>{
    const revealForFragment=()=>{
      setHidden(false);
      setOpen(false);
      openedByKeyboard.current=false;
    };
    window.addEventListener("kaaveri:fragment-activate",revealForFragment);
    return()=>window.removeEventListener("kaaveri:fragment-activate",revealForFragment);
  },[]);

  useEffect(()=>{
    if(previousPathname.current===pathname)return;
    previousPathname.current=pathname;
    const frame=requestAnimationFrame(()=>{
      setOpen(false);
      openedByKeyboard.current=false;
    });
    return()=>cancelAnimationFrame(frame);
  },[pathname]);

  useEffect(()=>{
    if(!open||!openedByKeyboard.current)return;
    const frame=requestAnimationFrame(()=>firstLinkRef.current?.focus());
    openedByKeyboard.current=false;
    return()=>cancelAnimationFrame(frame);
  },[open]);

  useEffect(()=>{
    if(!open)return;
    const dismiss=(returnFocus=false)=>{
      setOpen(false);
      openedByKeyboard.current=false;
      if(returnFocus)requestAnimationFrame(()=>triggerRef.current?.focus());
    };
    const onKeyDown=(event:KeyboardEvent)=>{if(event.key==="Escape"){event.preventDefault();dismiss(true)}};
    const onPointerDown=(event:PointerEvent)=>{if(!headerRef.current?.contains(event.target as Node))dismiss()};
    const onFocusIn=(event:FocusEvent)=>{if(!headerRef.current?.contains(event.target as Node))dismiss()};
    const query=window.matchMedia("(min-width: 961px)");
    const onBreakpoint=(event:MediaQueryListEvent)=>{if(event.matches)dismiss()};
    document.addEventListener("keydown",onKeyDown);
    document.addEventListener("pointerdown",onPointerDown);
    document.addEventListener("focusin",onFocusIn);
    query.addEventListener("change",onBreakpoint);
    return()=>{
      document.removeEventListener("keydown",onKeyDown);
      document.removeEventListener("pointerdown",onPointerDown);
      document.removeEventListener("focusin",onFocusIn);
      query.removeEventListener("change",onBreakpoint);
    };
  },[open]);

  const canonicalPath=canonicalPathFor(pathname);
  const local=(path:Parameters<typeof localizedPath>[0])=>localizedPath(path,language);
  const targetLanguage=language==="en"?"mr":"en";
  const languageHref=localizedPath(canonicalPath,targetLanguage);
  const preserveLanguageContext=(event:React.MouseEvent<HTMLAnchorElement>)=>{
    const hash=window.location.hash;
    const query=window.location.search.slice(1);
    if(!query&&!hash)return;
    event.preventDefault();
    router.push(`${languageHref}${query?`?${query}`:""}${hash}`);
  };
  const closeForNavigation=()=>{openedByKeyboard.current=false;setOpen(false)};
  const toggleMenu=(event:React.MouseEvent<HTMLButtonElement>)=>{
    if(open){setOpen(false);requestAnimationFrame(()=>triggerRef.current?.focus());return}
    openedByKeyboard.current=event.detail===0;
    setHidden(false);
    setOpen(true);
  };
  const navigationLabel=language==="mr"?(open?"नॅव्हिगेशन बंद करा":"नॅव्हिगेशन उघडा"):(open?"Close navigation":"Open navigation");

  return <header ref={headerRef} className={"site-header shell "+(hidden&&!open?"nav-hidden ":"")+(onDark&&!open?"on-dark":"")}>
    <Link className="brand" href={local("/")} onClick={()=>setOpen(false)}>
      <Image className="brand-logo brand-logo-primary" src="/brand/kaaveri-logo-primary.png" width={640} height={193} alt="Kaaveri Tours and Travels" priority/>
    </Link>
    <button ref={triggerRef} className="menu-toggle" type="button" aria-label={navigationLabel} aria-expanded={open} aria-controls="site-navigation-panel" onClick={toggleMenu}>
      <span></span><span></span>
    </button>
    <div id="site-navigation-panel" className={open?"mobile-menu open":"mobile-menu"}>
      <nav aria-label={language==="mr"?"मुख्य नॅव्हिगेशन":"Main navigation"}>
        <Link ref={firstLinkRef} onClick={closeForNavigation} href={local("/about")}>{language==="mr"?"आमच्याबद्दल":"About"}</Link>
        <Link onClick={closeForNavigation} href={local("/tourism")}>{language==="mr"?"पर्यटन":"Tourism"}</Link>
        <Link onClick={closeForNavigation} href={local("/one-way-travel")}>{language==="mr"?"एकमार्गी प्रवास":"One-way Travel"}</Link>
        <Link onClick={closeForNavigation} href={local("/corporate-travel")}>{language==="mr"?"कॉर्पोरेट वाहतूक":"Corporate Transportation"}</Link>
      </nav>
      <Link className="language-toggle" href={languageHref} onClick={preserveLanguageContext} hrefLang={targetLanguage==="mr"?"mr-IN":"en-IN"} aria-label={language==="mr"?"इंग्रजी निवडा":"Switch to Marathi"}>{language==="en"?"मराठी":"English"}</Link>
      <Link className="pill dark" href={`${local("/contact")}#enquiry`} onClick={closeForNavigation}>{language==="mr"?"चौकशी करा":"Enquire ↗"}</Link>
    </div>
  </header>;
}

export function Footer(){
  const {language}=useLanguage();
  const marathi=language==="mr";
  const local=(path:Parameters<typeof localizedPath>[0])=>localizedPath(path,language);
  return <>
    <a className="whatsapp-float" href="https://wa.me/919272727216?text=Hello%20Kaaveri%2C%20I%20would%20like%20to%20make%20an%20enquiry." target="_blank" rel="noreferrer" aria-label={marathi?"व्हॉट्सअॅपवर चौकशी करा":"Open WhatsApp enquiry"}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5a9.5 9.5 0 0 0-8.2 14.3L2.5 21.5l4.9-1.3A9.5 9.5 0 1 0 12 2.5Zm0 17a7.5 7.5 0 0 1-3.8-1l-.3-.2-2.9.8.8-2.8-.2-.3A7.5 7.5 0 1 1 12 19.5Zm4.1-5.4c-.2-.1-1.1-.5-1.3-.6-.2-.1-.3-.1-.5.1l-.6.7c-.1.2-.3.2-.5.1-1.7-.8-2.8-2.3-3-2.5-.1-.2 0-.3.1-.4l.4-.5c.1-.1.1-.3 0-.4l-.6-1.4c-.2-.4-.3-.4-.5-.4h-.4c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.2 1.6 2.5 3.9 3.5.5.2.9.3 1.4.1.4-.1 1.1-.5 1.3-1 .2-.5.2-1 .1-1.1 0-.1-.2-.2-.4-.3Z"/></svg>
    </a>
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <div className="brand footer-brand"><Image className="brand-logo brand-logo-primary" src="/brand/kaaveri-logo-primary.png" width={640} height={193} alt="Kaaveri Tours and Travels"/></div>
          <p>{marathi?"छत्रपती संभाजीनगर, महाराष्ट्रातून विचारपूर्वक प्रवास.":"Thoughtful travel from Chhatrapati Sambhajinagar, Maharashtra."}</p>
        </div>
        <div>
          <strong>Address</strong>
          <p>{marathi?"दुकान क्रमांक १, जीवन स्नेहा अपार्टमेंट, नवीन एसबीएच कॉलनी, ज्योती नगर, एएमसी पाण्याच्या टाकीजवळ, छत्रपती संभाजीनगर.":"Shop No. 1, Jeevan Sneha Apartment, New SBH Colony, Jyoti Nagar, Near AMC Water Tank, Chhatrapati Sambhajinagar."}</p>
        </div>
        <div>
          <strong>{marathi?"पुढे जा":"Explore"}</strong>
          <Link href={local("/tourism")}>{marathi?"पर्यटन प्रवास":"Tourism journeys"}</Link>
          <Link href={local("/one-way-travel")}>{marathi?"एकमार्गी प्रवास":"One-way travel"}</Link>
          <Link href={local("/corporate-travel")}>{marathi?"कॉर्पोरेट वाहतूक":"Corporate transportation"}</Link>
        </div>
        <div>
          <strong>{marathi?"संपर्क":"Talk to us"}</strong>
          <a href="tel:+919272727216">9272727216</a>
          <a href="tel:+918600320320">8600320320</a>
          <a href="mailto:pratikvarghude72.pv@gmail.com">pratikvarghude72.pv@gmail.com</a>
          <a href="https://wa.me/919272727216" target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>{marathi?"२०२६ कावेरी टूर्स अँड ट्रॅव्हल्स":"2026 Kaaveri Tours and Travels"}</span>
        <span>{marathi?"मराठी / English":"English / Marathi"}</span>
      </div>
    </footer>
  </>;
}
