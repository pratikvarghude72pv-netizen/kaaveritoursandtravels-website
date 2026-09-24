"use client";

import {useEffect,useRef,useState} from "react";
import {createPortal} from "react-dom";
import {useLanguage} from "@/components/language";
import {vehicleOptions} from "@/lib/vehicles";

type Service="tourism"|"one-way"|"corporate";
type Values=Record<string,string>;
type ModalField={key:string;en:string;mr:string;date?:boolean;options?:{value:string;en:string;mr:string}[]};

const serviceCopy:Record<Service,{en:string;mr:string;fields:ModalField[];}> = {
  tourism:{en:"Tourism",mr:"पर्यटन",fields:[{key:"destination",en:"Destination",mr:"स्थळ"},{key:"date",en:"Travel date",mr:"प्रवासाची तारीख",date:true},{key:"pickup",en:"Pickup point",mr:"पिकअप ठिकाण"},{key:"travellers",en:"Travellers",mr:"प्रवासी"},{key:"vehicle",en:"Preferred vehicle",mr:"पसंतीचे वाहन",options:[...vehicleOptions]}]},
  "one-way":{en:"One-way travel",mr:"एकमार्गी प्रवास",fields:[{key:"pickup",en:"Pickup point",mr:"पिकअप ठिकाण"},{key:"drop",en:"Drop point",mr:"ड्रॉप ठिकाण"},{key:"date",en:"Travel date",mr:"प्रवासाची तारीख",date:true},{key:"passengers",en:"Passengers",mr:"प्रवासी संख्या"},{key:"vehicle",en:"Preferred vehicle",mr:"पसंतीचे वाहन",options:[...vehicleOptions]}]},
  corporate:{en:"Corporate transportation",mr:"कॉर्पोरेट वाहतूक",fields:[{key:"company",en:"Company / organisation",mr:"कंपनी / संस्था"},{key:"route",en:"Pickup and drop route",mr:"पिकअप आणि ड्रॉप मार्ग"},{key:"schedule",en:"Shift / schedule",mr:"शिफ्ट / वेळापत्रक"},{key:"employees",en:"Employees or buses required",mr:"कर्मचारी किंवा आवश्यक बस"}]}
};

const icon=<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5a9.5 9.5 0 0 0-8.2 14.3L2.5 21.5l4.9-1.3A9.5 9.5 0 1 0 12 2.5Zm0 17a7.5 7.5 0 0 1-3.8-1l-.3-.2-2.9.8.8-2.8-.2-.3A7.5 7.5 0 1 1 12 19.5Zm4.1-5.4c-.2-.1-1.1-.5-1.3-.6-.2-.1-.3-.1-.5.1l-.6.7c-.1.2-.3.2-.5.1-1.7-.8-2.8-2.3-3-2.5-.1-.2 0-.3.1-.4l.4-.5c.1-.1.1-.3 0-.4l-.6-1.4c-.2-.4-.3-.4-.5-.4h-.4c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.2 1.6 2.5 3.9 3.5.5.2.9.3 1.4.1.4-.1 1.1-.5 1.3-1 .2-.5.2-1 .1-1.1 0-.1-.2-.2-.4-.3Z"/></svg>;

