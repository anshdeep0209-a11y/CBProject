// Treatment-only analytics. Uses the existing GA4 tag and its existing user identity.
export const TEST_B_EVENTS=Object.freeze({view:'test_b_garment_cards_view',click:'test_b_explore_services_click'});
const PARAMETERS=Object.freeze({send_to:'G-TKFV5R5BV0',experiment_id:'garment_price_visibility',experiment_variant:'B',section_name:'what_needs_altering'});
export function sendTestBEvent(name,extra={},win=globalThis.window){
  if(typeof win?.gtag!=='function')return false;
  try{win.gtag('event',name,{...PARAMETERS,...extra});return true;}catch{return false;}
}
export function trackTestBExploreClick(){sendTestBEvent(TEST_B_EVENTS.click,{link_text:'Explore services',link_url:'/services'});}
// Exposure: >=50% of at least one garment card is visible for one continuous second.
// This works on phones where all five cards cannot fit in the viewport together.
export function observeTestBGarmentCards(section,win=globalThis.window,doc=globalThis.document){
  if(!section||!win||!doc)return()=>{};
  const cards=[...section.querySelectorAll('.category-card')];
  if(!cards.length)return()=>{};
  let recorded=false,disposed=false,observer=null;
  const timers=new Map();
  const topInset=()=>doc.querySelector('header')?.getBoundingClientRect().height||0;
  const bottomInset=()=>doc.querySelector('.bottom-nav')?.getBoundingClientRect().height||0;
  function visible(card){
    if(doc.visibilityState==='hidden'||!card.isConnected)return false;
    const r=card.getBoundingClientRect();
    if(r.width<=0||r.height<=0)return false;
    const viewportWidth=doc.documentElement.clientWidth||win.innerWidth;
    const viewportHeight=win.innerHeight;
    const h=Math.max(0,Math.min(r.bottom,viewportHeight-bottomInset())-Math.max(r.top,topInset()));
    const w=Math.max(0,Math.min(r.right,viewportWidth)-Math.max(r.left,0));
    return h*w/(r.width*r.height)>=.5;
  }
  function cancel(card){if(timers.has(card)){win.clearTimeout(timers.get(card));timers.delete(card);}}
  function cancelAll(){for(const card of timers.keys())cancel(card);}
  function consider(card){
    if(recorded||disposed)return;
    if(!visible(card)){cancel(card);return;}
    if(timers.has(card))return;
    timers.set(card,win.setTimeout(()=>{
      timers.delete(card);
      if(recorded||disposed||!visible(card))return;
      if(sendTestBEvent(TEST_B_EVENTS.view,{exposure_rule:'half_card_1_second'},win)){
        recorded=true;cancelAll();observer?.disconnect();
      }
    },1000));
  }
  const check=()=>cards.forEach(consider);
  const visibility=()=>{if(doc.visibilityState==='hidden')cancelAll();else check();};
  if(typeof win.IntersectionObserver==='function'){
    observer=new win.IntersectionObserver(entries=>entries.forEach(entry=>consider(entry.target)),{threshold:[0,.5,1],rootMargin:`-${topInset()}px 0px -${bottomInset()}px 0px`});
    cards.forEach(card=>observer.observe(card));
  }
  // Also handles resize, browser-toolbar changes, and browsers without IntersectionObserver.
  win.addEventListener('scroll',check,{passive:true});
  win.addEventListener('resize',check,{passive:true});
  doc.addEventListener('visibilitychange',visibility);
  check();
  return()=>{disposed=true;cancelAll();observer?.disconnect();win.removeEventListener('scroll',check);win.removeEventListener('resize',check);doc.removeEventListener('visibilitychange',visibility);};
}
