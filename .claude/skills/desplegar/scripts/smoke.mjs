import puppeteer from 'puppeteer-core';
const routes=['dashboard','modulos','modulos/modulo-1','modulos/modulo-80','juegos','juegos/memory','juegos/word-quiz','oficial','oficial/A1','examenes/generador','gramatica','diccionarios','memoria','pronunciacion','login'];
const b = await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless:'new'});
const p = await b.newPage(); await p.setViewport({width:1280,height:800});
let errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.goto('https://sergibauli.github.io/ai-espanol/'); await p.evaluate(()=>{sessionStorage.setItem('dele_auth','true');sessionStorage.setItem('dele_expiry',String(Date.now()+864e5));});
for (const r of routes){ errs=[]; await p.goto('about:blank'); await p.goto('https://sergibauli.github.io/ai-espanol/#/'+r,{waitUntil:'networkidle2'}); await new Promise(x=>setTimeout(x,2500));
 const t=await p.evaluate(()=>document.body.innerText.length); const crash=await p.evaluate(()=>document.body.innerText.includes('Algo salió mal'));
 console.log(r.padEnd(22), 'texto', t, crash?'CRASH':'', errs.slice(0,2).join(' | ').slice(0,200)); }
await b.close();
