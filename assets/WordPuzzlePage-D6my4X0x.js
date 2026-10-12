import{c as de,N as ce,r as o,j as e,e as A,L as Q,O as R,i as xe,q,Z as H,S as pe,H as me,T as O}from"./index-B99-1dMy.js";import{P as fe}from"./PostGameNav-C9D8osPt.js";import{g as ue,a as V}from"./juegos-utils-CZjuzuFu.js";import{A as U}from"./arrow-left-Dyz-HjEg.js";import{L as J}from"./layers-zaRvRaB9.js";import{C as be}from"./circle-check-DqV2cqBo.js";import{R as ge}from"./rotate-ccw-D81C_ca-.js";const he=[["path",{d:"M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z",key:"w46dr5"}]],K=de("puzzle",he);function ye(n){return n.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-ZÑ]/g,"").trim()}function $(n){const x=[...n];for(let i=x.length-1;i>0;i--){const p=Math.floor(Math.random()*(i+1));[x[i],x[p]]=[x[p],x[i]]}return x}function ve(n,x){const i=["#00d4ff","#ff00aa","#ffd600","#39ff14","#b829dd","#ff6b35","#00ffcc"];for(let p=0;p<60;p++){const s=document.createElement("div"),d=4+Math.random()*6;s.style.cssText="position:fixed;left:"+n+"px;top:"+x+"px;width:"+d+"px;height:"+d+"px;border-radius:50%;background:"+i[p%i.length]+";pointer-events:none;z-index:9999;box-shadow:0 0 8px "+i[p%i.length]+";",document.body.appendChild(s);const f=Math.random()*Math.PI*2,u=3+Math.random()*14;let w=Math.cos(f)*u,m=Math.sin(f)*u,g=1,b=0;const y=()=>{w*=.94,m*=.94,m+=.35,b+=8,s.style.left=parseFloat(s.style.left)+w+"px",s.style.top=parseFloat(s.style.top)+m+"px",s.style.transform="rotate("+b+"deg) scale("+g+")",g-=.018,s.style.opacity=String(g),g>0?requestAnimationFrame(y):s.remove()};requestAnimationFrame(y)}}function je(n,x){const i=["#00d4ff","#ff00aa","#ffd600","#39ff14","#b829dd","#ff6b35","#ff4444","#00ffcc"];for(let p=0;p<120;p++){const s=document.createElement("div"),d=Math.random()>.5,f=6+Math.random()*8,u=i[Math.floor(Math.random()*i.length)];s.style.cssText="position:fixed;left:"+n+"px;top:"+x+"px;width:"+f+"px;height:"+(d?f*.6:f)+"px;border-radius:"+(d?"2px":"50%")+";background:"+u+";pointer-events:none;z-index:9999;box-shadow:0 0 6px "+u+";",document.body.appendChild(s);const w=Math.random()*Math.PI*2,m=4+Math.random()*18;let g=Math.cos(w)*m,b=Math.sin(w)*m-8,y=1,c=Math.random()*360,N=(Math.random()-.5)*20;const k=()=>{g*=.96,b+=.4,c+=N,s.style.left=parseFloat(s.style.left)+g+"px",s.style.top=parseFloat(s.style.top)+b+"px",s.style.transform="rotate("+c+"deg)",y-=.012,s.style.opacity=String(y),y>0?requestAnimationFrame(k):s.remove()};requestAnimationFrame(k)}}function ee({expression:n}){const x=o.useMemo(()=>{switch(n){case"happy":return e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M 55 95 Q 65 85 75 95",stroke:"#1a1a2e",strokeWidth:"4",fill:"none",strokeLinecap:"round"}),e.jsx("path",{d:"M 105 95 Q 115 85 125 95",stroke:"#1a1a2e",strokeWidth:"4",fill:"none",strokeLinecap:"round"})]});case"sad":return e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M 55 100 Q 65 110 75 100",stroke:"#1a1a2e",strokeWidth:"4",fill:"none",strokeLinecap:"round"}),e.jsx("path",{d:"M 105 100 Q 115 110 125 100",stroke:"#1a1a2e",strokeWidth:"4",fill:"none",strokeLinecap:"round"})]});case"excited":return e.jsxs(e.Fragment,{children:[e.jsx("circle",{cx:"65",cy:"95",r:"10",fill:"#1a1a2e"}),e.jsx("circle",{cx:"70",cy:"90",r:"3",fill:"white"}),e.jsx("circle",{cx:"115",cy:"95",r:"10",fill:"#1a1a2e"}),e.jsx("circle",{cx:"120",cy:"90",r:"3",fill:"white"}),e.jsx("path",{d:"M 55 80 Q 65 70 75 80",stroke:"#1a1a2e",strokeWidth:"3",fill:"none",strokeLinecap:"round"}),e.jsx("path",{d:"M 105 80 Q 115 70 125 80",stroke:"#1a1a2e",strokeWidth:"3",fill:"none",strokeLinecap:"round"})]});default:return e.jsxs(e.Fragment,{children:[e.jsx("circle",{cx:"65",cy:"95",r:"8",fill:"#1a1a2e"}),e.jsx("circle",{cx:"115",cy:"95",r:"8",fill:"#1a1a2e"})]})}},[n]),i=o.useMemo(()=>{switch(n){case"happy":return e.jsx("path",{d:"M 75 115 Q 90 135 105 115",stroke:"#1a1a2e",strokeWidth:"4",fill:"none",strokeLinecap:"round"});case"sad":return e.jsx("path",{d:"M 75 125 Q 90 115 105 125",stroke:"#1a1a2e",strokeWidth:"4",fill:"none",strokeLinecap:"round"});case"excited":return e.jsx("ellipse",{cx:"90",cy:"125",rx:"12",ry:"15",fill:"#1a1a2e"});default:return e.jsx("path",{d:"M 82 120 Q 90 125 98 120",stroke:"#1a1a2e",strokeWidth:"3",fill:"none",strokeLinecap:"round"})}},[n]),p=o.useMemo(()=>n==="sad"?null:e.jsxs(e.Fragment,{children:[e.jsx("circle",{cx:"50",cy:"110",r:"8",fill:"#ff6b9d",opacity:"0.4"}),e.jsx("circle",{cx:"130",cy:"110",r:"8",fill:"#ff6b9d",opacity:"0.4"})]}),[n]),s=o.useMemo(()=>n!=="excited"?null:e.jsxs(e.Fragment,{children:[e.jsxs("path",{d:"M 20 40 L 25 30 L 30 40 L 25 50 Z",fill:"#ffd600",children:[e.jsx("animate",{attributeName:"opacity",values:"0;1;0",dur:"1.2s",repeatCount:"indefinite"}),e.jsx("animateTransform",{attributeName:"transform",type:"scale",values:"0.5;1.2;0.5",dur:"1.2s",repeatCount:"indefinite",additive:"sum"})]}),e.jsxs("path",{d:"M 150 30 L 155 20 L 160 30 L 155 40 Z",fill:"#00d4ff",children:[e.jsx("animate",{attributeName:"opacity",values:"0;1;0",dur:"1s",repeatCount:"indefinite",begin:"0.3s"}),e.jsx("animateTransform",{attributeName:"transform",type:"scale",values:"0.5;1;0.5",dur:"1s",repeatCount:"indefinite",additive:"sum"})]}),e.jsxs("path",{d:"M 170 80 L 175 70 L 180 80 L 175 90 Z",fill:"#39ff14",children:[e.jsx("animate",{attributeName:"opacity",values:"0;1;0",dur:"1.4s",repeatCount:"indefinite",begin:"0.6s"}),e.jsx("animateTransform",{attributeName:"transform",type:"scale",values:"0.5;1;0.5",dur:"1.4s",repeatCount:"indefinite",additive:"sum"})]})]}),[n]),d=n==="excited"?"animate-bounce":"animate-float";return e.jsx("div",{className:"fixed bottom-4 right-4 z-50 pointer-events-none "+d,style:{animationDuration:n==="excited"?"0.6s":"3s"},children:e.jsxs("svg",{width:"100",height:"100",viewBox:"0 0 180 180",className:"drop-shadow-[0_0_15px_rgba(0,212,255,0.5)]",children:[e.jsx("defs",{children:e.jsxs("linearGradient",{id:"mascotBody",x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[e.jsx("stop",{offset:"0%",stopColor:"#00d4ff"}),e.jsx("stop",{offset:"100%",stopColor:"#b829dd"})]})}),e.jsx("ellipse",{cx:"50",cy:"55",rx:"22",ry:"28",fill:"url(#mascotBody)",opacity:"0.9"}),e.jsx("ellipse",{cx:"130",cy:"55",rx:"22",ry:"28",fill:"url(#mascotBody)",opacity:"0.9"}),e.jsx("ellipse",{cx:"50",cy:"55",rx:"12",ry:"18",fill:"#ff6b9d",opacity:"0.5"}),e.jsx("ellipse",{cx:"130",cy:"55",rx:"12",ry:"18",fill:"#ff6b9d",opacity:"0.5"}),e.jsx("rect",{x:"35",y:"70",width:"110",height:"90",rx:"45",ry:"45",fill:"url(#mascotBody)"}),e.jsx("rect",{x:"50",y:"85",width:"80",height:"60",rx:"30",ry:"30",fill:"rgba(255,255,255,0.15)"}),x,i,p,s,e.jsx("ellipse",{cx:"50",cy:"145",rx:"12",ry:"8",fill:"#ff6b9d",opacity:"0.6"}),e.jsx("ellipse",{cx:"130",cy:"145",rx:"12",ry:"8",fill:"#ff6b9d",opacity:"0.6"})]})})}function Xe(){const{playCorrect:n,playWrong:x,playWin:i,playLose:p,playClick:s}=ce(),[d,f]=o.useState("select"),[u,w]=o.useState([]),[m,g]=o.useState(null),[b,y]=o.useState([]),[c,N]=o.useState([]),[k,E]=o.useState([]),[D,T]=o.useState(0),[te,P]=o.useState(0),[ae,se]=o.useState(()=>{try{return parseInt(localStorage.getItem("wordpuzzle_best")||"0")}catch{return 0}}),[S,M]=o.useState(""),[Y,B]=o.useState([]),re=ue(),[G,C]=o.useState(""),[oe,z]=o.useState("neutral"),[X,_]=o.useState(!1),[L,W]=o.useState(!1),v=o.useRef(null),Z=o.useCallback(t=>{s();let a=t?V(t):V();if(a.length===0){C('Este módulo no tiene palabras válidas para este juego. Prueba con otro módulo o selecciona "Todos los módulos".');return}const r=$(a.filter(l=>l.espanol&&l.chino).map(l=>({espanol:ye(l.espanol),chino:l.chino})).filter(l=>l.espanol.length>=4&&l.espanol.length<=10));if(r.length===0){C('Este módulo no tiene palabras válidas para este juego. Prueba con otro módulo o selecciona "Todos los módulos".');return}w(r),T(0),P(0),B([]),M(""),C(""),f("playing"),z("neutral"),W(!1)},[]),I=o.useCallback(()=>{if(u.length===0)return;const t=u.filter(h=>!Y.includes(h.espanol)),a=t.length>0?t:u,r=a[Math.floor(Math.random()*a.length)],l=t.length>0?[...Y,r.espanol]:[r.espanol];B(l),g(r);const F=$(r.espanol.split(""));y(F),N([]),E([]),_(!1),W(!1)},[u,Y]);o.useEffect(()=>{d==="playing"&&u.length>0&&I()},[d,u]),o.useEffect(()=>()=>{v.current&&window.clearTimeout(v.current)},[]);const ne=(t,a)=>{if(c.includes(t))return;s();const r=[...c,t];N(r);const l=m?.espanol||"";if(r.map(h=>b[h]).join("")===l){n(),z("happy");const h=a.currentTarget.closest(".puzzle-container");if(h){const j=h.getBoundingClientRect();ve(j.left+j.width/2,j.top+j.height/2)}T(j=>j+100+l.length*20),P(j=>j+1),_(!0),M("¡Correcto! / 正确！"),v.current&&window.clearTimeout(v.current),v.current=window.setTimeout(()=>{M(""),z("neutral"),_(!1),I()},1200)}else r.length===l.length&&(x(),z("sad"),W(!0),M("¡Incorrecto! / 错误！"),v.current&&window.clearTimeout(v.current),v.current=window.setTimeout(()=>{N([]),M(""),z("neutral"),W(!1)},1e3))},le=()=>{if(!m||k.length>=m.espanol.length-1)return;s();const t=k.length;E([...k,t]),N(a=>{const r=m.espanol[t],l=b.findIndex((F,h)=>F===r&&!a.includes(h)&&!k.includes(h));return l>=0?[...a,l]:a}),T(a=>Math.max(0,a-20))},ie=()=>{s(),i(),z("excited"),f("gameover"),se(t=>{const a=Math.max(t,D);return localStorage.setItem("wordpuzzle_best",String(a)),a})};return o.useEffect(()=>{if(d==="gameover"){const t=window.setTimeout(()=>{je(window.innerWidth/2,window.innerHeight/2)},300);return()=>window.clearTimeout(t)}},[d]),d==="select"?e.jsxs(A,{children:[e.jsx(ee,{expression:"neutral"}),e.jsxs("div",{className:"max-w-5xl mx-auto px-4 py-6 min-h-screen relative",children:[e.jsxs("div",{className:"flex items-center justify-between mb-8",children:[e.jsxs(Q,{to:"/juegos",className:"inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold group",children:[e.jsx(U,{size:16,className:"group-hover:-translate-x-1 transition-transform"})," Volver / 返回"]}),e.jsx(R,{})]}),e.jsxs("div",{className:"text-center mb-10",children:[e.jsxs("h1",{className:"text-4xl md:text-6xl font-black mb-3 animate-pulse",style:{textShadow:"0 0 40px rgba(0,212,255,0.5), 0 0 80px rgba(184,41,221,0.3)"},children:[e.jsx(K,{size:40,className:"inline mr-3 animate-spin-slow",style:{animationDuration:"4s"}})," Word Puzzle"]}),e.jsx("p",{className:"text-white/50 text-sm font-medium",children:"Selecciona un módulo para jugar / 选择模块开始游戏"}),G&&e.jsx("div",{className:"mt-4 mx-auto max-w-lg p-4 rounded-2xl text-sm font-bold animate-shake",style:{background:"rgba(255,68,68,.15)",border:"1px solid rgba(255,68,68,.4)",color:"#ff6b35",boxShadow:"0 0 20px rgba(255,68,68,.2)"},children:G})]}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5",style:{perspective:"1000px"},children:[e.jsxs("button",{onClick:()=>{s(),C(""),Z(null)},className:"group relative rounded-2xl p-6 text-left transition-all duration-300 overflow-hidden module-card",style:{background:"rgba(14,22,64,.7)",border:"1px solid rgba(0,212,255,.4)",backdropFilter:"blur(10px)"},children:[e.jsx("div",{className:"absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",style:{background:"linear-gradient(135deg, rgba(0,212,255,0.1), rgba(184,41,221,0.1))"}}),e.jsx("div",{className:"w-14 h-14 rounded-2xl flex items-center justify-center mb-4 relative",style:{background:"linear-gradient(135deg, #00d4ff, #b829dd)",boxShadow:"0 0 25px rgba(0,212,255,.4), 0 0 50px rgba(184,41,221,.2)"},children:e.jsx(J,{size:26,className:"text-white drop-shadow-lg"})}),e.jsx("h3",{className:"text-white font-black text-lg mb-1 relative",children:"Todos los módulos"}),e.jsx("p",{className:"text-xs font-medium mb-1 relative",style:{color:"rgba(0,212,255,.8)"},children:"所有模块"}),e.jsx("p",{className:"text-xs font-medium text-white/40 relative",children:"Mezcla todo el vocabulario"}),e.jsx("div",{className:"absolute -bottom-2 -right-2 opacity-10 group-hover:opacity-20 transition-opacity",children:e.jsx(K,{size:80})})]}),re.map(t=>e.jsxs("button",{onClick:()=>{s(),C(""),Z(t.id)},className:"group relative rounded-2xl p-6 text-left transition-all duration-300 overflow-hidden module-card",style:{background:"rgba(14,22,64,.7)",border:"1px solid "+t.color+"55",backdropFilter:"blur(10px)"},children:[e.jsx("div",{className:"absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",style:{background:"linear-gradient(135deg, "+t.color+"15, "+t.color+"05)"}}),e.jsx("div",{className:"w-14 h-14 rounded-2xl flex items-center justify-center mb-4 relative",style:{background:"linear-gradient(135deg, "+t.color+", "+t.color+"88)",boxShadow:"0 0 25px "+t.color+"40, 0 0 50px "+t.color+"20"},children:e.jsx(xe,{size:26,className:"text-white drop-shadow-lg"})}),e.jsx("h3",{className:"text-white font-black text-lg mb-1 relative",children:t.titulo}),e.jsx("p",{className:"text-xs font-medium mb-1 relative",style:{color:t.color+"cc"},children:t.tituloChino}),e.jsxs("p",{className:"text-xs font-medium text-white/40 relative",children:[t.vocabularioCount," palabras / 词"]}),e.jsx("div",{className:"absolute -bottom-2 -right-2 opacity-10 group-hover:opacity-20 transition-opacity",style:{color:t.color},children:e.jsx(q,{size:80})})]},t.id))]})]})]}):e.jsxs(A,{children:[e.jsx(ee,{expression:oe}),e.jsxs("div",{className:"max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6 min-h-screen relative z-10 "+(L?"animate-screen-shake":""),children:[e.jsxs("div",{className:"flex items-center justify-between mb-4 flex-wrap gap-2",children:[e.jsxs(Q,{to:"/juegos",className:"inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-xs sm:text-sm font-bold group",children:[e.jsx(U,{size:14,className:"group-hover:-translate-x-1 transition-transform"})," Volver / 返回"]}),e.jsxs("div",{className:"flex items-center gap-2 flex-wrap",children:[e.jsx(R,{}),e.jsxs("button",{onClick:()=>{s(),f("select")},className:"flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]",style:{background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.15)",color:"#fff"},children:[e.jsx(J,{size:12})," Cambiar / 切换"]}),e.jsxs("div",{className:"score-pill px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5",style:{background:"rgba(0,212,255,.12)",border:"1px solid rgba(0,212,255,.3)",color:"#00d4ff",boxShadow:"0 0 15px rgba(0,212,255,.25), inset 0 0 10px rgba(0,212,255,.05)"},children:[e.jsx(H,{size:12,className:"animate-pulse"})," ",D]}),e.jsxs("div",{className:"score-pill px-3 py-1.5 rounded-full text-xs font-bold transition-all",style:{background:"rgba(255,0,170,.12)",border:"1px solid rgba(255,0,170,.3)",color:"#ff00aa",boxShadow:"0 0 15px rgba(255,0,170,.25), inset 0 0 10px rgba(255,0,170,.05)"},children:["Ronda: ",te]})]})]}),e.jsxs("div",{className:"text-center mb-4 sm:mb-6",children:[e.jsx("h1",{className:"text-2xl sm:text-3xl md:text-5xl font-black mb-2",style:{background:"linear-gradient(135deg,#00d4ff,#ff00aa,#ffd600)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",filter:"drop-shadow(0 0 20px rgba(0,212,255,.4)) drop-shadow(0 0 40px rgba(184,41,221,.2))"},children:"Word Puzzle"}),e.jsx("p",{className:"text-white/40 text-xs sm:text-sm font-medium",children:"Ordena las letras para formar la palabra / 排列字母组成单词"})]}),e.jsx("div",{style:{perspective:"1200px"},children:e.jsxs("div",{className:"puzzle-container puzzle-container-3d mx-auto rounded-3xl p-4 sm:p-8 border transition-all duration-500 relative overflow-hidden "+(X?"animate-glow-pulse":"")+" "+(L?"animate-shake-error animate-red-glow":""),style:{maxWidth:"640px",background:"linear-gradient(180deg,rgba(14,22,64,.85),rgba(5,8,27,.7))",backdropFilter:"blur(20px)",boxShadow:X?"0 0 60px rgba(57,255,20,.4), 0 20px 60px rgba(0,0,0,.5)":L?"0 0 60px rgba(255,68,68,.5), 0 20px 60px rgba(0,0,0,.5)":"0 0 40px rgba(0,212,255,.15), 0 20px 60px rgba(0,0,0,.5)",borderColor:X?"rgba(57,255,20,.5)":L?"rgba(255,68,68,.5)":"rgba(255,255,255,.12)"},children:[X&&e.jsx("div",{className:"flash-overlay active"}),e.jsxs("div",{className:"absolute inset-0 overflow-hidden pointer-events-none",children:[e.jsx("div",{className:"absolute w-2 h-2 rounded-full bg-[#00d4ff] opacity-20 animate-float",style:{top:"10%",left:"20%",animationDuration:"4s"}}),e.jsx("div",{className:"absolute w-1.5 h-1.5 rounded-full bg-[#ff00aa] opacity-20 animate-float",style:{top:"60%",left:"80%",animationDuration:"5s",animationDelay:"1s"}}),e.jsx("div",{className:"absolute w-2 h-2 rounded-full bg-[#ffd600] opacity-15 animate-float",style:{top:"30%",left:"70%",animationDuration:"6s",animationDelay:"2s"}}),e.jsx("div",{className:"absolute w-1 h-1 rounded-full bg-[#39ff14] opacity-20 animate-float",style:{top:"80%",left:"40%",animationDuration:"4.5s",animationDelay:"0.5s"}}),e.jsx("div",{className:"absolute w-1.5 h-1.5 rounded-full bg-[#b829dd] opacity-15 animate-float",style:{top:"20%",left:"60%",animationDuration:"5.5s",animationDelay:"1.5s"}})]}),e.jsxs("div",{className:"text-center mb-4 sm:mb-6 relative",children:[e.jsx("p",{className:"text-white/40 text-xs font-medium mb-2",children:"Significado / 含义:"}),e.jsx("p",{className:"text-xl sm:text-3xl font-black animate-float",style:{color:"#ffd600",textShadow:"0 0 20px rgba(255,214,0,.5), 0 0 40px rgba(255,214,0,.2)",animationDuration:"3s"},children:m?.chino})]}),e.jsx("div",{className:"flex flex-wrap justify-center gap-2 sm:gap-3 mb-4 sm:mb-6",style:{perspective:"800px"},children:m?.espanol.split("").map((t,a)=>{const r=c[a],l=r!==void 0&&a===c.length-1;return e.jsxs("div",{className:"answer-slot relative w-10 h-10 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center font-black text-lg sm:text-xl transition-all duration-300 "+(r!==void 0?"filled":"")+" "+(l?"animate-slot-pop":""),style:{background:r!==void 0?"linear-gradient(135deg,rgba(0,212,255,.35),rgba(184,41,221,.35))":"rgba(255,255,255,.08)",border:r!==void 0?"2px solid rgba(0,212,255,.6)":"1px dashed rgba(255,255,255,.2)",color:r!==void 0?"#00d4ff":"transparent",boxShadow:r!==void 0?"0 0 20px rgba(0,212,255,.3), inset 0 0 12px rgba(0,212,255,.1)":"inset 0 2px 4px rgba(0,0,0,.2)",textShadow:r!==void 0?"0 0 12px rgba(0,212,255,.6)":"none"},children:[r!==void 0?b[r]:"_",r!==void 0&&e.jsx("div",{className:"absolute inset-0 rounded-xl border-2 border-[#00d4ff] opacity-30 animate-ping",style:{animationDuration:"2s"}})]},a)})}),e.jsx("div",{className:"flex flex-wrap justify-center gap-2 sm:gap-3 mb-4 sm:mb-6",style:{perspective:"800px"},children:b.map((t,a)=>e.jsxs("button",{onClick:r=>ne(a,r),disabled:c.includes(a),className:"puzzle-piece relative w-10 h-10 sm:w-14 sm:h-14 rounded-xl font-black text-lg sm:text-xl transition-all duration-200 disabled:cursor-not-allowed "+(c.includes(a)?"puzzle-piece-selected":"animate-piece-float-3d"),style:{background:c.includes(a)?"rgba(255,255,255,.04)":"linear-gradient(145deg,rgba(0,212,255,.25),rgba(184,41,221,.25))",border:c.includes(a)?"1px solid rgba(255,255,255,.06)":"2px solid rgba(0,212,255,.5)",color:c.includes(a)?"rgba(255,255,255,.15)":"#fff",boxShadow:c.includes(a)?"none":"0 6px 20px rgba(0,212,255,.2), 0 0 30px rgba(0,212,255,.1), inset 0 1px 0 rgba(255,255,255,.2)",textShadow:c.includes(a)?"none":"0 0 10px rgba(255,255,255,.6)",animationDelay:a*.1+"s"},children:[t,!c.includes(a)&&e.jsx("div",{className:"absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none"})]},a))}),e.jsxs("div",{className:"flex gap-3 justify-center flex-wrap",children:[e.jsx("button",{onClick:le,className:"hint-btn group relative px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all hover:scale-105 overflow-hidden",style:{background:"rgba(255,214,0,.12)",border:"1px solid rgba(255,214,0,.4)",color:"#ffd600",boxShadow:"0 0 15px rgba(255,214,0,.15)"},children:e.jsxs("span",{className:"relative flex items-center gap-1.5",children:[e.jsx(pe,{size:14,className:"group-hover:animate-spin",style:{animationDuration:"2s"}})," Pista / 提示"]})}),e.jsx("button",{onClick:ie,className:"group relative px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(255,0,170,.3)] overflow-hidden",style:{background:"rgba(255,0,170,.12)",border:"1px solid rgba(255,0,170,.4)",color:"#ff00aa",boxShadow:"0 0 15px rgba(255,0,170,.15)"},children:e.jsxs("span",{className:"relative flex items-center gap-1.5",children:[e.jsx(be,{size:14,className:"group-hover:animate-pulse"})," Terminar / 结束"]})})]})]})}),S&&e.jsx("div",{className:"text-center mt-4 sm:mt-5 text-sm sm:text-base font-black animate-bounce-in transition-all",style:{color:S.includes("Correcto")?"#39ff14":"#ff4444",textShadow:S.includes("Correcto")?"0 0 15px rgba(57,255,20,.6), 0 0 30px rgba(57,255,20,.3)":"0 0 15px rgba(255,68,68,.6), 0 0 30px rgba(255,68,68,.3)"},children:e.jsxs("span",{className:"inline-flex items-center gap-2",children:[S.includes("Correcto")?e.jsx(q,{size:18,className:"animate-spin-slow",style:{animationDuration:"2s"}}):e.jsx(me,{size:18,className:"animate-pulse"}),S]})}),d==="gameover"&&e.jsx("div",{className:"fixed inset-0 z-[100] flex items-center justify-center",style:{background:"rgba(3,4,17,.9)",backdropFilter:"blur(24px)",perspective:"1200px"},children:e.jsxs("div",{className:"gameover-card text-center p-6 sm:p-8 rounded-3xl max-w-sm mx-4 relative overflow-hidden animate-bounce-in",style:{background:"linear-gradient(180deg,rgba(14,22,64,.9),rgba(5,8,27,.7))",border:"1px solid rgba(0,212,255,.3)",boxShadow:"0 0 80px rgba(0,212,255,.2), 0 20px 60px rgba(0,0,0,.6)"},children:[e.jsx("div",{className:"absolute -inset-[3px] rounded-[26px] -z-10 opacity-70 border-gradient-animated",style:{background:"linear-gradient(135deg,#00d4ff,#ff00aa,#ffd600,#00d4ff)",filter:"blur(30px)",backgroundSize:"200% 200%"}}),e.jsxs("div",{className:"absolute inset-0 overflow-hidden pointer-events-none",children:[e.jsx("div",{className:"absolute w-3 h-3 rounded-full bg-[#ffd600] opacity-20 animate-float",style:{top:"15%",left:"15%",animationDuration:"3s"}}),e.jsx("div",{className:"absolute w-2 h-2 rounded-full bg-[#00d4ff] opacity-20 animate-float",style:{top:"70%",left:"80%",animationDuration:"4s",animationDelay:"1s"}}),e.jsx("div",{className:"absolute w-2 h-2 rounded-full bg-[#ff00aa] opacity-15 animate-float",style:{top:"40%",left:"30%",animationDuration:"5s",animationDelay:"2s"}})]}),e.jsx(O,{size:56,className:"mx-auto mb-4 animate-float",style:{color:"#ffd600",filter:"drop-shadow(0 0 20px rgba(255,214,0,.6))",animationDuration:"2s"}}),e.jsx("h2",{className:"text-2xl sm:text-3xl font-black mb-2",style:{background:"linear-gradient(135deg,#00d4ff,#ff00aa,#ffd600)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",filter:"drop-shadow(0 0 10px rgba(0,212,255,.3))"},children:"¡Puzzle Completado!"}),e.jsx("p",{className:"text-white/50 text-sm mb-6",children:"拼图完成！"}),e.jsxs("div",{className:"grid grid-cols-2 gap-3 mb-6",children:[e.jsxs("div",{className:"stat-card p-3 rounded-xl relative overflow-hidden",style:{background:"rgba(0,212,255,.12)",border:"1px solid rgba(0,212,255,.2)",boxShadow:"0 0 15px rgba(0,212,255,.1)"},children:[e.jsx(H,{size:18,className:"mx-auto mb-1 animate-pulse",style:{color:"#00d4ff"}}),e.jsx("p",{className:"text-xs",style:{color:"rgba(207,216,255,.5)"},children:"Score"}),e.jsx("p",{className:"text-xl font-black",style:{color:"#00d4ff",textShadow:"0 0 10px rgba(0,212,255,.4)"},children:D})]}),e.jsxs("div",{className:"stat-card p-3 rounded-xl relative overflow-hidden",style:{background:"rgba(184,41,221,.12)",border:"1px solid rgba(184,41,221,.2)",boxShadow:"0 0 15px rgba(184,41,221,.1)"},children:[e.jsx(O,{size:18,className:"mx-auto mb-1 animate-pulse",style:{color:"#b829dd"}}),e.jsx("p",{className:"text-xs",style:{color:"rgba(207,216,255,.5)"},children:"Mejor"}),e.jsx("p",{className:"text-xl font-black",style:{color:"#b829dd",textShadow:"0 0 10px rgba(184,41,221,.4)"},children:ae})]})]}),e.jsxs("div",{className:"flex gap-3 justify-center flex-wrap",children:[e.jsxs("button",{onClick:()=>{s(),Z(null)},className:"group px-6 sm:px-8 py-3 rounded-full text-white font-black transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(0,212,255,.4)] flex items-center gap-2",style:{background:"linear-gradient(135deg,#00d4ff,#b829dd)",boxShadow:"0 0 25px rgba(0,212,255,.3)"},children:[e.jsx(ge,{size:16,className:"group-hover:-rotate-180 transition-transform duration-500"})," Jugar de nuevo / 再玩一次"]}),e.jsx("button",{onClick:()=>{s(),f("select")},className:"px-4 py-3 rounded-full text-xs font-bold transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,.15)]",style:{background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.15)",color:"#fff"},children:"Cambiar / 切换"})]}),e.jsx(fe,{currentGameId:"word-puzzle"})]})}),e.jsx("style",{children:`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          .animate-float { animation: float 3s ease-in-out infinite; }

          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin-slow { animation: spin-slow 4s linear infinite; }

          @keyframes bounce-in {
            0% { transform: scale(0.3); opacity: 0; }
            50% { transform: scale(1.05); opacity: 1; }
            70% { transform: scale(0.9); }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-bounce-in { animation: bounce-in 0.5s ease-out both; }

          @keyframes glow-pulse {
            0%, 100% { box-shadow: 0 0 20px rgba(57,255,20,0.3); }
            50% { box-shadow: 0 0 40px rgba(57,255,20,0.6), 0 0 80px rgba(57,255,20,0.2); }
          }
          .animate-glow-pulse { animation: glow-pulse 1.5s ease-in-out infinite; }

          @keyframes slot-pop {
            0% { transform: translateY(0) scale(1) translateZ(0); }
            40% { transform: translateY(-8px) scale(1.25) translateZ(20px); }
            100% { transform: translateY(-3px) scale(1.05) translateZ(10px); }
          }
          .animate-slot-pop { animation: slot-pop 0.35s cubic-bezier(.2,.9,.2,1); }

          @keyframes piece-float-3d {
            0%, 100% { transform: translateY(0px) rotateX(-12deg) rotateY(12deg); }
            25% { transform: translateY(-4px) rotateX(-10deg) rotateY(14deg); }
            50% { transform: translateY(-8px) rotateX(-14deg) rotateY(10deg); }
            75% { transform: translateY(-4px) rotateX(-10deg) rotateY(14deg); }
          }
          .animate-piece-float-3d { animation: piece-float-3d 3s ease-in-out infinite; }

          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-8px); }
            40% { transform: translateX(8px); }
            60% { transform: translateX(-4px); }
            80% { transform: translateX(4px); }
          }
          .animate-shake { animation: shake 0.5s ease-in-out; }

          @keyframes shake-error {
            0%, 100% { transform: translateX(0) rotateX(3deg); }
            10% { transform: translateX(-12px) rotateX(3deg); }
            20% { transform: translateX(12px) rotateX(3deg); }
            30% { transform: translateX(-8px) rotateX(3deg); }
            40% { transform: translateX(8px) rotateX(3deg); }
            50% { transform: translateX(-4px) rotateX(3deg); }
            60% { transform: translateX(4px) rotateX(3deg); }
            70% { transform: translateX(-2px) rotateX(3deg); }
            80% { transform: translateX(2px) rotateX(3deg); }
            90% { transform: translateX(0) rotateX(3deg); }
          }
          .animate-shake-error { animation: shake-error 0.6s ease-in-out; }

          @keyframes red-glow-pulse {
            0%, 100% { box-shadow: 0 0 40px rgba(255,68,68,.3), 0 20px 60px rgba(0,0,0,.5); }
            50% { box-shadow: 0 0 80px rgba(255,68,68,.6), 0 20px 60px rgba(0,0,0,.5); }
          }
          .animate-red-glow { animation: red-glow-pulse 0.6s ease-in-out; }

          @keyframes screen-shake {
            0%, 100% { transform: translate(0, 0); }
            10% { transform: translate(-3px, 2px); }
            20% { transform: translate(3px, -2px); }
            30% { transform: translate(-2px, 1px); }
            40% { transform: translate(2px, -1px); }
            50% { transform: translate(0, 0); }
          }
          .animate-screen-shake { animation: screen-shake 0.5s ease-in-out; }

          @keyframes hint-pulse {
            0%, 100% { box-shadow: 0 0 10px rgba(255,214,0,0.2), 0 0 20px rgba(255,214,0,0.1); }
            50% { box-shadow: 0 0 25px rgba(255,214,0,0.5), 0 0 50px rgba(255,214,0,0.2); }
          }
          .hint-btn { animation: hint-pulse 2s ease-in-out infinite; }

          .module-card {
            transform: rotateX(8deg) rotateY(0deg) translateZ(0);
            transform-style: preserve-3d;
            transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.4s ease;
          }
          .module-card:hover {
            transform: rotateX(0deg) rotateY(-5deg) translateZ(20px) scale(1.03);
            box-shadow: 0 0 40px rgba(0,212,255,.3), 0 20px 40px rgba(0,0,0,.4) !important;
          }

          .puzzle-piece {
            transform-style: preserve-3d;
            transition: box-shadow 0.25s ease, background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
          }
          .puzzle-piece:hover:not(:disabled) {
            transform: rotateX(-20deg) rotateY(20deg) translateZ(25px) translateY(-5px) !important;
            box-shadow: 0 8px 30px rgba(0,212,255,.4), 0 0 40px rgba(0,212,255,.2), inset 0 1px 0 rgba(255,255,255,.3) !important;
            background: linear-gradient(145deg,rgba(0,212,255,.4),rgba(184,41,221,.4)) !important;
            border-color: rgba(0,212,255,.8) !important;
            color: #fff !important;
          }
          .puzzle-piece:active:not(:disabled) {
            transform: rotateX(-5deg) rotateY(5deg) translateZ(-5px) scale(0.95) !important;
          }
          .puzzle-piece-selected {
            transform: translateY(0) scale(0.95);
          }

          .answer-slot {
            transform-style: preserve-3d;
            transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          }
          .answer-slot.filled {
            transform: translateY(-3px) scale(1.05) translateZ(10px);
          }

          .score-pill {
            transform: perspective(600px) rotateX(-12deg) translateZ(5px);
            transform-style: preserve-3d;
            transition: transform 0.3s ease;
          }
          .score-pill:hover {
            transform: perspective(600px) rotateX(-8deg) translateZ(15px) scale(1.05);
          }

          .puzzle-container-3d {
            transform: rotateX(3deg);
            transform-style: preserve-3d;
            transition: transform 0.5s ease, box-shadow 0.5s ease;
          }

          .gameover-card {
            transform: rotateX(8deg) rotateY(0deg);
            transform-style: preserve-3d;
            transition: transform 0.5s ease;
          }
          .gameover-card:hover {
            transform: rotateX(4deg) rotateY(-2deg) translateZ(10px);
          }

          .stat-card {
            transform: perspective(600px) rotateX(5deg);
            transform-style: preserve-3d;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .stat-card:hover {
            transform: perspective(600px) rotateX(0deg) translateZ(15px);
            box-shadow: 0 0 25px rgba(0,212,255,.2) !important;
          }

          @keyframes border-rotate {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .border-gradient-animated {
            background-size: 200% 200%;
            animation: border-rotate 3s ease infinite;
          }

          @keyframes flash-correct {
            0% { opacity: 0; }
            20% { opacity: 0.4; }
            100% { opacity: 0; }
          }
          .flash-overlay {
            position: absolute;
            inset: 0;
            background: rgba(57, 255, 20, 0.15);
            pointer-events: none;
            z-index: 10;
            border-radius: 24px;
            opacity: 0;
          }
          .flash-overlay.active {
            animation: flash-correct 0.5s ease-out;
          }
        `})]})]})}export{Xe as default};
