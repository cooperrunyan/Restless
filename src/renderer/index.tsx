import { render } from 'react-dom';
import { Router } from './app/Router';

import './app/style/variables.scss';
import './app/style/base.scss';
import './app/style/typography.scss';

import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

Sentry.init({
  dsn: 'https://592f35dbbadc4566b007e38b33f057e3@o1217299.ingest.sentry.io/6359350',
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1,
});

render(<Router />, document.getElementById('root'));
