import {siteMedia} from "@/lib/media";
import {BilingualText} from "@/components/language";
import {EditorialPage,InfoBand} from "@/components/editorial";
import {Btn} from "@/components/button";
import {ParallaxMedia} from "@/components/parallax-media";
import {createRouteMetadata} from "@/lib/seo";
import {AnswerPanel} from "@/components/answer-panel";
import {FleetCarousel} from "@/components/fleet-carousel";

export const metadata=createRouteMetadata("/vehicles");

const rows=[
  {label:{en:"Passengers",mr:"प्रवासी"},sedan:{en:"Up to 4",mr:"चार जणांपर्यंत"},suv:{en:"6 to 7",mr:"सहा ते सात"}},
  {label:{en:"Luggage",mr:"सामान"},sedan:{en:"Bags for four on a normal trip",mr:"साधारण प्रवासात चार जणांचे सामान"},suv:{en:"Plenty with 5 or 6 people; limited when all 7 seats are used",mr:"पाच-सहा जणांसह भरपूर जागा; सातही आसने भरल्यावर जागा कमी"}},
  {label:{en:"Suits",mr:"योग्य"},sedan:{en:"Couples, small families, one-way drops, work travel",mr:"जोडपी, लहान कुटुंबे, एकमार्गी प्रवास, कामाचा प्रवास"},suv:{en:"Families, groups, elders on temple trips, long drives to Trimbakeshwar or Bhimashankar",mr:"कुटुंबे, गट, ज्येष्ठांसह मंदिर सहली, त्र्यंबकेश्वर किंवा भीमाशंकरसारखे लांबचे प्रवास"}}
];

const features=[
  {id:"cabin",image:siteMedia.fleetInteriorPortrait,alt:{en:"Looking down the aisle of Kaaveri's Tempo Traveller",mr:"कावेरीच्या टेम्पो ट्रॅव्हलरच्या मधल्या वाटेचे दृश्य"},tag:{en:"The cabin",mr:"केबिन"},title:{en:"Room to settle in",mr:"निवांत बसण्यास जागा"},copy:{en:"Cushioned seats with headrests on both sides of a clear central aisle, curtains on the windows and overhead air vents. Built for a full day on the road with a group.",mr:"मधोमध मोकळी वाट आणि दोन्ही बाजूला हेडरेस्टसह गादीच्या सीट्स, खिडक्यांना पडदे आणि वरच्या बाजूला एअर व्हेंट्स. गटासह दिवसभराच्या प्रवासासाठी तयार."}},
  {id:"outside",image:siteMedia.fleetExteriorFront,alt:{en:"The front of Kaaveri's grey Tempo Traveller",mr:"कावेरीच्या राखाडी टेम्पो ट्रॅव्हलरचा पुढील भाग"},tag:{en:"Outside",mr:"बाहेरून"},title:{en:"Ready at the door",mr:"दारात तयार"},copy:{en:"Kaaveri's grey minibus as it arrives for pickup, with a wide windscreen and a clear view of the road ahead.",mr:"पिकअपसाठी येताना कावेरीची राखाडी मिनीबस, मोठी विंडस्क्रीन आणि समोरच्या रस्त्याचे स्पष्ट दृश्य."}}
];

