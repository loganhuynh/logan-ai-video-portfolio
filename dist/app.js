const clamp=(n,min=0,max=1)=>Math.min(max,Math.max(min,n));
const mix=(a,b,t)=>a+(b-a)*t;
const range=(p,a,b)=>clamp((p-a)/(b-a));
const smooth=t=>t*t*(3-2*t);

const translations={
en:{brandRole:'AI VIDEO CREATOR',navHome:'HOME',navWork:'PROJECTS',navAbout:'ABOUT',navContact:'CONTACT',interactionHint:'MOVE CURSOR · SCROLL',introRole:'AI VIDEO CREATOR · VIETNAM',introBody:'Cinematic stories, commercial visuals and imagined worlds — directed with AI.',introIdea:'Ideas, shaped',introMotion:'into motion',scrollStart:'SCROLL TO ENTER',skipIntro:'SKIP INTRO',manifestoLead:'THE DIFFERENCE IS DIRECTION',notJust:'NOT JUST',generatedWord:'GENERATED',directedWord:'DIRECTED',ideaLabel:'AN IDEA',ideaWord:'IMAGINED',directionLabel:'WITH INTENT',directionWord:'DIRECTED',feelingLabel:'BY PEOPLE',feelingWord:'FELT',mediumLine:'AI is the medium',resultLine:'Feeling is the result',selectedWork:'SELECTED PROJECTS',viewAllWork:'EXPLORE ALL PROJECTS',moreAbout:'MORE ABOUT THE PRACTICE',storiesLine:'Projects worth',watchingLine:'remembering',workBody:'A focused selection of commercial, cinematic and character-led projects. Each one opens into a short case study.',filterAll:'ALL PROJECTS',filterCommercial:'COMMERCIAL',filterCinematic:'CINEMATIC',filterStory:'STORYTELLING',typePet:'Pet Treat Commercial',typeProduct:'Product Commercial',typeAuto:'Automotive Cinematic',typeShort:'Psychological Short Film',typeLifestyle:'Lifestyle Commercial',typeExperiment:'Cinematic Experiment',aboutLabel:'ABOUT',aboutHeadlineA:'Between an idea',aboutHeadlineB:'and a feeling',aboutLead:'I’m Logan Huynh, an AI video creator focused on cinematic storytelling, product advertising and visual development.',aboutBody:'From concept and prompting to shot direction and final delivery, I shape each project around one goal: making the idea feel real.',contactLabel:'CONTACT',contactHeadlineA:'Have a story',contactHeadlineB:'in mind?',contactBody:'Let’s turn it into something people remember.',startConversation:'START A CONVERSATION',contactNote:'Contact details will be updated before launch.',footerRole:'AI VIDEO CREATOR · VIETNAM',backTop:'BACK TO TOP ↑',factRole:'ROLE',factTools:'TOOLS',factYear:'YEAR',directionAds:'AI VIDEO ADS',directionPixar:'PIXAR 3D ANIMATION STORYTELLING',classConfidential:'CONFIDENTIAL CLIENT',selectedFrames:'SELECTED FRAMES',classClient:'CLIENT WORK',released2024:'RELEASED 2024',directionLuxury:'AI VIDEO ADS · LUXURY FASHION',directionMomo:'PIXAR 3D ANIMATION · STORYTELLING',momoTitle:'MoMo — History of Currency',storyFilm:'STORY FILM',play:'PLAY',catPet:'COMMERCIAL · PET CARE',catGroom:'COMMERCIAL · GROOMING',catAuto:'CINEMATIC · AUTOMOTIVE',catShort:'STORYTELLING · SHORT FILM',catLifestyle:'COMMERCIAL · LIFESTYLE',catExperiment:'CINEMATIC · EXPERIMENT',groomingReimagined:'GROOMING · REIMAGINED',nightBlueMotion:'NIGHT · BLUE · MOTION',psychologicalStory:'A PSYCHOLOGICAL STORY',changesEverything:'CHANGES EVERYTHING',below:'BELOW',beneathStorm:'BENEATH THE STORM',homeLighting:'Home Lighting',seaCreature:'Sea Creature',capCreative:'CREATIVE DIRECTION',capProduction:'AI VIDEO PRODUCTION',capStory:'VISUAL STORYTELLING',capProduct:'PRODUCT FILMS',videoLater:'VIDEO / LATER',pageTitle:'Logan Huynh — Motion Gallery',pageDescription:'Cinematic AI films, commercial visuals and stories by Logan Huynh.'},
vi:{brandRole:'NHÀ SÁNG TẠO VIDEO AI',navHome:'TRANG CHỦ',navWork:'DỰ ÁN',navAbout:'GIỚI THIỆU',navContact:'LIÊN HỆ',interactionHint:'DI CHUỘT · CUỘN TRANG',introRole:'NHÀ SÁNG TẠO VIDEO AI · VIỆT NAM',introBody:'Câu chuyện điện ảnh, hình ảnh quảng cáo và những thế giới tưởng tượng — được đạo diễn bằng AI.',introIdea:'Ý tưởng được định hình',introMotion:'thành chuyển động',scrollStart:'CUỘN ĐỂ BẮT ĐẦU',skipIntro:'BỎ QUA MỞ ĐẦU',manifestoLead:'KHÁC BIỆT NẰM Ở CHỈ ĐẠO',notJust:'KHÔNG CHỈ',generatedWord:'TẠO RA',directedWord:'MÀ ĐƯỢC ĐẠO DIỄN',ideaLabel:'MỘT Ý NIỆM',ideaWord:'HÌNH DUNG',directionLabel:'BẰNG CHỦ ĐÍCH',directionWord:'ĐỊNH HÌNH',feelingLabel:'BỞI CON NGƯỜI',feelingWord:'CẢM NHẬN',mediumLine:'AI là chất liệu',resultLine:'Cảm xúc là kết quả',selectedWork:'DỰ ÁN TIÊU BIỂU',viewAllWork:'KHÁM PHÁ TẤT CẢ DỰ ÁN',moreAbout:'TÌM HIỂU THÊM VỀ CÁCH TÔI LÀM VIỆC',storiesLine:'Những dự án',watchingLine:'đáng nhớ',workBody:'Tuyển chọn các dự án quảng cáo, điện ảnh và kể chuyện bằng nhân vật. Mỗi dự án mở ra một case study ngắn.',filterAll:'TẤT CẢ DỰ ÁN',filterCommercial:'QUẢNG CÁO',filterCinematic:'ĐIỆN ẢNH',filterStory:'KỂ CHUYỆN',typePet:'Quảng cáo thức ăn thú cưng',typeProduct:'Quảng cáo sản phẩm',typeAuto:'Điện ảnh ô tô',typeShort:'Phim ngắn tâm lý',typeLifestyle:'Quảng cáo phong cách sống',typeExperiment:'Thử nghiệm điện ảnh',aboutLabel:'GIỚI THIỆU',aboutHeadlineA:'Giữa một ý tưởng',aboutHeadlineB:'và một cảm xúc',aboutLead:'Tôi là Logan Huynh, nhà sáng tạo video AI tập trung vào kể chuyện điện ảnh, quảng cáo sản phẩm và phát triển hình ảnh.',aboutBody:'Từ ý tưởng, prompt, chỉ đạo khung hình đến thành phẩm, mỗi dự án đều hướng đến một điều: khiến ý tưởng trở nên chân thật.',contactLabel:'LIÊN HỆ',contactHeadlineA:'Bạn có một câu chuyện',contactHeadlineB:'muốn kể?',contactBody:'Hãy cùng biến nó thành điều khiến người xem ghi nhớ.',startConversation:'BẮT ĐẦU TRAO ĐỔI',contactNote:'Thông tin liên hệ sẽ được cập nhật trước khi ra mắt.',footerRole:'NHÀ SÁNG TẠO VIDEO AI · VIỆT NAM',backTop:'VỀ ĐẦU TRANG ↑',factRole:'VAI TRÒ',factTools:'CÔNG CỤ',factYear:'NĂM',directionAds:'QUẢNG CÁO VIDEO AI',directionPixar:'HOẠT HÌNH 3D PIXAR · KỂ CHUYỆN',classConfidential:'KHÁCH HÀNG BẢO MẬT',selectedFrames:'KHUNG HÌNH CHỌN LỌC',classClient:'DỰ ÁN KHÁCH HÀNG',released2024:'PHÁT HÀNH 2024',directionLuxury:'QUẢNG CÁO AI · THỜI TRANG CAO CẤP',directionMomo:'HOẠT HÌNH 3D PIXAR · KỂ CHUYỆN',momoTitle:'MoMo — Lịch sử tiền tệ',storyFilm:'PHIM KỂ CHUYỆN',play:'XEM',catPet:'QUẢNG CÁO · THÚ CƯNG',catGroom:'QUẢNG CÁO · CHĂM SÓC',catAuto:'ĐIỆN ẢNH · Ô TÔ',catShort:'KỂ CHUYỆN · PHIM NGẮN',catLifestyle:'QUẢNG CÁO · PHONG CÁCH SỐNG',catExperiment:'ĐIỆN ẢNH · THỬ NGHIỆM',groomingReimagined:'CHĂM SÓC · TÁI ĐỊNH HÌNH',nightBlueMotion:'ĐÊM · XANH · CHUYỂN ĐỘNG',psychologicalStory:'MỘT CÂU CHUYỆN TÂM LÝ',changesEverything:'THAY ĐỔI TẤT CẢ',below:'BÊN DƯỚI',beneathStorm:'DƯỚI LÒNG CƠN BÃO',homeLighting:'Ánh sáng gia đình',seaCreature:'Sinh vật biển',capCreative:'CHỈ ĐẠO SÁNG TẠO',capProduction:'SẢN XUẤT VIDEO AI',capStory:'KỂ CHUYỆN HÌNH ẢNH',capProduct:'PHIM SẢN PHẨM',videoLater:'VIDEO / SẮP CÓ',pageTitle:'Logan Huynh — Portfolio video AI',pageDescription:'Phim AI điện ảnh, hình ảnh quảng cáo và những câu chuyện do Logan Huynh thực hiện.'}
};

