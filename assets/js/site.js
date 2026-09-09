(()=>{
  document.querySelectorAll('[data-year]').forEach(el=>{el.textContent=new Date().getFullYear();});

  const imageFixes={
    '20250415_143732.webp':{file:'1000009253.webp',alt:'MGD skid loader removing asphalt at a lakeside property'},
    '20250313_171410.webp':{file:'1000009253.webp',alt:'MGD skid loader removing asphalt at a lakeside property'},
    'skid-loader-driveway-prep.webp':{file:'20241111_170105.webp',alt:'Gravel and dirt driveway resurfaced by MGD Skid Loader Services'},
    '20250410_153946.webp':{file:'site-grading-before.webp',alt:'MGD building site preparation work'},
    '20250404_134326.webp':{file:'20260811_121255.webp',alt:'MGD skid loader auger drilling a hole for a post project'},
    '20250410_141942.webp':{file:'20260811_121255.webp',alt:'MGD skid loader auger drilling a hole for a post project'}
  };
  document.querySelectorAll('img').forEach(img=>{
    const match=Object.entries(imageFixes).find(([name])=>img.src.endsWith('/'+name));
    if(!match)return;
    const [name,fix]=match;
    img.src=img.src.slice(0,-name.length)+fix.file;
    img.alt=fix.alt;
  });

  if(location.pathname.includes('/services/asphalt-concrete-removal/')){
    const primary=document.querySelector('.service-detail > img');
    if(primary && !document.querySelector('[data-asphalt-after]')){
      const second=document.createElement('img');
      second.src=primary.src.replace('1000009253.webp','1000009257.webp');
      second.alt='Cleared and graded lakeside area after asphalt removal by MGD Skid Loader Services';
      second.loading='lazy';
      second.decoding='async';
      second.dataset.asphaltAfter='true';
      primary.insertAdjacentElement('afterend',second);
      primary.parentElement.classList.add('service-detail-gallery');
    }
  }

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