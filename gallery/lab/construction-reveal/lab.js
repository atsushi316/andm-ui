import {createConstructionReveal} from './reveal.js';
const $=id=>document.getElementById(id),deck=$('specimens'),cards=[...deck.querySelectorAll('[data-reveal-card]')],effects=cards.map(createConstructionReveal);
const reduced=matchMedia('(prefers-reduced-motion: reduce)');let generation=0,completed=18,period='week',running=false,seconds=300,startedAt=0,remainingAtStart=300,ticker=null;
const announce=text=>$('widget-status').textContent=text;
function finish(){generation++;effects.forEach(e=>e.finish('user'));$('reveal-status').textContent='完成形を表示しています。';}
async function play(){const current=++generation;const disabled=$('disable-motion').checked||reduced.matches;
 $('reveal-status').textContent=disabled?'動きを省いて完成形を表示しています。':'輪郭を描いて、見本を表示しています。';
 await Promise.all(effects.map((e,i)=>e.play({style:$('reveal-style').value,duration:Number($('reveal-speed').value),delay:i*100,disabled})));
 if(current===generation)$('reveal-status').textContent=disabled?'動きを省いて完成形を表示しています。':'表示完了。カードを操作できます。';
}
window.ANDM_CONSTRUCTION_LAB={play,finish};
window.ANDM_SERIES_COPY.order.forEach(id=>{const o=document.createElement('option');o.value=id;o.textContent=window.ANDM_SERIES_COPY.labels[id];$('reveal-series').append(o);});
$('reveal-series').addEventListener('change',()=>{finish();deck.className='cr-deck'+($('reveal-series').value==='baseline'?'':' andm-series--'+$('reveal-series').value);});
$('replay').addEventListener('click',play);$('skip').addEventListener('click',finish);
['reveal-style','reveal-speed'].forEach(id=>$(id).addEventListener('change',play));
$('disable-motion').addEventListener('change',()=>{if($('disable-motion').checked)finish();});reduced.addEventListener('change',()=>{if(reduced.matches)finish();});
$('complete-task').addEventListener('click',()=>{completed=Math.min(25,completed+1);$('project-value').textContent=String(completed*4);$('done-count').textContent=completed+'件';$('remaining-count').textContent=(25-completed)+'件';$('complete-task').disabled=completed===25;announce(completed===25?'模擬タスクがすべて完了しました。':'模擬タスクを1件完了にしました。');});
const datasets={week:{values:[3,4,5,2,4,4,2],labels:['月','火','水','木','金','土','日'],total:24,breakdown:[6,12,6]},month:{values:[4,7,5,8,6,3,6],labels:['1','5','10','15','20','25','30'],total:39,breakdown:[10,19,10]}};
function bars(){const data=datasets[period];$('activity-total').textContent=data.total;$('period-label').textContent=period==='week'?'月〜日':'1〜30日';$('activity-breakdown').textContent=`考える ${data.breakdown[0]}時間 / つくる ${data.breakdown[1]}時間 / 確かめる ${data.breakdown[2]}時間`;
 $('activity-bars').replaceChildren();data.values.forEach((v,i)=>{const column=document.createElement('div');column.className='cr-bar';column.setAttribute('aria-hidden','true');const stack=document.createElement('div');stack.className='cr-bar-stack';stack.style.height=(v*13)+'px';['cr-review','cr-build','cr-plan'].forEach((cls,j)=>{const piece=document.createElement('i');piece.className=cls;piece.style.flex=[1,2,1][j];stack.append(piece);});const label=document.createElement('label');label.textContent=data.labels[i];column.append(stack,label);$('activity-bars').append(column);});$('activity-bars').setAttribute('aria-label',`模擬データ：${period==='week'?'今週':'今月'}の作業時間、合計${data.total}時間。各区間は${data.values.join('、')}時間。`);
 document.querySelectorAll('[data-period]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.period===period)));
}
bars();document.querySelectorAll('[data-period]').forEach(b=>b.addEventListener('click',()=>{period=b.dataset.period;bars();announce((period==='week'?'今週':'今月')+'の模擬データを表示しました。');}));
function renderTimer(){const left=running?Math.max(0,remainingAtStart-Math.floor((Date.now()-startedAt)/1000)):seconds;seconds=left;$('timer-display').textContent=String(Math.floor(left/60)).padStart(2,'0')+':'+String(left%60).padStart(2,'0');$('focus-progress').value=300-left;if(left===0&&running){running=false;clearInterval(ticker);ticker=null;$('timer-toggle').textContent='もう一度開始';$('timer-toggle').setAttribute('aria-pressed','false');announce('5分の集中セッションが終わりました。');}}
$('timer-toggle').addEventListener('click',()=>{if(running){renderTimer();running=false;clearInterval(ticker);ticker=null;}else{if(seconds===0)seconds=300;remainingAtStart=seconds;startedAt=Date.now();running=true;ticker=setInterval(renderTimer,250);}renderTimer();$('timer-toggle').textContent=running?'一時停止':'開始';$('timer-toggle').setAttribute('aria-pressed',String(running));announce(running?'集中タイマーを開始しました。':'集中タイマーを一時停止しました。');});
$('timer-reset').addEventListener('click',()=>{running=false;clearInterval(ticker);ticker=null;seconds=300;renderTimer();$('timer-toggle').textContent='開始';$('timer-toggle').setAttribute('aria-pressed','false');announce('集中タイマーをリセットしました。');});
// Show once; no repeating background animation and no fabricated network progress.
document.fonts.ready.then(()=>{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)play();});
window.addEventListener('pagehide',()=>{effects.forEach(e=>e.destroy());clearInterval(ticker);});
