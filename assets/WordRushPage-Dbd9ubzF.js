import{N as q,r as o,j as e,e as $,O as Y,L as D,Z as P,i as ee,T as B,H as te}from"./index-B1Itgl8O.js";import{P as ae}from"./PostGameNav-Cw3ngSd4.js";import{b as re,c as se,g as oe}from"./juegos-utils-DGaVAy9B.js";import{A as W}from"./arrow-left-DRtAbSAS.js";import{F as k}from"./flame-DssuaKkn.js";function ne({mood:a}){const i=a==="happy"||a==="excited"?-2:a==="sad"?2:0,r=a==="happy"?"M18 34 Q24 40 30 34":a==="sad"?"M18 38 Q24 32 30 38":a==="excited"?"M18 34 Q24 44 30 34 Z":"M20 36 Q24 38 28 36",s=a==="happy"||a==="excited"?.6:.3,g=a==="excited"?"mascot-excited":a==="happy"?"mascot-bounce":"mascot-float";return e.jsx("div",{className:"fixed bottom-4 right-4 z-50 pointer-events-none "+g,style:{filter:"drop-shadow(0 0 12px rgba(255,107,255,0.5))"},children:e.jsxs("svg",{width:"80",height:"80",viewBox:"0 0 48 48",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e.jsxs("defs",{children:[e.jsxs("radialGradient",{id:"bodyGrad",cx:"0.3",cy:"0.3",r:"0.8",children:[e.jsx("stop",{offset:"0%",stopColor:"#ffb6ff"}),e.jsx("stop",{offset:"100%",stopColor:"#ff6bff"})]}),e.jsxs("radialGradient",{id:"earGrad",cx:"0.5",cy:"0.2",r:"0.8",children:[e.jsx("stop",{offset:"0%",stopColor:"#ffd1ff"}),e.jsx("stop",{offset:"100%",stopColor:"#ff8eff"})]})]}),e.jsx("ellipse",{cx:"24",cy:"42",rx:"14",ry:"4",fill:"rgba(0,0,0,0.2)"}),e.jsx("ellipse",{cx:"12",cy:"10",rx:"5",ry:"8",fill:"url(#earGrad)",transform:"rotate(-20 12 10)"}),e.jsx("ellipse",{cx:"36",cy:"10",rx:"5",ry:"8",fill:"url(#earGrad)",transform:"rotate(20 36 10)"}),e.jsx("rect",{x:"10",y:"12",width:"28",height:"26",rx:"13",fill:"url(#bodyGrad)"}),e.jsx("circle",{cx:"18",cy:"28",r:"4",fill:"white"}),e.jsx("circle",{cx:"30",cy:"28",r:"4",fill:"white"}),e.jsx("circle",{cx:18,cy:28+i,r:"2.5",fill:"#1a1a2e"}),e.jsx("circle",{cx:30,cy:28+i,r:"2.5",fill:"#1a1a2e"}),e.jsx("circle",{cx:19.2,cy:27+i,r:"0.8",fill:"white"}),e.jsx("circle",{cx:31.2,cy:27+i,r:"0.8",fill:"white"}),e.jsx("path",{d:r,stroke:"#1a1a2e",strokeWidth:"1.5",strokeLinecap:"round",fill:a==="excited"?"#ff3860":"none"}),e.jsx("circle",{cx:"14",cy:"34",r:"3",fill:"#ff3860",opacity:s}),e.jsx("circle",{cx:"34",cy:"34",r:"3",fill:"#ff3860",opacity:s}),a==="excited"&&e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M8 18 L12 22 L8 26",stroke:"#ffd600",strokeWidth:"2",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",className:"sparkle-1"}),e.jsx("path",{d:"M40 18 L36 22 L40 26",stroke:"#ffd600",strokeWidth:"2",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",className:"sparkle-2"}),e.jsx("circle",{cx:"6",cy:"14",r:"1.5",fill:"#00d4ff",className:"sparkle-3"}),e.jsx("circle",{cx:"42",cy:"14",r:"1.5",fill:"#00d4ff",className:"sparkle-4"})]})]})})}function ie({active:a}){if(!a)return null;const i=Array.from({length:30},(r,s)=>({id:s,left:Math.random()*100+"%",delay:Math.random()*2+"s",duration:1.5+Math.random()*2+"s",size:4+Math.random()*8+"px",color:["#ef4444","#ffd700","#10b981","#00d4ff","#ff00aa"][Math.floor(Math.random()*5)]}));return e.jsx("div",{className:"fixed inset-0 pointer-events-none z-40 overflow-hidden",children:i.map(r=>e.jsx("div",{className:"absolute rounded-full particle-fall",style:{left:r.left,top:"-10px",width:r.size,height:r.size,background:r.color,boxShadow:"0 0 10px "+r.color,animationDelay:r.delay,animationDuration:r.duration}},r.id))})}function le({trigger:a}){const[i,r]=o.useState([]);return o.useEffect(()=>{if(a===0)return;const s=Array.from({length:40},(c,p)=>({id:a+"-"+p,x:50+(Math.random()-.5)*40,y:50+(Math.random()-.5)*30,color:["#ef4444","#ffd700","#10b981","#00d4ff","#ff00aa","#f97316"][Math.floor(Math.random()*6)],rotation:Math.random()*360,scale:.5+Math.random()*1,dx:(Math.random()-.5)*200,dy:(Math.random()-.5)*200-100}));r(s);const g=setTimeout(()=>r([]),2e3);return()=>clearTimeout(g)},[a]),i.length?e.jsx("div",{className:"fixed inset-0 pointer-events-none z-40 flex items-center justify-center",children:i.map(s=>e.jsx("div",{className:"absolute confetti-piece",style:{left:s.x+"%",top:s.y+"%",width:"10px",height:"6px",background:s.color,borderRadius:"2px",transform:"rotate("+s.rotation+"deg) scale("+s.scale+")","--dx":s.dx+"px","--dy":s.dy+"px",boxShadow:"0 0 8px "+s.color}},s.id))}):null}function de({score:a,x:i,y:r}){return e.jsxs("div",{className:"absolute pointer-events-none score-popup z-30 font-black text-lg",style:{left:i+"%",top:r+"%",color:"#ffd700",textShadow:"0 0 20px rgba(255,215,0,0.8)"},children:["+",a]})}function ce({active:a}){return a?e.jsx("div",{className:"absolute inset-0 pointer-events-none z-[5] overflow-hidden",children:Array.from({length:14}).map((i,r)=>e.jsx("div",{className:"speed-line",style:{left:5+r*7+"%",animationDelay:r*.08+"s",height:30+r%5*15+"vh",opacity:.3+r%3*.15}},r))}):null}function xe({timeLeft:a,maxTime:i}){const s=2*Math.PI*18,g=s*(1-a/i),c=a<=10?"#ef4444":"#00d4ff",p=a<=10;return e.jsxs("div",{className:"relative",style:{width:"44px",height:"44px"},children:[e.jsxs("svg",{width:"44",height:"44",viewBox:"0 0 44 44",className:p?"timer-gauge-low":"",style:{filter:"drop-shadow(0 0 8px "+c+")"},children:[e.jsx("circle",{cx:"22",cy:"22",r:18,fill:"none",stroke:"rgba(255,255,255,0.1)",strokeWidth:"3"}),e.jsx("circle",{cx:"22",cy:"22",r:18,fill:"none",stroke:c,strokeWidth:"3",strokeDasharray:s,strokeDashoffset:g,strokeLinecap:"round",transform:"rotate(-90 22 22)",style:{transition:"stroke-dashoffset 1s linear",filter:"drop-shadow(0 0 6px "+c+")"}})]}),e.jsx("div",{className:"absolute inset-0 flex items-center justify-center text-[10px] font-black "+(p?"timer-warning":""),style:{color:c},children:a})]})}function he(){const{playCorrect:a,playWrong:i,playWin:r,playLose:s,playClick:g}=q(),[c,p]=o.useState("select"),[C,w]=o.useState([]),[v,R]=o.useState(0),[b,X]=o.useState(3),[N,S]=o.useState(""),[l,I]=o.useState(0),[M,A]=o.useState(60),[u,j]=o.useState(!1),[F,pe]=o.useState(()=>{try{return parseInt(localStorage.getItem("wordrush_best")||"0")}catch{return 0}}),[Z,x]=o.useState("neutral"),[H,L]=o.useState(0),[V,G]=o.useState([]),T=o.useRef(0),O=o.useRef([]),E=o.useRef(null),U=o.useRef(0),Q=o.useCallback(t=>{g();const d=(t?re(t):se()).map(n=>({es:n.espanol.trim(),zh:n.chino.trim()})).filter(n=>n.es&&n.zh&&!n.es.includes(" "));if(d.length<5){alert("Este módulo no tiene suficientes palabras simples");return}O.current=d,R(0),X(3),I(0),A(60),w([]),S(""),p("playing"),j(!0),T.current=0,x("excited"),L(n=>n+1)},[g]);o.useEffect(()=>{if(u)return E.current=setInterval(()=>{A(t=>t<=1?(j(!1),p("gameover"),s(),x("sad"),0):t-1)},1e3),()=>{E.current&&clearInterval(E.current)}},[u,s]),o.useEffect(()=>{if(!u)return;const t=setInterval(()=>{const f=O.current;if(!f.length)return;const d=f[Math.floor(Math.random()*f.length)],n=++T.current;w(h=>[...h,{id:n,word:d.zh,translation:d.es,x:10+Math.random()*80,y:-5,speed:.3+Math.random()*.4}])},1500);return()=>clearInterval(t)},[u]),o.useEffect(()=>{if(!u)return;const t=setInterval(()=>{w(f=>f.map(n=>({...n,y:n.y+n.speed})).filter(n=>n.y>95?(X(h=>{const y=h-1;return y<=0?(j(!1),p("gameover"),s(),x("sad")):(x("sad"),setTimeout(()=>x("neutral"),600)),y}),!1):!0))},50);return()=>clearInterval(t)},[u,s]),o.useEffect(()=>{b===3&&v===0||(b<=0?x("sad"):l>=5?x("excited"):l>=2?x("happy"):x("neutral"))},[b,l,v]);const _=t=>{const f=t.target.value;S(f);const d=C.find(n=>n.translation.toLowerCase()===f.toLowerCase());if(d){a(),w(m=>m.filter(z=>z.id!==d.id)),S("");const n=l+1;I(n);const h=100+n*15;R(m=>m+h);const y=++U.current;G(m=>[...m,{id:y,score:h,x:d.x,y:d.y}]),setTimeout(()=>G(m=>m.filter(z=>z.id!==y)),1e3),n>=5&&L(m=>m+1)}},K=()=>{p("select"),j(!1),x("neutral")},J=oe();return e.jsxs($,{children:[e.jsx("style",{children:`
        @keyframes mascot-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(2deg); }
        }
        @keyframes mascot-bounce {
          0%, 100% { transform: translateY(0) scale(1); }
          25% { transform: translateY(-12px) scale(1.05); }
          50% { transform: translateY(0) scale(1); }
          75% { transform: translateY(-6px) scale(1.02); }
        }
        @keyframes mascot-excited {
          0%, 100% { transform: translateY(0) scale(1) rotate(0deg); }
          20% { transform: translateY(-15px) scale(1.1) rotate(-5deg); }
          40% { transform: translateY(0) scale(1) rotate(5deg); }
          60% { transform: translateY(-10px) scale(1.08) rotate(-3deg); }
          80% { transform: translateY(0) scale(1) rotate(3deg); }
        }
        .mascot-float { animation: mascot-float 3s ease-in-out infinite; }
        .mascot-bounce { animation: mascot-bounce 1.2s ease-in-out infinite; }
        .mascot-excited { animation: mascot-excited 0.8s ease-in-out infinite; }
        @keyframes sparkle-blink {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }
        .sparkle-1 { animation: sparkle-blink 1s ease-in-out infinite; }
        .sparkle-2 { animation: sparkle-blink 1.2s ease-in-out infinite 0.3s; }
        .sparkle-3 { animation: sparkle-blink 0.8s ease-in-out infinite 0.5s; }
        .sparkle-4 { animation: sparkle-blink 1.1s ease-in-out infinite 0.2s; }
        @keyframes particle-fall {
          0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .particle-fall { animation: particle-fall linear infinite; }
        @keyframes confetti-explode {
          0% { transform: translate(0,0) rotate(0deg); opacity: 1; }
          100% { transform: translate(var(--dx), var(--dy)) rotate(720deg); opacity: 0; }
        }
        .confetti-piece { animation: confetti-explode 1.5s ease-out forwards; }
        @keyframes score-pop {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-40px) scale(1.5); opacity: 0; }
        }
        .score-popup { animation: score-pop 1s ease-out forwards; }
        @keyframes neon-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(239,68,68,0.3), 0 0 40px rgba(239,68,68,0.1); }
          50% { box-shadow: 0 0 30px rgba(239,68,68,0.6), 0 0 60px rgba(239,68,68,0.3); }
        }
        @keyframes word-glow {
          0%, 100% { text-shadow: 0 0 10px currentColor, 0 0 20px currentColor; }
          50% { text-shadow: 0 0 20px currentColor, 0 0 40px currentColor, 0 0 60px currentColor; }
        }
        .word-glow { animation: word-glow 2s ease-in-out infinite; }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .shake { animation: shake 0.3s ease-in-out; }
        @keyframes float-word {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-3px); }
        }
        .modulo-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        .modulo-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.05) 50%, transparent 60%);
          transform: translateX(-100%);
          transition: transform 0.6s;
        }
        .modulo-card:hover::before {
          transform: translateX(100%);
        }
        .modulo-card:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3), 0 0 20px rgba(255,255,255,0.1);
        }
        .life-pulse {
          animation: life-pulse 1.5s ease-in-out infinite;
        }
        @keyframes life-pulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 4px rgba(239,68,68,0.5)); }
          50% { transform: scale(1.1); filter: drop-shadow(0 0 12px rgba(239,68,68,0.8)); }
        }
        .combo-flame {
          animation: combo-flame 0.5s ease-in-out infinite alternate;
        }
        @keyframes combo-flame {
          0% { transform: scale(1); filter: brightness(1); }
          100% { transform: scale(1.15); filter: brightness(1.3) drop-shadow(0 0 15px rgba(255,215,0,0.8)); }
        }
        .timer-warning {
          animation: timer-warning 0.5s ease-in-out infinite alternate;
        }
        @keyframes timer-warning {
          0% { color: #00d4ff; }
          100% { color: #ef4444; }
        }
        .input-glow:focus {
          box-shadow: 0 0 30px rgba(239,68,68,0.4), 0 0 60px rgba(239,68,68,0.2), inset 0 0 20px rgba(239,68,68,0.1);
          border-color: #ef4444 !important;
        }
        .game-area {
          background:
            radial-gradient(ellipse at 20% 50%, rgba(239,68,68,0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 50%, rgba(0,212,255,0.08) 0%, transparent 50%),
            linear-gradient(180deg, rgba(14,22,64,0.5), rgba(5,8,27,0.3));
          backdrop-filter: blur(10px);
        }
        .word-card {
          animation: word-entry 0.4s ease-out;
          transition: all 0.2s;
        }
        @keyframes word-entry {
          0% { transform: translateX(-50%) scale(0.5) translateY(-20px); opacity: 0; }
          100% { transform: translateX(-50%) scale(1) translateY(0); opacity: 1; }
        }
        .word-card:hover {
          transform: translateX(-50%) scale(1.05);
        }
        .title-gradient {
          background: linear-gradient(135deg, #ef4444, #f97316, #ffd700);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 30px rgba(239,68,68,0.4));
        }
        .best-score-glow {
          animation: best-score-glow 2s ease-in-out infinite;
        }
        @keyframes best-score-glow {
          0%, 100% { text-shadow: 0 0 10px rgba(16,185,129,0.5), 0 0 20px rgba(16,185,129,0.3); }
          50% { text-shadow: 0 0 20px rgba(16,185,129,0.8), 0 0 40px rgba(16,185,129,0.5), 0 0 60px rgba(16,185,129,0.3); }
        }
        .trophy-spin {
          animation: trophy-spin 3s ease-in-out infinite;
        }
        @keyframes trophy-spin {
          0%, 100% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(-5deg) scale(1.05); }
          75% { transform: rotate(5deg) scale(1.05); }
        }

        /* ===== 3D CONVEYOR BELT ===== */
        .conveyor-3d {
          perspective: 1000px;
          perspective-origin: 50% 30%;
          transform-style: preserve-3d;
        }
        .belt-floor {
          position: absolute;
          bottom: 0;
          left: -10%;
          right: -10%;
          height: 45%;
          background:
            linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 18px,
              rgba(0,212,255,0.12) 18px,
              rgba(0,212,255,0.12) 20px
            );
          transform: rotateX(70deg) translateZ(-80px);
          transform-origin: bottom center;
          animation: belt-scroll 0.6s linear infinite;
          border-top: 2px solid rgba(0,212,255,0.3);
          box-shadow: 0 0 40px rgba(0,212,255,0.15), inset 0 20px 40px rgba(0,0,0,0.5);
        }
        @keyframes belt-scroll {
          0% { background-position: 0 0; }
          100% { background-position: 0 40px; }
        }
        .belt-rail-left, .belt-rail-right {
          position: absolute;
          bottom: 0;
          width: 3px;
          height: 45%;
          background: linear-gradient(180deg, rgba(0,212,255,0.5), rgba(0,212,255,0.1));
          transform: rotateX(70deg) translateZ(-80px);
          transform-origin: bottom center;
          box-shadow: 0 0 15px rgba(0,212,255,0.4);
        }
        .belt-rail-left { left: 10%; }
        .belt-rail-right { right: 10%; }

        /* ===== SCANNER BEAM ===== */
        .scanner-beam {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(180deg, transparent, rgba(0,212,255,0.9), rgba(255,0,170,0.6), transparent);
          box-shadow: 0 0 20px rgba(0,212,255,0.8), 0 0 40px rgba(0,212,255,0.4), 0 0 80px rgba(255,0,170,0.2);
          animation: scanner-sweep 3s ease-in-out infinite;
          z-index: 15;
          pointer-events: none;
        }
        @keyframes scanner-sweep {
          0% { left: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }

        /* ===== 3D WORD BOX ===== */
        .word-box-3d {
          transform-style: preserve-3d;
          animation: word-entry 0.4s ease-out;
          z-index: 10;
        }
        .word-box-3d .word-depth {
          position: absolute;
          inset: 0;
          border-radius: 0.75rem;
          background: linear-gradient(135deg, rgba(249,115,22,0.2), rgba(239,68,68,0.15));
          transform: translateZ(-10px) translateX(4px) translateY(4px);
          border: 1px solid rgba(249,115,22,0.3);
          pointer-events: none;
          z-index: -1;
        }
        .word-box-3d .word-top {
          position: absolute;
          top: -5px;
          left: 3px;
          right: 3px;
          height: 5px;
          background: linear-gradient(180deg, rgba(249,115,22,0.5), rgba(249,115,22,0.2));
          transform: rotateX(-90deg) translateZ(5px);
          transform-origin: bottom;
          border-radius: 4px 4px 0 0;
          pointer-events: none;
        }
        .word-box-3d .word-barcode {
          position: absolute;
          bottom: 2px;
          left: 10%;
          right: 10%;
          height: 3px;
          background: repeating-linear-gradient(90deg, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.4) 1.5px, transparent 1.5px, transparent 3px);
          opacity: 0.5;
          pointer-events: none;
          transform: translateZ(16px);
        }

        /* ===== SPEED LINES ===== */
        .speed-line {
          position: absolute;
          top: -20%;
          width: 2px;
          background: linear-gradient(180deg, transparent, rgba(255,255,255,0.5), rgba(0,212,255,0.3), transparent);
          animation: speed-line-anim 0.5s linear infinite;
          pointer-events: none;
        }
        @keyframes speed-line-anim {
          0% { transform: translateY(-100vh); opacity: 0; }
          20% { opacity: 0.6; }
          80% { opacity: 0.6; }
          100% { transform: translateY(100vh); opacity: 0; }
        }

        /* ===== RUSH MODE ===== */
        .rush-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, rgba(255,0,170,0.12) 0%, transparent 70%);
          pointer-events: none;
          animation: rush-pulse 0.5s ease-in-out infinite alternate;
          z-index: 5;
        }
        @keyframes rush-pulse {
          0% { opacity: 0.2; }
          100% { opacity: 0.5; }
        }
        .rush-text {
          position: absolute;
          top: 40%;
          left: 50%;
          transform: translate(-50%, -50%) perspective(500px) rotateX(15deg);
          font-size: 2.5rem;
          font-weight: 900;
          color: #ff00aa;
          text-shadow: 0 0 20px #ff00aa, 0 0 40px #ff00aa, 0 0 80px #ff00aa;
          animation: rush-text-pulse 0.3s ease-in-out infinite alternate;
          pointer-events: none;
          z-index: 20;
          letter-spacing: 0.15em;
          white-space: nowrap;
        }
        @keyframes rush-text-pulse {
          0% { transform: translate(-50%, -50%) perspective(500px) rotateX(15deg) scale(1); }
          100% { transform: translate(-50%, -50%) perspective(500px) rotateX(15deg) scale(1.08); }
        }

        /* ===== 3D HUD ===== */
        .hud-3d {
          transform: perspective(600px) rotateX(5deg);
          transform-style: preserve-3d;
        }

        /* ===== PERSPECTIVE WORD ===== */
        .perspective-word {
          transform: translateZ(15px);
          position: relative;
          z-index: 2;
        }

        /* ===== 3D STATS CARDS ===== */
        .stats-card-3d {
          transform-style: preserve-3d;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          position: relative;
          overflow: hidden;
        }
        .stats-card-3d::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.05) 50%, transparent 60%);
          transform: translateX(-100%);
          transition: transform 0.6s;
        }
        .stats-card-3d:hover::before {
          transform: translateX(100%);
        }
        .stats-card-3d:hover {
          transform: perspective(600px) rotateY(5deg) rotateX(-3deg) translateY(-4px);
          box-shadow: 0 25px 50px rgba(0,0,0,0.4), 0 0 30px rgba(255,255,255,0.1);
        }

        /* ===== NEON BORDER ANIMATION ===== */
        @keyframes neon-border-cycle {
          0% { border-color: rgba(0,212,255,0.4); box-shadow: 0 0 20px rgba(0,212,255,0.3), 0 0 40px rgba(0,212,255,0.15), 0 0 60px rgba(0,212,255,0.1); }
          25% { border-color: rgba(255,0,170,0.4); box-shadow: 0 0 20px rgba(255,0,170,0.3), 0 0 40px rgba(255,0,170,0.15), 0 0 60px rgba(255,0,170,0.1); }
          50% { border-color: rgba(255,215,0,0.4); box-shadow: 0 0 20px rgba(255,215,0,0.3), 0 0 40px rgba(255,215,0,0.15), 0 0 60px rgba(255,215,0,0.1); }
          75% { border-color: rgba(255,0,170,0.4); box-shadow: 0 0 20px rgba(255,0,170,0.3), 0 0 40px rgba(255,0,170,0.15), 0 0 60px rgba(255,0,170,0.1); }
          100% { border-color: rgba(0,212,255,0.4); box-shadow: 0 0 20px rgba(0,212,255,0.3), 0 0 40px rgba(255,0,170,0.15), 0 0 60px rgba(0,212,255,0.1); }
        }
        .neon-border-anim {
          animation: neon-border-cycle 3s linear infinite;
        }

        /* ===== SCREEN SHAKE FOR RUSH ===== */
        .rush-shake {
          animation: rush-shake 0.4s ease-in-out infinite;
        }
        @keyframes rush-shake {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          10% { transform: translate(-3px, -2px) rotate(-0.5deg); }
          20% { transform: translate(3px, 2px) rotate(0.5deg); }
          30% { transform: translate(-2px, 3px) rotate(-0.3deg); }
          40% { transform: translate(2px, -3px) rotate(0.3deg); }
          50% { transform: translate(-1px, 1px) rotate(-0.2deg); }
        }

        /* ===== GAME OVER ANIMATIONS ===== */
        @keyframes gameover-appear {
          0% { transform: perspective(600px) rotateX(-15deg) translateY(30px); opacity: 0; }
          100% { transform: perspective(600px) rotateX(0deg) translateY(0); opacity: 1; }
        }
        .gameover-appear {
          animation: gameover-appear 0.6s ease-out forwards;
        }

        /* ===== TIMER GAUGE PULSE ===== */
        .timer-gauge-low {
          animation: timer-gauge-pulse 0.5s ease-in-out infinite alternate;
        }
        @keyframes timer-gauge-pulse {
          0% { filter: drop-shadow(0 0 6px #ef4444); }
          100% { filter: drop-shadow(0 0 15px #ef4444); }
        }
      `}),e.jsx(ne,{mood:Z}),e.jsx(ie,{active:c==="playing"&&l>=3}),e.jsx(le,{trigger:H}),c==="select"&&e.jsxs("div",{className:"max-w-5xl mx-auto px-4 py-6 min-h-screen",children:[e.jsx(Y,{}),e.jsx("div",{className:"flex items-center justify-between mb-8",children:e.jsxs(D,{to:"/juegos",className:"inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-all text-sm font-bold group",children:[e.jsx(W,{size:16,className:"group-hover:-translate-x-1 transition-transform"})," Volver / 返回"]})}),e.jsxs("div",{className:"text-center mb-10",children:[e.jsxs("div",{className:"w-20 h-20 md:w-24 md:h-24 rounded-3xl flex items-center justify-center mx-auto mb-4 animate-pulse neon-border-anim",style:{background:"linear-gradient(135deg,#ef4444,#f97316)",border:"2px solid transparent",boxShadow:"0 0 60px rgba(239,68,68,0.5), 0 0 100px rgba(249,115,22,0.3)"},children:[e.jsx(k,{size:36,className:"text-white md:hidden"}),e.jsx(k,{size:44,className:"text-white hidden md:block"})]}),e.jsx("h1",{className:"text-4xl md:text-6xl font-black text-white mb-2 title-gradient",style:{textShadow:"0 0 40px rgba(239,68,68,0.3)",transform:"perspective(500px) rotateX(5deg)"},children:"Word Rush"}),e.jsx("p",{className:"text-white/50 text-lg md:text-xl",children:"¡Escribe rápido! / 快速输入！"})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",children:J.map(t=>e.jsxs("button",{onClick:()=>Q(t.id),className:"modulo-card group relative rounded-2xl p-5 text-left",style:{background:"linear-gradient(180deg,rgba(14,22,64,.6),rgba(5,8,27,.45))",border:"1px solid "+t.color+"40",backdropFilter:"blur(14px)"},children:[e.jsx("div",{className:"absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity",children:e.jsx(P,{size:16,style:{color:t.color},className:"animate-pulse"})}),e.jsx("div",{className:"w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-2 transition-transform group-hover:scale-110 group-hover:rotate-6",style:{background:t.color+"15",boxShadow:"0 0 20px "+t.color+"20"},children:e.jsx(ee,{size:20,style:{color:t.color}})}),e.jsx("p",{className:"text-sm font-black text-white",children:t.titulo}),e.jsx("p",{className:"text-xs font-medium",style:{color:t.color+"aa"},children:t.tituloChino}),e.jsx("div",{className:"mt-2 h-1 rounded-full overflow-hidden bg-white/10",children:e.jsx("div",{className:"h-full rounded-full transition-all duration-500 group-hover:w-full",style:{width:"60%",background:t.color,boxShadow:"0 0 10px "+t.color}})})]},t.id))})]}),c==="gameover"&&e.jsxs("div",{className:"max-w-2xl mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center text-center gameover-appear",children:[e.jsx(Y,{}),e.jsxs("div",{className:"w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center mb-6 trophy-spin neon-border-anim",style:{background:"linear-gradient(135deg,#ffd700,#ef4444)",border:"2px solid transparent",boxShadow:"0 0 60px rgba(255,215,0,0.5), 0 0 100px rgba(239,68,68,0.3)"},children:[e.jsx(B,{size:48,className:"text-white md:hidden"}),e.jsx(B,{size:56,className:"text-white hidden md:block"})]}),e.jsx("h1",{className:"text-4xl md:text-6xl font-black text-white mb-2 title-gradient",children:"¡Tiempo!"}),e.jsxs("div",{className:"grid grid-cols-2 gap-4 w-full mb-8 max-w-md",children:[e.jsxs("div",{className:"stats-card-3d rounded-2xl p-6 md:p-8",style:{background:"linear-gradient(180deg,rgba(14,22,64,.6),rgba(5,8,27,.45))",border:"1px solid rgba(255,215,0,.2)",boxShadow:"0 0 30px rgba(255,215,0,0.1), 0 20px 40px rgba(0,0,0,0.3)"},children:[e.jsx("p",{className:"text-sm text-white/40 mb-1",children:"Score"}),e.jsx("p",{className:"text-4xl md:text-5xl font-black",style:{color:"#ffd700",textShadow:"0 0 20px rgba(255,215,0,0.5)"},children:v})]}),e.jsxs("div",{className:"stats-card-3d rounded-2xl p-6 md:p-8",style:{background:"linear-gradient(180deg,rgba(14,22,64,.6),rgba(5,8,27,.45))",border:"1px solid rgba(16,185,129,.2)",boxShadow:"0 0 30px rgba(16,185,129,0.1), 0 20px 40px rgba(0,0,0,0.3)"},children:[e.jsx("p",{className:"text-sm text-white/40 mb-1",children:"Mejor"}),e.jsx("p",{className:"text-4xl md:text-5xl font-black best-score-glow",style:{color:"#10b981"},children:F})]})]}),e.jsx("button",{onClick:K,className:"px-8 py-3 md:px-10 md:py-4 rounded-full text-white font-black text-sm md:text-base transition-all hover:scale-105 active:scale-95 neon-border-anim",style:{background:"linear-gradient(135deg,#ef4444,#f97316)",border:"2px solid transparent",boxShadow:"0 0 40px rgba(239,68,68,0.5), 0 0 80px rgba(249,115,22,0.3)"},children:"Jugar de nuevo / 再玩一次"}),e.jsx(ae,{currentGameId:"word-rush"})]}),c==="playing"&&e.jsxs("div",{className:"max-w-5xl mx-auto px-4 py-4 md:py-6 min-h-screen flex flex-col",children:[e.jsx(Y,{}),e.jsxs("div",{className:"flex items-center justify-between mb-4 md:mb-6",children:[e.jsxs(D,{to:"/juegos",className:"inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-all text-sm font-bold group",children:[e.jsx(W,{size:16,className:"group-hover:-translate-x-1 transition-transform"})," Volver / 返回"]}),e.jsxs("div",{className:"hud-3d flex items-center gap-2 md:gap-3 flex-wrap justify-end",children:[e.jsxs("div",{className:"flex items-center gap-1 px-2 md:px-3 py-1 md:py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105",style:{background:"rgba(255,215,0,.15)",border:"1px solid rgba(255,215,0,.3)",color:"#ffd700",boxShadow:"0 0 15px rgba(255,215,0,0.2)"},children:[e.jsx(P,{size:12,className:"animate-pulse"})," ",v]}),e.jsxs("div",{className:"flex items-center gap-1 px-2 md:px-3 py-1 md:py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105 "+(b<=1?"life-pulse":""),style:{background:"rgba(239,68,68,.15)",border:"1px solid rgba(239,68,68,.3)",color:"#ef4444",boxShadow:"0 0 15px rgba(239,68,68,0.2)"},children:[e.jsx(te,{size:12,className:b<=1?"animate-pulse":""})," ",b]}),e.jsx(xe,{timeLeft:M,maxTime:60}),l>1&&e.jsxs("div",{className:"flex items-center gap-1 px-2 md:px-3 py-1 md:py-1.5 rounded-full text-xs font-bold combo-flame",style:{background:"rgba(255,215,0,.15)",border:"1px solid rgba(255,215,0,.3)",color:"#ffd700",boxShadow:"0 0 20px rgba(255,215,0,0.3)"},children:[e.jsx(k,{size:12})," ",l,"x"]})]})]}),e.jsxs("div",{className:"relative flex-1 min-h-[50vh] md:min-h-[60vh] rounded-2xl md:rounded-3xl mb-4 md:mb-6 overflow-hidden game-area conveyor-3d "+(l>=5?"rush-shake":""),style:{border:"1px solid rgba(255,255,255,.15)",boxShadow:"0 0 40px rgba(239,68,68,0.1), inset 0 0 60px rgba(0,0,0,0.2)"},children:[e.jsx("div",{className:"belt-floor"}),e.jsx("div",{className:"belt-rail-left"}),e.jsx("div",{className:"belt-rail-right"}),e.jsx("div",{className:"scanner-beam"}),e.jsx("div",{className:"absolute inset-0 opacity-10 pointer-events-none",style:{backgroundImage:"linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",backgroundSize:"40px 40px"}}),e.jsx(ce,{active:l>=5}),l>=5&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"rush-overlay"}),e.jsx("div",{className:"rush-text",children:"RUSH MODE"})]}),C.map(t=>e.jsxs("div",{className:"absolute word-box-3d",style:{left:t.x+"%",top:t.y+"%",transform:"translateX(-50%)"},children:[e.jsx("div",{className:"word-depth"}),e.jsx("div",{className:"word-top"}),e.jsx("div",{className:"px-3 md:px-4 py-1.5 md:py-2 rounded-xl text-xs md:text-sm font-black text-white word-glow perspective-word",style:{background:"linear-gradient(135deg, rgba(249,115,22,0.35), rgba(239,68,68,0.25))",border:"1px solid rgba(249,115,22,0.6)",boxShadow:"0 0 20px rgba(249,115,22,0.4), 0 0 40px rgba(249,115,22,0.2), 0 8px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",textShadow:"0 0 10px rgba(249,115,22,0.8), 0 0 20px rgba(249,115,22,0.5)",backdropFilter:"blur(4px)"},children:t.word}),e.jsx("div",{className:"word-barcode"})]},t.id)),V.map(t=>e.jsx(de,{score:t.score,x:t.x,y:t.y},t.id)),l>1&&e.jsxs("div",{className:"absolute top-3 md:top-4 right-3 md:right-4 px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm font-black combo-flame",style:{background:"rgba(255,215,0,.2)",border:"1px solid rgba(255,215,0,.4)",color:"#ffd700",boxShadow:"0 0 30px rgba(255,215,0,0.4)",textShadow:"0 0 10px rgba(255,215,0,0.8)"},children:[e.jsx(k,{size:14,className:"inline mr-1"})," ",l,"x COMBO"]}),M<=10&&e.jsxs("div",{className:"absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-xs font-black timer-warning",style:{background:"rgba(239,68,68,0.2)",border:"1px solid rgba(239,68,68,0.4)",boxShadow:"0 0 20px rgba(239,68,68,0.3)"},children:["⚠ ¡Quedan ",M," segundos!"]})]}),e.jsxs("div",{className:"max-w-lg mx-auto w-full px-2 md:px-0",children:[e.jsxs("div",{className:"relative",children:[e.jsx("input",{type:"text",value:N,onChange:_,className:"w-full px-4 md:px-6 py-3 md:py-4 rounded-2xl text-white font-black text-base md:text-lg text-center outline-none transition-all input-glow",style:{background:"linear-gradient(180deg, rgba(14,22,64,0.8), rgba(5,8,27,0.6))",border:"1px solid rgba(239,68,68,0.3)",boxShadow:"0 0 20px rgba(239,68,68,0.1), inset 0 0 20px rgba(0,0,0,0.2)"},placeholder:"Escribe la traducción / 输入翻译...",autoFocus:!0}),e.jsx("div",{className:"absolute right-3 md:right-4 top-1/2 -translate-y-1/2 pointer-events-none",children:e.jsx("div",{className:"w-2 h-2 rounded-full animate-pulse",style:{background:N?"#10b981":"#ef4444",boxShadow:N?"0 0 10px #10b981":"0 0 10px #ef4444"}})})]}),e.jsx("p",{className:"text-center text-white/30 text-xs mt-2",children:"Escribe la traducción en español / 输入西班牙语翻译"})]})]})]})}export{he as default};
