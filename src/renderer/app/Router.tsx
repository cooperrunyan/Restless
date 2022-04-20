import React from 'react';

import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Refresher } from './Refresher';

import { Rest } from './pages/Rest/Rest';
import { Index } from './pages/Index/Index';

interface Props {}

export const Router: React.FC<Props> = ({}: Props) => (
  <Refresher>
    <MemoryRouter>
      <Routes>
        <Route path="/rest" element={<Rest />} />
        <Route path="/" element={<Index />} />
      </Routes>
    </MemoryRouter>
  </Refresher>
);
