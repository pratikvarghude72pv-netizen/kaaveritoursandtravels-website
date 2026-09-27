"use client";

import {useEffect,useMemo,useRef,useState} from "react";
import {useLanguage,type Language} from "@/components/language";
import {vehicleOptions} from "@/lib/vehicles";
import {destinations} from "@/lib/destinations";
import {contact,whatsappLink} from "@/lib/contact";
import {Icon} from "@/components/icons";
import {CountField,DatePicker,PhoneField,Select,isValidMobile,todayISO,withCountryCode} from "@/components/fields";

type Service="tourism"|"one-way"|"corporate";
type MachineState="idle"|"invalid"|"pending"|"success"|"delivery-error"|"retry-pending"|"unavailable";
type Values={name:string;phone:string;message:string;website:string;details:Record<string,string>};
type Kind="text"|"date"|"count"|"select";
type Field={key:string;en:string;mr:string;kind:Kind;autocomplete?:string;options?:{value:string;en:string;mr:string}[]};

const services:Record<Service,{en:string;mr:string}>={
  tourism:{en:"Tourism",mr:"पर्यटन"},
  "one-way":{en:"One-way travel",mr:"एकमार्गी प्रवास"},
  corporate:{en:"Corporate",mr:"कॉर्पोरेट"}
};
const serviceLine:Record<Service,string>={tourism:"a tourism trip","one-way":"one-way travel",corporate:"employee transport for our company"};
const destinationOptions=[...destinations.map(d=>({value:d.name.en,en:d.name.en,mr:d.name.mr})),{value:"Another place",en:"Another place (add it below)",mr:"दुसरे ठिकाण (खाली लिहा)"}];
const fields:Record<Service,Field[]>={
  tourism:[{key:"destination",en:"Destination",mr:"स्थळ",kind:"select",options:destinationOptions},{key:"preferredDate",en:"Travel date",mr:"प्रवासाची तारीख",kind:"date"},{key:"travellers",en:"Travellers",mr:"प्रवासी",kind:"count"},{key:"vehicle",en:"Vehicle",mr:"वाहन",kind:"select",options:[...vehicleOptions]}],
  "one-way":[{key:"pickupPoint",en:"Pickup point",mr:"पिकअप ठिकाण",kind:"text"},{key:"dropPoint",en:"Drop point",mr:"ड्रॉप ठिकाण",kind:"text"},{key:"travelDate",en:"Travel date",mr:"प्रवासाची तारीख",kind:"date"},{key:"passengers",en:"Passengers",mr:"प्रवासी",kind:"count"},{key:"vehicle",en:"Vehicle",mr:"वाहन",kind:"select",options:[...vehicleOptions]}],
  corporate:[{key:"company",en:"Company",mr:"कंपनी",kind:"text",autocomplete:"organization"},{key:"route",en:"Pickup areas and workplace",mr:"पिकअप परिसर आणि कामाचे ठिकाण",kind:"text"},{key:"startDate",en:"Start date",mr:"सुरुवातीची तारीख",kind:"date"},{key:"schedule",en:"Shift timings",mr:"शिफ्टच्या वेळा",kind:"text"},{key:"employees",en:"Employees",mr:"कर्मचारी",kind:"count"}]
};
const initialValues:Values={name:"",phone:"",message:"",website:"",details:{}};

