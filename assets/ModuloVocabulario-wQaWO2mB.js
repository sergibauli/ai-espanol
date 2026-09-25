import{r as i,I as C,j as a,aa as T,V as F,H as R,B as z,a1 as B,ab as E}from"./index-B2qp2V8o.js";const d=["#00d4ff","#ff00aa","#ffd600","#39ff14","#ff6b35"];function V(r){if(!("speechSynthesis"in window))return;const n=new SpeechSynthesisUtterance(r);n.lang="es-ES",window.speechSynthesis.cancel(),window.speechSynthesis.speak(n)}function P({vocabulario:r,showChinese:n=!1,level:g="A1"}){const[l,h]=i.useState(""),[m,p]=i.useState(null),{addFavorite:y,removeFavorite:j,isFavorite:u}=C(),[A,w]=i.useState(0),f=i.useMemo(()=>{if(!l.trim())return r;const e=l.toLowerCase();return r.filter(s=>s.espanol?.toLowerCase().includes(e)||s.chino?.toLowerCase().includes(e)||s.ejemplo?.toLowerCase().includes(e))},[r,l]),v=(e,s)=>{p(e),V(s),setTimeout(()=>p(null),1200)},k=e=>{u(e.espanol)?j(e.espanol):y(e.espanol,e.chino,"Vocabulario",g)};return a.jsxs("div",{className:"w-full max-w-6xl mx-auto px-4 py-6",children:[a.jsx("style",{children:`
        @keyframes gradientBorder {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes neonPulseCard {
          0%, 100% { box-shadow: 0 8px 32px rgba(0,0,0,0.25); }
          50% { box-shadow: 0 8px 32px rgba(0,0,0,0.25), 0 0 30px var(--card-glow); }
        }
        .vocab-card {
          position: relative;
          z-index: 1;
          transition: all 0.5s ease-out;
        }
        .vocab-card::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 1.6rem;
          background: linear-gradient(60deg, var(--card-color), var(--card-accent), var(--card-color));
          background-size: 300% 300%;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.5s ease;
          animation: gradientBorder 3s ease infinite;
        }
        .vocab-card:hover::before {
          opacity: 1;
        }
        .vocab-card:hover {
          transform: translateY(-8px) scale(1.02) rotateX(2deg);
          box-shadow: 0 20px 48px rgba(0,0,0,0.35), 0 0 40px var(--card-glow);
        }
      `}),a.jsxs("div",{className:"fx-section-head mb-10",children:[a.jsx("h1",{className:"fx-title text-4xl md:text-5xl font-black mb-3",children:"Vocabulario"}),a.jsxs("p",{className:"text-base md:text-lg font-bold",style:{color:"rgba(255,255,255,0.55)"},children:[r.length," palabras · Practica y escucha"]}),a.jsx("div",{className:"fx-underline"})]}),a.jsx("div",{className:"max-w-md mx-auto mb-10",children:a.jsxs("div",{className:"relative",children:[a.jsx("input",{type:"text",value:l,onChange:e=>h(e.target.value),placeholder:"Buscar palabra...",className:"w-full rounded-2xl px-5 py-3.5 text-base md:text-lg text-white placeholder-white/30 outline-none transition-all",style:{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",backdropFilter:"blur(12px)"},onFocus:e=>{e.currentTarget.style.borderColor="rgba(0,212,255,0.4)",e.currentTarget.style.background="rgba(0,212,255,0.06)",e.currentTarget.style.boxShadow="0 0 24px rgba(0,212,255,0.15)"},onBlur:e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.08)",e.currentTarget.style.background="rgba(255,255,255,0.05)",e.currentTarget.style.boxShadow="none"}}),a.jsx("span",{className:"absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-xl",children:"🔍"})]})}),a.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 fx-stagger",children:f.map((e,s)=>{const x=e.id??s,c=m===x,t=u(e.espanol),o=T(e.espanol),b=d[s%d.length],N=d[(s+2)%d.length];return a.jsxs("div",{className:"vocab-card fx-tilt group relative rounded-3xl p-6 md:p-8","data-fx-tilt-max":"4",style:{background:"linear-gradient(145deg, rgba(25,28,55,0.95), rgba(12,14,35,0.98))",border:"1px solid rgba(255,255,255,0.06)",backdropFilter:"blur(20px)",boxShadow:"0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)","--card-color":b,"--card-accent":N,"--card-glow":`${b}25`},children:[a.jsx("div",{className:"absolute top-0 left-6 right-6 h-[2.5px] rounded-full transition-all",style:{background:`linear-gradient(90deg, ${b}, transparent)`,opacity:.7}}),a.jsxs("div",{className:"flex items-start justify-between mb-5",children:[a.jsxs("div",{children:[a.jsx("h3",{className:"text-xl md:text-2xl font-black text-white mb-1",children:e.espanol}),n&&a.jsx("p",{className:"text-lg md:text-xl font-bold",style:{color:"#ffd600",textShadow:"0 0 12px rgba(255,214,0,0.2)"},children:e.chino})]}),a.jsxs("div",{className:"flex items-center gap-2",children:[a.jsx("button",{onClick:()=>v(x,e.espanol),className:"w-11 h-11 rounded-full flex items-center justify-center transition-all active:scale-95",style:{background:c?"rgba(0,212,255,0.25)":"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)"},title:"Escuchar",children:a.jsx(F,{size:20,className:"transition-all",style:{transform:c?"scale(1.2)":"scale(1)",filter:c?"drop-shadow(0 0 6px #00d4ff)":"none",color:c?"#00d4ff":"rgba(255,255,255,0.7)"}})}),a.jsx("button",{onClick:()=>k(e),className:"w-11 h-11 rounded-full flex items-center justify-center transition-all active:scale-95",style:{background:t?"rgba(255,0,100,0.15)":"rgba(255,255,255,0.06)",border:`1px solid ${t?"rgba(255,0,100,0.3)":"rgba(255,255,255,0.1)"}`},title:t?"Quitar de favoritos":"Añadir a favoritos",children:a.jsx(R,{size:20,className:"transition-all",fill:t?"#ff4d8a":"none",style:{color:t?"#ff4d8a":"rgba(255,255,255,0.7)",filter:t?"drop-shadow(0 0 8px rgba(255,77,138,0.5))":"none"}})}),a.jsx("button",{onClick:()=>{o?B(e.espanol):E(e.espanol,e.chino,"Vocabulario",g),w(S=>S+1)},className:"w-11 h-11 rounded-full flex items-center justify-center transition-all active:scale-95",style:{background:o?"rgba(0,212,255,0.18)":"rgba(255,255,255,0.06)",border:`1px solid ${o?"rgba(0,212,255,0.35)":"rgba(255,255,255,0.1)"}`},title:o?"En memoria":"Añadir a memoria (SRS)",children:a.jsx(z,{size:20,style:{color:o?"#66e7ff":"rgba(255,255,255,0.7)",filter:o?"drop-shadow(0 0 6px rgba(0,212,255,0.6))":"none"}})})]})]}),e.ejemplo&&a.jsxs("div",{className:"rounded-xl p-4 mt-4",style:{background:"rgba(255,255,255,0.03)"},children:[a.jsx("p",{className:"text-sm font-bold uppercase tracking-wider mb-1",style:{color:"rgba(255,255,255,0.35)"},children:"Ejemplo"}),a.jsx("p",{className:"text-base md:text-lg text-white/80 leading-relaxed font-medium",children:e.ejemplo})]})]},x)})},l),f.length===0&&a.jsxs("div",{className:"text-center py-20",children:[a.jsx("div",{className:"text-5xl mb-4 opacity-30",children:"🔍"}),a.jsx("p",{className:"text-white/40 font-medium",children:"No se encontraron palabras"})]})]})}export{P as default};
