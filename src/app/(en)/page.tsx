import {LocalizedLink as Link} from "@/components/localized-link";
import {BilingualText} from "@/components/language";
import {Header,Footer} from "@/components/site";
import {ParallaxMedia} from "@/components/parallax-media";
import {FaqSection} from "@/components/answer-panel";
import {ArrowIcon} from "@/components/arrow-icon";
import {DestinationCarousel} from "@/components/destination-carousel";
import {Btn} from "@/components/button";
import {QuickPlan} from "@/components/quick-plan";
import {DestinationRibbon} from "@/components/destination-ribbon";
import {vehicles} from "@/lib/vehicles";
import {createRouteMetadata} from "@/lib/seo";
import {PageStructuredData} from "@/components/page-structured-data";
import {siteMedia} from "@/lib/media";

export const metadata=createRouteMetadata("/");

const services=[
  {key:"tourism",href:"/tourism",className:"service-tourism",image:siteMedia.ajanta,alt:{en:"The Ajanta caves, Maharashtra",mr:"अजिंठा लेणी, महाराष्ट्र"},label:<BilingualText en="Heritage and temple trips" mr="वारसा आणि मंदिर सहली"/>,description:<BilingualText en="Ellora, Ajanta and three Jyotirlinga temples, as a day trip or overnight" mr="वेरूळ, अजिंठा आणि तीन ज्योतिर्लिंग मंदिरे, एका दिवसात किंवा मुक्कामी"/>},
  {key:"one-way",href:"/one-way-travel",className:"service-road",image:siteMedia.fleetSideSunset,alt:{en:"The side of Kaaveri's grey Tempo Traveller in evening light",mr:"संध्याकाळच्या प्रकाशात कावेरीच्या राखाडी टेम्पो ट्रॅव्हलरची बाजू"},label:<BilingualText en="One-way travel" mr="एकमार्गी प्रवास"/>,description:<BilingualText en="A drop at another city, station or airport, with no return leg" mr="दुसरे शहर, स्टेशन किंवा विमानतळापर्यंत; परतीचा टप्पा नाही"/>},
  {key:"corporate",href:"/corporate-travel",className:"service-corporate",image:siteMedia.fleetSeatsWindow,alt:{en:"Seats and curtains inside Kaaveri's Tempo Traveller",mr:"कावेरीच्या टेम्पो ट्रॅव्हलरमधील सीट्स आणि पडदे"},label:<BilingualText en="Employee transport" mr="कर्मचारी वाहतूक"/>,description:<BilingualText en="Daily pickup and drop for shifts and office hours" mr="शिफ्ट आणि ऑफिस वेळांसाठी रोजचे पिकअप-ड्रॉप"/>}
];

const steps=[
  {n:"01",title:{en:"Tell Kaaveri the trip",mr:"प्रवास सांगा"},body:{en:"Call, WhatsApp or use the form: where you are going, the date and how many people.",mr:"फोन, व्हॉट्सॲप किंवा फॉर्मद्वारे: कुठे जायचे, तारीख आणि किती जण."}},
  {n:"02",title:{en:"Get a vehicle and a start time",mr:"वाहन आणि निघण्याची वेळ मिळवा"},body:{en:"Kaaveri replies with a sedan or SUV, the pickup time and the fare for your date.",mr:"कावेरी तुमच्या तारखेसाठी सेडान किंवा एसयूव्ही, पिकअपची वेळ आणि भाडे कळवते."}},
  {n:"03",title:{en:"Travel on the day",mr:"ठरलेल्या दिवशी प्रवास"},body:{en:"Pickup from your address in the city. Changes can be sent on the same WhatsApp chat.",mr:"शहरातील तुमच्या पत्त्यावरून पिकअप. बदल असल्यास त्याच व्हॉट्सॲप चॅटवर कळवा."}}
];