const copy={
  required:{en:"Fields marked * are required.",mr:"* असलेली माहिती आवश्यक आहे."},
  invalid:{en:"Check the highlighted details.",mr:"दाखवलेले तपशील तपासा."},
  name:{en:"Enter your name.",mr:"तुमचे नाव लिहा."},
  phone:{en:"Enter a 10-digit mobile number.",mr:"१० अंकी मोबाइल नंबर लिहा."},
  phoneInvalid:{en:"Mobile numbers have 10 digits and start with 6, 7, 8 or 9.",mr:"मोबाइल नंबर १० अंकी असतो आणि ६, ७, ८ किंवा ९ ने सुरू होतो."},
  tooLong:{en:"This is too long. Shorten it and try again.",mr:"हा मजकूर खूप मोठा आहे. तो लहान करा."},
  send:{en:"Send",mr:"पाठवा"},
  sending:{en:"Sending",mr:"पाठवत आहोत"},
  successHeading:{en:"Your enquiry has been received.",mr:"तुमची चौकशी मिळाली आहे."},
  successBody:{en:"Kaaveri will call or WhatsApp you to confirm the vehicle, pickup time and fare. This is not a booking confirmation.",mr:"वाहन, पिकअपची वेळ आणि भाडे निश्चित करण्यासाठी कावेरी तुम्हाला फोन किंवा व्हॉट्सॲप करेल. ही बुकिंगची पुष्टी नाही."},
  newEnquiry:{en:"New enquiry",mr:"नवी चौकशी"},
  errorHeading:{en:"The enquiry could not be sent.",mr:"चौकशी पाठवता आली नाही."},
  errorBody:{en:"Your details are still here. Retry, or send the same details on WhatsApp.",mr:"तुमचे तपशील येथेच आहेत. पुन्हा पाठवा, किंवा हेच तपशील व्हॉट्सॲपवर पाठवा."},
  retry:{en:"Retry",mr:"पुन्हा पाठवा"},
  unavailableHeading:{en:"Send this enquiry on WhatsApp.",mr:"ही चौकशी व्हॉट्सॲपवर पाठवा."},
  unavailableBody:{en:"The online form cannot deliver right now. Your details are already written into a WhatsApp message; press send in WhatsApp.",mr:"ऑनलाइन फॉर्म सध्या पोहोचवू शकत नाही. तुमचे तपशील व्हॉट्सॲप संदेशात लिहिलेले आहेत; व्हॉट्सॲपमध्ये पाठवा दाबा."},
  clear:{en:"Clear",mr:"साफ करा"},
  requiredField:{en:"This field is required.",mr:"ही माहिती आवश्यक आहे."},
  invalidField:{en:"Check this detail and try again.",mr:"हा तपशील तपासा."},
  pastDate:{en:"Choose today or a later date.",mr:"आज किंवा पुढील तारीख निवडा."},
  notDecided:{en:"Not decided",mr:"ठरलेले नाही"},
  noPreference:{en:"No preference",mr:"पसंती नाही"}
} as const;

function inLanguage(language:Language,value:{en:string;mr:string}){return value[language]}

function serverErrorMessage(language:Language,key:string,code:string){
  if(key==="phone")return inLanguage(language,copy.phoneInvalid);
  if(key==="name"&&code==="required")return inLanguage(language,copy.name);
  if(code==="past_date")return inLanguage(language,copy.pastDate);
  if(code==="too_long")return inLanguage(language,copy.tooLong);
  if(code==="required")return inLanguage(language,copy.requiredField);
  return inLanguage(language,copy.invalidField);
}

function whatsappMessage(service:Service,values:Values,activeFields:Field[]){
  const details=activeFields.map(field=>[field.en,values.details[field.key]?.trim()] as const).filter(([,value])=>!!value).map(([label,value])=>`${label}: ${value}`);
  return [
    "Hello Kaaveri Tours and Travels,",
    `I would like to enquire about ${serviceLine[service]}.`,
    `Name: ${values.name.trim()}`,
    ...(values.phone?[`Mobile: ${withCountryCode(values.phone)}`]:[]),
    ...details,
    ...(values.message.trim()?[`Details: ${values.message.trim()}`]:[]),
    "Please share the options."
  ].join("\n");
}

function FallbackLinks({language,service,values,activeFields}:{language:Language;service:Service;values:Values;activeFields:Field[]}){
  const t=(en:string,mr:string)=>language==="mr"?mr:en;
  return <div className="enquiry-fallbacks" aria-label={t("Other ways to send","पाठवण्याचे इतर मार्ग")}>
    <a className="btn btn-whatsapp btn-sm" href={whatsappLink(whatsappMessage(service,values,activeFields))} target="_blank" rel="noreferrer" aria-label={t("WhatsApp: send these details","व्हॉट्सॲप: हे तपशील पाठवा")}><span className="btn-label">WhatsApp</span><span className="btn-icon"><Icon name="whatsapp" size={16}/></span></a>
    <a className="btn btn-ghost btn-sm" href={contact.primaryTel} aria-label={t(`Call ${contact.primaryDisplay}`,`कॉल ${contact.primaryDisplay}`)}><span className="btn-label">{t("Call","कॉल")}</span><span className="btn-icon"><Icon name="phone" size={15}/></span></a>
    <a className="btn btn-ghost btn-sm" href={contact.mailto} aria-label={t(`Email ${contact.email}`,`ईमेल ${contact.email}`)}><span className="btn-label">{t("Email","ईमेल")}</span><span className="btn-icon"><Icon name="mail" size={15}/></span></a>
  </div>;
}

