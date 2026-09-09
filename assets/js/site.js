(()=>{
  document.querySelectorAll('[data-year]').forEach(el=>{el.textContent=new Date().getFullYear();});

  const imageFixes={
    '20250415_143732.webp':{file:'1000009253.webp',alt:'MGD skid loader removing asphalt at a lakeside property'},
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

  document.querySelectorAll('.card').forEach(card=>{
    const title=card.querySelector('h2,h3')?.textContent.trim();
    const img=card.querySelector('img');
    if(!img)return;
    if(title==='Asphalt and Concrete Removal'){
      img.src=img.src.replace(/[^/]+$/,'1000009253.webp');
      img.alt='MGD skid loader removing asphalt at a lakeside property';
    }
    if(title==='Gravel/Dirt Driveway Resurfacing'){
      img.src=img.src.replace(/[^/]+$/,'20241111_170105.webp');
      img.alt='Gravel and dirt driveway resurfaced by MGD Skid Loader Services';
    }
    if(title==='6\"-24\" Hole Drilling' || title==='6\"–24\" Hole Drilling'){
      img.src=img.src.replace(/[^/]+$/,'20260811_121255.webp');
      img.alt='MGD skid loader auger drilling a hole for a post project';
    }
  });

  if(location.pathname.includes('/services/asphalt-concrete-removal/')){
    const primary=document.querySelector('.service-detail > img');
    if(primary && !document.querySelector('[data-asphalt-gallery]')){
      const gallery=document.createElement('div');
      gallery.dataset.asphaltGallery='true';
      gallery.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:12px;align-self:stretch';
      primary.replaceWith(gallery);
      primary.loading='lazy';
      primary.decoding='async';
      primary.style.cssText='width:100%;height:100%;min-height:320px;object-fit:cover;border-radius:22px;box-shadow:var(--shadow)';
      const after=document.createElement('img');
      after.src=primary.src.replace('1000009253.webp','1000009257.webp');
      after.alt='Cleared and graded lakeside area after asphalt removal by MGD Skid Loader Services';
      after.loading='lazy';
      after.decoding='async';
      after.style.cssText=primary.style.cssText;
      gallery.append(primary,after);
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