Object.assign(translations.en,{projectCount:'05 PROJECTS · 04 CREATIVE DIRECTIONS',directionCinematic:'CINEMATIC STORYTELLING',comingNext:'COMING NEXT',viewCase:'VIEW CASE',luxuryTitle:'Luxury Fashion',luxurySummary:'An ultra-real fashion film shaped around Parisian elegance, status and quiet confidence.',momoSummary:'A time-travel story that makes the evolution of human exchange feel like an entertaining branded adventure.',quality2k:'SET PLAYBACK QUALITY TO 2K FOR THE BEST EXPERIENCE'});
Object.assign(translations.vi,{projectCount:'05 DỰ ÁN · 04 HƯỚNG SÁNG TẠO',directionCinematic:'KỂ CHUYỆN ĐIỆN ẢNH',comingNext:'SẮP CÓ',viewCase:'XEM HỒ SƠ',luxuryTitle:'Thời trang xa xỉ',luxurySummary:'Phim thời trang siêu thực được định hình bởi vẻ thanh lịch Paris, vị thế và sự tự tin kín đáo.',momoSummary:'Chuyến du hành thời gian biến lịch sử giao dịch của con người thành một cuộc phiêu lưu thương hiệu đầy cuốn hút.',quality2k:'CHỈNH CHẤT LƯỢNG LÊN 2K ĐỂ CÓ TRẢI NGHIỆM TỐT NHẤT'});

