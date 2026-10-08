const $=id=>document.getElementById(id);
const candidates=await fetch('candidates.json').then(response=>{if(!response.ok)throw Error('候補情報を取得できません');return response.json();});
const brief=await fetch('brief.json').then(response=>response.json());
const state={left:{candidate:'minimal',section:'overview',inspector:null},right:{candidate:'brutal',section:'overview',inspector:null}};
const cache={};
const sections=['overview','values','features','relations','usage','limits'];
const media=matchMedia('(min-width:70rem)');
function display() {
 const visible=media.matches && $('two-up').checked;
 $('right-pane').hidden=!visible;
 $('right-choice').disabled=!visible;
 $('two-up').disabled=!media.matches;
 $('previews').dataset.two=String(visible);
 $('display-note').textContent=visible?'2案を比較しています。各画面内でもTabで操作できます。':'左の1案を表示しています。候補を切り替えるか、単独で開いて閲覧できます。';
}
function jump(side,section) {
 const frame=$(side+'-frame');
 frame.contentWindow?.postMessage({type:'orbit-jump',section},location.origin);
}
function renderMetadata(side,key) {
 const meta=candidates[key];
 $(side+'-title').textContent=meta.title;
 $(side+'-frame').title=meta.title+'の紹介画面';
 $(side+'-open').href=key+'.html';
 $(side+'-decision').href='decisions.html#'+meta.decisionId;
 $(side+'-meta').replaceChildren();
 for(const [label,value] of [['思想',meta.philosophy],['構成',meta.composition],['部品方式',meta.mode],['Series',meta.series],['公式仕様からの派生',meta.derivation],['期待とトレードオフ',meta.tradeoff]]) {
  const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=label;dd.textContent=value;$(side+'-meta').append(dt,dd);
 }
}
function change(side,key) {
 if(!candidates[key])return;
 const frame=$(side+'-frame');
 const old=state[side].candidate;
 cache[side+':'+old]=frame.contentWindow?.orbitState?.get();
 const section=state[side].section;
 state[side].candidate=key;state[side].section=section;
 renderMetadata(side,key);
 frame.src=key+'.html';
 const url=new URL(location.href);url.searchParams.set(side,key);history.replaceState(null,'',url);
}
for(const side of ['left','right']) {
 $(side+'-frame').addEventListener('load',()=>{
  const frame=$(side+'-frame');
  frame.contentWindow?.orbitState?.restore(cache[side+':'+state[side].candidate]);
  jump(side,state[side].section);
 });
 $(side+'-choice').addEventListener('change',event=>change(side,event.target.value));
 const key=new URL(location.href).searchParams.get(side);
 if(key && candidates[key]) {$(side+'-choice').value=key;change(side,key);} else renderMetadata(side,state[side].candidate);
}
window.addEventListener('message',event=>{
 if(event.origin!==location.origin || event.data?.type!=='orbit-section' || !sections.includes(event.data.section))return;
 for(const side of ['left','right']) if(event.source===$(side+'-frame').contentWindow && event.data.candidate===state[side].candidate) {
  state[side].section=event.data.section;
  $('section-choice').value=event.data.section;
 }
});
$('jump').addEventListener('click',()=>{
 for(const side of ['left','right']) {state[side].section=$('section-choice').value;jump(side,state[side].section);}
});
$('two-up').addEventListener('change',display);media.addEventListener('change',display);display();
$('export').addEventListener('click',()=>{
 const record={schemaVersion:1,briefVersion:brief.version,candidateRevision:brief.revision,createdAt:new Date().toISOString(),world:brief.world,conditions:{width:innerWidth,twoUp:!$('right-pane').hidden,reducedMotion:matchMedia('(prefers-reduced-motion:reduce)').matches},candidates:{left:state.left.candidate,right:state.right.candidate},sections:{left:state.left.section,right:state.right.section},decisionIds:[candidates[state.left.candidate].decisionId,candidates[state.right.candidate].decisionId],inspectorState:$('left-frame').contentWindow?.orbitState?.get(),notes:$('notes').value,recommended:null,adoption:{actor:null,at:null,note:'観察のみ。人間の採用判断は未決'}};
 const url=URL.createObjectURL(new Blob([JSON.stringify(record,null,2)],{type:'application/json'}));
 const a=document.createElement('a');a.href=url;a.download='orbit-note-comparison.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
 $('export-status').textContent='条件と観察メモを書き出しました。採用判断は未決です。';
});
