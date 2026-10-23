import {
  ArrowRightIcon,
  TrophyIcon,
  UserIcon,
  SendIcon,
  StarIcon,
  ArrowLeftIcon,
  Link2Icon,
  RotateCcwIcon,
  HashIcon,
  TimerIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P as P_1 } from "../../components/PostGameNav.jsx";
import { SoundToggles } from "../../components/SoundToggles.jsx";
import { a } from "../../lib/juegos-utils.js";
import { useSound } from "../../lib/sound.jsx";
function JComponent() {
  const rRef = React.useRef(null);
  React.useEffect(() => {
    const rRef_current = rRef.current;
    if (!rRef_current) {
      return;
    }
    const o = rRef_current.getContext("2d");
    if (!o) {
      return;
    }
    let d;
    const t = [];
    const l = ["255,42,109", "255,140,0", "255,234,0", "0,245,255", "188,19,254", "57,255,20"];
    const u = () => {
      const e = window.devicePixelRatio || 1;
      rRef_current.width = window.innerWidth * e;
      rRef_current.height = window.innerHeight * e;
      rRef_current.style.width = `${window.innerWidth}px`;
      rRef_current.style.height = `${window.innerHeight}px`;
      o.setTransform(e, 0, 0, e, 0, 0);
      t.length = 0;
      const s = Math.min(100, Math.floor(window.innerWidth / 12));
      for (let x = 0; x < s; x++) {
        t.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          r: Math.random() * 3 + 0.5,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          a: Math.random() * 0.6 + 0.2,
          c: l[Math.floor(Math.random() * l.length)],
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.03,
        });
      }
    };
    const m = () => {
      o.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const e of t) {
        e.x += e.vx;
        e.y += e.vy;
        e.pulse += e.pulseSpeed;
        if (e.x < -30) {
          e.x = window.innerWidth + 30;
        }
        if (e.x > window.innerWidth + 30) {
          e.x = -30;
        }
        if (e.y < -30) {
          e.y = window.innerHeight + 30;
        }
        if (e.y > window.innerHeight + 30) {
          e.y = -30;
        }
        const s = e.a * (0.5 + 0.5 * Math.sin(e.pulse));
        const x = e.r * (0.8 + 0.2 * Math.sin(e.pulse));
        o.beginPath();
        o.fillStyle = `rgba(${e.c},${s})`;
        o.shadowBlur = 20;
        o.shadowColor = `rgba(${e.c},.8)`;
        o.arc(e.x, e.y, x, 0, Math.PI * 2);
        o.fill();
      }
      o.shadowBlur = 0;
      d = requestAnimationFrame(m);
    };
    u();
    window.addEventListener("resize", u);
    m();
    return () => {
      cancelAnimationFrame(d);
      window.removeEventListener("resize", u);
    };
  }, []);
  return (
    <canvas
      ref={rRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
function DComponent({ expression }) {
  const cy =
    expression === "excited" || expression === "cool"
      ? 22
      : expression === "sad" || expression === "worried"
        ? 30
        : 26;
  const d_1 =
    expression === "happy" || expression === "excited" || expression === "cool"
      ? "M22,42 Q30,50 38,42"
      : expression === "sad" || expression === "worried"
        ? "M24,48 Q30,42 36,48"
        : "M26,46 Q30,48 34,46";
  const opacity = expression === "happy" || expression === "excited" || expression === "cool" ? 0.5 : 0.2;
  const t = expression === "excited" || expression === "cool";
  const l = expression === "worried";
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter: "drop-shadow(0 4px 12px rgba(57,255,20,0.4))",
      }}
    >
      <defs>
        <radialGradient id="wcBody" cx="0.5" cy="0.4" r="0.5">
          <stop offset="0%" stopColor="#a2ff6a" />
          <stop offset="100%" stopColor="#39ff14" />
        </radialGradient>
        <filter id="wcGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <ellipse cx="30" cy="34" rx="22" ry="20" fill="url(#wcBody)" filter="url(#wcGlow)" opacity="0.9" />
      <ellipse cx="30" cy="34" rx="22" ry="20" fill="url(#wcBody)" opacity="0.95" />
      <circle cx="14" cy="38" r="5" fill="#ff6b9d" opacity={opacity} />
      <circle cx="46" cy="38" r="5" fill="#ff6b9d" opacity={opacity} />
      {t ? (
        <>
          <polygon
            points="18,24 20,29 25,29 21,32 23,37 18,34 13,37 15,32 11,29 16,29"
            fill="#0a0a1a"
            transform="translate(0, 2)"
          />
          <polygon
            points="42,24 44,29 49,29 45,32 47,37 42,34 37,37 39,32 35,29 40,29"
            fill="#0a0a1a"
            transform="translate(0, 2)"
          />
        </>
      ) : (
        <>
          <ellipse
            cx="20"
            cy={cy}
            rx="3.5"
            ry={expression === "sad" || expression === "worried" ? 2.5 : 4}
            fill="#0a0a1a"
          />
          <ellipse
            cx="40"
            cy={cy}
            rx="3.5"
            ry={expression === "sad" || expression === "worried" ? 2.5 : 4}
            fill="#0a0a1a"
          />
          <circle cx="21.5" cy={cy - 1.5} r="1.3" fill="white" opacity="0.8" />
          <circle cx="41.5" cy={cy - 1.5} r="1.3" fill="white" opacity="0.8" />
        </>
      )}
      <path d={d_1} stroke="#0a0a1a" strokeWidth="2" strokeLinecap="round" fill="none" />
      {t && (
        <>
          <circle cx="6" cy="12" r="1.5" fill="#ffd600" />
          <circle cx="54" cy="8" r="2" fill="#00d4ff" />
          <circle cx="8" cy="52" r="1.5" fill="#ff00aa" />
          <circle cx="52" cy="50" r="1.5" fill="#39ff14" />
        </>
      )}
      {l && <ellipse cx="52" cy="14" rx="2" ry="3" fill="#00d4ff" opacity="0.7" />}
    </svg>
  );
}
function ma(r = window.innerWidth / 2, i = window.innerHeight / 2) {
  const o = ["#39ff14", "#00d4ff", "#ffd600", "#ff00aa", "#ff6b35", "#bd00ff"];
  for (let d = 0; d < 150; d++) {
    const t = document.createElement("div");
    const l = 4 + Math.random() * 10;
    t.style.cssText = `position:fixed;left:${r}px;top:${i}px;width:${l}px;height:${l}px;border-radius:50%;background:${o[d % o.length]};pointer-events:none;z-index:99999;box-shadow:0 0 12px ${o[d % o.length]},0 0 24px ${o[d % o.length]};`;
    document.body.appendChild(t);
    const u = (Math.PI * 2 * d) / 150 + (Math.random() - 0.5) * 0.5;
    const m = 5 + Math.random() * 20;
    let e = r;
    let s = i;
    let x = 1;
    const k = Math.cos(u) * m;
    const z = Math.sin(u) * m;
    const b = 0.15 + Math.random() * 0.2;
    let h = 0;
    const y = () => {
      h++;
      e += k * 0.97 ** h;
      s += z * 0.97 ** h + b * h;
      x -= 0.007;
      t.style.left = `${e}px`;
      t.style.top = `${s}px`;
      t.style.opacity = String(x);
      t.style.transform = `rotate(${h * 4}deg) scale(${x})`;
      if (x > 0) {
        requestAnimationFrame(y);
      } else {
        t.remove();
      }
    };
    requestAnimationFrame(y);
  }
}
const pa = new Set([
  "casa",
  "perro",
  "gato",
  "amor",
  "paz",
  "sol",
  "luna",
  "mar",
  "rio",
  "flor",
  "mano",
  "pie",
  "boca",
  "ojo",
  "nariz",
  "oreja",
  "dedo",
  "brazo",
  "pierna",
  "ropa",
  "agua",
  "pan",
  "leche",
  "carne",
  "pescado",
  "fruta",
  "verdura",
  "arroz",
  "huevo",
  "queso",
  "escuela",
  "libro",
  "lapiz",
  "mesa",
  "silla",
  "puerta",
  "ventana",
  "cielo",
  "tierra",
  "fuego",
  "aire",
  "viento",
  "nube",
  "estrella",
  "montana",
  "calle",
  "ciudad",
  "pais",
  "mundo",
  "vida",
  "nino",
  "nina",
  "madre",
  "padre",
  "familia",
  "amigo",
  "amiga",
  "tiempo",
  "dia",
  "noche",
  "hora",
  "minuto",
  "semana",
  "mes",
  "ayer",
  "hoy",
  "manana",
  "siempre",
  "nunca",
  "tarde",
  "antes",
  "despues",
  "muy",
  "bien",
  "mal",
  "grande",
  "pequeno",
  "largo",
  "corto",
  "alto",
  "bajo",
  "nuevo",
  "viejo",
  "bueno",
  "malo",
  "feliz",
  "triste",
  "facil",
  "dificil",
  "rapido",
  "lento",
  "caliente",
  "frio",
  "limpio",
  "abierto",
  "cerrado",
  "lleno",
  "vacio",
  "preparado",
  "primero",
  "segundo",
  "tercero",
  "ultimo",
  "otro",
  "mismo",
  "todos",
  "nada",
  "algo",
  "quien",
  "que",
  "donde",
  "cuando",
  "como",
  "porque",
  "por",
  "para",
  "con",
  "sin",
  "sobre",
  "entre",
  "contra",
  "hasta",
  "desde",
  "durante",
  "ante",
  "tras",
  "tambien",
  "tampoco",
  "asi",
  "aqui",
  "alla",
  "fuera",
  "dentro",
  "arriba",
  "abajo",
  "delante",
  "detras",
  "cerca",
  "lejos",
  "rojo",
  "azul",
  "verde",
  "amarillo",
  "blanco",
  "negro",
  "gris",
  "rosa",
  "color",
  "escribir",
  "leer",
  "hablar",
  "escuchar",
  "mirar",
  "ver",
  "sentir",
  "tocar",
  "pensar",
  "saber",
  "entender",
  "aprender",
  "ensenar",
  "estudiar",
  "trabajar",
  "jugar",
  "cantar",
  "bailar",
  "correr",
  "caminar",
  "saltar",
  "nadar",
  "volar",
  "caer",
  "levantar",
  "sentar",
  "empezar",
  "terminar",
  "acabar",
  "seguir",
  "volver",
  "ir",
  "venir",
  "llegar",
  "salir",
  "entrar",
  "pasar",
  "subir",
  "bajar",
  "cruz",
  "uno",
  "dos",
  "tres",
  "mesa",
  "silla",
  "puerta",
  "ventana",
  "techo",
  "pared",
  "suelo",
  "cocina",
  "bano",
  "dormitorio",
  "salon",
  "jardin",
  "patio",
  "garaje",
  "balcon",
  "tele",
  "radio",
  "coche",
  "auto",
  "bus",
  "tren",
  "avion",
  "barco",
  "bici",
  "moto",
  "camion",
  "taxi",
  "metro",
  "ruta",
  "viaje",
  "plaza",
  "parque",
  "bosque",
  "playa",
  "campo",
  "lado",
  "esquina",
  "puente",
  "torre",
  "edificio",
  "hospital",
  "farmacia",
  "tienda",
  "mercado",
  "banco",
  "hotel",
  "cine",
  "teatro",
  "museo",
  "biblioteca",
  "iglesia",
  "templo",
  "mezquita",
  "catedral",
  "palacio",
  "castillo",
  "fortaleza",
  "muralla",
  "puerto",
  "muelle",
  "estadio",
  "gimnasio",
  "pista",
  "piscina",
  "cancha",
  "campo",
  "caballero",
  "dama",
  "rey",
  "reina",
  "principe",
  "princesa",
  "presidente",
  "ministro",
  "doctor",
  "enfermera",
  "maestro",
  "profesor",
  "alumno",
  "estudiante",
  "ingeniero",
  "abogado",
  "juez",
  "policia",
  "soldado",
  "cocinero",
  "camarero",
  "mesero",
  "actor",
  "artista",
  "musico",
  "pintor",
  "escritor",
  "poeta",
  "periodista",
  "deportista",
  "atleta",
  "campeon",
  "ganador",
  "perdedor",
  "mascota",
  "animal",
  "pez",
  "pajaro",
  "raton",
  "caballo",
  "vaca",
  "toro",
  "oveja",
  "cabra",
  "cerdo",
  "gallina",
  "pato",
  "pollo",
  "huevo",
  "carne",
  "pan",
  "pasta",
  "sopa",
  "ensalada",
  "manzana",
  "pera",
  "naranja",
  "limon",
  "platano",
  "uva",
  "fresa",
  "sandia",
  "melon",
  "cereza",
  "melocoton",
  "durazno",
  "ciruela",
  "higo",
  "kiwi",
  "mango",
  "pina",
  "tomate",
  "patata",
  "cebolla",
  "ajo",
  "zanahoria",
  "pepino",
  "pimiento",
  "lechuga",
  "espinaca",
  "brocoli",
  "coliflor",
  "berenjena",
  "calabacin",
  "calabaza",
  "maiz",
  "trigo",
  "cebada",
  "avena",
  "arveja",
  "lenteja",
  "habicuela",
  "judia",
  "garbanzo",
  "alubia",
  "soja",
  "aceite",
  "vinagre",
  "sal",
  "azucar",
  "miel",
  "cafe",
  "te",
  "chocolate",
  "galleta",
  "pastel",
  "tarta",
  "helado",
  "yogur",
  "natillas",
  "flan",
  "crema",
  "mantequilla",
  "mermelada",
  "manteca",
  "jamon",
  "chorizo",
  "salchicha",
  "mortadela",
  "tocino",
  "filete",
  "chuleta",
  "pollo",
  "pavo",
  "conejo",
  "cordero",
  "ternera",
  "cerdo",
  "pescado",
  "marisco",
  "camarones",
  "langosta",
  "mejillon",
  "almeja",
  "ostra",
  "calamar",
  "pulpo",
  "atun",
  "salmon",
  "bacalao",
  "merluza",
  "sardina",
  "anchoa",
  "boqueron",
  "dorada",
  "lubina",
  "trucha",
  "rio",
  "lago",
  "laguna",
  "estanque",
  "manantial",
  "cascada",
  "fuente",
  "pozo",
  "canal",
  "dique",
  "presa",
  "tapa",
  "tapon",
  "cubo",
  "bolsa",
  "bolsillo",
  "mochila",
  "maleta",
  "cartera",
  "monedero",
  "paraguas",
  "sombrilla",
  "bufanda",
  "guante",
  "gorro",
  "sombrero",
  "corbata",
  "cinturon",
  "zapato",
  "bota",
  "sandalia",
  "zapatilla",
  "tenis",
  "pantalon",
  "vaquero",
  "falda",
  "vestido",
  "traje",
  "camisa",
  "camiseta",
  "jersey",
  "sueter",
  "chaqueta",
  "abrigo",
  "impermeable",
  "pijama",
  "tela",
  "aguja",
  "hilo",
  "boton",
  "cremallera",
  "bola",
  "pelota",
  "raqueta",
  "red",
  "canasta",
  "cinta",
  "medalla",
  "copa",
  "premio",
  "trofeo",
  "regalo",
  "sorpresa",
  "fiesta",
  "cumple",
  "boda",
  "comunion",
  "navidad",
  "reyes",
  "pascua",
  "feria",
  "verbena",
  "festival",
  "concierto",
  "actuacion",
  "exhibicion",
  "musica",
  "cancion",
  "instrumento",
  "guitarra",
  "piano",
  "violin",
  "bateria",
  "flauta",
  "trompeta",
  "saxofon",
  "baile",
  "danza",
  "pintura",
  "escultura",
  "dibujo",
  "fotografia",
  "cine",
  "pelicula",
  "serie",
  "novela",
  "cuento",
  "poesia",
  "drama",
  "comedia",
  "tragedia",
  "accion",
  "aventura",
  "romance",
  "terror",
  "misterio",
  "ciencia",
  "ficcion",
  "historia",
  "geografia",
  "matematicas",
  "fisica",
  "quimica",
  "biologia",
  "astronomia",
  "medicina",
  "enfermedad",
  "salud",
  "doctor",
  "hospital",
  "clinica",
  "farmacia",
  "medicina",
  "pastilla",
  "jarabe",
  "inyeccion",
  "operacion",
  "cura",
  "deporte",
  "juego",
  "equipo",
  "jugador",
  "partido",
  "competicion",
  "carrera",
  "maraton",
  "natacion",
  "ciclismo",
  "esqui",
  "surf",
  "skate",
  "boxeo",
  "lucha",
  "karate",
  "yoga",
  "pilates",
  "gimnasia",
  "atletismo",
  "futbol",
  "baloncesto",
  "tenis",
  "voleibol",
  "rugby",
  "hockey",
  "golf",
  "cricket",
  "beisbol",
  "softbol",
  "handball",
  "deporte",
  "ejercicio",
  "entrenamiento",
  "musculacion",
  "dieta",
  "nutricion",
  "calorias",
  "proteinas",
  "vitaminas",
  "minerales",
  "agua",
  "sueño",
  "descanso",
  "relajacion",
  "vacaciones",
  "viaje",
  "excursion",
  "camping",
  "senderismo",
  "escalada",
  "pesca",
  "caza",
  "naturaleza",
  "ecologia",
  "medioambiente",
  "contaminacion",
  "reciclaje",
  "energia",
  "solar",
  "eolica",
  "nuclear",
  "petroleo",
  "gas",
  "carbon",
  "mineral",
  "oro",
  "plata",
  "cobre",
  "hierro",
  "acero",
  "aluminio",
  "platino",
  "diamante",
  "rubí",
  "esmeralda",
  "zafiro",
  "perla",
  "coral",
  "jade",
  "cristal",
  "vidrio",
  "plastico",
  "papel",
  "madera",
  "caucho",
  "cuero",
  "algodon",
  "lana",
  "seda",
  "nylon",
  "poliester",
  "teflon",
  "cemento",
  "hormigon",
  "ladrillo",
  "arena",
  "piedra",
  "roca",
  "tierra",
  "barro",
  "arcilla",
  "hormiga",
  "abeja",
  "mariposa",
  "mosca",
  "mosquito",
  "araña",
  "escorpion",
  "caracol",
  "serpiente",
  "cocodrilo",
  "lagarto",
  "tortuga",
  "rana",
  "sapo",
  "salamandra",
  "triton",
  "pez",
  "tiburon",
  "ballena",
  "delfin",
  "foca",
  "leon",
  "tigre",
  "elefante",
  "jirafa",
  "rinoceronte",
  "hipopotamo",
  "cebra",
  "mono",
  "gorila",
  "chimpance",
  "orangutan",
  "oso",
  "panda",
  "lobo",
  "zorro",
  "ciervo",
  "alce",
  "jabalí",
  "liebre",
  "conejo",
  "ardilla",
  "castor",
  "murcielago",
  "erizo",
  "mapache",
  "tejon",
  "nutria",
  "morsa",
  "narval",
  "beluga",
  "orca",
  "ballena",
  "cuervo",
  "aguila",
  "halcon",
  "buho",
  "lechuza",
  "paloma",
  "gorrion",
  "canario",
  "periquito",
  "loro",
  "tucan",
  "flamenco",
  "cisne",
  "pato",
  "ganso",
  "colibri",
  "abeja",
  "avispa",
  "hormiga",
  "termite",
  "escarabajo",
  "mariposa",
  "polilla",
  "saltamontes",
  "grillo",
  "mantis",
  "luciernaga",
  "libelula",
  "cigarra",
  "chinche",
  "pulga",
  "piojo",
  "garrapata",
  "oruga",
  "mariposa",
  "mariquita",
  "escarabajo",
  "escorpion",
  "ciempies",
  "milpies",
  "araña",
  "tarantula",
  "cangrejo",
  "langosta",
  "gamba",
  "langostino",
  "barnaculo",
  "estrella",
  "medusa",
  "anémona",
  "coral",
  "esponja",
  "alga",
  "placton",
  "plancton",
]);
function xa(r) {
  const i = r
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  return !!(pa.has(i) || (i.length >= 3 && /^[a-zñ]+$/.test(i)));
}
function FaComponent({ word, index, isLatest, isPlayer1 }) {
  const t = isPlayer1 ? "#ff00aa" : "#00d4ff";
  const l = isPlayer1 ? "rgba(255,0,170,0.4)" : "rgba(0,212,255,0.4)";
  return (
    <div
      className="relative flex flex-col items-center"
      style={{
        zIndex: 10,
        animation: `blockAppear 0.5s ease-out ${index * 0.08}s both`,
      }}
    >
      <div
        className="relative px-5 py-3 rounded-2xl font-black text-lg md:text-xl uppercase tracking-wider"
        style={{
          background: `linear-gradient(135deg, ${t}22, ${t}08)`,
          border: `1.5px solid ${t}60`,
          color: t,
          boxShadow: isLatest
            ? `0 0 30px ${l}, 0 0 60px ${l}, 0 0 100px ${l}, inset 0 1px 0 rgba(255,255,255,0.1)`
            : `0 0 15px ${l}, 0 4px 20px rgba(0,0,0,0.3)`,
          transform: isLatest ? "scale(1.1) translateZ(30px)" : "scale(1)",
          transition: "all 0.4s cubic-bezier(.2,.9,.2,1)",
          textShadow: `0 0 15px ${l}`,
        }}
      >
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, transparent 40%, ${t}15 50%, transparent 60%)`,
              animation: isLatest ? "shimmer 2s ease-in-out infinite" : "none",
            }}
          />
        </div>
        {word}
        {isLatest && (
          <div
            className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center"
            style={{
              background: t,
              boxShadow: `0 0 10px ${t}`,
            }}
          >
            <StarIcon size={10} className="text-white" />
          </div>
        )}
      </div>
      <div
        className="mt-1 text-[10px] font-bold uppercase tracking-wider opacity-60"
        style={{
          color: t,
        }}
      >
        {isPlayer1 ? "J1" : "J2"}
      </div>
    </div>
  );
}
function NaComponent() {
  const { playCorrect, playWrong, playWin, playLose, playClick } = useSound();
  const [l, setL] = React.useState("select");
  const [m, setM] = React.useState([]);
  const [s, setS] = React.useState(1);
  const [k, setK] = React.useState("");
  const [b, setB] = React.useState(10);
  const [y, setY] = React.useState("");
  const [j, setJ] = React.useState(null);
  const [U, setU] = React.useState(new Set());
  const [ua, setUa] = React.useState(new Set());
  const [v, setV] = React.useState(false);
  const [V, setV_1] = React.useState(false);
  const WRef = React.useRef(null);
  const RRef = React.useRef(null);
  const KRef = React.useRef(null);
  const QRef = React.useRef(null);
  const [F, setF] = React.useState(() => {
    try {
      return parseInt(localStorage.getItem("wordchain_best") || "0");
    } catch {
      return 0;
    }
  });
  const expression = j === 1 ? "excited" : j === 2 ? "sad" : b <= 3 ? "worried" : s === 1 ? "happy" : "cool";
  const P = React.useCallback(() => {
    playClick();
    const n = a()
      .map((N) => N.espanol.toLowerCase().trim())
      .filter((N) => N.length >= 2 && N.length <= 12 && !N.includes(" "));
    const g = new Set(n);
    setUa(g);
    const f = n.length > 0 ? n[Math.floor(Math.random() * n.length)] : "casa";
    setM([
      {
        word: f,
        player: 1,
      },
    ]);
    setU(new Set([f]));
    setS(2);
    setB(10);
    setJ(null);
    setY(`Empieza con "${f.toUpperCase()}". Turno de J2.`);
    setL("playing");
    setV(false);
    setV_1(false);
    setTimeout(() => RRef.current?.focus(), 100);
  }, [playClick]);
  React.useEffect(() => {
    if (l === "playing") {
      WRef.current = setInterval(() => {
        setB((p) => {
          if (p <= 1) {
            const n = s;
            const g = n === 1 ? 2 : 1;
            setJ(g);
            setL("gameover");
            setY(`¡Se acabó el tiempo! J${n} pierde. ¡Gana J${g}!`);
            if (g === 1) {
              playWin();
              ma();
            } else {
              playLose();
            }
            setF((f) => {
              const w = Math.max(f, m.length);
              localStorage.setItem("wordchain_best", String(w));
              return w;
            });
            return 0;
          }
          return p - 1;
        });
      }, 1000);
      return () => {
        if (WRef.current) {
          clearInterval(WRef.current);
        }
      };
    }
  }, [l, s, m.length, playWin, playLose]);
  const aa = (p) => {
    const n = p.trim().toLowerCase();
    if (!n) {
      return "Escribe una palabra";
    }
    if (n.includes(" ") || n.includes("-")) {
      return "Solo una palabra";
    }
    if (n.length < 2) {
      return "Mínimo 2 letras";
    }
    if (U.has(n)) {
      return "¡Palabra ya usada!";
    }
    if (m.length > 0) {
      const g = m[m.length - 1].word;
      const f = g[g.length - 1];
      if (n[0] !== f) {
        return `Debe empezar con "${f.toUpperCase()}"`;
      }
    }
    if (/^[a-záéíóúüñ]+$/.test(n)) {
      if (xa(n)) {
        return null;
      }
      return "Palabra no válida en español";
    }
    return "Caracteres inválidos";
  };
  const I = () => {
    const p = aa(k);
    if (p) {
      playWrong();
      setY(p);
      setV(true);
      setV_1(true);
      setTimeout(() => {
        setV(false);
        setV_1(false);
      }, 500);
      return;
    }
    const n = k.trim().toLowerCase();
    playCorrect();
    const g = [
      ...m,
      {
        word: n,
        player: s,
      },
    ];
    setM(g);
    setU((w) => new Set(w).add(n));
    setK("");
    setB(10);
    const f = s === 1 ? 2 : 1;
    setS(f);
    setY(`Turno de J${f}. Última letra: "${n[n.length - 1].toUpperCase()}"`);
    setTimeout(() => RRef.current?.focus(), 50);
  };
  const onKeyDown = (p) => {
    if (p.key === "Enter") {
      I();
    }
  };
  const color = b > 5 ? "#39ff14" : b > 2 ? "#ffd600" : "#ff003c";
  const A = b > 5 ? "rgba(57,255,20,0.3)" : b > 2 ? "rgba(255,214,0,0.3)" : "rgba(255,0,60,0.4)";
  if (l === "select") {
    return (
      <StarfieldBackground>
        <JComponent />
        <div className="max-w-3xl mx-auto px-4 py-6 min-h-screen relative z-10">
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/juegos"
              className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold group"
            >
              <ArrowLeftIcon size={16} className="group-hover:-translate-x-1 transition-transform" /> Volver /
              返回
            </Link>
            <SoundToggles />
          </div>
          <div className="text-center mb-10">
            <h1
              className="text-4xl md:text-6xl font-black mb-3"
              style={{
                textShadow: "0 0 40px rgba(57,255,20,0.4), 0 0 80px rgba(0,212,255,0.2)",
              }}
            >
              <Link2Icon
                size={40}
                className="inline mr-3 mb-1 animate-pulse"
                style={{
                  filter: "drop-shadow(0 0 15px rgba(57,255,20,0.6))",
                }}
              />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#39ff14] via-[#00d4ff] to-[#ffd600]">
                Cadenas de Palabras
              </span>
            </h1>
            <p className="text-white/40 text-sm font-medium">
              Alterna palabras conectadas por letras / 连接字母的单词链
            </p>
          </div>
          <div className="max-w-lg mx-auto space-y-4">
            <div
              className="rounded-3xl p-6 relative overflow-hidden"
              style={{
                background: "linear-gradient(180deg, rgba(14,22,64,.7), rgba(5,8,27,.5))",
                border: "1px solid rgba(57,255,20,.3)",
                boxShadow: "0 0 40px rgba(57,255,20,.15), 0 10px 40px rgba(0,0,0,.3)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: "rgba(57,255,20,.2)",
                    border: "1px solid rgba(57,255,20,.3)",
                  }}
                >
                  <Link2Icon
                    size={20}
                    style={{
                      color: "#39ff14",
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-white font-black text-sm">Reglas / 规则</h3>
                  <p className="text-white/40 text-xs">Cómo jugar</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-white/60">
                <li className="flex items-start gap-2">
                  <ArrowRightIcon
                    size={14}
                    className="mt-1 flex-shrink-0"
                    style={{
                      color: "#39ff14",
                    }}
                  />{" "}
                  Jugador 1 comienza con una palabra aleatoria.
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRightIcon
                    size={14}
                    className="mt-1 flex-shrink-0"
                    style={{
                      color: "#39ff14",
                    }}
                  />{" "}
                  El siguiente jugador debe decir una palabra que empiece con la <strong>última letra</strong>{" "}
                  de la anterior.
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRightIcon
                    size={14}
                    className="mt-1 flex-shrink-0"
                    style={{
                      color: "#39ff14",
                    }}
                  />{" "}
                  No se pueden repetir palabras.
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRightIcon
                    size={14}
                    className="mt-1 flex-shrink-0"
                    style={{
                      color: "#39ff14",
                    }}
                  />{" "}
                  Tienes <strong>10 segundos</strong> por turno. Si se acaba el tiempo, pierdes.
                </li>
              </ul>
            </div>
            <button
              onClick={P}
              className="w-full group rounded-3xl p-6 text-center transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(57,255,20,.15), rgba(0,212,255,.15))",
                border: "1px solid rgba(57,255,20,.4)",
                boxShadow: "0 0 40px rgba(57,255,20,.2), 0 10px 40px rgba(0,0,0,.3)",
              }}
            >
              <div
                className="absolute -inset-[1px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, rgba(57,255,20,0), rgba(57,255,20), rgba(57,255,20,0))",
                  backgroundSize: "200% 100%",
                  animation: "borderRotate 3s linear infinite",
                  zIndex: -1,
                }}
              />
              <h3 className="text-white font-black text-xl mb-1">¡Empezar!</h3>
              <p
                className="text-xs font-medium"
                style={{
                  color: "rgba(57,255,20,.7)",
                }}
              >
                开始游戏 / Start Game
              </p>
            </button>
          </div>
          <div className="fixed bottom-4 right-4 z-50 pointer-events-none hidden md:block">
            <div className="animate-float">
              <DComponent expression="happy" />
            </div>
            <div className="mt-1 text-center">
              <div
                className="text-[10px] font-black px-2 py-0.5 rounded-full inline-block"
                style={{
                  background: "rgba(57,255,20,.15)",
                  border: "1px solid rgba(57,255,20,.25)",
                  color: "#39ff14",
                  boxShadow: "0 0 10px rgba(57,255,20,.15)",
                }}
              >
                ¡Encadena palabras!
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @keyframes borderRotate { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
          @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
          .animate-float { animation: float 3s ease-in-out infinite; }
        `}</style>
      </StarfieldBackground>
    );
  }
  return (
    <StarfieldBackground>
      <JComponent />
      <div className="max-w-4xl mx-auto px-4 py-4 min-h-screen relative z-10">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <Link
            to="/juegos"
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold group"
          >
            <ArrowLeftIcon size={16} className="group-hover:-translate-x-1 transition-transform" /> Volver /
            返回
          </Link>
          <div className="flex items-center gap-2 flex-wrap">
            <SoundToggles />
            <button
              onClick={() => {
                playClick();
                P();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105"
              style={{
                background: "rgba(255,255,255,.08)",
                border: "1px solid rgba(255,255,255,.15)",
                color: "#fff",
                boxShadow: "0 0 15px rgba(255,255,255,.05)",
              }}
            >
              <RotateCcwIcon size={12} /> Reiniciar / 重置
            </button>
          </div>
        </div>
        <div className="text-center mb-4">
          <h1
            className="text-2xl md:text-4xl font-black mb-2"
            style={{
              background: "linear-gradient(135deg, #39ff14, #00d4ff, #ffd600)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 25px rgba(57,255,20,0.4))",
            }}
          >
            Cadenas de Palabras
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div
              className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5"
              style={{
                background: "rgba(57,255,20,.1)",
                border: "1px solid rgba(57,255,20,.25)",
                color: "#39ff14",
                boxShadow: "0 0 10px rgba(57,255,20,.15)",
              }}
            >
              <HashIcon size={12} /> Cadena: {m.length}
            </div>
            <div
              className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5"
              style={{
                background: "rgba(255,214,0,.1)",
                border: "1px solid rgba(255,214,0,.25)",
                color: "#ffd600",
                boxShadow: "0 0 10px rgba(255,214,0,.15)",
              }}
            >
              <TrophyIcon size={12} /> Mejor: {F}
            </div>
          </div>
        </div>
        <div className="text-center mb-4">
          <div
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full text-sm font-black transition-all duration-300"
            style={{
              background: s === 1 ? "rgba(255,0,170,.12)" : "rgba(0,212,255,.12)",
              border: `1px solid ${s === 1 ? "rgba(255,0,170,.3)" : "rgba(0,212,255,.3)"}`,
              color: s === 1 ? "#ff00aa" : "#00d4ff",
              boxShadow: `0 0 25px ${s === 1 ? "rgba(255,0,170,.2)" : "rgba(0,212,255,.2)"}`,
            }}
          >
            <UserIcon size={16} />
            Turno de J{s}
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{
                background: s === 1 ? "#ff00aa" : "#00d4ff",
                boxShadow: `0 0 8px ${s === 1 ? "#ff00aa" : "#00d4ff"}`,
              }}
            />
          </div>
        </div>
        <div className="max-w-xs mx-auto mb-4">
          <div className="flex items-center gap-2">
            <TimerIcon
              size={16}
              style={{
                color,
              }}
            />
            <div
              className="flex-1 h-3 rounded-full overflow-hidden relative"
              style={{
                background: "rgba(255,255,255,.05)",
                border: "1px solid rgba(255,255,255,.1)",
              }}
            >
              <div
                className="h-full rounded-full transition-all duration-1000 ease-linear"
                style={{
                  width: `${(b / 10) * 100}%`,
                  background: `linear-gradient(90deg, ${color}, ${color}88)`,
                  boxShadow: `0 0 15px ${A}`,
                }}
              >
                <div
                  className="absolute inset-0 rounded-full opacity-30"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                    animation: "shimmer 2s linear infinite",
                  }}
                />
              </div>
            </div>
            <span
              className="text-sm font-black"
              style={{
                color,
                textShadow: `0 0 10px ${A}`,
              }}
            >
              {b}s
            </span>
          </div>
        </div>
        <div className="mb-6">
          <div
            ref={QRef}
            className={`relative rounded-3xl p-5 md:p-6 min-h-[180px] overflow-x-auto overflow-y-hidden ${V ? "animate-chainShake" : ""}`}
            style={{
              background: "linear-gradient(180deg, rgba(14,22,64,.7), rgba(5,8,27,.5))",
              border: v ? "1px solid rgba(255,0,60,.4)" : "1px solid rgba(255,255,255,.1)",
              boxShadow: v
                ? "0 0 30px rgba(255,0,60,.2)"
                : "0 0 40px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.05)",
              backdropFilter: "blur(14px)",
            }}
          >
            <div
              className="flex items-start gap-4 md:gap-6 px-2"
              style={{
                minWidth: "max-content",
              }}
            >
              {m.map((p, n) => (
                <FaComponent
                  key={n}
                  word={p.word}
                  index={n}
                  isLatest={n === m.length - 1}
                  isPlayer1={p.player === 1}
                />
              ))}
              <div ref={KRef} className="w-1" />
            </div>
            <div className="absolute inset-0 pointer-events-none z-0">
              {m.length > 1 && (
                <div
                  className="absolute top-1/2 left-0 right-0 h-[1px]"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(57,255,20,0.3), rgba(0,212,255,0.3), rgba(255,214,0,0.3))",
                    boxShadow: "0 0 10px rgba(0,212,255,0.2)",
                  }}
                />
              )}
            </div>
          </div>
        </div>
        {l === "playing" && (
          <div className="max-w-lg mx-auto">
            <div
              className="rounded-2xl p-4 md:p-5 relative overflow-hidden"
              style={{
                background: "linear-gradient(180deg, rgba(14,22,64,.8), rgba(5,8,27,.6))",
                border: `1px solid ${s === 1 ? "rgba(255,0,170,.3)" : "rgba(0,212,255,.3)"}`,
                boxShadow: `0 0 40px ${s === 1 ? "rgba(255,0,170,.1)" : "rgba(0,212,255,.1)"}, 0 10px 40px rgba(0,0,0,.3)`,
                transform: "translateZ(10px)",
              }}
            >
              <div className="text-center mb-3">
                <p
                  className="text-sm font-bold"
                  style={{
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  Escribe una palabra que empiece con{" "}
                  <span
                    className="font-black text-lg"
                    style={{
                      color: "#ffd600",
                      textShadow: "0 0 10px rgba(255,214,0,0.5)",
                    }}
                  >
                    "{m[m.length - 1]?.word.slice(-1).toUpperCase()}"
                  </span>
                </p>
              </div>
              <div className="flex gap-3">
                <input
                  ref={RRef}
                  value={k}
                  onChange={(p) => setK(p.target.value)}
                  onKeyDown={onKeyDown}
                  className="flex-1 px-4 py-3 rounded-xl text-white font-bold text-sm md:text-base outline-none transition-all"
                  style={{
                    background: "rgba(0,0,0,.3)",
                    border: `1px solid ${s === 1 ? "rgba(255,0,170,.3)" : "rgba(0,212,255,.3)"}`,
                    boxShadow: `0 0 20px ${s === 1 ? "rgba(255,0,170,.1)" : "rgba(0,212,255,.1)"}`,
                  }}
                  placeholder="Palabra..."
                  autoFocus
                />
                <button
                  onClick={I}
                  className="px-5 py-3 rounded-xl font-black text-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                  style={{
                    background:
                      s === 1
                        ? "linear-gradient(135deg, #ff00aa, #b829dd)"
                        : "linear-gradient(135deg, #00d4ff, #2080ff)",
                    boxShadow: `0 0 25px ${s === 1 ? "rgba(255,0,170,.4)" : "rgba(0,212,255,.4)"}`,
                    color: "#fff",
                  }}
                >
                  <SendIcon size={16} /> Enviar
                </button>
              </div>
              {y && (
                <div
                  className={`mt-3 text-center text-xs font-bold px-3 py-2 rounded-xl transition-all ${v ? "animate-errorPulse" : ""}`}
                  style={{
                    background: v ? "rgba(255,0,60,.12)" : "rgba(255,255,255,.05)",
                    border: v ? "1px solid rgba(255,0,60,.3)" : "1px solid rgba(255,255,255,.1)",
                    color: v ? "#ff6b35" : "rgba(255,255,255,0.6)",
                  }}
                >
                  {y}
                </div>
              )}
            </div>
          </div>
        )}
        {l === "gameover" && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{
              background: "rgba(3,4,17,.92)",
              backdropFilter: "blur(24px)",
              perspective: "1000px",
            }}
          >
            <div
              className="text-center p-8 rounded-3xl max-w-sm mx-4 relative overflow-hidden"
              style={{
                background: "linear-gradient(180deg, rgba(14,22,64,.9), rgba(5,8,27,.7))",
                border: j === 1 ? "1px solid rgba(255,0,170,.3)" : "1px solid rgba(0,212,255,.3)",
                boxShadow:
                  j === 1
                    ? "0 0 80px rgba(255,0,170,.2), 0 0 40px rgba(255,0,170,.1)"
                    : "0 0 80px rgba(0,212,255,.2), 0 0 40px rgba(0,212,255,.1)",
                transform: "translateZ(50px)",
                animation: "victoryBounce 0.8s ease-out",
              }}
            >
              <div
                className="absolute -inset-[2px] rounded-[26px] -z-10 opacity-60"
                style={{
                  background:
                    j === 1
                      ? "linear-gradient(135deg, #ff00aa, #ffd600)"
                      : "linear-gradient(135deg, #00d4ff, #2080ff)",
                  filter: "blur(30px)",
                  animation: "victoryGlow 2s ease-in-out infinite alternate",
                }}
              />
              <TrophyIcon
                size={60}
                style={{
                  color: j === 1 ? "#ff00aa" : "#00d4ff",
                  margin: "0 auto 16px",
                  filter: `drop-shadow(0 0 20px ${j === 1 ? "rgba(255,0,170,0.6)" : "rgba(0,212,255,0.6)"})`,
                  animation: "trophySpin 3s ease-in-out infinite",
                }}
              />
              <h2
                className="text-3xl md:text-4xl font-black mb-2"
                style={{
                  background:
                    j === 1
                      ? "linear-gradient(135deg, #ff00aa, #ffd600)"
                      : "linear-gradient(135deg, #00d4ff, #2080ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 20px rgba(255,255,255,0.2))",
                }}
              >
                ¡Gana J{j}!
              </h2>
              <p className="text-white/50 text-sm mb-6">{y}</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div
                  className="p-3 rounded-xl"
                  style={{
                    background: "rgba(255,0,170,.12)",
                    border: "1px solid rgba(255,0,170,.2)",
                  }}
                >
                  <Link2Icon
                    size={18}
                    style={{
                      color: "#39ff14",
                      margin: "0 auto 4px",
                    }}
                  />
                  <p className="text-xs text-white/40">Cadena</p>
                  <p
                    className="text-lg font-black"
                    style={{
                      color: "#39ff14",
                    }}
                  >
                    {m.length} palabras
                  </p>
                </div>
                <div
                  className="p-3 rounded-xl"
                  style={{
                    background: "rgba(255,214,0,.12)",
                    border: "1px solid rgba(255,214,0,.2)",
                  }}
                >
                  <TrophyIcon
                    size={18}
                    style={{
                      color: "#ffd600",
                      margin: "0 auto 4px",
                    }}
                  />
                  <p className="text-xs text-white/40">Mejor</p>
                  <p
                    className="text-lg font-black"
                    style={{
                      color: "#ffd600",
                    }}
                  >
                    {F}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 justify-center flex-wrap">
                <button
                  onClick={() => {
                    playClick();
                    P();
                  }}
                  className="px-8 py-3 rounded-full text-white font-black transition-all hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #39ff14, #00d4ff, #ffd600)",
                    boxShadow: "0 0 30px rgba(57,255,20,.3), 0 0 60px rgba(0,212,255,.2)",
                  }}
                >
                  Revancha / 再战
                </button>
                <button
                  onClick={() => {
                    playClick();
                    setL("select");
                  }}
                  className="px-4 py-3 rounded-full text-xs font-bold transition-all hover:scale-105"
                  style={{
                    background: "rgba(255,255,255,.06)",
                    border: "1px solid rgba(255,255,255,.15)",
                    color: "#fff",
                  }}
                >
                  Menú / 菜单
                </button>
                <P_1 currentGameId="word-chain" />
              </div>
            </div>
          </div>
        )}
        <div className="fixed bottom-4 right-4 z-50 pointer-events-none hidden md:block">
          <div className="animate-float">
            <DComponent expression={expression} />
          </div>
          <div className="mt-1 text-center">
            <div
              className="text-[10px] font-black px-2 py-0.5 rounded-full inline-block"
              style={{
                background: "rgba(57,255,20,.15)",
                border: "1px solid rgba(57,255,20,.25)",
                color: "#39ff14",
                boxShadow: "0 0 10px rgba(57,255,20,.15)",
              }}
            >
              {b <= 3 && l === "playing" ? "¡Rápido!" : "¡Buena cadena!"}
            </div>
          </div>
        </div>
        <style>{`
          @keyframes borderRotate { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
          @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
          .animate-float { animation: float 3s ease-in-out infinite; }
          @keyframes blockAppear { 0%{transform:scale(0.6) translateY(20px); opacity:0} 60%{transform:scale(1.05) translateY(-2px); opacity:1} 100%{transform:scale(1) translateY(0); opacity:1} }
          @keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
          @keyframes chainDash { 0%{stroke-dashoffset:0} 100%{stroke-dashoffset:-20} }
          @keyframes chainShake { 0%,100%{transform:translateX(0)} 10%{transform:translateX(-8px)} 20%{transform:translateX(8px)} 30%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 50%{transform:translateX(-4px)} 60%{transform:translateX(4px)} 70%{transform:translateX(-2px)} 80%{transform:translateX(2px)} 90%{transform:translateX(-1px)} }
          @keyframes errorPulse { 0%,100%{box-shadow:0 0 10px rgba(255,0,60,.2)} 50%{box-shadow:0 0 30px rgba(255,0,60,.4)} }
          @keyframes victoryBounce { 0%{transform:translateZ(50px) scale(0.8); opacity:0} 60%{transform:translateZ(50px) scale(1.02); opacity:1} 100%{transform:translateZ(50px) scale(1); opacity:1} }
          @keyframes victoryGlow { from{opacity:.3} to{opacity:.7} }
          @keyframes trophySpin { 0%,100%{transform:rotateY(0deg)} 50%{transform:rotateY(25deg)} }
        `}</style>
      </div>
    </StarfieldBackground>
  );
}
export { NaComponent as default };
