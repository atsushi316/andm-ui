import { createReadStream } from "node:fs";
import { access, stat } from "node:fs/promises";
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

function localPath(urlPath) {
  let pathname = decodeURIComponent(urlPath.split("?")[0]);
  if (pathname === "/") pathname = "/gallery/";
  if (pathname.endsWith("/")) pathname += "index.html";
  const full = normalize(join(root, pathname));
  if (full !== root && !full.startsWith(root + sep)) return null;
  return full;
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
    res.writeHead(200, { "Content-Type": type, "Cache-Control": "no-cache" });
    if (req.method === "HEAD") {
      res.end();
      return;
    }
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
