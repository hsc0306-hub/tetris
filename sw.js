const V='lbb-v1',CORE=['./','./index.html','./manifest.webmanifest','./pwa/icon-192.png','./pwa/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request,u=new URL(r.url);
  if(r.method!=='GET')return;
  const cdn=/(^|\.)(jsdelivr\.net|unpkg\.com|cdnjs\.cloudflare\.com)$/.test(u.hostname);
  if(u.origin!==location.origin&&!cdn)return; /* ntfy·Supabase 등 실시간 통신은 캐시하지 않음 */
  if(r.mode==='navigate'){ /* 페이지는 네트워크 우선, 오프라인이면 저장본 */
    e.respondWith(fetch(r).then(x=>{const c=x.clone();caches.open(V).then(k=>k.put('./index.html',c));return x}).catch(()=>caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(r).then(h=>{
    const n=fetch(r).then(x=>{if(x.ok){const c=x.clone();caches.open(V).then(k=>k.put(r,c))}return x}).catch(()=>h);
    return h||n;
  }));
});
