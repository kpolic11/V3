import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

// 1. Resolve PORT from environment variable (Cloud Run injects PORT=3000 or PORT=8080) or CLI --port flag
function resolvePort() {
  if (process.env.PORT) {
    const parsed = Number.parseInt(process.env.PORT, 10);
    if (!Number.isNaN(parsed) && parsed > 0) {
      return parsed;
    }
  }
  const portFlagIndex = process.argv.indexOf('--port');
  if (portFlagIndex !== -1 && process.argv[portFlagIndex + 1]) {
    const parsedFlag = Number.parseInt(process.argv[portFlagIndex + 1], 10);
    if (!Number.isNaN(parsedFlag) && parsedFlag > 0) {
      return parsedFlag;
    }
  }
  return 3000;
}

const PORT = resolvePort();
// 2. Strictly bind to 0.0.0.0 as required by Google Cloud Run
const HOST = '0.0.0.0';

// Optional local .env loader (zero external dependencies)
function loadLocalEnv() {
  try {
    const envPath = path.resolve(process.cwd(), '.env');
    if (!fs.existsSync(envPath)) return;
    const content = fs.readFileSync(envPath, 'utf8');
    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim().replace(/^['"]|['"]$/g, '');
      if (key && process.env[key] === undefined) {
        process.env[key] = val;
      }
    }
  } catch {
    // Ignore optional .env read errors in container environments
  }
}

loadLocalEnv();

// MIME types for static asset serving
const MIME_TYPES = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.htm', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.mjs', 'text/javascript; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.xml', 'application/xml; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.gif', 'image/gif'],
  ['.webp', 'image/webp'],
  ['.ico', 'image/x-icon'],
  ['.woff', 'font/woff'],
  ['.woff2', 'font/woff2'],
  ['.ttf', 'font/ttf'],
  ['.otf', 'font/otf'],
  ['.wav', 'audio/wav'],
  ['.mp3', 'audio/mpeg'],
  ['.mp4', 'video/mp4'],
  ['.webm', 'video/webm'],
  ['.wasm', 'application/wasm'],
  ['.pdf', 'application/pdf'],
  ['.zip', 'application/zip'],
]);

// Resolve static build directory across all deployment layouts
function resolveDistDir() {
  const candidates = [
    path.resolve(process.cwd(), 'dist'),
    path.resolve(process.cwd()),
  ];
  for (const dir of candidates) {
    if (fs.existsSync(path.join(dir, 'index.html')) && fs.existsSync(path.join(dir, 'assets'))) {
      return dir;
    }
  }
  for (const dir of candidates) {
    if (fs.existsSync(path.join(dir, 'index.html'))) {
      return dir;
    }
  }
  return path.resolve(process.cwd(), 'dist');
}

const DIST_DIR = resolveDistDir();
const ttsAudioCache = new Map();

function sendJson(res = http.ServerResponse.prototype, statusCode = 200, payload = {}) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Cache-Control': 'no-store',
  });
  res.end(body);
}

