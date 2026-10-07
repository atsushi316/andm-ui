import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { access, readFile, stat } from "node:fs/promises";
import http from "node:http";
import { extname, join, normalize, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const port = 4180;
const host = "0.0.0.0";

await import("./build-css.mjs");

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".json": "application/json; charset=utf-8",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".md": "text/plain; charset=utf-8",
};

const galleryScripts = ["series-copy.js", "catalog.js", "library.js", "explorer.js", "workspace.js"];

function localPath(urlPath) {
  let pathname = decodeURIComponent(urlPath.split("?")[0]);
  if (pathname === "/") pathname = "/gallery/";
  if (pathname.endsWith("/")) pathname += "index.html";
  const full = normalize(join(root, pathname));
  if (full !== root && !full.startsWith(root + sep)) return null;
  return full;
}

async function contentHash(relPath) {
  const buf = await readFile(join(root, relPath));
  return createHash("sha256").update(buf).digest("hex").slice(0, 10);
}

/** Simple Browser 等が古い explorer.js を掴み続けないよう、配信 HTML の script src に内容ハッシュを付ける。 */
async function withScriptCacheBust(html) {
  let out = html;
  const stamps = [];
  for (const name of galleryScripts) {
    const ver = await contentHash(`gallery/${name}`);
    stamps.push(ver);
    out = out.replace(
      new RegExp(`src="${name}(?:\\?[^"]*)?"`, "g"),
      `src="${name}?v=${ver}"`,
    );
  }
  // HTML 自体も毎回変えて、index のクリックナビ再読込で旧ページを掴みにくくする。
  const htmlHash = createHash("sha256").update(html).digest("hex").slice(0, 8);
  const stamp = createHash("sha256")
    .update(stamps.join("|") + "|" + htmlHash)
    .digest("hex")
    .slice(0, 8);
  out = out.replace(
    /data-gallery-build="[^"]*"/,
    `data-gallery-build="${stamp}"`,
  );
  out = out.replace(
    /(<meta name="andm-gallery-build" content=")[^"]*(")/,
    `$1${stamp}$2`,
  );
  out = out.replace(
    /<title>[^<]*<\/title>/,
    `<title>andm-ui Gallery · ${stamp}</title>`,
  );
  return out;
}

async function galleryAlreadyUp() {
  try {
    const res = await fetch(`http://127.0.0.1:${port}/gallery/`, {
      signal: AbortSignal.timeout(1500),
    });
    return res.ok;
  } catch {
    return false;
  }
}

const server = http.createServer(async (req, res) => {
  try {
    if (!req.url) {
      res.writeHead(400);
      res.end();
      return;
    }
    if (req.url === "/gallery") {
      res.writeHead(302, { Location: "/gallery/" });
      res.end();
      return;
    }
    const file = localPath(req.url);
    if (!file) {
      res.writeHead(403);
      res.end();
      return;
    }
    try {
      await access(file);
      const info = await stat(file);
      if (!info.isFile()) throw new Error("not a file");
    } catch {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }
    const type = types[extname(file)] ?? "application/octet-stream";
    const headers = { "Content-Type": type, "Cache-Control": "no-cache" };
    if (type.startsWith("text/html") || type.includes("javascript")) {
      headers["Cache-Control"] = "no-store, no-cache, must-revalidate";
      headers["Pragma"] = "no-cache";
      headers["Expires"] = "0";
    }
    if (req.method === "HEAD") {
      res.writeHead(200, headers);
      res.end();
      return;
    }
    const isGalleryHtml =
      type.startsWith("text/html") &&
      (file.endsWith(`${sep}gallery${sep}index.html`) ||
        file.endsWith(`${sep}gallery/index.html`));
    if (isGalleryHtml) {
      const html = await withScriptCacheBust(await readFile(file, "utf8"));
      res.writeHead(200, headers);
      res.end(html);
      return;
    }
    res.writeHead(200, headers);
    createReadStream(file).pipe(res);
  } catch (error) {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(error instanceof Error ? error.message : "error");
  }
});

server.on("error", async (error) => {
  if (error.code === "EADDRINUSE") {
    if (await galleryAlreadyUp()) {
      console.log(`すでに起動しています: http://127.0.0.1:${port}/gallery/`);
      process.exit(0);
    }
    console.error(
      `ポート ${port} は使用中ですが、Gallery は応答していません。そのプロセスを止めてから npm run gallery を再実行してください。`,
    );
    process.exit(1);
  }
  console.error(error);
  process.exit(1);
});

server.listen(port, host, () => {
  console.log(`Gallery: http://127.0.0.1:${port}/gallery/`);
  console.log(`ルート http://127.0.0.1:${port}/ からも /gallery/ へ移動します。`);
});
