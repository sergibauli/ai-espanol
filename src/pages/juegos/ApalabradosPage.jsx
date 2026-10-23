import {
  UserIcon,
  SparklesIcon,
  Trash2Icon,
  ZapIcon,
  XIcon,
  TrophyIcon,
  HashIcon,
  ArrowLeftIcon,
  LayersIcon,
  CheckIcon,
  SkipForwardIcon,
  RotateCcwIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P as P_1 } from "../../components/PostGameNav.jsx";
import { SoundToggles } from "../../components/SoundToggles.jsx";
import { g, a as a_1 } from "../../lib/juegos-utils.js";
import { useSound } from "../../lib/sound.jsx";
const pe = 15;
const s = {
  1: {
    main: "#00f0ff",
    glow: "rgba(0,240,255,0.7)",
    bg: "rgba(0,240,255,0.15)",
    border: "rgba(0,240,255,0.45)",
    label: "Jugador 1",
  },
  2: {
    main: "#ff2a6d",
    glow: "rgba(255,42,109,0.7)",
    bg: "rgba(255,42,109,0.15)",
    border: "rgba(255,42,109,0.45)",
    label: "Jugador 2",
  },
};
const he = {
  "0,0": "TW",
  "0,7": "TW",
  "0,14": "TW",
  "7,0": "TW",
  "7,14": "TW",
  "14,0": "TW",
  "14,7": "TW",
  "14,14": "TW",
  "1,1": "DW",
  "2,2": "DW",
  "3,3": "DW",
  "4,4": "DW",
  "1,13": "DW",
  "2,12": "DW",
  "3,11": "DW",
  "4,10": "DW",
  "10,10": "DW",
  "11,11": "DW",
  "12,12": "DW",
  "13,13": "DW",
  "10,4": "DW",
  "11,3": "DW",
  "12,2": "DW",
  "13,1": "DW",
  "7,7": "DW",
  "0,3": "DL",
  "0,11": "DL",
  "2,6": "DL",
  "2,8": "DL",
  "3,0": "DL",
  "3,7": "DL",
  "3,14": "DL",
  "6,2": "DL",
  "6,6": "DL",
  "6,8": "DL",
  "6,12": "DL",
  "7,3": "DL",
  "7,11": "DL",
  "8,2": "DL",
  "8,6": "DL",
  "8,8": "DL",
  "8,12": "DL",
  "11,0": "DL",
  "11,7": "DL",
  "11,14": "DL",
  "12,6": "DL",
  "12,8": "DL",
  "14,3": "DL",
  "14,11": "DL",
  "1,5": "TL",
  "1,9": "TL",
  "5,1": "TL",
  "5,5": "TL",
  "5,9": "TL",
  "5,13": "TL",
  "9,1": "TL",
  "9,5": "TL",
  "9,9": "TL",
  "9,13": "TL",
  "13,5": "TL",
  "13,9": "TL",
};
const ra = {
  DL: {
    bg: "rgba(0,240,255,.22)",
    border: "rgba(0,240,255,.55)",
    text: "#00f0ff",
    glow: "0 0 10px rgba(0,240,255,.4)",
  },
  TL: {
    bg: "rgba(57,255,20,.22)",
    border: "rgba(57,255,20,.55)",
    text: "#39ff14",
    glow: "0 0 10px rgba(57,255,20,.4)",
  },
  DW: {
    bg: "rgba(255,0,220,.22)",
    border: "rgba(255,0,220,.55)",
    text: "#ff00dc",
    glow: "0 0 10px rgba(255,0,220,.4)",
  },
  TW: {
    bg: "rgba(255,220,0,.22)",
    border: "rgba(255,220,0,.55)",
    text: "#ffea00",
    glow: "0 0 10px rgba(255,220,0,.4)",
  },
};
const Ja = {
  A: 1,
  E: 1,
  I: 1,
  O: 1,
  U: 1,
  N: 1,
  R: 1,
  S: 1,
  T: 1,
  L: 1,
  D: 2,
  G: 2,
  B: 3,
  C: 3,
  M: 3,
  P: 3,
  F: 4,
  H: 4,
  V: 4,
  W: 4,
  Y: 4,
  J: 8,
  K: 8,
  LL: 8,
  Q: 8,
  RR: 8,
  X: 8,
  Z: 8,
  CH: 8,
  Ñ: 8,
};
const Ue = [
  "CASA",
  "PERRO",
  "GATO",
  "AMOR",
  "PAZ",
  "SOL",
  "LUNA",
  "MAR",
  "RIO",
  "FLOR",
  "MANO",
  "PIE",
  "BOCA",
  "OJO",
  "NARIZ",
  "OREJA",
  "DEDO",
  "BRAZO",
  "PIERNA",
  "ROPA",
  "AGUA",
  "PAN",
  "LECHE",
  "CARNE",
  "PESCADO",
  "FRUTA",
  "VERDURA",
  "ARROZ",
  "HUEVO",
  "QUESO",
  "ESCUELA",
  "LIBRO",
  "LAPIZ",
  "MESA",
  "SILLA",
  "PUERTA",
  "VENTANA",
  "CIELO",
  "TIERRA",
  "FUEGO",
  "AIRE",
  "VIENTO",
  "NUBE",
  "ESTRELLA",
  "MONTANA",
  "CALLE",
  "CIUDAD",
  "PAIS",
  "MUNDO",
  "VIDA",
  "NINO",
  "NINA",
  "MADRE",
  "PADRE",
  "FAMILIA",
  "AMIGO",
  "AMIGA",
  "TIEMPO",
  "DIA",
  "NOCHE",
  "HORA",
  "MINUTO",
  "SEMANA",
  "MES",
  "AYER",
  "HOY",
  "MANANA",
  "SIEMPRE",
  "NUNCA",
  "TARDE",
  "ANTES",
  "DESPUES",
  "MUY",
  "BIEN",
  "MAL",
  "GRANDE",
  "PEQUENO",
  "LARGO",
  "CORTO",
  "ALTO",
  "BAJO",
  "NUEVO",
  "VIEJO",
  "BUENO",
  "MALO",
  "FELIZ",
  "TRISTE",
  "FACIL",
  "DIFICIL",
  "RAPIDO",
  "LENTO",
  "CALIENTE",
  "FRIO",
  "LIMPIO",
  "ABIERTO",
  "CERRADO",
  "LLENO",
  "VACIO",
  "PREPARADO",
  "PRIMERO",
  "SEGUNDO",
  "TERCERO",
  "ULTIMO",
  "OTRO",
  "MISMO",
  "TODOS",
  "NADA",
  "ALGO",
  "QUIEN",
  "QUE",
  "DONDE",
  "CUANDO",
  "COMO",
  "PORQUE",
  "POR",
  "PARA",
  "CON",
  "SIN",
  "SOBRE",
  "ENTRE",
  "CONTRA",
  "HASTA",
  "DESDE",
  "DURANTE",
  "ANTE",
  "TRAS",
  "TAMBIEN",
  "TAMPOCO",
  "ASI",
  "AQUI",
  "ALLA",
  "FUERA",
  "DENTRO",
  "ARRIBA",
  "ABAJO",
  "DELANTE",
  "DETRAS",
  "CERCA",
  "LEJOS",
  "ROJO",
  "AZUL",
  "VERDE",
  "AMARILLO",
  "BLANCO",
  "NEGRO",
  "GRIS",
  "ROSA",
  "COLOR",
  "ESCRIBIR",
  "LEER",
  "HABLAR",
  "ESCUCHAR",
  "MIRAR",
  "VER",
  "SENTIR",
  "TOCAR",
  "PENSAR",
  "SABER",
  "ENTENDER",
  "APRENDER",
  "ENSEÑAR",
  "ESTUDIAR",
  "TRABAJAR",
  "JUGAR",
  "CANTAR",
  "BAILAR",
  "CORRER",
  "CAMINAR",
  "SALTAR",
  "NADAR",
  "VOLAR",
  "CAER",
  "LEVANTAR",
  "SENTAR",
  "EMPEZAR",
  "TERMINAR",
  "ACABAR",
  "SEGUIR",
  "VOLVER",
  "IR",
  "VENIR",
  "LLEGAR",
  "SALIR",
  "ENTRAR",
  "PASAR",
  "SUBIR",
  "BAJAR",
  "CRUZ",
  "UNO",
  "DOS",
  "TRES",
  "MESA",
  "SILLA",
  "PUERTA",
  "VENTANA",
  "TECHO",
  "PARED",
  "SUELO",
  "COCINA",
  "BAÑO",
  "DORMITORIO",
  "SALON",
  "JARDIN",
  "PATIO",
  "GARAJE",
  "BALCON",
  "TELE",
  "RADIO",
  "COCHE",
  "AUTO",
  "BUS",
  "TREN",
  "AVION",
  "BARCO",
  "BICI",
  "MOTO",
  "CAMION",
  "TAXI",
  "METRO",
  "RUTA",
  "VIAJE",
  "PLAZA",
  "PARQUE",
  "BOSQUE",
  "PLAYA",
  "CAMPO",
  "LADO",
  "ESQUINA",
  "PUENTE",
  "TORRE",
  "EDIFICIO",
  "HOSPITAL",
  "FARMACIA",
  "TIENDA",
  "MERCADO",
  "BANCO",
  "HOTEL",
  "CINE",
  "TEATRO",
  "MUSEO",
  "BIBLIOTECA",
  "IGLESIA",
  "TEMPLO",
  "MEZQUITA",
  "CATEDRAL",
  "PALACIO",
  "CASTILLO",
  "FORTALEZA",
  "MURALLA",
  "PUERTO",
  "MUELLE",
  "ESTADIO",
  "GIMNASIO",
  "PISTA",
  "PISCINA",
  "CANCHA",
  "CAMPO",
  "CABALLERO",
  "DAMA",
  "REY",
  "REINA",
  "PRINCIPE",
  "PRINCESA",
  "PRESIDENTE",
  "MINISTRO",
  "DOCTOR",
  "ENFERMERA",
  "MAESTRO",
  "PROFESOR",
  "ALUMNO",
  "ESTUDIANTE",
  "INGENIERO",
  "ABOGADO",
  "JUEZ",
  "POLICIA",
  "SOLDADO",
  "COCINERO",
  "CAMARERO",
  "MESERO",
  "ACTOR",
  "ARTISTA",
  "MUSICO",
  "PINTOR",
  "ESCRITOR",
  "POETA",
  "PERIODISTA",
  "DEPORTISTA",
  "ATLETA",
  "CAMPEON",
  "GANADOR",
  "PERDEDOR",
  "MASCOTA",
  "ANIMAL",
  "PEZ",
  "PAJARO",
  "RATON",
  "CABALLO",
  "VACA",
  "TORO",
  "OVEJA",
  "CABRA",
  "CERDO",
  "GALLINA",
  "PATO",
  "POLLO",
  "HUEVO",
  "LECHE",
  "CARNE",
  "PAN",
  "ARROZ",
  "PASTA",
  "SOPA",
  "ENSALADA",
  "FRUTA",
  "MANZANA",
  "PERA",
  "NARANJA",
  "LIMON",
  "PLATANO",
  "UVA",
  "FRESA",
  "SANDIA",
  "MELON",
  "CEREZA",
  "MELOCOTON",
  "DURAZNO",
  "CIRUELA",
  "HIGO",
  "KIWI",
  "MANGO",
  "PIÑA",
  "TOMATE",
  "PATATA",
  "CEBOLLA",
  "AJO",
  "ZANAHORIA",
  "PEPINO",
  "PIMIENTO",
  "LECHUGA",
  "ESPINACA",
  "BROCOLI",
  "COLIFLOR",
  "BERENJENA",
  "CALABACIN",
  "CALABAZA",
  "MAIZ",
  "TRIGO",
  "CEBADA",
  "AVENA",
  "ARVEJA",
  "LENTEJA",
  "HABICUELA",
  "JUDIA",
  "GARBANZO",
  "ALUBIA",
  "SOJA",
  "ACEITE",
  "VINAGRE",
  "SAL",
  "AZUCAR",
  "MIEL",
  "CAFE",
  "TE",
  "CHOCOLATE",
  "GALLETA",
  "PASTEL",
  "TARTA",
  "HELADO",
  "YOGUR",
  "NATILLAS",
  "FLAN",
  "CREMA",
  "MANTEQUILLA",
  "MERMELADA",
  "MANTECA",
  "QUESO",
  "JAMON",
  "CHORIZO",
  "SALCHICHA",
  "MORTADELA",
  "TOCINO",
  "FILETE",
  "CHULETA",
  "POLLO",
  "PAVO",
  "CONEJO",
  "CORDERO",
  "TERNERA",
  "CERDO",
  "PESCADO",
  "MARISCO",
  "CAMARON",
  "LANGOSTA",
  "MEJILLON",
  "ALMEJA",
  "OSTRA",
  "CALAMAR",
  "PULPO",
  "ATUN",
  "SALMON",
  "BACALAO",
  "MERLUZA",
  "SARDINA",
  "ANCHOA",
  "BOQUERON",
  "DORADA",
  "LUBINA",
  "TRUCHA",
  "PEZ",
  "MAR",
  "OCEANO",
  "RIO",
  "LAGO",
  "LAGUNA",
  "ESTANQUE",
  "MANANTIAL",
  "CASCADA",
  "FUENTE",
  "POZO",
  "CANAL",
  "DIQUE",
  "PRESA",
  "REPRES",
  "TAPA",
  "TAPON",
  "CUBO",
  "Caja",
  "BOLSA",
  "BOLSILLO",
  "MOCHILA",
  "MALETA",
  "CARTERA",
  "MONEDERO",
  "PARAGUAS",
  "SOMBRILLA",
  "BUFANDA",
  "GUANTE",
  "GORRO",
  "SOMBRERO",
  "CORBAT",
  "CINTURON",
  "ZAPATO",
  "BOTA",
  "SANDALIA",
  "ZAPATILLA",
  "TENIS",
  "PANTALON",
  "VAQUERO",
  "FALDA",
  "VESTIDO",
  "TRAJE",
  "CAMISA",
  "CAMISETA",
  "JERSEY",
  "SUETER",
  "CHAQUETA",
  "ABRIGO",
  "IMPERMEABLE",
  "Pijama",
  "ROPA",
  "TELA",
  "AGUJA",
  "HILO",
  "BOTON",
  "CREMALLERA",
  "BOLA",
  "PELOTA",
  "RAQUETA",
  "RED",
  "CANASTA",
  "CINTA",
  "MEDALLA",
  "COPA",
  "PREMIO",
  "TROFEO",
  "REGALO",
  "Sorpresa",
  "FIESTA",
  "CUMPLE",
  "BODA",
  "COMunion",
  "NAVIDAD",
  "REYES",
  "PASCUA",
  "FIESTA",
  "FERIA",
  "VERBENA",
  "FESTIVAL",
  "CONCIERTO",
  "ACTUACION",
  "EXHIBICION",
  "COMPETICION",
  "TORNEO",
  "CARRERA",
  "PARTIDO",
  "ENCUENTRO",
  "RET",
  "DUELO",
  "LIGA",
  "COPA",
  "MUNDIAL",
  "OLIMPIADA",
  "JUEGO",
  "JUGUETE",
  "ROMPECABEZAS",
  "PUZZLE",
  "NAIPE",
  "CARTA",
  "DOMINO",
  "DADO",
  "AJEDREZ",
  "DAMA",
  "TRES",
  "EN",
  "RAYA",
  "PIEDRA",
  "PAPEL",
  "TIJERA",
  "OCA",
  "SERPIENTE",
  "ESCALERA",
  "MONOPOLY",
  "POKER",
  "RULETA",
  "BINGO",
  "LOTERIA",
  "RIFA",
  "SORTEO",
  "PREMIO",
  "MILLON",
  "EURO",
  "CENTIMO",
  "DOLAR",
  "PESO",
  "YEN",
  "LIBRA",
  "FRANCO",
  "MARCO",
  "PESETA",
  "REAL",
  "CRUZEIRO",
  "RUPIA",
  "DIVISA",
  "MONEDA",
  "BILLETE",
  "CAMBIO",
  "BANCO",
  "CAJA",
  "CUENTA",
  "TARJETA",
  "CHEQUE",
  "RECIBO",
  "FACTURA",
  "TICKET",
  "BONO",
  "VALE",
  "CUPON",
  "DESCUENTO",
  "REBAJA",
  "OFERTA",
  "GANGA",
  "REGALO",
  "OBSEQUIO",
  "DETALLE",
  "CORTESIA",
  "ATENCION",
  "SERVICIO",
  "CLIENTE",
  "USUARIO",
  "CONSUMIDOR",
  "COMPRADOR",
  "VENDEDOR",
  "DEPENDIENTE",
  "COMERCIANTE",
  "EMPRESARIO",
  "DUEÑO",
  "SOCIO",
  "INVERSION",
  "ACCION",
  "BOLSA",
  "MERCADO",
  "NEGOCI",
  "TRATO",
  "ACUERDO",
  "CONTRATO",
  "CONVENIO",
  "PACTO",
  "TRATADO",
  "LEY",
  "NORMA",
  "REGLA",
  "DECRETO",
  "EDICTO",
  "MANDATO",
  "ORDEN",
  "MANDATO",
  "INSTRUCCION",
  "DIRECTRIZ",
  "GUIA",
  "MANUAL",
  "CATALOGO",
  "LISTA",
  "INDICE",
  "TABLA",
  "CUADRO",
  "GRAFICO",
  "DIAGRAMA",
  "ESQUEMA",
  "MAPA",
  "PLANO",
  "CROQUIS",
  "DIBUJO",
  "BOSQUEJO",
  "Boceto",
  "ESBOZO",
  "PROYECTO",
  "PLAN",
  "PROGRAMA",
  "HORARIO",
  "CALENDARIO",
  "AGENDA",
  "DIARIO",
  "REVISTA",
  "PERIODICO",
  "GACETA",
  "BOLETIN",
  "CARTEL",
  "ANUNCIO",
  "PUBLICIDAD",
  "PROPAGANDA",
  "PROMOCION",
  "OFERTA",
  "DEMANDA",
  "SUMINISTRO",
  "PROVISION",
  "EXISTENCIA",
  "STOCK",
  "RESERVA",
  "ALMACEN",
  "DEPOSITO",
  "BODEGA",
  "SILO",
  "GRANERO",
  "COBERTIZO",
  "GALLINERO",
  "PERRERA",
  "ESTABLO",
  "CORRAL",
  "REDIL",
  "APRISCO",
  "CERCADO",
  "VALLA",
  "VERJA",
  "REJA",
  "CERCA",
  "MURO",
  "PARED",
  "TAPIA",
  "TAPIAL",
  "ADOBE",
  "LADRILLO",
  "CEMENTO",
  "HORMIGON",
  "ACERO",
  "HIERRO",
  "METAL",
  "COBRE",
  "BRONCE",
  "LATON",
  "ZINC",
  "PLOMO",
  "ESTAÑO",
  "Niquel",
  "ORO",
  "PLATA",
  "DIAMANTE",
  "RUBI",
  "ESMERALDA",
  "ZAFIRO",
  "PERLA",
  "CRISTAL",
  "VIDRIO",
  "PLASTICO",
  "GOMA",
  "CAUCHO",
  "CUERO",
  "PIEL",
  "TELA",
  "LINO",
  "ALGODON",
  "SEDA",
  "LANA",
  "YUTE",
  "CUERDA",
  "CORDEL",
  "CABLE",
  "HILO",
  "HILAZA",
  "HEBRA",
  "FIBRA",
  "FILAMENTO",
  "RAIZ",
  "TRONCO",
  "RAMA",
  "RAMITA",
  "HOJA",
  "HOJITA",
  "FLOR",
  "FLORCITA",
  "FRUTO",
  "FRUTA",
  "SEMILLA",
  "GRANO",
  "HUESO",
  "CAROZO",
  "NUCLEO",
  "CORAZON",
  "CENTRO",
  "MEDIO",
  "MITAD",
  "MITAD",
  "TERCIO",
  "CUARTO",
  "QUINTO",
  "SEXTO",
  "SEPTIMO",
  "OCTAVO",
  "NOVENO",
  "DECIMO",
  "CENTESIMO",
  "MILESIMO",
  "MILLONESIMO",
  "PARTE",
  "PORCION",
  "TROZO",
  "PEDAZO",
  "Raja",
  "ASTILLA",
  "VIRA",
  "VIRUTA",
  "POLVO",
  "HUMO",
  "VAPOR",
  "GAS",
  "AIRE",
  "ATMOSFERA",
  "CLIMA",
  "TIEMPO",
  "ESTACION",
  "PRIMAVERA",
  "VERANO",
  "OTOÑO",
  "INVIERNO",
  "AURORA",
  "ALBA",
  "MEDIODIA",
  "TARDE",
  "ANOCHECER",
  "CREPUSCULO",
  "NOCHE",
  "MEDIANOCHE",
  "MADRUGADA",
  "AMANECER",
  "SOL",
  "LUNA",
  "ESTRELLA",
  "PLANETA",
  "COMETA",
  "ASTEROIDE",
  "METEORO",
  "GALAXIA",
  "UNIVERSO",
  "COSMOS",
  "ESPACIO",
  "VACIO",
  "INFINITO",
  "ETERNIDAD",
  "INSTANTE",
  "MOMENTO",
  "MINUTO",
  "SEGUNDO",
  "HORA",
  "DIA",
  "SEMANA",
  "QUINCENA",
  "MES",
  "BIMESTRE",
  "TRIMESTRE",
  "CUATRIMESTRE",
  "SEMESTRE",
  "AÑO",
  "DECADA",
  "SIGLO",
  "MILENIO",
  "EPOCA",
  "ERA",
  "EDAD",
  "PERIODO",
  "CICLO",
  "FASE",
  "ETAPA",
  "PASO",
  "NIVEL",
  "GRADO",
  "ESCALON",
  "ESCALA",
  "ESCALERA",
  "Rampa",
  "PLAN",
  "INCLINACION",
  "CUESTA",
  "COLLADO",
  "PUERTO",
  "PASO",
  "SENDA",
  "SENDER",
  "CAMINO",
  "RUTA",
  "CARRETERA",
  "AUTOPISTA",
  "CALZADA",
  "ACERA",
  "BORDILLO",
  "CRUCE",
  "ROTONDA",
  "GLORIETA",
  "PLAZA",
  "PARQUE",
  "JARDIN",
  "ROSAL",
  "PASEO",
  "ALAMEDA",
  "ARBOLEDA",
  "BOSQUE",
  "SELVA",
  "JUNGLA",
  "BOSQUE",
  "MATORRAL",
  "MONTE",
  "CERRO",
  "COLINA",
  "LOMA",
  "CUESTA",
  "PENDIENTE",
  "CUMBRE",
  "CIMA",
  "CUSPIDE",
  "VERTICE",
  "CUMBRE",
  "PICO",
  "CUMBRE",
  "CUEVA",
  "GRUTA",
  "CAVERNA",
  "Sima",
  "ABISMO",
  "PRECIPICIO",
  "BARRANCO",
  "DESPEÑADERO",
  "ACANTILADO",
  "FALDA",
  "LLANURA",
  "LLANO",
  "VEGA",
  "PRADO",
  "PASTO",
  "HIERBA",
  "CESPED",
  "CULTIVO",
  "SIEMBRA",
  "COSECHA",
  "RECOLECCION",
  "VENDIMIA",
  "UVA",
  "VINO",
  "LICOR",
  "AGUARDIENTE",
  "RON",
  "WHISKY",
  "CERVEZA",
  "SIDRA",
  "SANGRIA",
  "MOSTO",
  "ZUMO",
  "JUGO",
  "REFRESCO",
  "GASEOSA",
  "COLA",
  "LIMONADA",
  "NARANJADA",
  "HORCHATA",
  "TAMARINDO",
  "COCO",
  "LECHE",
  "BATIDO",
  "SMOOTHIE",
  "GRANIZADO",
  "FRAPPE",
  "COKTEL",
  "MOJITO",
  "DAIQUIRI",
  "MARGARITA",
  "TEQUILA",
  "MEZCAL",
  "PULQUE",
  "PISCO",
  "CACHACA",
  "CAIPIRIÑA",
  "CAIPIROSCA",
  "MOJITO",
  "CUBA",
  "LIBRE",
  "Screw",
  "DRIVER",
  "MANHATTAN",
  "MARTINI",
  "DAIQUIRI",
  "BLOODY",
  "MARY",
  "MOJITO",
  "CAIPIROSCA",
  "Tinto",
  "Blanco",
  "Rosado",
  "Espumoso",
  "Cava",
  "Champan",
  "Champagne",
  "Brut",
  "Demi",
  "Seco",
  "DULCE",
  "AMARGO",
  "ACIDO",
  "PICANTE",
  "SALADO",
  "SABROSO",
  "SUAVE",
  "FUERTE",
  "INTENSO",
  "SUAVE",
  "TIERNO",
  "DURO",
  "FIRME",
  "FLOJO",
  "SOLIDO",
  "LIQUIDO",
  "GASEOSO",
  "PASTOSO",
  "CREMOSO",
  "ESPESO",
  "FLUIDO",
  "VISCOSO",
  "DENso",
  "LIGERO",
  "PESADO",
  "GRUESO",
  "DELGADO",
  "FINO",
  "GRUESO",
  "ANCHO",
  "ESTRECHO",
  "ANGOSTO",
  "AMPLIO",
  "REDUCIDO",
  "EXTENSO",
  "LIMITADO",
  "INMENSO",
  "ENORME",
  "GRANDE",
  "PEQUEÑO",
  "MINUSCULO",
  "INFIMO",
  "MAXIMO",
  "MINIMO",
  "OPTIMO",
  "IDEAL",
  "PERFECTO",
  "EXCELENTE",
  "MARAVILLOSO",
  "FANTASTICO",
  "ESTUPENDO",
  "FORMIDABLE",
  "MAGNIFICO",
  "SPLENDIDO",
  "GLORIOSO",
  "TRIUNFAL",
  "VICTORIOSO",
  "EXITOSO",
  "PROSPERO",
  "FELIZ",
];
function oa(A) {
  return A.toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-ZÑ]/g, "")
    .trim();
}
function Re(A) {
  const m = oa(A);
  if (m.length < 2) {
    return false;
  }
  return !!(Ue.includes(m) || (m.length >= 3 && /^[A-ZÑ]+$/.test(m)));
}
function Ne(A) {
  const m = [...A];
  for (let C = m.length - 1; C > 0; C--) {
    const J = Math.floor(Math.random() * (C + 1));
    [m[C], m[J]] = [m[J], m[C]];
  }
  return m;
}
function Ha() {
  const A = [];
  const m = {
    A: 12,
    E: 12,
    O: 9,
    I: 6,
    S: 6,
    N: 5,
    R: 5,
    U: 6,
    L: 4,
    T: 4,
    D: 5,
    G: 2,
    C: 4,
    B: 2,
    M: 2,
    P: 2,
    H: 2,
    F: 1,
    V: 1,
    Y: 1,
    J: 1,
    Ñ: 1,
    Q: 1,
    X: 1,
    Z: 1,
    LL: 1,
    CH: 1,
    RR: 1,
    L·L: 1,
  };
  for (const [C, J] of Object.entries(m)) {
    for (let I = 0; I < J; I++) {
      A.push(C);
    }
  }
  return A;
}
let Wa = 0;
function Ie() {
  return ++Wa;
}
function Sa1Component({ expression }) {
  const cy =
    expression === "sad" ? 2.5 : expression === "excited" ? -0.5 : expression === "thinking" ? 0.5 : 1;
  const C = expression === "thinking" ? 7.5 : undefined;
  const d =
    expression === "happy"
      ? "M 7,9 Q 10,12 13,9"
      : expression === "sad"
        ? "M 7,11 Q 10,8 13,11"
        : expression === "excited"
          ? "M 7,7 Q 10,13 13,7"
          : expression === "thinking"
            ? "M 9,10 Q 10,10 11,10"
            : "M 8,10 Q 10,10 12,10";
  const I = expression === "excited" || expression === "happy";
  const te =
    expression === "excited"
      ? "mascotBounce"
      : expression === "happy"
        ? "mascotWiggle"
        : expression === "sad"
          ? "mascotSigh"
          : expression === "thinking"
            ? "mascotThink"
            : "mascotFloat";
  const re = expression === "thinking" || expression === "sad";
  return (
    <div
      className="fixed bottom-4 right-4 z-50 pointer-events-none"
      style={{
        animation: `${te} 3s ease-in-out infinite`,
      }}
    >
      <svg
        width="100"
        height="100"
        viewBox="0 0 22 22"
        className="drop-shadow-[0_0_18px_rgba(255,255,255,0.5)]"
      >
        <defs>
          <radialGradient id="mascotBody" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#fff5fb" />
            <stop offset="60%" stopColor="#ffccee" />
            <stop offset="100%" stopColor="#ff9ad8" />
          </radialGradient>
          <radialGradient id="mascotEar" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffe6f7" />
            <stop offset="100%" stopColor="#ff85d4" />
          </radialGradient>
          <linearGradient id="mascotShine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <ellipse cx="3.5" cy="3.5" rx="3" ry="4" fill="url(#mascotEar)" transform="rotate(-25 3.5 3.5)" />
        <ellipse cx="18.5" cy="3.5" rx="3" ry="4" fill="url(#mascotEar)" transform="rotate(25 18.5 3.5)" />
        <circle cx="11" cy="11" r="8.5" fill="url(#mascotBody)" />
        <ellipse cx="11" cy="4.5" rx="5" ry="2.5" fill="url(#mascotShine)" opacity="0.6" />
        <circle cx={C ?? 7.5} cy={cy} r="1.5" fill="#2a1a2e" />
        <circle cx={C ?? 14.5} cy={cy} r="1.5" fill="#2a1a2e" />
        <circle cx={8.2} cy={cy - 0.4} r="0.5" fill="white" opacity="0.8" />
        <circle cx={15.2} cy={cy - 0.4} r="0.5" fill="white" opacity="0.8" />
        <path d={d} stroke="#2a1a2e" strokeWidth="0.9" fill="none" strokeLinecap="round" />
        {I && (
          <>
            <circle cx="5" cy="11.5" r="1.6" fill="#ff69b6" opacity="0.5" />
            <circle cx="17" cy="11.5" r="1.6" fill="#ff69b6" opacity="0.5" />
          </>
        )}
        {re && (
          <>
            <circle cx="5" cy="11.5" r="1.3" fill="#ff99cc" opacity="0.35" />
            <circle cx="17" cy="11.5" r="1.3" fill="#ff99cc" opacity="0.35" />
          </>
        )}
        <ellipse cx="11" cy="18.5" rx="3" ry="2" fill="#ff69b6" opacity="0.2" />
      </svg>
    </div>
  );
}
function StComponent() {
  const { playCorrect, playWrong, playWin, playLose, playClick } = useSound();
  const [te, setTe] = React.useState("select");
  const [L, setL] = React.useState([]);
  const [_, set_] = React.useState([]);
  const [$, set$] = React.useState([]);
  const [X, setX] = React.useState(null);
  const [v, setV] = React.useState("place");
  const [H, setH] = React.useState(new Set());
  const [u, setU] = React.useState(0);
  const [O, setO] = React.useState(0);
  const [Be, setBe] = React.useState(() => {
    try {
      return parseInt(localStorage.getItem("apalabrados_best") || "0");
    } catch {
      return 0;
    }
  });
  const [x, setX_1] = React.useState(1);
  const [za, setZa] = React.useState(null);
  const [Xa, setXa] = React.useState(new Set(Ue));
  const [se, setSe] = React.useState([]);
  const [Se, setSe_1] = React.useState("");
  const [we, setWe] = React.useState("");
  const [ca, setCa] = React.useState(0);
  const [oe, setOe] = React.useState(null);
  const [Ye, setYe] = React.useState(0);
  const [Je, setJe] = React.useState(0);
  const [Ce, setCe] = React.useState([]);
  const [De, setDe] = React.useState([]);
  const [He, setHe] = React.useState(false);
  const [da, setDa] = React.useState(1);
  const [xa, setXa_1] = React.useState([]);
  const [pa, setPa] = React.useState(new Set());
  const [Q, setQ] = React.useState(null);
  const [Z, setZ] = React.useState(false);
  const [fa, setFa] = React.useState([]);
  const [ge, setGe] = React.useState(0);
  const [y, setY] = React.useState(null);
  const [P, setP] = React.useState(false);
  const [B, setB] = React.useState(null);
  const keRef = React.useRef(null);
  const hRef = React.useRef(0);
  const RRef = React.useRef(0);
  g();
  React.useCallback(() => {
    if (x === 1) {
      return _;
    }
    return $;
  }, [x, _, $]);
  React.useCallback(
    (a) => {
      if (x === 1) {
        set_(a);
      } else {
        set$(a);
      }
    },
    [x],
  );
  const expression = He
    ? "excited"
    : Se
      ? "sad"
      : te === "gameover"
        ? u > O || O > u
          ? "happy"
          : "neutral"
        : P || X !== null || H.size > 0
          ? "thinking"
          : "neutral";
  const Xe = React.useCallback((a) => {
    const l = a ? a_1(a) : a_1();
    const t = new Set(Ue);
    for (const n of l) {
      const i = oa(n.espanol);
      if (i.length >= 3 && i.length <= 12) {
        t.add(i);
      }
    }
    setXa(t);
  }, []);
  const ne = React.useCallback((a, l) => {
    const t = [];
    const remainingBag = [...l];
    for (let i = 0; i < a && remainingBag.length > 0; i++) {
      const r = Math.floor(Math.random() * remainingBag.length);
      t.push({
        id: Ie(),
        letter: remainingBag[r],
      });
      remainingBag.splice(r, 1);
    }
    return {
      tiles: t,
      remainingBag,
    };
  }, []);
  const Qe = React.useCallback(() => {
    playClick();
    Xe(null);
    setZa(null);
    setL([]);
    set_([]);
    set$([]);
    setU(0);
    setO(0);
    hRef.current = 0;
    RRef.current = 0;
    setX_1(1);
    setYe(0);
    setJe(0);
    setWe("");
    setCa(0);
    setOe(null);
    setCe([]);
    setDe([]);
    setHe(false);
    setSe_1("");
    setX(null);
    setV("place");
    setH(new Set());
    setDa(1);
    setPa(new Set());
    setQ(null);
    const a = Ne(Ha());
    const { tiles, remainingBag } = ne(7, a);
    const { tiles: tiles_1, remainingBag: remainingBag_1 } = ne(7, remainingBag);
    set_(tiles);
    set$(tiles_1);
    setSe(remainingBag_1);
    setTe("playing");
  }, [playClick, Xe, ne]);
  const ie = React.useCallback(() => {
    setX_1((a) => {
      const l = a === 1 ? 2 : 1;
      setDa((t) => {
        if (a === 2) {
          return t + 1;
        }
        return t;
      });
      return l;
    });
    setX(null);
    setV("place");
    setH(new Set());
    setSe_1("");
  }, []);
  React.useCallback(() => {
    setTe("gameover");
    playLose();
    hRef.current > RRef.current || RRef.current > hRef.current;
    const a = Math.max(Be, hRef.current, RRef.current);
    setBe(a);
    try {
      localStorage.setItem("apalabrados_best", String(a));
    } catch {}
  }, [playLose, Be]);
  React.useEffect(() => {
    if (Ce.length === 0) {
      return;
    }
    const a = setInterval(() => {
      setCe((l) =>
        l
          .map((t) => ({
            ...t,
            x: t.x + t.vx,
            y: t.y + t.vy,
            vy: t.vy + 0.15,
            life: t.life - 0.015,
          }))
          .filter((t) => t.life > 0),
      );
    }, 30);
    return () => clearInterval(a);
  }, [Ce.length]);
  React.useEffect(() => {
    if (De.length === 0) {
      return;
    }
    const a = setInterval(() => {
      setDe((l) =>
        l
          .map((t) => ({
            ...t,
            y: t.y - 1.5,
            life: t.life - 0.015,
          }))
          .filter((t) => t.life > 0),
      );
    }, 30);
    return () => clearInterval(a);
  }, [De.length]);
  const ma = React.useCallback(() => {
    const a = [
      "#00f0ff",
      "#ff2a6d",
      "#ffea00",
      "#39ff14",
      "#ff00dc",
      "#ffffff",
      "#ffa600",
      "#b829dd",
      "#ff85d4",
      "#00d4a0",
    ];
    const l = ["square", "circle", "triangle"];
    const t = Array.from({
      length: 120,
    }).map((n, i) => ({
      id: Ie(),
      x: Math.random() * 100,
      delay: Math.random() * 2,
      color: a[Math.floor(Math.random() * a.length)],
      duration: 2 + Math.random() * 3,
      size: 4 + Math.random() * 12,
      rotation: Math.random() * 360,
      shape: l[Math.floor(Math.random() * l.length)],
    }));
    setXa_1(t);
    setTimeout(() => setXa_1([]), 6000);
  }, []);
  function de(letter) {
    return Ja[letter] || 1;
  }
  function k(a, l, t) {
    return (t ?? L).find((i) => i.row === a && i.col === l);
  }
  function xe(a) {
    return a.filter((l) => l.isNew);
  }
  function ga(a) {
    const l = [];
    const t = xe(a);
    if (t.length === 0) {
      return [];
    }
    const n = Array.from(new Set(t.map((r) => r.row)));
    for (const r of n) {
      const o = [];
      for (let d = 0; d < 15; d++) {
        if (k(r, d, a)) {
          o.push(d);
        }
      }
      if (o.length === 0) {
        continue;
      }
      let c = 0;
      while (c < o.length) {
        let d = c;
        while (d + 1 < o.length && o[d + 1] === o[d] + 1) {
          d++;
        }
        const g = o.slice(c, d + 1);
        if (g.some((f) => t.some((b) => b.row === r && b.col === f)) && g.length >= 2) {
          const f = g.map((E) => k(r, E, a));
          const b = f.map((E) => E.letter).join("");
          if (Re(b)) {
            let E = 0;
            let Y = 1;
            for (const w of f) {
              const z = he[`${w.row},${w.col}`];
              let ae = de(w.letter);
              if (w.isNew && z === "DL") {
                ae *= 2;
              }
              if (w.isNew && z === "TL") {
                ae *= 3;
              }
              E += ae;
              if (w.isNew && z === "DW") {
                Y *= 2;
              }
              if (w.isNew && z === "TW") {
                Y *= 3;
              }
            }
            l.push({
              word: b,
              tiles: f,
              score: E * Y,
            });
          }
        }
        c = d + 1;
      }
    }
    const i = Array.from(new Set(t.map((r) => r.col)));
    for (const r of i) {
      const o = [];
      for (let d = 0; d < 15; d++) {
        if (k(d, r, a)) {
          o.push(d);
        }
      }
      if (o.length === 0) {
        continue;
      }
      let c = 0;
      while (c < o.length) {
        let d = c;
        while (d + 1 < o.length && o[d + 1] === o[d] + 1) {
          d++;
        }
        const g = o.slice(c, d + 1);
        if (g.some((f) => t.some((b) => b.row === f && b.col === r)) && g.length >= 2) {
          const f = g.map((E) => k(E, r, a));
          const b = f.map((E) => E.letter).join("");
          if (Re(b)) {
            let E = 0;
            let Y = 1;
            for (const w of f) {
              const z = he[`${w.row},${w.col}`];
              let ae = de(w.letter);
              if (w.isNew && z === "DL") {
                ae *= 2;
              }
              if (w.isNew && z === "TL") {
                ae *= 3;
              }
              E += ae;
              if (w.isNew && z === "DW") {
                Y *= 2;
              }
              if (w.isNew && z === "TW") {
                Y *= 3;
              }
            }
            l.push({
              word: b,
              tiles: f,
              score: E * Y,
            });
          }
        }
        c = d + 1;
      }
    }
    return l;
  }
  function ba() {
    const a = xe(L);
    if (a.length === 0) {
      return {
        valid: false,
        words: [],
        error: "Coloca al menos una letra",
      };
    }
    const l = L.filter((r) => !r.isNew);
    if (
      l.length > 0 &&
      !a.some((o) => l.some((c) => Math.abs(o.row - c.row) + Math.abs(o.col - c.col) === 1))
    ) {
      return {
        valid: false,
        words: [],
        error: "Las letras deben conectarse a palabras existentes",
      };
    }
    const t = Array.from(new Set(a.map((r) => r.row)));
    const n = Array.from(new Set(a.map((r) => r.col)));
    if (t.length > 1 && n.length > 1) {
      return {
        valid: false,
        words: [],
        error: "Las letras nuevas deben estar en la misma fila o columna",
      };
    }
    if (t.length === 1) {
      const r = [...a].sort((o, c) => o.col - c.col);
      for (let o = 1; o < r.length; o++) {
        if (r[o].col - r[o - 1].col > 1) {
          for (let d = r[o - 1].col + 1; d < r[o].col; d++) {
            if (!k(t[0], d)) {
              return {
                valid: false,
                words: [],
                error: "No puede haber espacios entre las letras",
              };
            }
          }
        }
      }
    }
    if (n.length === 1) {
      const r = [...a].sort((o, c) => o.row - c.row);
      for (let o = 1; o < r.length; o++) {
        if (r[o].row - r[o - 1].row > 1) {
          for (let d = r[o - 1].row + 1; d < r[o].row; d++) {
            if (!k(d, n[0])) {
              return {
                valid: false,
                words: [],
                error: "No puede haber espacios entre las letras",
              };
            }
          }
        }
      }
    }
    const words = ga(L);
    if (words.length === 0) {
      return {
        valid: false,
        words: [],
        error: "No se formaron palabras válidas",
      };
    }
    return {
      valid: true,
      words,
      error: "",
    };
  }
  function _e(a) {
    let l = 0;
    let t = 1;
    for (const n of a) {
      const i = he[`${n.row},${n.col}`];
      let r = de(n.letter);
      if (i === "DL") {
        r *= 2;
      }
      if (i === "TL") {
        r *= 3;
      }
      l += r;
      if (i === "DW") {
        t *= 2;
      }
      if (i === "TW") {
        t *= 3;
      }
    }
    return l * t;
  }
  function ua(row, col, t) {
    const n = k(row, col, t);
    if (!n || n.isNew || n.player === x) {
      return null;
    }
    let i = [];
    let r = col;
    while (k(row, r - 1, t)) {
      r--;
    }
    while (k(row, r, t)) {
      const g = k(row, r, t);
      i.push(g);
      r++;
    }
    let o = [];
    let c = row;
    while (k(c - 1, col, t)) {
      c--;
    }
    while (k(c, col, t)) {
      const g = k(c, col, t);
      o.push(g);
      c++;
    }
    const d = [];
    if (i.length >= 2) {
      const g = i.map((T) => T.letter).join("");
      d.push({
        word: g,
        tiles: i,
        score: _e(i),
      });
    }
    if (o.length >= 2) {
      const g = o.map((T) => T.letter).join("");
      d.push({
        word: g,
        tiles: o,
        score: _e(o),
      });
    }
    if (d.length === 0) {
      return null;
    }
    return (d.sort((g, T) => T.tiles.length - g.tiles.length), d[0]);
  }
  function Oa(row, col) {
    if (te !== "playing" || Z) {
      return;
    }
    if (P) {
      const i = ua(row, col, L);
      if (i) {
        setB(i);
        playClick();
      } else {
        setB(null);
      }
      return;
    }
    if (v === "discard") {
      setV("place");
      setH(new Set());
    }
    if (X === null) {
      setL((i) => {
        const r = i.find((o) => o.row === row && o.col === col);
        if (r && r.isNew && r.player === x) {
          const o = {
            id: r.id,
            letter: r.letter,
          };
          if (x === 1) {
            set_((c) => [...c, o]);
          } else {
            set$((c) => [...c, o]);
          }
          return i.filter((c) => c.id !== r.id);
        }
        return i;
      });
      return;
    }
    const n = (x === 1 ? _ : $)[X];
    if (n) {
      setL((i) => {
        if (i.some((r) => r.row === row && r.col === col)) {
          return i;
        }
        return [
          ...i,
          {
            id: n.id,
            letter: n.letter,
            row,
            col,
            isNew: true,
            rackIndex: X,
            player: x,
          },
        ];
      });
      if (x === 1) {
        set_((i) => i.filter((r, o) => o !== X));
      } else {
        set$((i) => i.filter((r, o) => o !== X));
      }
      setX(null);
      playClick();
    }
  }
  function Ea(a) {
    if (!(Z || P)) {
      if (v === "discard") {
        setH((l) => {
          const t = new Set(l);
          if (t.has(a)) {
            t.delete(a);
          } else {
            t.add(a);
          }
          return t;
        });
        playClick();
      } else if (X === a) {
        setX(null);
      } else {
        setX(a);
        playClick();
      }
    }
  }
  function ha() {
    if (P) {
      return;
    }
    const { valid, words, error } = ba();
    if (!valid) {
      playWrong();
      setSe_1(error);
      setQ("red");
      setTimeout(() => setQ(null), 800);
      setTimeout(() => setSe_1(""), 2000);
      return;
    }
    playCorrect();
    setQ("green");
    setTimeout(() => setQ(null), 600);
    let n = 0;
    for (const c of words) {
      n += c.score;
    }
    const i = xe(L);
    if (i.length === 7) {
      n += 50;
    }
    const main = s[x].main;
    setOe(x);
    setWe(words.map((c) => c.word).join(", "));
    setCa(n);
    setSe_1("");
    setHe(true);
    playWin();
    ma();
    setTimeout(() => setHe(false), 1500);
    if (keRef.current && i.length > 0) {
      const c = keRef.current.getBoundingClientRect();
      const d = c.width / 15;
      const g = c.height / 15;
      const x_1 = c.left + (i[0].col + 0.5) * d;
      const y_1 = c.top + (i[0].row + 0.5) * g;
      const b = [];
      for (let E = 0; E < 80; E++) {
        const Y = Math.random() * Math.PI * 2;
        const w = 2 + Math.random() * 8;
        b.push({
          id: Ie(),
          x: x_1,
          y: y_1,
          vx: Math.cos(Y) * w,
          vy: Math.sin(Y) * w - 4,
          life: 1,
          color: E % 3 === 0 ? "#ffffff" : main,
          size: 4 + Math.random() * 8,
        });
      }
      setCe((E) => [...E, ...b]);
      setDe((E) => [
        ...E,
        {
          id: Ie(),
          x: x_1,
          y: y_1 - 20,
          text: `+${n}`,
          life: 1.5,
          color: main,
        },
      ]);
    }
    const o = new Set(i.map((c) => c.id));
    setPa(o);
    setTimeout(() => setPa(new Set()), 600);
    setFa(words);
    setGe(n);
    setY(x);
    setZ(true);
  }
  function Ra() {
    if (!Z || !y) {
      return;
    }
    if (y === 1) {
      hRef.current += ge;
      setU(hRef.current);
      setYe((n) => n + 1);
    } else {
      RRef.current += ge;
      setO(RRef.current);
      setJe((n) => n + 1);
    }
    setL((n) =>
      n.map((i) => {
        if (i.player === y) {
          return {
            ...i,
            isNew: false,
          };
        }
        return i;
      }),
    );
    const a = new Set(xe(L).map((n) => n.id));
    setPa(a);
    setTimeout(() => setPa(new Set()), 600);
    const t = 7 - (y === 1 ? _ : $).length;
    if (t > 0 && se.length > 0) {
      const { tiles, remainingBag } = ne(t, se);
      setSe(remainingBag);
      if (y === 1) {
        set_((r) => [...r, ...tiles]);
      } else {
        set$((r) => [...r, ...tiles]);
      }
    }
    setZ(false);
    setFa([]);
    setGe(0);
    setY(null);
    ie();
  }
  function Na(a) {
    if (!Z || !y) {
      return;
    }
    if (Re(a.word)) {
      playWrong();
      setQ("red");
      setTimeout(() => setQ(null), 800);
      if ((y === 1 ? 2 : 1) === 1) {
        hRef.current = Math.max(0, hRef.current - 10);
        setU(hRef.current);
      } else {
        RRef.current = Math.max(0, RRef.current - 10);
        setO(RRef.current);
      }
      setSe_1("Invalidacion incorrecta: -10 puntos");
      setTimeout(() => setSe_1(""), 3000);
      if (y === 1) {
        hRef.current += ge;
        setU(hRef.current);
        setYe((o) => o + 1);
      } else {
        RRef.current += ge;
        setO(RRef.current);
        setJe((o) => o + 1);
      }
      setL((o) =>
        o.map((c) => {
          if (c.player === y) {
            return {
              ...c,
              isNew: false,
            };
          }
          return c;
        }),
      );
      const n = new Set(xe(L).map((o) => o.id));
      setPa(n);
      setTimeout(() => setPa(new Set()), 600);
      const r = 7 - (y === 1 ? _ : $).length;
      if (r > 0 && se.length > 0) {
        const { tiles, remainingBag } = ne(r, se);
        setSe(remainingBag);
        if (y === 1) {
          set_((d) => [...d, ...tiles]);
        } else {
          set$((d) => [...d, ...tiles]);
        }
      }
      setZ(false);
      setFa([]);
      setGe(0);
      setY(null);
      ie();
    } else {
      playWrong();
      setQ("red");
      setTimeout(() => setQ(null), 800);
      const t = new Set(a.tiles.map((r) => r.id));
      const n = [];
      const i = L.filter((r) => {
        if (t.has(r.id)) {
          return (
            n.push({
              id: r.id,
              letter: r.letter,
            }),
            false
          );
        }
        return true;
      });
      setL(i);
      if (y === 1) {
        set_((r) => [...r, ...n]);
      } else {
        set$((r) => [...r, ...n]);
      }
      if (y === 1) {
        hRef.current = Math.max(0, hRef.current - a.score);
        setU(hRef.current);
      } else {
        RRef.current = Math.max(0, RRef.current - a.score);
        setO(RRef.current);
      }
      setSe_1(`Palabra invalidada: ${a.word}`);
      setTimeout(() => setSe_1(""), 3000);
      setZ(false);
      setFa([]);
      setGe(0);
      setY(null);
      setX(null);
      setV("place");
      setH(new Set());
    }
  }
  function Ia() {
    if (Z || P) {
      return;
    }
    playClick();
    const l = L.filter((t) => t.isNew && t.player === x).map((t) => ({
      id: t.id,
      letter: t.letter,
    }));
    setL((t) => t.filter((n) => !(n.isNew && n.player === x)));
    if (x === 1) {
      set_((t) => [...t, ...l]);
    } else {
      set$((t) => [...t, ...l]);
    }
    setX(null);
    setV("place");
    setH(new Set());
    setSe_1("");
    ie();
  }
  function Sa() {
    if (Z || P) {
      return;
    }
    if (H.size === 0) {
      setV("discard");
      setX(null);
      return;
    }
    playClick();
    const a = x === 1 ? _ : $;
    const l = Array.from(H).sort((f, b) => b - f);
    const t = [];
    const n = [...a];
    for (const f of l) {
      t.push(n[f].letter);
      n.splice(f, 1);
    }
    const i = Ne([...se, ...t]);
    const r = 7 - n.length;
    const { tiles, remainingBag } = ne(r, i);
    const d = [...n, ...tiles];
    setSe(remainingBag);
    if (x === 1) {
      set_(d);
    } else {
      set$(d);
    }
    setV("place");
    setH(new Set());
    setSe_1("");
    const T = L.filter((f) => f.isNew && f.player === x).map((f) => ({
      id: f.id,
      letter: f.letter,
    }));
    setL((f) => f.filter((b) => !(b.isNew && b.player === x)));
    if (x === 1) {
      set_((f) => [...f, ...T]);
    } else {
      set$((f) => [...f, ...T]);
    }
    ie();
  }
  function wa() {
    if (Z || P) {
      return;
    }
    const l = L.filter((t) => t.isNew && t.player === x).map((t) => ({
      id: t.id,
      letter: t.letter,
    }));
    setL((t) => t.filter((n) => !(n.isNew && n.player === x)));
    if (x === 1) {
      set_((t) => [...t, ...l]);
    } else {
      set$((t) => [...t, ...l]);
    }
    setX(null);
    setV("place");
    setH(new Set());
    setSe_1("");
    playClick();
  }
  function Ta() {
    if (!(Z || P)) {
      playClick();
      if (x === 1) {
        set_((a) => Ne(a));
      } else {
        set$((a) => Ne(a));
      }
    }
  }
  function ya() {
    if (Z || P) {
      return;
    }
    if (L.filter((l) => !l.isNew && l.player !== x).length === 0) {
      setSe_1("No hay palabras del rival en el tablero");
      setTimeout(() => setSe_1(""), 2000);
      return;
    }
    playClick();
    setP(true);
    setX(null);
    setV("place");
    setH(new Set());
    setB(null);
  }
  function Ca() {
    setP(false);
    setB(null);
  }
  function La() {
    if (!B || !P) {
      return;
    }
    if (Re(B.word)) {
      playWrong();
      setQ("red");
      setTimeout(() => setQ(null), 800);
      if (x === 1) {
        hRef.current = Math.max(0, hRef.current - 10);
        setU(hRef.current);
      } else {
        RRef.current = Math.max(0, RRef.current - 10);
        setO(RRef.current);
      }
      setSe_1("Palabra válida: -10 puntos");
      setTimeout(() => setSe_1(""), 3000);
      setP(false);
      setB(null);
      setX(null);
      setV("place");
      setH(new Set());
      ie();
    } else {
      playWrong();
      setQ("red");
      setTimeout(() => setQ(null), 800);
      const l = new Set(B.tiles.map((r) => r.id));
      const t = [];
      const n = L.filter((r) => {
        if (l.has(r.id)) {
          return (
            t.push({
              id: r.id,
              letter: r.letter,
            }),
            false
          );
        }
        return true;
      });
      setL(n);
      const i = B.tiles[0].player;
      if (i === 1) {
        hRef.current = Math.max(0, hRef.current - B.score);
        setU(hRef.current);
      } else {
        RRef.current = Math.max(0, RRef.current - B.score);
        setO(RRef.current);
      }
      if (i === 1) {
        set_((r) => [...r, ...t]);
      } else {
        set$((r) => [...r, ...t]);
      }
      setSe_1(`Palabra descartada: ${B.word}`);
      setTimeout(() => setSe_1(""), 3000);
      setP(false);
      setB(null);
      setX(null);
      setV("place");
      setH(new Set());
      ie();
    }
  }
  const Da = x === 1 ? _ : $;
  const se_length = se.length;
  if (te === "select") {
    return (
      <StarfieldBackground>
        <SoundToggles />
        <div className="max-w-5xl mx-auto px-4 py-6 min-h-screen relative z-10 flex flex-col items-center justify-center">
          <div className="text-center mb-12">
            <div
              className="inline-flex items-center justify-center w-24 h-24 rounded-2xl mb-6 animate-float"
              style={{
                background: "linear-gradient(135deg, #ffd600, #ff6b35, #ff00aa)",
                boxShadow:
                  "0 0 60px rgba(255,214,0,.6), 0 0 100px rgba(255,107,53,.4), 0 0 140px rgba(255,0,170,.2)",
                transform: "rotateX(15deg)",
                perspective: "800px",
              }}
            >
              <HashIcon size={48} className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
            </div>
            <h1
              className="text-5xl md:text-6xl font-black mb-4"
              style={{
                textShadow:
                  "0 0 50px rgba(255,214,0,0.5), 0 0 100px rgba(255,107,53,0.3), 0 0 150px rgba(255,0,170,0.15)",
                transform: "rotateX(5deg)",
                perspective: "800px",
              }}
            >
              Apalabrados
            </h1>
            <p className="text-white/50 text-base font-medium mb-2">
              2 Jugadores - Scrabble en español / 双人西班牙语拼字游戏
            </p>
            <p className="text-white/30 text-xs font-medium">
              Diccionario amplio de palabras españolas / 海量西班牙语词汇
            </p>
            <div className="flex justify-center gap-6 mt-6">
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold"
                style={{
                  background: s[1].bg,
                  border: `1px solid ${s[1].border}`,
                  color: s[1].main,
                  boxShadow: `0 0 20px ${s[1].glow}`,
                }}
              >
                <UserIcon size={14} /> Jugador 1 (Neón Cyan)
              </div>
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold"
                style={{
                  background: s[2].bg,
                  border: `1px solid ${s[2].border}`,
                  color: s[2].main,
                  boxShadow: `0 0 20px ${s[2].glow}`,
                }}
              >
                <UserIcon size={14} /> Jugador 2 (Neón Rosa)
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              setSe_1("");
              Qe();
            }}
            className="group relative px-16 py-5 rounded-full text-white font-black text-xl transition-all hover:scale-110 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #ffd600, #ff6b35, #ff00aa)",
              boxShadow:
                "0 0 40px rgba(255,214,0,.4), 0 0 80px rgba(255,107,53,.3), 0 0 120px rgba(255,0,170,.2)",
            }}
          >
            <span className="relative z-10 flex items-center gap-3">
              <SparklesIcon size={24} /> JUGAR / 开始游戏
            </span>
            <div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: "linear-gradient(135deg, #ff00aa, #ffd600, #ff6b35)",
                boxShadow: "0 0 60px rgba(255,0,170,.5), 0 0 100px rgba(255,214,0,.4)",
              }}
            />
          </button>
          <div className="mt-8 grid grid-cols-2 gap-4 max-w-md">
            <div
              className="rounded-xl p-3 text-center"
              style={{
                background: "rgba(0,240,255,.08)",
                border: "1px solid rgba(0,240,255,.2)",
                boxShadow: "0 0 15px rgba(0,240,255,.1)",
              }}
            >
              <p className="text-[10px] text-white/40 font-bold uppercase">Tablero</p>
              <p
                className="text-sm font-black"
                style={{
                  color: "#00f0ff",
                }}
              >
                15×15
              </p>
            </div>
            <div
              className="rounded-xl p-3 text-center"
              style={{
                background: "rgba(255,42,109,.08)",
                border: "1px solid rgba(255,42,109,.2)",
                boxShadow: "0 0 15px rgba(255,42,109,.1)",
              }}
            >
              <p className="text-[10px] text-white/40 font-bold uppercase">Fichas</p>
              <p
                className="text-sm font-black"
                style={{
                  color: "#ff2a6d",
                }}
              >
                7 c/u
              </p>
            </div>
            <div
              className="rounded-xl p-3 text-center"
              style={{
                background: "rgba(255,214,0,.08)",
                border: "1px solid rgba(255,214,0,.2)",
                boxShadow: "0 0 15px rgba(255,214,0,.1)",
              }}
            >
              <p className="text-[10px] text-white/40 font-bold uppercase">Diccionario</p>
              <p
                className="text-sm font-black"
                style={{
                  color: "#ffd600",
                }}
              >
                1000+ palabras
              </p>
            </div>
            <div
              className="rounded-xl p-3 text-center"
              style={{
                background: "rgba(57,255,20,.08)",
                border: "1px solid rgba(57,255,20,.2)",
                boxShadow: "0 0 15px rgba(57,255,20,.1)",
              }}
            >
              <p className="text-[10px] text-white/40 font-bold uppercase">Descarte</p>
              <p
                className="text-sm font-black"
                style={{
                  color: "#39ff14",
                }}
              >
                Activo
              </p>
            </div>
          </div>
          <Link
            to="/juegos"
            className="mt-8 inline-flex items-center gap-2 text-white/40 hover:text-[#39ecff] transition-colors text-sm font-bold group"
          >
            <ArrowLeftIcon size={16} className="group-hover:-translate-x-1 transition-transform" /> Volver /
            返回
          </Link>
        </div>
        <Sa1Component expression="neutral" />
        <style
          dangerouslySetInnerHTML={{
            __html: `
        @keyframes tilePlacePop { 0%{transform:scale(0.6) translateZ(-30px);opacity:0} 60%{transform:scale(1.2) translateZ(15px);opacity:1} 100%{transform:scale(1) translateZ(0);opacity:1} }
        @keyframes tileGlowPulse { 0%{box-shadow:0 0 0px transparent} 50%{box-shadow:0 0 30px rgba(255,255,255,0.8)} 100%{box-shadow:0 0 0px transparent} }
        @keyframes premiumPulse { 0%,100%{box-shadow:0 0 8px var(--glow-color), inset 0 0 8px var(--glow-color); transform:scale(1)} 50%{box-shadow:0 0 20px var(--glow-color), inset 0 0 12px var(--glow-color); transform:scale(1.05)} }
        @keyframes boardAmbient { 0%,100%{box-shadow:0 0 60px var(--board-glow), 0 25px 70px rgba(0,0,0,.6), inset 0 0 30px rgba(255,255,255,.05), 0 0 120px var(--board-glow-dim)} 50%{box-shadow:0 0 90px var(--board-glow), 0 25px 70px rgba(0,0,0,.6), inset 0 0 30px rgba(255,255,255,.08), 0 0 160px var(--board-glow-dim)} }
        @keyframes tileFloat { 0%,100%{transform:translateY(0) translateZ(5px)} 50%{transform:translateY(-3px) translateZ(8px)} }
        @keyframes rackGlow { 0%,100%{box-shadow:0 0 40px var(--rack-glow), 0 8px 24px rgba(0,0,0,.3), inset 0 0 30px rgba(255,255,255,.03)} 50%{box-shadow:0 0 60px var(--rack-glow), 0 8px 24px rgba(0,0,0,.3), inset 0 0 30px rgba(255,255,255,.05)} }
        @keyframes shuffleSpin { 0%{transform:rotateY(0deg)} 100%{transform:rotateY(360deg)} }
        @keyframes neonFlicker { 0%,19%,21%,23%,25%,54%,56%,100%{opacity:1} 20%,24%,55%{opacity:0.6} }
        @keyframes glassShine { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes winTrophy { 0%{transform:scale(0) rotateY(180deg)} 50%{transform:scale(1.2) rotateY(0deg)} 100%{transform:scale(1) rotateY(0deg)} }
        @keyframes scorePulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }
        @keyframes confettiFall { 0%{transform:translateY(-20px) rotate(0deg);opacity:1} 100%{transform:translateY(110vh) rotate(720deg);opacity:0} }
        @keyframes floatUp { 0%{transform:translateX(-50%) translateY(0);opacity:1} 100%{transform:translateX(-50%) translateY(-60px);opacity:0} }
        @keyframes celebrationPop { 0%{transform:scale(0.5) rotateX(90deg);opacity:0} 50%{transform:scale(1.3) rotateX(0deg);opacity:1} 70%{transform:scale(1) rotateX(0deg);opacity:1} 100%{transform:scale(1) rotateX(0deg);opacity:0} }
        @keyframes mascotFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes mascotBounce { 0%,100%{transform:translateY(0) scale(1)} 25%{transform:translateY(-12px) scale(1.05)} 50%{transform:translateY(0) scale(1)} 75%{transform:translateY(-6px) scale(1.03)} }
        @keyframes mascotWiggle { 0%,100%{transform:rotate(0deg)} 25%{transform:rotate(-8deg)} 75%{transform:rotate(8deg)} }
        @keyframes mascotSigh { 0%,100%{transform:translateY(0)} 50%{transform:translateY(4px)} }
        @keyframes mascotThink { 0%,100%{transform:translateY(0) rotate(0deg)} 25%{transform:translateY(-4px) rotate(-3deg)} 75%{transform:translateY(-4px) rotate(3deg)} }
        @keyframes pulseSoft { 0%,100%{opacity:1} 50%{opacity:.7} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }
        @keyframes modalIn { 0%{transform:scale(.8) translateY(20px);opacity:0} 100%{transform:scale(1) translateY(0);opacity:1} }
        @keyframes glow { 0%,100%{filter:drop-shadow(0 0 25px rgba(255,214,0,.4))} 50%{filter:drop-shadow(0 0 40px rgba(255,214,0,.7))} }
        @keyframes shake { 0%,100%{transform:translateX(0)} 10%,30%,50%,70%,90%{transform:translateX(-4px)} 20%,40%,60%,80%{transform:translateX(4px)} }
        @keyframes flashPulse { 0%{opacity:0} 50%{opacity:1} 100%{opacity:0} }
        @keyframes pulseSlow { 0%,100%{opacity:.7} 50%{opacity:1} }
        @keyframes tileSelectFloat { 0%,100%{transform:translateY(-8px) scale(1.12) rotateX(-5deg) translateZ(20px)} 50%{transform:translateY(-12px) scale(1.15) rotateX(-5deg) translateZ(30px)} }
        @keyframes woodGrain { 0%{background-position:0 0} 100%{background-position:100% 100%} }
        .animate-celebration-pop { animation: celebrationPop 1.5s ease-out forwards; }
        .animate-pulse-soft { animation: pulseSoft 2s ease-in-out infinite; }
        .animate-blink { animation: blink 1.5s ease-in-out infinite; }
        .animate-modal-in { animation: modalIn 0.4s ease-out forwards; }
        .animate-glow { animation: glow 2s ease-in-out infinite; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .animate-pulse-slow { animation: pulseSlow 3s ease-in-out infinite; }
        .perspective-1200 { perspective: 1200px; }
        .board-3d { transform-style: preserve-3d; backface-visibility: hidden; animation: boardAmbient 4s ease-in-out infinite; }
        .cell-glow:hover { z-index: 2; transform: scale(1.1) translateZ(10px); }
        .rack-tile:hover { z-index: 2; }
        .btn-neon:hover { box-shadow: 0 0 40px rgba(0,240,255,.5), 0 4px 20px rgba(0,0,0,.3) !important; }
        .tile-3d-new { animation: tilePlacePop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), tileFloat 3s ease-in-out infinite 0.5s; }
        .tile-wood { background: linear-gradient(135deg, #f0e6d2, #c9a96e, #d4b896, #b8956a); background-size: 200% 200%; }
        .tile-3d-placed { transform-style: preserve-3d; box-shadow: 0 3px 8px rgba(0,0,0,.5), inset 0 1px 4px rgba(255,255,255,.5); }
        .premium-square { animation: premiumPulse 2.5s ease-in-out infinite; }
        .glass-card { background: linear-gradient(135deg, rgba(255,255,255,.08), rgba(255,255,255,.02)); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,.15); position: relative; overflow: hidden; }
        .glass-card::before { content:''; position: absolute; top: 0; left: -100%; width: 200%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,.1), transparent); animation: glassShine 3s ease-in-out infinite; pointer-events: none; }
        .score-3d { transform-style: preserve-3d; transform: rotateX(5deg); text-shadow: 0 1px 0 rgba(255,255,255,.2), 0 2px 0 rgba(255,255,255,.15), 0 3px 0 rgba(255,255,255,.1); }
        .trophy-anim { animation: winTrophy 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
    `,
          }}
        />
      </StarfieldBackground>
    );
  }
  const Pa = u + O;
  const S = x === 1;
  const W = x === 2;
  const ka =
    H.size > 0 ? `Descartar ${H.size} y pasar` : v === "discard" ? "Cancelar descarte" : "Descartar fichas";
  return (
    <StarfieldBackground>
      <SoundToggles />
      <div className="max-w-5xl mx-auto px-3 md:px-4 py-3 md:py-4 min-h-screen relative z-10">
        <div className="flex items-center justify-between mb-2 md:mb-3 flex-wrap gap-2">
          <Link
            to="/juegos"
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold group"
          >
            <ArrowLeftIcon size={16} className="group-hover:-translate-x-1 transition-transform" /> Volver /
            返回
          </Link>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => {
                playClick();
                setTe("select");
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105"
              style={{
                background: "rgba(255,255,255,.08)",
                border: "1px solid rgba(255,255,255,.15)",
                color: "#fff",
                boxShadow: "0 0 10px rgba(255,255,255,.05)",
              }}
            >
              <LayersIcon size={12} /> Cambiar / 切换
            </button>
            <div
              className="px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1"
              style={{
                background: "rgba(255,214,0,.12)",
                border: "1px solid rgba(255,214,0,.25)",
                color: "#ffd600",
                boxShadow: "0 0 10px rgba(255,214,0,.15)",
              }}
            >
              <HashIcon size={12} /> Total: {Pa}
            </div>
            <div
              className="px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1"
              style={{
                background: "rgba(57,255,20,.12)",
                border: "1px solid rgba(57,255,20,.25)",
                color: "#39ff14",
                boxShadow: "0 0 10px rgba(57,255,20,.15)",
              }}
            >
              <LayersIcon size={12} /> Saco: {se_length}
            </div>
          </div>
        </div>
        <div className="text-center mb-2 md:mb-3">
          <h1
            className="text-2xl md:text-3xl font-black mb-1 animate-glow"
            style={{
              background: "linear-gradient(135deg,#ffd600,#ff6b35)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 25px rgba(255,214,0,.4))",
            }}
          >
            Apalabrados
          </h1>
          <p className="text-white/40 text-xs font-medium">Turno {da} - 2 Jugadores / 双人游戏</p>
          {we && oe && (
            <p
              className="text-sm font-bold mt-1 animate-pulse-soft"
              style={{
                color: s[oe].main,
                textShadow: `0 0 10px ${s[oe].glow}`,
              }}
            >
              Última: {we} (+{ca})
            </p>
          )}
          {Se && (
            <p
              className="text-sm font-bold mt-1 animate-shake text-red-400"
              style={{
                textShadow: "0 0 10px rgba(255,68,68,.3)",
              }}
            >
              {Se}
            </p>
          )}
        </div>
        <div className="flex justify-center gap-2 md:gap-4 mb-3 md:mb-4">
          <div
            className="relative flex-1 max-w-[220px] rounded-2xl p-2 md:p-3 transition-all duration-500"
            style={{
              background: S
                ? "linear-gradient(135deg, rgba(0,240,255,.15), rgba(0,240,255,.05))"
                : "rgba(14,22,64,.5)",
              border: S ? `2px solid ${s[1].main}` : "1px solid rgba(255,255,255,.1)",
              boxShadow: S
                ? `0 0 30px ${s[1].glow}, inset 0 0 25px ${s[1].glow}, 0 8px 32px rgba(0,0,0,.3)`
                : "none",
              transform: S ? "scale(1.05) translateY(-2px) rotateX(5deg)" : "scale(1) rotateX(2deg)",
              transformStyle: "preserve-3d",
              perspective: "800px",
            }}
          >
            {S && (
              <div
                className="absolute -top-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider animate-pulse-soft"
                style={{
                  background: s[1].main,
                  color: "#000",
                  boxShadow: `0 0 20px ${s[1].glow}`,
                }}
              >
                ¡Tu Turno!
              </div>
            )}
            <div className="flex items-center gap-2 mb-1">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: S ? s[1].main : "rgba(255,255,255,.1)",
                  boxShadow: S ? `0 0 15px ${s[1].glow}` : "none",
                }}
              >
                <UserIcon
                  size={16}
                  style={{
                    color: S ? "#000" : s[1].main,
                  }}
                />
              </div>
              <div className="flex-1">
                <p
                  className="text-xs font-bold"
                  style={{
                    color: s[1].main,
                  }}
                >
                  Jugador 1
                </p>
                <p className="text-[10px] text-white/30">{Ye} palabras</p>
              </div>
              <p
                className="text-xl font-black score-3d"
                style={{
                  color: s[1].main,
                  textShadow: S ? `0 0 15px ${s[1].glow}` : "none",
                }}
              >
                {u}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div
              className="text-xs font-bold text-white/30 px-2 py-1 rounded-full"
              style={{
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.12)",
                boxShadow: "0 0 10px rgba(255,255,255,.05)",
                transform: "rotateX(5deg)",
              }}
            >
              VS
            </div>
          </div>
          <div
            className="relative flex-1 max-w-[220px] rounded-2xl p-2 md:p-3 transition-all duration-500"
            style={{
              background: W
                ? "linear-gradient(135deg, rgba(255,42,109,.15), rgba(255,42,109,.05))"
                : "rgba(14,22,64,.5)",
              border: W ? `2px solid ${s[2].main}` : "1px solid rgba(255,255,255,.1)",
              boxShadow: W
                ? `0 0 30px ${s[2].glow}, inset 0 0 25px ${s[2].glow}, 0 8px 32px rgba(0,0,0,.3)`
                : "none",
              transform: W ? "scale(1.05) translateY(-2px) rotateX(5deg)" : "scale(1) rotateX(2deg)",
              transformStyle: "preserve-3d",
              perspective: "800px",
            }}
          >
            {W && (
              <div
                className="absolute -top-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider animate-pulse-soft"
                style={{
                  background: s[2].main,
                  color: "#fff",
                  boxShadow: `0 0 20px ${s[2].glow}`,
                }}
              >
                ¡Tu Turno!
              </div>
            )}
            <div className="flex items-center gap-2 mb-1">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: W ? s[2].main : "rgba(255,255,255,.1)",
                  boxShadow: W ? `0 0 15px ${s[2].glow}` : "none",
                }}
              >
                <UserIcon
                  size={16}
                  style={{
                    color: W ? "#fff" : s[2].main,
                  }}
                />
              </div>
              <div className="flex-1">
                <p
                  className="text-xs font-bold"
                  style={{
                    color: s[2].main,
                  }}
                >
                  Jugador 2
                </p>
                <p className="text-[10px] text-white/30">{Je} palabras</p>
              </div>
              <p
                className="text-xl font-black score-3d"
                style={{
                  color: s[2].main,
                  textShadow: W ? `0 0 15px ${s[2].glow}` : "none",
                }}
              >
                {O}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center mb-3 md:mb-4 perspective-[1200px]">
          <div className="relative">
            <div
              ref={keRef}
              className="grid gap-[1px] md:gap-[2px] p-2 md:p-3 rounded-xl md:rounded-2xl board-3d"
              style={{
                gridTemplateColumns: `repeat(${pe}, 1fr)`,
                background: "linear-gradient(135deg, rgba(14,22,64,.95), rgba(5,8,27,.9))",
                border: `2px solid ${S ? s[1].main : s[2].main}`,
                boxShadow: `0 0 60px ${S ? s[1].glow : s[2].glow}, 0 25px 70px rgba(0,0,0,.6), inset 0 0 30px rgba(255,255,255,.05), 0 0 120px ${S ? "rgba(0,240,255,.12)" : "rgba(255,42,109,.12)"}`,
                "--board-glow": S ? s[1].glow : s[2].glow,
                "--board-glow-dim": S ? "rgba(0,240,255,.12)" : "rgba(255,42,109,.12)",
                width: "min(96vw, 540px)",
                aspectRatio: "1",
                transition: "border-color 0.5s, box-shadow 0.5s",
                transform: "rotateX(12deg)",
              }}
            >
              {Array.from({
                length: pe * pe,
              }).map((a, l) => {
                const t = Math.floor(l / pe);
                const n = l % pe;
                const i = `${t},${n}`;
                const r = he[i];
                const o = k(t, n);
                const c = r ? ra[r] : null;
                const d = o && pa.has(o.id);
                const g = Q && o && o.isNew;
                const T = B && B.tiles.some((b) => b.row === t && b.col === n);
                const f = P && o && !o.isNew && o.player !== x;
                return (
                  <div
                    key={i}
                    onClick={() => Oa(t, n)}
                    className={`relative flex items-center justify-center cursor-pointer transition-all hover:brightness-125 hover:scale-110 cell-glow ${r && !o ? "premium-square" : ""}`}
                    style={{
                      background: g
                        ? Q === "green"
                          ? "linear-gradient(135deg, rgba(57,255,20,.5), rgba(0,240,255,.3))"
                          : "linear-gradient(135deg, rgba(255,0,60,.5), rgba(255,42,109,.3))"
                        : T
                          ? "linear-gradient(135deg, rgba(255,214,0,.4), rgba(255,107,53,.3))"
                          : o
                            ? o.player === 1
                              ? "linear-gradient(135deg, #0a4a6e, #0d5a82)"
                              : "linear-gradient(135deg, #6e0a1a, #820d1f)"
                            : c
                              ? c.bg
                              : "rgba(255,255,255,.04)",
                      border: g
                        ? `2px solid ${Q === "green" ? "#39ff14" : "#ff0040"}`
                        : T
                          ? "2px solid #ffd600"
                          : f
                            ? "1px solid rgba(255,214,0,.7)"
                            : o
                              ? `1px solid ${o.player === 1 ? s[1].main : s[2].main}`
                              : c
                                ? `1px solid ${c.border}`
                                : "1px solid rgba(255,255,255,.06)",
                      boxShadow: g
                        ? `0 0 25px ${Q === "green" ? "rgba(57,255,20,.6)" : "rgba(255,0,60,.6)"}, inset 0 0 15px ${Q === "green" ? "rgba(57,255,20,.3)" : "rgba(255,0,60,.3)"}`
                        : T
                          ? "0 0 25px rgba(255,214,0,.6), inset 0 0 15px rgba(255,214,0,.3)"
                          : f
                            ? "0 0 15px rgba(255,214,0,.3)"
                            : o
                              ? `0 2px 8px rgba(0,0,0,.5), inset 0 1px 4px rgba(255,255,255,.5), 0 0 15px ${o.player === 1 ? s[1].glow : s[2].glow}`
                              : c
                                ? `${c.glow}, inset 0 0 8px ${c.bg}`
                                : "none",
                      borderRadius: 4,
                      animation: d
                        ? "tilePlacePop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), tileFloat 3s ease-in-out infinite 0.5s"
                        : "none",
                      "--glow-color": c ? c.text : "transparent",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {o ? (
                      <div
                        className="flex flex-col items-center tile-3d tile-3d-placed"
                        style={{
                          animation: d ? "tileGlowPulse 0.8s ease-out" : "none",
                        }}
                      >
                        <span
                          className="text-white font-black text-[10px] md:text-sm leading-none"
                          style={{
                            textShadow: `0 1px 3px rgba(0,0,0,.5), 0 0 12px ${o.player === 1 ? s[1].glow : s[2].glow}`,
                          }}
                        >
                          {o.letter}
                        </span>
                        <span className="text-[6px] md:text-[8px] font-bold text-white/70 leading-none">
                          {de(o.letter)}
                        </span>
                      </div>
                    ) : r ? (
                      <span
                        className="text-[7px] md:text-[9px] font-black"
                        style={{
                          color: c.text,
                          textShadow: `0 0 8px ${c.text}`,
                        }}
                      >
                        {r}
                      </span>
                    ) : null}
                    {o && o.isNew && o.player === x && (
                      <div
                        className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full animate-blink"
                        style={{
                          background: x === 1 ? s[1].main : s[2].main,
                          boxShadow: `0 0 10px ${x === 1 ? s[1].main : s[2].main}`,
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            {Q && (
              <div
                className="absolute inset-0 rounded-xl md:rounded-2xl pointer-events-none z-10"
                style={{
                  background:
                    Q === "green"
                      ? "radial-gradient(circle, rgba(57,255,20,.3), transparent 70%)"
                      : "radial-gradient(circle, rgba(255,0,60,.3), transparent 70%)",
                  animation: "flashPulse 0.6s ease-out",
                  mixBlendMode: "screen",
                  boxShadow: `inset 0 0 60px ${Q === "green" ? "rgba(57,255,20,.4)" : "rgba(255,0,60,.4)"}`,
                }}
              />
            )}
          </div>
        </div>
        <div className="flex justify-center mb-3 md:mb-4">
          <div
            className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-2xl transition-all duration-500 rack-glow"
            style={{
              background: S
                ? "linear-gradient(135deg, rgba(0,240,255,.12), rgba(0,240,255,.02))"
                : "linear-gradient(135deg, rgba(255,42,109,.12), rgba(255,42,109,.02))",
              border: `2px solid ${S ? s[1].border : s[2].border}`,
              boxShadow: `0 0 40px ${S ? s[1].glow : s[2].glow}, 0 8px 24px rgba(0,0,0,.3), inset 0 0 30px rgba(255,255,255,.03)`,
              transform: "rotateX(5deg)",
              transformStyle: "preserve-3d",
              "--rack-glow": S ? s[1].glow : s[2].glow,
            }}
          >
            {Da.map((a, l) => {
              const t = v === "place" && X === l;
              const n = v === "discard" && H.has(l);
              const i = "linear-gradient(135deg, #f0e6d2, #c9a96e)";
              const r =
                v === "discard"
                  ? "linear-gradient(135deg, #ff6b35, #ff2a6d)"
                  : `linear-gradient(135deg, ${s[x].main}, ${x === 1 ? "#0077ff" : "#ff0040"})`;
              return (
                <button
                  key={a.id}
                  onClick={() => Ea(l)}
                  className="relative flex flex-col items-center justify-center transition-all hover:scale-115 hover:-translate-y-2 rack-tile tile-wood"
                  style={{
                    width: 44,
                    height: 48,
                    background: t || n ? r : i,
                    border:
                      t || n
                        ? `3px solid ${v === "discard" ? "#ff6b35" : s[x].main}`
                        : "2px solid rgba(255,255,255,.6)",
                    boxShadow:
                      t || n
                        ? `0 0 30px ${v === "discard" ? "rgba(255,42,109,.7)" : s[x].glow}, 0 6px 16px rgba(0,0,0,.6), inset 0 0 10px rgba(255,255,255,.3)`
                        : "0 4px 12px rgba(0,0,0,.6), inset 0 1px 6px rgba(255,255,255,.7), 0 0 12px rgba(232,213,181,.4), inset 0 0 10px rgba(255,255,255,.15)",
                    borderRadius: 12,
                    transform:
                      t || n
                        ? "translateY(-8px) scale(1.12) rotateX(-5deg) translateZ(20px)"
                        : "rotateX(-5deg) translateZ(5px)",
                    animation: t || n ? "tileSelectFloat 2s ease-in-out infinite" : "none",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <span
                    className="text-white font-black text-lg md:text-xl leading-none"
                    style={{
                      textShadow: "0 1px 4px rgba(0,0,0,.6), 0 0 12px rgba(255,255,255,.5)",
                    }}
                  >
                    {a.letter}
                  </span>
                  <span className="text-[8px] md:text-[9px] font-bold text-white/90 leading-none mt-0.5">
                    {de(a.letter)}
                  </span>
                  <div
                    className="absolute top-0 left-0 right-0 h-1/2 rounded-t-[12px] opacity-40 pointer-events-none"
                    style={{
                      background: "linear-gradient(180deg, rgba(255,255,255,.9), transparent)",
                    }}
                  />
                  {(t || n) && (
                    <div
                      className="absolute -inset-1.5 rounded-[14px] opacity-60 pointer-events-none"
                      style={{
                        boxShadow:
                          `0 0 30px ${v}` == "discard" || `${s[x].main}, inset 0 0 20px ${v}` == "discard"
                            ? "#ff6b35"
                            : s[x].main,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex justify-center gap-2 md:gap-3 mb-3 md:mb-4 flex-wrap">
          {!P && (
            <>
              <button
                onClick={ha}
                className="flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full text-white font-bold text-sm transition-all hover:scale-110 hover:-translate-y-0.5 active:scale-95 btn-neon"
                style={{
                  background: `linear-gradient(135deg,${s[x].main},${x === 1 ? "#00d4a0" : "#ff00aa"})`,
                  boxShadow: `0 0 25px ${s[x].glow}, 0 4px 15px rgba(0,0,0,.3)`,
                }}
              >
                <CheckIcon size={16} /> Colocar / 放置
              </button>
              <button
                onClick={Ia}
                className="flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full text-white font-bold text-sm transition-all hover:scale-110 hover:-translate-y-0.5 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, rgba(255,214,0,.2), rgba(255,214,0,.05))",
                  border: "1px solid rgba(255,214,0,.4)",
                  boxShadow: "0 0 20px rgba(255,214,0,.15), 0 4px 15px rgba(0,0,0,.2)",
                }}
              >
                <SkipForwardIcon size={16} /> Pasar / 跳过
              </button>
              <button
                onClick={Sa}
                className="flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full text-white font-bold text-sm transition-all hover:scale-110 hover:-translate-y-0.5 active:scale-95"
                style={{
                  background:
                    v === "discard" && H.size > 0
                      ? "linear-gradient(135deg, rgba(255,42,109,.3), rgba(255,107,53,.2))"
                      : "linear-gradient(135deg, rgba(255,68,68,.15), rgba(255,68,68,.05))",
                  border: `1px solid ${v === "discard" && H.size > 0 ? "rgba(255,42,109,.6)" : "rgba(255,68,68,.4)"}`,
                  boxShadow: `0 0 20px ${v === "discard" && H.size > 0 ? "rgba(255,42,109,.25)" : "rgba(255,68,68,.1)"}, 0 4px 15px rgba(0,0,0,.2)`,
                }}
              >
                <Trash2Icon size={16} /> {ka}
              </button>
              <button
                onClick={wa}
                className="flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full text-white font-bold text-sm transition-all hover:scale-110 hover:-translate-y-0.5 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,.1), rgba(255,255,255,.02))",
                  border: "1px solid rgba(255,255,255,.25)",
                  boxShadow: "0 0 15px rgba(255,255,255,.08), 0 4px 15px rgba(0,0,0,.2)",
                }}
              >
                <RotateCcwIcon size={16} /> Recoger / 收回
              </button>
              <button
                onClick={Ta}
                className="flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full text-white font-bold text-sm transition-all hover:scale-110 hover:-translate-y-0.5 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, rgba(57,255,20,.12), rgba(57,255,20,.02))",
                  border: "1px solid rgba(57,255,20,.3)",
                  boxShadow: "0 0 15px rgba(57,255,20,.08), 0 4px 15px rgba(0,0,0,.2)",
                }}
              >
                <ZapIcon size={16} /> Mezclar / 洗牌
              </button>
              <button
                onClick={ya}
                className="flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full text-white font-bold text-sm transition-all hover:scale-110 hover:-translate-y-0.5 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, rgba(255,214,0,.15), rgba(255,107,53,.1))",
                  border: "1px solid rgba(255,214,0,.5)",
                  boxShadow: "0 0 20px rgba(255,214,0,.15), 0 4px 15px rgba(0,0,0,.2)",
                }}
              >
                <XIcon size={16} /> Descartar palabra rival
              </button>
            </>
          )}
          {P && (
            <>
              <button
                onClick={La}
                className="flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full text-white font-bold text-sm transition-all hover:scale-110 hover:-translate-y-0.5 active:scale-95 btn-neon"
                style={{
                  background: "linear-gradient(135deg, #ffd600, #ff6b35)",
                  boxShadow: "0 0 25px rgba(255,214,0,.4), 0 4px 15px rgba(0,0,0,.3)",
                }}
              >
                <CheckIcon size={16} /> Confirmar descarte
              </button>
              <button
                onClick={Ca}
                className="flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full text-white font-bold text-sm transition-all hover:scale-110 hover:-translate-y-0.5 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, rgba(255,68,68,.15), rgba(255,68,68,.05))",
                  border: "1px solid rgba(255,68,68,.4)",
                  boxShadow: "0 0 20px rgba(255,68,68,.1), 0 4px 15px rgba(0,0,0,.2)",
                }}
              >
                <XIcon size={16} /> Cancelar
              </button>
            </>
          )}
        </div>
        {P && (
          <div className="text-center mb-3">
            <p
              className="text-sm font-bold"
              style={{
                color: "#ffd600",
                textShadow: "0 0 10px rgba(255,214,0,.3)",
              }}
            >
              {B
                ? `Palabra seleccionada: ${B.word} (+${B.score} pts)`
                : "Toca una palabra del rival en el tablero para descartarla"}
            </p>
          </div>
        )}
        <div className="flex justify-center gap-2 md:gap-3 flex-wrap mb-3 md:mb-4">
          {Object.entries(ra).map(([a, l]) => (
            <div
              key={a}
              className="flex items-center gap-1.5 px-2 md:px-3 py-1 md:py-1.5 rounded-lg text-[10px] font-bold"
              style={{
                background: l.bg,
                border: `1px solid ${l.border}`,
                color: l.text,
                boxShadow: l.glow,
              }}
            >
              <div
                className="w-3 h-3 rounded-sm"
                style={{
                  background: l.bg,
                  border: `1px solid ${l.border}`,
                }}
              />
              {a === "DL"
                ? "Doble Letra"
                : a === "TL"
                  ? "Triple Letra"
                  : a === "DW"
                    ? "Doble Palabra"
                    : "Triple Palabra"}
            </div>
          ))}
        </div>
        {He && (
          <div className="fixed inset-0 pointer-events-none z-[60] flex items-center justify-center">
            <div
              className="text-5xl md:text-6xl font-black animate-celebration-pop"
              style={{
                background: `linear-gradient(135deg,${s[oe ?? x].main},${(oe ?? x) === 1 ? "#39ff14" : "#ff00aa"})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: `drop-shadow(0 0 40px ${s[oe ?? x].glow})`,
              }}
            >
              ¡{we}!
            </div>
          </div>
        )}
        {xa.map((a) => (
          <div
            key={a.id}
            className="fixed pointer-events-none z-[55]"
            style={{
              left: `${a.x}%`,
              top: "-10px",
              width: a.size,
              height: a.size,
              background: a.color,
              borderRadius: a.shape === "circle" ? "50%" : a.shape === "triangle" ? "0" : "2px",
              clipPath: a.shape === "triangle" ? "polygon(50% 0%, 0% 100%, 100% 100%)" : "none",
              animation: `confettiFall ${a.duration}s linear ${a.delay}s forwards`,
              transform: `rotate(${a.rotation}deg)`,
              opacity: 0.9,
              boxShadow: `0 0 10px ${a.color}, 0 0 20px ${a.color}`,
            }}
          />
        ))}
        {Ce.map((a) => (
          <div
            key={a.id}
            className="fixed rounded-full pointer-events-none z-[9999]"
            style={{
              left: a.x,
              top: a.y,
              width: a.size,
              height: a.size,
              background: a.color,
              boxShadow: `0 0 10px ${a.color}, 0 0 20px ${a.color}, 0 0 30px ${a.color}`,
              opacity: a.life,
            }}
          />
        ))}
        {De.map((a) => (
          <div
            key={a.id}
            className="fixed pointer-events-none font-black text-xl md:text-2xl z-[9999]"
            style={{
              left: a.x,
              top: a.y,
              color: a.color,
              opacity: a.life,
              textShadow: `0 0 20px ${a.color}, 0 0 40px ${a.color}, 0 0 60px ${a.color}`,
              transform: "translateX(-50%)",
              animation: "floatUp 1.5s ease-out forwards",
            }}
          >
            {a.text}
          </div>
        ))}
        {Z && (
          <div
            className="fixed inset-0 z-[70] flex items-center justify-center"
            style={{
              background: "rgba(3,4,17,.85)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div
              className="p-5 md:p-6 rounded-2xl max-w-sm mx-4 animate-modal-in glass-card"
              style={{
                background: "linear-gradient(180deg,rgba(14,22,64,.9),rgba(5,8,27,.8))",
                border: "1px solid rgba(255,255,255,.2)",
                boxShadow: "0 0 60px rgba(0,0,0,.5)",
                transform: "rotateX(3deg)",
                transformStyle: "preserve-3d",
                perspective: "800px",
              }}
            >
              <h3
                className="text-xl font-black mb-3 text-center"
                style={{
                  color: "#ffd600",
                }}
              >
                Revisar palabras
              </h3>
              <p className="text-xs text-white/50 text-center mb-4">
                Jugador {y} ha jugado. Jugador {y === 1 ? 2 : 1}, invalidas alguna palabra?
              </p>
              <div className="space-y-2 mb-4">
                {fa.map((a, key) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-3 rounded-xl"
                    style={{
                      background: "rgba(255,255,255,.06)",
                      border: "1px solid rgba(255,255,255,.1)",
                    }}
                  >
                    <div>
                      <p className="text-sm font-bold text-white">{a.word}</p>
                      <p className="text-xs text-white/40">+{a.score} pts</p>
                    </div>
                    <button
                      onClick={() => Na(a)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-110 active:scale-95"
                      style={{
                        background: "linear-gradient(135deg, rgba(255,42,109,.3), rgba(255,107,53,.2))",
                        border: "1px solid rgba(255,42,109,.5)",
                        color: "#ff6b6b",
                        boxShadow: "0 0 15px rgba(255,42,109,.2)",
                      }}
                    >
                      <XIcon size={12} /> Invalidar
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={Ra}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-white font-bold text-sm transition-all hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, rgba(57,255,20,.3), rgba(0,240,255,.2))",
                  border: "1px solid rgba(57,255,20,.5)",
                  boxShadow: "0 0 20px rgba(57,255,20,.2)",
                }}
              >
                <CheckIcon size={16} /> Confirmar todas
              </button>
            </div>
          </div>
        )}
        {te === "gameover" && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{
              background: "rgba(3,4,17,.92)",
              backdropFilter: "blur(24px)",
            }}
          >
            <div
              className="text-center p-6 md:p-8 rounded-3xl max-w-sm mx-4 relative overflow-hidden animate-modal-in glass-card"
              style={{
                background: "linear-gradient(180deg,rgba(14,22,64,.85),rgba(5,8,27,.7))",
                border: `1px solid ${u > O ? s[1].border : O > u ? s[2].border : "rgba(255,214,0,.3)"}`,
                boxShadow: `0 0 70px ${u > O ? s[1].glow : O > u ? s[2].glow : "rgba(255,214,0,.2)"}`,
                transformStyle: "preserve-3d",
                perspective: "800px",
              }}
            >
              <div
                className="absolute -inset-[2px] rounded-[26px] -z-10 opacity-70 animate-pulse-slow"
                style={{
                  background:
                    u > O
                      ? `linear-gradient(135deg,${s[1].main},#00d4a0)`
                      : O > u
                        ? `linear-gradient(135deg,${s[2].main},#ff00aa)`
                        : "linear-gradient(135deg,#ffd600,#ff6b35)",
                  filter: "blur(30px)",
                }}
              />
              {Array.from({
                length: 30,
              }).map((a, l) => (
                <div
                  key={l}
                  className="absolute w-2 h-2 rounded-full pointer-events-none"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    background: [s[1].main, s[2].main, "#ffd600", "#39ff14", "#b829dd", "#ff00dc", "#00f0ff"][
                      l % 7
                    ],
                    animation: `confettiFall ${2 + Math.random() * 3}s ease-in infinite`,
                    animationDelay: `${Math.random() * 2}s`,
                    opacity: 0.8,
                    boxShadow: `0 0 8px ${[s[1].main, s[2].main, "#ffd600", "#39ff14", "#b829dd", "#ff00dc", "#00f0ff"][l % 7]}`,
                  }}
                />
              ))}
              <TrophyIcon
                size={56}
                style={{
                  color: u > O ? s[1].main : O > u ? s[2].main : "#ffd600",
                  margin: "0 auto 16px",
                  filter: `drop-shadow(0 0 20px ${u > O ? s[1].glow : O > u ? s[2].glow : "rgba(255,214,0,.5)"})`,
                }}
              />
              <h2
                className="text-3xl md:text-4xl font-black mb-2"
                style={{
                  background:
                    u > O
                      ? `linear-gradient(135deg,${s[1].main},#00d4a0)`
                      : O > u
                        ? `linear-gradient(135deg,${s[2].main},#ff00aa)`
                        : "linear-gradient(135deg,#ffd600,#ff6b35)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 20px rgba(255,255,255,.1))",
                }}
              >
                {u > O ? "¡Jugador 1 Gana!" : O > u ? "¡Jugador 2 Gana!" : "¡Empate!"}
              </h2>
              <p className="text-white/50 text-sm mb-6">
                {u > O ? "蓝色玩家获胜！" : O > u ? "红色玩家获胜！" : "平局！"}
              </p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div
                  className="p-3 rounded-xl glass-card"
                  style={{
                    background: s[1].bg,
                    border: `1px solid ${s[1].border}`,
                    boxShadow: `0 0 15px ${s[1].glow}`,
                    transform: "rotateX(5deg)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <UserIcon
                    size={16}
                    style={{
                      color: s[1].main,
                      margin: "0 auto 4px",
                    }}
                  />
                  <p
                    className="text-xs"
                    style={{
                      color: "rgba(207,216,255,.5)",
                    }}
                  >
                    Jugador 1
                  </p>
                  <p
                    className="text-lg font-black score-3d"
                    style={{
                      color: s[1].main,
                    }}
                  >
                    {u}
                  </p>
                </div>
                <div
                  className="p-3 rounded-xl glass-card"
                  style={{
                    background: s[2].bg,
                    border: `1px solid ${s[2].border}`,
                    boxShadow: `0 0 15px ${s[2].glow}`,
                    transform: "rotateX(5deg)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <UserIcon
                    size={16}
                    style={{
                      color: s[2].main,
                      margin: "0 auto 4px",
                    }}
                  />
                  <p
                    className="text-xs"
                    style={{
                      color: "rgba(207,216,255,.5)",
                    }}
                  >
                    Jugador 2
                  </p>
                  <p
                    className="text-lg font-black score-3d"
                    style={{
                      color: s[2].main,
                    }}
                  >
                    {O}
                  </p>
                </div>
                <div
                  className="p-3 rounded-xl glass-card"
                  style={{
                    background: "rgba(0,240,255,.1)",
                    border: "1px solid rgba(0,240,255,.2)",
                    boxShadow: "0 0 10px rgba(0,240,255,.1)",
                    transform: "rotateX(5deg)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <HashIcon
                    size={16}
                    style={{
                      color: "#00f0ff",
                      margin: "0 auto 4px",
                    }}
                  />
                  <p
                    className="text-xs"
                    style={{
                      color: "rgba(207,216,255,.5)",
                    }}
                  >
                    Palabras J1
                  </p>
                  <p
                    className="text-lg font-black score-3d"
                    style={{
                      color: "#00f0ff",
                    }}
                  >
                    {Ye}
                  </p>
                </div>
                <div
                  className="p-3 rounded-xl glass-card"
                  style={{
                    background: "rgba(255,42,109,.1)",
                    border: "1px solid rgba(255,42,109,.2)",
                    boxShadow: "0 0 10px rgba(255,42,109,.1)",
                    transform: "rotateX(5deg)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <HashIcon
                    size={16}
                    style={{
                      color: "#ff2a6d",
                      margin: "0 auto 4px",
                    }}
                  />
                  <p
                    className="text-xs"
                    style={{
                      color: "rgba(207,216,255,.5)",
                    }}
                  >
                    Palabras J2
                  </p>
                  <p
                    className="text-lg font-black score-3d"
                    style={{
                      color: "#ff2a6d",
                    }}
                  >
                    {Je}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 justify-center flex-wrap">
                <button
                  onClick={() => Qe()}
                  className="px-6 md:px-8 py-3 rounded-full text-white font-black transition-all hover:scale-110 hover:-translate-y-0.5 active:scale-95"
                  style={{
                    background: `linear-gradient(135deg,${s[1].main},${s[2].main})`,
                    boxShadow: `0 0 30px ${s[1].glow}, 0 4px 20px rgba(0,0,0,.3)`,
                  }}
                >
                  Jugar de nuevo / 再玩一次
                </button>
                <button
                  onClick={() => {
                    playClick();
                    setTe("select");
                  }}
                  className="px-4 py-3 rounded-full text-xs font-bold transition-all hover:scale-105 active:scale-95"
                  style={{
                    background: "rgba(255,255,255,.08)",
                    border: "1px solid rgba(255,255,255,.15)",
                    color: "#fff",
                    boxShadow: "0 0 10px rgba(255,255,255,.05)",
                  }}
                >
                  Cambiar / 切换
                </button>
                <P_1 currentGameId="apalabrados" />
              </div>
            </div>
          </div>
        )}
      </div>
      <Sa1Component expression={expression} />
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes tilePlacePop { 0%{transform:scale(0.6) translateZ(-30px);opacity:0} 60%{transform:scale(1.2) translateZ(15px);opacity:1} 100%{transform:scale(1) translateZ(0);opacity:1} }
        @keyframes tileGlowPulse { 0%{box-shadow:0 0 0px transparent} 50%{box-shadow:0 0 30px rgba(255,255,255,0.8)} 100%{box-shadow:0 0 0px transparent} }
        @keyframes premiumPulse { 0%,100%{box-shadow:0 0 8px var(--glow-color), inset 0 0 8px var(--glow-color); transform:scale(1)} 50%{box-shadow:0 0 20px var(--glow-color), inset 0 0 12px var(--glow-color); transform:scale(1.05)} }
        @keyframes boardAmbient { 0%,100%{box-shadow:0 0 60px var(--board-glow), 0 25px 70px rgba(0,0,0,.6), inset 0 0 30px rgba(255,255,255,.05), 0 0 120px var(--board-glow-dim)} 50%{box-shadow:0 0 90px var(--board-glow), 0 25px 70px rgba(0,0,0,.6), inset 0 0 30px rgba(255,255,255,.08), 0 0 160px var(--board-glow-dim)} }
        @keyframes tileFloat { 0%,100%{transform:translateY(0) translateZ(5px)} 50%{transform:translateY(-3px) translateZ(8px)} }
        @keyframes rackGlow { 0%,100%{box-shadow:0 0 40px var(--rack-glow), 0 8px 24px rgba(0,0,0,.3), inset 0 0 30px rgba(255,255,255,.03)} 50%{box-shadow:0 0 60px var(--rack-glow), 0 8px 24px rgba(0,0,0,.3), inset 0 0 30px rgba(255,255,255,.05)} }
        @keyframes shuffleSpin { 0%{transform:rotateY(0deg)} 100%{transform:rotateY(360deg)} }
        @keyframes neonFlicker { 0%,19%,21%,23%,25%,54%,56%,100%{opacity:1} 20%,24%,55%{opacity:0.6} }
        @keyframes glassShine { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes winTrophy { 0%{transform:scale(0) rotateY(180deg)} 50%{transform:scale(1.2) rotateY(0deg)} 100%{transform:scale(1) rotateY(0deg)} }
        @keyframes scorePulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }
        @keyframes confettiFall { 0%{transform:translateY(-20px) rotate(0deg);opacity:1} 100%{transform:translateY(110vh) rotate(720deg);opacity:0} }
        @keyframes floatUp { 0%{transform:translateX(-50%) translateY(0);opacity:1} 100%{transform:translateX(-50%) translateY(-60px);opacity:0} }
        @keyframes celebrationPop { 0%{transform:scale(0.5) rotateX(90deg);opacity:0} 50%{transform:scale(1.3) rotateX(0deg);opacity:1} 70%{transform:scale(1) rotateX(0deg);opacity:1} 100%{transform:scale(1) rotateX(0deg);opacity:0} }
        @keyframes mascotFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes mascotBounce { 0%,100%{transform:translateY(0) scale(1)} 25%{transform:translateY(-12px) scale(1.05)} 50%{transform:translateY(0) scale(1)} 75%{transform:translateY(-6px) scale(1.03)} }
        @keyframes mascotWiggle { 0%,100%{transform:rotate(0deg)} 25%{transform:rotate(-8deg)} 75%{transform:rotate(8deg)} }
        @keyframes mascotSigh { 0%,100%{transform:translateY(0)} 50%{transform:translateY(4px)} }
        @keyframes mascotThink { 0%,100%{transform:translateY(0) rotate(0deg)} 25%{transform:translateY(-4px) rotate(-3deg)} 75%{transform:translateY(-4px) rotate(3deg)} }
        @keyframes pulseSoft { 0%,100%{opacity:1} 50%{opacity:.7} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }
        @keyframes modalIn { 0%{transform:scale(.8) translateY(20px);opacity:0} 100%{transform:scale(1) translateY(0);opacity:1} }
        @keyframes glow { 0%,100%{filter:drop-shadow(0 0 25px rgba(255,214,0,.4))} 50%{filter:drop-shadow(0 0 40px rgba(255,214,0,.7))} }
        @keyframes shake { 0%,100%{transform:translateX(0)} 10%,30%,50%,70%,90%{transform:translateX(-4px)} 20%,40%,60%,80%{transform:translateX(4px)} }
        @keyframes flashPulse { 0%{opacity:0} 50%{opacity:1} 100%{opacity:0} }
        @keyframes pulseSlow { 0%,100%{opacity:.7} 50%{opacity:1} }
        @keyframes tileSelectFloat { 0%,100%{transform:translateY(-8px) scale(1.12) rotateX(-5deg) translateZ(20px)} 50%{transform:translateY(-12px) scale(1.15) rotateX(-5deg) translateZ(30px)} }
        @keyframes woodGrain { 0%{background-position:0 0} 100%{background-position:100% 100%} }
        .animate-celebration-pop { animation: celebrationPop 1.5s ease-out forwards; }
        .animate-pulse-soft { animation: pulseSoft 2s ease-in-out infinite; }
        .animate-blink { animation: blink 1.5s ease-in-out infinite; }
        .animate-modal-in { animation: modalIn 0.4s ease-out forwards; }
        .animate-glow { animation: glow 2s ease-in-out infinite; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .animate-pulse-slow { animation: pulseSlow 3s ease-in-out infinite; }
        .perspective-1200 { perspective: 1200px; }
        .board-3d { transform-style: preserve-3d; backface-visibility: hidden; animation: boardAmbient 4s ease-in-out infinite; }
        .cell-glow:hover { z-index: 2; transform: scale(1.1) translateZ(10px); }
        .rack-tile:hover { z-index: 2; }
        .btn-neon:hover { box-shadow: 0 0 40px rgba(0,240,255,.5), 0 4px 20px rgba(0,0,0,.3) !important; }
        .tile-3d-new { animation: tilePlacePop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), tileFloat 3s ease-in-out infinite 0.5s; }
        .tile-wood { background: linear-gradient(135deg, #f0e6d2, #c9a96e, #d4b896, #b8956a); background-size: 200% 200%; }
        .tile-3d-placed { transform-style: preserve-3d; box-shadow: 0 3px 8px rgba(0,0,0,.5), inset 0 1px 4px rgba(255,255,255,.5); }
        .premium-square { animation: premiumPulse 2.5s ease-in-out infinite; }
        .glass-card { background: linear-gradient(135deg, rgba(255,255,255,.08), rgba(255,255,255,.02)); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,.15); position: relative; overflow: hidden; }
        .glass-card::before { content:''; position: absolute; top: 0; left: -100%; width: 200%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,.1), transparent); animation: glassShine 3s ease-in-out infinite; pointer-events: none; }
        .score-3d { transform-style: preserve-3d; transform: rotateX(5deg); text-shadow: 0 1px 0 rgba(255,255,255,.2), 0 2px 0 rgba(255,255,255,.15), 0 3px 0 rgba(255,255,255,.1); }
        .trophy-anim { animation: winTrophy 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
    `,
        }}
      />
    </StarfieldBackground>
  );
}
export { StComponent as default };
