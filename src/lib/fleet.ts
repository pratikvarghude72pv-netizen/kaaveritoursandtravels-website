import {siteMedia,type SiteImage} from "@/lib/media";

type Copy={en:string;mr:string};
export type FleetPhoto={id:string;image:SiteImage;alt:Copy;caption:Copy};

/**
 * Kaaveri's own Tempo Traveller minibus, photographed by Sid (not licensed stock, unlike the sedan/SUV
 * photos elsewhere on the site). Seat count is left unstated until the owner confirms the exact figure;
 * do not guess it from the photos.
 */
export const fleetPhotos:FleetPhoto[]=[
  {id:"seats-aisle",image:siteMedia.fleetSeatsAisle,alt:{en:"Rows of seats with headrests and window curtains inside Kaaveri's Tempo Traveller",mr:"कावेरीच्या टेम्पो ट्रॅव्हलरमधील हेडरेस्टसह सीट्सच्या रांगा आणि खिडक्यांचे पडदे"},caption:{en:"Rows of seats with headrests, curtains on the windows",mr:"हेडरेस्टसह सीट्सच्या रांगा, खिडक्यांना पडदे"}},
  {id:"dashboard-front",image:siteMedia.fleetDashboardFront,alt:{en:"The driver's cabin and two front seats of Kaaveri's Tempo Traveller",mr:"कावेरीच्या टेम्पो ट्रॅव्हलरचे चालक कक्ष आणि दोन पुढील आसने"},caption:{en:"Driver's cabin with two seats beside the driver",mr:"चालक कक्ष आणि चालकाशेजारी दोन आसने"}},
  {id:"dashboard-dusk",image:siteMedia.fleetDashboardDusk,alt:{en:"The driver's cabin of Kaaveri's Tempo Traveller in evening light",mr:"संध्याकाळच्या प्रकाशात कावेरीच्या टेम्पो ट्रॅव्हलरचे चालक कक्ष"},caption:{en:"The driver's seat in evening light",mr:"संध्याकाळच्या प्रकाशात चालकाची जागा"}}
];
