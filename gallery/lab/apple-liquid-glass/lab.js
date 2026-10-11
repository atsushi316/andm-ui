import {enhanceLiquidGlass} from '../../../dist/experimental/apple-liquid-glass/index.js';
const scope=document.querySelector('#trial'),scene=document.querySelector('#scene');
const background={element:scene,image:null};
const status=document.querySelector('#action-status');
const controller=enhanceLiquidGlass(scope,{background,onAction(action,button){
  if(action==='favorite'){const button=scope.querySelector('[data-action="favorite"]'),pressed=button.getAttribute('aria-pressed')!=='true';button.setAttribute('aria-pressed',String(pressed));button.querySelector('.andm-glass__label').textContent=pressed?'お気に入り済み':'お気に入り';status.textContent=pressed?'お気に入りに追加しました（この画面だけ）。':'お気に入りを解除しました。';}
  if(action==='save')status.textContent='保存操作を試しました。外部には保存していません。';
  if(action==='copy')status.textContent='この実験のURLはブラウザのアドレス欄から確認できます。';
  if(action==='details')status.textContent='写真はJason Leung / Unsplash。文字と明るい画面はHTMLです。';
  if(action==='heart'||action==='play') {
    const pressed=button.getAttribute('aria-pressed')!=='true';button.setAttribute('aria-pressed',String(pressed));
    if(action==='play') {
      button.setAttribute('aria-label',pressed?'一時停止':'再生');
      button.querySelector('path').setAttribute('d',pressed?'M8 5v14 M16 5v14':'M8 4l12 8-12 8Z');
      status.textContent=pressed?'再生中（操作デモ。音声は流れません）。':'一時停止しました（操作デモ）。';
    } else {button.querySelector('svg').style.fill=pressed?'currentColor':'none';status.textContent=pressed?'お気に入りに追加しました（この画面だけ）。':'お気に入りを解除しました。';}
  }
  if(action==='search'||action==='add')status.textContent=({search:'検索',add:'追加'})[action]+'ボタンを試しました。';
}});
document.querySelector('#optics').disabled=true;scope.dataset.optics='frost';document.querySelector('#optics').value='frost';
document.querySelector('#variant').addEventListener('change',e=>{
  const liquid=e.target.value==='liquid';scope.classList.toggle('andm-series--apple-liquid-glass',liquid);scope.classList.toggle('andm-series--apple',!liquid);scope.dataset.variant=e.target.value;
  document.querySelector('#optics').disabled=!liquid||['text','light','dark'].includes(scene.dataset.background);controller.refresh();
});
function setBackground(name) {
  const live=['text','light','dark'].includes(name),dark=name.startsWith('dark');
  scene.dataset.background=name;scene.dataset.theme=scope.dataset.theme=dark?'dark':'light';
  document.querySelector('#optics').value=live?'frost':'lens';scope.dataset.optics=live?'frost':'lens';
  background.image=({'photo':'photo.jpg','grid':'grid.png','dark-grid':'dark-grid.png'})[name];
  background.image=background.image?new URL(background.image,import.meta.url).href:null;
  document.querySelector('#optics').disabled=live||document.querySelector('#variant').value!=='liquid';controller.refresh();
}
document.querySelector('#background').addEventListener('change',e=>setBackground(e.target.value));
document.querySelector('#optics').addEventListener('change',e=>{scope.dataset.optics=e.target.value;controller.refresh();});
for(const [id,key]of [['reduce-motion','motion'],['reduce-transparency','transparency']])document.getElementById(id).addEventListener('change',e=>{scope.dataset[key]=e.target.checked?'reduced':'normal';controller.refresh();});
window.addEventListener('pagehide',event=>{if(!event.persisted)controller.destroy();});

const backdrop=document.createElement('div');backdrop.className='live-backdrop';backdrop.setAttribute('aria-hidden','true');
backdrop.innerHTML='<div class="text-backdrop">'+Array.from({length:120},(_,i)=>'<p>Design is how it feels.　触れる、光が曲がる。　'+String(i+1).padStart(2,'0')+'</p>').join('')+'</div><div class="light-backdrop"><h2>Today</h2><p>あなたの一日を、少し軽く。</p><div class="mock-card">09:41　新しいアイデア</div><div class="mock-card">12:30　デザインを考える</div><div class="mock-card">15:00　散歩に出かける</div></div>';
// Repeat real content all the way to the bottom; the absolute layer adds no layout height.
backdrop.querySelector('.light-backdrop').insertAdjacentHTML('beforeend',Array.from({length:40},(_,i)=>'<div class="mock-card">'+String(i+1).padStart(2,'0')+'　今日のアイデアと予定</div>').join(''));
const dark=document.createElement('div');dark.className='dark-backdrop';dark.innerHTML=Array.from({length:120},(_,i)=>'<p>Night mode　光と輪郭を確かめる　'+(i+1)+'</p>').join('');backdrop.append(dark);
scene.prepend(backdrop);setBackground('text');

// rAF interval sampling only: no claim about GPU completion, power or benchmark FPS.
const measure=document.querySelector('#measure'),result=document.querySelector('#measure-result');
let measuring=0,frameId=0,lastFrame=0,intervals=[];
function stopMeasurement(message) {cancelAnimationFrame(frameId);measuring=0;measure.disabled=false;if(message)result.textContent=message;}
measure.addEventListener('click',()=>{
  if(measuring)return;measuring=performance.now()+5000;lastFrame=0;intervals=[];measure.disabled=true;
  result.textContent='測定中：スライダーや展開メニューを操作してください。';
  const sample=now=>{
    if(lastFrame)intervals.push(now-lastFrame);lastFrame=now;
    if(now<measuring){frameId=requestAnimationFrame(sample);return;}
    const sorted=intervals.slice().sort((a,b)=>a-b),median=sorted[Math.floor(sorted.length/2)]||0,p95=sorted[Math.floor(sorted.length*.95)]||0;
    stopMeasurement('画面更新間隔：中央値 '+median.toFixed(1)+'ms、95%点 '+p95.toFixed(1)+'ms（'+sorted.length+'回）。同じ端末・操作で背景や質感を切り替えて比較してください。');
  };frameId=requestAnimationFrame(sample);
});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&measuring)stopMeasurement('画面が非表示になったため測定を中止しました。');});
window.addEventListener('pagehide',()=>stopMeasurement());
