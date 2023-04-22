import { PreloadedState } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { RootState } from '../store';

export interface IPage {
  preloadedState: PreloadedState<RootState>;
  children: ReactNode;
}
