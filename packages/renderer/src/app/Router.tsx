import React from 'react';

import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Refresher } from './Refresher';

import { Rest } from './pages/Rest/Rest';
import { Home } from './pages/Home/Home';
import { ToastContainer } from 'react-toastify';

interface Props {}

export const Router: React.FC<Props> = ({}: Props) => (
  <Refresher>
    <ToastContainer theme="dark" position="bottom-right" />
    <MemoryRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Rest />} />
      </Routes>
    </MemoryRouter>
  </Refresher>
);
