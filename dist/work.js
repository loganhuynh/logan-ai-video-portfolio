const reel=document.querySelector('.project-reel');
const allReelSlides=[...document.querySelectorAll('.reel-project')];
let reelSlides=[...allReelSlides];
const filterButtons=[...document.querySelectorAll('[data-project-filter]')];
const filterStatus=document.querySelector('.reel-filter-status');
let currentFilter='all';
const reelCount=document.querySelector('.reel-count');
const reelProgress=document.querySelector('.reel-progress span');
const reelStage=document.querySelector('.project-reel-stage');
const reelGhost=document.querySelector('.reel-ghost-title');
const reelPortal=document.querySelector('.reel-transition-portal');
let reelDots=[...document.querySelectorAll('.reel-dots i')];
const reelClamp=(value,min=0,max=1)=>Math.min(max,Math.max(min,value));
const reelSmooth=value=>value*value*(3-2*value);
let reelPalettes=allReelSlides.map(slide=>slide.dataset.palette.split('|'));
let reelModes=allReelSlides.map(slide=>slide.dataset.mode);
let reelTarget=0,reelCurrent=0,reelVelocity=0,reelLast=performance.now(),activeSlide=-1,reelVisible=false;
let pointerX=0,pointerY=0,pointerTargetX=0,pointerTargetY=0;
let lastScrollInput=0,frameSampleTotal=0,frameSampleCount=0,renderFrame=0;
let performanceTier=document.documentElement.classList.contains('performance-lite')?'smooth':'cinematic';

function setPerformanceTier(nextTier){
  const ranks={cinematic:0,balanced:1,smooth:2};
  if(ranks[nextTier]<=ranks[performanceTier])return;
  performanceTier=nextTier;
  document.documentElement.classList.toggle('perf-balanced',performanceTier==='balanced');
  document.documentElement.classList.toggle('perf-smooth',performanceTier==='smooth');
  pointerTargetX=0;pointerTargetY=0;
}

if(performanceTier==='smooth')document.documentElement.classList.add('perf-smooth');

function sampleFrameRate(frameMs){
  if(!reelVisible||document.hidden||frameMs>120||performance.now()-lastScrollInput>700)return;
  frameSampleTotal+=frameMs;frameSampleCount++;
  if(frameSampleCount<54)return;
  const average=frameSampleTotal/frameSampleCount;
  if(average>25)setPerformanceTier('smooth');
  else if(average>18.8)setPerformanceTier('balanced');
  frameSampleTotal=0;frameSampleCount=0;
}

function warmNearbyImages(index){
  [index,index+1].forEach(i=>{
    const image=reelSlides[i]?.querySelector('img');
    if(image)image.decode?.().catch(()=>{});
  });
}

function updateReelTarget(){
  const distance=Math.max(1,reel.offsetHeight-innerHeight);
  reelTarget=reelClamp((scrollY-reel.offsetTop)/distance);
  document.body.classList.toggle('projects-entered',scrollY>=reel.offsetTop-2);
  lastScrollInput=performance.now();
}

function scrollToReelIndex(index){
  const progress=reelSlides.length>1?index/(reelSlides.length-1):0;
  const top=reel.offsetTop+progress*Math.max(1,reel.offsetHeight-innerHeight);
  scrollTo({top,behavior:'smooth'});
}

function stagedPosition(progress){
  if(reelSlides.length<=1)return 0;
  const raw=progress*(reelSlides.length-1);
  const base=Math.min(reelSlides.length-2,Math.floor(raw));
  const fraction=raw-base;
  return base+reelSmooth(reelClamp((fraction-.18)/.64));
}

