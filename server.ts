import express from 'express';
import fs from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 3001;

const createServer = async () => {
  const app = express();

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  const isProd = process.env.NODE_ENV === 'production';

  const entryServerPath = isProd ? './server/entry-server.js' : '/src/entry-server.tsx';
  const { render } = isProd
    ? await import(entryServerPath)
    : await vite.ssrLoadModule(entryServerPath);

  const html = fs.readFileSync(path.resolve(__dirname, './index.html')).toString();
  const parts = html.split('not rendered');
  app.use(vite.middlewares);

  app.use((req, res) => {
    res.write(parts[0]);
    const stream = render(req.originalUrl, {
      bootstrapModules: ['./src/entry-client.tsx'],
      onShellReady() {
        res.setHeader('Content-Type', 'text/html');
        stream!.pipe(res);
      },
      onAllReady() {
        res.write(parts[1]);
        res.end();
      },
      onError(err) {
        console.error(err);
      },
    });
  });

  console.log(`listening on http://localhost:${PORT}`);
  app.listen(PORT);
};

createServer();
