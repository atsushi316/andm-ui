import {tabs} from '../../dist/behavior/index.js';
tabs(document.querySelector('#tabs'));
let count=0;
document.querySelector('#count').addEventListener('click',()=>document.querySelector('#result').textContent=`${++count}回操作しました`);
document.querySelectorAll('button.andm-chip:not(:disabled)').forEach(button=>button.addEventListener('click',()=>button.setAttribute('aria-pressed',String(button.getAttribute('aria-pressed')!=='true'))));
const open=document.querySelector('#open'),dialog=document.querySelector('#dialog');
open.addEventListener('click',()=>dialog.showModal());
dialog.addEventListener('close',()=>{open.focus();if(dialog.returnValue==='created')document.querySelector('#result').textContent='プロジェクトを作成しました（見本）';dialog.returnValue='';});
document.querySelector('#theme').addEventListener('click',event=>{const dark=document.body.classList.toggle('dark');event.currentTarget.setAttribute('aria-pressed',String(dark));event.currentTarget.textContent=dark?'ライト表示':'ダーク表示';});
