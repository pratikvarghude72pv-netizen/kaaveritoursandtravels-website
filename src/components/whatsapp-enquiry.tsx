"use client";

import {useEffect,useRef,useState} from "react";
import {createPortal} from "react-dom";
import {useLanguage} from "@/components/language";
import {vehicleOptions} from "@/lib/vehicles";
import {destinations} from "@/lib/destinations";
import {Icon} from "@/components/icons";
import {CountField,DatePicker,PhoneField,Select,isValidMobile,todayISO,withCountryCode} from "@/components/fields";
import {whatsappLink} from "@/lib/contact";

type Service="tourism"|"one-way"|"corporate";
type Values=Record<string,string>;
type Kind="text"|"date"|"count"|"select";
type ModalField={key:string;en:string;mr:string;kind:Kind;options?:{value:string;en:string;mr:string}[];empty?:{en:string;mr:string}};

const noPreference={en:"No preference",mr:"पसंती नाही"};
const serviceCopy:Record<Service,{en:string;mr:string;line:string;lineMr:string;fields:ModalField[]}>={
  tourism:{en:"Tourism",mr:"पर्यटन",line:"a tourism trip",lineMr:"सहलीची",fields:[
    {key:"destination",en:"Destination",mr:"स्थळ",kind:"select",options:destinations.map(d=>({value:d.name.en,en:d.name.en,mr:d.name.mr})),empty:{en:"Not decided",mr:"ठरलेले नाही"}},
    {key:"date",en:"Travel date",mr:"प्रवासाची तारीख",kind:"date"},
    {key:"pickup",en:"Pickup point",mr:"पिकअप ठिकाण",kind:"text"},
    {key:"travellers",en:"Travellers",mr:"प्रवासी",kind:"count"},
    {key:"vehicle",en:"Vehicle",mr:"वाहन",kind:"select",options:[...vehicleOptions],empty:noPreference}]},
  "one-way":{en:"One-way",mr:"एकमार्गी",line:"one-way travel",lineMr:"एकमार्गी प्रवासाची",fields:[
    {key:"pickup",en:"Pickup point",mr:"पिकअप ठिकाण",kind:"text"},
    {key:"drop",en:"Drop point",mr:"ड्रॉप ठिकाण",kind:"text"},
    {key:"date",en:"Travel date",mr:"प्रवासाची तारीख",kind:"date"},
    {key:"passengers",en:"Passengers",mr:"प्रवासी",kind:"count"},
    {key:"vehicle",en:"Vehicle",mr:"वाहन",kind:"select",options:[...vehicleOptions],empty:noPreference}]},
  corporate:{en:"Corporate",mr:"कॉर्पोरेट",line:"employee transport for our company",lineMr:"आमच्या कंपनीसाठी कर्मचारी वाहतुकीची",fields:[
    {key:"company",en:"Company",mr:"कंपनी",kind:"text"},
    {key:"route",en:"Pickup areas and workplace",mr:"पिकअप परिसर आणि कामाचे ठिकाण",kind:"text"},
    {key:"date",en:"Start date",mr:"सुरुवातीची तारीख",kind:"date"},
    {key:"employees",en:"Employees",mr:"कर्मचारी",kind:"count"}]}
};

