export const MAX_BODY_BYTES=16*1024;

export type EnquiryLanguage="en"|"mr";
export type EnquiryService="tourism"|"one-way"|"corporate";

export type ValidEnquiry={
  version:1;
  requestId:string;
  language:EnquiryLanguage;
  service:EnquiryService;
  name:string;
  phone:string;
  details:Record<string,string>;
  message?:string;
};

export type DeliveryResult={kind:"accepted"}|{kind:"unavailable"}|{kind:"provider_error"};
export interface EnquiryTransport{deliver(enquiry:ValidEnquiry,requestId:string):Promise<DeliveryResult>}

export type EnquiryResult=
  |{status:200;code:"accepted";requestId:string}
  |{status:400;code:"invalid_request"}
  |{status:413;code:"payload_too_large"}
  |{status:422;code:"invalid_fields";fieldErrors?:Record<string,string>}
  |{status:502;code:"delivery_failed";requestId:string}
  |{status:503;code:"delivery_unavailable";requestId:string};

const topLevelKeys=new Set(["version","requestId","language","service","name","phone","details","message","website"]);
const detailKeys:Record<EnquiryService,Set<string>>={
  tourism:new Set(["destination","preferredDate","travellers"]),
  "one-way":new Set(["pickupPoint","dropPoint","travelDate","passengers"]),
  corporate:new Set(["company","route","schedule","employeesOrBuses"])
};
const uuidV4=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const phoneCharacters=/^[0-9+()\- ]+$/;

function isRecord(value:unknown):value is Record<string,unknown>{return typeof value==="object"&&value!==null&&!Array.isArray(value)}
function singleLine(value:string){return value.normalize("NFC").trim().replace(/[\t ]+/g," ")}
function hasLineBreak(value:string){return /[\r\n]/.test(value)}

function parse(input:unknown):{enquiry?:ValidEnquiry;result?:EnquiryResult;bot?:boolean}{
  if(!isRecord(input)||Object.keys(input).some((key)=>!topLevelKeys.has(key)))return {result:{status:400,code:"invalid_request"}};
  if(typeof input.website==="string"&&input.website.trim())return {bot:true,result:{status:422,code:"invalid_fields"}};
  if(input.version!==1||typeof input.requestId!=="string"||!uuidV4.test(input.requestId)||
    (input.language!=="en"&&input.language!=="mr")||
    (input.service!=="tourism"&&input.service!=="one-way"&&input.service!=="corporate")||
    typeof input.name!=="string"||typeof input.phone!=="string"||
    (input.message!==undefined&&typeof input.message!=="string")||
    (input.details!==undefined&&!isRecord(input.details))){
    return {result:{status:400,code:"invalid_request"}};
  }

  const service=input.service;
  const name=singleLine(input.name);
  const phone=singleLine(input.phone);
  const message=input.message?.normalize("NFC").trim();
  const errors:Record<string,string>={};
  if(hasLineBreak(input.name)||name.length<2)errors.name="required";
  else if(name.length>80)errors.name="too_long";
  const digitCount=(phone.match(/\d/g)||[]).length;
  if(hasLineBreak(input.phone)||phone.length<7||phone.length>20||!phoneCharacters.test(phone)||digitCount<7)errors.phone="invalid";
  if(message&&message.length>1200)errors.message="too_long";

  const rawDetails=input.details??{};
  const allowed=detailKeys[service];
  const details:Record<string,string>={};
  for(const [key,value] of Object.entries(rawDetails)){
    if(!allowed.has(key)||typeof value!=="string"){errors.details="invalid";continue}
    const normalized=singleLine(value);
    if(hasLineBreak(value)||normalized.length<1)errors[`details.${key}`]="required";
    else if(normalized.length>160)errors[`details.${key}`]="too_long";
    else details[key]=normalized;
  }
  if(Object.keys(errors).length)return {result:{status:422,code:"invalid_fields",fieldErrors:errors}};
  return {enquiry:{version:1,requestId:input.requestId,language:input.language,service,name,phone,details,...(message?{message}:{})}};
}

export async function handleEnquiry(input:unknown,transport:EnquiryTransport,bodyBytes:number):Promise<EnquiryResult>{
  if(bodyBytes>MAX_BODY_BYTES)return {status:413,code:"payload_too_large"};
  const parsed=parse(input);
  if(parsed.result)return parsed.result;
  const enquiry=parsed.enquiry!;
  try{
    const delivery=await transport.deliver(enquiry,enquiry.requestId);
    if(delivery.kind==="accepted")return {status:200,code:"accepted",requestId:enquiry.requestId};
    if(delivery.kind==="unavailable")return {status:503,code:"delivery_unavailable",requestId:enquiry.requestId};
    return {status:502,code:"delivery_failed",requestId:enquiry.requestId};
  }catch{
    return {status:502,code:"delivery_failed",requestId:enquiry.requestId};
  }
}
