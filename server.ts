import express from 'express';
import { ViteDevServer } from 'vite';
import { createServer as createViteServer } from 'vite';

export async function createServer() {
  const app = express();

  const vite: ViteDevServer = await createViteServer({
    server: {
      middlewareMode: true,
    },
    appType: 'custom',
  });

  app.use(vite.middlewares);

  app.use('*', async (req, res) => {
    try {
      const render = (await vite.ssrLoadModule('./src/entry-server.tsx')).render;
      const assetMap = { script: './src/entry-client.tsx' };

      const stream = render(req.originalUrl, {
        bootstrapModules: [assetMap.script],
        onShellReady() {
          stream!.pipe(res);
        },
        onAllReady() {
          res.end();
        },
        onError(err: Error) {
          console.error(err);
        },
      });
    } catch (e) {
      if (e instanceof Error) {
        vite.ssrFixStacktrace(e);
        console.log(e.stack);
      }
    }
  });

  app.listen(3001, () => console.log('http://localhost:3001/'));
}

createServer();
