import {LocalizedLink as Link} from "@/components/localized-link";
import {BilingualText} from "@/components/language";
import {Header,Footer} from "@/components/site";
import {ParallaxMedia} from "@/components/parallax-media";
import {places} from "@/lib/site-data";
import {createRouteMetadata} from "@/lib/seo";
import {PageStructuredData} from "@/components/page-structured-data";

export const metadata=createRouteMetadata("/");

const services=[
  {key:"tourism",label:<BilingualText en="Tourism journeys" mr="पर्यटन प्रवास"/>,description:<BilingualText en="Heritage, temples and landscapes" mr="वारसा, मंदिरे आणि निसर्ग"/>,href:"/tourism",className:"service-tourism"},
  {key:"one-way",label:<BilingualText en="One-way travel" mr="एकमार्गी प्रवास"/>,description:<BilingualText en="Point-to-point route enquiries" mr="एका ठिकाणाहून दुसऱ्या ठिकाणापर्यंतच्या मार्गांची चौकशी"/>,href:"/one-way-travel",className:"service-road"},
  {key:"corporate",label:<BilingualText en="Corporate Transportation" mr="कॉर्पोरेट वाहतूक"/>,description:<BilingualText en="Employee buses for regular movement" mr="कर्मचाऱ्यांसाठी नियमित बस वाहतूक"/>,href:"/corporate-travel",className:"service-corporate"}
];

