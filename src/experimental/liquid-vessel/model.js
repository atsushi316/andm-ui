// Independent decorative approximation; no physical fluid solver or audio input.
export function liquidPaths(phase, amplitude, fill = 42) {
  const level=100-Math.max(20,Math.min(65,Number.isFinite(fill)?fill:42));
  const wave=(offset,gain)=>{
    const points=[];
    for(let i=0;i<=40;i++){
      const x=i*10,u=x/400;
      const y=level+gain*amplitude*(Math.sin(u*Math.PI*2.6-phase+offset)*.68+Math.sin(u*Math.PI*4.2+phase*.73+offset)*.32);
      points.push(`${i?'L':'M'}${x},${y.toFixed(2)}`);
    }
    const surface=points.join(' ');
    return {surface,body:`${surface} L400,100 L0,100 Z`};
  };
  return {front:wave(0,1),back:wave(1.9,.7)};
}
export function stepLiquid(state, playing, dt) {
  const elapsed=Math.min(.05,Math.max(0,dt));
  const phase=state.phase+elapsed*1.05;
  const target=playing?1.7+Math.sin(phase*.8)*.45:0;
  let amplitude=state.amplitude+(target-state.amplitude)*(1-Math.exp(-elapsed*(playing?2.8:1.9)));
  if(!playing&&amplitude<.025)amplitude=0;
  return {phase,amplitude};
}
