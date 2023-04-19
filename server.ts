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

  const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');

  const html = fs.readFileSync(path.resolve(__dirname, './index.html')).toString();
  const parts = html.split('not rendered');
  app.use(vite.middlewares);

  app.use((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.write(parts[0]);
    const stream = render(req.originalUrl, {
      // bootstrapModules: ['./src/entry-client.tsx'],
      onShellReady() {
        stream!.pipe(res);
      },
      onAllReady() {
        res.write(parts[1]);
        res.end();
      },
      onError(err: Error) {
        console.error(err);
      },
    });
  });

  console.log(`listening on http://localhost:${PORT}`);
  app.listen(PORT);
};

createServer();
