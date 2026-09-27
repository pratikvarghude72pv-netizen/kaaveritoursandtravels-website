"use client";

import {useCallback,useEffect,useId,useMemo,useRef,useState} from "react";
import {useLanguage} from "@/components/language";
import {Icon} from "@/components/icons";

/* ------------------------------------------------------------------ */
/* Shared helpers                                                      */
/* ------------------------------------------------------------------ */

const pad=(n:number)=>String(n).padStart(2,"0");
export const toISO=(d:Date)=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
export const fromISO=(iso:string)=>{const [y,m,d]=iso.split("-").map(Number);return new Date(y,m-1,d)};
const addDays=(d:Date,n:number)=>new Date(d.getFullYear(),d.getMonth(),d.getDate()+n);
const addMonths=(d:Date,n:number)=>{const t=new Date(d.getFullYear(),d.getMonth()+n,1);const last=new Date(t.getFullYear(),t.getMonth()+1,0).getDate();return new Date(t.getFullYear(),t.getMonth(),Math.min(d.getDate(),last))};
const sameMonth=(a:Date,b:Date)=>a.getFullYear()===b.getFullYear()&&a.getMonth()===b.getMonth();

/** Local calendar date (YYYY-MM-DD) so the earliest selectable day is the visitor's today, not UTC. */
export function todayISO(){return toISO(new Date())}

/** Closes a popover when the pointer or keyboard focus leaves its wrapper. */
function useDismiss(open:boolean,wrap:React.RefObject<HTMLElement|null>,close:()=>void){
  useEffect(()=>{
    if(!open)return;
    const onPointer=(e:PointerEvent)=>{if(!wrap.current?.contains(e.target as Node))close()};
    const onFocus=(e:FocusEvent)=>{if(!wrap.current?.contains(e.target as Node))close()};
    document.addEventListener("pointerdown",onPointer);
    document.addEventListener("focusin",onFocus);
    return()=>{document.removeEventListener("pointerdown",onPointer);document.removeEventListener("focusin",onFocus)};
  },[open,wrap,close]);
}

/**
 * Chooses where the popover opens: upwards when there is no room below the trigger, and right-aligned when
 * a left-aligned panel would run past the edge of its scroll container (for example a modal) or the viewport.
 */
function useFlip(open:boolean,trigger:React.RefObject<HTMLElement|null>,height:number,width=0){
  const [place,setPlace]=useState({up:false,right:false});
  useEffect(()=>{
    if(!open||!trigger.current)return;
    const r=trigger.current.getBoundingClientRect();
    const bound=trigger.current.closest(".whatsapp-modal-scroll")?.getBoundingClientRect();
    const edge=bound?bound.right:document.documentElement.clientWidth;
    const frame=requestAnimationFrame(()=>setPlace({up:innerHeight-r.bottom<height+16&&r.top>height+16,right:width>0&&r.left+width>edge-8&&r.right-width>=(bound?bound.left:0)}));
    return()=>cancelAnimationFrame(frame);
  },[open,trigger,height,width]);
  return place;
}

/* ------------------------------------------------------------------ */
/* Select                                                              */
/* ------------------------------------------------------------------ */

type Option={value:string;label:string};

