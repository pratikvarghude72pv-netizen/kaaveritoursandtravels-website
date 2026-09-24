import {siteMedia,type SiteImage} from "@/lib/media";

type Copy={en:string;mr:string};

export type Vehicle={id:string;name:Copy;tag:Copy;copy:Copy;bestFor:Copy;image:SiteImage;imageAlt:Copy};

/**
 * Illustrative travel classes Kaaveri accepts enquiries for. Photographs are
 * licensed examples of each class — never claims about specific own vehicles.
 * The exact vehicle is confirmed during the enquiry conversation.
 */
export const vehicles=[
  {
    id:"sedan",
    name:{en:"Sedan",mr:"सेडान"},
    tag:{en:"Four passengers · luggage · everyday comfort",mr:"चार प्रवासी · सामान · दैनंदिन आराम"},
    copy:{en:"A practical saloon for up to four passengers with luggage — well suited to one-way transfers, temple visits and short business journeys around the region.",mr:"चार प्रवासी व त्यांचा सामान नेण्यासाठी योग्य सेडान गाडी — एकमार्गी प्रवास, मंदिरदर्शन आणि परिसरातील छोट्या कामाच्या वापरासाठी सोयीस्कर."},
    bestFor:{en:"One-way travel · Small groups · Temple visits",mr:"एकमार्गी प्रवास · छोटे गट · मंदिरदर्शन"},
    image:siteMedia.sedan,
    imageAlt:{en:"Sedan example — Maruti Suzuki Dzire, illustrative photograph",mr:"सेडान उदाहरण — मारुती सुझुकी डझायर, उदाहरणार्थ फोटो"}
  },
  {
    id:"innova-crysta",
    name:{en:"Innova Crysta",mr:"इनोव्हा क्रिस्टा"},
    tag:{en:"Seven seats · family room · long-day comfort",mr:"सात जागा · कुटुंबासाठी सोय · दीर्घप्रवास आराम"},
    copy:{en:"A seven-seat MPV with room for the whole group and their bags — the natural choice for family temple tours and long heritage days out of the city.",mr:"संपूर्ण गट व त्यांचे सामान बसण्यासाठी पुरेशी सोय असलेली सात आसनी एम.पी.व्ही. — कुटुंबाच्या मंदिरदर्शन व शहरबाहेरच्या दीर्घ वारसा-प्रवासासाठी उत्तम निवड."},
    bestFor:{en:"Family journeys · Tourism days · Group temple trips",mr:"कौटुंबिक प्रवास · पर्यटन दिवस · गट मंदिरदर्शन"},
    image:siteMedia.crysta,
    imageAlt:{en:"Innova Crysta example — Toyota Innova Crysta, illustrative photograph",mr:"इनोव्हा क्रिस्टा उदाहरण — टोयोटा इनोव्हा क्रिस्टा, उदाहरणार्थ फोटो"}
  }
] as const satisfies readonly Vehicle[];

export const vehicleOptions=[{value:"Sedan",en:"Sedan",mr:"सेडान"},{value:"Innova Crysta",en:"Innova Crysta",mr:"इनोव्हा क्रिस्टा"}] as const;