export function WhatsAppEnquiry(){
  const {language}=useLanguage();
  const t=(en:string,mr:string)=>language==="mr"?mr:en;
  const [open,setOpen]=useState(false);
  const [service,setService]=useState<Service>("tourism");
  const [values,setValues]=useState<Values>({});
  const [error,setError]=useState("");
  const [shown,setShown]=useState(false);
  const closeRef=useRef<HTMLButtonElement>(null);
  const dialogRef=useRef<HTMLElement>(null);
  const active=serviceCopy[service];

  useEffect(()=>{
    if(!open)return;
    const previous=document.activeElement as HTMLElement|null;
    document.body.classList.add("whatsapp-modal-open");
    requestAnimationFrame(()=>closeRef.current?.focus());
    // Make the rest of the page inert and keep Tab focus inside the dialog.
    const backdrop=dialogRef.current?.parentElement;
    const siblings=[...document.body.children].filter(el=>el!==backdrop&&!el.contains(backdrop??null)) as HTMLElement[];
    siblings.forEach(el=>el.inert=true);
    const onKey=(event:KeyboardEvent)=>{
      if(event.key==="Escape"&&!event.defaultPrevented){setOpen(false);return}
      if(event.key!=="Tab"||!dialogRef.current)return;
      const focusable=[...dialogRef.current.querySelectorAll<HTMLElement>("button,input,select,textarea,a[href],[tabindex='0']")].filter(el=>!el.hasAttribute("disabled")&&el.offsetParent!==null);
      if(!focusable.length)return;
      const first=focusable[0],last=focusable[focusable.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
    };
    document.addEventListener("keydown",onKey);
    return()=>{document.body.classList.remove("whatsapp-modal-open");document.removeEventListener("keydown",onKey);siblings.forEach(el=>el.inert=false);previous?.focus()};
  },[open]);

  // Stay out of the way over the hero; appear once the visitor starts scrolling.
  useEffect(()=>{
    let frame=0;
    const check=()=>{frame=0;setShown(window.scrollY>window.innerHeight*0.55)};
    const onScroll=()=>{if(!frame)frame=requestAnimationFrame(check)};
    check();
    window.addEventListener("scroll",onScroll,{passive:true});
    return()=>{window.removeEventListener("scroll",onScroll);if(frame)cancelAnimationFrame(frame)};
  },[]);

  const update=(key:string,value:string)=>{setValues(previous=>({...previous,[key]:value}));setError("")};
  const submit=(event:React.FormEvent)=>{
    event.preventDefault();
    if(!values.name?.trim()||!values.phone){setError(t("Enter your name and mobile number.","तुमचे नाव आणि मोबाइल नंबर लिहा."));return}
    if(!isValidMobile(values.phone)){setError(t("Mobile numbers have 10 digits and start with 6, 7, 8 or 9.","मोबाइल नंबर १० अंकी असतो आणि ६, ७, ८ किंवा ९ ने सुरू होतो."));return}
    if(active.fields.some(field=>field.kind==="date"&&values[field.key]&&values[field.key]<todayISO())){setError(t("Choose today or a later date.","आज किंवा पुढील तारीख निवडा."));return}
    const optionLabel=(field:ModalField,value:string)=>field.options?.find(o=>o.value===value)?.[language]??value;
    const detailLines=active.fields.map(field=>{const value=values[field.key]?.trim();return value?`${field[language]}: ${optionLabel(field,value)}`:""}).filter(Boolean);
    const message=[
      t("Hello Kaaveri Tours and Travels,","नमस्कार कावेरी टूर्स अँड ट्रॅव्हल्स,"),
      t(`I would like to enquire about ${active.line}.`,`मला ${active.lineMr} चौकशी करायची आहे.`),
      `${t("Name","नाव")}: ${values.name.trim()}`,
      `${t("Mobile","मोबाइल")}: ${withCountryCode(values.phone)}`,
      ...detailLines,
      ...(values.notes?.trim()?[`${t("Details","इतर माहिती")}: ${values.notes.trim()}`]:[]),
      t("Please share the options.","कृपया पर्याय कळवा.")
    ].join("\n");
    window.open(whatsappLink(message),"_blank","noopener");
    setOpen(false);
  };

  const renderField=(field:ModalField)=>{
    const id=`wa-${field.key}`;const value=values[field.key]||"";
    const control=field.kind==="select"
      ?<Select id={id} value={value} onChange={v=>update(field.key,v)} emptyLabel={(field.empty??noPreference)[language]} options={(field.options||[]).map(o=>({value:o.value,label:o[language]}))}/>
      :field.kind==="date"?<DatePicker id={id} value={value} onChange={v=>update(field.key,v)} min={todayISO()}/>
      :field.kind==="count"?<CountField id={id} value={value} onChange={v=>update(field.key,v)}/>
      :<input id={id} className="ui-field ui-input" value={value} maxLength={120} autoComplete="off" onChange={event=>update(field.key,event.target.value)}/>;
    return <div className="form-field" key={`${service}-${field.key}`}><label htmlFor={id}>{field[language]}</label>{control}</div>;
  };

  return <>
    <button className={shown||open?"whatsapp-float":"whatsapp-float whatsapp-float--hidden"} tabIndex={shown||open?0:-1} aria-hidden={shown||open?undefined:true} type="button" onClick={()=>setOpen(true)} aria-label={t("Open WhatsApp enquiry","व्हॉट्सॲपवर चौकशी करा")}><Icon name="whatsapp" size={28}/></button>
    {open&&createPortal(<div className="whatsapp-modal-backdrop" role="presentation" onMouseDown={event=>{if(event.target===event.currentTarget)setOpen(false)}}>
      <section ref={dialogRef} className="whatsapp-modal" role="dialog" aria-modal="true" aria-labelledby="whatsapp-enquiry-title">
        <div className="whatsapp-modal-scroll">
          <div className="whatsapp-modal-heading">
            <span className="wa-badge" aria-hidden="true"><Icon name="whatsapp" size={24}/></span>
            <div><h2 id="whatsapp-enquiry-title">{t("WhatsApp enquiry","व्हॉट्सॲप चौकशी")}</h2><p>{t("Fill in your details. WhatsApp opens with the message written.","तुमचे तपशील भरा. संदेश लिहिलेला व्हॉट्सॲप उघडेल.")}</p></div>
            <button ref={closeRef} type="button" className="whatsapp-modal-close" onClick={()=>setOpen(false)} aria-label={t("Close","बंद करा")}><Icon name="close"/></button>
          </div>
          <form onSubmit={submit} noValidate>
            <fieldset><legend>{t("Service","सेवा")}</legend><div className="whatsapp-service-select">{(Object.keys(serviceCopy) as Service[]).map(option=><button key={option} type="button" aria-pressed={service===option} onClick={()=>{setService(option);setError("")}}>{serviceCopy[option][language]}</button>)}</div></fieldset>
            <div className="whatsapp-form-grid">
              <div className="form-field"><label htmlFor="wa-name">{t("Your name *","तुमचे नाव *")}</label><input id="wa-name" className="ui-field ui-input" autoComplete="name" maxLength={80} aria-required="true" aria-invalid={!!error&&!values.name?.trim()||undefined} value={values.name||""} onChange={event=>update("name",event.target.value)}/></div>
              <div className="form-field"><label htmlFor="wa-phone">{t("Mobile number *","मोबाइल नंबर *")}</label><PhoneField id="wa-phone" value={values.phone||""} onChange={v=>update("phone",v)} required invalid={!!error&&!isValidMobile(values.phone||"")}/></div>
              {active.fields.map(renderField)}
            </div>
            <div className="form-field whatsapp-notes"><label htmlFor="wa-notes">{t("Anything else","इतर माहिती")}</label><textarea id="wa-notes" className="ui-field ui-textarea" rows={3} maxLength={1200} value={values.notes||""} onChange={event=>update("notes",event.target.value)}/></div>
            {error&&<p className="whatsapp-form-error" role="alert">{error}</p>}
            <button type="submit" className="btn btn-whatsapp whatsapp-submit"><span className="btn-label">{t("Open WhatsApp","व्हॉट्सॲप उघडा")}</span><span className="btn-icon"><Icon name="whatsapp" size={18}/></span></button>
          </form>
        </div>
      </section>
    </div>,document.body)}
  </>;
}
