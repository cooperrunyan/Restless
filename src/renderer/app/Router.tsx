import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { Index } from './pages/Index/Index';

import React from 'react';

interface Props {}

export const Router: React.FC<Props> = ({}: Props) => (
  <MemoryRouter>
    <Routes>
      <Route
        path="/"
        element={
          <App>
            <Index />
          </App>
        }
      />
    </Routes>
  </MemoryRouter>
);