Object.assign(translations.en,{wordmarkClaim:'IMAGINED WORLDS · HUMAN DIRECTION',homePositionLabel:'CREATIVE POSITION',homePositionA:'AI films with',homePositionB:'human intent',homePositionBody:'I direct cinematic AI films for products, brands and stories — from the first idea to the final frame.',homeExplore:'EXPLORE SELECTED PROJECTS',homeCapabilitiesLabel:'WHAT I DIRECT',homeCapabilitiesA:'One vision',homeCapabilitiesB:'Three expressions',homeCapabilitiesBody:'The format changes. The standard of visual direction does not.',serviceAds:'AI PRODUCT COMMERCIALS',serviceAdsBody:'Product-led films shaped for campaigns, social and launch moments.',serviceStory:'CINEMATIC STORYTELLING',serviceStoryBody:'Character and atmosphere built around a story people want to finish.',serviceVisual:'AI VISUAL DEVELOPMENT',serviceVisualBody:'Concepts, storyboards and consistent visual systems before production begins.',homeMethodLabel:'THE METHOD',homeMethodA:'AI makes more possible',homeMethodB:'Direction makes it matter',homeMethodBody:'Technology can render a frame. The part that holds attention is still the idea, the rhythm and an understanding of how people feel.',methodConcept:'CONCEPT',methodStoryboard:'STORYBOARD',methodProduction:'AI PRODUCTION',methodEdit:'EDIT & DELIVERY',homeAboutCta:'SEE HOW I WORK',homeProofLabel:'PROJECT ARCHIVE',homeProofA:'Enter the work',homeProofB:'through direction',homeProofBody:'A living archive of commercials, cinematic stories and character-led worlds — built one completed case at a time.',homeExploreArchive:'ENTER THE PROJECT ARCHIVE',homeStartProject:'START A PROJECT'});
Object.assign(translations.vi,{wordmarkClaim:'THẾ GIỚI TƯỞNG TƯỢNG · CHỈ ĐẠO BỞI CON NGƯỜI',homePositionLabel:'ĐỊNH VỊ SÁNG TẠO',homePositionA:'Phim AI mang',homePositionB:'chủ đích con người',homePositionBody:'Tôi chỉ đạo phim AI điện ảnh cho sản phẩm, thương hiệu và câu chuyện — từ ý tưởng đầu tiên đến khung hình cuối.',homeExplore:'KHÁM PHÁ DỰ ÁN TIÊU BIỂU',homeCapabilitiesLabel:'NĂNG LỰC SÁNG TẠO',homeCapabilitiesA:'Một tầm nhìn',homeCapabilitiesB:'Ba cách thể hiện',homeCapabilitiesBody:'Định dạng có thể thay đổi. Tiêu chuẩn chỉ đạo hình ảnh thì không.',serviceAds:'QUẢNG CÁO SẢN PHẨM BẰNG AI',serviceAdsBody:'Phim lấy sản phẩm làm trung tâm cho chiến dịch, mạng xã hội và thời điểm ra mắt.',serviceStory:'KỂ CHUYỆN ĐIỆN ẢNH',serviceStoryBody:'Nhân vật và bầu không khí được xây quanh một câu chuyện khiến người xem muốn theo dõi đến cùng.',serviceVisual:'PHÁT TRIỂN HÌNH ẢNH BẰNG AI',serviceVisualBody:'Ý tưởng, storyboard và hệ thống hình ảnh nhất quán trước khi bước vào sản xuất.',homeMethodLabel:'PHƯƠNG PHÁP',homeMethodA:'AI mở rộng khả năng',homeMethodB:'Chỉ đạo tạo nên giá trị',homeMethodBody:'Công nghệ có thể kết xuất một khung hình. Điều giữ người xem ở lại vẫn là ý tưởng, nhịp điệu và sự thấu hiểu cảm xúc con người.',methodConcept:'Ý TƯỞNG',methodStoryboard:'BẢNG PHÂN CẢNH',methodProduction:'SẢN XUẤT AI',methodEdit:'DỰNG & BÀN GIAO',homeAboutCta:'XEM CÁCH TÔI LÀM VIỆC',homeProofLabel:'KHO DỰ ÁN',homeProofA:'Bước vào tác phẩm',homeProofB:'qua lăng kính chỉ đạo',homeProofBody:'Một kho lưu trữ sống của quảng cáo, câu chuyện điện ảnh và thế giới nhân vật — được hoàn thiện từng hồ sơ một.',homeExploreArchive:'BƯỚC VÀO KHO DỰ ÁN',homeStartProject:'BẮT ĐẦU MỘT DỰ ÁN'});

