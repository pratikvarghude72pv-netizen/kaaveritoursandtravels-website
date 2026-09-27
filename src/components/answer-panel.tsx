"use client";
import {useLanguage} from "@/components/language";
import {answerContent,type AnswerIntent} from "@/lib/answer-content";

/** "Good to know" accordion. Every question shown here is also published as FAQPage data (see pageAnswers). */
export function FaqSection({intents}:{intents:AnswerIntent[]}){
  const {language}=useLanguage();
  return <section className="faq-section shell" aria-labelledby="faq-heading">
    <h2 id="faq-heading">{language==="mr"?"माहितीसाठी":"Good to know"}</h2>
    <div className="faq-list">
      {intents.map((intent,index)=>{
        const answer=answerContent[intent][language];
        return <details key={intent} className="faq-item" open={index===0}>
          <summary><span>{answer.heading}</span><i aria-hidden="true"/></summary>
          <p>{answer.body}</p>
        </details>;
      })}
    </div>
  </section>;
}

export function AnswerPanel({intent}:{intent:AnswerIntent}){
  return <FaqSection intents={[intent]}/>;
}
