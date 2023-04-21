import { PreloadedState } from '@reduxjs/toolkit';
import { ReactNode } from 'react';

import { RootState } from './store';

interface IPage {
  styles: string;
  preloadedState: PreloadedState<RootState>;
  children: ReactNode;
}

const Page = ({ styles, preloadedState, children }: IPage) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        {import.meta.env.DEV && (
          <script
            type="module"
            dangerouslySetInnerHTML={{
              __html: `
                import RefreshRuntime from '/@react-refresh';
                RefreshRuntime.injectIntoGlobalHook(window);
                window.$RefreshReg$ = () => {};
                window.$RefreshSig$ = () => (type) => type;
                window.__vite_plugin_react_preamble_installed__ = true;
                `,
            }}
          />
        )}
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
        ></link>
        {styles && <link rel="stylesheet" href={styles} />}
        <title>Cards</title>
      </head>
      <body>
        <div id="root">{children}</div>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
              /</g,
              '\\u003c'
            )}`,
          }}
        />
      </body>
    </html>
  );
};

export default Page;
