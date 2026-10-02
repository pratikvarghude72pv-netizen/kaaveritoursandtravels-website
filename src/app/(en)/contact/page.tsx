import {BilingualText} from "@/components/language";
import {EnquiryForm} from "@/components/enquiry-form";
import {ParallaxMedia} from "@/components/parallax-media";
import {Footer,Header} from "@/components/site";
import {createRouteMetadata} from "@/lib/seo";
import {PageStructuredData} from "@/components/page-structured-data";
import {AnswerPanel} from "@/components/answer-panel";
import {Btn} from "@/components/button";
import {Icon} from "@/components/icons";
import {contact,whatsappLink} from "@/lib/contact";
import {siteMedia} from "@/lib/media";

export const metadata=createRouteMetadata("/contact");

export default function Page(){
  return <main className="subpage">
    <Header/>
    <PageStructuredData/>
    <section className="contact-hero shell">
      <div>
        <p className="eyebrow"><BilingualText en="Contact" mr="संपर्क"/></p>
        <h1><BilingualText en="Contact Kaaveri" mr="कावेरी टूर्स अँड ट्रॅव्हल्सशी"/><br/><em><BilingualText en="Tours and Travels." mr="संपर्क करा."/></em></h1>
        <p className="lead"><BilingualText en="Send the trip in the form below, or reach the desk by phone, WhatsApp or email. Replies come in Marathi or English." mr="खालील फॉर्ममध्ये प्रवासाची माहिती पाठवा, किंवा फोन, व्हॉट्सॲप किंवा ईमेलने संपर्क करा. उत्तर मराठी किंवा इंग्रजीत मिळते."/></p>
      </div>
      <div className="contact-bento">
        <ParallaxMedia className="bento-large" src={siteMedia.bhimashankar} alt={{en:"Monsoon forest near Bhimashankar in the Sahyadri hills",mr:"सह्याद्रीतील भीमाशंकर परिसराचे पावसाळी जंगल"}} sizes="(max-width: 760px) 62vw, 34vw"><span><BilingualText en="Bhimashankar" mr="भीमाशंकर"/></span></ParallaxMedia>
        <ParallaxMedia className="bento-small" src={siteMedia.fleetSeatsClose} alt={{en:"Blue and black seats with headrests inside Kaaveri's Tempo Traveller",mr:"कावेरीच्या टेम्पो ट्रॅव्हलरमधील हेडरेस्टसह निळ्या-काळ्या सीट्स"}} sizes="(max-width: 760px) 38vw, 20vw"><span><BilingualText en="On the road" mr="प्रवासात"/></span></ParallaxMedia>
      </div>
    </section>
    <section id="enquiry" aria-labelledby="enquiry-heading" className="contact-form-section" data-motion-reveal>
      <div className="shell form-shell">
        <div className="form-heading"><p className="eyebrow"><BilingualText en="Enquiry form" mr="चौकशी फॉर्म"/></p><h2 id="enquiry-heading"><BilingualText en="Send the" mr="प्रवासाचे"/><br/><em><BilingualText en="trip details." mr="तपशील पाठवा."/></em></h2><p className="form-note"><BilingualText en="Kaaveri replies by phone or WhatsApp with the vehicle, pickup time and fare." mr="कावेरी फोन किंवा व्हॉट्सॲपवर वाहन, पिकअपची वेळ आणि भाडे कळवते."/></p></div>
        <EnquiryForm/>
      </div>
    </section>
    <section className="contact-methods shell" aria-labelledby="reach-heading" data-motion-reveal>
      <div className="section-heading"><div><p className="eyebrow"><BilingualText en="Other ways to reach Kaaveri" mr="संपर्काचे इतर मार्ग"/></p><h2 id="reach-heading"><BilingualText en="Phone, WhatsApp " mr="फोन, व्हॉट्सॲप "/><em><BilingualText en="or email." mr="किंवा ईमेल."/></em></h2></div></div>
      <ul className="method-grid">
        <li className="method-card">
          <span className="method-icon"><Icon name="phone" size={22}/></span>
          <h3><BilingualText en="Phone" mr="फोन"/></h3>
          <p><BilingualText en="Two numbers for calls. The first one is also on WhatsApp." mr="कॉलसाठी दोन क्रमांक. पहिला क्रमांक व्हॉट्सॲपवरही आहे."/></p>
          <div className="method-actions">
            <Btn href={contact.primaryTel} icon="phone" size="sm" label={{en:`Call ${contact.primaryDisplay}`,mr:`कॉल ${contact.primaryDisplay}`}}>{contact.primaryDisplay}</Btn>
            <Btn href={contact.secondaryTel} icon="phone" size="sm" variant="ghost" label={{en:`Call ${contact.secondaryDisplay}`,mr:`कॉल ${contact.secondaryDisplay}`}}>{contact.secondaryDisplay}</Btn>
          </div>
        </li>
        <li className="method-card method-card--wa">
          <span className="method-icon"><Icon name="whatsapp" size={22}/></span>
          <h3><BilingualText en="WhatsApp" mr="व्हॉट्सॲप"/></h3>
          <p><BilingualText en="The quickest way to agree a date and vehicle." mr="तारीख आणि वाहन ठरवण्याचा सर्वात जलद मार्ग."/></p>
          <div className="method-actions"><Btn href={whatsappLink()} icon="whatsapp" variant="whatsapp" size="sm" label={{en:`Chat on WhatsApp, ${contact.primaryDisplay}`,mr:`चॅट करा, व्हॉट्सॲप ${contact.primaryDisplay}`}}><BilingualText en="Chat" mr="चॅट करा"/></Btn></div>
        </li>
        <li className="method-card">
          <span className="method-icon"><Icon name="mail" size={22}/></span>
          <h3><BilingualText en="Email" mr="ईमेल"/></h3>
          <p><BilingualText en="Best for company enquiries with an employee list or shift sheet to attach." mr="कर्मचारी यादी किंवा शिफ्टचा तक्ता जोडायचा असेल अशा कंपनीच्या चौकशीसाठी सोयीचे."/></p>
          <p className="method-value">{contact.email}</p>
          <div className="method-actions"><Btn href={contact.mailto} icon="mail" size="sm" label={{en:`Email ${contact.email}`,mr:`ईमेल ${contact.email}`}}><BilingualText en="Email" mr="ईमेल करा"/></Btn></div>
        </li>
        <li className="method-card">
          <span className="method-icon"><Icon name="pin" size={22}/></span>
          <h3><BilingualText en="Office" mr="कार्यालय"/></h3>
          <p><BilingualText en={contact.address} mr="दुकान क्रमांक १, जीवन स्नेहा अपार्टमेंट, नवीन एसबीएच कॉलनी, ज्योती नगर, एएमसी पाण्याच्या टाकीजवळ, छत्रपती संभाजीनगर."/></p>
          <div className="method-actions"><Btn href={contact.map} icon="pin" size="sm" label={{en:"Directions to the office on Google Maps",mr:"दिशा पाहा: कार्यालय, गूगल मॅप्स"}}><BilingualText en="Directions" mr="दिशा पाहा"/></Btn></div>
        </li>
      </ul>
    </section>
    <AnswerPanel intent="contact"/><Footer/>
  </main>;
}
