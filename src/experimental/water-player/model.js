export function rms(samples){let sum=0;for(const x of samples)sum+=x*x;return Math.sqrt(sum/Math.max(1,samples.length));}
export function waterStep(state,energy,dt){
 const d=Math.min(.033,Math.max(0,dt)),rise=Math.max(0,energy-state.last);
 const kick=Math.min(.06,rise*.13);
 let v1=state.v1+kick*(state.sign||1),v2=state.v2+kick*.55;
 v1+=(-22*state.x1-2.8*v1)*d;v2+=(-57*state.x2-4.2*v2)*d;
 let x1=Math.max(-.018,Math.min(.018,state.x1+v1*d)),x2=Math.max(-.009,Math.min(.009,state.x2+v2*d));
 if(energy===0&&Math.abs(x1)+Math.abs(x2)+Math.abs(v1)+Math.abs(v2)<.00008){x1=x2=v1=v2=0;}
 return {x1,x2,v1,v2,last:energy,sign:rise>.02?-(state.sign||1):state.sign||1};
}
