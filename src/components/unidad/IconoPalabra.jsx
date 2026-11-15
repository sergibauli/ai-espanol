// v30 · Iconos dibujados a tinta para las fichas de vocabulario de la Guía (SVG propios, nada de emojis).
// Se elige el dibujo por la traducción china (más fiable) o por la palabra española; si no hay tema, sello rojo
// con el primer carácter chino (o la inicial española).
import * as React from "react";

// Trazos 24×24: "d" = línea de tinta; "f" = relleno de acento (laca u oro)
const D = {
  perro: { d: "M7 9c-2-1-3.5 1-3 4l1.5 2.5M17 9c2-1 3.5 1 3 4l-1.5 2.5M7 9c1-2.5 9-2.5 10 0 1 3 .5 7-1.5 9-2 1.6-5 1.6-7 0C6.5 16 6 12 7 9Z", f: "M10.6 15.4h2.8l-1.4 1.6Z", o: [[10, 12], [14, 12]] },
  gato: { d: "M5 20c-.6-4 .2-8 1-10L5.5 4l4.3 3c1.4-.4 3-.4 4.4 0L18.5 4 18 10c.8 2 1.6 6 1 10ZM3 15l5 .5M3 18l5-.8M21 15l-5 .5M21 18l-5-.8", f: "M11 15h2l-1 1.2Z", o: [[9.5, 12.5], [14.5, 12.5]] },
  pajaro: { d: "M4 13c2-5 9-6 12-2l4-1-3 3c0 4-4 7-9 6-2.5-.5-4-3-4-6Zm4-1c2 0 4 2 4 4M9 19l-1 3M12 19l.5 3", f: "M16 10.6l4-.6-3 2.4Z", o: [[13.5, 10]] },
  pez: { d: "M3 12c3-5 10-6 14 0-4 6-11 5-14 0Zm14 0 4-4v8ZM8 9.5c1 1.5 1 3.5 0 5", f: "M17 12l4-4v8Z", o: [[14, 11]] },
  conejo: { d: "M8 11C6 7 6 3 8 3s2.5 4 2.5 7M16 11c2-4 2-8 0-8s-2.5 4-2.5 7M6 15c0-3 2.7-5 6-5s6 2 6 5-2.7 6-6 6-6-3-6-6Z", f: "M11 16h2l-1 1.2Z", o: [[9.8, 14.5], [14.2, 14.5]] },
  huella: { d: "M12 13c-3 0-5.5 3-5.5 5 0 1.6 1.4 2.4 3 2 1-.3 1.8-.6 2.5-.6s1.5.3 2.5.6c1.6.4 3-.4 3-2 0-2-2.5-5-5.5-5Z", f: "M6 9.5a1.6 2 0 1 0 0 .1ZM10 6a1.6 2.1 0 1 0 0 .1ZM14 6a1.6 2.1 0 1 0 0 .1ZM18 9.5a1.6 2 0 1 0 0 .1Z" },
  fruta: { d: "M12 7c-3-2-8-1-8 5 0 5 3.5 9 6 9 1 0 1.3-.5 2-.5s1 .5 2 .5c2.5 0 6-4 6-9 0-6-5-7-8-5Zm0 0c0-2 .5-3.5 2-4.5", f: "M12.5 5.5c1-2 3-2.6 5-2-1 2-3 2.6-5 2Z" },
  bebida: { d: "M5 9h11v6a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5ZM16 11h1.5a2.5 2.5 0 0 1 0 5H16M8 3c-1 1.5 1 2 0 4M12 3c-1 1.5 1 2 0 4", f: "M6 12h9v2.5a4 4 0 0 1-4 4h-1a4 4 0 0 1-4-4Z" },
  comida: { d: "M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm0-3.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM2.5 4v5c0 1 .7 1.5 1.5 1.5V20M5.5 4v5M21 4c-1.5 1-2 3-2 6h2v10", f: "M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" },
  cocina: { d: "M4 10h16v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5ZM2 10h2M20 10h2M9 6.5c-.8-1 .8-2 0-3M12 6.5c-.8-1 .8-2 0-3M15 6.5c-.8-1 .8-2 0-3", f: "M5 12h14v2H5Z" },
  familia: { d: "M7 9.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm10 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM3 20v-4a4 4 0 0 1 8 0M13 20v-4a4 4 0 0 1 8 0M12 15.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM9.5 21a2.5 2.5 0 0 1 5 0", f: "M12 15.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" },
  persona: { d: "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21c0-4.4 3.6-7 8-7s8 2.6 8 7", f: "M9 21c0-2.5 1.3-4 3-4s3 1.5 3 4Z" },
  cuerpo: { d: "M8 13V5.5a1.5 1.5 0 0 1 3 0V11M11 10V4a1.5 1.5 0 0 1 3 0v6M14 10V5.5a1.5 1.5 0 0 1 3 0V13M8 12.5 6.6 11a1.6 1.6 0 0 0-2.4 2.2L8 18c1.5 2 3 3 5 3h1a5 5 0 0 0 4-2c.8-1.1 1-2.4 1-4v-4a1.5 1.5 0 0 0-3 0", f: "" },
  salud: { d: "M12 21s-8-4.5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6.5-8 11-8 11Z", f: "M10.8 8.5h2.4v2.3h2.3v2.4h-2.3v2.3h-2.4v-2.3H8.5v-2.4h2.3Z" },
  casa: { d: "M3 11 12 4l9 7M5 9.5V20h14V9.5M10 20v-5h4v5", f: "M2 11.5 12 3.6l10 7.9-1.3 1.5L12 6.2 3.3 13Z" },
  mueble: { d: "M7 3h10v8H7ZM5 11h14v3H5ZM6.5 14v7M17.5 14v7M7 18h10", f: "M5 11h14v3H5Z" },
  ropa: { d: "M9 3 4 6l2 4 2-1v12h8V9l2 1 2-4-5-3c-.5 1.5-1.7 2.5-3 2.5S9.5 4.5 9 3Z", f: "M11.3 9h1.4v1.4h-1.4ZM11.3 13h1.4v1.4h-1.4Z" },
  coche: { d: "M3 16v-3l2-5c.4-1 1.2-1.5 2.2-1.5h9.6c1 0 1.8.5 2.2 1.5l2 5v3ZM3 16v2.5h3V16M18 16v2.5h3V16M5.5 12h13", f: "M7 14.3a1.3 1.3 0 1 0 0-.1ZM17 14.3a1.3 1.3 0 1 0 0-.1Z" },
  avion: { d: "M10.5 21 12 18l1.5 3M12 18V4.5c0-1 .4-1.5 1-1.5s1 .5 1 1.5V9l7 4v2l-7-2v4l2 2v1M12 9 3 13v2l7-2", f: "M14 9l7 4v2l-7-2Z" },
  tren: { d: "M6 4h12a1 1 0 0 1 1 1v10a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V5a1 1 0 0 1 1-1ZM5 11h14M8 18l-2 3M16 18l2 3M9 7h6", f: "M8.3 14.6a1 1 0 1 0 0-.1ZM15.7 14.6a1 1 0 1 0 0-.1Z" },
  viaje: { d: "M5 7h14a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Zm4 0V4.5A1.5 1.5 0 0 1 10.5 3h3A1.5 1.5 0 0 1 15 4.5V7M8 7v13M16 7v13", f: "M4 12h16v2H4Z" },
  sol: { d: "M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4", f: "M12 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z" },
  lluvia: { d: "M7 15a4 4 0 0 1-.5-8 5.5 5.5 0 0 1 10.6 1.5A3.3 3.3 0 0 1 17 15ZM8 18l-1 2.5M12 18l-1 2.5M16 18l-1 2.5", f: "" },
  nieve: { d: "M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9M10 4.5 12 6l2-1.5M10 19.5l2-1.5 2 1.5M4.5 10.2l2.6-.3 1-2.3M19.5 13.8l-2.6.3-1 2.3M4.5 13.8l2.6.3 1 2.3M19.5 10.2l-2.6-.3-1-2.3", f: "" },
  reloj: { d: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7v5l3.5 2", f: "M12 13.2a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Z" },
  calendario: { d: "M4 6h16v14H4ZM4 10h16M8 3.5V7M16 3.5V7", f: "M4 6h16v4H4ZM11 13h2.5v2.5H11Z" },
  luna: { d: "M15 3.5A8.5 8.5 0 1 0 20.5 15 7 7 0 0 1 15 3.5Z", f: "M18 5.5l.5 1.2 1.2.5-1.2.5-.5 1.2-.5-1.2-1.2-.5 1.2-.5Z" },
  moneda: { d: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM9.5 9.5h5v5h-5Z", f: "M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm-2.5-9.5v5h5v-5Z" },
  compras: { d: "M5 8h14l-1 13H6ZM9 8V6.5a3 3 0 0 1 6 0V8", f: "M8 11.5a1 1 0 1 0 0-.1ZM16 11.5a1 1 0 1 0 0-.1Z" },
  libro: { d: "M12 6.5C10 5 7 4.5 3.5 5v13.5c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5Zm0 0V20", f: "M14 9.5c1.5-.7 3-.9 4.5-.8v1.4c-1.5-.1-3 .1-4.5.8Z" },
  trabajo: { d: "M4 8h16v11H4ZM9 8V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V8M4 13h16", f: "M10.5 12h3v2.5h-3Z" },
  ciudad: { d: "M3 21h18M5 21V9l5-2v14M10 21V4l6 2.5V21M16 21V11l3 1v9", f: "M12 9h2v1.5h-2ZM12 13h2v1.5h-2ZM6.8 12h1.5v1.5H6.8Z" },
  lugar: { d: "M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z", f: "M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" },
  arbol: { d: "M12 21v-6M12 15c-4 0-7-2-7-5 0-2 1.5-3.5 3-4 .5-2 2-3 4-3s3.5 1 4 3c1.5.5 3 2 3 4 0 3-3 5-7 5ZM9 21h6", f: "M12 13c-2.5 0-4.5-1.3-4.5-3.2 0-1.2 1-2.2 2-2.5.3-1.3 1.3-2 2.5-2s2.2.7 2.5 2c1 .3 2 1.3 2 2.5C16.5 11.7 14.5 13 12 13Z" },
  deporte: { d: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7.5l4 3-1.5 4.5h-5L8 10.5ZM12 3v4.5M16 10.5l4.5-1.5M14.5 15l2.5 4M9.5 15 7 19M8 10.5 3.5 9", f: "M12 7.5l4 3-1.5 4.5h-5L8 10.5Z" },
  musica: { d: "M9 18V5l11-2v13M9 9l11-2", f: "M6.5 20.5a2.5 2 0 1 0 0-4 2.5 2 0 0 0 0 4ZM17.5 18.5a2.5 2 0 1 0 0-4 2.5 2 0 0 0 0 4Z" },
  telefono: { d: "M7.5 2.5h9a1 1 0 0 1 1 1v17a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1v-17a1 1 0 0 1 1-1ZM10.5 5h3", f: "M12 19.2a1 1 0 1 0 0-.1ZM8 7h8v9.5H8Z" },
  ordenador: { d: "M3.5 4.5h17v11h-17ZM9 20h6M12 15.5V20", f: "M5.5 6.5h13v7h-13Z" },
  corazon: { d: "M12 20.5S3.5 15.5 3.5 9.2A4.7 4.7 0 0 1 12 6.4a4.7 4.7 0 0 1 8.5 2.8c0 6.3-8.5 11.3-8.5 11.3Z", f: "M12 18.3S5.5 14.3 5.5 9.4a2.8 2.8 0 0 1 5-1.7L12 9.4l1.5-1.7a2.8 2.8 0 0 1 5 1.7c0 4.9-6.5 8.9-6.5 8.9Z" },
  color: { d: "M12 3a9 9 0 0 0 0 18c1.2 0 2-.8 2-1.8 0-.5-.2-.9-.5-1.2-.3-.3-.5-.8-.5-1.3 0-1 .8-1.7 1.8-1.7H17a4 4 0 0 0 4-4C21 6.5 17 3 12 3Z", f: "M7.5 11a1.3 1.3 0 1 0 0-.1ZM10 7.3a1.3 1.3 0 1 0 0-.1ZM14.5 7.3a1.3 1.3 0 1 0 0-.1Z" },
  habla: { d: "M4 5h16v10H10l-5 4v-4H4Z", f: "M8 9.2a1 1 0 1 0 0-.1ZM12 9.2a1 1 0 1 0 0-.1ZM16 9.2a1 1 0 1 0 0-.1Z" },
};

// [tema, chino, español] — se prueban en orden: lo concreto antes que lo general
const TEMAS = [
  ["perro", /狗|犬/, /^perr[oa]s?\b|cachorro/],
  ["gato", /猫/, /^gat[oa]s?\b|maullar/],
  ["pajaro", /鸟|鹦鹉|鸭|鸡|鹰|鸽|鹅/, /p[áa]jaro|loro|\baves?\b|paloma|[áa]guila|pato|gallina|volar/],
  ["pez", /鱼|鲨|海豚|鲸|虾/, /^pe(z|ces)\b|pescado|tibur[óo]n|delf[íi]n|ballena|nadar/],
  ["conejo", /兔|鼠/, /conejo|cobaya|h[áa]mster|rat[óo]n/],
  ["huella", /动物|宠物|猴|虎|狮|象|熊|马|牛|羊|猪|龟|蛇|狼|狐|鹿|貂|兽|蜂|蝴蝶|昆虫/, /animal|mascota|veterinari|tortuga|serpiente|caballo|vaca|cerdo|oveja|le[óo]n|tigre|elefante|\bosos?\b|\bmonos?\b|lobo|zorro|hur[óo]n|ladrar/],
  ["fruta", /果|苹|香蕉|橙子|葡萄|梨|桃|莓|瓜|柠檬|蔬菜|番茄|土豆|洋葱|胡萝卜|生菜/, /fruta|manzana|pl[áa]tano|naranja|\buvas?\b|\bpera\b|fresa|\blim[óo]n|verdura|tomate|patata|cebolla|zanahoria|lechuga/],
  ["bebida", /茶|咖啡|牛奶|喝|饮|果汁|啤酒|葡萄酒|水$/, /caf[ée]|\bt[ée]\b|leche|agua|vino|cerveza|zumo|refresco|beber/],
  ["cocina", /厨|锅|做饭|烹|烤|煮|炸/, /cocin|horno|sart[ée]n|freír|hervir|asar/],
  ["comida", /吃|饭|餐|食|肉|面包|汤|蛋|米|菜单|甜点|蛋糕|奶酪|火腿|海鲜|饺子|面条/, /comer|comida|desayun|almuerz|cena|restaurante|plato|men[úu]|\bpan\b|carne|sopa|huevo|arroz|queso|jam[óo]n|paella|tapa/],
  ["familia", /父|母|爸|妈|兄|弟|姐|妹|儿子|女儿|孩子|家人|家庭|爷|奶奶|祖|孙|叔|姨|舅|婚|丈夫|妻子|亲戚|堂|表[兄弟姐妹]/, /padre|madre|pap[áa]|mam[áa]|herman|hij[oa]|familia|abuel|niet|t[íi][oa]s?\b|prim[oa]|espos|marido|mujer\b|boda|casad/],
  ["salud", /病|医|药|疼|痛|感冒|发烧|健康|护士|诊|咳/, /m[ée]dic|enferm|farmacia|dolor|duele|salud|hospital|fiebre|resfriado|pastilla|\btos\b/],
  ["cuerpo", /头|手|脚|眼|耳|嘴|鼻|腿|臂|肩|背|牙|头发|脸|指|身体|膝|胃|喉|脖子/, /cabeza|mano|pie\b|pies|\bojos?\b|oreja|boca|nariz|pierna|brazo|hombro|espalda|diente|\bpelo\b|\bcara\b|dedo|cuerpo|rodilla|est[óo]mago|garganta|cuello/],
  ["ropa", /衣|裤|裙|鞋|帽|袜|外套|衬衫|领带|围巾|手套|穿|戴/, /ropa|camis|pantal[óo]n|falda|zapat|sombrero|gorra|calcet|abrigo|chaqueta|corbata|bufanda|guante|vestido|jersey|llevar puesto/],
  ["mueble", /床|桌|椅|沙发|柜|灯|镜|窗|架|家具/, /\bcamas?\b|\bmesas?\b|silla|sof[áa]|armario|l[áa]mpara|espejo|ventana|estanter|mueble/],
  ["casa", /房|屋|公寓|楼|卧室|客厅|浴室|花园|阳台|住|家$/, /casa|\bpiso\b|apartamento|habitaci[óo]n|dormitorio|\bsal[óo]n|ba[ñn]o|jard[íi]n|terraza|vivir|vivienda|alquil/],
  ["avion", /飞机|机场|航班|起飞/, /avi[óo]n|aeropuerto|vuelo|despegar|aterrizar/],
  ["tren", /火车|地铁|车站|高铁/, /\btren|metro\b|estaci[óo]n|and[ée]n/],
  ["coche", /车|开车|驾|公交|出租|摩托/, /coche|carro|autob[úu]s|taxi|moto|bici|conducir|aparcar|tr[áa]fico/],
  ["viaje", /旅|行李|护照|酒店|宾馆|签证|度假|游客|景点|票/, /viaj|maleta|pasaporte|hotel|visado|vacaciones|turista|billete|reserva/],
  ["nieve", /雪|冷|冬|冰|寒/, /nieve|nevar|fr[íi]o|invierno|hielo/],
  ["lluvia", /雨|云|阴|风|暴|雷|天气|气候/, /lluvia|llover|nube|nublado|viento|tormenta|tiempo que hace|clima/],
  ["sol", /晴|太阳|热|暖|夏|阳光/, /\bsol\b|soleado|calor|verano|caliente/],
  ["luna", /夜|晚上|晚安|睡|梦/, /noche|dormir|sue[ñn]o|luna/],
  ["calendario", /星期|周末|月份|生日|节日|日期|季|春|秋|年|月$|日$/, /lunes|martes|mi[ée]rcoles|jueves|viernes|s[áa]bado|domingo|semana|\bmes\b|enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|cumplea|fiesta|primavera|oto[ñn]o|a[ñn]o\b|fecha/],
  ["reloj", /点钟|小时|分钟|早上|中午|下午|时间|钟|今天|昨天|明天|现在|总是|经常|有时|从不|以前|以后/, /\bhoras?\b|minuto|ma[ñn]ana|tarde|mediod[íi]a|\bhoy\b|ayer|ahora|siempre|nunca|a veces|antes|despu[ée]s|reloj|temprano/],
  ["moneda", /钱|元|欧|价|付|贵|便宜|银行|卡|费|工资|账/, /dinero|euro|precio|pagar|caro|barato|banco|tarjeta|cuesta|cobrar|sueldo|cuenta/],
  ["compras", /买|商店|超市|市场|购|店|卖|打折|收银/, /comprar|tienda|supermercado|mercado|vender|rebaja|\bcaja\b|probador/],
  ["libro", /书|学|课|老师|考|笔|作业|词|读|写|字|教|班|句|语法/, /libro|estudi|clase|profesor|examen|l[áa]piz|bol[íi]grafo|deberes|palabra|leer|escribir|escuela|colegio|universidad|aprender|ense[ñn]ar|gram[áa]tica/],
  ["trabajo", /工作|职|公司|办公|经理|会议|面试|简历|员|工程师|律师|业|老板|同事/, /trabaj|empresa|oficina|jefe|reuni[óo]n|entrevista|curr[íi]culum|empleado|ingeniero|abogado|profesi[óo]n|compa[ñn]ero de trabajo|negocio/],
  ["ciudad", /城|街|路|广场|博物馆|教堂|邮局|图书馆|电影院|剧院|建筑|大楼|市中心/, /ciudad|calle|avenida|plaza|museo|iglesia|correos|biblioteca|cine|teatro|edificio|barrio|centro/],
  ["arbol", /树|花|草|山|河|海|湖|森林|自然|植物|岛|海滩|沙漠|环境|地球/, /[áa]rbol|flor|hierba|monta[ñn]a|r[íi]o|\bmar\b|\blagos?\b|bosque|naturaleza|planta|isla|playa|desierto|medio ambiente|\bcampo/],
  ["deporte", /运动|球|跑|游泳|健身|体育|比赛|踢|滑雪|骑/, /deporte|f[úu]tbol|baloncesto|tenis|correr|nataci[óo]n|gimnasio|partido|esquiar|entrenar/],
  ["musica", /音乐|歌|唱|跳舞|舞|乐器|电影|画|艺术/, /m[úu]sica|canci[óo]n|cantar|bailar|baile|guitarra|piano|pel[íi]cula|pintar|arte/],
  ["telefono", /电话|手机|短信|消息|邮件|信息/, /tel[ée]fono|m[óo]vil|llamar|mensaje|correo electr|email/],
  ["ordenador", /电脑|网|技术|电子|应用|屏幕|程序|数据/, /ordenador|internet|\bred\b|tecnolog|aplicaci[óo]n|pantalla|programa|datos|digital/],
  ["corazon", /爱|喜欢|高兴|快乐|伤心|难过|生气|害怕|担心|感觉|情|心|开心|紧张|无聊|累|惊讶|满意/, /amor|querer|gustar|encantar|feliz|content|triste|enfadad|miedo|preocupad|sentir|nervios|aburrid|cansad|sorprendid/],
  ["color", /色/, /rojo|azul|verde|amarillo|negro|blanco|morado|\brosa\b|gris|marr[óo]n|naranja|color/],
  ["lugar", /哪里|这里|那里|左|右|旁边|附近|远|近|对面|方向|中间|地方/, /d[óo]nde|aqu[íi]|all[íi]|izquierda|derecha|al lado|cerca|lejos|enfrente|delante|detr[áa]s|\bentre\b|lugar/],
  ["habla", /说|讲|问|回答|告诉|聊|谈|你好|再见|谢谢|请|对不起|早上好|欢迎|认为|同意/, /hablar|decir|preguntar|responder|contestar|contar|hola|adi[óo]s|gracias|por favor|perd[óo]n|buenos d[íi]as|bienvenid|opinar|creer|de acuerdo/],
];

export function temaDe(espanol = "", chino = "") {
  const es = String(espanol).toLowerCase();
  const zh = String(chino);
  for (const [tema, rz, re] of TEMAS) if ((zh && rz.test(zh)) || re.test(es)) return tema;
  return null;
}

const HAN = /\p{Script=Han}/u;

export function IconoPalabra({ espanol, chino, size = 46 }) {
  const tema = temaDe(espanol, chino);
  const dib = tema && D[tema];
  if (!dib) {
    const letra = [...String(chino || "")].find((c) => HAN.test(c)) || String(espanol || "?").replace(/^[^A-Za-zÁÉÍÓÚÑáéíóúñ]+/, "").charAt(0).toUpperCase() || "?";
    return (
      <span className="gx-ico gx-ico--sello" style={{ "--s": `${size}px` }} translate="no" aria-hidden="true">
        <span>{letra}</span>
      </span>
    );
  }
  return (
    <span className={`gx-ico gx-ico--${tema}`} style={{ "--s": `${size}px` }} aria-hidden="true">
      <svg viewBox="0 0 24 24" width={size * 0.62} height={size * 0.62} fill="none">
        {dib.f && <path d={dib.f} className="gx-ico-f" />}
        <path d={dib.d} className="gx-ico-d" />
        {dib.o?.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1" className="gx-ico-o" />
        ))}
      </svg>
    </span>
  );
}
