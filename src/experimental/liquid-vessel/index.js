import {liquidPaths,stepLiquid} from './model.js';
/** Optional independent effect. Native controls/real playback belong to the app.
 * Animate only SVG liquid paths; leave glass geometry, hit targets and labels fixed. */
export function enhanceLiquidVessel(host, {background = null} = {}) {
  const front=host.querySelector('[data-liquid-front]'),back=host.querySelector('[data-liquid-back]'),line=host.querySelector('[data-liquid-line]');
  if(!front||!back||!line)throw new Error('Liquid vessel requires its decorative SVG paths.');
  const image=host.querySelector('[data-liquid-image]'),clip=host.querySelector('[data-liquid-clip]'),shadow=host.querySelector('[data-liquid-shadow]');
  const media=matchMedia('(prefers-reduced-motion: reduce)'),colours=matchMedia('(forced-colors: active)'),abort=new AbortController();
  let state={phase:0,amplitude:0},playing=false,fill=42,reduced=false,visible=true,raf=0,last=0,alive=true;
  const quiet=()=>media.matches||colours.matches||reduced;
  function paint(){const paths=liquidPaths(state.phase,quiet()?0:state.amplitude,fill);front.setAttribute('d',paths.front.body);back.setAttribute('d',paths.back.body);line.setAttribute('d',paths.front.surface);clip?.setAttribute('d',paths.front.body);shadow?.setAttribute('d',paths.front.surface);}
  // Register only supplied image backgrounds. No capture/readback of arbitrary DOM.
  function syncBackground(){
    if(!image)return;
    const url=background?.image;
    if(!url){image.removeAttribute('href');host.dataset.waterBackground='html';return;}
    const scene=background.element.getBoundingClientRect(),r=host.querySelector('.andm-vessel__liquid').getBoundingClientRect();
    if(r.width<1||r.height<1)return;
    image.setAttribute('href',url);image.setAttribute('x',(scene.left-r.left)*400/r.width);image.setAttribute('y',(scene.top-r.top)*100/r.height);
    image.setAttribute('width',scene.width*400/r.width);image.setAttribute('height',scene.height*100/r.height);
    host.dataset.waterBackground='image';
  }
  function stop(){cancelAnimationFrame(raf);raf=0;last=0;}
  function frame(now){raf=0;const dt=last?(now-last)/1000:1/60;last=now;state=stepLiquid(state,playing,dt);paint();if(playing||state.amplitude>0)request();else last=0;}
  function request(){if(alive&&visible&&!document.hidden&&!quiet()&&!raf)raf=requestAnimationFrame(frame);}
  function reconcile(){stop();if(quiet())state.amplitude=0;paint();if(playing||state.amplitude>0)request();}
  media.addEventListener('change',reconcile,{signal:abort.signal});
  colours.addEventListener('change',reconcile,{signal:abort.signal});
  document.addEventListener('visibilitychange',reconcile,{signal:abort.signal});
  const observer=typeof IntersectionObserver==='function'?new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;reconcile();},{threshold:0}):null;
  observer?.observe(host);
  const resize=typeof ResizeObserver==='function'?new ResizeObserver(syncBackground):null;
  resize?.observe(host);if(background?.element)resize?.observe(background.element);
  window.addEventListener('resize',syncBackground,{signal:abort.signal});
  syncBackground();paint();
  return {
    refresh(){if(alive)syncBackground();},
    setPlaying(value){if(!alive)return;playing=Boolean(value);host.dataset.playing=String(playing);reconcile();},
    setLevel(value){if(!alive)return;fill=Math.max(20,Math.min(65,Number(value)||42));paint();},
    setReducedMotion(value){if(!alive)return;reduced=Boolean(value);reconcile();},
    impulse(){if(alive&&playing&&!quiet()){state.amplitude=Math.min(4,state.amplitude+1.2);request();}},
    destroy(){alive=false;stop();abort.abort();observer?.disconnect();resize?.disconnect();image?.removeAttribute('href');delete host.dataset.waterBackground;state.amplitude=0;paint();delete host.dataset.playing;}
  };
}
