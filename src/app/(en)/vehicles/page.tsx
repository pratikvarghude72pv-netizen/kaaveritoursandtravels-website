import {BilingualText} from "@/components/language";
import {EditorialPage} from "@/components/editorial";
import {Btn} from "@/components/button";
import {ParallaxMedia} from "@/components/parallax-media";
import {createRouteMetadata} from "@/lib/seo";
import {AnswerPanel} from "@/components/answer-panel";
import {vehicles} from "@/lib/vehicles";

export const metadata=createRouteMetadata("/vehicles");

const rows=[
  {label:{en:"Passengers",mr:"प्रवासी"},sedan:{en:"Up to 4",mr:"चार जणांपर्यंत"},suv:{en:"6 to 7",mr:"सहा ते सात"}},
  {label:{en:"Luggage",mr:"सामान"},sedan:{en:"Bags for four on a normal trip",mr:"साधारण प्रवासात चार जणांचे सामान"},suv:{en:"Plenty with 5 or 6 people; limited when all 7 seats are used",mr:"पाच-सहा जणांसह भरपूर जागा; सातही आसने भरल्यावर जागा कमी"}},
  {label:{en:"Suits",mr:"योग्य"},sedan:{en:"Couples, small families, one-way drops, work travel",mr:"जोडपी, लहान कुटुंबे, एकमार्गी प्रवास, कामाचा प्रवास"},suv:{en:"Families, groups, elders on temple trips, long drives to Trimbakeshwar or Bhimashankar",mr:"कुटुंबे, गट, ज्येष्ठांसह मंदिर सहली, त्र्यंबकेश्वर किंवा भीमाशंकरसारखे लांबचे प्रवास"}}
];

export default function Page(){
  return <EditorialPage eyebrow={<BilingualText en="Vehicles" mr="वाहने"/>} title={<BilingualText en="Sedan or" mr="सेडान किंवा"/>} accent={<BilingualText en="seven-seater SUV." mr="सात आसनी एसयूव्ही."/>} intro={<BilingualText en="Two kinds of car, chosen by how many people are travelling and how much luggage they carry. The exact vehicle for your date is confirmed in Kaaveri's reply." mr="प्रवासी किती आहेत आणि सामान किती आहे यावरून निवडायच्या दोन प्रकारच्या गाड्या. तुमच्या तारखेचे नेमके वाहन कावेरीच्या उत्तरात निश्चित होते."/>} visual={vehicles[1].image} visualAlt={vehicles[1].imageAlt} showCta={false}>
    <section className="tour-intro shell compare-section"><div><p className="eyebrow"><BilingualText en="Compare" mr="तुलना"/></p><h2><BilingualText en="Which one fits " mr="तुमच्या गटाला "/><em><BilingualText en="your group." mr="कोणते योग्य."/></em></h2><p className="compare-rule"><BilingualText en="Five people, or four with large suitcases: ask for the SUV." mr="पाच जण असल्यास, किंवा चार जण आणि मोठ्या बॅगा असल्यास, एसयूव्ही मागा."/></p></div>
      <div className="compare-table" role="table" aria-labelledby="compare-caption"><p id="compare-caption" className="sr-only"><BilingualText en="Sedan and SUV comparison" mr="सेडान आणि एसयूव्हीची तुलना"/></p>
        <div role="row" className="compare-head"><span role="columnheader"/><span role="columnheader"><BilingualText en="Sedan" mr="सेडान"/></span><span role="columnheader"><BilingualText en="SUV" mr="एसयूव्ही"/></span></div>
        {rows.map(row=><div role="row" key={row.label.en}><span role="rowheader"><BilingualText en={row.label.en} mr={row.label.mr}/></span><span role="cell"><BilingualText en={row.sedan.en} mr={row.sedan.mr}/></span><span role="cell"><BilingualText en={row.suv.en} mr={row.suv.mr}/></span></div>)}
      </div>
    </section>
    <section className="tour-destinations vehicle-rows">{vehicles.map((vehicle,index)=>{
      const headingId=`${vehicle.id}-heading`;
      return <article id={vehicle.id} aria-labelledby={headingId} className={"tour-destination "+(index%2?"reverse":"")} key={vehicle.id}><ParallaxMedia className="tour-destination-image" src={vehicle.image} alt={vehicle.imageAlt} sizes="(max-width: 760px) 100vw, 50vw" loading={index===0?"eager":undefined}/><div className="tour-destination-copy"><p className="eyebrow"><BilingualText en={vehicle.tag.en} mr={vehicle.tag.mr}/></p><h2 id={headingId}><BilingualText en={vehicle.name.en} mr={vehicle.name.mr}/></h2><p className="destination-meta"><BilingualText en={`Best for ${vehicle.bestFor.en}`} mr={`योग्य: ${vehicle.bestFor.mr}`}/></p><Btn href={`/contact?vehicle=${vehicle.id}#enquiry`} icon="arrow" label={{en:`Enquire about the ${vehicle.id==="suv"?"SUV":"sedan"}`,mr:`चौकशी करा: ${vehicle.name.mr}`}}><BilingualText en="Enquire" mr="चौकशी करा"/></Btn></div></article>;
    })}</section>
    <section className="shell illustration-note"><p><BilingualText en="Photos on this page are illustrative examples of each class and do not show Kaaveri's own vehicles." mr="या पानावरील फोटो त्या श्रेणीची उदाहरणे आहेत; ते कावेरीच्या स्वतःच्या गाड्या दाखवत नाहीत."/></p></section>
    <AnswerPanel intent="vehicles"/>
  </EditorialPage>;
}