Object.assign(translations.en,{brandRole:'AI VIDEO DIRECTOR & CREATOR',introRole:'AI VIDEO DIRECTOR & CREATOR · VIETNAM',footerRole:'AI VIDEO DIRECTOR & CREATOR · VIETNAM',directorCut:"DIRECTOR'S MARK · 001",coreConcept:'CONCEPT',coreCamera:'CAMERA',coreFeeling:'FEELING',pageTitle:'Logan Huynh — AI Video Director & Creator'});
Object.assign(translations.vi,{brandRole:'ĐẠO DIỄN & NHÀ SÁNG TẠO VIDEO AI',introRole:'ĐẠO DIỄN & NHÀ SÁNG TẠO VIDEO AI · VIỆT NAM',footerRole:'ĐẠO DIỄN & NHÀ SÁNG TẠO VIDEO AI · VIỆT NAM',directorCut:'DẤU ẤN ĐẠO DIỄN · 001',coreConcept:'Ý TƯỞNG',coreCamera:'MÁY QUAY',coreFeeling:'CẢM XÚC',pageTitle:'Logan Huynh — Đạo diễn & Nhà sáng tạo video AI'});

const exactHomeTranslations={'LIGHT':'ÁNH SÁNG'};
function applyExactHomeTranslations(){
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
  while(walker.nextNode()){
    const node=walker.currentNode;
    const parent=node.parentElement;
    if(!parent||parent.closest('script,style,[data-i18n]'))continue;
    const raw=node.nodeValue;
    const core=raw.trim();
    if(!node.__englishInterfaceText&&exactHomeTranslations[core])node.__englishInterfaceText=core;
    if(!node.__englishInterfaceText)continue;
    const leading=raw.match(/^\s*/)?.[0]||'';
    const trailing=raw.match(/\s*$/)?.[0]||'';
    node.nodeValue=leading+(language==='vi'?exactHomeTranslations[node.__englishInterfaceText]:node.__englishInterfaceText)+trailing;
  }
}

