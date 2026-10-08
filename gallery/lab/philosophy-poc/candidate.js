// Reference controller for a Lab-only relation inspector. No Research imports.
const root = document.body;
const nodes = [...document.querySelectorAll('[data-node]')];
let selected = 'save';
let view = 'map';
const relationships = {save:['connect'],connect:['history','list'],history:['list'],list:['save']};
const descriptions = Object.fromEntries(['save','connect','history','list'].map(id => [id, {
 title:document.querySelector(`[data-content="feature-${id}-title"]`)?.textContent,
 body:document.querySelector(`[data-content="feature-${id}"]`)?.textContent,
}]));
function notify(section) {
 if(window.parent !== window) window.parent.postMessage({type:'orbit-section',candidate:root.dataset.candidate,section},location.origin);
}
function choose(id) {
 if(!descriptions[id] || !nodes.length) return;
 selected = id;
 nodes.forEach(node => node.setAttribute('aria-pressed',String(node.dataset.node===id)));
 const panel=document.getElementById('node-detail');
 panel.querySelector('h3').textContent=descriptions[id].title;
 panel.querySelector('p').textContent=descriptions[id].body;
 panel.querySelector('.connection').textContent='次につながる機能：'+relationships[id].map(x=>descriptions[x].title).join('・');
}
function setView(value) {
 if(!['map','linear'].includes(value)) return;
 view=value;
 const inspector=document.querySelector('.inspector');
 if(inspector) inspector.dataset.view=value;
 document.querySelectorAll('button[data-view]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.view===value)));
}
nodes.forEach(node=>node.addEventListener('click',()=>choose(node.dataset.node)));
document.querySelectorAll('button[data-view]').forEach(button=>button.addEventListener('click',()=>setView(button.dataset.view)));
// Explicit state interface used only by the same-origin comparison page.
window.orbitState = {get:()=>({selected,view}),restore:state=>{if(state){choose(state.selected);setView(state.view);}}};
window.addEventListener('message',event=>{
 if(event.origin!==location.origin || event.source!==window.parent || event.data?.type!=='orbit-jump') return;
 const section=document.querySelector(`[data-section="${CSS.escape(String(event.data.section))}"]`);
 if(section) section.scrollIntoView({block:'start'});
});
const sections=[...document.querySelectorAll('[data-section]')];
let ticking=false;
window.addEventListener('scroll',()=>{
 if(ticking)return;ticking=true;
 requestAnimationFrame(()=>{
  ticking=false;
  let current=sections[0];
  for(const section of sections) if(section.getBoundingClientRect().top<=innerHeight*.35) current=section;
  if(current) notify(current.dataset.section);
 });
},{passive:true});
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>{
 const target=document.getElementById(a.hash.slice(1));
 if(target) {target.focus({preventScroll:true});notify(target.dataset.section);}
}));
