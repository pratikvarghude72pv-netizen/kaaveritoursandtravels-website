"use client";

import {useEffect,useMemo,useRef,useState} from "react";
import {useLanguage,type Language} from "@/components/language";

type Service="tourism"|"one-way"|"corporate";
type MachineState="idle"|"invalid"|"pending"|"success"|"delivery-error"|"retry-pending"|"unavailable";
type Values={name:string;phone:string;message:string;website:string;details:Record<string,string>};

const services:Record<Service,{en:string;mr:string}>={
  tourism:{en:"Tourism",mr:"पर्यटन"},
  "one-way":{en:"One-way travel",mr:"एकमार्गी प्रवास"},
  corporate:{en:"Corporate transportation",mr:"कॉर्पोरेट वाहतूक"}
};
const fields:Record<Service,{key:string;en:string;mr:string;autocomplete?:string}[]>={
  tourism:[{key:"destination",en:"Destination",mr:"स्थळ"},{key:"preferredDate",en:"Preferred date",mr:"पसंतीची तारीख"},{key:"travellers",en:"Travellers",mr:"प्रवासी"}],
  "one-way":[{key:"pickupPoint",en:"Pickup point",mr:"पिकअप ठिकाण"},{key:"dropPoint",en:"Drop point",mr:"ड्रॉप ठिकाण"},{key:"travelDate",en:"Travel date",mr:"प्रवासाची तारीख"},{key:"passengers",en:"Passengers",mr:"प्रवासी संख्या"}],
  corporate:[{key:"company",en:"Company / organisation",mr:"कंपनी / संस्था",autocomplete:"organization"},{key:"route",en:"Pickup and drop route",mr:"पिकअप आणि ड्रॉप मार्ग"},{key:"schedule",en:"Shift / schedule",mr:"शिफ्ट / वेळापत्रक"},{key:"employeesOrBuses",en:"Employees or buses required",mr:"कर्मचारी किंवा आवश्यक बस"}]
};
const initialValues:Values={name:"",phone:"",message:"",website:"",details:{}};

const copy={
  required:{en:"Required fields are marked *.",mr:"आवश्यक माहिती * ने दर्शवली आहे."},
  invalid:{en:"Check the highlighted details before sending your enquiry.",mr:"तुमची चौकशी पाठवण्यापूर्वी दाखवलेले तपशील तपासा."},
  name:{en:"Enter your name.",mr:"तुमचे नाव लिहा."},
  phone:{en:"Enter a phone or WhatsApp number.",mr:"फोन किंवा व्हॉट्सअॅप नंबर लिहा."},
  phoneInvalid:{en:"Enter a valid phone or WhatsApp number.",mr:"वैध फोन किंवा व्हॉट्सअॅप नंबर लिहा."},
  tooLong:{en:"This is too long. Shorten it and try again.",mr:"हा मजकूर खूप मोठा आहे. तो लहान करून पुन्हा प्रयत्न करा."},
  send:{en:"Send enquiry request",mr:"चौकशी विनंती पाठवा"},
  sending:{en:"Sending your enquiry…",mr:"तुमची चौकशी पाठवत आहोत…"},
  successHeading:{en:"Your enquiry has been received.",mr:"तुमची चौकशी मिळाली आहे."},
  successBody:{en:"Kaaveri Tours and Travels will review the details and contact you to continue the conversation. This is not a booking confirmation.",mr:"Kaaveri Tours and Travels तुमचे तपशील पाहून पुढील संवादासाठी संपर्क करेल. ही बुकिंगची पुष्टी नाही."},
  newEnquiry:{en:"Send another enquiry",mr:"दुसरी चौकशी पाठवा"},
  errorHeading:{en:"We could not send your enquiry.",mr:"तुमची चौकशी पाठवता आली नाही."},
  errorBody:{en:"Your details are still here. Try again, or use WhatsApp, phone, or email.",mr:"तुमचे तपशील येथेच आहेत. पुन्हा प्रयत्न करा किंवा व्हॉट्सअॅप, फोन किंवा ईमेल वापरा."},
  retry:{en:"Try again",mr:"पुन्हा प्रयत्न करा"},
  unavailableHeading:{en:"Online enquiry is temporarily unavailable.",mr:"ऑनलाइन चौकशी सध्या उपलब्ध नाही."},
  unavailableBody:{en:"Please use WhatsApp, call 9272727216 or 8600320320, or email pratikvarghude72.pv@gmail.com.",mr:"कृपया व्हॉट्सअॅप वापरा, 9272727216 किंवा 8600320320 वर कॉल करा किंवा pratikvarghude72.pv@gmail.com वर ईमेल करा."},
  clear:{en:"Clear form",mr:"फॉर्म साफ करा"}
} as const;

function inLanguage(language:Language,value:{en:string;mr:string}){return value[language]}

