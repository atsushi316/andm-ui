import {motionPresets} from './presets.js';
export {motionPresets};
const valid=new Set(motionPresets.map(p=>p.id));
const clamp=(v,min,max,fallback)=>Number.isFinite(Number(v))?Math.min(max,Math.max(min,Number(v))):fallback;
const ns='http://www.w3.org/2000/svg';
const points=value=>Array.isArray(value)&&value.length>=3&&value.length<=64&&value.every(p=>Array.isArray(p)&&p.length===2&&p.every(Number.isFinite));
const successful=new Set(['finished','reduced-motion','unsupported']);
/** Optional animation controller. Business state belongs to the app, not a preset. */
export function createMotionGraphics(target){
 if(!target?.ownerDocument||target.nodeType!==1)throw new TypeError('Motion needs a DOM element.');
 const doc=target.ownerDocument,win=doc.defaultView,media=win.matchMedia('(prefers-reduced-motion: reduce)');
 let current=null,destroyed=false,epoch=0;const bindings=new Set();
 function end(tx,reason){
  if(!tx||tx.ended)return;tx.ended=true;tx.animations.forEach(a=>a.cancel());tx.cleanup.reverse().forEach(fn=>fn());
  if(successful.has(reason))tx.commit.forEach(fn=>fn());tx.semantic?.();if(current===tx)current=null;tx.resolve({preset:tx.preset,reason});
 }
 function cancel(){epoch++;end(current,'cancelled');}
 function play(preset,options={}){
  if(!valid.has(preset))throw new RangeError('Unknown motion preset: '+preset);
  if(destroyed)return Promise.resolve({preset,reason:'destroyed'});
  cancel();
  const strength=clamp(options.strength,0,1.5,.6),distance=28*strength;
  const token=getComputedStyle(target).getPropertyValue('--andm-motion-duration-short4').trim();
  const tokenMs=parseFloat(token)*(token.endsWith('ms')?1:1000);
  const duration=clamp(options.duration,150,4000,Number.isFinite(tokenMs)&&tokenMs>0?tokenMs:360);
  const easing=typeof options.easing==='string'?options.easing:'cubic-bezier(.2,.75,.25,1)';
  let resolve;const promise=new Promise(r=>resolve=r);
  const tx={preset,animations:[],cleanup:[],commit:[],resolve,ended:false};current=tx;const pending=[];
  const animate=(el,keyframes,extra={})=>{if(typeof el.animate!=='function')return;const a=el.animate(keyframes,{duration,easing,fill:'none',direction:options.direction==='reverse'?'reverse':'normal',...extra});tx.animations.push(a);pending.push(a.finished.catch(()=>{}));};
  const tween=(update,ms=duration)=>{let raf=0,done;const p=new Promise(r=>done=r);const start=win.performance.now();function tick(now){if(tx.ended){done();return;}const t=Math.min(1,(now-start)/ms);update(t);if(t<1)raf=win.requestAnimationFrame(tick);else done();}raf=win.requestAnimationFrame(tick);tx.cleanup.push(()=>{win.cancelAnimationFrame(raf);done();});pending.push(p);};
  const decorate=cls=>{const node=doc.createElement('span');node.className=cls;node.setAttribute('aria-hidden','true');node.inert=true;
   const host=target.namespaceURI===ns?target.parentElement:target;const previous=host.style.position;const changed=getComputedStyle(host).position==='static';if(changed)host.style.position='relative';host.append(node);tx.cleanup.push(()=>{node.remove();if(changed&&host.style.position==='relative')host.style.position=previous;});return node;};
  const particle=(kind)=>{const layer=decorate('andm-mg-decoration'),count=kind==='burst'?12:kind==='motion-trail'?8:24;
   for(let i=0;i<count;i++){const spark=doc.createElement('i');spark.className='andm-mg-spark'+(kind==='burst'?' andm-mg-ray':'');layer.append(spark);const angle=i/count*Math.PI*2,rad=(25+(i%5)*7)*strength;
    if(kind==='motion-trail')animate(spark,[{translate:`${-distance*.8+i*2}px ${distance*.2-i}px`,opacity:.5*(1-i/count),scale:1},{translate:`${distance*.5}px ${-distance*.6}px`,opacity:0,scale:.2}],{duration:duration*.8,delay:i*12});
    else animate(spark,[{translate:'0px 0px',opacity:.9,rotate:angle+'rad',scale:.2},{translate:`${Math.cos(angle)*rad}px ${Math.sin(angle)*rad}px`,opacity:.8,scale:1,offset:.5},{translate:`${Math.cos(angle)*rad*1.1}px ${Math.sin(angle)*rad+ (kind==='particles'?16:0)}px`,opacity:0,scale:.1}],{easing:'ease-out',delay:(i%4)*10});
   }
  };
  try{
   if(preset==='count-up'){
    const to=Number(options.to),from=Number(options.from??target.textContent.replace(/[^0-9.-]/g,''));if(!Number.isFinite(to)||!Number.isFinite(from))throw new TypeError('count-up requires finite from/to values.');
    const original=target.textContent,live=target.getAttribute('aria-live'),formatter=new Intl.NumberFormat('ja-JP',{maximumFractionDigits:clamp(options.decimals,0,3,0)});target.setAttribute('aria-live','off');
    tx.cleanup.push(()=>{target.textContent=original;if(live===null)target.removeAttribute('aria-live');else target.setAttribute('aria-live',live);});tx.commit.push(()=>target.textContent=formatter.format(to));tween(t=>{target.textContent=formatter.format(from+(to-from)*(1-(1-t)**3));});
   }else if(preset==='line-draw'){
    const geometry=typeof target.getTotalLength==='function'?[target]:[...target.querySelectorAll('path,line,polyline,polygon,circle,rect')].filter(e=>typeof e.getTotalLength==='function');if(!geometry.length)throw new TypeError('line-draw needs SVG geometry.');
    geometry.forEach(el=>{const length=el.getTotalLength();animate(el,[{strokeDasharray:String(length),strokeDashoffset:String(length)},{strokeDasharray:String(length),strokeDashoffset:'0'}]);});
   }else if(preset==='shape-morph'&&target.tagName.toLowerCase()==='polygon'){
    const from=options.fromPoints,to=options.toPoints;if(!points(from)||!points(to)||from.length!==to.length)throw new TypeError('shape-morph needs corresponding fromPoints/toPoints arrays.');
    const original=target.getAttribute('points');tx.cleanup.push(()=>{if(original===null)target.removeAttribute('points');else target.setAttribute('points',original);});tx.commit.push(()=>target.setAttribute('points',to.map(p=>p.join(',')).join(' ')));tween(t=>target.setAttribute('points',from.map((p,i)=>p.map((v,j)=>v+(to[i][j]-v)*(t*t*(3-2*t))).join(',')).join(' ')));
   }else if(preset==='stagger'){
    const children=[...target.querySelectorAll('[data-motion-item]')];const els=children.length?children:[...target.children];els.slice(0,48).forEach((el,i)=>animate(el,[{opacity:0,translate:`0 ${distance*.4}px`},{opacity:1,translate:'0 0'}],{delay:i*clamp(options.stagger,0,150,35)}));
   }else if(preset==='kinetic-typography'){
    if(target.children.length||[...target.textContent].length>120)throw new TypeError('kinetic-typography needs plain text of at most 120 characters.');const original=[...target.childNodes],text=target.textContent;tx.cleanup.push(()=>target.replaceChildren(...original));target.replaceChildren();const sr=doc.createElement('span');sr.className='andm-mg-sr';sr.textContent=text;target.append(sr);
    [...text].slice(0,120).forEach((char,i)=>{const span=doc.createElement('span');span.className='andm-mg-letter';span.setAttribute('aria-hidden','true');span.textContent=char;target.append(span);animate(span,[{translate:`0 ${distance*.45}px`,rotate:`${(i%2?1:-1)*strength*9}deg`,opacity:0},{translate:'0 0',rotate:'0deg',opacity:1}],{delay:i*18});});
   }else if(preset==='parallax'){
    const els=[...target.querySelectorAll('[data-motion-depth]')];if(!els.length)throw new TypeError('parallax needs children with data-motion-depth.');els.forEach(el=>{const depth=clamp(el.dataset.motionDepth,-2,2,1);animate(el,[{translate:`${-distance*depth/2}px 0`},{translate:`${distance*depth/2}px 0`,offset:.6},{translate:'0 0'}]);});
   }else if(['burst','particles','motion-trail'].includes(preset)){
    particle(preset);if(preset==='motion-trail')animate(target,[{translate:'0 0'},{translate:`${distance}px ${-distance*.7}px`,offset:.6},{translate:'0 0'}]);else animate(target,[{scale:1},{scale:1+strength*.12,offset:.4},{scale:1}]);
   }else if(preset==='light-sweep'){
    const layer=decorate('andm-mg-sweep'),beam=doc.createElement('i');layer.append(beam);animate(beam,[{translate:'-65% 0',opacity:0},{translate:'0 0',opacity:.8,offset:.5},{translate:'65% 0',opacity:0}],{easing:'linear'});
   }else{
    const frames={
     'pop-in':[{scale:1-strength*.45,opacity:0},{scale:1+strength*.12,opacity:1,offset:.7},{scale:1,opacity:1}],
     'mask-reveal':[{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0% 0 0)'}],
     typewriter:[{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0% 0 0)'}],
     easing:[{translate:`${-distance}px 0`},{translate:`${distance}px 0`,offset:.65},{translate:'0 0'}],
     overshoot:[{translate:`${-distance}px 0`,scale:.8},{translate:`${distance*.22}px 0`,scale:1+strength*.1,offset:.7},{translate:'0 0',scale:1}],
     'squash-stretch':[{scale:'1 1'},{scale:`${1+strength*.25} ${1-strength*.22}`,offset:.22},{scale:`${1-strength*.14} ${1+strength*.2}`,offset:.55},{scale:'1 1'}],
     'shape-morph':[{borderRadius:'8%'},{borderRadius:'50%',offset:.55},{borderRadius:'8%'}],
     'liquid-motion':[{borderRadius:'35% 65% 58% 42%',rotate:'0deg',scale:'1 1'},{borderRadius:'60% 40% 35% 65%',rotate:strength*9+'deg',scale:`${1+strength*.16} ${1-strength*.1}`,offset:.5},{borderRadius:'35% 65% 58% 42%',rotate:'0deg',scale:'1 1'}],
     'mask-transition':[{clipPath:'circle(0% at 25% 50%)'},{clipPath:'circle(150% at 25% 50%)'}],
     'shape-transition':[{clipPath:'polygon(0 0,0 0,0 100%,0 100%)'},{clipPath:'polygon(0 0,100% 0,100% 100%,0 100%)'}],
     'liquid-transition':[{clipPath:'polygon(0 0,20% 0,40% 0,60% 0,80% 0,100% 0,100% 0,0 0)'},{clipPath:'polygon(0 70%,20% 40%,40% 60%,60% 40%,80% 65%,100% 45%,100% 0,0 0)',offset:.55},{clipPath:'polygon(0 100%,20% 100%,40% 100%,60% 100%,80% 100%,100% 100%,100% 0,0 0)'}],
     'zoom-through':[{scale:1+strength*.7,clipPath:'circle(4% at 50% 50%)',opacity:.3},{scale:1,clipPath:'circle(150% at 50% 50%)',opacity:1}],
     flip:[{transform:'perspective(600px) rotateY(-85deg)',opacity:0},{transform:'perspective(600px) rotateY(0deg)',opacity:1}],
     glitch:[{translate:'0 0',textShadow:'2px 0 #7ec6c0,-2px 0 #d5a1bc'},{translate:`${strength*4}px 0`,offset:.33},{translate:`${-strength*3}px 0`,offset:.66},{translate:'0 0',textShadow:'none'}],
     'impact-shake':[{translate:'0 0'},{translate:`${strength*6}px 0`,rotate:strength*2+'deg',offset:.2},{translate:`${-strength*5}px 0`,rotate:-strength*2+'deg',offset:.4},{translate:`${strength*3}px 0`,rotate:'0deg',offset:.6},{translate:'0 0',rotate:'0deg'}]
    }[preset];animate(target,frames,preset==='typewriter'?{easing:`steps(${Math.max(1,[...target.textContent].length)},end)`}:preset==='glitch'?{duration:Math.max(900,duration),easing:'linear'}:{});
   }
  }catch(error){end(tx,'cancelled');return Promise.reject(error);}
  if(media.matches||options.reducedMotion||strength===0){end(tx,'reduced-motion');return promise;}
  if(typeof target.animate!=='function'){end(tx,'unsupported');return promise;}
  Promise.all(pending).then(()=>{if(!tx.ended)end(tx,'finished');});return promise;
 }
 async function transition({visible,preset='mask-reveal',focusTarget,...options}={}){
  if(destroyed)return {preset,reason:'destroyed'};const show=!!visible;
  if(!show&&target.contains(doc.activeElement)){if(!focusTarget?.focus||target.contains(focusTarget))return {preset,reason:'focus-required'};focusTarget.focus();if(target.contains(doc.activeElement))return {preset,reason:'focus-required'};}
  cancel();const previous=target.hidden;if(previous===!show)return {preset,reason:'finished'};if(show)target.hidden=false;
  const promise=play(preset,{...options,direction:show?'normal':'reverse'}),mine=epoch;if(current){const tx=current;if(!show){const wasInert=target.inert;target.inert=true;tx.cleanup.push(()=>target.inert=wasInert);}tx.semantic=()=>target.hidden=!show;}let result;try{result=await promise;}catch(error){if(mine===epoch)target.hidden=previous;throw error;}
  if(mine===epoch)target.hidden=successful.has(result.reason)?!show:previous;return result;
 }
 function bind(event,preset,options={}){if(!valid.has(preset))throw new RangeError('Unknown motion preset: '+preset);if(destroyed)throw new Error('Motion controller is destroyed.');const handler=()=>play(preset,typeof options==='function'?options():options).catch(()=>{});target.addEventListener(event,handler);const dispose=()=>{target.removeEventListener(event,handler);bindings.delete(dispose);};bindings.add(dispose);return dispose;}
 const reduce=()=>{if(media.matches)end(current,'reduced-motion');};media.addEventListener('change',reduce);
 return {play,transition,cancel,bind,destroy(){cancel();destroyed=true;bindings.forEach(fn=>fn());media.removeEventListener('change',reduce);}};
}
