import {siteMedia,type SiteImage} from "@/lib/media";

type Copy={en:string;mr:string};

export type Vehicle={id:string;name:Copy;tag:Copy;copy:Copy;bestFor:Copy;image?:SiteImage;imageAlt?:Copy};

/**
 * Travel classes Kaaveri accepts enquiries for, named by class (sedan / SUV), never by model.
 * Only the Tempo Traveller is Kaaveri's own vehicle and has photographs; sedan and SUV are arranged on request, with no photo.
 * The exact vehicle is confirmed during the enquiry conversation.
 */
export const vehicles=[
  {
    id:"sedan",
    name:{en:"Sedan",mr:"सेडान"},
    tag:{en:"Up to four passengers with luggage",mr:"सामानासह चार प्रवाशांपर्यंत"},
    copy:{en:"A comfortable car for up to four passengers and their luggage. Well suited to one-way transfers, temple visits and business trips around the region.",mr:"चार प्रवासी आणि त्यांच्या सामानासाठी आरामदायक गाडी. एकमार्गी प्रवास, मंदिरदर्शन आणि परिसरातील कामाच्या प्रवासासाठी योग्य."},
    bestFor:{en:"one-way travel, small groups and temple visits",mr:"एकमार्गी प्रवास, छोटे गट आणि मंदिरदर्शन"}
  },
  {
    id:"suv",
    name:{en:"SUV",mr:"एसयूव्ही"},
    tag:{en:"Six to seven passengers with luggage",mr:"सामानासह सहा ते सात प्रवासी"},
    copy:{en:"A roomy seven-seater SUV for families and groups, with space for everyone's bags. A good choice for temple trips and full heritage days out of the city.",mr:"कुटुंब आणि गटांसाठी प्रशस्त सात आसनी एसयूव्ही, सर्वांच्या सामानासाठी जागा. मंदिर सहली आणि शहराबाहेरच्या दिवसभराच्या वारसा सहलींसाठी चांगला पर्याय."},
    bestFor:{en:"family trips, full tourism days and group temple visits",mr:"कौटुंबिक प्रवास, दिवसभराच्या सहली आणि गट मंदिरदर्शन"},
  },
  {
    id:"traveller",
    name:{en:"Tempo Traveller",mr:"टेम्पो ट्रॅव्हलर"},
    tag:{en:"A minibus for larger groups, with luggage space",mr:"मोठ्या गटांसाठी मिनीबस, सामानासाठी जागेसह"},
    copy:{en:"Kaaveri's own minibus, with cushioned seats and headrests and curtains on the windows. Built for large family groups, pilgrimage parties and company outings that need more than an SUV can carry.",mr:"कावेरीची स्वतःची मिनीबस, हेडरेस्टसह गादीच्या सीट्स आणि खिडक्यांना पडदे यांसह. मोठे कौटुंबिक गट, यात्रा गट आणि एसयूव्हीपेक्षा जास्त जागा लागणाऱ्या कंपनी सहलींसाठी."},
    bestFor:{en:"large groups, pilgrimage parties and company outings",mr:"मोठे गट, यात्रा गट आणि कंपनी सहली"},
    image:siteMedia.fleetSideSunsetDoor,
    imageAlt:{en:"The side and driver\'s door of Kaaveri\'s grey Tempo Traveller in evening light",mr:"संध्याकाळच्या प्रकाशात कावेरीच्या राखाडी टेम्पो ट्रॅव्हलरची बाजू आणि चालकाचा दरवाजा"}
  }
] as const satisfies readonly Vehicle[];

export const vehicleOptions=[{value:"Sedan",en:"Sedan",mr:"सेडान"},{value:"SUV",en:"SUV, 6 to 7 seats",mr:"एसयूव्ही, ६ ते ७ आसने"},{value:"Traveller",en:"Tempo Traveller (large groups)",mr:"टेम्पो ट्रॅव्हलर (मोठे गट)"}] as const;