export function EnquiryForm(){
  const {language}=useLanguage();
  const t=(en:string,mr:string)=>language==="mr"?mr:en;
  const [service,setService]=useState<Service>("tourism");
  const [values,setValues]=useState<Values>(initialValues);
  const [state,setState]=useState<MachineState>("idle");
  const [errors,setErrors]=useState<Record<string,string>>({});
  const [minDate,setMinDate]=useState("");
  const requestId=useRef("");
  const inFlight=useRef(false);
  const summaryRef=useRef<HTMLDivElement>(null);
  const statusHeadingRef=useRef<HTMLHeadingElement>(null);

  useEffect(()=>{
    const frame=window.requestAnimationFrame(()=>{
      const today=todayISO();
      setMinDate(today);
      const searchParams=new URLSearchParams(window.location.search);
      const requestedService=searchParams.get("service");
      const target:Service=requestedService==="one-way"||requestedService==="corporate"?requestedService:"tourism";
      const vehicle=vehicleOptions.find(option=>option.value.toLowerCase()===searchParams.get("vehicle")?.toLowerCase())?.value;
      const date=searchParams.get("date");
      const futureDate=date&&/^\d{4}-\d{2}-\d{2}$/.test(date)&&date>=today?date:undefined;
      const text=(v:string|null)=>v&&v.length<=160?v:undefined;
      const count=(v:string|null)=>v&&/^\d{1,3}$/.test(v)?v:undefined;
      const destination=destinationOptions.find(o=>o.value===searchParams.get("destination"))?.value;
      const fromUrl:Record<string,string|undefined>=target==="tourism"
        ?{destination,preferredDate:futureDate,travellers:count(searchParams.get("people")),vehicle}
        :target==="one-way"
          ?{pickupPoint:text(searchParams.get("pickup")),dropPoint:text(searchParams.get("drop")),travelDate:futureDate,passengers:count(searchParams.get("people")),vehicle}
          :{company:text(searchParams.get("company")),startDate:futureDate,employees:count(searchParams.get("people"))};
      const details=Object.fromEntries(Object.entries(fromUrl).filter(([,v])=>v)) as Record<string,string>;
      if(Object.keys(details).length)setValues(previous=>({...previous,details:{...previous.details,...details}}));
      if(requestedService==="tourism"||requestedService==="one-way"||requestedService==="corporate")setService(requestedService);
    });
    return()=>window.cancelAnimationFrame(frame);
  },[]);
  useEffect(()=>{
    if(state==="invalid")summaryRef.current?.focus();
    if(state==="delivery-error"||state==="unavailable"||state==="success")statusHeadingRef.current?.focus();
  },[state]);

  const pending=state==="pending"||state==="retry-pending";
  const liveMessage=pending?inLanguage(language,copy.sending):state==="success"?inLanguage(language,copy.successHeading):"";
  const activeFields=useMemo(()=>fields[service],[service]);

  const clearError=(key:string)=>{if(errors[key])setErrors(previous=>{const next={...previous};delete next[key];return next})};
  const setValue=(key:"name"|"phone"|"message"|"website",value:string)=>{setValues(previous=>({...previous,[key]:value}));clearError(key)};
  const setDetail=(key:string,value:string)=>{setValues(previous=>({...previous,details:{...previous.details,[key]:value}}));clearError(`details.${key}`)};
  const reset=()=>{setValues(initialValues);setErrors({});setState("idle");requestId.current=""};
  const validate=()=>{
    const next:Record<string,string>={};
    const name=values.name.trim();
    if(name.length<2)next.name=inLanguage(language,copy.name);else if(name.length>80)next.name=inLanguage(language,copy.tooLong);
    if(!values.phone)next.phone=inLanguage(language,copy.phone);else if(!isValidMobile(values.phone))next.phone=inLanguage(language,copy.phoneInvalid);
    if(values.message.length>1200)next.message=inLanguage(language,copy.tooLong);
    for(const field of activeFields){
      const detail=values.details[field.key]||"";
      if(field.kind==="date"&&detail&&detail<todayISO())next[`details.${field.key}`]=inLanguage(language,copy.pastDate);
      else if(detail.length>160)next[`details.${field.key}`]=inLanguage(language,copy.tooLong);
    }
    setErrors(next);
    return Object.keys(next).length===0;
  };

  const submit=async(retry=false)=>{
    if(inFlight.current)return;
    if(!validate()){setState("invalid");return}
    if(!requestId.current)requestId.current=crypto.randomUUID();
    inFlight.current=true;setState(retry?"retry-pending":"pending");
    try{
      const details=Object.fromEntries(activeFields.map(field=>[field.key,(values.details[field.key]||"").trim()]).filter(([,value])=>value));
      const response=await fetch("/api/enquiry",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({version:1,requestId:requestId.current,language,service,name:values.name,phone:withCountryCode(values.phone),details,message:values.message,website:values.website})});
      const result:unknown=await response.json().catch(()=>null);
      const code=result&&typeof result==="object"&&"code" in result?result.code:null;
      if(response.ok&&code==="accepted"){setState("success");return}
      if(code==="invalid_fields"&&result&&typeof result==="object"&&"fieldErrors" in result&&result.fieldErrors&&typeof result.fieldErrors==="object"){
        const mapped=Object.fromEntries(Object.entries(result.fieldErrors as Record<string,string>).map(([key,code])=>[key,serverErrorMessage(language,key,String(code))]));
        setErrors(mapped);setState("invalid");return;
      }
      setState(code==="delivery_unavailable"?"unavailable":"delivery-error");
    }catch{setState("delivery-error")}
    finally{inFlight.current=false}
  };

  if(state==="success")return <div className="enquiry-receipt" role="status">
    <span className="receipt-icon" aria-hidden="true"><Icon name="check" size={26}/></span>
    <h3 ref={statusHeadingRef} tabIndex={-1}>{inLanguage(language,copy.successHeading)}</h3>
    <p>{inLanguage(language,copy.successBody)}</p>
    <button className="btn btn-navy" type="button" onClick={reset}><span className="btn-label">{inLanguage(language,copy.newEnquiry)}</span><span className="btn-icon"><Icon name="form" size={17}/></span></button>
  </div>;

  const errorId=(key:string)=>`enquiry-${key}-error`;
  const renderField=(field:Field)=>{
    const error=errors[`details.${field.key}`];const id=`enquiry-${field.key}`;const value=values.details[field.key]||"";const describedBy=error?errorId(field.key):undefined;
    const control=field.kind==="select"
      ?<Select id={id} value={value} onChange={v=>setDetail(field.key,v)} emptyLabel={inLanguage(language,field.key==="destination"?copy.notDecided:copy.noPreference)} options={(field.options||[]).map(o=>({value:o.value,label:o[language]}))} invalid={!!error} describedBy={describedBy} disabled={pending}/>
      :field.kind==="date"
        ?<DatePicker id={id} value={value} onChange={v=>setDetail(field.key,v)} min={minDate||undefined} invalid={!!error} describedBy={describedBy} disabled={pending}/>
        :field.kind==="count"
          ?<CountField id={id} value={value} onChange={v=>setDetail(field.key,v)} invalid={!!error} describedBy={describedBy} disabled={pending}/>
          :<input id={id} className="ui-field ui-input" name={field.key} maxLength={160} autoComplete={field.autocomplete||"off"} value={value} disabled={pending} onChange={event=>setDetail(field.key,event.target.value)} aria-invalid={!!error||undefined} aria-describedby={describedBy}/>;
    return <div className={`form-field${field.key==="route"?" is-wide":""}`} key={field.key}>
      <label htmlFor={id}>{inLanguage(language,field)}</label>
      {control}
      {error&&<span id={errorId(field.key)} className="field-error">{error}</span>}
    </div>;
  };

  return <form noValidate aria-busy={pending} onSubmit={event=>{event.preventDefault();void submit(false)}}>
    <p className="sr-only" aria-live="polite">{liveMessage}</p>
    {state==="invalid"&&<div className="form-alert" role="alert" tabIndex={-1} ref={summaryRef}>
      <strong>{inLanguage(language,copy.invalid)}</strong>
      <button type="button" onClick={()=>document.getElementById(`enquiry-${Object.keys(errors)[0]?.replace("details.","")}`)?.focus()}>{t("Go to the first one","पहिल्या चुकीकडे जा")}</button>
    </div>}
    {(state==="delivery-error"||state==="unavailable")&&<div className="form-alert form-delivery-alert" role="alert">
      <h3 ref={statusHeadingRef} tabIndex={-1}>{inLanguage(language,state==="unavailable"?copy.unavailableHeading:copy.errorHeading)}</h3>
      <p>{inLanguage(language,state==="unavailable"?copy.unavailableBody:copy.errorBody)}</p>
      {state==="delivery-error"&&<FallbackLinks language={language} service={service} values={values} activeFields={activeFields}/>}
    </div>}
    <fieldset className="form-services" disabled={pending}><legend>{t("Service *","सेवा *")}</legend><div className="service-select">{(Object.keys(services) as Service[]).map(option=><button key={option} type="button" aria-pressed={service===option} onClick={()=>{setService(option);setState("idle");setErrors({})}}>{inLanguage(language,services[option])}</button>)}</div></fieldset>
    <div className="form-grid">
      <div className="form-field">
        <label htmlFor="enquiry-name">{t("Your name *","तुमचे नाव *")}</label>
        <input id="enquiry-name" className="ui-field ui-input" name="name" required maxLength={80} autoComplete="name" value={values.name} disabled={pending} onChange={event=>setValue("name",event.target.value)} aria-invalid={!!errors.name||undefined} aria-describedby={errors.name?"enquiry-name-error":undefined}/>
        {errors.name&&<span id="enquiry-name-error" className="field-error">{errors.name}</span>}
      </div>
      <div className="form-field">
        <label htmlFor="enquiry-phone">{t("Mobile number *","मोबाइल नंबर *")}</label>
        <PhoneField id="enquiry-phone" value={values.phone} onChange={v=>setValue("phone",v)} required invalid={!!errors.phone} describedBy={errors.phone?"enquiry-phone-error":undefined} disabled={pending}/>
        {errors.phone&&<span id="enquiry-phone-error" className="field-error">{errors.phone}</span>}
      </div>
      {activeFields.map(renderField)}
    </div>
    <div className="form-field">
      <label htmlFor="enquiry-message">{t("Anything else","इतर माहिती")}</label>
      <textarea id="enquiry-message" className="ui-field ui-textarea" name="message" rows={4} maxLength={1200} value={values.message} disabled={pending} onChange={event=>setValue("message",event.target.value)} aria-invalid={!!errors.message||undefined} aria-describedby={errors.message?"enquiry-message-hint enquiry-message-error":"enquiry-message-hint"}/>
      <span id="enquiry-message-hint" className="field-hint">{t(`Optional. ${values.message.length} of 1200 characters.`,`ऐच्छिक. ${values.message.length} / 1200 अक्षरे.`)}</span>
      {errors.message&&<span id="enquiry-message-error" className="field-error">{errors.message}</span>}
    </div>
    <div className="enquiry-honeypot" aria-hidden="true"><label htmlFor="enquiry-website">Website</label><input id="enquiry-website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={event=>setValue("website",event.target.value)}/></div>
    <div className="form-actions">
      <p className="form-required-note">{inLanguage(language,copy.required)}</p>
      <button className="btn btn-ghost form-clear" type="button" disabled={pending} onClick={reset}><span className="btn-label">{inLanguage(language,copy.clear)}</span><span className="btn-icon"><Icon name="close" size={16}/></span></button>
      {state==="unavailable"
        ?<a className="btn btn-whatsapp form-submit" href={whatsappLink(whatsappMessage(service,values,activeFields))} target="_blank" rel="noreferrer"><span className="btn-label">{t("Send on WhatsApp","व्हॉट्सॲपवर पाठवा")}</span><span className="btn-icon"><Icon name="whatsapp" size={18}/></span></a>
        :state==="delivery-error"
          ?<button className="btn btn-primary form-submit" type="button" disabled={pending} onClick={()=>void submit(true)}><span className="btn-label">{pending?inLanguage(language,copy.sending):inLanguage(language,copy.retry)}</span><span className="btn-icon">{pending?<span className="btn-spinner"/>:<Icon name="send" size={17}/>}</span></button>
          :<button className="btn btn-primary form-submit" type="submit" disabled={pending}><span className="btn-label">{pending?inLanguage(language,copy.sending):inLanguage(language,copy.send)}</span><span className="btn-icon">{pending?<span className="btn-spinner"/>:<Icon name="send" size={17}/>}</span></button>}
    </div>
  </form>;
}
