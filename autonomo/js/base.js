/* ===== FINE: ESPLOSIONE TEATRALE ===== */
(function(){
  const motto = document.getElementById('exploding');
  if(!motto) return;
  let textEl = motto.querySelector('.m-text') || motto;
  if(!textEl.querySelector('.char')){
    const txt = textEl.textContent;
    textEl.textContent = '';
    for(const ch of [...txt]){
      const s = document.createElement('span');
      s.className = 'char';
      s.textContent = ch === ' ' ? ' ' : ch;
      textEl.appendChild(s);
    }
  }

  if(!document.querySelector('.fx-layer')){
    const layer = document.createElement('div');
    layer.className = 'fx-layer';
    layer.innerHTML = '<div class="fx-flash"></div><div class="fx-shock"></div><div class="fx-smoke"></div><canvas class="fx-embers"></canvas>';
    document.body.appendChild(layer);
  }
  const layer = document.querySelector('.fx-layer');
  const flash = layer.querySelector('.fx-flash');
  const shock = layer.querySelector('.fx-shock');
  const smoke = layer.querySelector('.fx-smoke');
  const canvas = layer.querySelector('.fx-embers');
  const ctx = canvas.getContext('2d');
  function resize(){ canvas.width = innerWidth; canvas.height = innerHeight; }
  resize(); addEventListener('resize', resize);

  const prefersReduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let animating = false;

  function centerOf(el){
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width/2, y: r.top + r.height/2 };
  }

  let sparks = [];
  function seedSparks(x,y,count){
    for(let i=0;i<count;i++){
      const a = Math.random()*Math.PI*2;
      const sp = 2 + Math.random()*6;
      sparks.push({ x,y, vx: Math.cos(a)*sp, vy: Math.sin(a)*sp - (Math.random()*2), life: 40+Math.random()*50, age: 0, r: 1+Math.random()*2 });
    }
  }
  function tick(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i=sparks.length-1;i>=0;i--){
      const s=sparks[i];
      s.age++;
      s.vy += 0.06; s.vx *= 0.99; s.vy *= 0.995;
      s.x += s.vx; s.y += s.vy;
      const t = 1 - (s.age/s.life);
      if(t<=0){ sparks.splice(i,1); continue; }
      ctx.globalAlpha = Math.max(0,t);
      const g = ctx.createRadialGradient(s.x,s.y,0,s.x,s.y,s.r*3);
      g.addColorStop(0,'rgba(255,240,180,1)');
      g.addColorStop(1,'rgba(255,120,0,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fill();
    }
    if(animating) requestAnimationFrame(tick);
  }

  function shake(intensity, duration){
    const start = performance.now();
    (function step(now){
      const t = (now-start)/duration;
      if(t>=1){ document.body.style.transform=''; return; }
      const n = 1 - t;
      const dx = (Math.random()*2-1)*intensity*n;
      const dy = (Math.random()*2-1)*intensity*n;
      document.body.style.transform = 'translate('+dx+'px,'+dy+'px)';
      requestAnimationFrame(step);
    })(start);
  }

  function explode(){
    if(prefersReduce || animating) return;
    animating = true;

    const chars = [...textEl.querySelectorAll('.char')];
    motto.classList.add('preglow');
    flash.style.opacity = 1;
    setTimeout(()=> flash.style.opacity = 0, 120);

    shock.style.opacity = 1; shock.style.transform = 'translate(-50%,-50%) scale(.25)';
    smoke.style.opacity = .25; smoke.style.transform = 'translate(-50%,-50%) scale(.4)';
    const start = performance.now(), DUR=680;
    (function loop(now){
      const t = Math.min(1,(now-start)/DUR);
      const ease = t<.5 ? 2*t*t : -1+(4-2*t)*t;
      shock.style.transform = 'translate(-50%,-50%) scale('+(.25 + ease*2.0)+')';
      shock.style.opacity = String(1 - t);
      smoke.style.transform = 'translate(-50%,-50%) scale('+(.4 + ease*1.4)+')';
      smoke.style.opacity = String(.25 * (1 - t));
      if(t<1) requestAnimationFrame(loop);
    })(start);

    const {x:cx,y:cy}=centerOf(textEl);
    chars.forEach((ch)=>{
      const b = ch.getBoundingClientRect();
      const ox=b.left+b.width/2, oy=b.top+b.height/2;
      const dx=ox-cx, dy=oy-cy;
      const dist=Math.hypot(dx,dy)||1;
      const dirx=dx/dist, diry=dy/dist;
      const power = 90 + Math.random()*160;
      const rot = (Math.random()*720-360);
      const delay = (dist/600)*180;
      ch.style.willChange='transform,opacity';
      setTimeout(()=>{
        ch.animate([
          { transform:'translate3d(0,0,0) rotate(0deg)', opacity:1 },
          { transform:'translate3d('+(dirx*power)+'px,'+(diry*power)+'px,0) rotate('+rot+'deg)', opacity:0 }
        ], { duration: 620 + Math.random()*320, easing:'cubic-bezier(.2,.9,.2,1)', fill:'forwards' });
      }, delay);
    });

    const c = centerOf(textEl);
    seedSparks(c.x,c.y,110);
    tick();
    shake(4,380);

    setTimeout(()=>{ motto.classList.remove('preglow'); animating=false; }, 1200);
  }

  // Trigger: se esiste un bottone con id btn-explode
  const btn = document.getElementById('btn-explode');
  if(btn) btn.addEventListener('click', explode);

  // Esporta API globale minimale:
  window.EchiExplode = explode;
})();