function projectPose(mode,distance,magnitude){
  const entering=distance>=0;
  const side=entering?1:-1;
  if(mode==='timewarp')return{x:Math.sin(distance*1.35)*30,y:distance*10-Math.sin(magnitude*Math.PI)*9,z:entering?-distance*820:-distance*510,rx:distance*-5,ry:distance*-34,rz:distance*4.2,scale:entering?1-magnitude*.18:1+magnitude*.12};
  if(mode==='orbit')return{x:distance*32,y:-Math.sin(distance*Math.PI)*10,z:entering?-distance*650:-distance*390,rx:distance*3,ry:distance*-30,rz:distance*-3.4,scale:1-side*magnitude*.13};
  if(mode==='precision')return{x:distance*18,y:distance*4,z:entering?-distance*740:-distance*470,rx:distance*-1.2,ry:distance*-16,rz:0,scale:entering?1-magnitude*.16:1+magnitude*.1};
  if(mode==='dolly')return{x:distance*9,y:distance*-3,z:entering?-distance*960:-distance*620,rx:distance*2,ry:distance*-9,rz:distance*.7,scale:entering?1-magnitude*.21:1+magnitude*.16};
  if(mode==='fragment')return{x:distance*38,y:distance*-8,z:entering?-distance*590:-distance*410,rx:distance*4,ry:distance*-24,rz:distance*5.4,scale:1-side*magnitude*.13};
  if(mode==='aperture')return{x:distance*7,y:distance*9,z:entering?-distance*880:-distance*560,rx:distance*-4,ry:distance*7,rz:distance*-1.1,scale:entering?1-magnitude*.2:1+magnitude*.15};
  if(mode==='abyss')return{x:distance*-12,y:distance*13,z:entering?-distance*1120:-distance*690,rx:distance*7,ry:distance*13,rz:distance*-2.2,scale:entering?1-magnitude*.24:1+magnitude*.18};
  return{x:entering?Math.min(42,distance*36):Math.max(-34,distance*27),y:distance*6,z:entering?-distance*720:-distance*460,rx:0,ry:entering?-distance*25:-distance*17,rz:distance*1.8,scale:entering?1-magnitude*.16:1+magnitude*.13};
}

function renderReel(progress){
  const position=stagedPosition(progress);
  const nextActive=Math.round(position);
  const transitionPhase=reelClamp(Math.abs(position-nextActive)*2.15);
  const velocityEnergy=reelClamp(Math.abs(reelVelocity)*2.4);
  if(nextActive!==activeSlide){
    activeSlide=nextActive;
    reelCount.textContent=`${String(activeSlide+1).padStart(2,'0')} / ${String(reelSlides.length).padStart(2,'0')}`;
    reelGhost.textContent=localized(reelSlides[activeSlide],'title').toUpperCase();
    reelDots.forEach((dot,index)=>dot.classList.toggle('active',index===activeSlide));
    reelStage.style.setProperty('--accent-rgb',reelPalettes[activeSlide][0]);
    reelStage.style.setProperty('--accent-2-rgb',reelPalettes[activeSlide][1]);
    reelStage.dataset.reelMode=reelModes[activeSlide]||'lateral';
    warmNearbyImages(activeSlide);
  }
  reelSlides.forEach((slide,index)=>{
    const distance=index-position;
    const isNearby=Math.abs(distance)<1.55;
    if(!isNearby){
      slide.style.visibility='hidden';
      slide.style.contentVisibility='hidden';
      slide.style.opacity='0';
      slide.classList.remove('is-active');
      slide.setAttribute('aria-hidden','true');
      slide.querySelector('.open-case').tabIndex=-1;
      return;
    }
    slide.style.visibility='visible';
    slide.style.contentVisibility='visible';
    const magnitude=Math.min(1,Math.abs(distance));
    const opacity=distance>=0?reelClamp(1-distance*.82):reelClamp(1+distance*1.48);
    const mode=reelModes[index]||'lateral';
    const pose=projectPose(mode,distance,magnitude);
    const rotateZ=performanceTier==='smooth'?pose.rz*.35:pose.rz-reelClamp(reelVelocity*2.4,-1,1)*1.6;
    slide.style.opacity=opacity.toFixed(3);
    slide.style.zIndex=String(distance<0?12:10-Math.round(magnitude*4));
    slide.style.transform=`translate3d(calc(-50% + ${pose.x}vw),calc(-50% + ${pose.y}vh),${pose.z}px) rotateX(${pose.rx}deg) rotateY(${pose.ry}deg) rotateZ(${rotateZ}deg) scale(${pose.scale})`;
    const visual=slide.querySelector('.reel-visual');
    const copy=slide.querySelector('.reel-copy');
    const pointerScale=performanceTier==='cinematic'?1:0;
    visual.style.transform=`translate3d(${pointerX*pointerScale-distance*(mode==='lateral'?4.2:2.2)}%,${pointerY*pointerScale+distance*(mode==='timewarp'?-2.5:1.3)}%,${mode==='abyss'?distance*-110:0}px) rotateY(${-3+pointerX*pointerScale*.28-distance*(mode==='orbit'?8:4.2)}deg) rotateX(${pointerY*pointerScale*-.2+distance*(mode==='dolly'?3.8:1.5)}deg) scale(${1+magnitude*(mode==='abyss'?.075:.035)})`;
    visual.style.clipPath=mode==='aperture'?`inset(${(magnitude*13).toFixed(2)}% ${(magnitude*8).toFixed(2)}% round ${(magnitude*28).toFixed(1)}px)`:mode==='fragment'?`polygon(${(magnitude*8).toFixed(2)}% 0,100% ${(magnitude*5).toFixed(2)}%,${(100-magnitude*7).toFixed(2)}% 100%,0 ${(100-magnitude*4).toFixed(2)}%)`:'none';
    copy.style.transform=`translate3d(${distance*(mode==='precision'?5:10)-pointerX*pointerScale*.22}vw,${distance*(mode==='timewarp'?10:7)-pointerY*pointerScale*.35}vh,${distance*(mode==='abyss'?-180:-80)}px) rotateY(${mode==='orbit'?distance*-7:0}deg)`;
    copy.style.opacity=String(reelClamp(opacity*1.18));
    if(performanceTier==='cinematic')slide.style.setProperty('--reel-shine',`${-75+(1-reelClamp(Math.abs(distance)))*150}%`);
    slide.classList.toggle('is-active',index===nextActive);
    slide.setAttribute('aria-hidden',String(index!==nextActive));
    slide.querySelector('.open-case').tabIndex=index===nextActive?0:-1;
  });
  reelProgress.style.transform=`scaleY(${progress.toFixed(4)})`;
  reelGhost.style.opacity=String(.18+reelClamp(1-Math.abs(position-nextActive)*2)*.82);
  reelGhost.style.setProperty('--ghost-x',`${(position-nextActive)*-8}vw`);
  const updateDecor=performanceTier==='cinematic'||(performanceTier==='balanced'&&renderFrame%2===0);
  if(updateDecor){
    reelStage.style.setProperty('--orbit-spin',`${progress*420}deg`);
    reelStage.style.setProperty('--reel-spin',`${progress*95}deg`);
    reelStage.style.setProperty('--grid-shift',`${progress*170}px`);
    reelStage.style.setProperty('--grid-z',`${-260+Math.sin(progress*Math.PI*5)*45}px`);
  }
  if(reelPortal){
    reelPortal.style.opacity=performanceTier==='smooth'?'0':String(transitionPhase*(.42+velocityEnergy*.35));
    if(updateDecor)reelPortal.style.transform=`translate3d(-50%,-50%,0) rotate(${progress*540}deg) scale(${.42+transitionPhase*.92+velocityEnergy*.18})`;
  }
  const rollScale=performanceTier==='cinematic'?1:performanceTier==='balanced'?.45:0;
  reelStage.style.setProperty('--camera-roll',`${reelClamp(reelVelocity*3,-1,1)*1.2*rollScale}deg`);
}

