/* Original DOM-measured construction reveal. No dependency, data cloning, or network. */
const ns='http://www.w3.org/2000/svg';
const svgNode=(tag,attrs)=>{const e=document.createElementNS(ns,tag);Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,String(v)));return e;};
function outline(card,style){
 const box=card.getBoundingClientRect(),w=box.width,h=box.height,svg=svgNode('svg',{viewBox:`0 0 ${w} ${h}`,'aria-hidden':'true',focusable:'false',class:'cr-outline'});
 const draw=(tag,attrs,cls='cr-line')=>{const e=svgNode(tag,{...attrs,class:cls,pathLength:1});svg.append(e);return e;};
 const dot=(x,y)=>draw('circle',{cx:x,cy:y,r:1.3},'cr-dot');
 const radius=parseFloat(getComputedStyle(card).borderTopLeftRadius)||0;
 if(style==='blueprint'){
  for(let y=12;y<h;y+=20)for(let x=12;x<w;x+=20)draw('circle',{cx:x,cy:y,r:.55},'cr-dot');
  draw('path',{d:`M4 12V4H12M${w-12} 4H${w-4}V12M4 ${h-12}V${h-4}H12M${w-12} ${h-4}H${w-4}V${h-12}`},'cr-guide');
 }
 draw('rect',{x:2,y:2,width:Math.max(0,w-4),height:Math.max(0,h-4),rx:radius},style==='skeleton'?'cr-guide':'cr-line');
 const parts=[...card.querySelectorAll('[data-reveal-part]')].filter(e=>e.getClientRects().length&&e.getBoundingClientRect().width>0);
 parts.forEach((el,i)=>{
  const r=el.getBoundingClientRect(),x=r.x-box.x,y=r.y-box.y,pw=r.width,ph=r.height;
  if(style==='skeleton'){draw('rect',{x,y:y+2,width:pw,height:Math.max(4,ph-4),rx:Math.min(6,ph/3)},'cr-skeleton');return;}
  if(el.dataset.revealPart==='text'){
   const lines=Math.max(1,Math.min(3,Math.round(ph/(parseFloat(getComputedStyle(el).lineHeight)||ph))));
   for(let line=0;line<lines;line++){const ly=y+(line+.65)*ph/lines;draw('path',{d:`M${x} ${ly}H${x+pw*(line===lines-1?.82:1)}`});if(style==='blueprint')dot(x,ly);}
  }else{
   draw('rect',{x,y,width:pw,height:ph,rx:Math.min(8,parseFloat(getComputedStyle(el).borderTopLeftRadius)||0)});
   if(el.dataset.revealPart==='chart'){for(let row=1;row<4;row++)draw('path',{d:`M${x} ${y+ph*row/4}H${x+pw}`},'cr-guide');for(let col=1;col<6;col++)draw('path',{d:`M${x+pw*col/6} ${y}V${y+ph}`},'cr-guide');}
   if(style==='blueprint'){dot(x,y);dot(x+pw,y+ph);}
  }
 });
 if(style==='blueprint'){const label=svgNode('text',{x:12,y:h-7,class:'cr-measure'});label.textContent=`STRUCTURE / ${String(parts.length).padStart(2,'0')} PARTS`;svg.append(label);}
 return svg;
}
export function createConstructionReveal(card){
 const content=card.querySelector(':scope > .cr-content');if(!content)throw new Error('A reveal card needs a direct .cr-content child.');
 const saved={inert:content.inert,hidden:content.getAttribute('aria-hidden')};
 let timers=new Set(),pending=null,overlay=null,destroyed=false;
 const later=(fn,ms)=>{const timer=setTimeout(()=>{timers.delete(timer);fn();},ms);timers.add(timer);};
 function finish(reason='complete'){
  timers.forEach(clearTimeout);timers.clear();card.dataset.revealState='complete';content.inert=saved.inert;
  if(saved.hidden===null)content.removeAttribute('aria-hidden');else content.setAttribute('aria-hidden',saved.hidden);
  overlay?.remove();overlay=null;card.style.removeProperty('--cr-duration');
  card.querySelectorAll('.cr-unit').forEach(e=>e.style.removeProperty('--cr-unit-delay'));
  const resolve=pending;pending=null;resolve?.(reason);
 }
 function play({style='blueprint',duration=1800,delay=0,disabled=false}={}){
  finish('restarted');
  if(destroyed||disabled||matchMedia('(prefers-reduced-motion: reduce)').matches||card.contains(document.activeElement))return Promise.resolve('skipped');
  duration=Math.max(200,Math.min(6000,Number(duration)||1800));delay=Math.max(0,Math.min(1000,Number(delay)||0));style=['blueprint','wireframe','skeleton'].includes(style)?style:'blueprint';
  overlay=outline(card,style);overlay.style.setProperty('--cr-delay',delay+'ms');card.append(overlay);card.style.setProperty('--cr-duration',duration+'ms');
  card.querySelectorAll('.cr-unit').forEach((e,i)=>e.style.setProperty('--cr-unit-delay',Math.min(i*duration*.012,duration*.13)+'ms'));
  content.inert=true;content.setAttribute('aria-hidden','true');card.dataset.revealState='tracing';
  return new Promise(resolve=>{pending=resolve;later(()=>{card.dataset.revealState='revealing';},duration*.5+delay);later(()=>finish(),duration+delay);});
 }
 const resize=new ResizeObserver(()=>{if(overlay){const next=outline(card,overlay.querySelector('.cr-skeleton')?'skeleton':overlay.querySelector('.cr-measure')?'blueprint':'wireframe');next.style.cssText=overlay.style.cssText;overlay.replaceWith(next);overlay=next;}});resize.observe(card);
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');const onReduced=()=>{if(reduced.matches)finish('reduced-motion');};reduced.addEventListener('change',onReduced);
 return {play,finish,destroy(){finish('destroyed');destroyed=true;resize.disconnect();reduced.removeEventListener('change',onReduced);}};
}
