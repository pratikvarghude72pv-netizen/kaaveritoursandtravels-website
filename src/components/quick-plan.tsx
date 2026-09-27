"use client";

import {useState} from "react";
import {useLanguage} from "@/components/language";
import {destinations} from "@/lib/destinations";
import {vehicleOptions} from "@/lib/vehicles";
import {Btn} from "@/components/button";
import {Icon} from "@/components/icons";
import {CountField,DatePicker,Select,todayISO} from "@/components/fields";
import {whatsappLink} from "@/lib/contact";

type Service="tourism"|"one-way"|"corporate";
const heading:Record<Service,{en:string;mr:string}>={tourism:{en:"Pick a place and a date.",mr:"स्थळ आणि तारीख निवडा."},"one-way":{en:"Enter the pickup, drop and date.",mr:"पिकअप, ड्रॉप आणि तारीख भरा."},corporate:{en:"Start a company transport enquiry.",mr:"कंपनी वाहतुकीची चौकशी सुरू करा."}};
const serviceNames:Record<Service,{en:string;mr:string}>={tourism:{en:"Tourism",mr:"पर्यटन"},"one-way":{en:"One-way",mr:"एकमार्गी"},corporate:{en:"Corporate",mr:"कॉर्पोरेट"}};

/** Closing call to action: a few choices become a written WhatsApp message (previewed live) or a pre-filled enquiry form. */
export function QuickPlan({service:initial="tourism"}:{service?:Service}){
  const {language}=useLanguage();
  const t=(en:string,mr:string)=>language==="mr"?mr:en;
  const [service,setService]=useState<Service>(initial);
  const [destination,setDestination]=useState<string>(destinations[0].name.en);
  const [pickup,setPickup]=useState("");
  const [drop,setDrop]=useState("");
  const [company,setCompany]=useState("");
  const [date,setDate]=useState("");
  const [people,setPeople]=useState("");
  const [vehicle,setVehicle]=useState("");
  const chosen=destinations.find(d=>d.name.en===destination);
  const mr=language==="mr";
  const prettyDate=date?new Intl.DateTimeFormat(mr?"mr-IN":"en-IN",{weekday:"short",day:"numeric",month:"short",year:"numeric"}).format(new Date(`${date}T12:00:00`)):"";
  const vehicleLabel=vehicleOptions.find(v=>v.value===vehicle)?.[language]??vehicle;
  const opening=service==="tourism"
    ?t(`I would like to plan a trip to ${destination}.`,`मला ${chosen?.name.mr??destination} सहलीचे नियोजन करायचे आहे.`)
    :service==="one-way"?t("I would like to enquire about one-way travel.","मला एकमार्गी प्रवासाची चौकशी करायची आहे.")
    :t("I would like to enquire about employee transport for our company.","आमच्या कंपनीसाठी कर्मचारी वाहतुकीची चौकशी करायची आहे.");
  const lines=[
    t("Hello Kaaveri Tours and Travels,","नमस्कार कावेरी टूर्स अँड ट्रॅव्हल्स,"),
    opening,
    ...(service==="one-way"&&pickup?[`${t("Pickup","पिकअप")}: ${pickup}`]:[]),
    ...(service==="one-way"&&drop?[`${t("Drop","ड्रॉप")}: ${drop}`]:[]),
    ...(service==="corporate"&&company?[`${t("Company","कंपनी")}: ${company}`]:[]),
    ...(date?[`${service==="corporate"?t("Start date","सुरुवातीची तारीख"):t("Travel date","प्रवासाची तारीख")}: ${prettyDate}`]:[]),
    ...(people?[`${service==="corporate"?t("Employees","कर्मचारी"):t("Travellers","प्रवासी")}: ${people}`]:[]),
    ...(vehicle&&service!=="corporate"?[`${t("Vehicle","वाहन")}: ${vehicleLabel}`]:[]),
    t("Please share the options.","कृपया पर्याय कळवा.")
  ];
  const weekday=date?new Date(`${date}T12:00:00`).getDay():-1;
  const closedWarning=service==="tourism"&&chosen?.closed&&chosen.closed.day===weekday?chosen.closed.note[language]:"";
  const params=new URLSearchParams({service});
  if(service==="tourism")params.set("destination",destination);
  if(service==="one-way"){if(pickup)params.set("pickup",pickup);if(drop)params.set("drop",drop)}
  if(service==="corporate"&&company)params.set("company",company);
  if(date)params.set("date",date);
  if(people)params.set("people",people);
  if(vehicle&&service!=="corporate")params.set("vehicle",vehicle.toLowerCase());
  const formHref=`/contact?${params.toString()}#enquiry`;
  const note=service==="tourism"&&chosen?.closed?{weekday:chosen.closed.day,label:chosen.closed.note[language]}:undefined;

  return <section className="quick-plan" aria-labelledby="quick-plan-title">
    <div className="shell quick-plan-grid">
      <div className="quick-plan-intro">
        <p className="eyebrow">{t("Trip planner","प्रवास नियोजक")}</p>
        <h2 id="quick-plan-title">{heading[initial][language]}</h2>
        <p>{t("Your choices are written into a WhatsApp message, or carried into the enquiry form.","तुमच्या निवडी व्हॉट्सॲप संदेशात लिहिल्या जातात, किंवा चौकशी फॉर्ममध्ये भरल्या जातात.")}</p>
        <ul className="qp-points">
          <li><span><Icon name="whatsapp" size={17}/></span>{t("Reply by phone or WhatsApp","फोन किंवा व्हॉट्सॲपवर उत्तर")}</li>
          <li><span><Icon name="language" size={17}/></span>{t("Marathi or English","मराठी किंवा इंग्रजी")}</li>
          <li><span><Icon name="shield" size={17}/></span>{t("No online payment","ऑनलाइन पेमेंट नाही")}</li>
        </ul>
      </div>
      <div className="quick-plan-card">
        <div className="qp-tabs" role="group" aria-label={t("Service","सेवा")}>
          {(Object.keys(serviceNames) as Service[]).map(s=><button key={s} type="button" aria-pressed={service===s} onClick={()=>setService(s)}>{serviceNames[s][language]}</button>)}
        </div>
        {service==="tourism"&&<fieldset className="qp-destinations"><legend>{t("Destination","स्थळ")}</legend>
          {destinations.map(d=><button key={d.id} type="button" aria-pressed={destination===d.name.en} onClick={()=>setDestination(d.name.en)}><span>{d.name[language]}</span><small>{d.distance[language]}</small></button>)}
        </fieldset>}
        <div className={`qp-fields qp-fields--${service}`}>
          {service==="one-way"&&<>
            <div className="form-field"><label htmlFor="qp-pickup">{t("Pickup","पिकअप")}</label><input id="qp-pickup" className="ui-field ui-input" value={pickup} onChange={e=>setPickup(e.target.value)} maxLength={80} autoComplete="off"/></div>
            <div className="form-field"><label htmlFor="qp-drop">{t("Drop","ड्रॉप")}</label><input id="qp-drop" className="ui-field ui-input" value={drop} onChange={e=>setDrop(e.target.value)} maxLength={80} autoComplete="off"/></div>
          </>}
          {service==="corporate"&&<div className="form-field qp-wide"><label htmlFor="qp-company">{t("Company","कंपनी")}</label><input id="qp-company" className="ui-field ui-input" value={company} onChange={e=>setCompany(e.target.value)} maxLength={80} autoComplete="organization"/></div>}
          <div className="form-field"><label htmlFor="qp-date">{service==="corporate"?t("Start date","सुरुवातीची तारीख"):t("Travel date","प्रवासाची तारीख")}</label><DatePicker id="qp-date" value={date} onChange={setDate} min={todayISO()} note={note}/></div>
          <div className="form-field"><label htmlFor="qp-people">{service==="corporate"?t("Employees","कर्मचारी"):t("Travellers","प्रवासी")}</label><CountField id="qp-people" value={people} onChange={setPeople}/></div>
          {service!=="corporate"&&<div className="form-field"><label htmlFor="qp-vehicle">{t("Vehicle","वाहन")}</label><Select id="qp-vehicle" value={vehicle} onChange={setVehicle} emptyLabel={t("No preference","पसंती नाही")} options={vehicleOptions.map(v=>({value:v.value,label:v[language]}))}/></div>}
        </div>
        {closedWarning&&<p className="qp-warning" role="status"><Icon name="calendar" size={16}/>{t(`${closedWarning}. Pick another date or place.`,`${closedWarning}. दुसरी तारीख किंवा स्थळ निवडा.`)}</p>}
        <div className="qp-preview" aria-live="polite">
          <p className="qp-preview-label"><Icon name="whatsapp" size={15}/>{t("Your WhatsApp message","तुमचा व्हॉट्सॲप संदेश")}</p>
          <p className="qp-bubble">{lines.join("\n")}</p>
        </div>
        <div className="qp-actions">
          <Btn href={whatsappLink(lines.join("\n"))} icon="whatsapp" variant="whatsapp" label={{en:"WhatsApp: send this message",mr:"व्हॉट्सॲप: हा संदेश पाठवा"}}>WhatsApp</Btn>
          <Btn href={formHref} icon="form" variant="ghost" label={{en:"Form: open the enquiry form with these details",mr:"फॉर्म: हे तपशील भरलेला चौकशी फॉर्म"}}>{t("Form","फॉर्म")}</Btn>
        </div>
      </div>
    </div>
  </section>;
}
