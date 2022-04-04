import { render } from 'react-dom';
import { Router } from './renderer/app/Router';

import './renderer/app/style/base.scss';
import './renderer/app/style/variables.scss';
import './renderer/app/style/typography.scss';

render(<Router />, document.getElementById('root'));
