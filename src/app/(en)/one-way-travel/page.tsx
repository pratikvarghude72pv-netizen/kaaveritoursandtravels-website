import {BilingualText} from "@/components/language";
import {EditorialPage,InfoBand} from "@/components/editorial";
import {createRouteMetadata} from "@/lib/seo";
import {AnswerPanel} from "@/components/answer-panel";
import {siteMedia} from "@/lib/media";

export const metadata=createRouteMetadata("/one-way-travel");

const trips=[
  {title:{en:"Station and airport",mr:"स्टेशन आणि विमानतळ"},body:{en:"A drop at the railway station or airport in Chhatrapati Sambhajinagar, or a pickup when you arrive.",mr:"छत्रपती संभाजीनगर रेल्वे स्टेशन किंवा विमानतळावर सोडणे, किंवा आगमनावेळी पिकअप."}},
  {title:{en:"Another city",mr:"दुसरे शहर"},body:{en:"A single drive to another city, such as Pune or Nashik, with no return to plan.",mr:"पुणे किंवा नाशिकसारख्या दुसऱ्या शहरापर्यंत एकच प्रवास; परतीचे नियोजन नाही."}},
  {title:{en:"End a temple trip elsewhere",mr:"सहल दुसरीकडे संपवा"},body:{en:"Visit Trimbakeshwar and get dropped in Nashik instead of driving back to the city.",mr:"त्र्यंबकेश्वर दर्शन करून शहरात परत येण्याऐवजी नाशिकमध्ये उतरा."}}
];

export default function Page(){
  return <EditorialPage eyebrow={<BilingualText en="One-way travel" mr="एकमार्गी प्रवास"/>} title={<BilingualText en="One-way travel," mr="छत्रपती संभाजीनगरहून"/>} accent={<BilingualText en="one drop, no return." mr="एकमार्गी प्रवास."/>} intro={<BilingualText en="A car from your pickup point to one drop point, and the trip ends there. Use it for a move to another city, a station or airport run, or getting home at the end of a trip." mr="तुमच्या पिकअप ठिकाणापासून एका ड्रॉप ठिकाणापर्यंत गाडी, आणि प्रवास तिथेच संपतो. दुसऱ्या शहरात जाण्यासाठी, स्टेशन किंवा विमानतळावर जाण्यासाठी किंवा सहलीनंतर घरी परतण्यासाठी याचा वापर करा."/>} visual={siteMedia.oneWay} visualAlt={{en:"Highway through the Malshej Ghat, Maharashtra",mr:"माळशेज घाटातून जाणारा महामार्ग, महाराष्ट्र"}} service="one-way">
    <section className="route-strip"><div className="shell route-strip-inner"><span><BilingualText en="PICKUP" mr="पिकअप"/></span><i></i><strong><BilingualText en="One drive, one drop" mr="एक प्रवास, एक ड्रॉप"/></strong><i></i><span><BilingualText en="DROP" mr="ड्रॉप"/></span></div></section>
    <InfoBand eyebrow={<BilingualText en="What to send" mr="काय पाठवावे"/>} title={<><BilingualText en="Four details " mr="एकमार्गी प्रवासासाठी "/><em><BilingualText en="for a one-way trip." mr="चार तपशील."/></em></>} copy={<BilingualText en="Give the time you need to arrive, not only the date. If you have a train, flight or appointment, the start time is worked back from it." mr="फक्त तारीख नव्हे, तर कोणत्या वेळेपर्यंत पोहोचायचे आहे ते सांगा. ट्रेन, विमान किंवा ठरलेली भेट असल्यास त्यानुसार निघण्याची वेळ ठरवली जाते."/>} items={[<BilingualText key="a" en="Pickup address or landmark" mr="पिकअप पत्ता किंवा खूण"/>,<BilingualText key="b" en="Drop address in the other city" mr="दुसऱ्या शहरातील ड्रॉप पत्ता"/>,<BilingualText key="c" en="Date and arrival time" mr="तारीख आणि पोहोचण्याची वेळ"/>,<BilingualText key="d" en="Passengers and large bags" mr="प्रवासी आणि मोठ्या बॅगांची संख्या"/>]}/>
    <section className="shell traveller-grid"><div><p className="eyebrow"><BilingualText en="Common one-way trips" mr="नेहमीचे एकमार्गी प्रवास"/></p><h2><BilingualText en="Where one-way " mr="एकमार्गी प्रवास "/><em><BilingualText en="travel fits." mr="कधी उपयोगी पडतो."/></em></h2></div><div className="traveller-cards">{trips.map(trip=><article key={trip.title.en}><strong><BilingualText en={trip.title.en} mr={trip.title.mr}/></strong><p><BilingualText en={trip.body.en} mr={trip.body.mr}/></p></article>)}</div></section>
    <AnswerPanel intent="oneWay"/>
  </EditorialPage>;
}
