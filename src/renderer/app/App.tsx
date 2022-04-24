import { ReactChild, useEffect } from 'react';
import React from 'react';
import { Refresher } from './Refresher';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './style/toastify.scss';

interface Props {
  children?: ReactChild | ReactChild[];
}

import * as Sentry from '@sentry/react';

const _App: React.FC<Props> = ({ children }: Props) => {
  useEffect(() => {
    window.addEventListener(
      'error',
      e => {
        const { error } = e;
        if (error.stack?.indexOf('invokeGuardedCallbackDev') >= 0 && !error.alreadySeen) {
          error.alreadySeen = true;
          e.preventDefault();
          return;
        }

        toast.error(e.message.replace('Uncaught Error: ', ''));
      },
      { capture: true },
    );
  }, []);

  return (
    <Refresher>
      <div className="App">
        <div className="TitleBar"></div>
        <div className="App-Contents">{children}</div>
      </div>
    </Refresher>
  );
};

export const App = Sentry.withProfiler(_App);
