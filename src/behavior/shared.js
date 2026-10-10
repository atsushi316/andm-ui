export function scope(){const abort=new AbortController();return {on(target,event,handler){target.addEventListener(event,handler,{signal:abort.signal});},destroy(){abort.abort();}};}
export function emit(root,type,detail){root.dispatchEvent(new CustomEvent(type,{detail,bubbles:true}));}
export function status(root,text){const live=root.querySelector('[data-status]');if(live)live.textContent=text;}
export function rove(items,index){items.forEach((e,i)=>e.tabIndex=i===index?0:-1);items[index]?.focus();}
export function text(tag,value){const e=document.createElement(tag);e.textContent=String(value);return e;}
export function focusReturn(dialog,trigger){const life=scope();life.on(trigger,'click',()=>{dialog.showModal();});life.on(dialog,'close',()=>trigger.focus());return life;}