export default function Home(){
  return <main>
    <PageStructuredData/>
    <Header/>
    <section className="home-hero shell">
      <div className="hero-copy">
        <p className="eyebrow"><BilingualText en="Sambhajinagar · Maharashtra" mr="संभाजीनगर · महाराष्ट्र"/></p>
        <h1><BilingualText en="Go where the" mr="कथेच्या"/><br/><em><BilingualText en="story begins." mr="सुरुवातीच्या ठिकाणी चला."/></em></h1>
        <p className="lead"><BilingualText en="Journeys shaped around your reason for travelling — from one-way routes to days spent discovering Maharashtra's heritage." mr="तुमच्या प्रवासाच्या कारणानुसार आखलेला प्रवास — एकमार्गी मार्गांपासून महाराष्ट्राचा वारसा अनुभवण्यापर्यंत."/></p>
        <div className="actions">
          <Link className="pill terra" href="/contact#enquiry"><BilingualText en="Plan your journey ↗" mr="तुमचा प्रवास आखा ↗"/></Link>
          <a className="text-link" href="https://wa.me/919272727216?text=Hello%20Kaaveri%2C%20I%20would%20like%20to%20plan%20a%20journey." target="_blank" rel="noreferrer"><BilingualText en="WhatsApp us ↗" mr="व्हॉट्सअॅप करा ↗"/></a>
          <a className="text-link" href="mailto:pratikvarghude72.pv@gmail.com"><BilingualText en="Email us ↗" mr="ईमेल करा ↗"/></a>
          <Link className="text-link" href="/tourism"><BilingualText en="See destinations ↗" mr="स्थळे पहा ↗"/></Link>
        </div>
        <div className="hero-note"><span>01</span><span><BilingualText en="Local understanding. Clear conversations." mr="स्थानिक समज. स्पष्ट संवाद."/></span></div>
      </div>
      <ParallaxMedia className="hero-visual" src="/generated/homepage.webp" alt="Ellora landscape in Maharashtra" sizes="(max-width: 760px) 100vw, 58vw" priority><div className="image-caption"><span>Ellora</span><span><BilingualText en="Verul · Maharashtra" mr="वेरूळ · महाराष्ट्र"/></span></div></ParallaxMedia>
    </section>
    <section className="intro-strip"><div className="shell strip-grid"><p className="eyebrow"><BilingualText en="Based in Chhatrapati Sambhajinagar" mr="छत्रपती संभाजीनगरमध्ये स्थित"/></p><p><BilingualText en="Kaaveri handles enquiries for Maharashtra tourism journeys, point-to-point one-way travel and employee transportation for companies." mr="कावेरी महाराष्ट्र पर्यटन प्रवास, एका ठिकाणाहून दुसऱ्या ठिकाणी एकमार्गी प्रवास आणि कंपन्यांसाठी कर्मचारी वाहतुकीच्या चौकश्या स्वीकारते."/></p><Link className="text-link" href="/about"><BilingualText en="About Kaaveri ↗" mr="कावेरीबद्दल ↗"/></Link></div></section>
    <section className="services-section shell"><div className="section-heading"><div><p className="eyebrow"><BilingualText en="Three ways to move" mr="प्रवासाचे तीन मार्ग"/></p><h2><BilingualText en="Travel, " mr="प्रवास, " /><em><BilingualText en="your way." mr="तुमच्या पद्धतीने."/></em></h2></div><span>02 / 03</span></div><div className="service-grid">{services.map((service,index)=><Link href={service.href} className={"service-card "+service.className} key={service.key}><span className="card-number">{"0"+(index+1)}</span><div><p>{service.description}</p><h3>{service.label}</h3></div><b>↗</b></Link>)}</div></section>
    <section className="feature-section"><div className="shell feature-grid"><ParallaxMedia className="feature-visual" src="/generated/ajanta.webp" alt="Ajanta caves in Maharashtra" sizes="(max-width: 760px) 100vw, 52vw"><span><BilingualText en="Travel slowly. Notice more." mr="हळू प्रवास करा. अधिक अनुभव घ्या."/></span></ParallaxMedia><div className="feature-copy"><p className="eyebrow"><BilingualText en="Places to explore" mr="पाहण्यासारखी स्थळे"/></p><h2><BilingualText en="Routes with a little more " mr="थोड्या अधिक " /><em><BilingualText en="meaning." mr="अर्थपूर्ण वाटा."/></em></h2><p><BilingualText en="Explore Ajanta, Ellora and temple destinations, then send the place, date and group details for a travel enquiry." mr="अजिंठा, वेरूळ आणि मंदिरांची स्थळे पहा; त्यानंतर प्रवासाच्या चौकशीसाठी स्थळ, तारीख आणि गटाचे तपशील पाठवा."/></p><Link className="pill dark" href="/tourism"><BilingualText en="Explore the places ↗" mr="स्थळे पहा ↗"/></Link></div></div></section>
    <section className="places-section shell"><div className="section-heading"><div><p className="eyebrow"><BilingualText en="Within our routes" mr="आमच्या मार्गांमध्ये"/></p><h2><BilingualText en="Five places." mr="पाच स्थळे."/><br/><em><BilingualText en="Many reasons." mr="अनेक कारणे."/></em></h2></div><Link className="text-link" href="/tourism"><BilingualText en="View all ↗" mr="सर्व पहा ↗"/></Link></div><div className="place-cards">{places.map((place,index)=><Link href={"/tourism#"+place.toLowerCase()} className="place-card" key={place}><span>{"0"+(index+1)}</span><strong>{place}</strong><small><BilingualText en="Maharashtra" mr="महाराष्ट्र"/></small></Link>)}</div></section>
    <section className="home-cta"><div className="shell cta-inner"><p className="eyebrow"><BilingualText en="Tourism · one-way · corporate" mr="पर्यटन · एकमार्गी · कॉर्पोरेट"/></p><h2><BilingualText en="Tell us where" mr="प्रवास कुठून आणि"/><br/><em><BilingualText en="the journey begins." mr="कशासाठी आहे ते सांगा."/></em></h2><div><p><BilingualText en="Choose the service that fits your journey. The form collects the route, date and traveller or employee details Kaaveri needs in one request." mr="तुमच्या प्रवासाशी जुळणारी सेवा निवडा. कावेरीला आवश्यक असलेला मार्ग, तारीख आणि प्रवासी किंवा कर्मचाऱ्यांचे तपशील फॉर्ममध्ये एका विनंतीत पाठवा."/></p><Link className="pill terra" href="/contact#enquiry"><BilingualText en="Choose a service ↗" mr="सेवा निवडा ↗"/></Link></div></div></section>
    <Footer/>
  </main>;
}
