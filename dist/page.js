const pageLanguageButton=document.querySelector('.language-switch');
let pageLanguage=localStorage.getItem('lh-language')||'en';

const exactInterfaceTranslations={
  'Luxury Fashion':'Thời trang cao cấp','Luxury':'Thời trang','Fashion.':'cao cấp.','LUXURY FASHION':'THỜI TRANG CAO CẤP','History of':'Lịch sử','Currency.':'tiền tệ.','MoMo — History of Currency':'MoMo — Lịch sử tiền tệ',
  'CONFIDENTIAL CLIENT — SELECTED FRAMES':'KHÁCH HÀNG BẢO MẬT — KHUNG HÌNH CHỌN LỌC','CLIENT WORK — RELEASED 2024':'DỰ ÁN KHÁCH HÀNG — PHÁT HÀNH 2024',
  'CONFIDENTIAL CLIENT':'KHÁCH HÀNG BẢO MẬT','SELECTED FRAMES':'KHUNG HÌNH CHỌN LỌC','CLIENT WORK':'DỰ ÁN KHÁCH HÀNG','RELEASED 2024':'PHÁT HÀNH 2024',
  'AI VIDEO ADS':'QUẢNG CÁO VIDEO AI','PIXAR 3D ANIMATION STORYTELLING':'HOẠT HÌNH 3D PIXAR · KỂ CHUYỆN','PIXAR 3D ANIMATION · STORYTELLING':'HOẠT HÌNH 3D PIXAR · KỂ CHUYỆN',
  'AI VIDEO ADS · LUXURY FASHION':'QUẢNG CÁO AI · THỜI TRANG CAO CẤP','STORY FILM · 16:9':'PHIM KỂ CHUYỆN · 16:9',
  'COMMERCIAL · PET CARE':'QUẢNG CÁO · THÚ CƯNG','COMMERCIAL · GROOMING':'QUẢNG CÁO · CHĂM SÓC','CINEMATIC · AUTOMOTIVE':'ĐIỆN ẢNH · Ô TÔ',
  'STORYTELLING · SHORT FILM':'KỂ CHUYỆN · PHIM NGẮN','COMMERCIAL · LIFESTYLE':'QUẢNG CÁO · PHONG CÁCH SỐNG','CINEMATIC · EXPERIMENT':'ĐIỆN ẢNH · THỬ NGHIỆM',
  'GROOMING · REIMAGINED':'CHĂM SÓC · TÁI ĐỊNH HÌNH','NIGHT · BLUE · MOTION':'ĐÊM · XANH · CHUYỂN ĐỘNG','A PSYCHOLOGICAL STORY':'MỘT CÂU CHUYỆN TÂM LÝ',
  'CHANGES EVERYTHING':'THAY ĐỔI TẤT CẢ','LIGHT':'ÁNH SÁNG','BENEATH THE STORM':'DƯỚI LÒNG CƠN BÃO','Home Lighting':'Ánh sáng gia đình','Sea Creature':'Sinh vật biển','SHORT FILM · 16:9':'PHIM NGẮN · 16:9',
  '02 / METHOD':'02 / PHƯƠNG PHÁP','01 / DISCOVER':'01 / KHÁM PHÁ','02 / DESIGN':'02 / THIẾT KẾ','03 / DIRECT':'03 / CHỈ ĐẠO','04 / REFINE':'04 / TINH CHỈNH',
  'VIDEO / PLACEHOLDER':'VIDEO / SẮP CÓ','01 / PRINCIPLES':'01 / NGUYÊN TẮC','01 / CLARITY':'01 / RÕ RÀNG','02 / INTENT':'02 / CHỦ ĐÍCH','03 / FEELING':'03 / CẢM XÚC',
  '02 / PROCESS':'02 / QUY TRÌNH','03 / TOOLKIT':'03 / BỘ CÔNG CỤ','CREATIVE DIRECTION':'CHỈ ĐẠO SÁNG TẠO','STORYBOARDING':'LÊN BẢNG PHÂN CẢNH',
  'IMAGE GENERATION':'TẠO HÌNH ẢNH','EDITING':'DỰNG PHIM','VISUAL DEVELOPMENT':'PHÁT TRIỂN HÌNH ẢNH','SOUND DIRECTION':'CHỈ ĐẠO ÂM THANH',
  '01 / COLLABORATE':'01 / HỢP TÁC','01 / PROJECT':'01 / DỰ ÁN','02 / PARTNERSHIP':'02 / ĐỒNG HÀNH','03 / DIRECTION':'03 / ĐỊNH HƯỚNG',
  'AI VIDEO ADS / TVC':'QUẢNG CÁO VIDEO AI / TVC','ULTRA REALISTIC':'SIÊU CHÂN THỰC','PARIS, FRANCE':'PARIS, PHÁP','VIDEO STORYTELLING':'VIDEO KỂ CHUYỆN','3D CARTOON / PIXAR':'HOẠT HÌNH 3D / PIXAR',
  '01 / THE BRIEF':'01 / ĐỀ BÀI','02 / CREATIVE DIRECTION':'02 / ĐỊNH HƯỚNG SÁNG TẠO','03 / MY ROLE':'03 / VAI TRÒ CỦA TÔI','04 / OUTCOME':'04 / KẾT QUẢ',
  '01 / PLACE':'01 / BỐI CẢNH','02 / PEOPLE':'02 / CON NGƯỜI','03 / REALISM':'03 / ĐỘ CHÂN THỰC','01 / DEVICE':'01 / CÔNG CỤ KỂ CHUYỆN','02 / CLARITY':'02 / RÕ RÀNG','03 / BRAND':'03 / THƯƠNG HIỆU',
  'CREATIVE':'SÁNG TẠO','NARRATIVE':'DẪN CHUYỆN','STORY':'CÂU CHUYỆN','VISUAL SYSTEM':'HỆ THỐNG HÌNH ẢNH','POST-PRODUCTION':'HẬU KỲ',
  'Storyboard':'Bảng phân cảnh','STORYBOARD':'BẢNG PHÂN CẢNH','AI IMAGE':'ẢNH AI','3D IMAGE':'ẢNH 3D','AI VIDEO':'VIDEO AI','EDIT':'DỰNG PHIM','CLIENT WORK · 2024':'DỰ ÁN KHÁCH HÀNG · 2024',
  'CONFIDENTIAL CLIENT — SELECTED FRAMES · 2025':'KHÁCH HÀNG BẢO MẬT — KHUNG HÌNH CHỌN LỌC · 2025'
};

