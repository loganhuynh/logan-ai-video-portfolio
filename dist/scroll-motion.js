(()=>{
  const clamp=(value,min=0,max=1)=>Math.min(max,Math.max(min,value));
  const smooth=value=>{value=clamp(value);return value*value*(3-2*value)};
  const range=(value,start,end)=>smooth((value-start)/(end-start));
  const main=document.querySelector('main');
  if(!main)return;
  const routeKey=document.body.classList.contains('projects-page')?'projects':document.body.classList.contains('case-page')?'case':location.pathname.includes('/about/')?'about':location.pathname.includes('/contact/')?'contact':'home';

  /* A fresh route visit must start on its opening composition. Browser scroll
     restoration previously exposed the Project reel before user input. */
  if('scrollRestoration' in history)history.scrollRestoration='manual';
  if(!location.hash)scrollTo(0,0);

  /* Legacy Home archives are split into chapters. V22's Home already ships as
     an intentional four-scene narrative and bypasses this compatibility path. */
  function splitHomeArchive(){
    /* V22 Home is intentionally a four-scene brand narrative. Projects live
       only in the dedicated archive. */
    if(main.querySelector(':scope > .home-positioning'))return;
    const source=main.querySelector(':scope > .work-section');
    if(!source)return;
    const intro=document.createElement('section');
    intro.className='work-section home-work-intro';
    intro.id=source.id;
    intro.setAttribute('aria-labelledby',source.getAttribute('aria-labelledby')||'work-title');
    [source.querySelector('.gallery-intro'),source.querySelector('.home-project-directions')].forEach(node=>node&&intro.appendChild(node));
    source.before(intro);

    const cards=[...(source.querySelector('.project-gallery')?.children||[])];
    cards.forEach((card,index)=>{
      const scene=document.createElement('section');
      scene.className='work-section home-project-scene';
      scene.setAttribute('aria-label',`Project ${index+1} of ${cards.length}`);
      const gallery=document.createElement('div');
      gallery.className='project-gallery';
      gallery.appendChild(card);
      scene.appendChild(gallery);
      source.before(scene);
    });
    const finalScene=source.previousElementSibling;
    const link=source.querySelector('.section-link');
    if(finalScene&&link)finalScene.appendChild(link);
    source.remove();
  }

  function prepareProjects(){
    const hero=main.querySelector(':scope > .projects-hero');
    const categories=main.querySelector(':scope > .project-categories');
    const entryCue=main.querySelector(':scope > .projects-entry-cue');
    if(hero&&categories)hero.appendChild(categories);
    if(hero&&entryCue)hero.appendChild(entryCue);
  }

  function unwrapCaseBody(){
    const body=main.querySelector(':scope > .case-body');
    if(!body)return;
    const film=body.querySelector(':scope > .film-section');
    if(film)body.prepend(film);
    [...body.children].forEach(section=>{
      section.classList.add('case-body-scene');
      body.before(section);
    });
    body.remove();
  }

  function splitDenseMobileScenes(){
    if(innerWidth>760)return;
    const rules=[['.direction-grid',1],['.principles',1],['.process-grid',2],['.engagement-grid',1]];
    [...main.querySelectorAll(':scope > section')].forEach(section=>{
      for(const [selector,limit] of rules){
        const grid=section.querySelector(selector);
        if(!grid||grid.children.length<=limit)continue;
        const overflow=[...grid.children].slice(limit);
        let anchor=section;
        for(let index=0;index<overflow.length;index+=limit){
          const continuation=document.createElement('section');
          continuation.className=`${section.className} mobile-continuation`;
          const nextGrid=document.createElement('div');
          nextGrid.className=grid.className;
          overflow.slice(index,index+limit).forEach(item=>nextGrid.appendChild(item));
          continuation.appendChild(nextGrid);
          anchor.after(continuation);
          anchor=continuation;
        }
        break;
      }
    });
  }

  splitHomeArchive();
  prepareProjects();
  unwrapCaseBody();
  splitDenseMobileScenes();

  const specialSelector='.motion-intro,.project-reel';
  const sceneSelector='section:not(.motion-intro):not(.project-reel)';
  const groups=[];
  let pending=[];
  [...main.children].forEach(child=>{
    if(child.matches(sceneSelector))pending.push(child);
    else{
      if(pending.length)groups.push(pending);
      pending=[];
    }
  });
  if(pending.length)groups.push(pending);

  /* Give every scene a longer reading plateau. The animation still follows
     the wheel directly, but one casual wheel gesture can no longer rush
     through a complete composition. */
  const STEP_VH=innerWidth<=760?245:315;
  const scenes=[];
  const decks=[];

  function motionProfile(scene,index){
    const direction=index%2?1:-1;
    if(scene.matches('.home-positioning'))return{name:'hero',camera:'ascend',prop:'axis',inX:0,inY:70,inZ:-720,inRX:7,inRY:0,inRZ:0,inScale:.76,outX:-22,outY:-30,outZ:470,outRX:-4,outRY:7,outRZ:-.7,outScale:1.14};
    if(scene.matches('.home-capability-scene'))return{name:'orbit',camera:'orbit',prop:'navigator',inX:100,inY:38,inZ:-680,inRX:3,inRY:-15,inRZ:1.4,inScale:.78,outX:-82,outY:-34,outZ:440,outRX:-3,outRY:12,outRZ:-1,outScale:1.13};
    if(scene.matches('.home-philosophy-scene'))return{name:'sweep',camera:'dive',prop:'helix',inX:-94,inY:46,inZ:-620,inRX:4,inRY:14,inRZ:-1.2,inScale:.8,outX:76,outY:-38,outZ:450,outRX:-3,outRY:-11,outRZ:.8,outScale:1.12};
    if(scene.matches('.home-project-cta'))return{name:'portal',camera:'tunnel',prop:'gateway',inX:0,inY:18,inZ:-980,inRX:0,inRY:-7,inRZ:-1.5,inScale:.62,outX:0,outY:-18,outZ:660,outRX:0,outRY:8,outRZ:1.5,outScale:1.23};
    if(scene.matches('.home-project-scene'))return{name:'dolly',camera:'orbit',prop:'navigator',inX:22*direction,inY:54,inZ:-760,inRX:3,inRY:-11*direction,inRZ:1.2*direction,inScale:.78,outX:-28*direction,outY:-32,outZ:460,outRX:-2,outRY:8*direction,outRZ:-.8*direction,outScale:1.13};
    if(scene.matches('.case-hero,.page-hero'))return{name:'hero',camera:'reveal',prop:'lens',inX:0,inY:90,inZ:-620,inRX:7,inRY:0,inRZ:0,inScale:.8,outX:0,outY:-56,outZ:420,outRX:-5,outRY:0,outRZ:0,outScale:1.12};
    if(scene.matches('.film-section'))return{name:'screen',camera:'dive',prop:'projector',inX:0,inY:72,inZ:-720,inRX:10,inRY:direction*4,inRZ:0,inScale:.76,outX:0,outY:-42,outZ:500,outRX:-7,outRY:-direction*5,outRZ:0,outScale:1.15};
    if(scene.matches('.result-section,.case-next,.page-cta,.contact-section'))return{name:'portal',camera:'tunnel',prop:'halo',inX:0,inY:20,inZ:-920,inRX:0,inRY:direction*7,inRZ:direction*2,inScale:.65,outX:0,outY:-20,outZ:650,outRX:0,outRY:-direction*8,outRZ:-direction*2,outScale:1.22};
    if(scene.matches('.direction-section'))return{name:'orbit',camera:'orbit',prop:'prism',inX:110*direction,inY:36,inZ:-540,inRX:2,inRY:-16*direction,inRZ:1.6*direction,inScale:.82,outX:-90*direction,outY:-36,outZ:410,outRX:-2,outRY:13*direction,outRZ:-1.2*direction,outScale:1.12};
    if(scene.matches('.role-section'))return{name:'orbit',camera:'flip',prop:'cube',inX:110*direction,inY:36,inZ:-540,inRX:2,inRY:-16*direction,inRZ:1.6*direction,inScale:.82,outX:-90*direction,outY:-36,outZ:410,outRX:-2,outRY:13*direction,outRZ:-1.2*direction,outScale:1.12};
    const cameras=['ascend','orbit','dive','flip'];
    const props=['axis','navigator','helix','cube'];
    return{name:'sweep',camera:cameras[index%4],prop:props[index%4],inX:86*direction,inY:58,inZ:-480,inRX:4,inRY:-12*direction,inRZ:.8*direction,inScale:.84,outX:-72*direction,outY:-46,outZ:370,outRX:-3,outRY:10*direction,outRZ:-.6*direction,outScale:1.1};
  }

  function choreographyFor(scene){
    const title=scene.querySelector('h1,h2');
    const aside=scene.querySelector('.hero-aside,.capability-heading>p,.home-lead,.belief-copy,.content-heading>p,.role-heading>p,.direction-heading>p');
    if(scene.matches('.home-positioning'))return{kind:'core',title,aside,focus:scene.querySelector('.direction-core')};
    if(scene.matches('.home-capability-scene'))return{kind:'constellation',title,aside,items:[...scene.querySelectorAll('.home-service-grid article')]};
    if(scene.matches('.home-philosophy-scene'))return{kind:'timeline',title,aside:scene.querySelector('.home-method>div>p'),items:[...scene.querySelectorAll('.home-method li')]};
    if(scene.matches('.film-section'))return{kind:'screen',title,frame:scene.querySelector('.film-shell')};
    if(scene.matches('.result-section,.case-next,.page-cta'))return{kind:'portal',title,aside,items:[...scene.querySelectorAll('a,p')]};
    if(scene.querySelector('.tool-cloud'))return{kind:'constellation',title,aside,items:[...scene.querySelectorAll('.tool-cloud span')]};
    const cards=[...scene.querySelectorAll('.principle,.process-card,.engagement-card,.direction-card')];
    if(cards.length)return{kind:'cards',title,aside,items:cards};
    const sequence=[...scene.querySelectorAll('.timeline-item,.brief-list li,.role-item,.case-fact')];
    if(sequence.length)return{kind:'sequence',title,aside,items:sequence};
    if(scene.matches('.page-hero,.case-hero'))return{kind:'aperture',title,aside,focus:scene.querySelector('.case-hero-bg')};
    return{kind:'editorial',title,aside,items:[...scene.querySelectorAll('[data-reveal]')].slice(1)};
  }

  function atmosphereFor(scene,index){
    if(scene.matches('.case-hero'))return'cinema';
    if(scene.matches('.film-section'))return'projector';
    if(scene.matches('.case-intro'))return'horizon';
    if(scene.matches('.direction-section'))return'prism';
    if(scene.matches('.role-section'))return'blueprint';
    if(scene.matches('.result-section'))return'halo';
    if(scene.matches('.case-next,.page-cta'))return'paper';
    if(scene.matches('.home-positioning'))return'cosmos';
    if(scene.matches('.home-capability-scene'))return'prism';
    if(scene.matches('.home-philosophy-scene'))return'ember';
    if(scene.matches('.home-project-cta'))return'portal';
    if(scene.matches('.projects-hero'))return'archive';
    if(scene.matches('.method-section'))return'slate';
    if(routeKey==='about'&&scene.matches('.page-hero'))return'studio';
    if(routeKey==='about'&&scene.querySelector('.belief-grid'))return'horizon';
    if(routeKey==='about'&&scene.querySelector('.principles'))return'prism';
    if(routeKey==='about'&&scene.querySelector('.timeline'))return'filmstrip';
    if(routeKey==='about'&&scene.querySelector('.tool-cloud'))return'blueprint';
    if(routeKey==='contact'&&scene.matches('.page-hero'))return'signal';
    if(routeKey==='contact'&&scene.querySelector('.engagement-grid'))return'studio';
    if(routeKey==='contact'&&scene.querySelector('.brief-list'))return'slate';
    if(scene.querySelector('.tool-cloud'))return'blueprint';
    if(scene.querySelector('.timeline,.brief-list'))return'horizon';
    if(scene.querySelector('.principles,.process-grid,.engagement-grid'))return index%2?'prism':'blueprint';
    return['cosmos','horizon','ember','prism'][index%4];
  }

  const atmosphereImages={
    cinema:'radial-gradient(circle at 76% 34%,rgba(112,178,210,.13),transparent 27%),linear-gradient(116deg,#05080b 0%,#10151a 50%,#070709 100%)',
    projector:'linear-gradient(108deg,transparent 7%,rgba(224,235,231,.08) 28%,transparent 54%),radial-gradient(ellipse at 50% 48%,rgba(115,229,221,.11),transparent 42%),linear-gradient(180deg,#050607,#0a0e12)',
    horizon:'linear-gradient(180deg,transparent 48%,rgba(115,229,221,.13) 49%,transparent 50%),radial-gradient(ellipse at 18% 74%,rgba(115,229,221,.12),transparent 36%),linear-gradient(135deg,#071012,#090a0d 58%,#130b11)',
    prism:'conic-gradient(from 218deg at 68% 46%,transparent 0 23%,rgba(217,106,152,.11) 31%,transparent 40% 68%,rgba(115,229,221,.12) 76%,transparent 84%),linear-gradient(124deg,#07090c,#100a10 54%,#071011)',
    blueprint:'linear-gradient(rgba(86,155,178,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(86,155,178,.055) 1px,transparent 1px),radial-gradient(circle at 72% 38%,rgba(76,146,180,.12),transparent 34%),#070b0e',
    halo:'radial-gradient(circle at 50% 48%,rgba(115,229,221,.16),transparent 22%,rgba(217,106,152,.055) 38%,transparent 58%),linear-gradient(145deg,#071012,#0c090d)',
    paper:'radial-gradient(circle at 50% 40%,rgba(255,255,255,.9),transparent 43%),linear-gradient(135deg,#eeece5,#d9d8d2)',
    cosmos:'radial-gradient(circle at 22% 30%,rgba(115,229,221,.14),transparent 28%),radial-gradient(circle at 82% 70%,rgba(217,106,152,.09),transparent 30%),linear-gradient(145deg,#061012,#09080c)',
    ember:'radial-gradient(ellipse at 72% 72%,rgba(214,139,84,.13),transparent 34%),linear-gradient(122deg,#080b0d,#120b0a 55%,#09090c)',
    portal:'radial-gradient(circle at 50% 50%,rgba(115,229,221,.13),transparent 18%,rgba(217,106,152,.075) 34%,transparent 54%),linear-gradient(160deg,#05080a,#0c090e)'
    ,archive:'linear-gradient(90deg,transparent 0 7%,rgba(255,255,255,.035) 7% 7.15%,transparent 7.15% 31%,rgba(115,229,221,.055) 31% 31.12%,transparent 31.12% 68%,rgba(217,106,152,.045) 68% 68.12%,transparent 68.12%),radial-gradient(ellipse at 18% 52%,rgba(115,229,221,.12),transparent 30%),linear-gradient(132deg,#06090c,#0d090e 64%,#07090a)',
    studio:'linear-gradient(118deg,rgba(236,231,214,.08),transparent 24% 70%,rgba(217,106,152,.04)),radial-gradient(ellipse at 24% 16%,rgba(226,229,215,.13),transparent 30%),linear-gradient(150deg,#0b0d0e,#07090b 58%,#100b0d)',
    filmstrip:'repeating-linear-gradient(90deg,transparent 0 9%,rgba(255,255,255,.035) 9% 9.25%,transparent 9.25% 18%),linear-gradient(180deg,transparent 0 18%,rgba(255,255,255,.055) 18% 18.2%,transparent 18.2% 82%,rgba(255,255,255,.055) 82% 82.2%,transparent 82.2%),linear-gradient(135deg,#07090b,#0e0b10)',
    signal:'repeating-radial-gradient(circle at 72% 46%,transparent 0 72px,rgba(115,229,221,.055) 73px 74px,transparent 75px 128px),linear-gradient(125deg,#061012,#0a090d 58%,#110a0f)',
    slate:'repeating-linear-gradient(132deg,rgba(255,255,255,.028) 0 1px,transparent 1px 84px),radial-gradient(circle at 22% 72%,rgba(115,229,221,.09),transparent 34%),linear-gradient(145deg,#070a0c,#0e0a0d)'
  };

  const directorPaths={
    ascend:'M 72 552 C 170 510 204 326 366 242 C 548 146 704 208 916 70',
    dive:'M 86 74 C 282 62 386 170 468 316 C 560 482 742 512 916 566',
    orbit:'M 62 354 C 176 102 624 52 842 232 C 1032 390 730 612 446 482 C 238 386 330 186 618 218',
    flip:'M 72 500 C 206 364 334 394 454 278 C 592 144 744 202 926 82',
    tunnel:'M 70 302 C 232 58 746 58 930 302 C 744 548 236 548 70 302 C 278 174 720 174 930 302',
    reveal:'M 74 506 C 234 456 278 152 492 132 C 704 112 760 420 924 498'
  };

  /* A single purposeful actor replaces the old decorative 3D objects. Its
     path causes the reveal: camera first, director mark second, content last. */
  function makeDirectorActor(kind,index){
    const actor=document.createElement('div');
    actor.className='cinematic-director';
    actor.dataset.path=kind;
    actor.dataset.side=index%2?'right':'left';
    actor.setAttribute('aria-hidden','true');
    const path=directorPaths[kind]||directorPaths.reveal;
    actor.innerHTML=`<svg viewBox="0 0 1000 600" preserveAspectRatio="none"><path class="director-trail-soft" d="${path}" pathLength="1"/><path class="director-trail" d="${path}" pathLength="1"/></svg><span class="director-mark"><i></i><b></b><em></em></span>`;
    const route=actor.querySelector('.director-trail');
    actor._route=route;
    actor._length=1;
    return actor;
  }

  groups.forEach((items,groupIndex)=>{
    const previous=items[0].previousElementSibling;
    const followsSpecial=previous?.matches(specialSelector)||false;
    const deck=document.createElement('div');
    deck.className='cinematic-deck';
    deck.dataset.deck=String(groupIndex+1);
    /* The Intro now completes in its own full viewport before Home begins, so
       it needs no hidden black lead-in. The project reel keeps its bridge. */
    const entryLead=previous?.matches('.project-reel')?.72:0;
    /* Each extra scroll step exists to reach another real scene. Reserving a
       step after the final scene created an empty black chapter. */
    deck.style.height=`${100+(Math.max(0,items.length-1)+entryLead)*STEP_VH}svh`;
    const viewport=document.createElement('div');
    viewport.className='cinematic-viewport';
    deck.appendChild(viewport);
    items[0].before(deck);

    const deckRecord={deck,viewport,items:[],top:0,step:1,entryLead};
    items.forEach((scene,index)=>{
      const computed=getComputedStyle(scene);
      const color=computed.backgroundColor;
      const image=computed.backgroundImage;
      const atmosphere=atmosphereFor(scene,index);
      const backdrop=document.createElement('div');
      backdrop.className='cinematic-backdrop';
      backdrop.dataset.atmosphere=atmosphere;
      backdrop.setAttribute('aria-hidden','true');
      backdrop.style.setProperty('--backdrop-color',color==='rgba(0, 0, 0, 0)'||color==='transparent'?(index%2?'#090b0d':'#060708'):color);
      backdrop.style.setProperty('--backdrop-image',image&&image!=='none'?image:atmosphereImages[atmosphere]);
      const depth=document.createElement('div');
      depth.className='cinematic-depth-world';
      depth.dataset.atmosphere=atmosphere;
      depth.setAttribute('aria-hidden','true');
      depth.innerHTML='<span class="depth-grid"></span><span class="depth-orbit depth-orbit-a"></span><span class="depth-orbit depth-orbit-b"></span><span class="depth-glow"></span>';
      scene.style.setProperty('background','transparent','important');
      scene.classList.add('cinematic-stage');
      scene.dataset.scene=String(index+1);

      const visual=[];
      const content=[];
      [...scene.children].forEach(child=>{
        if(child.matches('.case-hero-bg,.contact-orbit,.page-index'))visual.push(child);
        else content.push(child);
      });
      const profile=motionProfile(scene,index);
      const actor=makeDirectorActor(profile.camera,index);
      viewport.append(backdrop,depth,actor,scene);
      actor._length=actor._route.getTotalLength?.()||1;
      scene.dataset.motion=profile.name;
      depth.dataset.motion=profile.name;
      const homeProject=scene.matches('.home-project-cta')?{world:scene.querySelector('.home-project-world'),grid:scene.querySelector('.home-project-grid'),orbit:scene.querySelector('.home-project-orbit'),preview:scene.querySelector('.home-project-preview'),frames:[...scene.querySelectorAll('.home-project-frame,.portal-frame')],copy:scene.querySelector('.home-cta-copy'),dots:scene.querySelector('.home-project-dots')}:null;
      const record={scene,index,backdrop,depth,actor,visual,content,deck:deckRecord,profile,homeProject,choreography:choreographyFor(scene),innerMedia:[...scene.querySelectorAll('.project-plane img,.case-hero-bg img,.film-shell>img,.home-project-frame img')],headings:[...scene.querySelectorAll('h1,h2')]};
      deckRecord.items.push(record);
      scenes.push(record);
    });
    decks.push(deckRecord);
  });

  const guide=document.createElement('div');
  guide.className='global-scroll-guide';
  guide.setAttribute('aria-hidden','true');
  guide.innerHTML='<span class="scroll-guide-wheel"><i></i></span><span class="scroll-guide-label"></span><b class="scroll-guide-count"></b>';
  document.body.appendChild(guide);
  const guideLabel=guide.querySelector('.scroll-guide-label');
  const guideCount=guide.querySelector('.scroll-guide-count');
  const specialZones=[...document.querySelectorAll(specialSelector)];

  let targetY=scrollY;
  let smoothY=scrollY;
  let maxY=0;
  let raf=0;
  let lastTime=performance.now();
  let lastProgrammatic=0;
  let lastInputDirection=0;
  let pointerX=0,pointerY=0,pointerTargetX=0,pointerTargetY=0;
  let activeGlobal=0;
  let reportedGlobal=-1;

  addEventListener('pageshow',event=>{
    if(location.hash)return;
    if(event.persisted||scrollY>2){targetY=0;smoothY=0;scrollTo(0,0);renderScenes(0)}
  });

  function sceneTitle(item){
    if(!item)return'';
    const scene=item.scene;
    const vi=document.documentElement.lang==='vi';
    if(scene.matches('.film-section'))return vi?'XEM TÁC PHẨM':'WATCH THE FILM';
    if(scene.matches('.case-intro'))return vi?'BÀI TOÁN & Ý TƯỞNG':'THE BRIEF';
    if(scene.matches('.direction-section'))return vi?'ĐỊNH HƯỚNG SÁNG TẠO':'CREATIVE DIRECTION';
    if(scene.matches('.role-section'))return vi?'VAI TRÒ & QUY TRÌNH':'ROLE & PROCESS';
    if(scene.matches('.result-section'))return vi?'KẾT QUẢ':'OUTCOME';
    if(scene.matches('.case-next'))return vi?'DỰ ÁN KHÁC':'MORE PROJECTS';
    const heading=scene.querySelector('h1,h2');
    return(heading?.textContent||'').replace(/\s+/g,' ').trim().slice(0,38);
  }

  function updateLanguage(){
    const next=scenes[activeGlobal+1];
    const title=sceneTitle(next);
    guideLabel.textContent=title?(document.documentElement.lang==='vi'?`TIẾP THEO · ${title}`:`NEXT · ${title}`):(document.documentElement.lang==='vi'?'CUỘN ĐỂ TIẾP TỤC':'SCROLL TO CONTINUE');
  }

  function reportScene(){
    if(activeGlobal===reportedGlobal)return;
    reportedGlobal=activeGlobal;
    const active=scenes[activeGlobal];
    window.dispatchEvent(new CustomEvent('portfolio:scenechange',{detail:{
      index:activeGlobal+1,
      total:scenes.length,
      title:sceneTitle(active),
      route:location.pathname
    }}));
  }

  function refreshMetrics(){
    maxY=Math.max(0,document.documentElement.scrollHeight-innerHeight);
    decks.forEach(deck=>{
      deck.top=deck.deck.offsetTop;
      deck.step=innerHeight*STEP_VH/100;
    });
    targetY=clamp(targetY,0,maxY);
    smoothY=clamp(smoothY,0,maxY);
  }

  function deckAt(y){
    return decks.find(deck=>y>=deck.top-2&&y<deck.top+deck.step*(deck.items.length+deck.entryLead)-1)||null;
  }

  function inSpecialZone(y){
    return specialZones.some(zone=>y>=zone.offsetTop-innerHeight*.1&&y<=zone.offsetTop+zone.offsetHeight-innerHeight*.9);
  }

  function stablePoint(deck,y,direction=0){
    const raw=(y-deck.top)/deck.step-deck.entryLead;
    let index=direction>0?Math.floor(raw+.08)+1:direction<0?Math.ceil(raw-.08)-1:Math.round(raw);
    index=clamp(index,-deck.entryLead,deck.items.length);
    return deck.top+(index+deck.entryLead)*deck.step;
  }

  function normalizeWheel(event){
    const unit=event.deltaMode===1?18:event.deltaMode===2?innerHeight:1;
    return clamp(event.deltaY*unit,-240,240);
  }

  function onWheel(event){
    if(event.ctrlKey||event.target.closest('dialog,[data-film-shell] iframe'))return;
    event.preventDefault();
    const delta=normalizeWheel(event);
    if(!delta)return;
    const gain=Math.abs(delta)>90?.88:1.08;
    const direction=Math.sign(delta);
    if(lastInputDirection&&direction!==lastInputDirection&&Math.abs(targetY-smoothY)>10)targetY=smoothY;
    lastInputDirection=direction;
    targetY=clamp(targetY+delta*gain,0,maxY);
    targetY=clamp(targetY,smoothY-innerHeight*.82,smoothY+innerHeight*.82);
    schedule();
  }

  let touchY=null,touchDirection=0;
  function onTouchStart(event){touchY=event.touches[0]?.clientY??null;touchDirection=0}
  function onTouchMove(event){
    if(touchY===null||event.target.closest('dialog'))return;
    const next=event.touches[0]?.clientY;
    if(next===undefined)return;
    const delta=(touchY-next)*1.15;
    touchY=next;
    const direction=Math.sign(delta);
    if(touchDirection&&direction!==touchDirection&&Math.abs(targetY-smoothY)>8)targetY=smoothY;
    touchDirection=direction;
    targetY=clamp(targetY+delta,0,maxY);
    targetY=clamp(targetY,smoothY-innerHeight*.72,smoothY+innerHeight*.72);
    event.preventDefault();
    schedule();
  }

  function sceneAmount(incoming,phase,inStart,inEnd,outStart,outEnd){
    return incoming?range(phase,inStart,inEnd):1-range(phase,outStart,outEnd);
  }

  function renderChoreography(item,incoming,phase,px=pointerX,py=pointerY){
    const fx=item.choreography;
    if(!fx)return;
    /* Environment moves first. The director mark then reaches the title,
       followed by supporting copy and details. This avoids simultaneous,
       template-like fades and creates a readable hold at the end. */
    const show=sceneAmount(incoming,phase,.31,.68,.45,.8);
    const late=sceneAmount(incoming,phase,.54,.86,.28,.66);
    const depth=incoming?-520*(1-show):310*(1-show);
    if(fx.title){
      fx.title.style.opacity=clamp(show).toFixed(3);
      const camera=item.profile.camera;
      fx.title.style.clipPath=camera==='tunnel'?`circle(${(show*76).toFixed(2)}% at 50% 50%)`:camera==='dive'?`inset(${((1-show)*100).toFixed(2)}% 0 0 0)`:camera==='ascend'?`inset(0 0 ${((1-show)*100).toFixed(2)}% 0)`:camera==='orbit'?`polygon(0 0,${(show*100).toFixed(2)}% 0,${(show*100).toFixed(2)}% 100%,0 100%)`:fx.kind==='aperture'?`inset(${((1-show)*48).toFixed(2)}% 0)`:`inset(0 ${((1-show)*100).toFixed(2)}% 0 0)`;
      const titleX=camera==='orbit'?(incoming?(1-show)*-92:(1-show)*78):(incoming?(1-show)*-34:(1-show)*44);
      const titleY=camera==='dive'?(incoming?(1-show)*-72:(1-show)*68):camera==='ascend'?(incoming?(1-show)*72:(1-show)*-64):(incoming?(1-show)*28:(1-show)*-24);
      fx.title.style.transform=`translate3d(${titleX.toFixed(2)}px,${titleY.toFixed(2)}px,${(depth*(camera==='tunnel'?1.7:1)).toFixed(2)}px) rotateX(${((1-show)*(incoming?8:-5)).toFixed(2)}deg) rotateY(${(camera==='orbit'?(1-show)*(incoming?-14:12):0).toFixed(2)}deg)`;
    }
    if(fx.aside){
      fx.aside.style.opacity=clamp(late).toFixed(3);
      fx.aside.style.clipPath=`inset(0 ${((1-late)*100).toFixed(2)}% 0 0)`;
      fx.aside.style.transform=`translate3d(${((1-late)*(incoming?78:-58)).toFixed(2)}px,${((1-late)*24).toFixed(2)}px,${((1-late)*-340).toFixed(2)}px) rotateY(${((1-late)*(incoming?-9:7)).toFixed(2)}deg)`;
    }
    if(fx.kind==='core'&&fx.focus){
      const focus=sceneAmount(incoming,phase,.18,.7,.5,.9);
      fx.focus.style.opacity=clamp(focus).toFixed(3);
      fx.focus.style.transform=`translate3d(${(px*11+(incoming?(1-focus)*90:(1-focus)*-70)).toFixed(2)}px,${(py*8+(1-focus)*28).toFixed(2)}px,${(incoming?-760*(1-focus):430*(1-focus)).toFixed(2)}px) rotateX(${((1-focus)*7).toFixed(2)}deg) rotateY(${(incoming?(1-focus)*-32:(1-focus)*28).toFixed(2)}deg) scale(${(.72+focus*.28).toFixed(4)})`;
      fx.focus.style.setProperty('--core-spin',`${(phase*150+(incoming?-35:0)).toFixed(2)}deg`);
    }
    if(fx.kind==='screen'&&fx.frame){
      const frame=sceneAmount(incoming,phase,.16,.72,.5,.9);
      fx.frame.style.opacity=clamp(frame).toFixed(3);
      fx.frame.style.clipPath=`inset(${((1-frame)*44).toFixed(2)}% ${((1-frame)*9).toFixed(2)}%)`;
      fx.frame.style.transform=`translate3d(0,${((1-frame)*(incoming?54:-38)).toFixed(2)}px,${(incoming?-880*(1-frame):520*(1-frame)).toFixed(2)}px) rotateX(${((1-frame)*(incoming?12:-7)).toFixed(2)}deg) scale(${(.7+frame*.3).toFixed(4)})`;
    }
    if(fx.kind==='aperture'&&fx.focus){
      const focus=sceneAmount(incoming,phase,.08,.62,.62,.96);
      fx.focus.style.clipPath=`inset(${((1-focus)*24).toFixed(2)}% ${((1-focus)*18).toFixed(2)}%)`;
      fx.focus.style.transform=`translate3d(${(px*-8).toFixed(2)}px,${(py*-5).toFixed(2)}px,${(-280*(1-focus)).toFixed(2)}px) scale(${(1.16-focus*.16).toFixed(4)})`;
    }
    if(!fx.items?.length)return;
    fx.items.forEach((node,index)=>{
      const stagger=Math.min(index,8)*.052;
      const amount=incoming?range(phase,.5+stagger,.82+stagger*.4):1-range(phase,.22+stagger*.18,.59+stagger*.34);
      const side=index%2?1:-1;
      node.style.opacity=clamp(amount).toFixed(3);
      if(fx.kind==='constellation'){
        node.style.clipPath=`inset(0 ${((1-amount)*100).toFixed(2)}% 0 0)`;
        node.style.transform=`translate3d(${((1-amount)*(96+index*26)).toFixed(2)}px,${((1-amount)*(index-1)*34).toFixed(2)}px,${(-680*(1-amount)).toFixed(2)}px) rotateY(${(-18*(1-amount)).toFixed(2)}deg) scale(${(.74+amount*.26).toFixed(4)})`;
      }else if(fx.kind==='cards'){
        node.style.clipPath=`inset(${((1-amount)*18).toFixed(2)}% ${((1-amount)*12).toFixed(2)}%)`;
        node.style.transformOrigin=index%2?'100% 50%':'0 50%';
        node.style.transform=`translate3d(${(side*(1-amount)*128).toFixed(2)}px,${((1-amount)*(42+index*7)).toFixed(2)}px,${(-620*(1-amount)).toFixed(2)}px) rotateY(${(side*(1-amount)*34).toFixed(2)}deg) scale(${(.78+amount*.22).toFixed(4)})`;
      }else if(fx.kind==='sequence'||fx.kind==='timeline'){
        node.style.clipPath=`inset(0 ${((1-amount)*100).toFixed(2)}% 0 0)`;
        node.style.transform=`translate3d(${((1-amount)*(68+index*13)).toFixed(2)}px,${((1-amount)*(12+index*5)).toFixed(2)}px,${(-320*(1-amount)).toFixed(2)}px) rotateX(${((1-amount)*7).toFixed(2)}deg)`;
      }else if(fx.kind==='portal'){
        node.style.clipPath=`circle(${(amount*76).toFixed(2)}% at 50% 50%)`;
        node.style.transform=`translate3d(0,${((1-amount)*28).toFixed(2)}px,${(-340*(1-amount)).toFixed(2)}px) scale(${(.82+amount*.18).toFixed(4)})`;
      }else{
        node.style.transform=`translate3d(${(side*(1-amount)*54).toFixed(2)}px,${((1-amount)*24).toFixed(2)}px,${(-260*(1-amount)).toFixed(2)}px)`;
      }
    });
  }

  function setTransform(node,opacity,x,y,z,scale,rotateX=0,rotateY=0,rotateZ=0){
    node.style.opacity=clamp(opacity).toFixed(3);
    node.style.transform=`translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,${z.toFixed(2)}px) rotateX(${rotateX.toFixed(3)}deg) rotateY(${rotateY.toFixed(3)}deg) rotateZ(${rotateZ.toFixed(3)}deg) scale(${scale.toFixed(4)})`;
  }

  function cameraPose(kind,incoming,phase,index,vw,vh){
    const amount=incoming?1-range(phase,.04,.7):range(phase,.52,.98);
    const side=index%2?1:-1;
    if(kind==='ascend')return{x:side*vw*.08*amount,y:(incoming?1:-1)*vh*.72*amount,z:(incoming?-980:620)*amount,rx:(incoming?18:-11)*amount,ry:side*-7*amount,rz:side*2.2*amount,scale:1-(incoming?.3:-.2)*amount};
    if(kind==='dive')return{x:side*vw*.055*amount,y:(incoming?-1:1)*vh*.76*amount,z:(incoming?-820:560)*amount,rx:(incoming?-21:16)*amount,ry:side*8*amount,rz:side*-1.8*amount,scale:1-(incoming?.26:-.18)*amount};
    if(kind==='orbit')return{x:side*(incoming?1:-1)*vw*.62*amount,y:vh*.16*amount,z:(incoming?-930:540)*amount,rx:5*amount,ry:side*(incoming?-42:34)*amount,rz:side*(incoming?4:-3)*amount,scale:1-(incoming?.24:-.14)*amount};
    if(kind==='flip')return{x:side*vw*.36*amount,y:(incoming?1:-1)*vh*.14*amount,z:(incoming?-720:470)*amount,rx:(incoming?7:-5)*amount,ry:side*(incoming?-64:58)*amount,rz:side*3*amount,scale:1-(incoming?.2:-.12)*amount};
    if(kind==='tunnel')return{x:0,y:(incoming?1:-1)*vh*.06*amount,z:(incoming?-1520:1080)*amount,rx:0,ry:side*9*amount,rz:side*3*amount,scale:1-(incoming?.52:-.58)*amount};
    return{x:0,y:(incoming?1:-1)*vh*.25*amount,z:(incoming?-760:480)*amount,rx:(incoming?10:-7)*amount,ry:0,rz:0,scale:1-(incoming?.22:-.14)*amount};
  }

  function renderDirectorActor(item,incoming,phase,px,py){
    const actor=item.actor;
    if(!actor||!actor._route)return;
    const draw=incoming?range(phase,.08,.63):range(phase,.48,.92);
    const appear=incoming?range(phase,.045,.16):range(phase,.43,.55);
    const leave=incoming?range(phase,.64,.8):range(phase,.9,.995);
    const presence=clamp(appear*(1-leave));
    const routeProgress=incoming?draw:1-draw;
    actor.style.opacity=presence.toFixed(3);
    actor.style.visibility=presence>.008?'visible':'hidden';
    actor.style.setProperty('--director-progress',routeProgress.toFixed(4));
    actor.style.setProperty('--director-rotation',`${(routeProgress*180).toFixed(2)}deg`);
    actor.style.setProperty('--director-dash',String(1-routeProgress));
    actor.style.setProperty('--director-energy',String(Math.sin(clamp(draw)*Math.PI)));
    const point=actor._route.getPointAtLength(actor._length*clamp(routeProgress));
    const next=actor._route.getPointAtLength(actor._length*clamp(routeProgress+.006));
    const angle=Math.atan2(next.y-point.y,next.x-point.x)*180/Math.PI;
    const mark=actor.querySelector('.director-mark');
    const camera=item.profile.camera;
    const plunge=camera==='tunnel'?Math.sin(draw*Math.PI)*520:camera==='orbit'?Math.sin(draw*Math.PI)*220:Math.sin(draw*Math.PI)*120;
    mark.style.left=`${(point.x/10).toFixed(3)}%`;
    mark.style.top=`${(point.y/6).toFixed(3)}%`;
    mark.style.transform=`translate3d(calc(-50% + ${(px*7).toFixed(2)}px),calc(-50% + ${(py*5).toFixed(2)}px),${plunge.toFixed(2)}px) rotateZ(${angle.toFixed(2)}deg) rotateY(${((item.index%2?1:-1)*Math.sin(draw*Math.PI)*28).toFixed(2)}deg) scale(${(.72+Math.sin(draw*Math.PI)*.42).toFixed(3)})`;
  }

  function renderScenes(y){
    let bestDistance=Infinity;
    const vh=innerHeight||1;
    decks.forEach(deck=>{
      /* Hold the closing composition instead of animating it out when there is
         no following scene. */
      const virtual=clamp((y-deck.top)/deck.step-deck.entryLead,-deck.entryLead,Math.max(0,deck.items.length-1));
      const nearest=deck.items[Math.round(clamp(virtual,0,Math.max(0,deck.items.length-1)))];
      const lockOpeningPointer=nearest?.scene.matches('.case-hero')||false;
      const deckPointerX=lockOpeningPointer?0:pointerX;
      const deckPointerY=lockOpeningPointer?0:pointerY;
      deck.viewport.style.perspectiveOrigin=`${(50+deckPointerX*3.2).toFixed(2)}% ${(48+deckPointerY*2.4).toFixed(2)}%`;
      deck.items.forEach((item,index)=>{
        const relative=virtual-index;
        if(relative<-1.03||relative>1.03){
          item.scene.style.visibility='hidden';
          item.backdrop.style.visibility='hidden';
          item.depth.style.visibility='hidden';
          item.actor.style.visibility='hidden';
          item.scene.style.pointerEvents='none';
          return;
        }
        const incoming=relative<0;
        const phase=incoming?relative+1:relative;
        const backdropOpacity=incoming?range(phase,.06,.54):1-range(phase,.66,.97);
        const depthOpacity=incoming?range(phase,.12,.62):1-range(phase,.58,.95);
        const visualOpacity=incoming?range(phase,.18,.72):1-range(phase,.5,.9);
        const contentBase=incoming?range(phase,.4,.8):1-range(phase,.42,.76);
        const presence=Math.max(backdropOpacity,visualOpacity,contentBase);
        const distance=Math.abs(relative);
        if(presence>.05&&distance<bestDistance){bestDistance=distance;activeGlobal=scenes.indexOf(item)}

        item.scene.style.visibility=presence>.002?'visible':'hidden';
        item.backdrop.style.visibility=backdropOpacity>.002?'visible':'hidden';
        item.depth.style.visibility=depthOpacity>.002?'visible':'hidden';
        item.actor.style.visibility=presence>.002?'visible':'hidden';
        item.scene.style.pointerEvents=!incoming&&phase<.3?'auto':'none';
        item.scene.style.zIndex=String(index*4+4);
        item.actor.style.zIndex=String(index*4+5);
        item.depth.style.zIndex=String(index*4+2);
        item.backdrop.style.zIndex=String(index*4+1);
        item.scene.style.opacity=String(Math.max(visualOpacity,contentBase));
        const px=deckPointerX;
        const py=deckPointerY;
        const camera=cameraPose(item.profile.camera,incoming,phase,index,innerWidth,vh);
        item.scene.style.transform=`translate3d(${(camera.x+px*5).toFixed(2)}px,${(camera.y+py*4).toFixed(2)}px,${camera.z.toFixed(2)}px) rotateX(${camera.rx.toFixed(2)}deg) rotateY(${camera.ry.toFixed(2)}deg) rotateZ(${camera.rz.toFixed(2)}deg) scale(${camera.scale.toFixed(4)})`;

        const inScale=1.2-range(phase,.24,.74)*.2;
        const outScale=1+range(phase,.48,.92)*.09;
        const backdropScale=incoming?inScale:outScale;
        const backdropY=incoming?(1-range(phase,.24,.74))*vh*.045:-range(phase,.48,.92)*vh*.03;
        setTransform(item.backdrop,backdropOpacity,px*-7,backdropY+py*-4,incoming?-180*(1-range(phase,.24,.74)):90*range(phase,.48,.92),backdropScale,incoming?2.2*(1-phase):-1.4*phase,px*.38,incoming?-.5*(1-phase):.42*phase);

        const depthProgress=incoming?range(phase,.3,.8):range(phase,.46,.9);
        setTransform(item.depth,depthOpacity,px*14+(incoming?(1-depthProgress)*(index%2?58:-58):0),py*10+(incoming?(1-depthProgress)*34:-depthProgress*28),incoming?-520*(1-depthProgress):280*depthProgress,incoming?.72+depthProgress*.28:1+depthProgress*.18,incoming?8*(1-depthProgress):-5*depthProgress,incoming?(index%2?12:-12)*(1-depthProgress):(index%2?-8:8)*depthProgress,(index%2?1:-1)*(incoming?(1-depthProgress)*3:depthProgress*3));
        renderDirectorActor(item,incoming,phase,px,py);

        item.visual.forEach((node,visualIndex)=>{
          const enter=range(phase,.18+visualIndex*.025,.72+visualIndex*.018);
          const exit=range(phase,.48+visualIndex*.018,.9+visualIndex*.015);
          const opacity=incoming?enter:1-exit;
          const progress=incoming?enter:exit;
          const p=item.profile;
          const x=(incoming?p.inX*(1-progress)*.72:p.outX*progress*.72)+px*(7+visualIndex*2);
          const visualY=(incoming?p.inY*(1-progress)*.76:p.outY*progress*.76)+py*6;
          const z=incoming?p.inZ*(1-progress)*.82:p.outZ*progress*.82;
          const scale=incoming?1-(1-p.inScale)*(1-progress)*.76:1+(p.outScale-1)*progress*.76;
          setTransform(node,opacity,x,visualY,z,scale,incoming?p.inRX*(1-progress):p.outRX*progress,incoming?p.inRY*(1-progress):p.outRY*progress,incoming?p.inRZ*(1-progress):p.outRZ*progress);
        });

        item.content.forEach((node,contentIndex)=>{
          const delay=Math.min(contentIndex,5)*.032;
          const enter=range(phase,.4+delay,.8+delay*.12);
          const exit=range(phase,.4+delay*.24,.76+delay*.45);
          const opacity=incoming?enter:1-exit;
          const progress=incoming?enter:exit;
          const p=item.profile;
          const x=(incoming?p.inX*(1-progress):p.outX*progress)+px*(3+contentIndex*.65);
          const contentY=(incoming?p.inY*(1-progress):p.outY*progress)+py*(2+contentIndex*.42);
          const z=incoming?p.inZ*(1-progress):p.outZ*progress;
          const scale=incoming?1-(1-p.inScale)*(1-progress):1+(p.outScale-1)*progress;
          setTransform(node,opacity,x,contentY,z,scale,incoming?p.inRX*(1-progress):p.outRX*progress,incoming?p.inRY*(1-progress):p.outRY*progress,incoming?p.inRZ*(1-progress):p.outRZ*progress);
        });

        const detailIn=range(phase,.48,.9);
        const detailOut=range(phase,.28,.72);
        item.innerMedia.forEach((node,layerIndex)=>{
          const progress=incoming?detailIn:detailOut;
          node.style.transform=`translate3d(${(px*-11+layerIndex*2).toFixed(2)}px,${(py*-8+(incoming?(1-progress)*18:-progress*12)).toFixed(2)}px,${(incoming?-190*(1-progress):120*progress).toFixed(2)}px) scale(${(incoming?.94+progress*.06:1+progress*.035).toFixed(4)})`;
        });
        item.headings.forEach((node,layerIndex)=>{
          const titleIn=range(phase,.7+layerIndex*.018,.99);
          const titleOut=range(phase,.17,.48);
          const progress=incoming?titleIn:titleOut;
          node.style.translate=`${(px*(2+layerIndex)).toFixed(2)}px ${(py*1.5+(incoming?(1-progress)*22:-progress*15)).toFixed(2)}px ${(incoming?-90*(1-progress):70*progress).toFixed(2)}px`;
        });

        renderChoreography(item,incoming,phase,px,py);

        /* The Home archive teaser uses the same camera language as Projects:
           the environment arrives first, then the frame stack, then the copy. */
        if(item.homeProject){
          const hp=item.homeProject;
          const worldIn=range(phase,.2,.68),worldOut=range(phase,.48,.88);
          const frameIn=range(phase,.34,.8),frameOut=range(phase,.3,.72);
          const copyIn=range(phase,.61,.96),copyOut=range(phase,.16,.52);
          const worldProgress=incoming?worldIn:worldOut;
          const frameProgress=incoming?frameIn:frameOut;
          const copyProgress=incoming?copyIn:copyOut;
          hp.world.style.opacity=clamp(incoming?worldIn:1-worldOut).toFixed(3);
          hp.grid.style.transform=`translate3d(-50%,${(-16+(incoming?(1-worldProgress)*13:-worldProgress*9)).toFixed(2)}%,-260px) rotateX(${(73+(incoming?(1-worldProgress)*8:-worldProgress*4)).toFixed(2)}deg) translateY(${(worldProgress*95).toFixed(1)}px)`;
          hp.orbit.style.transform=`translate(-50%,-50%) rotateX(68deg) rotateZ(${(incoming?(1-worldProgress)*-42:worldProgress*78).toFixed(2)}deg) scale(${(incoming?.78+worldProgress*.22:1+worldProgress*.14).toFixed(3)})`;
          hp.preview.style.opacity=clamp(incoming?frameIn:1-frameOut).toFixed(3);
          hp.preview.style.transform=`translate3d(${(incoming?(1-frameProgress)*-72:frameProgress*74).toFixed(2)}px,${(incoming?(1-frameProgress)*46:-frameProgress*34).toFixed(2)}px,${(incoming?-720*(1-frameProgress):480*frameProgress).toFixed(2)}px) rotateX(${(incoming?(1-frameProgress)*7:-frameProgress*4).toFixed(2)}deg) rotateY(${(incoming?(1-frameProgress)*13:-frameProgress*10).toFixed(2)}deg) scale(${(incoming?.76+frameProgress*.24:1+frameProgress*.12).toFixed(4)})`;
          hp.frames.forEach((frame,frameIndex)=>{
            const offset=frameIndex?1:-1;
            frame.style.translate=`${(px*(frameIndex?11:6)+offset*(incoming?(1-frameProgress)*42:-frameProgress*24)).toFixed(2)}px ${(py*(frameIndex?8:5)+offset*(incoming?(1-frameProgress)*-24:frameProgress*16)).toFixed(2)}px ${(frameIndex?150:-80)}px`;
          });
          hp.copy.style.opacity=clamp(incoming?copyIn:1-copyOut).toFixed(3);
          hp.copy.style.transform=`translate3d(${(incoming?(1-copyProgress)*78:-copyProgress*58).toFixed(2)}px,${(incoming?(1-copyProgress)*28:-copyProgress*22).toFixed(2)}px,${(incoming?-360*(1-copyProgress):220*copyProgress).toFixed(2)}px) rotateY(${(incoming?(1-copyProgress)*-10:copyProgress*8).toFixed(2)}deg)`;
          hp.dots.style.opacity=clamp(incoming?worldIn:1-worldOut).toFixed(3);
        }
      });

    });

    guideCount.textContent=`${String(activeGlobal+1).padStart(2,'0')} / ${String(Math.max(1,scenes.length)).padStart(2,'0')}`;
    reportScene();
    updateLanguage();
    const localActive=specialZones.some(zone=>{
      const top=zone.offsetTop;
      return y>top-innerHeight*.15&&y<top+zone.offsetHeight-innerHeight*.85;
    });
    const activeSceneHasOwnCue=scenes[activeGlobal]?.scene.querySelector('.case-next-cue');
    const atStoryEnd=activeGlobal===scenes.length-1&&y>=maxY-Math.max(24,innerHeight*.08);
    guide.classList.toggle('is-local',localActive||atStoryEnd||Boolean(activeSceneHasOwnCue)||Boolean(document.querySelector('dialog[open]')));
  }

  function schedule(){if(!raf)raf=requestAnimationFrame(tick)}
  function tick(now){
    raf=0;
    const dt=Math.min(.05,(now-lastTime)/1000||.016);
    lastTime=now;
    const difference=targetY-smoothY;
    const followRate=6.4+Math.min(6,Math.abs(difference)/(innerHeight||1)*5);
    const scrollFollow=1-Math.exp(-dt*followRate);
    const pointerFollow=1-Math.exp(-dt*7.2);
    smoothY+=difference*scrollFollow;
    if(Math.abs(difference)<.12)smoothY=targetY;
    pointerX+=(pointerTargetX-pointerX)*pointerFollow;
    pointerY+=(pointerTargetY-pointerY)*pointerFollow;
    lastProgrammatic=now;
    scrollTo(0,smoothY);
    renderScenes(smoothY);
    const moving=Math.abs(targetY-smoothY)>.1||Math.abs(pointerTargetX-pointerX)+Math.abs(pointerTargetY-pointerY)>.002;
    if(moving)schedule();
  }

  addEventListener('wheel',onWheel,{passive:false});
  addEventListener('touchstart',onTouchStart,{passive:true});
  addEventListener('touchmove',onTouchMove,{passive:false});
  addEventListener('touchend',()=>{touchY=null},{passive:true});
  addEventListener('pointermove',event=>{
    pointerTargetX=clamp(event.clientX/Math.max(1,innerWidth)*2-1,-1,1);
    pointerTargetY=clamp(event.clientY/Math.max(1,innerHeight)*2-1,-1,1);
    schedule();
  },{passive:true});
  addEventListener('pointerleave',()=>{pointerTargetX=pointerTargetY=0;schedule()},{passive:true});
  addEventListener('site-scroll-to',event=>{
    refreshMetrics();
    targetY=smoothY=clamp(event.detail.top,0,maxY);
    lastProgrammatic=performance.now();
    scrollTo(0,smoothY);renderScenes(smoothY);schedule();
  });
  addEventListener('resize',()=>{refreshMetrics();renderScenes(smoothY);schedule()},{passive:true});
  addEventListener('scroll',()=>{
    if(performance.now()-lastProgrammatic<55&&Math.abs(scrollY-smoothY)<3)return;
    if(Math.abs(scrollY-smoothY)>3){targetY=smoothY=scrollY;renderScenes(smoothY)}
  },{passive:true});
  addEventListener('keydown',event=>{
    if(event.target.matches('input,textarea,select')||document.querySelector('dialog[open]'))return;
    const directions={ArrowDown:1,PageDown:1,' ':1,ArrowUp:-1,PageUp:-1};
    const direction=directions[event.key];
    if(!direction)return;
    const deck=deckAt(smoothY);
    if(!deck||inSpecialZone(smoothY))return;
    event.preventDefault();
    targetY=clamp(event.key.startsWith('Arrow')?targetY+direction*Math.min(150,innerHeight*.18):stablePoint(deck,smoothY,direction),0,maxY);
    schedule();
  });
  document.addEventListener('click',event=>{
    const interactive=event.target.closest('a[href^="#"],[data-play-film]');
    if(!interactive)return;
    setTimeout(()=>{targetY=smoothY=scrollY;refreshMetrics();renderScenes(smoothY)},80);
  });
  new MutationObserver(()=>{updateLanguage();renderScenes(smoothY)}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});

  updateLanguage();
  refreshMetrics();
  renderScenes(smoothY);
})();
