import "server-only";
import type {EnquiryTransport,ValidEnquiry} from "@/lib/enquiry-contract";

const RESEND_ENDPOINT="https://api.resend.com/emails";
const DESTINATION="pratikvarghude72.pv@gmail.com";
const TIMEOUT_MS=8000;

function configured(){
  const apiKey=process.env.RESEND_API_KEY?.trim();
  const from=process.env.ENQUIRY_FROM_EMAIL?.trim();
  if(!apiKey||!from||/[\r\n]/.test(from)||!/^.+@.+\..+$/.test(from))return null;
  return {apiKey,from};
}

const labels:Record<string,string>={destination:"Destination",preferredDate:"Travel date",travellers:"Travellers",vehicle:"Vehicle",pickupPoint:"Pickup point",dropPoint:"Drop point",travelDate:"Travel date",passengers:"Passengers",company:"Company",route:"Pickup areas and workplace",startDate:"Start date",schedule:"Shift timings",employees:"Employees"};
const serviceNames:Record<ValidEnquiry["service"],string>={tourism:"Tourism","one-way":"One-way travel",corporate:"Employee transport"};

function plainText(enquiry:ValidEnquiry){
  const details=Object.entries(enquiry.details).map(([key,value])=>`${labels[key]??key}: ${value}`);
  const whatsapp=`https://wa.me/${enquiry.phone.replace(/\D/g,"")}`;
  return [
    "New website enquiry",
    `Service: ${serviceNames[enquiry.service]}`,
    `Name: ${enquiry.name}`,
    `Mobile: ${enquiry.phone}`,
    `Reply on WhatsApp: ${whatsapp}`,
    ...details,
    ...(enquiry.message?[`Other details: ${enquiry.message}`]:[]),
    "",
    `Language used on the site: ${enquiry.language==="mr"?"Marathi":"English"}`,
    `Request ID: ${enquiry.requestId}`,
    "This is an enquiry, not a booking."
  ].join("\n");
}

export const enquiryDelivery:EnquiryTransport={
  async deliver(enquiry,requestId){
    const config=configured();
    if(!config)return {kind:"unavailable"};
    const controller=new AbortController();
    const timeout=setTimeout(()=>controller.abort(),TIMEOUT_MS);
    try{
      const response=await fetch(RESEND_ENDPOINT,{
        method:"POST",
        signal:controller.signal,
        headers:{
          Authorization:`Bearer ${config.apiKey}`,
          "Content-Type":"application/json",
          "Idempotency-Key":requestId
        },
        body:JSON.stringify({
          from:config.from,
          to:[DESTINATION],
          // The sender address has no inbox (Resend's shared sender or a no-mailbox domain address), so replies go to the business Gmail.
          reply_to:DESTINATION,
          subject:`Website enquiry: ${serviceNames[enquiry.service]}, ${enquiry.name}`,
          text:plainText(enquiry)
        })
      });
      if(!response.ok)return {kind:"provider_error"};
      const result:unknown=await response.json().catch(()=>null);
      if(!result||typeof result!=="object"||!("id" in result)||typeof result.id!=="string")return {kind:"provider_error"};
      return {kind:"accepted"};
    }catch{
      return {kind:"provider_error"};
    }finally{
      clearTimeout(timeout);
    }
  }
};
