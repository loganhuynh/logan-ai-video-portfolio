(()=>{
  const body=document.body;
  const videoId=body.dataset.filmId;
  if(!videoId)return;

  const dialog=document.createElement('dialog');
  dialog.className='cinema-player';
  dialog.setAttribute('aria-label',body.dataset.filmTitleEn||'Film player');
  dialog.innerHTML=`
    <div class="cinema-player-bar">
      <div><span data-en="NOW PLAYING" data-vi="ĐANG PHÁT">NOW PLAYING</span><strong></strong></div>
      <button type="button" data-close-cinema aria-label="Close film">×</button>
    </div>
    <div class="cinema-player-screen" data-cinema-screen></div>
    <div class="cinema-quality-note" data-quality-note>
      <b>2K / 1440P</b>
      <span data-en="For the intended visual experience, set YouTube quality to 2K" data-vi="Để có trải nghiệm hình ảnh tốt nhất, hãy chỉnh chất lượng YouTube lên 2K">For the intended visual experience, set YouTube quality to 2K</span>
    </div>`;
  body.appendChild(dialog);

  const title=dialog.querySelector('.cinema-player-bar strong');
  const screen=dialog.querySelector('[data-cinema-screen]');
  const note=dialog.querySelector('[data-quality-note]');
  let noteTimer=0;

  function localizedTitle(){
    return document.documentElement.lang==='vi'?(body.dataset.filmTitleVi||body.dataset.filmTitleEn):(body.dataset.filmTitleEn||'');
  }

  function syncLanguage(){
    const vi=document.documentElement.lang==='vi';
    title.textContent=localizedTitle();
    dialog.setAttribute('aria-label',localizedTitle());
    dialog.querySelector('[data-close-cinema]').setAttribute('aria-label',vi?'Đóng video':'Close film');
    dialog.querySelectorAll('[data-en][data-vi]').forEach(node=>{node.textContent=node.dataset[vi?'vi':'en']});
    const frame=screen.querySelector('iframe');
    if(frame)frame.title=localizedTitle();
  }

  function openFilm(){
    syncLanguage();
    if(!screen.querySelector('iframe')){
      const frame=document.createElement('iframe');
      frame.src=`https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0&modestbranding=1`;
      frame.title=localizedTitle();
      frame.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      frame.allowFullscreen=true;
      screen.appendChild(frame);
    }
    dialog.showModal();
    body.classList.add('cinema-open');
    note.classList.remove('is-hidden');
    clearTimeout(noteTimer);
    noteTimer=setTimeout(()=>note.classList.add('is-hidden'),5200);
  }

  function closeFilm(){
    if(dialog.open)dialog.close();
  }

  document.querySelectorAll('[data-play-film]').forEach(button=>button.addEventListener('click',openFilm));
  dialog.querySelector('[data-close-cinema]').addEventListener('click',closeFilm);
  dialog.addEventListener('click',event=>{if(event.target===dialog)closeFilm()});
  dialog.addEventListener('close',()=>{
    clearTimeout(noteTimer);
    screen.replaceChildren();
    body.classList.remove('cinema-open');
  });
  new MutationObserver(syncLanguage).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
})();
