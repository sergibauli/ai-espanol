// Emisor de tokens de prueba (hace de Clerk): sirve /.well-known/jwks.json y /token?sub=…
import http from "node:http";
import { generateKeyPairSync, createSign } from "node:crypto";
const { publicKey, privateKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
const jwk = { ...publicKey.export({ format: "jwk" }), kid: "k1", alg: "RS256", use: "sig" };
const ISS = "http://127.0.0.1:8790";
const b64 = (o) => Buffer.from(JSON.stringify(o)).toString("base64url");
const firmar = (sub) => {
  const now = Math.floor(Date.now() / 1000);
  const h = b64({ alg: "RS256", kid: "k1", typ: "JWT" });
  const p = b64({ sub, iss: ISS, iat: now, nbf: now - 5, exp: now + 3600 });
  const s = createSign("RSA-SHA256").update(`${h}.${p}`).sign(privateKey).toString("base64url");
  return `${h}.${p}.${s}`;
};
http.createServer((req, res) => {
  const u = new URL(req.url, ISS);
  res.setHeader("access-control-allow-origin", "*");
  if (u.pathname === "/.well-known/jwks.json") return res.end(JSON.stringify({ keys: [jwk] }));
  if (u.pathname === "/token") return res.end(firmar(u.searchParams.get("sub") || "user_test"));
  res.statusCode = 404;
  res.end();
}).listen(8790, () => console.log("jwks listo"));
