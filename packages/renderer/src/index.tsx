import { render } from 'react-dom';
import { Router } from './app/Router';
import { createRoot } from 'react-dom/client';

import './app/style/variables.scss';
import './app/style/base.scss';
import './app/style/typography.scss';

createRoot(document.getElementById('root')!).render(<Router />);