function animateReel(now){
  const frameMs=now-reelLast||16.7;
  sampleFrameRate(frameMs);
  const dt=Math.min(.032,frameMs/1000);reelLast=now;renderFrame++;
  const damping=1-Math.exp(-dt*8.4);
  const pointerDamping=1-Math.exp(-dt*7.5);
  const previous=reelCurrent;
  reelCurrent=reelCurrent+(reelTarget-reelCurrent)*damping;
  const instantVelocity=(reelCurrent-previous)/Math.max(dt,.001);
  reelVelocity+=(instantVelocity-reelVelocity)*(1-Math.exp(-dt*11));
  if(performanceTier!=='cinematic'||now-lastScrollInput<170){pointerTargetX=0;pointerTargetY=0}
  pointerX+=(pointerTargetX-pointerX)*pointerDamping;pointerY+=(pointerTargetY-pointerY)*pointerDamping;
  const needsRender=Math.abs(reelTarget-reelCurrent)>.00005||Math.abs(reelVelocity)>.00008||Math.abs(pointerTargetX-pointerX)+Math.abs(pointerTargetY-pointerY)>.002;
  if((reelVisible&&needsRender)||Math.abs(reelTarget-reelCurrent)>.0001)renderReel(reelCurrent);
  requestAnimationFrame(animateReel);
}