/** Custom listbox that replaces the native select: full keyboard support, typeahead and a styled panel. */
export function Select({id,value,onChange,options,emptyLabel,invalid,describedBy,disabled}:{id:string;value:string;onChange:(v:string)=>void;options:Option[];emptyLabel:string;invalid?:boolean;describedBy?:string;disabled?:boolean}){
  const all=useMemo(()=>[{value:"",label:emptyLabel},...options],[options,emptyLabel]);
  const [open,setOpen]=useState(false);
  const [active,setActive]=useState(0);
  const wrap=useRef<HTMLDivElement>(null);
  const trigger=useRef<HTMLButtonElement>(null);
  const list=useRef<HTMLUListElement>(null);
  const typed=useRef({text:"",at:0});
  const listId=`${id}-list`;
  const close=useCallback(()=>setOpen(false),[]);
  useDismiss(open,wrap,close);
  const {up}=useFlip(open,trigger,all.length*48+20);
  const selectedIndex=Math.max(0,all.findIndex(o=>o.value===value));

  useEffect(()=>{if(open)list.current?.focus()},[open]);
  const openList=()=>{if(disabled)return;setActive(selectedIndex);setOpen(true)};
  const choose=(i:number)=>{onChange(all[i].value);setOpen(false);trigger.current?.focus()};
  const onTriggerKey=(e:React.KeyboardEvent)=>{
    if(["ArrowDown","ArrowUp","Enter"," "].includes(e.key)){e.preventDefault();openList()}
  };
  const onListKey=(e:React.KeyboardEvent)=>{
    if(e.key==="ArrowDown"){e.preventDefault();setActive(a=>Math.min(all.length-1,a+1))}
    else if(e.key==="ArrowUp"){e.preventDefault();setActive(a=>Math.max(0,a-1))}
    else if(e.key==="Home"){e.preventDefault();setActive(0)}
    else if(e.key==="End"){e.preventDefault();setActive(all.length-1)}
    else if(e.key==="Enter"||e.key===" "){e.preventDefault();choose(active)}
    else if(e.key==="Escape"){e.preventDefault();setOpen(false);trigger.current?.focus()}
    else if(e.key==="Tab"){setOpen(false)}
    else if(e.key.length===1){
      const now=e.timeStamp;typed.current.text=(now-typed.current.at<700?typed.current.text:"")+e.key.toLowerCase();typed.current.at=now;
      const hit=all.findIndex(o=>o.label.toLowerCase().startsWith(typed.current.text));
      if(hit>=0)setActive(hit);
    }
  };

  return <div ref={wrap} className={`ui-select${open?" is-open":""}${up?" is-up":""}`}>
    <button ref={trigger} id={id} type="button" className={`ui-field ui-select-trigger${value?"":" is-empty"}`} role="combobox" aria-haspopup="listbox" aria-expanded={open} aria-controls={listId} aria-invalid={invalid||undefined} aria-describedby={describedBy} disabled={disabled} onClick={()=>open?setOpen(false):openList()} onKeyDown={onTriggerKey}>
      <span className="ui-field-value">{all[selectedIndex].label}</span>
      <span className="ui-field-icon ui-chevron" aria-hidden="true"><Icon name="chevronRight" size={16}/></span>
    </button>
    {open&&<ul ref={list} id={listId} className="ui-pop ui-options" role="listbox" tabIndex={-1} aria-labelledby={id} aria-activedescendant={`${id}-opt-${active}`} onKeyDown={onListKey}>
      {all.map((o,i)=><li key={o.value||"none"} id={`${id}-opt-${i}`} role="option" aria-selected={i===selectedIndex} className={`${i===active?"is-active":""}${o.value?"":" is-none"}`} onPointerEnter={()=>setActive(i)} onClick={()=>choose(i)}>
        <span>{o.label}</span>{i===selectedIndex&&<Icon name="check" size={16}/>}
      </li>)}
    </ul>}
  </div>;
}

/* ------------------------------------------------------------------ */
/* Date picker                                                         */
/* ------------------------------------------------------------------ */

type Note={weekday:number;label:string};

/**
 * Calendar popover for travel dates. Days before `min` (today by default) and after `max` cannot be chosen.
 * Keyboard: arrows move by day/week, PageUp/PageDown by month (with Shift by year), Home/End to the week's ends,
 * Enter selects, Escape closes. Month view jumps months and years. On phones it opens as a bottom sheet.
 * `note` marks a weekday (for example a monument's closing day) with a dot and a legend.
 */
