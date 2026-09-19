import {LocalizedLink as Link} from "@/components/localized-link";
import {Header,Footer} from "@/components/site";
import {BilingualText} from "@/components/language";
import {ParallaxMedia} from "@/components/parallax-media";
import {PageStructuredData} from "@/components/page-structured-data";

export function EditorialPage({eyebrow,title,accent,intro,visual,children,showCta=true,serviceLabel}:{eyebrow:React.ReactNode;title:React.ReactNode;accent:React.ReactNode;intro:React.ReactNode;visual:string;children:React.ReactNode;showCta?:boolean;serviceLabel?:string}){
  const whatsappText=encodeURIComponent("Hello Kaaveri, I have a "+(serviceLabel||"travel")+" enquiry.");
  const serviceParam=serviceLabel==="Tourism"?"tourism":serviceLabel==="One-way Travel"?"one-way":serviceLabel==="Corporate Transportation"?"corporate":null;
  const enquiryHref=serviceParam?`/contact?service=${serviceParam}#enquiry`:"/contact#enquiry";
  const closing=serviceParam==="tourism"
    ?{eyebrow:{en:"Planning a heritage or temple visit?",mr:"वारसास्थळ किंवा मंदिर भेटीचे नियोजन आहे?"},title:{en:"Choose the place.",mr:"स्थळ निवडा."},accent:{en:"Set the day in motion.",mr:"दिवसाच्या प्रवासाची सुरुवात करा."},body:{en:"For Ajanta, Ellora, Ghrishneshwar, Trimbakeshwar or Bhimashankar, send your pickup point, preferred date and number of travellers.",mr:"अजिंठा, वेरूळ, घृष्णेश्वर, त्र्यंबकेश्वर किंवा भीमाशंकरसाठी पिकअप ठिकाण, पसंतीची तारीख आणि प्रवाशांची संख्या पाठवा."}}
    :serviceParam==="one-way"
      ?{eyebrow:{en:"A route without the return",mr:"परतीच्या प्रवासाशिवाय मार्ग"},title:{en:"From your pickup.",mr:"तुमच्या पिकअपपासून."},accent:{en:"To your destination.",mr:"तुमच्या गंतव्यापर्यंत."},body:{en:"Send the pickup and drop locations, travel date and passenger count for your one-way travel enquiry.",mr:"एकमार्गी प्रवासाच्या चौकशीसाठी पिकअप आणि ड्रॉप ठिकाणे, प्रवासाची तारीख आणि प्रवाशांची संख्या पाठवा."}}
      :{eyebrow:{en:"Transportation for the working day",mr:"कामाच्या दिवसासाठी वाहतूक"},title:{en:"Map the stops.",mr:"थांबे ठरवा."},accent:{en:"Match the shifts.",mr:"शिफ्टची वेळ सांगा."},body:{en:"Send the company name, pickup and drop areas, shift timings and approximate employees or buses required.",mr:"कंपनीचे नाव, पिकअप आणि ड्रॉप परिसर, शिफ्टच्या वेळा आणि अंदाजे कर्मचारी किंवा आवश्यक बसची संख्या पाठवा."}};
  return <main className="subpage">
    <Header/>
    <PageStructuredData/>
    <section className="inner-hero shell">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}<br/><em>{accent}</em></h1>
        <p className="lead">{intro}</p>
        <Link className="pill terra" href={enquiryHref}><BilingualText en="Start an enquiry ↗" mr="चौकशी सुरू करा ↗"/></Link>
      </div>
      <ParallaxMedia className="inner-visual" src={visual} alt="Travel scene for Kaaveri Tours and Travels" sizes="(max-width: 760px) 100vw, 56vw" priority />
    </section>
    {children}
    {showCta&&<section className="inner-cta" data-motion-reveal>
      <div className="shell inner-cta-grid">
        <div>
          <p className="eyebrow"><BilingualText en={closing.eyebrow.en} mr={closing.eyebrow.mr}/></p>
          <h2><BilingualText en={closing.title.en} mr={closing.title.mr}/><br/><em><BilingualText en={closing.accent.en} mr={closing.accent.mr}/></em></h2>
        </div>
        <div>
          <p><BilingualText en={closing.body.en} mr={closing.body.mr}/></p>
          <Link className="pill dark" href={enquiryHref}><BilingualText en="Send an enquiry ↗" mr="चौकशी पाठवा ↗"/></Link>
          {serviceLabel&&<a className="text-link" href={"https://wa.me/919272727216?text="+whatsappText} target="_blank" rel="noreferrer"><BilingualText en="Continue on WhatsApp ↗" mr="व्हॉट्सअॅपवर सुरू ठेवा ↗"/></a>}
        </div>
      </div>
    </section>}
    <Footer/>
  </main>;
}

export function InfoBand({eyebrow,title,copy,items}:{eyebrow:React.ReactNode;title:React.ReactNode;copy:React.ReactNode;items:React.ReactNode[]}){
  return <section className="info-band" data-motion-reveal>
    <div className="shell info-grid">
      <div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2><p>{copy}</p></div>
      <div className="info-items">{items.map((item,i)=><div key={i}><span>{"0"+(i+1)}</span><strong>{item}</strong></div>)}</div>
    </div>
  </section>;
}
