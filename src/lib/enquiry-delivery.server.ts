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

function plainText(enquiry:ValidEnquiry){
  const details=Object.entries(enquiry.details).map(([key,value])=>`${key}: ${value}`);
  return [
    "New website enquiry request",
    `Request ID: ${enquiry.requestId}`,
    `Language: ${enquiry.language}`,
    `Service: ${enquiry.service}`,
    `Name: ${enquiry.name}`,
    `Phone or WhatsApp: ${enquiry.phone}`,
    ...details,
    ...(enquiry.message?[`Additional details: ${enquiry.message}`]:[]),
    "",
    "This is an enquiry request for manual review. It is not a booking confirmation."
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
          subject:`Kaaveri website enquiry · ${enquiry.service}`,
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
