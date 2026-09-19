import {handleEnquiry,MAX_BODY_BYTES} from "@/lib/enquiry-contract";
import {enquiryDelivery} from "@/lib/enquiry-delivery.server";

export const runtime="nodejs";

const jsonHeaders={"Cache-Control":"no-store","Content-Type":"application/json; charset=utf-8"};
const reply=(body:Awaited<ReturnType<typeof handleEnquiry>>)=>Response.json(body,{status:body.status,headers:jsonHeaders});
const invalid=()=>Response.json({status:400,code:"invalid_request"},{status:400,headers:jsonHeaders});

function originAllowed(request:Request){
  const origin=request.headers.get("origin");
  const fetchSite=request.headers.get("sec-fetch-site");
  if(fetchSite==="cross-site")return false;
  if(!origin)return true;
  try{
    const originUrl=new URL(origin);
    const forwarded=request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
    const host=forwarded||request.headers.get("host")||new URL(request.url).host;
    return originUrl.host===host;
  }catch{return false}
}

export async function POST(request:Request){
  if(!originAllowed(request))return invalid();
  const contentType=request.headers.get("content-type")?.toLowerCase()||"";
  if(!contentType.startsWith("application/json"))return invalid();
  const declared=Number(request.headers.get("content-length"));
  if(Number.isFinite(declared)&&declared>MAX_BODY_BYTES)return reply({status:413,code:"payload_too_large"});
  let text:string;
  try{text=await request.text()}catch{return invalid()}
  const bytes=new TextEncoder().encode(text).byteLength;
  if(bytes>MAX_BODY_BYTES)return reply({status:413,code:"payload_too_large"});
  let input:unknown;
  try{input=JSON.parse(text)}catch{return invalid()}
  return reply(await handleEnquiry(input,enquiryDelivery,bytes));
}
