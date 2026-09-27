import {BilingualText} from "@/components/language";
import {EditorialPage,InfoBand} from "@/components/editorial";
import {Btn} from "@/components/button";
import {contact} from "@/lib/contact";
import {createRouteMetadata} from "@/lib/seo";
import {siteMedia} from "@/lib/media";

export const metadata=createRouteMetadata("/about");


export default function Page(){
  return <EditorialPage eyebrow={<BilingualText en="About" mr="आमच्याबद्दल"/>} title={<BilingualText en="About Kaaveri" mr="कावेरी टूर्स अँड ट्रॅव्हल्स"/>} accent={<BilingualText en="Tours and Travels." mr="विषयी."/>} intro={<BilingualText en="A travel desk in Jyoti Nagar, Chhatrapati Sambhajinagar (formerly Aurangabad). Trips are arranged by phone or WhatsApp. There is no online booking." mr="ज्योती नगर, छत्रपती संभाजीनगर (पूर्वीचे औरंगाबाद) येथील प्रवास कार्यालय. प्रवासाची व्यवस्था फोन किंवा व्हॉट्सॲपवर होते. ऑनलाइन बुकिंग नाही."/>} visual={siteMedia.trimbakeshwar} visualAlt={{en:"Trimbakeshwar Jyotirlinga temple, Nashik district",mr:"त्र्यंबकेश्वर ज्योतिर्लिंग मंदिर, नाशिक जिल्हा"}} service="tourism">
    <section className="shell story-grid"><div><p className="eyebrow"><BilingualText en="Office" mr="कार्यालय"/></p><h2><BilingualText en="Where Kaaveri " mr="कावेरीचे कार्यालय "/><em><BilingualText en="works from." mr="आणि कार्यक्षेत्र."/></em></h2></div><div><p><BilingualText en="The desk is in Jyoti Nagar, near the AMC water tank. Pickup is from the address you give in the city, and trips go as far as Trimbakeshwar in Nashik district and Bhimashankar in Pune district. Calls and messages are answered in Marathi and English." mr="कार्यालय ज्योती नगरमध्ये, एएमसी पाण्याच्या टाकीजवळ आहे. पिकअप शहरातील तुम्ही दिलेल्या पत्त्यावरून होतो; सहली नाशिक जिल्ह्यातील त्र्यंबकेश्वर आणि पुणे जिल्ह्यातील भीमाशंकरपर्यंत जातात. फोन आणि संदेशांना मराठी आणि इंग्रजीत उत्तर दिले जाते."/></p><Btn href={contact.map} icon="pin" variant="navy" label={{en:"Directions to the Kaaveri office on Google Maps",mr:"दिशा पाहा: कावेरी कार्यालय, गूगल मॅप्स"}}><BilingualText en="Directions" mr="दिशा पाहा"/></Btn></div></section>
    <InfoBand eyebrow={<BilingualText en="What to expect" mr="काय अपेक्षित ठेवावे"/>} title={<><BilingualText en="How Kaaveri " mr="कावेरी "/><em><BilingualText en="handles a trip." mr="प्रवास कसा आखते."/></em></>} copy={<BilingualText en="There are no fixed packages. Each trip is set around your date, your group and where you want to be picked up." mr="ठराविक पॅकेजेस नाहीत. प्रत्येक प्रवास तुमची तारीख, तुमचा गट आणि पिकअपचे ठिकाण यानुसार ठरतो."/>} items={[<BilingualText key="a" en="A reply on the phone or WhatsApp, in Marathi or English" mr="फोन किंवा व्हॉट्सॲपवर मराठी किंवा इंग्रजीत उत्तर"/>,<BilingualText key="b" en="A sedan or seven-seater SUV suggested for your group" mr="तुमच्या गटासाठी सेडान किंवा सात आसनी एसयूव्हीची सूचना"/>,<BilingualText key="c" en="Pickup time and fare agreed before the day" mr="प्रवासापूर्वी पिकअपची वेळ आणि भाडे निश्चित"/>,<BilingualText key="d" en="Changes sent on the same chat" mr="बदल त्याच चॅटवर कळवता येतात"/>]}/>
  </EditorialPage>;
}
