(()=>{
  const send=(name,params={})=>{
    if(typeof window.gtag==='function')window.gtag('event',name,params);
  };

  const pagePath=location.pathname;
  let introSkipped=false;
  let introCompleted=false;

  document.addEventListener('click',event=>{
    const target=event.target instanceof Element?event.target:null;
    if(!target)return;

    if(target.closest('.language-switch')){
      setTimeout(()=>send('language_change',{
        language:document.documentElement.lang||'en',
        page_path:pagePath
      }),0);
    }

    if(target.closest('.skip-intro')){
      introSkipped=true;
      send('intro_skip',{page_path:pagePath});
    }

    if(target.closest('[data-play-film]')){
      send('film_open',{
        film_title:document.body.dataset.filmTitleEn||document.title,
        page_path:pagePath
      });
    }

    const link=target.closest('a[href]');
    if(!link)return;
    const href=link.getAttribute('href')||'';
    if(href.startsWith('mailto:')){
      send('contact_email_click',{page_path:pagePath});
      return;
    }

    const url=new URL(link.href,location.href);
    if(url.hostname.includes('upwork.com')){
      send('upwork_click',{destination:url.hostname,page_path:pagePath});
    }
    if(url.origin===location.origin&&url.pathname.includes('/projects/')){
      send('project_open',{project_path:url.pathname,source_path:pagePath});
    }
  });

  window.addEventListener('portfolio:scenechange',event=>{
    const detail=event.detail||{};
    send('scene_view',{
      scene_index:detail.index,
      scene_total:detail.total,
      scene_title:detail.title||'',
      site_route:detail.route||pagePath
    });
  });

  const firstStoryScene=document.querySelector('.cinematic-deck');
  if(firstStoryScene&&'IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>{
      if(introCompleted||introSkipped||!entries.some(entry=>entry.isIntersecting))return;
      introCompleted=true;
      send('intro_complete',{page_path:pagePath});
      observer.disconnect();
    },{threshold:.35});
    observer.observe(firstStoryScene);
  }
})();
