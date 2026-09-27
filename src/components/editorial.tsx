import {Header,Footer} from "@/components/site";
import {ParallaxMedia} from "@/components/parallax-media";
import {PageStructuredData} from "@/components/page-structured-data";
import {QuickPlan} from "@/components/quick-plan";
import type {SiteImage} from "@/lib/media";

type Copy={en:string;mr:string};

export function EditorialPage({eyebrow,title,accent,intro,visual,visualAlt,children,showCta=true,service}:{eyebrow:React.ReactNode;title:React.ReactNode;accent:React.ReactNode;intro:React.ReactNode;visual:SiteImage;visualAlt:Copy;children:React.ReactNode;showCta?:boolean;service?:"tourism"|"one-way"|"corporate"}){
  return <main className="subpage">
    <Header/>
    <PageStructuredData/>
    <section className="inner-hero shell">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}<br/><em>{accent}</em></h1>
        <p className="lead">{intro}</p>
      </div>
      <ParallaxMedia className="inner-visual" src={visual} alt={visualAlt} sizes="(max-width: 760px) 100vw, 56vw" priority />
    </section>
    {children}
    {showCta&&service&&<QuickPlan service={service}/>}
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
