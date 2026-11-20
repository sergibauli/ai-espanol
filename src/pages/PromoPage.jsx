import { DownloadIcon } from "lucide-react";
import * as React from "react";

// Vídeo promocional para Douyin (vertical 1080×1920, se genera en promo-douyin/ de la rama claude/promo-douyin)
const VIDEO = "./video/promo-douyin.mp4";

export default function PromoPage() {
  return (
    <div className="tp-promo">
      <span className="tp-acceso-luz" aria-hidden="true" />
      <div className="tp-promo-escena">
        <h1>
          Wukong Español
          <small>悟空西语 · 宣传片</small>
        </h1>
        <video
          src={VIDEO}
          poster="./video/promo-douyin.jpg"
          controls
          playsInline
          preload="metadata"
          style={{ width: "min(100%, 360px)", aspectRatio: "9 / 16", borderRadius: 18, border: "4px solid #f2c14e", boxShadow: "0 0 0 3px #8f0c21, 0 18px 40px rgba(0,0,0,.35)", background: "#000" }}
        />
        <a className="tp-btn-laca" href={VIDEO} download="wukong-espanol-douyin.mp4">
          <DownloadIcon size={20} aria-hidden="true" /> Descargar · 下载
        </a>
      </div>
    </div>
  );
}