export function DatePicker({id,value,onChange,min,max,invalid,describedBy,note,disabled}:{id:string;value:string;onChange:(v:string)=>void;min?:string;max?:string;invalid?:boolean;describedBy?:string;note?:Note;disabled?:boolean}){
  const {language}=useLanguage();
  const locale=language==="mr"?"mr-IN":"en-IN";
  const t=(en:string,mr:string)=>language==="mr"?mr:en;
  const [open,setOpen]=useState(false);
  const [view,setView]=useState<"days"|"months">("days");
  const [cursor,setCursor]=useState<Date>(()=>new Date());
  const wrap=useRef<HTMLDivElement>(null);
  const trigger=useRef<HTMLButtonElement>(null);
  const grid=useRef<HTMLDivElement>(null);
  const titleId=useId();
  const close=useCallback(()=>setOpen(false),[]);
  useDismiss(open,wrap,close);
  const {up,right}=useFlip(open,trigger,440,348);

  const minDate=fromISO(min||todayISO());
  const maxDate=max?fromISO(max):addDays(minDate,730);
  const clamp=(d:Date)=>d<minDate?minDate:d>maxDate?maxDate:d;
  const allowed=(d:Date)=>d>=minDate&&d<=maxDate;
  const selected=value?fromISO(value):null;
  const today=fromISO(todayISO());

  const fmtLong=useMemo(()=>new Intl.DateTimeFormat(locale,{weekday:"short",day:"numeric",month:"short",year:"numeric"}),[locale]);
  const fmtMonth=useMemo(()=>new Intl.DateTimeFormat(locale,{month:"long",year:"numeric"}),[locale]);
  const fmtMonthShort=useMemo(()=>new Intl.DateTimeFormat(locale,{month:"short"}),[locale]);
  const fmtDay=useMemo(()=>new Intl.DateTimeFormat(locale,{day:"numeric"}),[locale]);
  const fmtFull=useMemo(()=>new Intl.DateTimeFormat(locale,{weekday:"long",day:"numeric",month:"long",year:"numeric"}),[locale]);
  const weekdays=useMemo(()=>{const f=new Intl.DateTimeFormat(locale,{weekday:"short"});return Array.from({length:7},(_,i)=>f.format(new Date(2024,0,7+i)))},[locale]);

  const openCalendar=()=>{if(disabled)return;setCursor(clamp(selected??minDate));setView("days");setOpen(true)};
  useEffect(()=>{
    if(!open||view!=="days")return;
    const frame=requestAnimationFrame(()=>grid.current?.querySelector<HTMLButtonElement>("button[tabindex='0']")?.focus());
    return()=>cancelAnimationFrame(frame);
  },[open,view,cursor]);

  const pick=(d:Date)=>{if(!allowed(d))return;onChange(toISO(d));setOpen(false);trigger.current?.focus()};
  const move=(d:Date)=>setCursor(clamp(d));
  const onGridKey=(e:React.KeyboardEvent)=>{
    const k=e.key;let next:Date|null=null;
    if(k==="ArrowRight")next=addDays(cursor,1);
    else if(k==="ArrowLeft")next=addDays(cursor,-1);
    else if(k==="ArrowDown")next=addDays(cursor,7);
    else if(k==="ArrowUp")next=addDays(cursor,-7);
    else if(k==="PageDown")next=addMonths(cursor,e.shiftKey?12:1);
    else if(k==="PageUp")next=addMonths(cursor,e.shiftKey?-12:-1);
    else if(k==="Home")next=addDays(cursor,-cursor.getDay());
    else if(k==="End")next=addDays(cursor,6-cursor.getDay());
    else if(k==="Enter"||k===" "){e.preventDefault();pick(cursor);return}
    if(next){e.preventDefault();move(next)}
  };
  const onPopKey=(e:React.KeyboardEvent)=>{if(e.key==="Escape"){e.preventDefault();e.stopPropagation();setOpen(false);trigger.current?.focus()}};

  const monthStart=new Date(cursor.getFullYear(),cursor.getMonth(),1);
  const lead=monthStart.getDay();
  const daysInMonth=new Date(cursor.getFullYear(),cursor.getMonth()+1,0).getDate();
  const cells:(Date|null)[]=[...Array(lead).fill(null),...Array.from({length:daysInMonth},(_,i)=>new Date(cursor.getFullYear(),cursor.getMonth(),i+1))];
  while(cells.length%7)cells.push(null);
  const canPrev=!sameMonth(cursor,minDate)&&monthStart>minDate;
  const canNext=new Date(cursor.getFullYear(),cursor.getMonth()+1,1)<=maxDate;

  // Quick picks: today, tomorrow, and the coming Saturday.
  const tomorrow=addDays(today,1);
  const saturday=addDays(today,((6-today.getDay())+7)%7||7);
  const quick=[{label:t("Today","आज"),date:today},{label:t("Tomorrow","उद्या"),date:tomorrow},{label:t("This weekend","या शनिवारी"),date:saturday}].filter(q=>allowed(q.date));

  return <div ref={wrap} className={`ui-date${open?" is-open":""}${up?" is-up":""}${right?" is-right":""}`}>
    <button ref={trigger} id={id} type="button" className={`ui-field ui-date-trigger${value?"":" is-empty"}`} aria-haspopup="dialog" aria-expanded={open} aria-invalid={invalid||undefined} aria-describedby={describedBy} disabled={disabled} onClick={()=>open?setOpen(false):openCalendar()}>
      <span className="ui-field-value">{selected?fmtLong.format(selected):t("Select a date","तारीख निवडा")}</span>
      <span className="ui-field-icon" aria-hidden="true"><Icon name="calendar" size={18}/></span>
    </button>
    {open&&<>
      <div className="ui-sheet-backdrop" aria-hidden="true" onClick={()=>setOpen(false)}/>
      <div className="ui-pop ui-calendar" role="dialog" aria-modal="false" aria-labelledby={titleId} onKeyDown={onPopKey}>
        <div className="cal-head">
          <button type="button" className="cal-title" id={titleId} aria-live="polite" onClick={()=>setView(v=>v==="days"?"months":"days")} aria-label={view==="days"?t(`${fmtMonth.format(cursor)}, choose month`,`${fmtMonth.format(cursor)}, महिना निवडा`):t("Back to days","दिवसांकडे परत")}>
            {view==="days"?fmtMonth.format(cursor):String(cursor.getFullYear())}<Icon name="chevronRight" size={14} className={view==="months"?"is-rotated":""}/>
          </button>
          <div className="cal-nav">
            <button type="button" className="cal-arrow" disabled={view==="days"?!canPrev:cursor.getFullYear()<=minDate.getFullYear()} onClick={()=>setCursor(c=>clamp(view==="days"?addMonths(c,-1):addMonths(c,-12)))} aria-label={view==="days"?t("Previous month","मागील महिना"):t("Previous year","मागील वर्ष")}><Icon name="chevronLeft" size={16}/></button>
            <button type="button" className="cal-arrow" disabled={view==="days"?!canNext:cursor.getFullYear()>=maxDate.getFullYear()} onClick={()=>setCursor(c=>clamp(view==="days"?addMonths(c,1):addMonths(c,12)))} aria-label={view==="days"?t("Next month","पुढील महिना"):t("Next year","पुढील वर्ष")}><Icon name="chevronRight" size={16}/></button>
          </div>
        </div>
        {view==="days"?<>
          <div className="cal-weekdays" aria-hidden="true">{weekdays.map((w,i)=><span key={i} className={note&&note.weekday===i?"has-note":""}>{w}</span>)}</div>
          <div ref={grid} className="cal-grid" role="grid" aria-labelledby={titleId} onKeyDown={onGridKey}>
            {Array.from({length:cells.length/7},(_,row)=><div role="row" key={row} className="cal-row">
              {cells.slice(row*7,row*7+7).map((d,i)=>{
                if(!d)return <span role="gridcell" key={i} className="cal-empty"/>;
                const iso=toISO(d);const ok=allowed(d);const isSel=!!selected&&toISO(selected)===iso;const isToday=toISO(today)===iso;const focus=toISO(cursor)===iso;const marked=!!note&&note.weekday===d.getDay();
                return <span role="gridcell" key={i} aria-selected={isSel}>
                  <button type="button" tabIndex={focus?0:-1} disabled={!ok} className={`cal-day${isSel?" is-selected":""}${isToday?" is-today":""}${marked&&ok?" has-note":""}`} onClick={()=>pick(d)} aria-label={`${fmtFull.format(d)}${marked?`, ${note!.label}`:""}${!ok?t(", not available",", उपलब्ध नाही"):""}`} aria-current={isToday?"date":undefined}>{fmtDay.format(d)}</button>
                </span>;
              })}
            </div>)}
          </div>
          {note&&<p className="cal-note"><i aria-hidden="true"/>{note.label}</p>}
        </>:<div className="cal-months">
          {Array.from({length:12},(_,m)=>{const first=new Date(cursor.getFullYear(),m,1);const last=new Date(cursor.getFullYear(),m+1,0);const ok=last>=minDate&&first<=maxDate;const isCur=m===cursor.getMonth();
            return <button key={m} type="button" disabled={!ok} className={isCur?"is-selected":""} onClick={()=>{setCursor(clamp(new Date(cursor.getFullYear(),m,Math.min(cursor.getDate(),last.getDate()))));setView("days")}}>{fmtMonthShort.format(first)}</button>;})}
        </div>}
        <div className="cal-foot">
          <div className="cal-quick">{quick.map(q=><button key={q.label} type="button" className={selected&&toISO(selected)===toISO(q.date)?"is-selected":""} onClick={()=>pick(q.date)}>{q.label}</button>)}</div>
          {value&&<button type="button" className="cal-clear" onClick={()=>{onChange("");setOpen(false);trigger.current?.focus()}}>{t("Clear","साफ करा")}</button>}
        </div>
      </div>
    </>}
  </div>;
}

