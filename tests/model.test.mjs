import test from 'node:test';
import assert from 'node:assert/strict';
import {makeRequest,transition,generateOffers,validateDraft,selectedOffer,readStore,LOCALITIES,istDate} from '../src/model.mjs';
const now=Date.parse('2026-11-25T04:00:00Z');
const draft={garment:'shirt',task:'Shorten sleeves',locality:LOCALITIES[0],material:'Cotton',quantity:1,date:'2026-11-28',time:'18:00',notes:'Sample sleeve adjustment'};
const make=()=>makeRequest(draft,now,'SR-TEST');
function advance(r,event,payload={}){return transition(r,event,payload,now);}
function quoteReady(){let r=advance(make(),'responses');r=advance(r,'select',{providerId:r.offers[0].providerId});r=advance(r,'pickup',{slot:selectedOffer(r).slots[0].start});for(const e of ['confirm_pickup','collect','assess'])r=advance(r,e);return r;}
test('task, locality, quantity and future return deadline must be valid',()=>{
 assert.deepEqual(validateDraft(draft,now),{});
 for(const change of [{garment:''},{task:'Build a new suit'},{locality:'Unsupported area'},{quantity:0},{quantity:1.5},{date:'2020-01-01'},{time:''}])assert.ok(Object.keys(validateDraft({...draft,...change},now)).length);
});
test('request dispatch is distinct from selection and pickup',()=>{const r=make();assert.equal(r.status,'waiting');assert.equal(r.selected,undefined);assert.equal(r.slot,undefined);});
test('offers satisfy garment, material and customer return deadline including transport',()=>{
 const r=make();assert.equal(generateOffers(r,now).length,3);
 const urgent=makeRequest({...draft,date:'2026-11-25',time:'23:00'},now);assert.equal(generateOffers(urgent,now).length,0);
 const silk=makeRequest({...draft,material:'Silk / delicate'},now);assert.deepEqual(generateOffers(silk,now).map(o=>o.providerId),['needle-house']);
});
test('unknown material is flagged for assessment, not confirmed capability',()=>{let r=makeRequest({...draft,material:'Not sure'},now);assert.ok(generateOffers(r,now).every(o=>o.materialAssessment));});
test('one selection closes other offers; unavailable offer cannot be selected',()=>{
 let r=advance(make(),'responses');r=advance(r,'unavailable');assert.throws(()=>advance(r,'select',{providerId:r.offers[0].providerId}));
 r=advance(r,'select',{providerId:r.offers[1].providerId});assert.equal(r.offers.filter(o=>o.active).length,1);assert.equal(r.status,'selected');assert.throws(()=>advance(r,'select',{providerId:r.offers[2].providerId}));
});
test('requirements editing invalidates offers, provider and pickup',()=>{
 let r=advance(make(),'responses');r=advance(r,'select',{providerId:r.offers[0].providerId});r=advance(r,'pickup',{slot:selectedOffer(r).slots[0].start});r=advance(r,'edit',{...draft,material:'Denim'});assert.equal(r.status,'waiting');assert.equal(r.offers.length,0);assert.equal(r.selected,undefined);assert.equal(r.slot,undefined);assert.equal(r.revision,2);
});
test('changing providers reopens availability rather than reactivating offers',()=>{let r=advance(make(),'responses');r=advance(r,'select',{providerId:r.offers[0].providerId});r=advance(r,'reopen');assert.equal(r.status,'waiting');assert.deepEqual(r.offers,[]);});
test('pickup needs a valid future slot and separate confirmation',()=>{let r=advance(make(),'responses');r=advance(r,'select',{providerId:r.offers[0].providerId});assert.throws(()=>advance(r,'pickup',{slot:'invalid'}));r=advance(r,'pickup',{slot:selectedOffer(r).slots[0].start});assert.equal(r.status,'pickup_pending');r=advance(r,'confirm_pickup');assert.equal(r.status,'pickup_confirmed');});
test('alteration cannot start or finish without approval',()=>{let r=quoteReady();assert.equal(r.status,'quote');assert.throws(()=>advance(r,'ready'));assert.throws(()=>advance(r,'approve',{consent:false}));assert.throws(()=>advance(r,'deliver'));});
test('approved price adds up and approved record is retained through delivery',()=>{let r=quoteReady();assert.equal(r.quote.total,220);assert.equal(r.quote.alteration+r.quote.service+r.quote.platform,r.quote.total);r=advance(r,'approve',{consent:true});const record=JSON.stringify(r.approved);for(const e of ['ready','dispatch','deliver'])r=advance(r,e);assert.equal(r.status,'delivered');assert.equal(JSON.stringify(r.approved),record);});
test('revised instructions need approval and declined quote blocks alteration',()=>{let r=quoteReady();r=advance(r,'revise',{instructions:'Revised sample sleeve finish'});assert.equal(r.quote.revision,2);assert.equal(r.status,'quote');r=advance(r,'decline_quote');assert.equal(r.status,'declined');assert.throws(()=>advance(r,'approve',{consent:true}));assert.throws(()=>advance(r,'ready'));});
test('delay preserves original commitment, requires acknowledgement',()=>{let r=advance(quoteReady(),'approve',{consent:true});const original=r.approved.returnAt;r=advance(r,'delay');assert.equal(r.approved.returnAt,original);assert.equal(r.delay.original,original);assert.equal(r.delay.accepted,false);r=advance(r,'accept_delay');assert.equal(r.delay.accepted,true);assert.equal(r.approved.returnAt,original);});
test('fit check and correction cannot precede delivery; correction is not booked',()=>{let r=advance(quoteReady(),'approve',{consent:true});assert.throws(()=>advance(r,'feedback',{fit:'yes',timing:'yes'}));assert.throws(()=>advance(r,'correction',{issue:'Length needs correction'}));for(const e of ['ready','dispatch','deliver'])r=advance(r,e);r=advance(r,'correction',{issue:'Length needs correction'});assert.equal(r.status,'correction_requested');assert.equal(r.correction.confirmed,false);r=advance(r,'feedback',{fit:'no',timing:'yes'});assert.equal(r.feedback.fit,'no');assert.equal(r.feedback.timing,'yes');});
test('cancellation blocks operational advance; data reload preserves progress',()=>{let r=advance(make(),'cancel');assert.throws(()=>advance(r,'responses'));assert.throws(()=>advance(r,'confirm_pickup'));const raw=JSON.stringify({version:1,requests:[r]});assert.equal(readStore(raw)[0].status,'cancelled');assert.deepEqual(readStore('invalid'),[]);assert.deepEqual(readStore('{"version":0,"requests":[]}'),[]);});
test('Indian date boundary does not depend on the server timezone',()=>{assert.equal(istDate(0,Date.parse('2026-11-25T20:00:00Z')),'2026-11-26');});
