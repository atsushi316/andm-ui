// One shared fixture and clock: every visible candidate receives the same snapshot.
export const signal=Object.freeze([0,.12,.44,-.32,-.7,.26,.63,-.2,0,.08,.5,-.6,.32,.74,-.45,-.16,0,0,.18,-.3,.52,-.42,.14,0]);
export function experiment(initialCategory='loading') {
 let state={category:initialCategory,phase:'idle',value:0,tick:0,paused:false};
 const reset=category=>{state={category,phase:'idle',value:0,tick:0,paused:false};};
 return {
  snapshot(){const {category,phase,value,tick,paused}=state;const amplitude=category==='input'&&phase!=='idle'?signal[Math.min(tick,signal.length-1)]:0;return {category,phase,value,tick,paused,amplitude,history:category==='input'&&phase!=='idle'?signal.slice(0,tick+1):[]};},
  category(category){if(!['loading','progress','input','result'].includes(category))throw Error('Unknown category');reset(category);},
  start(){reset(state.category);state.phase='running';},
  pause(){if(state.phase==='running')state.paused=!state.paused;},
  finish(phase){if(!['complete','error'].includes(phase))throw Error('Unknown result');state.phase=phase;state.paused=false;if(phase==='complete'&&state.category==='progress')state.value=100;},
  reset(){reset(state.category);},
  advance(){if(state.phase!=='running'||state.paused)return false;if(state.category==='progress'){state.tick++;state.value=Math.min(100,state.value+5);if(state.value===100)state.phase='complete';}else if(state.category==='input'){state.tick=Math.min(signal.length-1,state.tick+1);if(state.tick===signal.length-1)state.phase='complete';}return state.phase==='complete';}
 };
}
