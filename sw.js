const CACHE='drama-v4';
const ASSETS=['./manifest.json','./icon-192.png','./icon-512.png'];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).catch(()=>{}));
  self.skipWaiting();
});

self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch',e=>{
  const req=e.request;
  const url=req.url;
  // API 请求直接走网络，不缓存
  if(url.includes('volces.com')||url.includes('ark.cn')||url.includes('workers.dev')||url.includes('supabase.co')||url.includes('translate.google.com'))return;

  // HTML / 导航请求：网络优先（保证每次拿到最新版），失败再回退缓存
  const isHTML=req.mode==='navigate'||url.endsWith('/')||url.endsWith('index.html');
  if(isHTML){
    e.respondWith(
      fetch(req).then(res=>{
        if(res&&res.status===200){const clone=res.clone();caches.open(CACHE).then(c=>c.put(req,clone));}
        return res;
      }).catch(()=>caches.match(req).then(c=>c||caches.match('./index.html')))
    );
    return;
  }

  // 其它静态资源：缓存优先
  e.respondWith(
    caches.match(req).then(cached=>cached||fetch(req).then(res=>{
      if(res&&res.status===200&&res.type==='basic'){const clone=res.clone();caches.open(CACHE).then(c=>c.put(req,clone));}
      return res;
    }).catch(()=>{}))
  );
});