export function WhatsAppEnquiry(){
  const {language}=useLanguage();
  const [open,setOpen]=useState(false);
  const [service,setService]=useState<Service>("tourism");
  const [values,setValues]=useState<Values>({});
  const [error,setError]=useState("");
  const closeRef=useRef<HTMLButtonElement>(null);
  const returnFocusRef=useRef<HTMLButtonElement>(null);
  const today=new Date().toISOString().slice(0,10);
  const copy=language==="mr"?{title:"व्हॉट्सअॅप चौकशी",intro:"तुमचे तपशील भरा. व्हॉट्सअॅपमध्ये पूर्ण संदेश तयार होईल.",name:"तुमचे नाव",phone:"फोन / व्हॉट्सअॅप",notes:"अतिरिक्त आवश्यकता",send:"व्हॉट्सअॅपमध्ये पुढे जा",close:"बंद करा",required:"कृपया नाव आणि फोन क्रमांक भरा."}:{title:"WhatsApp enquiry",intro:"Fill the important details first. A complete message will open in WhatsApp.",name:"Your name",phone:"Phone / WhatsApp",notes:"Additional requirements",send:"Continue to WhatsApp",close:"Close",required:"Please enter your name and phone number."};
  const active=serviceCopy[service];

  useEffect(()=>{
    if(!open)return;
    const previous=document.activeElement as HTMLElement|null;
    document.body.classList.add("whatsapp-modal-open");
    requestAnimationFrame(()=>closeRef.current?.focus());
    const onKey=(event:KeyboardEvent)=>{if(event.key==="Escape")setOpen(false)};
    document.addEventListener("keydown",onKey);
    return()=>{document.body.classList.remove("whatsapp-modal-open");document.removeEventListener("keydown",onKey);previous?.focus()};
  },[open]);

  const update=(key:string,value:string)=>setValues(previous=>({...previous,[key]:value}));
  const submit=(event:React.FormEvent)=>{
    event.preventDefault();
    if(!values.name?.trim()||!values.phone?.trim()){setError(copy.required);return}
    if(active.fields.some(field=>field.date&&values[field.key]&&values[field.key]<today)){setError(language==="mr"?"आज किंवा पुढील तारीख निवडा.":"Choose today or a future date.");return}
    const detailLines=active.fields.map(field=>{
      const value=values[field.key]?.trim();
      return value?`${field.en}: ${value}`:"";
    }).filter(Boolean);
    const message=[
      "Hello Kaaveri Tours and Travels,",
      `I would like to enquire about ${active.en}.`,
      `Name: ${values.name.trim()}`,
      `Phone / WhatsApp: ${values.phone.trim()}`,
      ...detailLines,
      ...(values.notes?.trim()?[`Additional requirements: ${values.notes.trim()}`]:[]),
      "Please contact me with the available options."
    ].join("\n");
    window.location.assign(`https://wa.me/919272727216?text=${encodeURIComponent(message)}`);
  };

  return <>
    <button ref={returnFocusRef} className="whatsapp-float" type="button" onClick={()=>setOpen(true)} aria-label={language==="mr"?"व्हॉट्सअॅपवर चौकशी करा":"Open WhatsApp enquiry"}>{icon}</button>
    {open&&createPortal(<div className="whatsapp-modal-backdrop" role="presentation" onMouseDown={event=>{if(event.target===event.currentTarget)setOpen(false)}}>
      <section className="whatsapp-modal" role="dialog" aria-modal="true" aria-labelledby="whatsapp-enquiry-title">
        <div className="whatsapp-modal-heading"><div><p className="eyebrow">KAAVERI TOURS AND TRAVELS</p><h2 id="whatsapp-enquiry-title">{copy.title}</h2><p>{copy.intro}</p></div><button ref={closeRef} type="button" className="whatsapp-modal-close" onClick={()=>setOpen(false)} aria-label={copy.close}>×</button></div>
        <form onSubmit={submit} noValidate>
          <fieldset><legend>{language==="mr"?"सेवा निवडा":"Choose a service"}</legend><div className="whatsapp-service-select">{(Object.keys(serviceCopy) as Service[]).map(option=><button key={option} type="button" aria-pressed={service===option} onClick={()=>{setService(option);setError("")}}>{serviceCopy[option][language]}</button>)}</div></fieldset>
          <div className="whatsapp-form-grid">
            <label>{copy.name} *<input autoComplete="name" value={values.name||""} onChange={event=>update("name",event.target.value)}/></label>
            <label>{copy.phone} *<input type="tel" autoComplete="tel" value={values.phone||""} onChange={event=>update("phone",event.target.value)}/></label>
            {active.fields.map(field=>field.options?<label key={field.key}>{field[language]}<select value={values[field.key]||""} onChange={event=>update(field.key,event.target.value)}><option value="">{language==="mr"?"कोणतीही अट नाही":"No preference"}</option>{field.options.map(option=><option key={option.value} value={option.value}>{option[language]}</option>)}</select></label>:<label key={field.key}>{field[language]}<input type={field.date?"date":"text"} min={field.date?today:undefined} value={values[field.key]||""} onChange={event=>update(field.key,event.target.value)}/></label>)}
          </div>
          <label className="whatsapp-notes">{copy.notes}<textarea rows={3} maxLength={1200} value={values.notes||""} onChange={event=>update("notes",event.target.value)}/></label>
          {error&&<p className="whatsapp-form-error" role="alert">{error}</p>}
          <button type="submit" className="pill dark whatsapp-submit">{copy.send} ↗</button>
        </form>
      </section>
    </div>,document.body)}
  </>;
}
