if(!self.define){let s,i={};const n=(n,l)=>(n=new URL(n+".js",l).href,i[n]||new Promise((i=>{if("document"in self){const s=document.createElement("script");s.src=n,s.onload=i,document.head.appendChild(s)}else s=n,importScripts(n),i()})).then((()=>{let s=i[n];if(!s)throw new Error(`Module ${n} didn’t register its module`);return s})));self.define=(l,e)=>{const c=s||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let u={};const r=s=>n(s,c),t={module:{uri:c},exports:u,require:r};i[c]=Promise.all(l.map((s=>t[s]||r(s)))).then((s=>(e(...s),u)))}}define(["./workbox-bb2e0bf1"],(function(s){"use strict";s.setCacheNameDetails({prefix:"admin-plus"}),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"index.html",revision:"f91a6514b1046fc6470b6f21e417a3f7"},{url:"json/china.json",revision:"32a9d07a4892a8ad7666cb6c4d1a4bdb"},{url:"manifest.json",revision:"76b3625bb9dd0cf9b7e3873b860c21ed"},{url:"static/css/379.5938258e.css",revision:null},{url:"static/css/app.fe879200.css",revision:null},{url:"static/css/element-plus.c2900a8d.css",revision:null},{url:"static/css/loading.css",revision:"deb843e8a179e15d936633e759d8d308"},{url:"static/css/vab-chunk-00833fa6.474de4bb.css",revision:null},{url:"static/css/vab-chunk-02ec2db9.f8856825.css",revision:null},{url:"static/css/vab-chunk-1656f0b4.b9744379.css",revision:null},{url:"static/css/vab-chunk-4a74ea38.66ed92d6.css",revision:null},{url:"static/css/vab-chunk-4e2fb6b0.a4ed3b73.css",revision:null},{url:"static/css/vab-chunk-8cbd2506.9f2f6fde.css",revision:null},{url:"static/css/vab-plugins.c66f04fd.css",revision:null},{url:"static/fonts/remixicon.31d28485.f12fd1a0.eot",revision:null},{url:"static/fonts/remixicon.881fbc46.1e0fb76b.woff",revision:null},{url:"static/fonts/remixicon.888e61f0.e313410c.ttf",revision:null},{url:"static/fonts/remixicon.9915fef9.5400338c.woff2",revision:null},{url:"static/img/403.17c6c30c.png",revision:null},{url:"static/img/404.1f87f517.png",revision:null},{url:"static/img/background-1.31e3a0ac.png",revision:null},{url:"static/img/background.d7764eb5.jpg",revision:null},{url:"static/img/login_form.26aa56cf.png",revision:null},{url:"static/img/mobile.244ab3b4.png",revision:null},{url:"static/img/remixicon.95138f36.2b2ee314.svg",revision:null},{url:"static/img/user.2e7840a2.png",revision:null},{url:"static/js/221.e2a3cfbb.js",revision:null},{url:"static/js/369.8789cac4.js",revision:null},{url:"static/js/379.fcd505d0.js",revision:null},{url:"static/js/600.ae708aa9.js",revision:null},{url:"static/js/app.82e50b60.js",revision:null},{url:"static/js/element-plus.8e173f0a.js",revision:null},{url:"static/js/vab-chunk-00833fa6.9975a881.js",revision:null},{url:"static/js/vab-chunk-02ec2db9.d051ef10.js",revision:null},{url:"static/js/vab-chunk-06b9cdb9.9142cda0.js",revision:null},{url:"static/js/vab-chunk-1656f0b4.961d0f11.js",revision:null},{url:"static/js/vab-chunk-3e2fe043.b595f2a8.js",revision:null},{url:"static/js/vab-chunk-47257c03.d86e4732.js",revision:null},{url:"static/js/vab-chunk-4a74ea38.a3727f23.js",revision:null},{url:"static/js/vab-chunk-4e2fb6b0.3545f160.js",revision:null},{url:"static/js/vab-chunk-5add3539.f9a824f2.js",revision:null},{url:"static/js/vab-chunk-8cbd2506.cab63cb3.js",revision:null},{url:"static/js/vab-chunk-9386b7e9.066ee049.js",revision:null},{url:"static/js/vab-chunk-b886e5fb.a90a8c24.js",revision:null},{url:"static/js/vab-plugins.af65273b.js",revision:null}],{})}));