export default function Page(){
  return <EditorialPage eyebrow={<BilingualText en="Vehicles" mr="वाहने"/>} title={<BilingualText en="Kaaveri's own" mr="कावेरीची स्वतःची"/>} accent={<BilingualText en="Tempo Traveller." mr="टेम्पो ट्रॅव्हलर."/>} intro={<BilingualText en="A minibus for large family groups, pilgrimage parties and company outings, with room for everyone's luggage. Photographed by the owner, exactly as it arrives for pickup. The vehicle for your date is confirmed in Kaaveri's reply." mr="मोठी कुटुंबे, यात्रा गट आणि कंपनी सहलींसाठी मिनीबस, सर्वांच्या सामानासाठी जागेसह. मालकाने काढलेले फोटो, पिकअपला जशी येते तशीच. तुमच्या तारखेचे वाहन कावेरीच्या उत्तरात निश्चित होते."/>} visual={siteMedia.fleetExteriorLeft} visualAlt={{en:"Kaaveri's grey Tempo Traveller parked at the kerb",mr:"कावेरीची राखाडी टेम्पो ट्रॅव्हलर रस्त्याच्या कडेला उभी"}} showCta={false}>
    <InfoBand eyebrow={<BilingualText en="Inside" mr="आत"/>} title={<BilingualText en="What you get on board" mr="गाडीत काय मिळते"/>} copy={<BilingualText en="Everything below is visible in the photographs on this page. Ask Kaaveri for anything else you need to know before you book." mr="खालील सर्व गोष्टी या पानावरील फोटोंमध्ये दिसतात. बुकिंगपूर्वी इतर काही जाणून घ्यायचे असल्यास कावेरीला विचारा."/>} items={[<BilingualText key="a" en="Cushioned seats with headrests" mr="हेडरेस्टसह गादीच्या सीट्स"/>,<BilingualText key="b" en="Curtains on the windows" mr="खिडक्यांना पडदे"/>,<BilingualText key="c" en="A clear central aisle" mr="मधोमध मोकळी वाट"/>,<BilingualText key="d" en="Overhead air vents" mr="वरच्या बाजूला एअर व्हेंट्स"/>]}/>

    <section className="tour-destinations vehicle-rows">{features.map((feature,index)=><article id={feature.id} aria-labelledby={`${feature.id}-heading`} className={"tour-destination "+(index%2?"reverse":"")} key={feature.id}><ParallaxMedia className="tour-destination-image" src={feature.image} alt={feature.alt} sizes="(max-width: 760px) 100vw, 50vw"/><div className="tour-destination-copy"><p className="eyebrow"><BilingualText en={feature.tag.en} mr={feature.tag.mr}/></p><h2 id={`${feature.id}-heading`}><BilingualText en={feature.title.en} mr={feature.title.mr}/></h2><p className="destination-meta"><BilingualText en={feature.copy.en} mr={feature.copy.mr}/></p>{index===0&&<Btn href="/contact?vehicle=traveller#enquiry" icon="arrow" label={{en:"Enquire about the Tempo Traveller",mr:"चौकशी करा: टेम्पो ट्रॅव्हलर"}}><BilingualText en="Enquire" mr="चौकशी करा"/></Btn>}</div></article>)}</section>

    <section id="gallery" className="shell fleet-section" aria-labelledby="fleet-heading">
      <div className="section-heading"><div><p className="eyebrow"><BilingualText en="Gallery and video" mr="फोटो आणि व्हिडिओ"/></p><h2 id="fleet-heading"><BilingualText en="See it " mr="प्रत्यक्ष "/><em><BilingualText en="before you book." mr="पाहा, बुकिंगपूर्वी."/></em></h2></div></div>
      <FleetCarousel/>
      <div className="fleet-actions"><Btn href="/contact?vehicle=traveller#enquiry" icon="arrow" label={{en:"Enquire about the Tempo Traveller",mr:"चौकशी करा: टेम्पो ट्रॅव्हलर"}}><BilingualText en="Enquire" mr="चौकशी करा"/></Btn></div>
    </section>

    <section className="tour-intro shell compare-section"><div><p className="eyebrow"><BilingualText en="Smaller groups" mr="लहान गट"/></p><h2><BilingualText en="A sedan or SUV " mr="सेडान किंवा एसयूव्ही "/><em><BilingualText en="on request." mr="विनंतीनुसार."/></em></h2><p className="compare-rule"><BilingualText en="Five people, or four with large suitcases: ask for the SUV. Kaaveri confirms the exact car in its reply." mr="पाच जण असल्यास, किंवा चार जण आणि मोठ्या बॅगा असल्यास, एसयूव्ही मागा. नेमकी गाडी कावेरी उत्तरात कळवते."/></p></div>
      <div className="compare-table" role="table" aria-labelledby="compare-caption"><p id="compare-caption" className="sr-only"><BilingualText en="Sedan and SUV comparison" mr="सेडान आणि एसयूव्हीची तुलना"/></p>
        <div role="row" className="compare-head"><span role="columnheader"/><span role="columnheader"><BilingualText en="Sedan" mr="सेडान"/></span><span role="columnheader"><BilingualText en="SUV" mr="एसयूव्ही"/></span></div>
        {rows.map(row=><div role="row" key={row.label.en}><span role="rowheader"><BilingualText en={row.label.en} mr={row.label.mr}/></span><span role="cell"><BilingualText en={row.sedan.en} mr={row.sedan.mr}/></span><span role="cell"><BilingualText en={row.suv.en} mr={row.suv.mr}/></span></div>)}
      </div>
    </section>
    <AnswerPanel intent="vehicles"/>
  </EditorialPage>;
}
