"use client";
import {useLanguage} from "@/components/language";
import {answerContent,type AnswerIntent} from "@/lib/answer-content";

export function AnswerPanel({intent}:{intent:AnswerIntent}){
  const {language}=useLanguage();
  const answer=answerContent[intent][language];
  return <section className="answer-panel shell" aria-labelledby={`answer-${intent}`}><p className="eyebrow">{language==="mr"?"थोडक्यात उत्तर":"Quick answer"}</p><h2 id={`answer-${intent}`}>{answer.heading}</h2><p>{answer.body}</p></section>;
}
