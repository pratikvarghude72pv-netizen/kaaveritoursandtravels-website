import {BilingualText} from "@/components/language";
import {EditorialPage} from "@/components/editorial";
import {DestinationStory} from "@/components/destination-story";
import {createRouteMetadata} from "@/lib/seo";
import {FaqSection} from "@/components/answer-panel";
import {siteMedia} from "@/lib/media";

export const metadata=createRouteMetadata("/tourism");

const byTime=[
  {label:{en:"Half day",mr:"अर्धा दिवस"},body:{en:"Ellora or Ghrishneshwar, about 45 minutes each way.",mr:"वेरूळ किंवा घृष्णेश्वर, एका बाजूने सुमारे ४५ मिनिटे."}},
  {label:{en:"Full day",mr:"पूर्ण दिवस"},body:{en:"Ellora with Ghrishneshwar, or Ajanta at about 2.5 to 3 hours each way.",mr:"वेरूळ आणि घृष्णेश्वर एकत्र, किंवा अजिंठा (एका बाजूने सुमारे अडीच ते तीन तास)."}},
  {label:{en:"Long day or overnight",mr:"दिवसभर किंवा मुक्काम"},body:{en:"Trimbakeshwar at about 5 hours or Bhimashankar at about 6 hours each way.",mr:"त्र्यंबकेश्वर (सुमारे ५ तास) किंवा भीमाशंकर (सुमारे ६ तास), एका बाजूने."}}
];

const day=[
  {time:{en:"7:30 am",mr:"सकाळी ७:३०"},what:{en:"Pickup from your address in the city",mr:"शहरातील तुमच्या पत्त्यावरून पिकअप"}},
  {time:{en:"8:30 am",mr:"सकाळी ८:३०"},what:{en:"Ellora caves, starting with the Kailasa temple",mr:"वेरूळ लेणी, कैलास मंदिरापासून सुरुवात"}},
  {time:{en:"1:00 pm",mr:"दुपारी १:००"},what:{en:"Lunch near Ellora",mr:"वेरूळजवळ जेवण"}},
  {time:{en:"2:00 pm",mr:"दुपारी २:००"},what:{en:"Darshan at Ghrishneshwar",mr:"घृष्णेश्वर दर्शन"}},
  {time:{en:"5:00 pm",mr:"संध्याकाळी ५:००"},what:{en:"Back in the city",mr:"शहरात परत"}}
];

export default function Page(){
  return <EditorialPage eyebrow={<BilingualText en="Heritage and temple trips" mr="वारसा आणि मंदिर सहली"/>} title={<BilingualText en="Ajanta, Ellora" mr="अजिंठा, वेरूळ"/>} accent={<BilingualText en="and Jyotirlinga trips." mr="आणि ज्योतिर्लिंग सहली."/>} intro={<BilingualText en="Five places from Chhatrapati Sambhajinagar, listed by distance. Each shows the drive time, how long to allow and anything to plan around." mr="छत्रपती संभाजीनगरहून पाच स्थळे, अंतरानुसार क्रमाने. प्रत्येक स्थळासाठी प्रवासाचा वेळ, किती वेळ लागतो आणि नियोजनात लक्षात ठेवायच्या गोष्टी दिल्या आहेत."/>} visual={siteMedia.ellora} visualAlt={{en:"Kailasa temple at the Ellora caves, Maharashtra",mr:"वेरूळ लेणीतील कैलास मंदिर, महाराष्ट्र"}} service="tourism">
    <section className="tour-intro shell"><div><p className="eyebrow"><BilingualText en="Pick by the time you have" mr="तुमच्या वेळेनुसार निवडा"/></p><h2><BilingualText en="Half day, full day " mr="अर्धा दिवस, पूर्ण दिवस "/><em><BilingualText en="or overnight." mr="की मुक्काम."/></em></h2></div>
      <ul className="time-cards">{byTime.map(item=><li key={item.label.en}><strong><BilingualText en={item.label.en} mr={item.label.mr}/></strong><p><BilingualText en={item.body.en} mr={item.body.mr}/></p></li>)}</ul>
    </section>
    <DestinationStory/>
    <section id="typical-day" className="shell tour-process"><p className="eyebrow"><BilingualText en="A typical day" mr="एका दिवसाचे उदाहरण"/></p><h2><BilingualText en="Ellora and Ghrishneshwar, " mr="वेरूळ आणि घृष्णेश्वर, "/><em><BilingualText en="start to finish." mr="सुरुवातीपासून शेवटपर्यंत."/></em></h2>
      <ol className="day-timeline">{day.map(stop=><li key={stop.time.en}><time><BilingualText en={stop.time.en} mr={stop.time.mr}/></time><span><BilingualText en={stop.what.en} mr={stop.what.mr}/></span></li>)}</ol>
      <p className="fine-print"><BilingualText en="Times are a guide; queues and your own pace change them." mr="वेळा अंदाजे आहेत; रांगा आणि तुमच्या गतीनुसार त्या बदलतात."/></p>
    </section>
    <FaqSection intents={["distances","bestTime"]}/>
  </EditorialPage>;
}
