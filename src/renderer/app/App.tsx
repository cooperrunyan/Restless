import { ReactChild, useEffect } from 'react';
import { Data } from './lib/DataManager';
import React from 'react';

interface Props {
  children?: ReactChild | ReactChild[];
}

export const App: React.FC<Props> = ({ children }: Props) => {
  useEffect(() => {
    window?.addEventListener('contextmenu', e => {});
  }, [window]);

  return (
    <Data>
      <div className="App">
        {window?.electron?.store && <div className="TitleBar"></div>}
        <div className="App-Contents">{children}</div>
      </div>
    </Data>
  );
};
