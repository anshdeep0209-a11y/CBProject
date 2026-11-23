import test from 'node:test';
import assert from 'node:assert/strict';
import {observeTestBGarmentCards,sendTestBEvent,TEST_B_EVENTS} from '../src/testBAnalytics.mjs';
function environment(){
 let rect={top:200,bottom:400,left:0,right:200,width:200,height:200},next=0,intersect;
 const timers=new Map(),listeners=new Map(),events=[];
 const card={isConnected:true,getBoundingClientRect:()=>rect};
 const doc={visibilityState:'visible',documentElement:{clientWidth:390},querySelector:()=>null,addEventListener:(n,f)=>listeners.set(n,f),removeEventListener:n=>listeners.delete(n)};
 const win={innerWidth:390,innerHeight:800,gtag:(...args)=>events.push(args),setTimeout:f=>{const n=++next;timers.set(n,f);return n;},clearTimeout:n=>timers.delete(n),addEventListener:(n,f)=>listeners.set(n,f),removeEventListener:n=>listeners.delete(n),IntersectionObserver:class{constructor(f){intersect=f;}observe(){}disconnect(){}}};
 return{win,doc,events,timers,listeners,section:{querySelectorAll:()=>[card]},setRect:r=>rect=r,intersect:()=>intersect([{target:card}]),tick:()=>{const entries=[...timers];timers.clear();entries.forEach(([,f])=>f());}};
}
test('B card exposure emits once after visible dwell, even after subsequent scrolling',()=>{const e=environment();const stop=observeTestBGarmentCards(e.section,e.win,e.doc);assert.equal(e.events.length,0);e.tick();assert.equal(e.events.length,1);assert.equal(e.events[0][1],TEST_B_EVENTS.view);assert.equal(e.events[0][2].experiment_variant,'B');assert.equal(e.events[0][2].send_to,'G-TKFV5R5BV0');e.intersect();e.tick();assert.equal(e.events.length,1);stop();});
test('cards below the viewport do not count as exposure',()=>{const e=environment();e.setRect({top:900,bottom:1100,left:0,right:200,width:200,height:200});const stop=observeTestBGarmentCards(e.section,e.win,e.doc);e.tick();assert.equal(e.events.length,0);stop();});
test('leaving the viewport before one second cancels the exposure',()=>{const e=environment();const stop=observeTestBGarmentCards(e.section,e.win,e.doc);e.setRect({top:900,bottom:1100,left:0,right:200,width:200,height:200});e.intersect();e.tick();assert.equal(e.events.length,0);stop();});
test('a hidden tab cancels dwell; returning visible starts fresh dwell',()=>{const e=environment();const stop=observeTestBGarmentCards(e.section,e.win,e.doc);e.doc.visibilityState='hidden';e.listeners.get('visibilitychange')();e.tick();assert.equal(e.events.length,0);e.doc.visibilityState='visible';e.listeners.get('visibilitychange')();assert.equal(e.events.length,0);e.tick();assert.equal(e.events.length,1);stop();});
test('unmount cleanup cancels pending events and listeners',()=>{const e=environment();const stop=observeTestBGarmentCards(e.section,e.win,e.doc);stop();e.tick();assert.equal(e.events.length,0);assert.equal(e.listeners.size,0);});
test('a services click has its own B event and cannot break navigation if analytics is absent or throws',()=>{const e=environment();assert.equal(sendTestBEvent(TEST_B_EVENTS.click,{link_url:'/services'},e.win),true);assert.equal(e.events[0][1],'test_b_explore_services_click');assert.equal(e.events[0][2].link_url,'/services');assert.equal(sendTestBEvent(TEST_B_EVENTS.click,{},{}),false);assert.equal(sendTestBEvent(TEST_B_EVENTS.click,{}, {gtag(){throw Error('unavailable')}}),false);});
test('an unsupported IntersectionObserver still records exposure through the geometry fallback',()=>{const e=environment();delete e.win.IntersectionObserver;const stop=observeTestBGarmentCards(e.section,e.win,e.doc);e.tick();assert.equal(e.events.length,1);stop();});