function readRawBody(req = http.IncomingMessage.prototype) {
  return new Promise((resolve, reject) => {
    const chunks = [Buffer.alloc(0)];
    chunks.length = 0;
    let totalBytes = 0;
    req.on('data', (chunk = Buffer.alloc(0)) => {
      totalBytes += chunk.length;
      if (totalBytes > 10 * 1024 * 1024) {
        reject(new Error('Payload too large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      resolve(Buffer.concat(chunks).toString('utf8'));
    });
    req.on('error', reject);
  });
}

async function handleTtsRequest(
  req = http.IncomingMessage.prototype,
  res = http.ServerResponse.prototype
) {
  try {
    const rawBody = String((await readRawBody(req)) || '{}');
    const body = JSON.parse(rawBody);
    const text = body && typeof body.text === 'string' ? body.text.trim() : '';
    const voiceName = body && typeof body.voiceName === 'string' ? body.voiceName : 'Fenrir';
    const voiceStyle =
      body && typeof body.voiceStyle === 'string'
        ? body.voiceStyle
        : 'Calm, warm, articulate documentary narrator in Greek';

    if (!text) {
      sendJson(res, 400, { error: 'Text parameter is required' });
      return;
    }

    const cacheKey = `${voiceName}:${voiceStyle}:${text.slice(0, 150)}:${text.length}`;
    if (ttsAudioCache.has(cacheKey)) {
      sendJson(res, 200, {
        audioBase64: ttsAudioCache.get(cacheKey),
        mimeType: 'audio/wav',
        cached: true,
      });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.MY_GEMINI_API_KEY;
    if (!apiKey) {
      sendJson(res, 200, {
        fallback: true,
        message: 'No GEMINI_API_KEY configured. Falling back to browser speech synthesis.',
      });
      return;
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash-tts:generateContent?key=${encodeURIComponent(apiKey)}`;
    const apiResponse = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'aistudio-build',
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [
              {
                text,
                speechMetadata: {
                  speaker: 'Narrator',
                  style: voiceStyle,
                },
              },
            ],
          },
        ],
        generationConfig: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName },
            },
          },
        },
      }),
    });

    if (!apiResponse.ok) {
      sendJson(res, 200, {
        fallback: true,
        message: 'Falling back to browser speech synthesis.',
      });
      return;
    }

    const data = await apiResponse.json();
    const base64Audio =
      data &&
      data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts[0] &&
      data.candidates[0].content.parts[0].inlineData &&
      data.candidates[0].content.parts[0].inlineData.data;

    if (!base64Audio) {
      sendJson(res, 200, {
        fallback: true,
        message: 'No audio data returned by model. Falling back to browser speech.',
      });
      return;
    }

    ttsAudioCache.set(cacheKey, base64Audio);
    sendJson(res, 200, {
      audioBase64: base64Audio,
      mimeType: 'audio/wav',
      cached: false,
    });
  } catch (error) {
    console.error('Gemini TTS generation error:', error);
    const errMsg = error instanceof Error ? error.message : 'TTS generation error';
    sendJson(res, 200, {
      fallback: true,
      error: errMsg,
      message: 'Falling back to client-side speech synthesis.',
    });
  }
}

function serveStaticFile(
  req = http.IncomingMessage.prototype,
  res = http.ServerResponse.prototype,
  filePath = '',
  statusCode = 200
) {
  try {
    const stat = fs.statSync(filePath);
    if (!stat.isFile()) return false;

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES.get(ext) || 'application/octet-stream';
    const cacheControl =
      ext === '.html' || ext === '.htm' || ext === '.zip'
        ? 'no-cache, no-store, must-revalidate'
        : 'public, max-age=31536000, immutable';

    res.writeHead(
      statusCode,
      ext === '.zip'
        ? {
            'Content-Type': contentType,
            'Content-Length': stat.size,
            'Cache-Control': cacheControl,
            'Content-Disposition': `attachment; filename="${path.basename(filePath)}"`,
          }
        : {
            'Content-Type': contentType,
            'Content-Length': stat.size,
            'Cache-Control': cacheControl,
          }
    );

    if (req.method === 'HEAD') {
      res.end();
      return true;
    }

    const stream = fs.createReadStream(filePath);
    stream.on('error', () => {
      if (!res.headersSent) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      }
      res.end('Internal Server Error');
    });
    stream.pipe(res);
    return true;
  } catch {
    return false;
  }
}

const server = http.createServer(async (req, res) => {
  try {
    const rawUrl = req.url || '/';
    const qIndex = rawUrl.indexOf('?');
    const pathname = decodeURIComponent(qIndex === -1 ? rawUrl : rawUrl.slice(0, qIndex));

    // Health check endpoints for Cloud Run Startup & Liveness Probes
    if (pathname === '/api/health') {
      sendJson(res, 200, {
        status: 'ok',
        timestamp: new Date().toISOString(),
        port: PORT,
        host: HOST,
        hasGeminiKey: Boolean(process.env.GEMINI_API_KEY || process.env.MY_GEMINI_API_KEY),
        model: 'gemini-3.8-flash-tts',
      });
      return;
    }

    if (pathname === '/healthz' || pathname === '/_health') {
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('OK');
      return;
    }

    // Gemini TTS endpoint
    if (pathname === '/api/tts' && req.method === 'POST') {
      await handleTtsRequest(req, res);
      return;
    }

    // Resolve static file in dist
    const safeRelPath = pathname.replace(/^\/+/, '');
    const candidatePath = path.resolve(DIST_DIR, safeRelPath);

    if (candidatePath.startsWith(DIST_DIR) && safeRelPath && serveStaticFile(req, res, candidatePath)) {
      return;
    }

    // If missing asset with file extension, return 404
    if (safeRelPath && path.extname(safeRelPath) && !safeRelPath.endsWith('.html')) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not Found');
      return;
    }

    // SPA index.html fallback
    const indexPath = path.join(DIST_DIR, 'index.html');
    if (serveStaticFile(req, res, indexPath, 200)) {
      return;
    }

    // Fallback root HTML if dist/index.html is not yet built
    const fallbackHtml = `<!doctype html>
<html lang="el">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Lumina: Η Ιστορία & Τέχνη της Φωτογραφίας</title>
  </head>
  <body style="font-family:system-ui;background:#0c0a09;color:#f5f5f4;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;text-align:center;">
    <div>
      <h1>Lumina: Φως & Σκιά</h1>
      <p>Server listening on ${HOST}:${PORT}</p>
    </div>
  </body>
</html>`;
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Length': Buffer.byteLength(fallbackHtml),
    });
    res.end(fallbackHtml);
  } catch (err) {
    console.error('Request error:', err);
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    }
    res.end('Internal Server Error');
  }
});

// Start listening immediately on 0.0.0.0:PORT with zero async startup delay
server.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});

server.on('error', (err) => {
  console.error(`Fatal server error on ${HOST}:${PORT}:`, err);
  process.exit(1);
});

function shutdown(signal = 'SIGTERM') {
  console.log(`Received ${signal}, shutting down gracefully...`);
  server.close(() => {
    process.exit(0);
  });
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
