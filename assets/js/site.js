(()=>{
  document.querySelectorAll('[data-year]').forEach(el=>{el.textContent=new Date().getFullYear();});

  const imageFixes={
    '20250415_143732.webp':{file:'20250313_171410.webp',alt:'MGD skid loader equipment for asphalt and concrete removal projects'},
    '20250410_153946.webp':{file:'site-grading-before.webp',alt:'MGD building site preparation work'},
    '20250404_134326.webp':{file:'20250313_171410.webp',alt:'MGD skid loader equipment used for attachment-based hole drilling work'}
  };
  document.querySelectorAll('img').forEach(img=>{
    const match=Object.entries(imageFixes).find(([name])=>img.src.endsWith('/'+name));
    if(!match)return;
    const [name,fix]=match;
    img.src=img.src.slice(0,-name.length)+fix.file;
    img.alt=fix.alt;
  });

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