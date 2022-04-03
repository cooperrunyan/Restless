import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { Index } from './pages/Index/Index';

export function Router() {
  return (
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
}
