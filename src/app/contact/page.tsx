import {BilingualText} from "@/components/language";
import {EnquiryForm} from "@/components/enquiry-form";
import {ParallaxMedia} from "@/components/parallax-media";
import {Footer,Header} from "@/components/site";
import {createRouteMetadata} from "@/lib/seo";
import {PageStructuredData} from "@/components/page-structured-data";
import {AnswerPanel} from "@/components/answer-panel";

export const metadata=createRouteMetadata("/contact");

export default function Page(){
  return <main className="subpage">
    <Header/>
    <PageStructuredData/>
    <section className="contact-hero shell">
      <div>
        <p className="eyebrow"><BilingualText en="Start with the right details" mr="योग्य तपशीलांपासून सुरुवात करा"/></p>
        <h1><BilingualText en="Let’s plan the" mr="पुढचा"/><br/><em><BilingualText en="next move." mr="प्रवास आखूया."/></em></h1>
        <p className="lead"><BilingualText en="Choose what you need below. The form changes with your service so you only fill in what matters." mr="खाली तुमची गरज निवडा. सेवेनुसार फॉर्म बदलेल, त्यामुळे आवश्यक तेवढेच तपशील भरा."/></p>
        <div className="contact-direct"><a className="pill terra" href="https://wa.me/919272727216?text=Hello%20Kaaveri%2C%20I%20would%20like%20to%20make%20an%20enquiry." target="_blank" rel="noreferrer"><BilingualText en="WhatsApp us ↗" mr="व्हॉट्सअॅप करा ↗"/></a><span><a href="tel:+919272727216">9272727216</a> / <a href="tel:+918600320320">8600320320</a></span></div>
      </div>
      <div className="contact-bento">
        <ParallaxMedia className="bento-large" src="/generated/ellora.webp" alt="Ellora caves in Maharashtra" sizes="(max-width: 760px) 68vw, 36vw"><span><BilingualText en="Ellora · Maharashtra" mr="वेरूळ · महाराष्ट्र"/></span></ParallaxMedia>
        <ParallaxMedia className="bento-small bento-ajanta" src="/generated/ajanta.webp" alt="Ajanta caves in Maharashtra" sizes="(max-width: 760px) 32vw, 18vw"><span>Ajanta</span></ParallaxMedia>
        <div className="bento-small bento-temple"><span><BilingualText en="Choose your contact option" mr="तुमचा संपर्क पर्याय निवडा"/></span><strong><BilingualText en="Easy to begin." mr="सुरुवात सोपी."/></strong></div>
      </div>
    </section>
    <section id="enquiry" aria-labelledby="enquiry-heading" className="contact-form-section" data-motion-reveal>
      <div className="shell form-shell">
        <div className="form-heading"><p className="eyebrow"><BilingualText en="Enquiry form" mr="चौकशी फॉर्म"/></p><h2 id="enquiry-heading"><BilingualText en="Tell us what" mr="तुम्हाला काय"/><br/><em><BilingualText en="you need." mr="हवे ते सांगा."/></em></h2></div>
        <EnquiryForm/>
      </div>
    </section>
    <section className="contact-faq shell" data-motion-reveal>
      <p className="eyebrow"><BilingualText en="Contact Kaaveri directly" mr="कावेरीशी थेट संपर्क साधा"/></p>
      <h2><BilingualText en="Choose the channel" mr="तुमच्यासाठी योग्य"/><br/><em><BilingualText en="that suits you." mr="पर्याय निवडा."/></em></h2>
      <div>
        <div><strong><BilingualText en="Website enquiry" mr="वेबसाइट चौकशी"/></strong><p><BilingualText en="Choose tourism, one-way or corporate transportation. Your name, phone number and service-specific journey details are sent together to Kaaveri." mr="पर्यटन, एकमार्गी किंवा कॉर्पोरेट वाहतूक निवडा. तुमचे नाव, फोन नंबर आणि सेवेनुसार प्रवासाचे तपशील एकत्र कावेरीकडे पाठवले जातात."/></p></div>
        <div><strong><BilingualText en="WhatsApp or phone" mr="व्हॉट्सअॅप किंवा फोन"/></strong><p><BilingualText en="Message 9272727216 on WhatsApp, or call 9272727216 / 8600320320 for a direct conversation about your route." mr="तुमच्या मार्गाबद्दल थेट बोलण्यासाठी 9272727216 वर व्हॉट्सअॅप करा किंवा 9272727216 / 8600320320 वर फोन करा."/></p></div>
        <div><strong><BilingualText en="Email" mr="ईमेल"/></strong><p><BilingualText en="Write to pratikvarghude72.pv@gmail.com when you want to send a longer travel or company transportation requirement in one message." mr="प्रवासाची किंवा कंपनी वाहतुकीची सविस्तर गरज एका संदेशात पाठवण्यासाठी pratikvarghude72.pv@gmail.com वर ईमेल करा."/></p></div>
      </div>
    </section>
    <AnswerPanel intent="contact"/><Footer/>
  </main>;
}
