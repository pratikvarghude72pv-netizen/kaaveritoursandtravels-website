import {handleEnquiry,MAX_BODY_BYTES} from "@/lib/enquiry-contract";
import {enquiryDelivery} from "@/lib/enquiry-delivery.server";

export const runtime="nodejs";

const jsonHeaders={"Cache-Control":"no-store","Content-Type":"application/json; charset=utf-8"};
const reply=(body:Awaited<ReturnType<typeof handleEnquiry>>)=>Response.json(body,{status:body.status,headers:jsonHeaders});
const invalid=()=>Response.json({status:400,code:"invalid_request"},{status:400,headers:jsonHeaders});

// Best-effort burst limit per server instance; a platform firewall or CAPTCHA is the durable fix.
const WINDOW_MS=10*60*1000;
const MAX_PER_WINDOW=5;
const recent=new Map<string,number[]>();
function rateLimited(request:Request){
  const ip=request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()||request.headers.get("x-real-ip")||"unknown";
  const now=Date.now();
  const hits=(recent.get(ip)||[]).filter(time=>now-time<WINDOW_MS);
  hits.push(now);
  recent.set(ip,hits);
  if(recent.size>5000)for(const [key,times] of recent)if(now-times[times.length-1]>WINDOW_MS)recent.delete(key);
  return hits.length>MAX_PER_WINDOW;
}

function originAllowed(request:Request){
  const origin=request.headers.get("origin");
  const fetchSite=request.headers.get("sec-fetch-site");
  if(fetchSite==="cross-site")return false;
  // Browsers always send Origin on a POST from the enquiry form; scripts that omit it are rejected.
  if(!origin)return false;
  try{
    const originUrl=new URL(origin);
    const forwarded=request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
    const host=forwarded||request.headers.get("host")||new URL(request.url).host;
    return originUrl.host===host;
  }catch{return false}
}

export async function POST(request:Request){
  if(!originAllowed(request))return invalid();
  if(rateLimited(request))return Response.json({status:429,code:"rate_limited"},{status:429,headers:{...jsonHeaders,"Retry-After":"600"}});
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