function FallbackLinks({language,service}:{language:Language;service:Service}){
  const message=encodeURIComponent(`Hello Kaaveri, I have a ${services[service].en} enquiry.`);
  return <div className="enquiry-fallbacks" aria-label={language==="mr"?"पर्यायी संपर्क":"Alternative contact options"}>
    <a href={`https://wa.me/919272727216?text=${message}`} target="_blank" rel="noreferrer">WhatsApp <span className="sr-only">({language==="mr"?"नवीन टॅबमध्ये उघडते":"opens in a new tab"})</span></a>
    <a href="tel:+919272727216">9272727216</a>
    <a href="tel:+918600320320">8600320320</a>
    <a href="mailto:pratikvarghude72.pv@gmail.com">pratikvarghude72.pv@gmail.com</a>
  </div>;
}

export function EnquiryForm(){
  const {language}=useLanguage();
  const [service,setService]=useState<Service>("tourism");
  const [values,setValues]=useState<Values>(initialValues);
  const [state,setState]=useState<MachineState>("idle");
  const [errors,setErrors]=useState<Record<string,string>>({});
  const requestId=useRef("");
  const inFlight=useRef(false);
  const summaryRef=useRef<HTMLDivElement>(null);
  const statusHeadingRef=useRef<HTMLHeadingElement>(null);

  useEffect(()=>{
    const frame=window.requestAnimationFrame(()=>{
      const searchParams=new URLSearchParams(window.location.search);
      const destination=searchParams.get("destination");
      const requestedService=searchParams.get("service");
      if(destination)setValues(previous=>({...previous,details:{...previous.details,destination}}));
      if(requestedService==="tourism"||requestedService==="one-way"||requestedService==="corporate")setService(requestedService);
    });
    return()=>window.cancelAnimationFrame(frame);
  },[]);
  useEffect(()=>{
    if(state==="invalid")summaryRef.current?.focus();
    if(state==="delivery-error"||state==="unavailable"||state==="success")statusHeadingRef.current?.focus();
  },[state]);

  const pending=state==="pending"||state==="retry-pending";
  const liveMessage=state==="pending"||state==="retry-pending"?inLanguage(language,copy.sending):state==="success"?inLanguage(language,copy.successHeading):"";
  const activeFields=useMemo(()=>fields[service],[service]);

  const setValue=(key:"name"|"phone"|"message"|"website",value:string)=>{
    setValues(previous=>({...previous,[key]:value}));
    if(errors[key])setErrors(previous=>{const next={...previous};delete next[key];return next});
  };
  const setDetail=(key:string,value:string)=>{
    setValues(previous=>({...previous,details:{...previous.details,[key]:value}}));
    if(errors[`details.${key}`])setErrors(previous=>{const next={...previous};delete next[`details.${key}`];return next});
  };
  const reset=(newRequest=true)=>{
    setValues(initialValues);setErrors({});setState("idle");
    if(newRequest)requestId.current="";
  };
  const validate=()=>{
    const next:Record<string,string>={};
    const name=values.name.trim();
    const phone=values.phone.trim();
    if(name.length<2)next.name=inLanguage(language,copy.name);else if(name.length>80)next.name=inLanguage(language,copy.tooLong);
    if(!phone)next.phone=inLanguage(language,copy.phone);else if(phone.length>20||!/^[0-9+()\- ]+$/.test(phone)||(phone.match(/\d/g)||[]).length<7)next.phone=inLanguage(language,copy.phoneInvalid);
    if(values.message.length>1200)next.message=inLanguage(language,copy.tooLong);
    for(const field of activeFields)if((values.details[field.key]||"").length>160)next[`details.${field.key}`]=inLanguage(language,copy.tooLong);
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
      const response=await fetch("/api/enquiry",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({version:1,requestId:requestId.current,language,service,name:values.name,phone:values.phone,details,message:values.message,website:values.website})});
      const result:unknown=await response.json().catch(()=>null);
      const code=result&&typeof result==="object"&&"code" in result?result.code:null;
      if(response.ok&&code==="accepted"){setState("success");return}
      if(code==="invalid_fields"&&result&&typeof result==="object"&&"fieldErrors" in result&&result.fieldErrors&&typeof result.fieldErrors==="object"){
        const mapped=Object.fromEntries(Object.keys(result.fieldErrors as object).map(key=>[key,inLanguage(language,copy.tooLong)]));
        setErrors(mapped);setState("invalid");return;
      }
      setState(code==="delivery_unavailable"?"unavailable":"delivery-error");
    }catch{setState("delivery-error")}
    finally{inFlight.current=false}
  };

  if(state==="success")return <div className="enquiry-receipt" role="status">
    <p className="sr-only" aria-live="polite">{liveMessage}</p>
    <h3 ref={statusHeadingRef} tabIndex={-1}>{inLanguage(language,copy.successHeading)}</h3>
    <p>{inLanguage(language,copy.successBody)}</p>
    <button className="pill dark" type="button" onClick={()=>reset(true)}>{inLanguage(language,copy.newEnquiry)}</button>
  </div>;

  return <form noValidate aria-busy={pending} onSubmit={event=>{event.preventDefault();void submit(false)}}>
    <p className="form-required-note">{inLanguage(language,copy.required)}</p>
    <p className="sr-only" aria-live="polite">{liveMessage}</p>
    {state==="invalid"&&<div className="form-alert" role="alert" tabIndex={-1} ref={summaryRef}>
      <strong>{inLanguage(language,copy.invalid)}</strong>
      <button type="button" onClick={()=>document.getElementById(`enquiry-${Object.keys(errors)[0]?.replace("details.","")}`)?.focus()}>{language==="mr"?"पहिली चूक तपासा":"Go to the first error"}</button>
    </div>}
    {(state==="delivery-error"||state==="unavailable")&&<div className="form-alert form-delivery-alert" role="alert">
      <h3 ref={statusHeadingRef} tabIndex={-1}>{inLanguage(language,state==="unavailable"?copy.unavailableHeading:copy.errorHeading)}</h3>
      <p>{inLanguage(language,state==="unavailable"?copy.unavailableBody:copy.errorBody)}</p>
      <FallbackLinks language={language} service={service}/>
    </div>}
    <fieldset disabled={pending}><legend>{language==="mr"?"सेवा निवडा *":"Choose a service *"}</legend><div className="service-select">{(Object.keys(services) as Service[]).map(option=><button key={option} type="button" aria-pressed={service===option} className={service===option?"selected":""} onClick={()=>{setService(option);setState("idle");setErrors({})}}>{inLanguage(language,services[option])}</button>)}</div></fieldset>
    <div className="form-grid">
      <label htmlFor="enquiry-name">{language==="mr"?"तुमचे नाव *":"Your name *"}<input id="enquiry-name" name="name" required maxLength={80} autoComplete="name" value={values.name} onChange={event=>setValue("name",event.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name?"enquiry-name-error":undefined}/>{errors.name&&<span id="enquiry-name-error" className="field-error">{errors.name}</span>}</label>
      <label htmlFor="enquiry-phone">{language==="mr"?"फोन किंवा व्हॉट्सअॅप *":"Phone or WhatsApp *"}<input id="enquiry-phone" name="phone" type="tel" required maxLength={20} autoComplete="tel" value={values.phone} onChange={event=>setValue("phone",event.target.value)} aria-invalid={!!errors.phone} aria-describedby={errors.phone?"enquiry-phone-error":undefined}/>{errors.phone&&<span id="enquiry-phone-error" className="field-error">{errors.phone}</span>}</label>
      {activeFields.map(field=>{const error=errors[`details.${field.key}`];return <label htmlFor={`enquiry-${field.key}`} key={field.key}>{inLanguage(language,field)}<input id={`enquiry-${field.key}`} name={field.key} maxLength={160} autoComplete={field.autocomplete||"off"} value={values.details[field.key]||""} onChange={event=>setDetail(field.key,event.target.value)} aria-invalid={!!error} aria-describedby={error?`enquiry-${field.key}-error`:undefined}/>{error&&<span id={`enquiry-${field.key}-error`} className="field-error">{error}</span>}</label>})}
    </div>
    <label htmlFor="enquiry-message">{language==="mr"?"अतिरिक्त तपशील (पर्यायी)":"Additional details (optional)"}<textarea id="enquiry-message" name="message" rows={5} maxLength={1200} value={values.message} onChange={event=>setValue("message",event.target.value)} aria-invalid={!!errors.message} aria-describedby={errors.message?"enquiry-message-hint enquiry-message-error":"enquiry-message-hint"}/><span id="enquiry-message-hint" className="field-hint">{language==="mr"?"कमाल 1200 अक्षरे.":"Up to 1200 characters."}</span>{errors.message&&<span id="enquiry-message-error" className="field-error">{errors.message}</span>}</label>
    <div className="enquiry-honeypot" aria-hidden="true"><label htmlFor="enquiry-website">Website<input id="enquiry-website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={event=>setValue("website",event.target.value)}/></label></div>
    <FallbackLinks language={language} service={service}/>
    <div className="form-actions">
      <button className="pill form-clear" type="button" disabled={pending} onClick={()=>reset(true)}>{inLanguage(language,copy.clear)}</button>
      {state==="delivery-error"||state==="unavailable"?<button className="pill dark form-submit" type="button" disabled={pending} onClick={()=>void submit(true)}>{pending?inLanguage(language,copy.sending):inLanguage(language,copy.retry)}</button>:<button className="pill dark form-submit" type="submit" disabled={pending}>{pending?inLanguage(language,copy.sending):inLanguage(language,copy.send)}</button>}
    </div>
  </form>;
}
