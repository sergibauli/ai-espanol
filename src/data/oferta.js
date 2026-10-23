// Oferta comercial de clases. Precios de ejemplo: cámbialos aquí y se actualizan en toda la web.
export const MONEDA = "¥";

export const PACKS = [
  {
    key: "prueba",
    nombre: "Clase de prueba",
    nombreZh: "试听课",
    precio: 0,
    detalle: "25 min · prueba de nivel + plan de estudio",
    detalleZh: "25分钟 · 水平测试 + 学习计划",
    incluye: ["Prueba de nivel MCER", "Plan personalizado", "Sin compromiso"],
  },
  {
    key: "pack5",
    nombre: "Pack 5 clases",
    nombreZh: "5节课套餐",
    precio: 990,
    detalle: "5 × 50 min · validez 2 meses",
    detalleZh: "5 × 50分钟 · 2个月有效",
    incluye: ["Profesor nativo o chino", "Deberes corregidos", "Acceso completo a la app"],
  },
  {
    key: "pack10",
    nombre: "Pack 10 clases",
    nombreZh: "10节课套餐",
    precio: 1790,
    destacado: true,
    detalle: "10 × 50 min · validez 4 meses",
    detalleZh: "10 × 50分钟 · 4个月有效",
    incluye: ["Combina nativo + chino", "Deberes semanales corregidos", "Exámenes automáticos", "Informe de progreso"],
  },
  {
    key: "dele",
    nombre: "Intensivo DELE",
    nombreZh: "DELE 强化班",
    precio: 3290,
    detalle: "20 × 50 min · 2 profesores",
    detalleZh: "20 × 50分钟 · 双师教学",
    incluye: ["Simulacros DELE corregidos", "Expresión oral con nativo", "Gramática en chino"],
  },
];

export const PASOS = [
  { es: "Reserva tu clase de prueba gratis", zh: "免费预约试听课", icon: "🎯" },
  { es: "Te asignamos profesor nativo, chino o ambos", zh: "为你匹配外教、中文老师或双师", icon: "🤝" },
  { es: "Entra a clase con Tencent Meeting desde tu campus", zh: "在课堂页面一键进入腾讯会议", icon: "🎥" },
  { es: "Deberes semanales y exámenes con nota", zh: "每周作业与自动评分考试", icon: "📈" },
];

export const FAQ = [
  { q: "¿Qué plataforma usáis para las clases?", qZh: "用什么平台上课？", a: "Tencent Meeting (腾讯会议), que funciona perfectamente en China sin VPN. El enlace aparece en tu campus 15 minutos antes de la clase.", aZh: "腾讯会议，国内无需VPN。上课前15分钟可以在课堂页面看到入口。" },
  { q: "¿Profesor nativo o profesor chino?", qZh: "选外教还是中文老师？", a: "El profesor chino explica la gramática en tu idioma y es ideal en A1–A2. El nativo te da fluidez, pronunciación y cultura. El combo de los dos es lo más eficaz para el DELE.", aZh: "中文老师用中文讲语法，适合A1–A2；外教提升口语、发音和文化。双师组合备考DELE最有效。" },
  { q: "¿En qué horario?", qZh: "上课时间？", a: "Horario de Pekín (UTC+8) de 8:00 a 23:00, también fines de semana.", aZh: "北京时间8:00–23:00，周末也可以。" },
  { q: "¿Cómo pago?", qZh: "怎么付款？", a: "WeChat Pay, Alipay o tarjeta. Te enviamos el enlace de pago tras la clase de prueba.", aZh: "微信支付、支付宝或银行卡。试听课后发送付款链接。" },
];
