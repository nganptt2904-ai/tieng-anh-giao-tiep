const CACHE='tienganh-c5d74ce3b0dc';
const FILES=["icons/apple-touch-icon.png","icons/icon-192.png","icons/icon-512.png","icons/icon-maskable-512.png","index.html","luyen_noi.html","luyen_viet.html","manifest.webmanifest","meta_01_doi_song_hang_ngay.html","meta_02_cau_truc_giao_tiep.html","ngu_phap_nen.html","nguyen_am.html","phat_am_ipa.html","./"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET') return;
  const u=new URL(r.url); if(u.origin!==location.origin) return;
  e.respondWith(fetch(r,{cache:'no-store'}).then(resp=>{ if(resp&&resp.ok){ const cp=resp.clone(); caches.open(CACHE).then(c=>c.put(r,cp)); } return resp; }).catch(()=>caches.match(r,{ignoreSearch:true})));  // ưu tiên mạng: thu hồi người có hiệu lực ngay khi máy online; offline thì dùng bản đã lưu
});
