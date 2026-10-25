import { MenuLacado } from "@ai-espanol/imperial";

const items = [
  { id: "ruta", icono: "ruta", label: "Aprender", labelZh: "学习" },
  { id: "unidades", icono: "unidades", label: "Unidades", labelZh: "单元" },
  { id: "dele", icono: "dele", label: "DELE", labelZh: "考试" },
  { id: "progreso", icono: "progreso", label: "Mi DELE", labelZh: "我的DELE" },
  { id: "juegos", icono: "juegos", label: "Juegos", labelZh: "游戏" },
  { id: "diccionario", icono: "diccionario", label: "Diccionario", labelZh: "词典" },
  { id: "pronunciacion", icono: "pronunciacion", label: "Pronunciación", labelZh: "发音" },
  { id: "repaso", icono: "repaso", label: "Repaso", labelZh: "复习" },
  { id: "tutor", icono: "tutor", label: "Tutor IA", labelZh: "AI老师" },
] as const;

export const Lateral = () => (
  <div style={{ height: 640, display: "flex" }}>
    <MenuLacado items={items as any} activo="unidades" pie="Racha: 5 días 🔥" />
  </div>
);
