import {BilingualText} from "@/components/language";
import {EditorialPage} from "@/components/editorial";
import {createRouteMetadata} from "@/lib/seo";
import {AnswerPanel} from "@/components/answer-panel";
import {siteMedia} from "@/lib/media";

export const metadata=createRouteMetadata("/corporate-travel");

const setup=[
  {tag:{en:"Step 1",mr:"पायरी १"},title:{en:"You share the list",mr:"तुम्ही यादी देता"},body:{en:"Areas employees live in, the office or plant address, and shift start and end times.",mr:"कर्मचारी राहतात ते परिसर, ऑफिस किंवा प्लांटचा पत्ता आणि शिफ्ट सुरू व संपण्याच्या वेळा."}},
  {tag:{en:"Step 2",mr:"पायरी २"},title:{en:"Kaaveri proposes a route",mr:"कावेरी मार्ग सुचवते"},body:{en:"A pickup order and the number of sedans or SUVs each shift needs, to discuss with you.",mr:"पिकअपचा क्रम आणि प्रत्येक शिफ्टसाठी किती सेडान किंवा एसयूव्ही लागतील, तुमच्याशी चर्चेसाठी."}},
  {tag:{en:"Step 3",mr:"पायरी ३"},title:{en:"Send changes as they happen",mr:"बदल लगेच कळवा"},body:{en:"New joiners, shift changes and holidays: send the update and the route is revised.",mr:"नवीन कर्मचारी, शिफ्टमधील बदल आणि सुट्ट्या कळवा; त्यानुसार मार्ग बदलला जातो."}}
];
const checklist=[
  {title:{en:"Company and contact",mr:"कंपनी आणि संपर्क"},body:{en:"Organisation name, a contact person and their phone.",mr:"संस्थेचे नाव, संपर्क व्यक्ती आणि त्यांचा फोन."}},
  {title:{en:"Workplace",mr:"कामाचे ठिकाण"},body:{en:"Office or plant address, and the MIDC area if it is in one.",mr:"ऑफिस किंवा प्लांटचा पत्ता, एमआयडीसी परिसरात असल्यास त्याचे नाव."}},
  {title:{en:"Headcount by area",mr:"परिसरनिहाय संख्या"},body:{en:"How many employees are picked up from each part of the city.",mr:"शहरातील प्रत्येक भागातून किती कर्मचारी."}},
  {title:{en:"Shifts",mr:"शिफ्ट"},body:{en:"Start and end times, including night shifts, and working days per week.",mr:"सुरू व संपण्याच्या वेळा, रात्रीच्या शिफ्टसह, आणि आठवड्याचे कामाचे दिवस."}},
  {title:{en:"Start date and rules",mr:"सुरुवातीची तारीख आणि नियम"},body:{en:"When the service should start, and any rules such as the drop order for late shifts.",mr:"सेवा कधीपासून हवी, आणि नियम, उदा. उशिराच्या शिफ्टसाठी ड्रॉपचा क्रम."}}
];

export default function Page(){
  return <EditorialPage eyebrow={<BilingualText en="Employee transport" mr="कर्मचारी वाहतूक"/>} title={<BilingualText en="Employee transport" mr="कंपन्यांसाठी"/>} accent={<BilingualText en="for companies." mr="कर्मचारी वाहतूक."/>} intro={<BilingualText en="Regular pickup and drop for employees travelling to offices and plants in and around Chhatrapati Sambhajinagar, including shift work. Vehicles are sedans and seven-seater SUVs, so routes are planned in small groups." mr="छत्रपती संभाजीनगर आणि परिसरातील ऑफिस व प्लांटमध्ये जाणाऱ्या कर्मचाऱ्यांसाठी नियमित पिकअप आणि ड्रॉप, शिफ्टच्या कामासह. वाहने सेडान आणि सात आसनी एसयूव्ही असल्याने मार्ग लहान गटांमध्ये आखले जातात."/>} visual={siteMedia.suv} visualAlt={{en:"A white seven-seater SUV (illustrative photograph)",mr:"पांढरी सात आसनी एसयूव्ही (उदाहरणार्थ फोटो)"}} service="corporate">
    <section className="workday-band"><div className="shell"><p className="eyebrow"><BilingualText en="How a route is set up" mr="मार्ग कसा ठरतो"/></p><h2><BilingualText en="From your employee list " mr="कर्मचारी यादीपासून "/><em><BilingualText en="to a route." mr="मार्गापर्यंत."/></em></h2><div className="timeline">{setup.map(step=><div key={step.tag.en}><span><BilingualText en={step.tag.en} mr={step.tag.mr}/></span><strong><BilingualText en={step.title.en} mr={step.title.mr}/></strong><p><BilingualText en={step.body.en} mr={step.body.mr}/></p></div>)}</div></div></section>
    <section className="shell service-detail-grid corporate-details"><div><p className="eyebrow"><BilingualText en="Checklist" mr="यादी"/></p><h2><BilingualText en="What to send with " mr="कंपनीच्या चौकशीसोबत "/><em><BilingualText en="a company enquiry." mr="काय पाठवावे."/></em></h2></div><div className="detail-list">{checklist.map(item=><div key={item.title.en}><strong><BilingualText en={item.title.en} mr={item.title.mr}/></strong><span><BilingualText en={item.body.en} mr={item.body.mr}/></span></div>)}</div></section>
    <AnswerPanel intent="corporate"/>
  </EditorialPage>;
}
