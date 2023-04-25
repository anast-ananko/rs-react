import { PreloadedState } from '@reduxjs/toolkit';
import { RootState } from './store';

declare global {
  interface Window {
    __PRELOADED_STATE__?: PreloadedState<RootState>;
  }
}