const projects={
yippypets:{cat:['COMMERCIAL · PET CARE','QUẢNG CÁO · THÚ CƯNG'],title:'YippyPets',summary:['A warm product story built around the emotional shift from hesitation to happiness.','Câu chuyện sản phẩm ấm áp về sự chuyển đổi cảm xúc từ ngập ngừng sang vui vẻ.'],role:['Concept · AI direction · Edit','Ý tưởng · Chỉ đạo AI · Dựng phim'],tools:'Kling · OpenArt'},
beard:{cat:['COMMERCIAL · GROOMING','QUẢNG CÁO · CHĂM SÓC'],title:'Beard Color Comb',summary:['A product-led visual demonstrating a cleaner grooming experience without feeling like a tutorial.','Phim sản phẩm thể hiện trải nghiệm chăm sóc gọn gàng mà không mang cảm giác video hướng dẫn.'],role:['Concept · AI production','Ý tưởng · Sản xuất AI'],tools:'Kling · Image generation'},
mercedes:{cat:['CINEMATIC · AUTOMOTIVE','ĐIỆN ẢNH · Ô TÔ'],title:'Mercedes S650',summary:['A blue-toned night drive shaped through fog, wet asphalt and controlled camera movement.','Chuyến đi đêm tông xanh với sương mù, mặt đường ướt và chuyển động máy quay có kiểm soát.'],role:['Visual direction · AI video','Chỉ đạo hình ảnh · Video AI'],tools:'Kling · Post-production'},
mia:{cat:['STORYTELLING · SHORT FILM','KỂ CHUYỆN · PHIM NGẮN'],title:'Mia',summary:['A psychological story built around memory, identity and the uneasy silence of a hospital corridor.','Câu chuyện tâm lý xoay quanh ký ức, danh tính và sự im lặng bất an trong hành lang bệnh viện.'],role:['Story · Direction · AI production','Kịch bản · Đạo diễn · Sản xuất AI'],tools:'Image generation · AI video'},
lighting:{cat:['COMMERCIAL · LIFESTYLE','QUẢNG CÁO · PHONG CÁCH SỐNG'],title:'Home Lighting',summary:['A concise visual argument for replacing harsh overhead light with a calmer atmosphere.','Một lập luận hình ảnh súc tích về việc thay ánh sáng trần gay gắt bằng không gian dịu hơn.'],role:['Concept · AI direction','Ý tưởng · Chỉ đạo AI'],tools:'AI image · AI video'},
creature:{cat:['CINEMATIC · EXPERIMENT','ĐIỆN ẢNH · THỬ NGHIỆM'],title:'Sea Creature',summary:['A kinetic storm sequence exploring scale, impact and camera movement at sea.','Một cảnh bão giàu động năng, khám phá quy mô, va chạm và chuyển động máy quay trên biển.'],role:['Concept · Shot direction','Ý tưởng · Chỉ đạo khung hình'],tools:'Seedance · Post-production'}
};

let language=localStorage.getItem('lh-language')||'en';
const motionEnabled=true;
const languageButton=document.querySelector('.language-switch');
function applyLanguage(){
  document.documentElement.lang=language;
  document.querySelectorAll('[data-i18n]').forEach(node=>{const value=translations[language][node.dataset.i18n];if(value)node.textContent=language==='vi'?value.replace(/case study/gi,'hồ sơ dự án').replace(/brief/gi,'đề bài').replace(/grooming/gi,'chăm sóc'):value});
  document.querySelectorAll('[data-i18n-aria]').forEach(node=>{const value=translations[language][node.dataset.i18nAria];if(value)node.setAttribute('aria-label',value)});
  document.title=translations[language].pageTitle;
  document.querySelector('meta[name="description"]')?.setAttribute('content',translations[language].pageDescription);
  applyExactHomeTranslations();
  document.querySelector('.lang-en').classList.toggle('active',language==='en');
  document.querySelector('.lang-vi').classList.toggle('active',language==='vi');
}
languageButton.addEventListener('click',()=>{language=language==='en'?'vi':'en';localStorage.setItem('lh-language',language);applyLanguage()});
applyLanguage();

