# AI Español · DELE Prep (v2)

App para preparar el DELE A1–B2: 200 temas por nivel, 80 modelos oficiales, diccionario español–chino,
repaso espaciado, juegos, tutor con IA y plan de estudio adaptativo. React + Vite + Tailwind,
backend en Cloudflare Workers (IA y pagos con Stripe).

## Desarrollo

```bash
npm install
npm run dev
```

Sin variables de entorno la app funciona en modo invitado (progreso en el navegador); la IA y los pagos
quedan desactivados hasta configurar el Worker.

## Estructura

- `src/data/` contenido didáctico (JSON por nivel). Se regeneró desde la build v1 con `npm run data -- <carpeta-assets-v1>`.
- `src/lib/adaptive.js` motor adaptativo: plan diario, punto débil, cambio de nivel y simulacros programados.
- `src/lib/plans.js` planes, límites gratuitos y oferta según la acción (examen, IA, tutor, racha).
- `worker/` API: proxy de DeepSeek, Stripe Checkout/portal/webhook y estado Premium en KV.

## Puesta en marcha de pagos e IA

1. **Clerk**: crea la app y copia la *publishable key* (`VITE_CLERK_PUBLISHABLE_KEY`), el *Frontend API URL*
   (`CLERK_ISSUER`) y su `/.well-known/jwks.json` (`CLERK_JWKS_URL`).
2. **Stripe**: crea tres precios — Premium mensual (recurrente), Premium anual (recurrente) y Pase DELE 30 días
   (pago único) — y activa Alipay y WeChat Pay en *Settings → Payment methods*.
3. **Worker** (`cd worker`):
   ```bash
   npx wrangler kv namespace create ENT      # pega el id en wrangler.toml
   npx wrangler secret put DEEPSEEK_API_KEY
   npx wrangler secret put STRIPE_SECRET_KEY
   npx wrangler secret put STRIPE_WEBHOOK_SECRET
   npx wrangler deploy
   ```
   Rellena `CLERK_*` y `STRIPE_PRICE_*` en `wrangler.toml`. En Stripe crea un webhook a `https://<worker>/webhook`
   con los eventos `checkout.session.completed`, `checkout.session.async_payment_succeeded` y `customer.subscription.*`.
4. **GitHub**: en *Settings → Secrets and variables → Actions → Variables* añade `VITE_CLERK_PUBLISHABLE_KEY` y
   `VITE_API_URL`; en *Settings → Pages* elige **GitHub Actions** como origen.
