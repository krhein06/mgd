(()=>{
  document.querySelectorAll('[data-year]').forEach(el=>{el.textContent=new Date().getFullYear();});

  const depth=location.pathname.split('/').filter(Boolean).length;
  const asset=(path)=>`${'../'.repeat(depth)}assets/${path}`;

  const style=document.createElement('style');
  style.textContent=`
    .before-after-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;align-self:stretch}
    .before-after-item{position:relative;min-width:0}
    .before-after-item img{width:100%;height:100%;min-height:320px;object-fit:cover;border-radius:22px;box-shadow:var(--shadow)}
    .before-after-label{position:absolute;left:14px;top:14px;z-index:2;background:rgba(7,27,77,.9);color:#fff;border:1px solid rgba(255,255,255,.4);border-radius:999px;padding:6px 12px;font-size:.8rem;font-weight:950;letter-spacing:.08em;text-transform:uppercase}
    .service-media{align-self:stretch}
    .service-media video{width:100%;height:100%;min-height:320px;max-height:590px;object-fit:cover;border-radius:22px;box-shadow:var(--shadow);background:#071b4d}
    .excavating-showcase{margin-top:26px;padding:24px;border-radius:22px;background:#fff;color:var(--ink);box-shadow:var(--shadow-soft)}
    .excavating-showcase h3{color:var(--blue-dark);font-size:1.5rem;margin-bottom:14px}
    .review-form-card{margin-top:36px;padding:28px;border-radius:24px;background:linear-gradient(180deg,#f7f9fe,#eef4ff);border:1px solid #d8e1ef}
    .review-form-card .formbox{margin-top:18px}
    @media(max-width:640px){.before-after-grid{grid-template-columns:1fr}.before-after-item img,.service-media video{min-height:240px}.excavating-showcase{padding:18px}}
  `;
  document.head.append(style);

  const imageFixes={
    '20250415_143732.webp':{file:'1000009253.webp',alt:'MGD skid loader removing asphalt at a lakeside property'},
    'skid-loader-driveway-prep.webp':{file:'20241111_170105.webp',alt:'Gravel and dirt driveway resurfaced by MGD Skid Loader Services'},
    '20250410_153946.webp':{file:'site-grading-before.webp',alt:'MGD building site preparation work'},
    '20250404_134326.webp':{file:'1000009864.webp',alt:'MGD skid loader auger drilling holes for a post project'}
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
      img.src=asset('images/1000009253.webp');
      img.alt='MGD skid loader removing asphalt at a lakeside property';
    }
    if(title==='Gravel/Dirt Driveway Resurfacing'){
      img.src=asset('images/20241111_170105.webp');
      img.alt='Gravel and dirt driveway resurfaced by MGD Skid Loader Services';
    }
    if(title==='Shed Takedown and Building Site Prep'){
      img.src=asset('images/shed-takedown-card.webp');
      img.alt='MGD skid loader taking down a shed';
    }
    if(title==='6\"-24\" Hole Drilling' || title==='6\"–24\" Hole Drilling'){
      img.src=asset('images/1000009864.webp');
      img.alt='MGD skid loader auger drilling holes for a post project';
    }
  });

  const beforeAfter=(before,after,beforeAlt,afterAlt)=>{
    const primary=document.querySelector('.service-detail > img');
    if(!primary)return;
    const wrap=document.createElement('div');
    wrap.className='before-after-grid';
    const item=(label,src,alt)=>{
      const div=document.createElement('div');
      div.className='before-after-item';
      const badge=document.createElement('span');
      badge.className='before-after-label';
      badge.textContent=label;
      const img=document.createElement('img');
      img.src=asset(`images/${src}`);
      img.alt=alt;
      img.loading='lazy';
      img.decoding='async';
      div.append(badge,img);
      return div;
    };
    wrap.append(item('Before',before,beforeAlt),item('After',after,afterAlt));
    primary.replaceWith(wrap);
  };

  if(location.pathname.includes('/services/building-site-readiness/')){
    beforeAfter('1000007587.webp','1000007590.webp','Building site before MGD preparation','Building site after MGD preparation');
  }
  if(location.pathname.includes('/services/brush-debris-removal/')){
    beforeAfter('brush-clearing-before.webp','brush-clearing-after.webp','Brush removal area before MGD clearing','Brush removal area after MGD clearing');
  }
  if(location.pathname.includes('/services/stump-grinding/')){
    beforeAfter('20250410_141942.webp','20250410_154755.webp','Stump before MGD stump grinding','Area after MGD stump grinding');
  }
  if(location.pathname.includes('/services/shed-takedown-building-site-prep/')){
    const primary=document.querySelector('.service-detail > img');
    if(primary){
      const wrap=document.createElement('div');
      wrap.className='service-media';
      const video=document.createElement('video');
      video.controls=true;
      video.playsInline=true;
      video.preload='metadata';
      video.poster=asset('images/shed-takedown-card.webp');
      const source=document.createElement('source');
      source.src=asset('video/shed-takedown.mp4');
      source.type='video/mp4';
      video.append(source);
      wrap.append(video);
      primary.replaceWith(wrap);
    }
  }
  if(location.pathname.includes('/services/post-hole-drilling/')){
    const primary=document.querySelector('.service-detail > img');
    if(primary){primary.src=asset('images/1000009864.webp');primary.alt='MGD skid loader auger drilling holes for a post project';}
  }
  if(location.pathname.includes('/services/asphalt-concrete-removal/')){
    const primary=document.querySelector('.service-detail > img');
    if(primary) beforeAfter('1000009253.webp','1000009257.webp','Asphalt removal project before MGD work','Cleared and graded area after MGD asphalt removal');
  }

  if(depth===0){
    const headings=[...document.querySelectorAll('h2,h3')];
    const workHeading=headings.find(h=>h.textContent.toLowerCase().includes("see mgd's work"));
    const section=workHeading?.closest('section');
    const gallery=section?.querySelector('.gallery');
    if(gallery && !section.querySelector('.excavating-showcase')){
      const box=document.createElement('div');
      box.className='excavating-showcase';
      const h=document.createElement('h3');
      h.textContent='Excavating';
      const grid=document.createElement('div');
      grid.className='before-after-grid';
      const add=(label,file,alt)=>{
        const d=document.createElement('div');d.className='before-after-item';
        const b=document.createElement('span');b.className='before-after-label';b.textContent=label;
        const i=document.createElement('img');i.src=asset(`images/${file}`);i.alt=alt;i.loading='lazy';
        d.append(b,i);return d;
      };
      grid.append(add('Before','1000009329.webp','Excavating area before MGD work'),add('After','1000009387.webp','Excavating area after MGD work'));
      box.append(h,grid);
      gallery.insertAdjacentElement('afterend',box);
    }
  }

  if(location.pathname.includes('/reviews/')){
    const grid=document.querySelector('.review-grid');
    const container=grid?.parentElement;
    if(container && !container.querySelector('.review-form-card')){
      const card=document.createElement('div');
      card.className='review-form-card';
      card.innerHTML='<div class="eyebrow">Share your experience</div><h2>Leave MGD a review.</h2><p>If MGD has completed work for you, share your experience below.</p>';
      const formbox=document.createElement('div');
      formbox.className='formbox';
      const script=document.createElement('script');
      script.async=true;
      script.setAttribute('data-crm-form-widget','');
      script.src='https://www.cdnstyles.com/static/custom_form_widget/v1/custom_form.widget.js';
      script.setAttribute('data','eyJiYWNrZ3JvdW5kQ29sb3IiOiIjZmZmZmZmIiwiYmFzZVVSTCI6Imh0dHBzOi8vZm9ybXMtcHJvZC5hcGlnYXRld2F5LmNvIiwiYm9yZGVyQ29sb3IiOiIjMDAwMDAwIiwiYm9yZGVyUmFkaXVzIjoiNXB4IiwiYm9yZGVyU3R5bGUiOiJzb2xpZCIsImJvcmRlcldpZHRoIjoiMXB4IiwiZm9ybUlkIjoiRm9ybUNvbmZpZ0lELTVlOTVjOTkxLWM2NDQtNDBkNS1hOTA4LWQ5YjcxOGIyNzk2YiIsInBhZGRpbmciOiIyMHB4IiwicHJpbWFyeUNvbG9yIjoiIzE4NzZEMiIsInByaW1hcnlGb250Q29sb3IiOiIjMDAwMDAwIiwid2lkdGgiOiIxMDAlIn0=');
      formbox.append(script);
      card.append(formbox);
      const note=container.querySelector('.note');
      (note||grid).insertAdjacentElement('afterend',card);
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