const deviceMemory=navigator.deviceMemory||8;
const processorCount=navigator.hardwareConcurrency||8;
document.documentElement.classList.toggle('performance-lite',deviceMemory<=4||processorCount<=4);

const intro=document.querySelector('.motion-intro');
const logo=document.querySelector('.logo-scene');
const monogram=document.querySelector('.monogram');
const nameFirst=document.querySelector('.name-first');
const nameLast=document.querySelector('.name-last');
const manifesto=document.querySelector('.manifesto');
const copyLeft=document.querySelector('.scene-copy-left');
const copyRight=document.querySelector('.scene-copy-right');
const storyThread=document.querySelector('.story-thread');
const storyPath=storyThread.querySelector('path');
const storyDots=[...storyThread.querySelectorAll('circle')];
const storyPlanes=[...document.querySelectorAll('.story-plane')];
const storyStatement=document.querySelector('.story-statement');
const storyPortal=document.querySelector('.story-portal');
const message=document.querySelector('.message-text');
let targetProgress=0,currentProgress=0,mouseX=0,mouseY=0,pointerTargetX=0,pointerTargetY=0,lastFrame=performance.now(),introActive=true;
function updateScrollTarget(){const max=Math.max(1,intro.offsetHeight-innerHeight);targetProgress=clamp((scrollY-intro.offsetTop)/max)}
function updateScene(p){
  document.documentElement.style.setProperty('--intro-progress',p.toFixed(4));
  const reveal=smooth(range(p,.008,.065));
  const identityExit=smooth(range(p,.25,.36));
  copyLeft.style.opacity=(reveal*(1-smooth(range(p,.235,.32)))).toFixed(3);
  copyLeft.style.transform=`translate3d(0,${mix(34,0,reveal)-identityExit*24}px,0)`;
  const copyReveal=smooth(range(p,.035,.095));
  copyRight.style.opacity=(copyReveal*(1-smooth(range(p,.235,.32)))).toFixed(3);
  copyRight.style.transform=`translate3d(0,${mix(30,0,copyReveal)-identityExit*18}px,0)`;
  const logoScale=mix(.78,1.03,smooth(range(p,0,.17)))*(1-.24*smooth(range(p,.24,.39)));
  const logoZ=mix(-100,90,smooth(range(p,.02,.19)))-identityExit*330;
  logo.style.opacity=(1-identityExit).toFixed(3);
  logo.style.transform=`translate(-50%,-50%) perspective(1200px) translateZ(${logoZ}px) rotateX(${mouseY+p*9}deg) rotateY(${mouseX-p*16}deg) scale(${logoScale})`;
  const split=smooth(range(p,.22,.38));
  nameFirst.style.transform=`translate3d(${-split*72}%,${-split*12}%,${22+split*150}px) rotateY(${-split*28}deg)`;
  nameLast.style.transform=`translate3d(${split*72}%,${split*12}%,${-5+split*90}px) rotateY(${split*28}deg)`;
  monogram.style.opacity=(1-identityExit).toFixed(3);
  const manifestoIn=smooth(range(p,.245,.32));
  const manifestoOut=smooth(range(p,.515,.60));
  manifesto.style.opacity=(manifestoIn*(1-manifestoOut)).toFixed(3);
  manifesto.style.transform=`translate3d(-50%,${mix(42,0,manifestoIn)-manifestoOut*35}px,${mix(-240,80,manifestoIn)-manifestoOut*220}px) scale(${mix(.9,1,manifestoIn)})`;
  const journeyIn=smooth(range(p,.565,.65));
  const journeySet=smooth(range(p,.62,.86));
  /* The final frame is no longer a static box. The last part of the Intro is
     a continuous camera move through that frame into the first Home scene. */
  const portalApproach=smooth(range(p,.89,.955));
  const portalPass=smooth(range(p,.948,1));
  const journeyOut=smooth(range(p,.938,.992));
  storyThread.style.opacity=(journeyIn*(1-journeyOut)).toFixed(3);
  storyThread.style.transform=`translate3d(-50%,-50%,${mix(-620,10,journeyIn)+portalPass*620}px) rotateX(${mix(42,0,journeySet)-portalPass*5+mouseY*.1}deg) rotateY(${mouseX*.08+portalPass*3}deg) scale(${mix(.62,1,journeyIn)*(1+portalPass*.95)})`;
  storyPath.style.strokeDashoffset=String(mix(1,0,smooth(range(p,.59,.87))));
  storyDots.forEach((dot,i)=>{dot.style.opacity=(smooth(range(p,.64+i*.055,.70+i*.055))*(1-journeyOut)).toFixed(3)});
  // Anchor the first plane to the visible beginning of the story path. On
  // narrow screens it moves inward just enough to keep the complete card in
  // frame, while preserving the lower-left -> centre -> upper-right rhythm.
  const compactJourney=innerWidth<=650;
  const positions=compactJourney
    ?[[-23,12,75,-18],[-1,8,120,3],[23,-7,165,17]]
    :[[-31,12,75,-18],[-1,8,120,3],[27,-7,165,17]];
  storyPlanes.forEach((plane,i)=>{
    const enter=smooth(range(p,.61+i*.055,.70+i*.055));
    const [x,y,z,ry]=positions[i];
    const planePass=smooth(range(p,.918+i*.011,.978+i*.006));
    const planeFade=smooth(range(p,.95+i*.006,.994));
    plane.style.opacity=(enter*(1-planeFade)).toFixed(3);
    plane.style.transform=`translate3d(calc(-50% + ${mix(i===0?-50:i===2?50:0,x,journeySet)+(i-1)*planePass*24}vw),calc(-50% + ${mix(i===0?22:i===2?-18:0,y,journeySet)+(i===1?4:-3)*planePass}vh),${mix(-760,z,enter)+planePass*(980+i*190)}px) rotateY(${mix(i===0?66:i===2?-66:38,ry,journeySet)+mouseX*.12+(i-1)*planePass*24}deg) rotateX(${mix(-24,0,journeySet)+mouseY*.1-planePass*5}deg) scale(${mix(.48,1,enter)*(1+planePass*(1.25+i*.28))})`;
  });
  const statementIn=smooth(range(p,.82,.89));
  const statementOut=smooth(range(p,.925,.968));
  storyStatement.style.opacity=(statementIn*(1-statementOut)).toFixed(3);
  storyStatement.style.transform=`translate3d(-50%,${mix(36,0,statementIn)-statementOut*26}px,${mix(-180,65,statementIn)+statementOut*220}px) scale(${1+statementOut*.14})`;
  const portalIn=smooth(range(p,.84,.91));
  storyPortal.style.setProperty('--portal-pass',portalPass.toFixed(4));
  storyPortal.style.borderColor=`rgba(238,240,235,${(.42*(1-portalPass)).toFixed(3)})`;
  storyPortal.style.opacity=portalIn.toFixed(3);
  storyPortal.style.transform=`translate3d(-50%,-50%,${mix(-460,24,portalIn)+portalApproach*170+portalPass*610}px) rotateX(${mix(34,0,portalIn)-portalPass*1.5}deg) rotateY(${mouseX*.035*(1-portalPass)}deg) scale(${mix(.32,1,portalIn)*(1+portalApproach*.34+portalPass*4.8)})`;
  const slot=p<.12?0:p<.55?1:p<.69?2:p<.84?3:4;
  document.querySelector('.message-index').textContent=['01','02','03','04','05'][slot];
  const labels=language==='en'?['MEET THE CREATOR','NOT JUST GENERATED','AN IDEA EMERGES','INTENT GIVES IT FORM','FEELING MAKES IT STAY']:['GẶP GỠ NHÀ SÁNG TẠO','KHÔNG CHỈ LÀ TẠO RA','MỘT Ý NIỆM XUẤT HIỆN','CHỦ ĐÍCH TẠO NÊN HÌNH HÀI','CẢM XÚC KHIẾN NÓ Ở LẠI'];
  message.textContent=labels[slot];
}
function animate(now){
  const dt=Math.min(.032,(now-lastFrame)/1000||.016);lastFrame=now;
  if(motionEnabled){
    const scrollDamp=1-Math.exp(-dt*7.4);
    const pointerDamp=1-Math.exp(-dt*9.5);
    currentProgress+=(targetProgress-currentProgress)*scrollDamp;
    mouseX+=(pointerTargetX-mouseX)*pointerDamp;mouseY+=(pointerTargetY-mouseY)*pointerDamp;
    if(introActive||Math.abs(targetProgress-currentProgress)>.0001)updateScene(currentProgress);
    if(introActive)drawAtmosphere(dt);
  }
  requestAnimationFrame(animate);
}
addEventListener('scroll',updateScrollTarget,{passive:true});addEventListener('resize',updateScrollTarget);updateScrollTarget();updateScene(0);
addEventListener('pointermove',event=>{if(!motionEnabled)return;pointerTargetX=(event.clientX/innerWidth-.5)*11;pointerTargetY=(.5-event.clientY/innerHeight)*8},{passive:true});

