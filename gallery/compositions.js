/* Gallery-only examples: applications own data, persistence and routes. */
(function () {
  'use strict';
  const records = [
    {name:'宇宙の観測ノート',kind:'research',date:3},
    {name:'ロボットの操作画面',kind:'prototype',date:2},
    {name:'空間UIの研究',kind:'research',date:1}
  ];
  const render = (target, rows) => {
    target.replaceChildren(...rows.map(row => {
      const li=document.createElement('li'); li.className='andm-resource-item';
      const a=document.createElement('a'); a.className='andm-link'; a.href='#/display/resource-item'; a.textContent=row.name;
      li.append(a); return li;
    }));
  };
  const search=document.querySelector('[data-compose-search]');
  const searchSection=search.closest('[data-part]');
  const searchUpdate=()=>{
    const q=search.elements.q.value.trim().normalize('NFKC').toLocaleLowerCase('ja');
    const rows=records.filter(r=>r.name.normalize('NFKC').toLocaleLowerCase('ja').includes(q));
    render(searchSection.querySelector('[data-search-results]'),rows);
    searchSection.querySelector('[data-search-empty]').hidden=rows.length>0;
    searchSection.querySelector('[data-search-status]').textContent=`${rows.length}件の作品${q ? '（キーワード：'+search.elements.q.value.trim()+'）':''}`;
  };
  search.addEventListener('submit',e=>{e.preventDefault();searchUpdate();});
  searchSection.querySelectorAll('[data-search-clear]').forEach(b=>b.addEventListener('click',()=>{search.reset();searchUpdate();search.elements.q.focus();}));
  searchUpdate();
  const filter=document.querySelector('[data-compose-filter]'),filterSection=filter.closest('[data-part]');
  const filterUpdate=()=>{
    const select=filter.querySelector('select'); const rows=records.filter(r=>select.value==='all'||r.kind===select.value);
    render(filterSection.querySelector('[data-filter-results]'),rows);
    filterSection.querySelector('[data-filter-status]').textContent=select.selectedOptions[0].textContent+'：'+rows.length+'件';
  };
  filter.addEventListener('submit',e=>{e.preventDefault();filterUpdate();});
  filter.addEventListener('reset',()=>setTimeout(filterUpdate,0));filterUpdate();
  const sort=document.querySelector('[data-compose-sort]');
  const sortUpdate=()=>render(document.querySelector('[data-sort-results]'),[...records].sort(sort.value==='name'?(a,b)=>a.name.localeCompare(b.name,'ja'):(a,b)=>b.date-a.date));
  sort.addEventListener('change',sortUpdate);sortUpdate();
  const validate=document.querySelector('[data-compose-validate]');
  validate.addEventListener('submit',e=>{
    e.preventDefault(); const input=validate.querySelector('input'),bad=!input.validity.valid;
    input.setAttribute('aria-invalid',String(bad));validate.querySelector('.andm-error').hidden=!bad;
    validate.querySelector('[data-validation-status]').textContent=bad?'入力内容を確認してください':'入力内容を確認しました';
    if(bad)input.focus();
  });
  const save=document.querySelector('[data-compose-save]');
  save.addEventListener('submit',e=>{
    e.preventDefault();const b=save.querySelector('[data-save-button]'),status=save.querySelector('[data-save-status]');
    if(b.disabled)return;b.disabled=true;save.setAttribute('aria-busy','true');b.textContent='保存中';status.textContent='保存を試しています';
    setTimeout(()=>{b.disabled=false;b.textContent='保存';save.setAttribute('aria-busy','false');status.textContent='保存の動作例が完了しました（実際の保存は行っていません）';},800);
  });
  save.addEventListener('reset',()=>{save.querySelector('[data-save-status]').textContent='変更を取り消しました';});
  const disclosures=[...document.querySelectorAll('[data-compose-disclosure]')];
  function close(d,restore=false){const b=d.querySelector('[aria-controls]');b.setAttribute('aria-expanded','false');d.querySelector('#'+b.getAttribute('aria-controls')).hidden=true;if(restore)b.focus();}
  disclosures.forEach(d=>{
    const b=d.querySelector('[aria-controls]'),panel=d.querySelector('#'+b.getAttribute('aria-controls'));
    b.addEventListener('click',()=>{const open=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',String(open));panel.hidden=!open;});
    d.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden){e.preventDefault();close(d,true);}});
    d.addEventListener('focusout',e=>{if(e.relatedTarget&&!d.contains(e.relatedTarget))close(d);});
  });
  document.addEventListener('click',e=>disclosures.forEach(d=>{if(!d.contains(e.target))close(d);}));
  window.addEventListener('hashchange',()=>disclosures.forEach(d=>close(d)));
  document.querySelectorAll('[data-compose-action]').forEach(b=>b.addEventListener('click',()=>{
    b.closest('[data-part]').querySelector('[data-action-status]').textContent=b.dataset.composeAction;
    const d=b.closest('[data-compose-disclosure]');if(d)close(d,true);
  }));
  document.querySelector('[data-resource-favorite]').addEventListener('click',e=>{const b=e.currentTarget,on=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',String(on));b.textContent=on?'お気に入り済み':'お気に入り';});
  document.querySelector('[data-compose-load]').addEventListener('click',e=>{
    const b=e.currentTarget,part=b.closest('[data-part]'),content=part.querySelector('[data-load-content]'),status=part.querySelector('[data-load-status]');
    b.disabled=true;content.setAttribute('aria-busy','true');status.textContent='読み込み中';
    const loading=document.createElement('div');loading.className='andm-loading-state';
    const spinner=document.createElement('span');spinner.className='andm-spinner';spinner.setAttribute('aria-hidden','true');
    const label=document.createElement('span');label.className='andm-text';label.textContent='作品を読み込んでいます';loading.append(spinner,label);content.replaceChildren(loading);
    setTimeout(()=>{render(content,records);content.setAttribute('aria-busy','false');status.textContent='3件の作品を読み込みました';b.disabled=false;},800);
  });
})();