/* ------------------------------------------------------------------ */
/* Indian mobile number                                                */
/* ------------------------------------------------------------------ */

/** Keeps the national part only: strips spaces, a leading +91/91 or 0, and anything that is not a digit. */
export function normaliseMobile(raw:string){
  let d=raw.replace(/\D/g,"");
  if(d.length>10&&d.startsWith("91"))d=d.slice(2);
  if(d.length>10&&d.startsWith("0"))d=d.slice(1);
  return d.slice(0,10);
}
export const isValidMobile=(digits:string)=>/^[6-9]\d{9}$/.test(digits);
export const withCountryCode=(digits:string)=>`+91 ${digits.slice(0,5)} ${digits.slice(5)}`;

/** Mobile number with a fixed +91 prefix; accepts exactly 10 digits starting 6 to 9. */
export function PhoneField({id,value,onChange,invalid,describedBy,required,disabled}:{id:string;value:string;onChange:(digits:string)=>void;invalid?:boolean;describedBy?:string;required?:boolean;disabled?:boolean}){
  return <div className={`ui-field ui-phone${invalid?" is-invalid":""}`}>
    <span className="ui-phone-code" aria-hidden="true">+91</span>
    <input id={id} type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={20} value={value} required={required} disabled={disabled}
      aria-invalid={invalid||undefined} aria-describedby={describedBy} onChange={e=>onChange(normaliseMobile(e.target.value))}/>
    <span className="ui-phone-count" aria-hidden="true">{value.length}/10</span>
  </div>;
}

/** Whole-number field (travellers, employees) without the native spinner. */
export function CountField({id,value,onChange,max=500,invalid,describedBy,disabled}:{id:string;value:string;onChange:(v:string)=>void;max?:number;invalid?:boolean;describedBy?:string;disabled?:boolean}){
  return <input id={id} className="ui-field ui-input" type="text" inputMode="numeric" pattern="[0-9]*" autoComplete="off" value={value} disabled={disabled} aria-invalid={invalid||undefined} aria-describedby={describedBy}
    onChange={e=>{const d=e.target.value.replace(/\D/g,"").slice(0,String(max).length);onChange(d&&Number(d)>max?String(max):d.replace(/^0+/,""))}}/>;
}