function applyExactInterfaceTranslations(){
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
  while(walker.nextNode()){
    const node=walker.currentNode;
    const parent=node.parentElement;
    if(!parent||parent.closest('script,style,[data-en][data-vi],[data-en-html][data-vi-html]'))continue;
    const raw=node.nodeValue;
    const core=raw.trim();
    if(!core)continue;
    if(!node.__englishInterfaceText&&exactInterfaceTranslations[core])node.__englishInterfaceText=core;
    const english=node.__englishInterfaceText;
    if(!english)continue;
    const leading=raw.match(/^\s*/)?.[0]||'';
    const trailing=raw.match(/\s*$/)?.[0]||'';
    node.nodeValue=leading+(pageLanguage==='vi'?exactInterfaceTranslations[english]:english)+trailing;
  }
}

function applyPageLanguage(){
  document.documentElement.lang=pageLanguage;
  document.querySelectorAll('[data-en][data-vi]').forEach(node=>{
    const value=node.dataset[pageLanguage];
    node.textContent=pageLanguage==='vi'?value.replace(/case study/gi,'hồ sơ dự án').replace(/brief/gi,'đề bài').replace(/grooming/gi,'chăm sóc'):value;
  });
  document.querySelectorAll('[data-en-html][data-vi-html]').forEach(node=>{
    node.innerHTML=node.dataset[`${pageLanguage}Html`];
  });
  document.querySelectorAll('[data-aria-en][data-aria-vi]').forEach(node=>{
    node.setAttribute('aria-label',node.dataset[`aria${pageLanguage==='vi'?'Vi':'En'}`]);
  });
  document.querySelectorAll('[data-alt-en][data-alt-vi]').forEach(node=>{
    node.alt=node.dataset[`alt${pageLanguage==='vi'?'Vi':'En'}`];
  });
  const pageTitle=document.body.dataset[`pageTitle${pageLanguage==='vi'?'Vi':'En'}`];
  const pageDescription=document.body.dataset[`pageDescription${pageLanguage==='vi'?'Vi':'En'}`];
  if(pageTitle)document.title=pageTitle;
  if(pageDescription)document.querySelector('meta[name="description"]')?.setAttribute('content',pageDescription);
  applyExactInterfaceTranslations();
  document.querySelector('.lang-en')?.classList.toggle('active',pageLanguage==='en');
  document.querySelector('.lang-vi')?.classList.toggle('active',pageLanguage==='vi');
}

pageLanguageButton?.addEventListener('click',()=>{
  pageLanguage=pageLanguage==='en'?'vi':'en';
  localStorage.setItem('lh-language',pageLanguage);
  applyPageLanguage();
});
applyPageLanguage();

const deviceMemory=navigator.deviceMemory||8;
const processorCount=navigator.hardwareConcurrency||8;
document.documentElement.classList.toggle('performance-lite',deviceMemory<=4||processorCount<=4);

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
},{threshold:.12,rootMargin:'0px 0px -7% 0px'});
document.querySelectorAll('[data-reveal]').forEach((node,index)=>{
  node.style.setProperty('--delay',`${Math.min(index%4,3)*70}ms`);
  revealObserver.observe(node);
});

const glow=document.querySelector('.page-glow');
let gx=50,gy=35,tx=50,ty=35,last=performance.now();
addEventListener('pointermove',event=>{
  tx=event.clientX/innerWidth*100;
  ty=event.clientY/innerHeight*100;
},{passive:true});
function animateGlow(now){
  const dt=Math.min(.05,(now-last)/1000||.016);last=now;
  const damping=1-Math.exp(-dt*5.5);
  gx+=(tx-gx)*damping;gy+=(ty-gy)*damping;
  if(glow)glow.style.transform=`translate3d(${gx-50}vw,${gy-50}vh,0)`;
  requestAnimationFrame(animateGlow);
}
requestAnimationFrame(animateGlow);

document.querySelectorAll('details.case-row').forEach(item=>{
  item.addEventListener('toggle',()=>{
    if(!item.open)return;
    document.querySelectorAll('details.case-row[open]').forEach(other=>{
      if(other!==item)other.open=false;
    });
  });
});
