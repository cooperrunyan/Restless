import { ReactChild, useEffect } from 'react';
import React from 'react';
import { Refresher } from './Refresher';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  children?: ReactChild | ReactChild[];
}

export const App: React.FC<Props> = ({ children }: Props) => {
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

        toast.error(e.message);
      },
      { capture: true },
    );
  }, []);

  return (
    <Refresher>
      <div className="App">
        <div className="TitleBar"></div>
        <ToastContainer />
        <div className="App-Contents">{children}</div>
      </div>
    </Refresher>
  );
};