const canvas=document.querySelector('#atmosphere'),ctx=canvas.getContext('2d');let particles=[];
function sizeCanvas(){const d=Math.min(devicePixelRatio||1,1.25);canvas.width=innerWidth*d;canvas.height=innerHeight*d;canvas.style.width=innerWidth+'px';canvas.style.height=innerHeight+'px';ctx.setTransform(d,0,0,d,0,0);particles=Array.from({length:Math.min(46,Math.floor(innerWidth/26))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.25+.25,v:(Math.random()-.5)*.14,a:Math.random()*.42+.08}))}
function drawAtmosphere(dt){ctx.clearRect(0,0,innerWidth,innerHeight);const step=Math.min(2,dt*60);particles.forEach((p,i)=>{p.y+=p.v*step;if(p.y<0)p.y=innerHeight;if(p.y>innerHeight)p.y=0;ctx.beginPath();ctx.fillStyle=`rgba(${i%8===0?'115,229,221':'220,224,224'},${p.a})`;ctx.arc(p.x+mouseX*2*p.r,p.y+mouseY*2*p.r,p.r,0,Math.PI*2);ctx.fill()})}
const introObserver=new IntersectionObserver(([entry])=>{introActive=entry.isIntersecting},{rootMargin:'10% 0px'});introObserver.observe(intro);
sizeCanvas();addEventListener('resize',sizeCanvas);requestAnimationFrame(animate);

