"use client";

import Image from "next/image";
import Link from "next/link";
import {usePathname,useRouter} from "next/navigation";
import {useEffect,useRef,useState} from "react";
import {useLanguage} from "@/components/language";
import {WhatsAppEnquiry} from "@/components/whatsapp-enquiry";
import {canonicalPathFor,localizedPath} from "@/lib/locale";
import {destinations} from "@/lib/destinations";
import {contact,whatsappLink} from "@/lib/contact";
import {Icon} from "@/components/icons";

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
    let frame=0;
    // One layout read per animation frame instead of per scroll event.
    const measure=()=>{
      frame=0;
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
    const onScroll=()=>{if(!frame)frame=requestAnimationFrame(measure)};
    measure();
    window.addEventListener("scroll",onScroll,{passive:true});
    return()=>{window.removeEventListener("scroll",onScroll);if(frame)cancelAnimationFrame(frame)};
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
    const query=window.matchMedia("(min-width: 1101px)");
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

  return <><span className="scroll-progress" aria-hidden="true"/><header ref={headerRef} className={"site-header shell "+(hidden&&!open?"nav-hidden ":"")+(onDark&&!open?"on-dark":"")}>
    <Link className="brand" href={local("/")} onClick={()=>setOpen(false)}>
      <Image className="brand-logo brand-logo-primary" src="/brand/kaaveri-lockup-blue.svg" width={1200} height={400} alt={language==="mr"?"कावेरी टूर्स अँड ट्रॅव्हल्स":"Kaaveri Tours and Travels"} preload/>
    </Link>
    <button ref={triggerRef} className="menu-toggle" type="button" aria-label={navigationLabel} aria-expanded={open} aria-controls="site-navigation-panel" onClick={toggleMenu}>
      <span></span><span></span>
    </button>
    <div id="site-navigation-panel" className={open?"mobile-menu open":"mobile-menu"}>
      <nav aria-label={language==="mr"?"मुख्य नॅव्हिगेशन":"Main navigation"}>
        <Link ref={firstLinkRef} onClick={closeForNavigation} href={local("/about")}>{language==="mr"?"आमच्याबद्दल":"About"}</Link>
        <Link onClick={closeForNavigation} href={local("/tourism")}>{language==="mr"?"पर्यटन":"Tourism"}</Link>
        <Link onClick={closeForNavigation} href={local("/one-way-travel")}>{language==="mr"?"एकमार्गी प्रवास":"One-way travel"}</Link>
        <Link onClick={closeForNavigation} href={local("/corporate-travel")}>{language==="mr"?"कर्मचारी वाहतूक":"Employee transport"}</Link>
        <Link onClick={closeForNavigation} href={local("/vehicles")}>{language==="mr"?"वाहने":"Vehicles"}</Link>
      </nav>
      <Link className="language-toggle" href={languageHref} onClick={preserveLanguageContext} hrefLang={targetLanguage==="mr"?"mr-IN":"en-IN"} aria-label={language==="mr"?"इंग्रजी निवडा":"Switch to Marathi"}>{language==="en"?"मराठी":"English"}</Link>
      <Link className="btn btn-primary btn-sm header-cta" href={`${local("/contact")}#enquiry`} onClick={closeForNavigation}><span className="btn-label">{language==="mr"?"चौकशी करा":"Enquire"}</span><span className="btn-icon"><Icon name="arrow" size={15}/></span></Link>
    </div>
  </header></>;
}