addEventListener('scroll',updateReelTarget,{passive:true});
addEventListener('resize',updateReelTarget);
reelStage.addEventListener('pointermove',event=>{if(performanceTier!=='cinematic'||performance.now()-lastScrollInput<170)return;pointerTargetX=(event.clientX/innerWidth-.5)*3.4;pointerTargetY=(event.clientY/innerHeight-.5)*2.8},{passive:true});
reelStage.addEventListener('pointerleave',()=>{pointerTargetX=0;pointerTargetY=0});
new IntersectionObserver(([entry])=>{reelVisible=entry.isIntersecting},{rootMargin:'20% 0px'}).observe(reel);
updateReelTarget();renderReel(reelTarget);requestAnimationFrame(animateReel);
filterButtons.forEach(button=>button.addEventListener('click',()=>filterProjects(button.dataset.projectFilter)));
resizeReel();
const linkedSlide=reelSlides.findIndex(slide=>slide.id&&`#${slide.id}`===location.hash);
if(linkedSlide>=0)requestAnimationFrame(()=>scrollToReelIndex(linkedSlide));


function resizeReel(){
  const hold=innerWidth<650?220:280;
  reel.style.height=`${100+Math.max(1,reelSlides.length-1)*hold}svh`;
}
function announceFilter(){
  const vi=document.documentElement.lang==='vi';
  const selected=filterButtons.find(button=>button.dataset.projectFilter===currentFilter);
  const label=selected.querySelector('span').dataset[vi?'vi':'en'];
  filterStatus.textContent=`${label} · ${reelSlides.length} ${vi?'dự án':'projects'}`;
  const hint=document.querySelector('.reel-scroll-note>span:nth-child(2)');
  hint.dataset.en=reelSlides.length===1?'SCROLL TO CONTINUE':'SCROLL TO EXPLORE PROJECTS';
  hint.dataset.vi=reelSlides.length===1?'CUỘN ĐỂ TIẾP TỤC':'CUỘN ĐỂ KHÁM PHÁ CÁC DỰ ÁN';
  hint.textContent=hint.dataset[vi?'vi':'en'];
}
function filterProjects(branch){
  if(branch===currentFilter)return;
  const wasInReel=scrollY>=reel.offsetTop-2;
  currentFilter=branch;
  reelSlides=allReelSlides.filter(slide=>branch==='all'||slide.dataset.branches.split(' ').includes(branch));
  allReelSlides.forEach(slide=>{
    slide.hidden=!reelSlides.includes(slide);
    slide.classList.remove('is-active');
    slide.setAttribute('aria-hidden','true');
    slide.querySelector('.open-case').tabIndex=-1;
  });
  filterButtons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.projectFilter===branch)));
  reelPalettes=reelSlides.map(slide=>slide.dataset.palette.split('|'));
  reelModes=reelSlides.map(slide=>slide.dataset.mode);
  const dots=document.querySelector('.reel-dots');
  dots.replaceChildren(...reelSlides.map(()=>document.createElement('i')));
  reelDots=[...dots.children];
  reelSlides.forEach((slide,index)=>{slide.querySelector('.project-no').textContent=`${String(index+1).padStart(2,'0')} / ${String(reelSlides.length).padStart(2,'0')}`});
  reelTarget=reelCurrent=reelVelocity=0;activeSlide=-1;
  resizeReel();
  dispatchEvent(new Event('resize'));
  if(wasInReel)dispatchEvent(new CustomEvent('site-scroll-to',{detail:{top:reel.offsetTop}}));
  updateReelTarget();renderReel(0);announceFilter();
}
addEventListener('resize',resizeReel);
announceFilter();

function localized(slide,key){
  const suffix=document.documentElement.lang==='vi'?'Vi':'En';
  const direct=slide.dataset[`${key}${suffix}`];
  if(direct)return document.documentElement.lang==='vi'?direct.replace(/case study/gi,'hồ sơ dự án').replace(/brief/gi,'đề bài').replace(/grooming/gi,'chăm sóc'):direct;
  if(key==='title'&&document.documentElement.lang==='vi'){
    return {'Beard Color Comb':'Lược nhuộm râu','Home Lighting':'Ánh sáng gia đình','Sea Creature':'Sinh vật biển'}[slide.dataset.title]||slide.dataset.title||'';
  }
  return key==='title'?(slide.dataset.title||''):'';
}
new MutationObserver(()=>{
  announceFilter();
  reelGhost.textContent=(localized(reelSlides[activeSlide],'title')||reelSlides[activeSlide].dataset.title).toUpperCase();
}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
