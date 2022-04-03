import { render } from 'react-dom';
import { Router } from './app/Router';

import './app/style/base.scss';
import './app/style/variables.scss';
import './app/style/typography.scss';

render(<Router />, document.getElementById('root'));
