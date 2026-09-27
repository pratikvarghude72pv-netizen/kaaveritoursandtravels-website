import {siteMedia,type SiteImage} from "@/lib/media";

type Copy={en:string;mr:string};

export type Vehicle={id:string;name:Copy;tag:Copy;copy:Copy;bestFor:Copy;image:SiteImage;imageAlt:Copy};

/**
 * Travel classes Kaaveri accepts enquiries for, named by class (sedan / SUV), never by model.
 * Photographs are licensed illustrative examples, not Kaaveri's own vehicles.
 * The exact vehicle is confirmed during the enquiry conversation.
 */
export const vehicles=[
  {
    id:"sedan",
    name:{en:"Sedan",mr:"सेडान"},
    tag:{en:"Up to four passengers with luggage",mr:"सामानासह चार प्रवाशांपर्यंत"},
    copy:{en:"A comfortable car for up to four passengers and their luggage. Well suited to one-way transfers, temple visits and business trips around the region.",mr:"चार प्रवासी आणि त्यांच्या सामानासाठी आरामदायक गाडी. एकमार्गी प्रवास, मंदिरदर्शन आणि परिसरातील कामाच्या प्रवासासाठी योग्य."},
    bestFor:{en:"one-way travel, small groups and temple visits",mr:"एकमार्गी प्रवास, छोटे गट आणि मंदिरदर्शन"},
    image:siteMedia.sedan,
    imageAlt:{en:"A white sedan (illustrative photograph)",mr:"पांढरी सेडान गाडी (उदाहरणार्थ फोटो)"}
  },
  {
    id:"suv",
    name:{en:"SUV",mr:"एसयूव्ही"},
    tag:{en:"Six to seven passengers with luggage",mr:"सामानासह सहा ते सात प्रवासी"},
    copy:{en:"A roomy seven-seater SUV for families and groups, with space for everyone's bags. A good choice for temple trips and full heritage days out of the city.",mr:"कुटुंब आणि गटांसाठी प्रशस्त सात आसनी एसयूव्ही, सर्वांच्या सामानासाठी जागा. मंदिर सहली आणि शहराबाहेरच्या दिवसभराच्या वारसा सहलींसाठी चांगला पर्याय."},
    bestFor:{en:"family trips, full tourism days and group temple visits",mr:"कौटुंबिक प्रवास, दिवसभराच्या सहली आणि गट मंदिरदर्शन"},
    image:siteMedia.suv,
    imageAlt:{en:"A white seven-seater SUV (illustrative photograph)",mr:"पांढरी सात आसनी एसयूव्ही (उदाहरणार्थ फोटो)"}
  }
] as const satisfies readonly Vehicle[];

export const vehicleOptions=[{value:"Sedan",en:"Sedan",mr:"सेडान"},{value:"SUV",en:"SUV, 6 to 7 seats",mr:"एसयूव्ही, ६ ते ७ आसने"}] as const;
