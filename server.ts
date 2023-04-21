import express from 'express';
import fs from 'fs';
import path from 'path';
import { ViteDevServer } from 'vite';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const isTest = process.env.VITEST;

export async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production'
) {
  const resolve = (p: string) => path.resolve(dirname, p);
  const app = express();
  let vite: ViteDevServer;

  if (!isProd) {
    vite = await (
      await import('vite')
    ).createServer({
      root,
      logLevel: isTest ? 'error' : 'info',
      server: {
        middlewareMode: true,
      },
      appType: 'custom',
    });

    app.use(vite.middlewares);
  } else {
    app.use(
      (await import('serve-static')).default(resolve('dist/client'), {
        index: false,
      })
    );
  }

  app.use('*', async (req, res) => {
    try {
      if (!isProd) {
        const render = (await vite.ssrLoadModule('./src/entry-server.tsx')).render;
        const assetMap = { script: './src/entry-client.tsx' };

        const stream = render(req.originalUrl, assetMap, {
          bootstrapModules: [assetMap.script],
          onShellReady() {
            stream!.pipe(res);
          },
          onAllReady() {
            // res.write(parts[1]);
            res.end();
          },
          onError(err: Error) {
            console.error(err);
          },
        });
      } else {
        const render = (await import('./dist/server/entry-server.js')).render;
        const script =
          '/assets/' +
          fs.readdirSync(resolve('./dist/client/assets')).filter((fn: string) => fn.endsWith('js'));
        const style =
          '/assets/' +
          fs
            .readdirSync(resolve('./dist/client/assets'))
            .filter((fn: string) => fn.includes('css'));
        const assetMap = { style, script };

        const stream = render(req.originalUrl, assetMap, {
          bootstrapModules: [assetMap.script],
          onShellReady() {
            stream!.pipe(res);
            console.log(stream!.pipe);
          },
          onAllReady() {
            // res.write(parts[1]);
            res.end();
          },
          onError(err: Error) {
            console.error(err);
          },
        });
      }
    } catch (e) {
      if (e instanceof Error) {
        !isProd && vite.ssrFixStacktrace(e);
        console.log(e.stack);
        res.status(500).end(e.stack);
      }
    }
  });

  return { app };
}

if (!isTest) {
  createServer()
    .then(({ app }) =>
      app.listen(5173, () => {
        console.log('http://localhost:5173');
      })
    )
    .catch((e) => console.error(e));
}
