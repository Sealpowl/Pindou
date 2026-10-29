const V="pindou-v1",SHELL=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
 const r=e.request;if(r.method!=="GET")return;
 const u=new URL(r.url),same=u.origin===location.origin;
 if(!same&&u.hostname!=="cdn.jsdelivr.net")return;
 const net=()=>fetch(r).then(res=>{if(res.ok||res.type==="opaque"){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res});
 e.respondWith(caches.match(r,{ignoreSearch:same}).then(h=>{
  if(h){if(same)net().catch(()=>{});return h}
  return net().catch(()=>same?caches.match("./index.html"):Response.error())}))});