export default function Home(){
  return <main>
    <PageStructuredData/>
    <Header/>
    <section className="home-hero shell">
      <div className="hero-copy">
        <p className="eyebrow"><BilingualText en="Jyoti Nagar, Chhatrapati Sambhajinagar" mr="ज्योती नगर, छत्रपती संभाजीनगर"/></p>
        <h1><BilingualText en="A sedan, SUV or minibus for " mr="सहली, ड्रॉप आणि शिफ्टसाठी "/><br/><em><BilingualText en="trips, drops and shifts." mr="सेडान, एसयूव्ही किंवा मिनीबस."/></em></h1>
        <p className="lead"><BilingualText en="Kaaveri arranges a sedan, seven-seater SUV or its own Tempo Traveller minibus for trips to Ellora, Ajanta and the Jyotirlinga temples, for one-way travel to another city, and for companies moving staff to work. Replies come by phone or WhatsApp, in Marathi or English." mr="वेरूळ, अजिंठा आणि ज्योतिर्लिंग मंदिरांच्या सहलींसाठी, दुसऱ्या शहरापर्यंतच्या एकमार्गी प्रवासासाठी आणि कर्मचाऱ्यांना कामावर नेण्या-आणण्यासाठी कावेरी सेडान, सात आसनी एसयूव्ही किंवा स्वतःच्या टेम्पो ट्रॅव्हलर मिनीबसची व्यवस्था करते. उत्तर फोन किंवा व्हॉट्सॲपवर, मराठी किंवा इंग्रजीत मिळते."/></p>
      </div>
      <div className="hero-collage">
        <ParallaxMedia className="hero-collage-main" src={siteMedia.ellora} alt={{en:"Kailasa temple at the Ellora caves, Maharashtra",mr:"वेरूळ लेणीतील कैलास मंदिर, महाराष्ट्र"}} sizes="(max-width: 760px) 100vw, 44vw" priority><div className="image-caption"><span><BilingualText en="Kailasa temple, Ellora" mr="कैलास मंदिर, वेरूळ"/></span><span><BilingualText en="approx. 30 km" mr="सुमारे ३० किमी"/></span></div></ParallaxMedia>
        <ParallaxMedia className="hero-collage-accent" src={siteMedia.fleetExteriorRight} alt={{en:"Kaaveri's own grey Tempo Traveller minibus, parked and ready",mr:"कावेरीची स्वतःची राखाडी टेम्पो ट्रॅव्हलर मिनीबस, तयार"}} sizes="(max-width: 760px) 60vw, 24vw"><div className="image-caption"><span><BilingualText en="Kaaveri's own fleet" mr="कावेरीचा स्वतःचा ताफा"/></span></div></ParallaxMedia>
      </div>
    </section>

    <DestinationRibbon/>

    <section className="services-section shell"><div className="section-heading"><div><p className="eyebrow"><BilingualText en="Services" mr="सेवा"/></p><h2><BilingualText en="What Kaaveri " mr="कावेरी कशाची "/><em><BilingualText en="arranges." mr="व्यवस्था करते."/></em></h2></div></div>
      <div className="service-grid">{services.map(service=><Link href={service.href} className={"service-card has-photo "+service.className} key={service.key}>
        <ParallaxMedia className="card-photo" src={service.image} alt={service.alt} sizes="(max-width: 760px) 100vw, 33vw" parallax={false}/>
        <div className="card-body"><h3>{service.label}</h3><p>{service.description}</p><b className="card-arrow"><ArrowIcon/></b></div>
      </Link>)}</div>
    </section>

    <section className="intro-strip steps-band"><div className="shell">
      <div className="steps-head"><p className="eyebrow"><BilingualText en="How an enquiry works" mr="चौकशी कशी होते"/></p><h2><BilingualText en="From a message " mr="एका संदेशापासून "/><em><BilingualText en="to the day of travel." mr="प्रवासाच्या दिवसापर्यंत."/></em></h2></div>
      <ol className="steps-list">{steps.map(step=><li key={step.n}><span>{step.n}</span><strong><BilingualText en={step.title.en} mr={step.title.mr}/></strong><p><BilingualText en={step.body.en} mr={step.body.mr}/></p></li>)}</ol>
    </div></section>

    <section className="feature-section"><div className="shell feature-grid"><ParallaxMedia className="feature-visual" src={siteMedia.ghrishneshwar} alt={{en:"Ghrishneshwar Jyotirlinga temple near Ellora",mr:"वेरूळजवळील घृष्णेश्वर ज्योतिर्लिंग मंदिर"}} sizes="(max-width: 760px) 100vw, 52vw"><span><BilingualText en="Ghrishneshwar" mr="घृष्णेश्वर"/></span></ParallaxMedia><div className="feature-copy"><p className="eyebrow"><BilingualText en="A day from the city" mr="शहरातून एक दिवस"/></p><h2><BilingualText en="Ellora and Ghrishneshwar " mr="एका दिवसात वेरूळ "/><em><BilingualText en="in one day." mr="आणि घृष्णेश्वर."/></em></h2><p><BilingualText en="Both are about 30 km from the city and close to each other. Leave in the morning, see the Kailasa temple before the afternoon heat, stop at Ghrishneshwar for darshan, and be back by evening. Ellora is closed on Tuesdays." mr="दोन्ही ठिकाणे शहरापासून सुमारे ३० किमीवर आणि एकमेकांच्या जवळ आहेत. सकाळी निघा, दुपारच्या उन्हाआधी कैलास मंदिर पाहा, घृष्णेश्वराचे दर्शन घ्या आणि संध्याकाळपर्यंत परत या. वेरूळ मंगळवारी बंद असते."/></p><Btn href="/tourism#typical-day" icon="clock" variant="light" label={{en:"Day plan for Ellora and Ghrishneshwar",mr:"दिवसाचे नियोजन: वेरूळ आणि घृष्णेश्वर"}}><BilingualText en="Day plan" mr="दिवसाचे नियोजन"/></Btn></div></div></section>

    <section className="places-section shell"><div className="section-heading"><div><p className="eyebrow"><BilingualText en="Five destinations" mr="पाच स्थळे"/></p><h2><BilingualText en="Distance from the city, " mr="शहरापासून अंतर, "/><em><BilingualText en="nearest first." mr="जवळच्यापासून."/></em></h2></div><Btn href="/tourism" icon="compass" variant="ghost" size="sm" label={{en:"All destinations on the Tourism page",mr:"सर्व स्थळे पर्यटन पानावर"}}><BilingualText en="All places" mr="सर्व स्थळे"/></Btn></div>
      <DestinationCarousel/>
      <p className="fine-print"><BilingualText en="Distances and drive times are approximate, by road from Chhatrapati Sambhajinagar." mr="अंतरे आणि प्रवासाचा वेळ अंदाजे, छत्रपती संभाजीनगरहून रस्त्याने."/></p>
    </section>

    <section className="vehicles-teaser shell"><div className="section-heading"><div><p className="eyebrow"><BilingualText en="Vehicles" mr="वाहने"/></p><h2><BilingualText en="Our own Tempo Traveller " mr="कावेरीची स्वतःची टेम्पो ट्रॅव्हलर "/><em><BilingualText en="for larger groups." mr="मोठ्या गटांसाठी."/></em></h2></div><Btn href="/vehicles" icon="car" variant="ghost" size="sm" label={{en:"See the Tempo Traveller",mr:"टेम्पो ट्रॅव्हलर पाहा"}}><BilingualText en="See the minibus" mr="मिनीबस पाहा"/></Btn></div><div className="vehicle-cards vehicle-cards--single">{vehicles.filter(vehicle=>vehicle.id==="traveller").map(vehicle=><Link href="/vehicles" className="vehicle-card" key={vehicle.id}><ParallaxMedia className="vehicle-photo" src={vehicle.image!} alt={vehicle.imageAlt!} sizes="(max-width: 760px) 100vw, 90vw" parallax={false}><div className="image-caption"><span><BilingualText en="Kaaveri's own vehicle" mr="कावेरीचे स्वतःचे वाहन"/></span></div></ParallaxMedia><div className="vehicle-card-copy"><h3><BilingualText en={vehicle.name.en} mr={vehicle.name.mr}/></h3><p><BilingualText en={vehicle.tag.en} mr={vehicle.tag.mr}/></p><b className="card-arrow"><ArrowIcon/></b></div></Link>)}</div><p className="vehicles-note"><BilingualText en="A sedan or a seven-seater SUV can also be arranged on request." mr="विनंतीनुसार सेडान किंवा सात आसनी एसयूव्हीचीही व्यवस्था करता येते."/></p></section>

    <FaqSection intents={["home"]}/>

    <QuickPlan/>
    <Footer/>
  </main>;
}
