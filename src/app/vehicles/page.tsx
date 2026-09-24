import {BilingualText} from "@/components/language";
import {EditorialPage} from "@/components/editorial";
import {ParallaxMedia} from "@/components/parallax-media";
import {createRouteMetadata} from "@/lib/seo";
import {AnswerPanel} from "@/components/answer-panel";
import {vehicles} from "@/lib/vehicles";

export const metadata=createRouteMetadata("/vehicles");

export default function Page(){
  return <EditorialPage eyebrow={<BilingualText en="Our vehicles · Sambhajinagar" mr="आमची वाहने · संभाजीनगर"/>} title={<BilingualText en="Ride in" mr="प्रवास"/>} accent={<BilingualText en="comfort." mr="आरामदायक ठरवा."/>} intro={<BilingualText en="From quick one-way transfers to full temple and heritage days, Kaaveri handles enquiries for sedan and Innova Crysta style seven-seat vehicles." mr="जलद एकमार्गी प्रवासापासून संपूर्ण मंदिरदर्शन व वारसा-प्रवासापर्यंत — कावेरी सेडान आणि इनोव्हा क्रिस्टा प्रकारच्या सात आसनी गाड्यांच्या चौकशी स्वीकारते."/>} visual={vehicles[1].image} showCta={false}>
    <section className="tour-intro shell"><div><p className="eyebrow"><BilingualText en="Travel classes you can ask about" mr="चौकशी करता येणाऱ्या गाडीच्या श्रेणी"/></p><h2><BilingualText en="Two ways." mr="दोन पर्याय."/><br/><em><BilingualText en="To travel well." mr="आरामदायक प्रवासाचे."/></em></h2></div><p><BilingualText en="A sedan keeps small groups and their luggage agile. An Innova Crysta style MPV gives a family its own comfortable room. Send your route, date and group and Kaaveri confirms what fits." mr="सेडान छोट्या गट व त्यांच्या सामानाला हलकेच नेते. इनोव्हा क्रिस्टा प्रकारची एम.पी.व्ही. संपूर्ण कुटुंबाला स्वतःचा आरामदायक जागा देते. तुमचा मार्ग, तारीख व गट पाठवा; कावेरी योग्य गाडी निश्चित करते."/></p></section>
    <section className="tour-destinations" data-motion-reveal>{vehicles.map((vehicle,index)=>{
      const headingId=`${vehicle.id}-heading`;
      return <article id={vehicle.id} aria-labelledby={headingId} className={"tour-destination "+(index%2?"reverse":"")} key={vehicle.id}><ParallaxMedia className="tour-destination-image" src={vehicle.image} alt={vehicle.imageAlt.en} sizes="(max-width: 760px) 100vw, 50vw" loading={index===0?"eager":undefined}/><div className="tour-destination-copy"><p className="eyebrow"><BilingualText en={vehicle.tag.en} mr={vehicle.tag.mr}/></p><h2 id={headingId}><BilingualText en={vehicle.name.en} mr={vehicle.name.mr}/></h2><p><BilingualText en={vehicle.copy.en} mr={vehicle.copy.mr}/></p><strong className="vehicle-best-for"><BilingualText en={`Best for · ${vehicle.bestFor.en}`} mr={`योग्य · ${vehicle.bestFor.mr}`}/></strong></div></article>;
    })}</section>
    <section className="shell illustration-note"><p><BilingualText en="Vehicle photographs on this page are illustrative examples of each travel class and do not depict Kaaveri's own vehicles. The exact vehicle for a journey is confirmed during the enquiry conversation." mr="या पानावरील वाहनांचे फोटो हे त्या श्रेणीची उदाहरणे आहेत; ते कावेरीच्या स्वतःच्या गाड्या दाखवत नाहीत. प्रवासासाठीचे नेमके वाहन चौकशीच्या संवादात निश्चित होते."/></p></section>
    <AnswerPanel intent="vehicles"/>
  </EditorialPage>;
}
