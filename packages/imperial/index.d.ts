import * as React from "react";

/** Niveles MCER/DELE. */
export type Nivel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
/** Poses del Rey Mono. */
export type PoseMono = "saluda" | "guino" | "serio" | "poder" | "feliz" | "trofeo";
/** Nombres de los iconos propios del menú. */
export type NombreIcono = "ruta" | "unidades" | "dele" | "juegos" | "diccionario" | "pronunciacion" | "tutor" | "progreso" | "repaso";

export interface EscenaProps {
  /** noche = azul con destellos dorados (fondo de la app); papel = pergamino; laca = rojo lacado */
  variante?: "noche" | "papel" | "laca";
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
/** Fondo de escena: noche azul con destellos dorados, papel o laca roja. Úsalo como lienzo de cada pantalla. */
export declare function Escena(props: EscenaProps): React.JSX.Element;

export interface PergaminoProps {
  /** papel = hoja con marco dorado; rollo = con rodillos de madera arriba y abajo; tablilla = marco lacado rojo */
  variante?: "papel" | "rollo" | "tablilla";
  /** Título en Cinzel rojo laca con barra lateral */
  titulo?: string;
  /** Traducción china del título */
  tituloZh?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
/** Hoja de pergamino: el contenedor principal de contenido, siempre sobre una Escena noche. */
export declare function Pergamino(props: PergaminoProps): React.JSX.Element;

export interface CintaTituloProps {
  texto: string;
  zh?: string;
  /** oro = cinta dorada con texto laca; laca = cinta roja con texto dorado */
  tono?: "oro" | "laca";
  className?: string;
}
/** Cinta de título dorada o lacada para encabezar pantallas y juegos ("Aprende jugando"). */
export declare function CintaTitulo(props: CintaTituloProps): React.JSX.Element;

export interface BotonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** laca = acción principal; oro = premio/destacado; papel = secundaria; jade = confirmar; fantasma = terciaria */
  variante?: "laca" | "oro" | "papel" | "jade" | "fantasma";
  tamano?: "sm" | "md" | "lg";
  /** Ocupa todo el ancho */
  ancho?: boolean;
  /** Elemento a la izquierda del texto */
  icono?: React.ReactNode;
  /** Subtítulo chino tras el texto */
  zh?: string;
  children?: React.ReactNode;
}
/** Botón imperial en píldora, mayúsculas, con marco dorado. */
export declare function Boton(props: BotonProps): React.JSX.Element;

export interface MascotaProps {
  pose?: PoseMono;
  /** Ancho en px (por defecto 120) */
  tamano?: number;
  /** Animación suave de flotar */
  flota?: boolean;
  /** Texto del bocadillo junto a la mascota */
  mensaje?: string;
  className?: string;
}
/** Mascota Rey Mono en una de sus poses, con bocadillo opcional. */
export declare function Mascota(props: MascotaProps): React.JSX.Element;

export interface HeroSeccionProps {
  /** Texto pequeño dorado sobre el título, p. ej. "Unidades · 单元" */
  ceja?: string;
  titulo: string;
  tituloZh?: string;
  descripcion?: string;
  descripcionZh?: string;
  /** Pose del Rey Mono a la derecha (se oculta en móvil) */
  mascota?: PoseMono;
  /** Botones bajo el texto */
  acciones?: React.ReactNode;
  className?: string;
}
/** Héroe de sección lacado con doble marco dorado y dragón. Cabecera de cada página. */
export declare function HeroSeccion(props: HeroSeccionProps): React.JSX.Element;

export interface SelloProps {
  texto: string;
  /** Segunda línea (normalmente en chino) */
  sub?: string;
  tono?: "laca" | "jade" | "oro";
  grande?: boolean;
  /** Giro en grados (por defecto -8) */
  giro?: number;
  className?: string;
}
/** Sello de tinta (Completada, APTO, Nuevo…). */
export declare function Sello(props: SelloProps): React.JSX.Element;

export interface InsigniaNivelProps {
  nivel?: Nivel;
  tamano?: "sm" | "md" | "lg";
  className?: string;
}
/** Disco de nivel con color propio: A1 laca, A2 jade, B1 oro, B2 púrpura, C1 azul, C2 noche. */
export declare function InsigniaNivel(props: InsigniaNivelProps): React.JSX.Element;

export interface BarraProgresoProps {
  valor?: number;
  max?: number;
  tono?: "jade" | "oro" | "laca";
  etiqueta?: string;
  mostrarValor?: boolean;
  /** Versión fina de 6px sin etiqueta */
  fina?: boolean;
  className?: string;
}
/** Barra de progreso con brillo. */
export declare function BarraProgreso(props: BarraProgresoProps): React.JSX.Element;

export interface TarjetaUnidadProps {
  numero?: number;
  titulo: string;
  tituloZh?: string;
  /** Emoji o URL de imagen dentro del disco de jade */
  icono?: React.ReactNode;
  /** 0 a 1 */
  progreso?: number;
  estado?: "nuevo" | "en-curso" | "completada" | "bloqueada";
  onClick?: () => void;
  className?: string;
}
/** Tarjeta de unidad didáctica con disco de jade, progreso y estado. Va en rejilla dentro de un Pergamino. */
export declare function TarjetaUnidad(props: TarjetaUnidadProps): React.JSX.Element;

export interface TarjetaJuegoProps {
  titulo: string;
  tituloZh?: string;
  descripcion?: string;
  /** Emoji o elemento dentro del medallón nocturno */
  icono?: React.ReactNode;
  /** Etiqueta pequeña (p. ej. "Vocabulario") */
  etiqueta?: string;
  /** Muestra candado "Pronto" y desactiva */
  bloqueado?: boolean;
  onClick?: () => void;
  className?: string;
}
/** Tarjeta de juego con medallón nocturno; puede ir bloqueada con candado. */
export declare function TarjetaJuego(props: TarjetaJuegoProps): React.JSX.Element;

export interface TarjetaExamenProps {
  nivel?: Nivel;
  titulo: string;
  tituloZh?: string;
  /** Datos cortos en chapas: "4 pruebas", "3 h 40 min"… */
  datos?: string[];
  /** 0 a 1; si falta no se muestra barra */
  progreso?: number;
  /** Texto del botón dorado */
  accion?: string;
  onAccion?: () => void;
  className?: string;
}
/** Tarjeta oscura de examen DELE por nivel, con datos y progreso. */
export declare function TarjetaExamen(props: TarjetaExamenProps): React.JSX.Element;

export interface OpcionProps {
  /** Letra del círculo (a, b, c…) */
  letra?: string;
  children?: React.ReactNode;
  estado?: "normal" | "elegida" | "correcta" | "incorrecta" | "apagada";
  /** Tono vivo de concurso (Kahoot); sin tono = pergamino */
  tono?: "rojo" | "azul" | "oro" | "jade";
  onClick?: () => void;
  className?: string;
}
/** Opción de respuesta con estados de corrección. */
export declare function Opcion(props: OpcionProps): React.JSX.Element;

export interface BocadilloProps {
  /** Nombre del personaje */
  quien?: string;
  texto: string;
  zh?: string;
  lado?: "izquierda" | "derecha";
  className?: string;
}
/** Bocadillo de diálogo con nombre del personaje y traducción. */
export declare function Bocadillo(props: BocadilloProps): React.JSX.Element;

export interface DialogoProps {
  lineas?: { quien?: string; texto: string; zh?: string }[];
  className?: string;
}
/** Diálogo: bocadillos alternos izquierda/derecha. */
export declare function Dialogo(props: DialogoProps): React.JSX.Element;

export interface FichaLetraProps {
  letra?: string;
  /** Puntos pequeños abajo a la derecha */
  puntos?: number;
  estado?: "normal" | "colocada" | "correcta" | "pista" | "vacia";
  /** Lado en px (por defecto 48) */
  tamano?: number;
  onClick?: () => void;
  className?: string;
}
/** Ficha de letra de marfil (palabra desordenada, apalabrados, teclado). */
export declare function FichaLetra(props: FichaLetraProps): React.JSX.Element;

export interface TecladoEspanolProps {
  mayusculas?: boolean;
  onTecla?: (letra: string) => void;
  className?: string;
}
/** Teclado con las letras especiales del español: á é í ó ú ü ñ ¿ ¡. */
export declare function TecladoEspanol(props: TecladoEspanolProps): React.JSX.Element;

export interface IconoProps {
  nombre: NombreIcono;
  tamano?: number;
  className?: string;
}
/** Icono propio del menú (dibujo en laca para medallón dorado). Nunca uses emojis en el menú. */
export declare function Icono(props: IconoProps): React.JSX.Element;

export interface MenuLacadoProps {
  items?: { id: string; icono: NombreIcono; label: string; labelZh?: string }[];
  /** id del elemento activo (se pinta en píldora dorada) */
  activo?: string;
  onSelect?: (id: string) => void;
  pie?: React.ReactNode;
  className?: string;
}
/** Menú lateral lacado con marca, iconos propios y elemento activo dorado. */
export declare function MenuLacado(props: MenuLacadoProps): React.JSX.Element;

export interface PanelCorreccionProps {
  /** 0 a 100 */
  puntuacion?: number;
  /** Por defecto puntuacion >= 60 */
  apto?: boolean;
  nivel?: Nivel;
  criterios?: { nombre: string; nota: number; max?: number }[];
  comentario?: string;
  className?: string;
}
/** Panel de corrección DELE: nota en anillo, sello APTO/NO APTO, criterios y comentario. */
export declare function PanelCorreccion(props: PanelCorreccionProps): React.JSX.Element;
