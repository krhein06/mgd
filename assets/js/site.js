(()=>{
  document.querySelectorAll('[data-year]').forEach(el=>{el.textContent=new Date().getFullYear();});
  const button=document.querySelector('.mobile-toggle');
  const nav=document.querySelector('.navlinks');
  if(!button||!nav)return;
  const setOpen=(open)=>{
    nav.classList.toggle('open',open);
    button.setAttribute('aria-expanded',String(open));
    button.setAttribute('aria-label',open?'Close navigation menu':'Open navigation menu');
    button.textContent=open?'×':'☰';
    document.body.classList.toggle('menu-open',open);
  };
  button.addEventListener('click',()=>setOpen(!nav.classList.contains('open')));
  nav.addEventListener('click',event=>{if(event.target.closest('a'))setOpen(false);});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('open')){setOpen(false);button.focus();}});
  window.matchMedia('(min-width: 801px)').addEventListener?.('change',event=>{if(event.matches)setOpen(false);});
})();