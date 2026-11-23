export const STORAGE_KEY='stitchrush-preview-v2';
export const SERVICE_FEE=50;
export const BASE_PRICES={shirt:100,trousers:120,dress:150,ethnic:180,repair:60};
export function estimate(garment,quantity=1){const low=(BASE_PRICES[garment]||100)*Number(quantity||1);return {low,high:low+50*Number(quantity||1),service:SERVICE_FEE,platform:0};}
export const LOCALITIES=['Sector 56, Gurugram','Sector 62, Noida','Lajpat Nagar, Delhi','Dwarka, Delhi'];
export const CATEGORIES=[
 {id:'shirt',name:'Shirts & Tops',example:'Sleeves, length & everyday fit',tasks:['Shorten sleeves','Adjust length','Minor fit adjustment']},
 {id:'trousers',name:'Trousers & Jeans',example:'Better hems, a more comfortable waist',tasks:['Shorten hem','Adjust waist','Minor fit adjustment']},
 {id:'dress',name:'Dresses & Skirts',example:'Small adjustments for your chosen outfit',tasks:['Adjust length','Adjust waist','Minor fit adjustment']},
 {id:'ethnic',name:'Blouses & Ethnic Wear',example:'Blouses, kurtas & occasion-ready details',tasks:['Minor fit adjustment','Adjust length','Shorten sleeves']},
 {id:'repair',name:'Minor Repairs',example:'Buttons, open seams & selected zips',tasks:['Replace button','Repair open seam','Assess zip repair']}
];
export const PROVIDERS=[
 {id:'thread-and-form',name:'Thread & Form',specialty:'Everyday fit, thoughtfully finished',rating:4.8,reviews:26,distance:1.2,delta:0,hours:30,categories:['shirt','trousers','dress','ethnic','repair'],materials:['Cotton','Denim','Linen','Synthetic / blend','Not sure'],image:'shirt',work:['Neat sleeve finish','Even hem detail','Minor waist adjustment']},
 {id:'the-fitting-room',name:'The Fitting Room',specialty:'Workwear and structured everyday alterations',rating:4.7,reviews:18,distance:2.4,delta:30,hours:42,categories:['shirt','trousers','dress','repair'],materials:['Cotton','Denim','Linen','Synthetic / blend','Not sure'],image:'trousers',work:['Trouser hem','Sleeve adjustment','Seam repair']},
 {id:'needle-house',name:'Needle House',specialty:'Occasionwear and careful finishing',rating:4.9,reviews:14,distance:3.1,delta:60,hours:54,categories:['shirt','dress','ethnic','repair'],materials:['Cotton','Linen','Silk / delicate','Synthetic / blend','Not sure'],image:'ethnic',work:['Blouse fit detail','Kurta hem','Sleeve finish']},
 {id:'seam-studio',name:'Seam Studio',specialty:'Everyday alterations and dependable finishing',rating:4.6,reviews:32,distance:1.8,delta:15,hours:34,categories:['shirt','trousers','dress','ethnic','repair'],materials:['Cotton','Denim','Linen','Synthetic / blend','Not sure'],image:'dress',work:['Dress hem detail','Trouser waist adjustment','Button repair']},
 {id:'the-alteration-co',name:'The Alteration Co.',specialty:'Comfortable fits for work and occasions',rating:4.8,reviews:21,distance:2.8,delta:45,hours:46,categories:['shirt','trousers','dress','ethnic','repair'],materials:['Cotton','Denim','Linen','Synthetic / blend','Not sure'],image:'repair',work:['Shirt sleeve finish','Blouse adjustment','Trouser hem']}
];
export const LABELS={checkout_pending:'Awaiting checkout',correction_pickup_confirmed:'Correction pickup confirmed',correction_collected:'Collected for correction',correcting:'Correction in progress',correction_ready:'Correction ready for return',correction_out:'Correction out for delivery',correction_delivered:'Correction delivered',waiting:'Waiting for tailor responses',offers:'Offers received',none:'No suitable response',selected:'Tailor selected',pickup_pending:'Pickup awaiting confirmation',pickup_confirmed:'Pickup confirmed',collected:'Garment collected',quote:'Awaiting final quote approval',altering:'Alteration in progress',ready:'Ready for return',out:'Out for delivery',delivered:'Delivered',correction_requested:'Correction requested',cancelled:'Cancelled',declined:'Quote declined - return arrangements pending'};
export const TERMINAL=['cancelled','declined','delivered','correction_requested'];
export const canEdit=r=>['waiting','offers','none','selected','pickup_pending'].includes(r.status);
export const category=id=>CATEGORIES.find(x=>x.id===id)||CATEGORIES[0];
export const provider=id=>PROVIDERS.find(x=>x.id===id);
export const money=x=>'₹'+Number(x).toLocaleString('en-IN');
export const dateTime=iso=>new Intl.DateTimeFormat('en-IN',{day:'numeric',month:'short',hour:'numeric',minute:'2-digit',timeZone:'Asia/Kolkata'}).format(new Date(iso))+' IST';
export function istDate(offset=0,now=Date.now()) {let d=new Date(now+offset*864e5);let parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(d);let get=k=>parts.find(p=>p.type===k).value;return `${get('year')}-${get('month')}-${get('day')}`;}
export const deadlineISO=(date,time)=>new Date(`${date}T${time}:00+05:30`).toISOString();
export function businessTime(epoch){
 const day=istDate(0,epoch);const open=Date.parse(`${day}T10:00:00+05:30`),close=Date.parse(`${day}T18:00:00+05:30`);
 if(epoch<open)return open;
 if(epoch>=close)return Date.parse(`${istDate(1,epoch)}T10:00:00+05:30`);
 const rounded=Math.ceil(epoch/36e5)*36e5;
 return rounded>=close?Date.parse(`${istDate(1,epoch)}T10:00:00+05:30`):rounded;
}
export function validateDraft(d,now=Date.now()) {
 let e={};if(!CATEGORIES.some(c=>c.id===d.garment))e.garment='Choose a garment category.';
 if(!category(d.garment).tasks.includes(d.task))e.task='Choose the alteration required.';
 if(!LOCALITIES.includes(d.locality))e.locality='Choose one of the preview localities.';
 if(!d.date)e.date='Choose a return date.';
 if(!d.time)e.time='Choose the required return time.';
 if(d.date&&d.time){let end=Date.parse(`${d.date}T${d.time}:00+05:30`);if(!Number.isFinite(end)||end<=now)e.date='Return date and time must be in the future (IST).';}
 if(!Number.isInteger(Number(d.quantity))||Number(d.quantity)<1||Number(d.quantity)>5)e.quantity='Choose between 1 and 5 garments.';
 if(!['Cotton','Denim','Linen','Silk / delicate','Synthetic / blend','Not sure'].includes(d.material))e.material='Choose a material, or Not sure.';
 return e;
}
const log=(r,message,now)=>[...(r.history||[]),{at:new Date(now).toISOString(),message}];
export function makeRequest(d,now=Date.now(),id=`SR-${now.toString(36).toUpperCase()}`){
 let errors=validateDraft(d,now);if(Object.keys(errors).length)throw Error(Object.values(errors)[0]);
 return {id,revision:1,garment:d.garment,task:d.task,locality:d.locality,material:d.material,quantity:Number(d.quantity),notes:d.notes||'',sampleImage:!!d.sampleImage,deadline:deadlineISO(d.date,d.time),createdAt:new Date(now).toISOString(),updatedAt:new Date(now).toISOString(),status:'waiting',offers:[],history:[{at:new Date(now).toISOString(),message:'Preview request created; no real tailor contacted.'}]};
}
export function generateOffers(r,now=Date.now()){
 const base=BASE_PRICES[r.garment];
 return PROVIDERS.filter(p=>p.categories.includes(r.garment)&&p.materials.includes(r.material)).map(p=>{
  const returnAt=new Date(businessTime(now+(p.hours+Math.max(0,r.quantity-1)*5)*36e5)).toISOString();
  const first=businessTime(now+2*36e5);
  const slots=[first,businessTime(first+4*36e5)].filter(t=>t+2*36e5<=Date.parse(`${istDate(0,t)}T18:00:00+05:30`)).map(t=>({start:new Date(t).toISOString(),end:new Date(t+2*36e5).toISOString()}));
  return {id:`${r.id}-${r.revision}-${p.id}`,providerId:p.id,low:(base+p.delta)*r.quantity,high:(base+p.delta+50)*r.quantity,service:SERVICE_FEE,platform:0,returnAt,slots,active:true,materialAssessment:r.material==='Not sure'};
 }).filter(o=>Date.parse(o.returnAt)<=Date.parse(r.deadline)&&o.slots.some(s=>Date.parse(s.end)+12*36e5<Date.parse(o.returnAt)));
}
export function selectedOffer(r){return r.offers.find(o=>o.providerId===r.selected);}
export function transition(r,event,payload={},now=Date.now()){
 let n={...r};let message='';const need=states=>{if(!states.includes(r.status))throw Error('This action is not available at the current stage.');};
 switch(event){
  case 'responses':need(['waiting','none','offers']); n.offers=generateOffers(r,now);const all=n.offers.length;if(payload.count)n.offers=n.offers.slice(0,payload.count);n.searchComplete=!payload.count||payload.count>=all;n.status=n.offers.length?'offers':'none';if(r.notifyAvailability&&n.offers.length&&!r.offers.length)n.availabilityNotice=true;message=n.offers.length?'A suitable tailor responded.':'No suitable tailor response yet.';break;
  case 'none':need(['waiting','offers','none']);n.status='none';n.offers=[];n.searchComplete=true;message='Preview: no suitable tailor response.';break;
  case 'decline_request':need(['waiting','offers','none']);n.status='none';n.offers=[];n.searchComplete=true;message='Preview: providers declined; no suitable offer remains.';break;
  case 'unavailable':need(['offers']);n.offers=r.offers.map((o,i)=>i===0?{...o,active:false}:o);message='Preview: first responding offer withdrawn.';break;
  case 'edit':{
   if(!canEdit(r))throw Error('This request can no longer be edited.');let fresh=makeRequest(payload,now,r.id);n={...fresh,revision:r.revision+1,createdAt:r.createdAt,history:r.history};message='Requirements changed; earlier offers and pickup selection invalidated.';break;
  }
  case 'select':{
   need(['offers']);let o=r.offers.find(o=>o.providerId===payload.providerId&&o.active);
   if(!o||Date.parse(o.returnAt)<=now||Date.parse(o.returnAt)>Date.parse(r.deadline)||!o.slots.some(s=>Date.parse(s.start)>now))throw Error('This offer is no longer available. Please request fresh responses.');
   n.selected=payload.providerId;n.offers=r.offers.map(x=>({...x,active:x.providerId===payload.providerId}));n.status='selected';message='Preview tailor selected; other offers closed. Pickup is not confirmed.';break;
  }
  case 'reopen':need(['selected','pickup_pending']);n.selected=null;n.pickup=null;n.slot=null;n.status='waiting';n.offers=[];n.searchComplete=false;message='Selection changed; availability must be checked again.';break;
  case 'pickup':{
   need(['selected','pickup_pending']);let o=selectedOffer(r);let slot=o?.slots.find(s=>s.start===payload.slot);
   if(!slot||Date.parse(slot.start)<=now)throw Error('Choose a future pickup slot.');
   n.slot=slot;n.status='pickup_pending';message='Preview pickup requested, awaiting confirmation.';break;
  }
  case 'confirm_pickup':need(['pickup_pending']);if(Date.parse(r.slot.start)<=now)throw Error('The pickup slot has passed. Change the slot before confirming.');n.status='pickup_confirmed';message='Simulated pickup confirmed with fitting representative: Fitting specialist.';break;
  case 'collect':need(['pickup_confirmed']);n.status='collected';message='Simulated fitting assessment visit and garment collection.';break;
  case 'assess':{
   need(['collected']);let o=selectedOffer(r);n.status='quote';n.quote={alteration:o.low+40*r.quantity,service:o.service,platform:o.platform,total:o.low+40*r.quantity+o.service+o.platform,instructions:`${r.quantity} garment(s): ${r.task.toLowerCase()}. Desired length/fit and finish recorded during the fitting assessment. ${r.notes}`,returnAt:o.returnAt,revision:1};message='Assessment complete; final work and quote await approval.';break;
  }
  case 'revise':need(['quote']);if(!payload.instructions?.trim())throw Error('Add the requested instruction change.');n.quote={...r.quote,instructions:payload.instructions.trim(),revision:r.quote.revision+1};n.approved=null;message='Instructions updated; approval is required again.';break;
  case 'approve':need(['quote']);if(!payload.consent)throw Error('Please acknowledge the work, total and return commitment.');if(Date.parse(r.quote.returnAt)<=now||Date.parse(r.quote.returnAt)>Date.parse(r.deadline))throw Error('The return time needs reassessment before approval.');n.status='checkout_pending';n.approved={...r.quote,at:new Date(now).toISOString()};n.payment={status:'pending'};message='Customer approved the work, total and return commitment.';break;
  case 'decline_quote':need(['quote']);n.status='declined';message='Quote declined. Unaltered garment return arrangements are pending in this preview.';break;
  case 'ready':need(['altering']);if(r.payment?.status!=='simulated')throw Error('Complete the preview checkout first.');n.status='ready';message='Simulated alteration completed; garment ready for return.';break;
  case 'dispatch':need(['ready']);n.status='out';message='Simulated return dispatch.';break;
  case 'deliver':need(['out']);n.status='delivered';message='Simulated return delivery. Check fit and finish.';break;
  case 'delay':need(['altering','ready','out']);n.delay={original:r.approved.returnAt,proposed:new Date(Date.parse(r.approved.returnAt)+864e5).toISOString(),accepted:false};message='Simulated delay: revised return time proposed; original commitment retained.';break;
  case 'accept_delay':need(['altering','ready','out']);if(!r.delay)throw Error('No revised date is pending.');n.delay={...r.delay,accepted:true};message='Customer acknowledged the revised return time; original commitment retained.';break;
  case 'feedback':need(['delivered','correction_requested','correction_pickup_confirmed','correction_collected','correcting','correction_ready','correction_out','correction_delivered']);if(!['yes','no'].includes(payload.fit)||!['yes','no','none'].includes(payload.timing))throw Error('Answer both fit and timing questions.');if(payload.rating&&(!Number.isInteger(Number(payload.rating))||Number(payload.rating)<1||Number(payload.rating)>5))throw Error('Choose a rating from 1 to 5.');n.feedback={rating:payload.rating?Number(payload.rating):null,fit:payload.fit,timing:payload.timing,comment:payload.comment?.trim()||'',at:new Date(now).toISOString()};message='Preview feedback saved privately on this device, not published as a review.';break;
  case 'correction':need(['delivered']);if(!payload.issue)throw Error('Choose a correction issue.');n.status='correction_requested';n.correction={providerId:r.selected,issue:payload.issue,note:payload.note||'',confirmed:false,requestedAt:new Date(now).toISOString()};message='Preview correction request received; no correction pickup is confirmed.';break;

  case 'notify_availability':need(['waiting','offers','none']);n.notifyAvailability=!r.notifyAvailability;message=n.notifyAvailability?'Availability alerts enabled on this device.':'Availability alerts switched off.';break;
  case 'dismiss_notice':n.availabilityNotice=false;message='Availability update viewed.';break;
  case 'checkout':need(['checkout_pending']);if(!r.approved)throw Error('Approve the final quote first.');if(!['upi','card'].includes(payload.method))throw Error('Choose a checkout method.');if(!payload.consent)throw Error('Acknowledge that no money is charged.');if(r.payment?.status==='simulated')throw Error('Checkout is already complete.');n.status='altering';n.payment={status:'simulated',method:payload.method,amount:r.approved.total,reference:`SRP-${r.id}`,at:new Date(now).toISOString()};message='Preview checkout complete. No money was charged.';break;
  case 'correction_pickup':need(['correction_requested']);if(!payload.consent)throw Error('Agree to the proposed correction timing first.');if(!payload.slot||Date.parse(payload.slot)<=now)throw Error('Choose a future correction pickup slot.');n.correction={...r.correction,requestedSlot:payload.slot,confirmed:false};message='Correction pickup requested with the original tailor.';break;
  case 'confirm_correction_pickup':need(['correction_requested']);if(!r.correction?.requestedSlot||Date.parse(r.correction.requestedSlot)<=now)throw Error('A future pickup slot is required.');n.status='correction_pickup_confirmed';n.correction={...r.correction,confirmed:true,returnAt:new Date(businessTime(Date.parse(r.correction.requestedSlot)+48*36e5)).toISOString(),cost:0};message='Preview correction pickup confirmed with the original tailor; no additional charge in this scenario.';break;
  case 'collect_correction':need(['correction_pickup_confirmed']);n.status='correction_collected';message='Garment collected for the original tailor.';break;
  case 'start_correction':need(['correction_collected']);n.status='correcting';message='Original tailor is working on the reported issue.';break;
  case 'ready_correction':need(['correcting']);n.status='correction_ready';message='Correction ready for return.';break;
  case 'dispatch_correction':need(['correction_ready']);n.status='correction_out';message='Corrected garment out for delivery.';break;
  case 'deliver_correction':need(['correction_out']);n.status='correction_delivered';message='Corrected garment delivered. Please check the fit again.';break;
  case 'cancel':if(!canEdit(r))throw Error('Contact the preview help panel about cancellation at this stage.');n.status='cancelled';n.offers=r.offers.map(o=>({...o,active:false}));message='Preview request cancelled; no service was booked.';break;
  default:throw Error('Unknown action.');
 }
 n.updatedAt=new Date(now).toISOString();n.history=log(r,message,now);return n;
}
export function readStore(raw){try{let x=JSON.parse(raw);return x?.version===1&&Array.isArray(x.requests)?x.requests:[];}catch{return [];}}
