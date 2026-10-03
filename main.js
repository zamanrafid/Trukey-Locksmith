/* TruKey — main.js : preloader, nav, reveal, counters, slider, faq, form */
(function(){
  // Preloader
  window.addEventListener('load',()=>{setTimeout(()=>document.getElementById('preloader')?.classList.add('hide'),450)});
  setTimeout(()=>document.getElementById('preloader')?.classList.add('hide'),2800);

  // Scroll progress + nav shadow
  const prog=document.getElementById('progress'),nav=document.getElementById('mainNav');
  addEventListener('scroll',()=>{
    const h=document.documentElement;
    const p=h.scrollTop/(h.scrollHeight-h.clientHeight)*100;
    if(prog)prog.style.width=p+'%';
    nav?.classList.toggle('scrolled',h.scrollTop>10);
  },{passive:true});

  // Mobile menu
  const links=document.getElementById('navLinks'),ov=document.getElementById('overlay');
  document.getElementById('menuBtn')?.addEventListener('click',()=>{links.classList.add('open');ov.classList.add('show')});
  const close=()=>{links.classList.remove('open');ov.classList.remove('show')};
  document.getElementById('closeMenu')?.addEventListener('click',close);
  ov?.addEventListener('click',close);
  links?.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));

  // Reveal on scroll
  const ro=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('revealed');ro.unobserve(e.target)}}),{threshold:.12});
  document.querySelectorAll('[data-reveal]').forEach(el=>ro.observe(el));

  // Animated skill bars
  const bo=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.querySelectorAll('.bar span').forEach(s=>{s.style.setProperty('--w',s.dataset.w||s.style.width||'90%');requestAnimationFrame(()=>s.classList.add('fill'))});bo.unobserve(e.target)}}),{threshold:.3});
  document.querySelectorAll('.why-grid').forEach(el=>bo.observe(el));

  // Counters
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){anim(e.target);io.unobserve(e.target)}}),{threshold:.4});
  document.querySelectorAll('[data-count]').forEach(el=>io.observe(el));
  function anim(el){const t=+el.dataset.count;let c=0;const st=Math.max(1,Math.round(t/70));const iv=setInterval(()=>{c+=st;if(c>=t){c=t;clearInterval(iv);el.classList.add('pop')}el.textContent=c.toLocaleString()},22)}

  // Quote form
  document.getElementById('quoteForm')?.addEventListener('submit',e=>{
    e.preventDefault();
    const n=document.getElementById('qName').value,p=document.getElementById('qPhone').value;
    document.getElementById('formName').textContent=n;
    document.getElementById('formPhone').textContent=p;
    const m=document.getElementById('formMsg');m.style.display='block';
    m.scrollIntoView({behavior:'smooth',block:'center'});
    e.target.reset();
  });

  // FAQ
  document.querySelectorAll('.faq-item').forEach(it=>{
    it.querySelector('.faq-q').addEventListener('click',()=>{
      document.querySelectorAll('.faq-item').forEach(o=>{if(o!==it)o.classList.remove('open')});
      it.classList.toggle('open');
    });
  });

  // Testimonial slider + swipe
  const slides=document.getElementById('slides'),dots=document.getElementById('dots');
  if(slides&&dots){let idx=0;const n=slides.children.length;
    for(let i=0;i<n;i++){const d=document.createElement('button');if(i===0)d.classList.add('on');d.setAttribute('aria-label','Go to review '+(i+1));d.onclick=()=>go(i);dots.appendChild(d)}
    function go(i){idx=(i+n)%n;slides.style.transform=`translateX(-${idx*100}%)`;dots.querySelectorAll('button').forEach((d,j)=>d.classList.toggle('on',j===idx))}
    setInterval(()=>go(idx+1),5500);
    let sx=0;slides.addEventListener('touchstart',e=>sx=e.touches[0].clientX,{passive:true});
    slides.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>40)go(idx+(dx<0?1:-1))},{passive:true});
    window._tGo=go;
  }

  // Footer year
  const y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
})();