document.querySelectorAll('.project-card[data-project]').forEach(card=>{
  card.classList.add('reveal');
  const plane=card.querySelector('.project-plane');
  card.addEventListener('pointermove',event=>{if(!motionEnabled||innerWidth<700)return;const r=card.getBoundingClientRect();plane.style.setProperty('--tilt-x',`${((event.clientX-r.left)/r.width-.5)*8}deg`);plane.style.setProperty('--tilt-y',`${((.5-(event.clientY-r.top)/r.height))*7}deg`)});
  card.addEventListener('pointerleave',()=>{plane.style.setProperty('--tilt-x','0deg');plane.style.setProperty('--tilt-y','0deg')});
  const open=()=>openProject(card.dataset.project);card.addEventListener('click',open);card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}});
});
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -5% 0px'});
document.querySelectorAll('.reveal').forEach(node=>revealObserver.observe(node));

document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));button.classList.add('active');
  document.querySelectorAll('.project-card').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter;if(!card.hidden)card.classList.add('is-visible')});
}));
const dialog=document.querySelector('.project-dialog');
function openProject(key){const p=projects[key];if(!p)return;const i=language==='en'?0:1;const viTitles={'Beard Color Comb':'Lược nhuộm râu','Home Lighting':'Ánh sáng gia đình','Sea Creature':'Sinh vật biển'};const viTools={'Image generation':'Tạo hình ảnh','AI image':'Ảnh AI','Post-production':'Hậu kỳ'};document.querySelector('#dialog-title').textContent=language==='vi'?(viTitles[p.title]||p.title):p.title;document.querySelector('#dialog-category').textContent=p.cat[i];document.querySelector('#dialog-summary').textContent=p.summary[i];document.querySelector('#dialog-role').textContent=p.role[i];document.querySelector('#dialog-tools').textContent=language==='vi'?p.tools.split(' · ').map(tool=>viTools[tool]||tool).join(' · '):p.tools;dialog.showModal();document.body.style.overflow='hidden'}
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});dialog.addEventListener('close',()=>{document.body.style.overflow=''});