export function Footer(){
  const {language}=useLanguage();
  const pathname=usePathname();
  const marathi=language==="mr";
  const t=(en:string,mr:string)=>marathi?mr:en;
  const local=(path:Parameters<typeof localizedPath>[0])=>localizedPath(path,language);
  const otherLanguageHref=localizedPath(canonicalPathFor(pathname),marathi?"en":"mr");
  return <>
    <WhatsAppEnquiry/>
    <nav className="mobile-action-bar" aria-label={t("Quick contact","त्वरित संपर्क")}>
      <a className="mab-call" href={contact.primaryTel}><span className="mab-icon"><Icon name="phone"/></span><span>{t("Call","कॉल")}</span></a>
      <a className="mab-wa" href={whatsappLink()} target="_blank" rel="noreferrer"><span className="mab-icon"><Icon name="whatsapp"/></span><span>{t("WhatsApp","व्हॉट्सॲप")}</span></a>
      <Link className="mab-enquire" href={`${local("/contact")}#enquiry`}><span>{t("Enquire","चौकशी करा")}</span><span className="mab-icon"><Icon name="arrow"/></span></Link>
    </nav>
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-about">
          <Link className="footer-brand" href={local("/")}><Image src="/brand/kaaveri-lockup-white.svg" width={1200} height={400} alt={t("Kaaveri Tours and Travels","कावेरी टूर्स अँड ट्रॅव्हल्स")}/></Link>
          <p>{t("Heritage and temple trips, one-way travel and employee transport from Chhatrapati Sambhajinagar, Maharashtra.","छत्रपती संभाजीनगर, महाराष्ट्रातून वारसा आणि मंदिर सहली, एकमार्गी प्रवास आणि कर्मचारी वाहतूक.")}</p>
        </div>
        <div>
          <strong>{t("Services","सेवा")}</strong>
          <Link href={local("/tourism")}>{t("Heritage and temple trips","वारसा आणि मंदिर सहली")}</Link>
          <Link href={local("/one-way-travel")}>{t("One-way travel","एकमार्गी प्रवास")}</Link>
          <Link href={local("/corporate-travel")}>{t("Employee transport","कर्मचारी वाहतूक")}</Link>
          <Link href={local("/vehicles")}>{t("Tempo Traveller and cars","टेम्पो ट्रॅव्हलर आणि गाड्या")}</Link>
        </div>
        <div>
          <strong>{t("Destinations","स्थळे")}</strong>
          {destinations.map(d=><Link key={d.id} href={`${local("/tourism")}#${d.id}`}>{d.name[language]}</Link>)}
        </div>
        <div>
          <strong>{t("Contact","संपर्क")}</strong>
          <a className="footer-contact" href={contact.primaryTel}><Icon name="phone" size={16}/>{contact.primaryDisplay}</a>
          <a className="footer-contact" href={contact.secondaryTel}><Icon name="phone" size={16}/>{contact.secondaryDisplay}</a>
          <a className="footer-contact" href={whatsappLink()} target="_blank" rel="noreferrer"><Icon name="whatsapp" size={16}/>{t("WhatsApp","व्हॉट्सॲप")}</a>
          <a className="footer-contact" href={contact.mailto}><Icon name="mail" size={16}/>{contact.email}</a>
        </div>
        <div>
          <strong>{t("Visit","पत्ता")}</strong>
          <p>{t(contact.address,"दुकान क्रमांक १, जीवन स्नेहा अपार्टमेंट, नवीन एसबीएच कॉलनी, ज्योती नगर, एएमसी पाण्याच्या टाकीजवळ, छत्रपती संभाजीनगर.")}</p>
          <a className="footer-contact" href={contact.map} target="_blank" rel="noreferrer"><Icon name="pin" size={16}/>{t("Directions","दिशा पाहा")}</a>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>{t("© 2026 Kaaveri Tours and Travels","© २०२६ कावेरी टूर्स अँड ट्रॅव्हल्स")}</span>
        <span>{t("Enquiries are confirmed by phone or WhatsApp. No online booking or payment.","चौकशीची पुष्टी फोन किंवा व्हॉट्सॲपवर होते. ऑनलाइन बुकिंग किंवा पेमेंट नाही.")}</span>
        <Link href={otherLanguageHref} hrefLang={marathi?"en-IN":"mr-IN"}>{marathi?"English":"मराठी"}</Link>
      </div>
    </footer>
  </>;
}
