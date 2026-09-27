/** Line icons drawn on a 24px grid. Decorative: the button or link around them carries the text. */
export type IconName="phone"|"whatsapp"|"mail"|"pin"|"arrow"|"arrowUpRight"|"send"|"calendar"|"car"|"users"|"clock"|"route"|"chevronLeft"|"chevronRight"|"pause"|"play"|"compass"|"close"|"form"|"check"|"shield"|"language";

const paths:Record<Exclude<IconName,"whatsapp">,React.ReactNode>={
  phone:<path d="M5.2 3.8h3.1l1.6 4.1-2 1.3a10.6 10.6 0 0 0 4.9 4.9l1.3-2 4.1 1.6v3.1a1.9 1.9 0 0 1-2.1 1.9A15.6 15.6 0 0 1 3.3 5.9a1.9 1.9 0 0 1 1.9-2.1Z"/>,
  mail:<><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></>,
  pin:<><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z"/><circle cx="12" cy="10" r="2.4"/></>,
  arrow:<path d="M4.5 12h15M13.5 6l6 6-6 6"/>,
  arrowUpRight:<path d="M7 17 17 7M9 7h8v8"/>,
  send:<path d="m21 3-9.2 18-2.3-7.5L2 11.2 21 3Zm0 0L9.5 13.5"/>,
  calendar:<><rect x="3.5" y="5" width="17" height="15" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/></>,
  car:<><path d="M4 16.5V12l2-5h12l2 5v4.5"/><path d="M3 16.5h18v2.2H3zM4 12h16"/><circle cx="7.5" cy="14.3" r=".6"/><circle cx="16.5" cy="14.3" r=".6"/></>,
  users:<><circle cx="9" cy="8" r="3.2"/><path d="M3 19.5c.6-3.3 3-5 6-5s5.4 1.7 6 5"/><path d="M15.5 5.2a3 3 0 0 1 0 5.6M17.8 14.9c1.6.7 2.7 2.2 3.1 4.6"/></>,
  clock:<><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></>,
  route:<><circle cx="6" cy="18" r="2.2"/><circle cx="18" cy="6" r="2.2"/><path d="M8.2 18H16a3 3 0 0 0 0-6H8a3 3 0 0 1 0-6h7.8"/></>,
  chevronLeft:<path d="m14.5 5.5-6.5 6.5 6.5 6.5"/>,
  chevronRight:<path d="m9.5 5.5 6.5 6.5-6.5 6.5"/>,
  pause:<path d="M9 5.5v13M15 5.5v13"/>,
  play:<path d="M8 5.2v13.6L18.5 12 8 5.2Z"/>,
  compass:<><circle cx="12" cy="12" r="8.5"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/></>,
  close:<path d="M6 6l12 12M18 6 6 18"/>,
  form:<><rect x="4.5" y="3.5" width="15" height="17" rx="3"/><path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4"/></>,
  check:<path d="m5 12.5 4.5 4.5L19 7.5"/>,
  shield:<><path d="M12 3.5 5 6.2v5.3c0 4.2 2.9 7.6 7 9 4.1-1.4 7-4.8 7-9V6.2L12 3.5Z"/><path d="m9 12 2.2 2.2L15.5 10"/></>,
  language:<><path d="M4 5.5h9M8.5 3.5v2M6 5.5c.6 3.4 2.8 6 6 7.4M11 5.5c-.8 3.6-3.2 6.4-7 7.9"/><path d="m12.5 20.5 3.8-9 3.8 9M13.8 17.5h5"/></>
};

export function Icon({name,size=18,className=""}:{name:IconName;size?:number;className?:string}){
  if(name==="whatsapp")return <svg className={`icon ${className}`} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 2.5a9.5 9.5 0 0 0-8.2 14.3L2.5 21.5l4.9-1.3A9.5 9.5 0 1 0 12 2.5Zm0 17a7.5 7.5 0 0 1-3.8-1l-.3-.2-2.9.8.8-2.8-.2-.3A7.5 7.5 0 1 1 12 19.5Zm4.1-5.4c-.2-.1-1.1-.5-1.3-.6-.2-.1-.3-.1-.5.1l-.6.7c-.1.2-.3.2-.5.1-1.7-.8-2.8-2.3-3-2.5-.1-.2 0-.3.1-.4l.4-.5c.1-.1.1-.3 0-.4l-.6-1.4c-.2-.4-.3-.4-.5-.4h-.4c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.2 1.6 2.5 3.9 3.5.5.2.9.3 1.4.1.4-.1 1.1-.5 1.3-1 .2-.5.2-1 .1-1.1 0-.1-.2-.2-.4-.3Z"/></svg>;
  return <svg className={`icon ${className}`} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}
