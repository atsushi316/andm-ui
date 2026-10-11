import {lensField, springStep, sliderRatio} from './optics.js';
const NS = 'http://www.w3.org/2000/svg';
let serial = 0;
function svgElement(name, attrs) { const el = document.createElementNS(NS, name); for (const [k,v] of Object.entries(attrs)) el.setAttribute(k, v); return el; }

/** Explicit opt-in enhancement. Native button/range remain the action/value owners.
 * background: {element: sceneElement, image: URL} enables controlled-image refraction.
 * Without it, CSS frosting/edge light remains. destroy removes all listeners/filters. */
export function enhanceLiquidGlass(scope, {background = null, onAction = () => {}} = {}) {
  if (!scope.matches('.andm-series--apple-liquid-glass')) throw new Error('Use the experimental scope.');
  scope.dataset.enhanced = 'true';
  const abort = new AbortController(), signal = abort.signal;
  const listen = (el, name, fn, options = {}) => el.addEventListener(name, fn, {...options, signal});
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const transparency = matchMedia('(prefers-reduced-transparency: reduce)');
  const quiet = () => motion.matches || scope.dataset.motion === 'reduced';
  const opaque = () => transparency.matches || scope.dataset.transparency === 'reduced';
  const jobs = new Set(), cleanup = [], faces = [], springs = [], mapCache = new Map();
  listen(scope,'pointerdown',()=>{scope.dataset.input='pointer';},{capture:true});
  listen(scope,'keydown',()=>{scope.dataset.input='keyboard';},{capture:true});
  let raf = 0, last = 0, alive = true;
  const svg = svgElement('svg', {width: 0, height: 0, 'aria-hidden': 'true'});
  svg.style.cssText = 'position:absolute;pointer-events:none;overflow:hidden';
  const defs = svgElement('defs', {}); svg.append(defs); scope.append(svg);
  function tick(now) {
    raf = 0; const dt = last ? (now-last)/1000 : 1/60; last = now;
    for (const fn of [...jobs]) if (!fn(dt)) jobs.delete(fn);
    syncTextures();
    if (jobs.size && alive) raf = requestAnimationFrame(tick); else last = 0;
  }
  function schedule(fn) { if (fn) jobs.add(fn); if (!raf && alive) raf = requestAnimationFrame(tick); }
  function elastic(face) {
    const baseY=face.parentElement.classList.contains('andm-glass-slider__thumb')?.82:1;
    let x = {x:1,v:0}, y = {x:baseY,v:0}, tx = 1, ty = baseY;
    const run = dt => {
      if (quiet()) { x={x:1,v:0}; y={x:baseY,v:0}; }
      else { x=springStep(x,tx,dt); y=springStep(y,ty,dt); }
      face.style.setProperty('--glass-sx',x.x.toFixed(4)); face.style.setProperty('--glass-sy',y.x.toFixed(4));
      return !quiet() && (x.x!==tx || y.x!==ty);
    };
    const result = {set(a,b){tx=a;ty=b===1?baseY:b;schedule(run);}, kick(){if(!quiet()){x.v+=1.5;y.v+=.9;schedule(run);}}, reset(){tx=1;ty=baseY;x={x:1,v:0};y={x:baseY,v:0};run(0);}};
    springs.push(result); return result;
  }
  function makeFace(host) {
    const face=document.createElement('span');face.className='andm-glass__face';face.setAttribute('aria-hidden','true');
    const texture=document.createElement('span');texture.className='andm-glass__texture';
    const light=document.createElement('span');light.className='andm-glass__light';face.append(texture,light);host.prepend(face);
    const item={host,face,texture,key:'',filter:null};faces.push(item);return item;
  }
  function syncTextures() {
    if (!background || opaque() || scope.dataset.optics === 'frost') return;
    const scene=background.element.getBoundingClientRect();
    for(const item of faces) {
      const r=item.face.getBoundingClientRect(); if(r.width<2||r.height<2)continue;
      // The untransformed layout size keeps maps stable during press/drag squash.
      const morph=item.host.classList.contains('andm-glass-menu__bubble');
      const w=item.face.offsetWidth,h=item.face.offsetHeight;
      const radius=Math.min(parseFloat(getComputedStyle(item.face).borderRadius)||Math.min(w,h)/2,w/2,h/2);
      // Cache map resolution during morph; corner radius follows the actual panel.
      const mw=morph?Math.max(8,Math.round(w/8)*8):w,mh=morph?Math.max(8,Math.round(h/8)*8):h;
      const key=`${mw}:${mh}:${radius}`;
      if (!background.image) { item.texture.style.backgroundImage='none'; continue; }
      item.texture.style.backgroundImage=`url("${background.image}")`;
      item.texture.style.backgroundSize=`${scene.width/(r.width/item.face.offsetWidth)}px ${scene.height/(r.height/item.face.offsetHeight)}px`;
      item.texture.style.backgroundPosition=`${(scene.left-r.left)/(r.width/item.face.offsetWidth)}px ${(scene.top-r.top)/(r.height/item.face.offsetHeight)}px`;
      if(item.key!==key) {
        item.key=key;
        let entry=mapCache.get(key);
        if(!entry) {
          const map=lensField(mw,mh,Math.min(12,mh/3),Math.min(18,mh*.36),radius);
          const canvas=document.createElement('canvas');canvas.width=map.width;canvas.height=map.height;
          canvas.getContext('2d').putImageData(new ImageData(map.pixels,map.width,map.height),0,0);
          entry={url:canvas.toDataURL(),scale:map.scale};
          if(mapCache.size>=64)mapCache.delete(mapCache.keys().next().value);
          mapCache.set(key,entry);
        }
        if(!item.filter) {
          const id=`andm-liquid-${++serial}`;
          const filter=svgElement('filter',{id,x:'0%',y:'0%',width:'100%',height:'100%','color-interpolation-filters':'sRGB'});
          filter.append(svgElement('feImage',{x:0,y:0,width:'100%',height:'100%',preserveAspectRatio:'none',result:'map'}),svgElement('feDisplacementMap',{in:'SourceGraphic',in2:'map',xChannelSelector:'R',yChannelSelector:'G'}));
          defs.append(filter);item.filter=filter;item.texture.style.filter=`url(#${id})`;
        }
        item.filter.firstChild.setAttribute('href',entry.url);
        item.filter.lastChild.setAttribute('scale',entry.scale);
      }
    }
  }
  for(const button of scope.querySelectorAll('button.andm-glass, .icon-toolbar > button')) {
    const face=button.classList.contains('andm-glass')?makeFace(button).face:button.querySelector('svg');
    const spring=elastic(face);
    const hold=()=>{if(button.disabled)return;button.dataset.held='true';spring.set(1.075,1.055);};
    const release=()=>{if(button.dataset.held!=='true')return;delete button.dataset.held;spring.set(1,1);};
    listen(button,'pointerleave',release);
    listen(button,'pointerdown',hold);listen(button,'pointermove',e=>{const r=button.getBoundingClientRect();face.style.setProperty('--glass-light-x',`${Math.max(0,Math.min(100,(e.clientX-r.left)/r.width*100))}%`);});
    listen(button,'keydown',e=>{if(e.key===' '||e.key==='Enter')hold();if(e.key==='Escape')release();});
    for(const event of ['pointerup','pointercancel','keyup','blur'])listen(button,event,release);
    listen(window,'pointerup',release);listen(window,'blur',release);
    listen(button,'click',()=>{if(!button.disabled){spring.kick();onAction(button.dataset.action || 'button',button);}});
  }
  for(const slider of scope.querySelectorAll('.andm-glass-slider')) {
    const input=slider.querySelector('input[type="range"]'),thumb=slider.querySelector('.andm-glass-slider__thumb'),output=slider.querySelector('output');
    const {face}=makeFace(thumb),spring=elastic(face);let previous=Number(input.value),at=0,drag=null;
    function update() {
      const min=Number(input.min||0),max=Number(input.max||100),ratio=(Number(input.value)-min)/(max-min||1);
      const width=slider.querySelector('.andm-glass-slider__rail').getBoundingClientRect().width;
      thumb.style.left=`${Math.max(0,width-56)*ratio}px`;slider.style.setProperty('--glass-fill',`${ratio*100}%`);
      if(output)output.value=`${input.value}%`; input.setAttribute('aria-valuetext',`${input.value}パーセント`);
      const now=performance.now(),velocity=(Number(input.value)-previous)/Math.max(16,now-at);
      if(slider.dataset.held==='true')spring.set(1.06+Math.min(.10,Math.abs(velocity)*.14),1.10-Math.min(.10,Math.abs(velocity)*.10));
      previous=Number(input.value);at=now;schedule();
    }
    const release=()=>{delete slider.dataset.held;spring.set(1,1);schedule();};
    listen(input,'keydown',e=>{if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End','PageUp','PageDown'].includes(e.key)){slider.dataset.held='true';spring.set(1.06,1.10);}});
    function pointerValue(e) {
      const r=input.getBoundingClientRect(),min=Number(input.min||0),max=Number(input.max||100),step=Number(input.step)||1;
      const value=min+sliderRatio(e.clientX,r.left,r.width,56)*(max-min);
      input.value=String(Math.max(min,Math.min(max,min+Math.round((value-min)/step)*step)));
      input.dispatchEvent(new Event('input',{bubbles:true}));
    }
    listen(input,'input',update);
    listen(input,'pointerdown',e=>{if(input.disabled||e.button!==0||scope.dataset.variant==='apple')return;
      e.preventDefault();drag=e.pointerId;input.setPointerCapture(e.pointerId);input.focus({preventScroll:true});
      slider.dataset.held='true';spring.set(1.06,1.10);pointerValue(e);
    });
    listen(input,'pointermove',e=>{if(drag===e.pointerId)pointerValue(e);});
    listen(input,'pointerup',e=>{if(drag===e.pointerId){pointerValue(e);drag=null;input.dispatchEvent(new Event('change',{bubbles:true}));}});
    listen(input,'pointercancel',()=>{drag=null;});
    listen(input,'lostpointercapture',()=>{drag=null;release();});
    for(const event of ['pointerup','pointercancel','blur','keyup'])listen(input,event,release);
    listen(window,'pointerup',release);listen(window,'blur',release);
    cleanup.push(update);update();
  }
  for(const tabs of scope.querySelectorAll('.andm-glass-tabs')) {
    makeFace(tabs);const buttons=[...tabs.querySelectorAll('[role="tab"]')];
    const lens=document.createElement('span');lens.className='andm-glass andm-glass-tabs__lens';lens.setAttribute('aria-hidden','true');tabs.prepend(lens);const lensSpring=elastic(makeFace(lens).face);
    let position={x:0,v:0},target=0,drag=null,initialized=false;
    const move=dt=>{position=quiet()?{x:target,v:0}:springStep(position,target,dt,300,28);lens.style.transform=`translateX(${position.x}px)`;return position.x!==target;};
    function select(button,focus=false) {
      for(const el of buttons){const selected=el===button;el.setAttribute('aria-selected',String(selected));el.tabIndex=selected?0:-1;const panel=scope.querySelector(`#${el.getAttribute('aria-controls')}`);if(panel)panel.hidden=!selected;}
      const r=button.getBoundingClientRect(),container=tabs.getBoundingClientRect();target=r.left-container.left-6;if(!initialized){position={x:target,v:0};initialized=true;}lens.style.width=`${r.width}px`;schedule(move);if(focus)button.focus();
    }
    for(const [i,button]of buttons.entries()) {
      listen(button,'click',()=>{select(button);lensSpring.kick();});listen(button,'keydown',e=>{let n;if(e.key==='ArrowRight')n=(i+1)%buttons.length;if(e.key==='ArrowLeft')n=(i+buttons.length-1)%buttons.length;if(e.key==='Home')n=0;if(e.key==='End')n=buttons.length-1;if(n!==undefined){e.preventDefault();select(buttons[n],true);}});
    }
    const dragSelect=e=>{const button=buttons.find(b=>{const r=b.getBoundingClientRect();return e.clientX>=r.left&&e.clientX<=r.right;});if(button)select(button);};
    listen(tabs,'pointerdown',e=>{if(e.button!==0||scope.dataset.variant==='apple')return;drag=e.pointerId;tabs.setPointerCapture(drag);tabs.dataset.held='true';lensSpring.set(1.045,1.07);dragSelect(e);});
    listen(tabs,'pointermove',e=>{if(drag===e.pointerId)dragSelect(e);});
    const endDrag=()=>{drag=null;delete tabs.dataset.held;lensSpring.set(1,1);};
    for(const event of ['pointerup','pointercancel','lostpointercapture'])listen(tabs,event,endDrag);
    const update=()=>select(buttons.find(b=>b.getAttribute('aria-selected')==='true')||buttons[0]);cleanup.push(update);update();
  }
  for(const toolbar of scope.querySelectorAll('.icon-toolbar.andm-glass'))makeFace(toolbar);
  for(const menu of scope.querySelectorAll('.andm-glass-menu')) {
    const trigger=menu.querySelector('.andm-glass-menu__trigger'),list=menu.querySelector('[role="menu"]'),items=[...list.querySelectorAll('[role="menuitem"]')];
    const bubble=menu.querySelector('.andm-glass-menu__bubble');makeFace(bubble);
    let shape={x:0,v:0},target=0;
    const morph=dt=>{
      shape=quiet()?{x:target,v:0}:springStep(shape,target,dt,240,29);
      const t=Math.max(0,Math.min(1,shape.x)),width=Math.min(260,menu.clientWidth);
      bubble.style.width=`${52+(width-52)*t}px`;bubble.style.height=`${52+174*t}px`;
      list.style.clipPath=`inset(0 0 ${Math.max(0,174*(1-t))}px 0 round 14px)`;
      list.style.opacity=String(Math.min(1,t*3));
      return shape.x!==target;
    };
    function toggle(open,focusIndex=null,restore=false) {
      menu.dataset.open=String(open);trigger.setAttribute('aria-expanded',String(open));list.hidden=!open;
      target=open?1:0;schedule(morph);
      if(open&&focusIndex!==null)items[focusIndex]?.focus({preventScroll:true});else if(!open&&restore)trigger.focus();
    }
    // Pointer activation keeps focus on the trigger so a second tap reliably toggles.
    listen(trigger,'click',()=>toggle(menu.dataset.open!=='true',null,true));
    listen(trigger,'keydown',e=>{if(['ArrowDown','ArrowUp'].includes(e.key)){e.preventDefault();toggle(true,e.key==='ArrowUp'?items.length-1:0);}if(e.key==='Escape'){e.preventDefault();toggle(false,0,true);}});
    listen(list,'keydown',e=>{let n,i=items.indexOf(document.activeElement);if(e.key==='ArrowDown')n=(i+1)%items.length;if(e.key==='ArrowUp')n=(i+items.length-1)%items.length;if(e.key==='Home')n=0;if(e.key==='End')n=items.length-1;if(n!==undefined){e.preventDefault();items[n].focus();}if(e.key==='Escape'){e.preventDefault();toggle(false,0,true);}});
    for(const item of items)listen(item,'click',()=>{onAction(item.dataset.action,item);items.forEach(el=>el.removeAttribute('data-chosen'));item.dataset.chosen='true';});
    listen(document,'pointerdown',e=>{if(!menu.contains(e.target))toggle(false);});
    listen(menu,'focusout',()=>queueMicrotask(()=>{if(alive&&!menu.contains(document.activeElement)&&document.activeElement!==trigger)toggle(false);}));
  }
  const observer=new ResizeObserver(()=>{for(const update of cleanup)update();schedule();});observer.observe(scope);if(background)observer.observe(background.element);
  listen(window,'resize',()=>schedule());listen(window,'scroll',()=>schedule(),{passive:true});
  const preference=()=>{if(quiet())for(const spring of springs)spring.reset();schedule();};
  listen(motion,'change',preference);listen(transparency,'change',preference);
  const mutations=new MutationObserver(preference);mutations.observe(scope,{attributes:true,attributeFilter:['data-motion','data-transparency','data-optics']});
  schedule();
  return {refresh(){for(const update of cleanup)update();schedule();},destroy(){delete scope.dataset.enhanced;alive=false;abort.abort();observer.disconnect();mutations.disconnect();cancelAnimationFrame(raf);jobs.clear();for(const item of faces)item.face.remove();for(const lens of scope.querySelectorAll('.andm-glass-tabs__lens'))lens.remove();svg.remove();mapCache.clear();}};
}
