import {siteData} from "@/lib/site-data";

/**
 * Every contact link on the site is built here, so a number or address changes in one place.
 * Numbers are stored in E.164 form for tel: and wa.me; display strings come from siteData.
 */
const PRIMARY="+919272727216";
const SECONDARY="+918600320320";
const WHATSAPP="919272727216";

const GREETING="Hello Kaaveri Tours and Travels,\nI would like to enquire about a trip.";

export const contact={
  primaryDisplay:siteData.phone,
  secondaryDisplay:siteData.secondaryPhone,
  email:siteData.email,
  address:siteData.address,
  primaryTel:`tel:${PRIMARY}`,
  secondaryTel:`tel:${SECONDARY}`,
  mailto:`mailto:${siteData.email}?subject=${encodeURIComponent("Travel enquiry")}`,
  map:"https://www.google.com/maps/search/?api=1&query="+encodeURIComponent("Jeevan Sneha Apartment, New SBH Colony, Jyoti Nagar, Chhatrapati Sambhajinagar, Maharashtra")
} as const;

/** WhatsApp chat link with a message already written, so the visitor only has to press send. */
export function whatsappLink(message:string=GREETING){
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
}
