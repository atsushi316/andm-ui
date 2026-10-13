import {rms,waterStep} from './model.js';
export async function mountWaterPlayer(root){
 const canvas=root.querySelector('canvas'),audio=root.querySelector('audio'),button=root.querySelector('[data-water-play]'),status=root.querySelector('[data-water-status]'),level=root.querySelector('[data-water-level]'),quietInput=root.querySelector('[data-water-quiet]');
 const gl=canvas.getContext('webgl',{alpha:false,antialias:false,depth:false,stencil:false});
 if(!gl){status.textContent='この環境ではWebGL描画を利用できません。';button.disabled=true;return {destroy(){}};}
 const source=await (await fetch(new URL('./fragment.glsl',import.meta.url))).text();
 const shader=(type,text)=>{const s=gl.createShader(type);gl.shaderSource(s,text);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){const message=gl.getShaderInfoLog(s);gl.deleteShader(s);throw new Error(message);}return s;};
 let vs,fs,program;
 try{vs=shader(gl.VERTEX_SHADER,'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}');fs=shader(gl.FRAGMENT_SHADER,source);program=gl.createProgram();gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(program));}
 catch(error){status.textContent='描画の初期化に失敗しました。';button.disabled=true;console.warn('Water player shader',error);return {destroy(){if(vs)gl.deleteShader(vs);if(fs)gl.deleteShader(fs);if(program)gl.deleteProgram(program);}};}
 gl.useProgram(program);const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);const a=gl.getAttribLocation(program,'p');gl.enableVertexAttribArray(a);gl.vertexAttribPointer(a,2,gl.FLOAT,false,0,0);
 const resolution=gl.getUniformLocation(program,'u_resolution'),wave=gl.getUniformLocation(program,'u_wave'),fill=gl.getUniformLocation(program,'u_fill');
 const abort=new AbortController(),media=matchMedia('(prefers-reduced-motion: reduce)');let raf=0,last=0,alive=true,visible=true,ctx,analyser,node,samples,outsideQuiet=false;
 let state={x1:0,x2:0,v1:0,v2:0,last:0,sign:1};
 const quiet=()=>media.matches||quietInput.checked||outsideQuiet;
 function paint(){gl.uniform2f(resolution,canvas.width,canvas.height);gl.uniform2f(wave,quiet()?0:state.x1,quiet()?0:state.x2);gl.uniform1f(fill,Number(level.value)/100);gl.drawArrays(gl.TRIANGLES,0,6);}
 function resize(){const r=canvas.getBoundingClientRect(),dpr=Math.min(1.5,devicePixelRatio||1);canvas.width=Math.max(1,Math.min(1000,Math.round(r.width*dpr)));canvas.height=Math.max(1,Math.round(r.height*dpr));gl.viewport(0,0,canvas.width,canvas.height);paint();}
 function stopFrames(){cancelAnimationFrame(raf);raf=0;last=0;}
 function frame(now){raf=0;const dt=last?(now-last)/1000:1/60;last=now;let energy=0;if(!audio.paused&&analyser){analyser.getFloatTimeDomainData(samples);energy=Math.min(1,rms(samples)*5);}
 state=waterStep(state,energy,dt);paint();if(!audio.paused||Math.abs(state.x1)+Math.abs(state.x2)+Math.abs(state.v1)+Math.abs(state.v2)>0)schedule();else last=0;}
 function schedule(){if(alive&&visible&&!document.hidden&&!quiet()&&!raf)raf=requestAnimationFrame(frame);}
 function reconcile(){stopFrames();if(quiet())state={x1:0,x2:0,v1:0,v2:0,last:0,sign:1};paint();if(!audio.paused||state.x1||state.x2)schedule();}
 function listen(el,name,fn){el.addEventListener(name,fn,{signal:abort.signal});}
 let busy=false;
 listen(button,'click',async()=>{if(busy)return;busy=true;try{
 if(!audio.paused){audio.pause();return;}
 const AC=window.AudioContext||window.webkitAudioContext;if(!AC)throw new Error('Web Audio unavailable');
 if(!ctx){ctx=new AC();analyser=ctx.createAnalyser();analyser.fftSize=1024;samples=new Float32Array(analyser.fftSize);node=ctx.createMediaElementSource(audio);node.connect(analyser);analyser.connect(ctx.destination);}
 await ctx.resume();await audio.play();
 }catch(error){status.textContent='音声を再生できませんでした。もう一度再生を押してください。';}finally{busy=false;}});
 listen(audio,'play',()=>{button.setAttribute('aria-pressed','true');button.textContent='停止';status.textContent='再生中 · 音の強弱で水が揺れます';schedule();});
 listen(audio,'pause',()=>{button.setAttribute('aria-pressed','false');button.textContent='再生';status.textContent='停止 · 水の揺れが収まります';reconcile();});
 listen(level,'input',()=>{root.querySelector('output').value=level.value+'%';paint();});listen(quietInput,'change',reconcile);listen(media,'change',reconcile);
 listen(document,'visibilitychange',()=>{if(document.hidden)audio.pause();reconcile();});
 listen(canvas,'webglcontextlost',e=>{e.preventDefault();audio.pause();stopFrames();button.disabled=true;status.textContent='描画が中断されました。ページを再読み込みしてください。';});
 const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(canvas);
 const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(!visible)audio.pause();reconcile();});intersection.observe(canvas);resize();
 return {setReducedMotion(value){outsideQuiet=Boolean(value);reconcile();},destroy(){alive=false;audio.pause();stopFrames();abort.abort();resizeObserver.disconnect();intersection.disconnect();node?.disconnect();analyser?.disconnect();ctx?.close();gl.deleteBuffer(buffer);gl.deleteProgram(program);gl.deleteShader(vs);gl.deleteShader(fs);}};
}
