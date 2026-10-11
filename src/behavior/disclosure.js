/** Expandable action composition. Ordinary buttons and Tab order, not ARIA menu. */
export function disclosure(root) {
  const trigger=root.querySelector('[data-disclosure-trigger]');
  const content=root.querySelector('[data-disclosure-content]');
  if(!trigger || !content || !content.id) throw new Error('Disclosure needs trigger and identified content');
  const abort=new AbortController(),options={signal:abort.signal};
  let expanded=false;
  function set(next,{focus=false}={}) {
    expanded=next;root.dataset.andmOpen=String(next);
    trigger.setAttribute('aria-expanded',String(next));
    trigger.setAttribute('aria-label',next?trigger.dataset.closeLabel:trigger.dataset.openLabel);
    content.inert=!next;content.setAttribute('aria-hidden',String(!next));
    if(focus)trigger.focus();
  }
  trigger.setAttribute('aria-controls',content.id);set(false);
  trigger.addEventListener('click',()=>set(!expanded),options);
  root.addEventListener('keydown',e=>{if(e.key==='Escape'&&expanded){e.preventDefault();set(false,{focus:true});}},options);
  root.ownerDocument.addEventListener('click',e=>{if(expanded&&!root.contains(e.target))set(false);},options);
  content.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>set(false,{focus:true}),options));
  return {close:()=>set(false,{focus:true}),destroy:()=>{abort.abort();set(false);}};
}
